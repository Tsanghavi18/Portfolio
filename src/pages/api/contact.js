import path from "path";
import fs from "fs";
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
    auth: { user: SMTP_USER, pass: (SMTP_PASS || "").replace(/\s+/g, "") },
  });

  // Attach your portfolio logo (public/logo-mark.png) as an inline CID image
  const logoPath = path.join(process.cwd(), "public", "logo-mark.png");
  const hasLogo = fs.existsSync(logoPath);
  const logoAttachments = hasLogo
    ? [
        {
          filename: "logo-mark.png",
          path: logoPath,
          cid: "portfolio-logo",
        },
      ]
    : [];

  try {
    // 1. Send the inquiry notification to you (Tarun)
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${SMTP_USER}>`,
      to: CONTACT_TO || SMTP_USER,
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`, // hitting Reply answers the visitor directly
      subject: `Portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      attachments: logoAttachments,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #f0a920, #f07a1a); padding: 18px 24px; color: #16110a;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                ${
                  hasLogo
                    ? `<td style="vertical-align: middle; padding-right: 12px;">
                        <img src="cid:portfolio-logo" width="40" height="29" alt="TS Logo" style="display: block; border-radius: 6px; border: 1px solid rgba(0,0,0,0.1);" />
                       </td>`
                    : ""
                }
                <td style="vertical-align: middle;">
                  <h2 style="margin: 0; font-size: 20px; font-weight: bold; color: #16110a;">New Portfolio Inquiry</h2>
                </td>
              </tr>
            </table>
          </div>
          <div style="padding: 24px;">
            <p style="margin: 0 0 8px;"><strong>From:</strong> ${escapeHtml(name)}</p>
            <p style="margin: 0 0 16px;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
            <p style="margin: 0 0 8px; font-weight: bold;">Message:</p>
            <div style="background: #f9fafb; padding: 16px; border-radius: 8px; border-left: 4px solid #f0a920; white-space: pre-wrap; font-size: 15px;">${escapeHtml(message)}</div>
          </div>
        </div>
      `,
    });

    // 2. Send an automated confirmation reply to the user
    try {
      await transporter.sendMail({
        from: `"Tarun Sanghavi" <${SMTP_USER}>`,
        to: email,
        subject: `Thank you for reaching out, ${name}!`,
        text: `Hi ${name},\n\nThank you for reaching out through my portfolio website! I have received your message and will review it and get back to you as soon as possible.\n\nHere is a copy of your message:\n"${message}"\n\nBest regards,\nTarun Sanghavi\nFull Stack Developer\nLinkedIn: https://www.linkedin.com/in/tarun-sanghavi/\nGitHub: https://github.com/Tsanghavi18\nInstagram: https://www.instagram.com/tarunn.sanghavi/`,
        attachments: logoAttachments,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 580px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
            <div style="background: linear-gradient(135deg, #f0a920, #f07a1a); padding: 24px; color: #16110a;">
              <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 14px;">
                <tr>
                  ${
                    hasLogo
                      ? `<td style="vertical-align: middle; padding-right: 12px;">
                          <img src="cid:portfolio-logo" width="46" height="33" alt="Tarun Sanghavi Logo" style="display: block; border-radius: 8px; border: 1px solid rgba(0,0,0,0.12); box-shadow: 0 2px 6px rgba(0,0,0,0.1);" />
                         </td>`
                      : ""
                  }
                  <td style="vertical-align: middle;">
                    <span style="display: block; font-size: 18px; font-weight: 700; color: #16110a; letter-spacing: -0.02em;">Tarun Sanghavi</span>
                    <span style="display: block; font-size: 12px; font-weight: 600; color: #3b2800; opacity: 0.9;">Full Stack Developer</span>
                  </td>
                </tr>
              </table>
              <h2 style="margin: 0; font-size: 22px; font-weight: 700;">Message Received! ✨</h2>
              <p style="margin: 6px 0 0; font-size: 14px; opacity: 0.9;">Thanks for getting in touch, ${escapeHtml(name)}.</p>
            </div>
            
            <div style="padding: 28px 24px;">
              <p style="font-size: 15px; margin-top: 0;">Hi <strong>${escapeHtml(name)}</strong>,</p>
              <p style="font-size: 15px; color: #475569;">
                Thank you for reaching out through my portfolio website! I have received your message and will review it and get back to you as soon as possible.
              </p>
              
              <div style="margin: 24px 0; padding: 18px; background-color: #f8fafc; border-radius: 12px; border-left: 4px solid #f0a920;">
                <p style="margin: 0 0 8px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b;">A copy of your message:</p>
                <p style="margin: 0; font-size: 14px; color: #334155; white-space: pre-wrap; font-style: italic;">"${escapeHtml(message)}"</p>
              </div>

              <p style="font-size: 14px; color: #475569; margin-bottom: 4px;">
                In the meantime, feel free to connect with me:
              </p>

              <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 12px;">
                <tr>
                  <td style="padding-right: 10px;">
                    <a href="https://www.linkedin.com/in/tarun-sanghavi/" target="_blank" style="display: inline-block; text-decoration: none; font-size: 13px; font-weight: 600; color: #0a66c2; background-color: #f0f7ff; border: 1px solid #cce4ff; padding: 7px 14px; border-radius: 8px;">
                      <img src="https://img.icons8.com/color/48/linkedin.png" width="16" height="16" alt="LinkedIn" style="vertical-align: -2px; margin-right: 6px; border: 0;" />LinkedIn
                    </a>
                  </td>
                  <td style="padding-right: 10px;">
                    <a href="https://github.com/Tsanghavi18" target="_blank" style="display: inline-block; text-decoration: none; font-size: 13px; font-weight: 600; color: #24292f; background-color: #f6f8fa; border: 1px solid #d0d7de; padding: 7px 14px; border-radius: 8px;">
                      <img src="https://img.icons8.com/color/48/github--v1.png" width="16" height="16" alt="GitHub" style="vertical-align: -2px; margin-right: 6px; border: 0;" />GitHub
                    </a>
                  </td>
                  <td>
                    <a href="https://www.instagram.com/tarunn.sanghavi/" target="_blank" style="display: inline-block; text-decoration: none; font-size: 13px; font-weight: 600; color: #d62976; background-color: #fdf2f8; border: 1px solid #fbcfe8; padding: 7px 14px; border-radius: 8px;">
                      <img src="https://img.icons8.com/color/48/instagram-new--v1.png" width="16" height="16" alt="Instagram" style="vertical-align: -2px; margin-right: 6px; border: 0;" />Instagram
                    </a>
                  </td>
                </tr>
              </table>

              <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 28px 0 20px;" />

              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  ${
                    hasLogo
                      ? `<td style="vertical-align: middle; padding-right: 12px;">
                          <img src="cid:portfolio-logo" width="36" height="26" alt="Logo" style="display: block; border-radius: 6px;" />
                         </td>`
                      : ""
                  }
                  <td style="vertical-align: middle;">
                    <p style="margin: 0; font-size: 14px; font-weight: 700; color: #0f172a;">Tarun Sanghavi</p>
                    <p style="margin: 2px 0 0; font-size: 13px; color: #64748b;">Full Stack Developer</p>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        `,
      });
    } catch (autoReplyErr) {
      console.warn("Auto-reply confirmation failed to send:", autoReplyErr.message);
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Contact form email failed:", error);
    return res.status(500).json({ ok: false, error: "Could not send your message right now. Please try again later." });
  }
}
