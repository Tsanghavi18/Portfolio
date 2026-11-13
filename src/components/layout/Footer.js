import { motion } from "framer-motion";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import Logo from "@/components/ui/Logo";
import SocialLinks from "@/components/ui/SocialLinks";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { contact, footer, navLinks, profile } from "@/data/portfolio";

const stack = ["React.js", "Next.js", "JavaScript", "Tailwind CSS", "Node.js", "MySQL"];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden pt-8">
      <div className="container-page">
        {/* Call-to-action panel */}
        <Reveal>
          <GlassCard strong className="relative overflow-hidden p-8 sm:p-12">
            <div aria-hidden="true" className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/25 blur-3xl" />
            <div aria-hidden="true" className="absolute -bottom-24 left-10 h-56 w-56 rounded-full bg-blue/20 blur-3xl" />
            <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div className="max-w-xl">
                <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{profile.tagline}</h2>
                <p className="mt-3 text-muted">Open to full stack and frontend opportunities.</p>
              </div>
              <Button href="#contact" className="shrink-0">
                {contact.button} <ArrowUpRight size={18} aria-hidden="true" />
              </Button>
            </div>
          </GlassCard>
        </Reveal>

        {/* Link columns */}
        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-12">
          <Reveal className="min-w-0 md:col-span-5">
            <Logo />
            <p className="mt-5 max-w-sm text-muted">
              {profile.role} building responsive, user-friendly web applications.
            </p>
            <SocialLinks className="mt-6" />
          </Reveal>

          <Reveal delay={0.08} className="min-w-0 md:col-span-3 md:col-start-7">
            <nav aria-label="Footer">
              <p className="font-display text-sm font-bold">Navigate</p>
              <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-1">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a href={`#${link.id}`} className="text-muted transition-colors hover:text-accent-strong">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>

          <Reveal delay={0.16} className="min-w-0 md:col-span-3">
            <p className="font-display text-sm font-bold">Core stack</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {stack.map((t) => (
                <li key={t} className="glass rounded-full px-3 py-1 font-mono text-xs">{t}</li>
              ))}
            </ul>
            <motion.a
              href="#home"
              whileHover={{ y: -3 }}
              className="glass mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors hover:text-accent-strong"
            >
              Back to top <ArrowUp size={16} aria-hidden="true" />
            </motion.a>
          </Reveal>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-2 border-t border-line py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.credit}</p>
          <p>
            &copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span> {profile.name}. {footer.rights}
          </p>
        </div>
      </div>

      {/* Oversized name, cropped at the bottom edge */}
      <p
        aria-hidden="true"
        className="pointer-events-none -mb-[0.2em] select-none whitespace-nowrap bg-gradient-to-b from-accent/30 to-transparent bg-clip-text text-center font-display text-[22vw] font-bold leading-[0.8] tracking-tighter text-transparent"
      >
        TARUN
      </p>
    </footer>
  );
}
