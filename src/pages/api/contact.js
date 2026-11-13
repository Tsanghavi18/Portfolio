import nodemailer from "nodemailer";
import { profile, socials } from "@/data/portfolio";

/**
 * POST /api/contact
 * Sends the contact form to your inbox with Nodemailer. Credentials come from
 * environment variables (see .env.example) and never reach the browser.
 *
 * Protection layers (cheapest first):
 *  1. same-site origin check + JSON only      4. hidden honeypot field
 *  2. small request size limit                5. minimum time-on-form (bots submit instantly)
 *  3. strict validation (name, email, links)  6. rate limits (best effort, see note below)
 *  7. optional Cloudflare Turnstile captcha (turns on when TURNSTILE_SECRET_KEY is set)
 *
 * Note: the rate limits live in server memory. On serverless hosting (Vercel) memory is not
 * shared between instances, so they slow abuse down but cannot fully stop it. Turn on
 * Turnstile for real protection.
 */

export const config = { api: { bodyParser: { sizeLimit: "10kb" } } };

const emailPattern = /^[^\s@]{1,64}@[^\s@]+\.[^\s@]{2,}$/;
const namePattern = /^[\p{L}\p{M}][\p{L}\p{M} .'’-]{1,59}$/u;

const buckets = new Map();
function allow(key, limit, windowMs) {
  const now = Date.now();
  const list = (buckets.get(key) || []).filter((t) => now - t < windowMs);
  if (list.length >= limit) {
    buckets.set(key, list);
    return false;
  }
  list.push(now);
  buckets.set(key, list);
  if (buckets.size > 5000) buckets.clear(); // keep memory bounded
  return true;
}

const MINUTES = 60 * 1000;
const HOUR = 60 * MINUTES;

const escapeHtml = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Keeps a value on one line so it can't inject extra email headers
const oneLine = (s) => s.replace(/[\r\n]+/g, " ").trim();

async function verifyTurnstile(token, ip) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // captcha not enabled
  if (!token) return false;
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: String(token), remoteip: ip }),
    });
    const data = await response.json();
    return data.success === true;
  } catch {
    return false;
  }
}

/** Plain, text-only email layout (no images). */
function emailShell({ title, intro, body }) {
  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;line-height:1.6;color:#1e293b;max-width:580px;margin:0 auto;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden">
    <div style="background:linear-gradient(135deg,#f0a920,#f07a1a);padding:22px 24px;color:#16110a">
      <div style="font-size:13px;font-weight:700;letter-spacing:.02em">${escapeHtml(profile.name)}</div>
      <h2 style="margin:6px 0 0;font-size:21px;font-weight:700">${title}</h2>
      ${intro ? `<p style="margin:6px 0 0;font-size:14px">${intro}</p>` : ""}
    </div>
    <div style="padding:24px">${body}</div>
  </div>`;
}

const linkStyle = "display:inline-block;margin:0 8px 8px 0;padding:7px 14px;border:1px solid #e2e8f0;border-radius:8px;font-size:13px;font-weight:600;color:#1e293b;text-decoration:none";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed." });
  }

  // 1. Only accept requests that come from this same website
  const origin = req.headers.origin;
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  let sameSite = false;
  try {
    sameSite = Boolean(origin) && new URL(origin).host === host;
  } catch {
    sameSite = false;
  }
  if (!sameSite) return res.status(403).json({ ok: false, error: "Request not allowed." });
  if (!String(req.headers["content-type"] || "").includes("application/json")) {
    return res.status(415).json({ ok: false, error: "Unsupported request." });
  }

  const body = req.body && typeof req.body === "object" ? req.body : {};

  // 4. Honeypot: real visitors leave it empty. Pretend it worked so bots move on.
  if (body.website) return res.status(200).json({ ok: true, autoReply: false });

  // 5. People need a few seconds to fill the form; bots submit instantly
  const elapsed = Number(body.elapsed);
  if (!Number.isFinite(elapsed) || elapsed < 3000) return res.status(200).json({ ok: true, autoReply: false });

  // 3. Strict validation
  const name = oneLine(String(body.name || ""));
  const email = oneLine(String(body.email || ""));
  const message = String(body.message || "").trim();

  if (!namePattern.test(name)) return res.status(400).json({ ok: false, error: "Please enter your real name (letters only)." });
  if (!emailPattern.test(email) || email.length > 120) return res.status(400).json({ ok: false, error: "Please enter a valid email address." });
  if (message.length < 10 || message.length > 600) return res.status(400).json({ ok: false, error: "Your message should be 10 to 600 characters." });
  if ((message.match(/https?:\/\/|www\./gi) || []).length > 2) return res.status(400).json({ ok: false, error: "Please remove extra links from your message." });

  // 6. Rate limits (best effort)
  const ip = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown").split(",")[0].trim();
  if (!allow(`ip:${ip}`, 3, 10 * MINUTES) || !allow("global", 40, HOUR)) {
    return res.status(429).json({ ok: false, error: "Too many messages. Please try again later." });
  }

  // 7. Optional captcha
  if (!(await verifyTurnstile(body.turnstileToken, ip))) {
    return res.status(400).json({ ok: false, error: "Captcha check failed. Please refresh and try again." });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;
  if (!SMTP_USER || !SMTP_PASS) {
    return res.status(503).json({ ok: false, code: "not_configured", error: "Email sending is not set up yet." });
  }

  const port = Number(SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: (SMTP_PASS || "").replace(/\s+/g, "") },
  });

  try {
    // Message to you
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${SMTP_USER}>`,
      to: CONTACT_TO || SMTP_USER,
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`, // pressing Reply answers the visitor
      subject: `Portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: emailShell({
        title: "New portfolio inquiry",
        body: `
          <p style="margin:0 0 6px"><strong>From:</strong> ${escapeHtml(name)}</p>
          <p style="margin:0 0 16px"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          <div style="background:#f8fafc;padding:16px;border-radius:8px;border-left:4px solid #f0a920;white-space:pre-wrap;font-size:15px">${escapeHtml(message)}</div>
          <p style="margin:16px 0 0;font-size:13px;color:#64748b">Press Reply to answer ${escapeHtml(name)} directly.</p>`,
      }),
    });

    // Short automatic reply. It never repeats the visitor's message, and it is capped
    // per address and overall, so it can't be used to spam other people.
    let autoReply = false;
    const autoReplyOn = process.env.AUTO_REPLY !== "false";
    if (autoReplyOn && allow(`reply:${email.toLowerCase()}`, 1, HOUR) && allow("global-reply", 20, HOUR)) {
      try {
        await transporter.sendMail({
          from: `"${profile.name}" <${SMTP_USER}>`,
          to: email,
          subject: `Thanks for reaching out, ${name.split(" ")[0]}`,
          text: `Hi ${name},\n\nThanks for contacting me through my portfolio. I have received your message and will get back to you as soon as I can.\n\nBest regards,\n${profile.name}\n${profile.role}\nLinkedIn: ${socials.linkedin}\nGitHub: ${socials.github}`,
          html: emailShell({
            title: "Message received",
            intro: `Thanks for getting in touch, ${escapeHtml(name)}.`,
            body: `
              <p style="margin:0 0 14px">I have received your message and will get back to you as soon as I can.</p>
              <p style="margin:0 0 10px;font-size:14px;color:#475569">In the meantime, feel free to connect with me:</p>
              <a href="${socials.linkedin}" style="${linkStyle}">LinkedIn</a><a href="${socials.github}" style="${linkStyle}">GitHub</a>${socials.instagram ? `<a href="${socials.instagram}" style="${linkStyle}">Instagram</a>` : ""}
              <p style="margin:18px 0 0;font-size:14px">Best regards,<br><strong>${escapeHtml(profile.name)}</strong><br><span style="color:#64748b">${escapeHtml(profile.role)}</span></p>`,
          }),
        });
        autoReply = true;
      } catch (err) {
        console.warn("Auto-reply failed to send:", err.message);
      }
    }

    return res.status(200).json({ ok: true, autoReply });
  } catch (error) {
    console.error("Contact form email failed:", error);
    return res.status(500).json({ ok: false, error: "Could not send your message right now. Please try again later." });
  }
}
