import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Info, LoaderCircle, Mail, MessageSquare, Send, User } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import SocialLinks from "@/components/ui/SocialLinks";
import { contact, profile, socials } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const namePattern = /^[\p{L}\p{M}][\p{L}\p{M} .'’-]{1,59}$/u;
// Optional Cloudflare Turnstile captcha: turns on when this key is set (see .env.example)
const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const MAX_MESSAGE = 600;

function validate(values) {
  const errors = {};
  if (!namePattern.test(values.name.trim())) errors.name = "Enter your real name (letters only, at least 2 characters).";
  if (!emailPattern.test(values.email.trim())) errors.email = "Enter a valid email address, like name@example.com.";
  if (values.message.trim().length < 10) errors.message = "Write a message of at least 10 characters.";
  return errors;
}

/** Input with an icon and a floating label. */
function Field({ id, label, icon: Icon, error, multiline, rows = 5, ...props }) {
  const shared = cn(
    "peer w-full rounded-xl border bg-ink/[0.04] pb-2.5 pl-12 pr-4 pt-6 text-ink outline-none transition-colors placeholder-transparent",
    "focus:border-accent focus:bg-ink/[0.07]",
    error ? "border-accent-2" : "border-[var(--glass-border)]"
  );
  const label_ = cn(
    "pointer-events-none absolute left-12 text-muted transition-all",
    "top-2 text-xs",
    "peer-placeholder-shown:top-[1.05rem] peer-placeholder-shown:text-base",
    "peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent-strong"
  );
  return (
    <div>
      <div className="relative">
        <Icon size={18} className={cn("absolute left-4 text-muted", multiline ? "top-[1.15rem]" : "top-1/2 -translate-y-1/2")} aria-hidden="true" />
        {multiline ? (
          <textarea id={id} rows={rows} placeholder=" " className={cn(shared, "resize-none")} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...props} />
        ) : (
          <input id={id} placeholder=" " className={shared} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...props} />
        )}
        <label htmlFor={id} className={label_}>{label}</label>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-sm text-accent-strong"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [state, setState] = useState("idle"); // idle | sending | done | error
  const [trap, setTrap] = useState(""); // hidden spam-trap field
  const [note, setNote] = useState("");
  const [autoReply, setAutoReply] = useState(true);
  const startedAt = useRef(0); // when the visitor first saw the form (bots submit instantly)

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const links = [
    { label: "LinkedIn", value: "tarun-sanghavi", href: socials.linkedin, Icon: LinkedinIcon },
    { label: "GitHub", value: "Tsanghavi18", href: socials.github, Icon: GithubIcon },
    // Shown only once you add `email` in portfolio.js
    ...(profile.email ? [{ label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: Mail }] : []),
  ];

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: name === "message" ? value.slice(0, MAX_MESSAGE) : value }));
    if (state !== "idle") setState("idle");
  }

  // Fallback when server-side email is not configured: open the visitor's email app
  function openMailApp() {
    const subject = encodeURIComponent(`Portfolio message from ${values.name.trim()}`);
    const body = encodeURIComponent(`${values.message.trim()}\n\nFrom: ${values.name.trim()} (${values.email.trim()})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setState("done");
    setNote("Your email app should open with this message ready to send.");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const turnstileToken = formData.get("cf-turnstile-response") || "";
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setState("error");
      setNote("Please fix the highlighted fields and try again.");
      return;
    }

    setState("sending");
    setNote("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: trap, elapsed: Date.now() - startedAt.current, turnstileToken }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setAutoReply(Boolean(data.autoReply));
        window.turnstile?.reset?.();
        setState("done");
        setNote("Thank you! Your message has been sent. I will get back to you soon.");
        setValues({ name: "", email: "", message: "" });
        return;
      }
      if (data.code === "not_configured" && profile.email) {
        openMailApp();
        return;
      }
      window.turnstile?.reset?.();
      setState("error");
      setNote(data.error || "Something went wrong. Please try again or reach out on LinkedIn.");
    } catch {
      if (profile.email) {
        openMailApp();
        return;
      }
      setState("error");
      setNote("Network problem. Please try again or reach out on LinkedIn.");
    }
  }

  return (
    <Section id="contact" index="06" effect="rise">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Info */}
        <div className="min-w-0 lg:col-span-5">
          <SectionHeading caption="Get in touch" title={contact.title} />
          <div className="mt-6 space-y-3 text-muted">
            {contact.text.map((t, i) => (
              <Reveal key={t} delay={0.12 + i * 0.06}>
                <p>{t}</p>
              </Reveal>
            ))}
          </div>

          <ul className="mt-8 space-y-3">
            {links.map(({ label, value, href, Icon }, i) => {
              const external = href && !href.startsWith("mailto");
              const inner = (
                <>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-strong transition-colors group-hover:bg-accent group-hover:text-on-accent">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-xs text-muted">{label}</span>
                    <span className="block break-words font-medium">{value}</span>
                  </span>
                  {href && <ArrowUpRight size={18} className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />}
                </>
              );
              return (
                <Reveal as="li" key={label} delay={0.15 + i * 0.07} y={18}>
                  <motion.div whileHover={{ x: 6 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}>
                    <GlassCard className="group">
                      {href ? (
                        <a
                          href={href}
                          target={external ? "_blank" : undefined}
                          rel={external ? "noopener noreferrer" : undefined}
                          className="flex items-center gap-4 p-4 transition-colors hover:text-accent-strong"
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className="flex items-center gap-4 p-4 text-muted">{inner}</div>
                      )}
                    </GlassCard>
                  </motion.div>
                </Reveal>
              );
            })}
          </ul>
        </div>

        {/* Form */}
        <Reveal delay={0.1} className="min-w-0 lg:col-span-7">
          <GlassCard strong className="relative overflow-hidden rounded-3xl p-6 sm:p-9">
            <div aria-hidden="true" className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-accent/20 blur-3xl" />
            <div aria-hidden="true" className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-blue/15 blur-3xl" />

            <form onSubmit={handleSubmit} noValidate className="relative">
              {/* spam trap: hidden from people, bots tend to fill it */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={trap} onChange={(e) => setTrap(e.target.value)} className="absolute -left-[9999px] h-0 w-0 opacity-0" />
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-on-accent">
                  <Send size={20} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-2xl font-bold tracking-tight">Send a message</h3>
                  <p className="text-sm text-muted">I usually reply as soon as I can.</p>
                </div>
              </div>

              <div className="mt-7 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field id="name" name="name" label="Your name" icon={User} autoComplete="name" value={values.name} onChange={handleChange} error={errors.name} />
                  <Field id="email" name="email" type="email" label="Email address" icon={Mail} autoComplete="email" value={values.email} onChange={handleChange} error={errors.email} />
                </div>
                <div>
                  <Field id="message" name="message" label="Your message" icon={MessageSquare} multiline rows={7} value={values.message} onChange={handleChange} error={errors.message} />
                  <p className="mt-2 text-right font-mono text-xs text-muted">{values.message.length}/{MAX_MESSAGE}</p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {state === "done" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="mt-6 rounded-2xl border border-accent/40 bg-accent-soft p-5 text-ink shadow-lg shadow-accent/10"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3.5">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-on-accent shadow-md shadow-accent/25">
                          <Check size={20} strokeWidth={2.5} aria-hidden="true" />
                        </span>
                        <div>
                          <p className="font-semibold text-ink text-base">Message Sent Successfully!</p>
                          <p className="text-xs sm:text-sm text-muted">
                            {autoReply ? "A confirmation email has been sent to you. I will get back to you soon." : "I will get back to you soon."}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setState("idle");
                          setNote("");
                        }}
                        className="glass shrink-0 self-start rounded-xl px-4 py-2 text-xs font-semibold text-ink transition-colors hover:border-accent hover:text-accent-strong sm:self-auto"
                      >
                        Send another
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
                    {turnstileSiteKey && (
                      <>
                        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
                        <div className="cf-turnstile sm:basis-full" data-sitekey={turnstileSiteKey} data-theme="auto" />
                      </>
                    )}
                    <motion.button
                      type="submit"
                      disabled={state === "sending"}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className={cn(
                        "relative inline-flex min-h-13 w-full shrink-0 whitespace-nowrap items-center justify-center gap-2 overflow-hidden rounded-xl px-8 py-3.5 font-semibold text-on-accent transition-shadow sm:w-auto",
                        "bg-gradient-to-r from-accent to-accent-2 shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/35",
                        "before:absolute before:inset-0 before:-translate-x-full before:skew-x-12 before:bg-white/30 before:transition-transform before:duration-700 hover:before:translate-x-full",
                        "disabled:opacity-80"
                      )}
                    >
                      <span className="relative z-10 inline-flex items-center gap-2 whitespace-nowrap">
                        {state === "sending" ? (
                          <>
                            <LoaderCircle size={18} className="animate-spin" aria-hidden="true" /> Sending...
                          </>
                        ) : (
                          <>
                            {contact.button} <Send size={18} aria-hidden="true" />
                          </>
                        )}
                      </span>
                    </motion.button>

                    <div aria-live="polite" className="min-h-6 text-sm">
                      {note && state === "error" && (
                        <motion.p
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 text-accent-strong"
                        >
                          <Info size={18} className="shrink-0" aria-hidden="true" />
                          {note}
                        </motion.p>
                      )}
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </form>

            <div className="relative mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="inline-flex items-center gap-3 text-sm font-medium">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                </span>
                {profile.availability}
              </p>
              <SocialLinks />
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </Section>
  );
}
