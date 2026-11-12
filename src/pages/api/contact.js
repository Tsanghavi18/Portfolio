import nodemailer from "nodemailer";

/**
 * POST /api/contact
 * Sends the portfolio contact form to your inbox using Nodemailer.
 * Credentials come from environment variables (see .env.example) and never reach the browser.
 */

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Very small per-IP limiter (resets when the server restarts): 5 messages per 10 minutes
const hits = new Map();
function tooManyRequests(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const escapeHtml = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Keeps a value on one line so it can't be used to inject extra email headers
const oneLine = (s) => s.replace(/[\r\n]+/g, " ").trim();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed." });
  }

  const body = req.body || {};

  // Hidden "website" field: real visitors leave it empty, bots fill it. Pretend it worked.
  if (body.website) return res.status(200).json({ ok: true });

  const name = oneLine(String(body.name || ""));
  const email = oneLine(String(body.email || ""));
  const message = String(body.message || "").trim();

  if (name.length < 2 || name.length > 100) return res.status(400).json({ ok: false, error: "Please enter your name." });
  if (!emailPattern.test(email) || email.length > 200) return res.status(400).json({ ok: false, error: "Please enter a valid email address." });
  if (message.length < 10 || message.length > 600) return res.status(400).json({ ok: false, error: "Your message should be 10 to 600 characters." });

  const ip = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown").split(",")[0].trim();
  if (tooManyRequests(ip)) {
    return res.status(429).json({ ok: false, error: "Too many messages. Please try again in a few minutes." });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;
  if (!SMTP_USER || !SMTP_PASS) {
    // Email sending is not configured yet
    return res.status(503).json({ ok: false, code: "not_configured", error: "Email sending is not set up yet." });
  }

  const port = Number(SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio contact form" <${SMTP_USER}>`,
      to: CONTACT_TO || SMTP_USER,
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`, // hitting Reply answers the visitor
      subject: `Portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}<br><strong>Email:</strong> ${escapeHtml(email)}</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    });
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Contact form email failed:", error);
    return res.status(500).json({ ok: false, error: "Could not send your message right now. Please try again later." });
  }
}
