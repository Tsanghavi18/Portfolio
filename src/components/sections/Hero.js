import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Atom, Briefcase, Download, MonitorSmartphone } from "lucide-react";
import Button from "@/components/ui/Button";
import SocialLinks from "@/components/ui/SocialLinks";
import { profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1];
const icons = { Briefcase, Atom, MonitorSmartphone };

// Headline words and accent highlights for luxury gradient styling
const headlineWords = profile.headline.split(" ");
const accentWords = (profile.headlineAccent || "").split(" ");

// Floating stack chips around the card
const chips = [
  { label: "React.js", pos: "-left-4 top-10", delay: 1.4 },
  { label: "Next.js", pos: "-right-4 top-24", delay: 1.55 },
  { label: "Node.js", pos: "-left-6 bottom-28", delay: 1.7 },
  { label: "MySQL", pos: "-right-2 bottom-12", delay: 1.85 },
];

// Code card shown in the hero (uses fixed editor colors so it looks the same in both themes)
const codeLines = [
  [["const ", "kw"], ["tarun", "key"], [" = {", "p"]],
  [["  role", "key"], [": ", "p"], ['"Full Stack Developer"', "str"], [",", "p"]],
  [["  focus", "key"], [": ", "p"], ['"Frontend Development"', "str"], [",", "p"]],
  [["  stack", "key"], [": [", "p"], ['"React.js"', "str"], [", ", "p"], ['"Next.js"', "str"], [", ", "p"], ['"Node.js"', "str"], ["],", "p"]],
  [["  company", "key"], [": ", "p"], ['"AzzipTech"', "str"], [",", "p"]],
  [["  openTo", "key"], [": [", "p"], ['"Part-Time"', "str"], [", ", "p"], ['"Freelance"', "str"], ["],", "p"]],
  [["};", "p"]],
];
const colorFor = { kw: "text-[#f5b53d]", key: "text-[#ebe8e1]", str: "text-[#7cc4ff]", p: "text-white/45" };
const codeContainer = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 1.1 } } };
const codeLine = { hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0, transition: { duration: 0.35 } } };

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-svh items-center overflow-hidden pb-12 pt-28 lg:pb-8 lg:pt-24">
      <div aria-hidden="true" className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="container-page relative grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
        {/* ---------- Text ---------- */}
        <div className="min-w-0 lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease }}
            className="glass inline-flex items-center gap-3 rounded-full px-4 py-2 text-sm font-medium"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
            {profile.availability}
          </motion.p>

          <div className="relative mt-6">
            {/* Ambient luxury aura behind the headline */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-6 -top-8 h-36 w-80 rounded-full bg-accent/15 blur-3xl"
            />
            <h1 className="relative text-[clamp(2.1rem,4.2vw,3.8rem)] font-bold leading-[1.08] tracking-[-0.035em]">
              <span className="sr-only">{profile.headline}</span>
              <span aria-hidden="true">
                {headlineWords.map((word, i) => {
                  const isAccent = accentWords.includes(word);
                  return (
                    <span
                      key={i}
                      className="-mb-[0.12em] mr-[0.24em] inline-block overflow-hidden pb-[0.12em] align-bottom"
                    >
                      <motion.span
                        className={cn(
                          "inline-block",
                          isAccent &&
                          "bg-gradient-to-r from-accent via-[#ffe3a1] to-accent-2 bg-clip-text text-transparent drop-shadow-[0_2px_22px_rgba(245,181,61,0.28)]"
                        )}
                        initial={{ y: "110%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.75, delay: 0.45 + i * 0.07, ease }}
                      >
                        {word}
                      </motion.span>
                    </span>
                  );
                })}
              </span>
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1, ease }}
            className="mt-5 max-w-xl space-y-3 text-base text-muted"
          >
            <p>{profile.intro[0]}</p>
            {/* second paragraph is hidden on short screens so the hero always fits */}
            <p className="[@media(max-height:760px)]:hidden">{profile.intro[1]}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3, ease }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <Button href="#projects">
              Explore My Work <ArrowRight size={18} aria-hidden="true" />
            </Button>
            <Button href="#contact" variant="glass">
              Let&apos;s Connect
            </Button>
            <Button href={profile.resumeUrl} download variant="ghost" className="px-3">
              <Download size={18} aria-hidden="true" /> Download Resume
            </Button>
          </motion.div>

          <motion.ul
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 1.55 } } }}
            className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3"
          >
            {profile.highlights.map(({ icon, text }) => {
              const Icon = icons[icon] || Briefcase;
              return (
                <motion.li
                  key={text}
                  variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}
                  className="glass flex items-start gap-3 rounded-xl p-3.5"
                >
                  <Icon size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                  <span className="text-[13px] leading-snug">{text}</span>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>

        {/* ---------- Visual: glass profile card (hidden on small phones to keep the hero compact) ---------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease }}
          className="relative mx-auto hidden w-full max-w-sm md:block lg:col-span-5 lg:max-w-md"
        >
          <div className="glass-strong rounded-[2rem] p-5">
            {/* Optional photo: add `photo: "/your-photo.jpg"` to profile in portfolio.js */}
            {profile.photo && (
              <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-line">
                <Image
                  src={profile.photo}
                  alt={`Portrait of ${profile.name}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 28rem, 24rem"
                  className="object-cover"
                />
              </div>
            )}

            <div className="overflow-hidden rounded-2xl bg-[#0b0f18] text-white ring-1 ring-white/10">
              <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#f5b53d]" />
                <span className="ml-3 font-mono text-xs text-white/45">tarun.js</span>
              </div>
              <motion.pre
                variants={codeContainer}
                initial="hidden"
                animate="show"
                className="overflow-x-auto p-4 font-mono text-xs leading-7 sm:p-5"
                aria-label="Code summary of my profile"
              >
                <code className="block">
                  {codeLines.map((line, i) => (
                    <motion.span key={i} variants={codeLine} className="flex">
                      <span aria-hidden="true" className="w-6 shrink-0 select-none text-white/25">{i + 1}</span>
                      <span className="whitespace-pre">
                        {line.map(([text, role], j) => (
                          <span key={j} className={colorFor[role]}>{text}</span>
                        ))}
                        {i === codeLines.length - 1 && (
                          <span aria-hidden="true" className="animate-blink ml-1 inline-block h-4 w-1.5 translate-y-0.5 bg-[#f5b53d]" />
                        )}
                      </span>
                    </motion.span>
                  ))}
                </code>
              </motion.pre>
            </div>

            <SocialLinks className="mt-4 justify-center" />
          </div>

          {chips.map((c, i) => (
            <motion.span
              key={c.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
              transition={{
                opacity: { duration: 0.5, delay: c.delay },
                scale: { duration: 0.5, delay: c.delay },
                y: { duration: 5 + i * 0.6, repeat: Infinity, ease: "easeInOut", delay: c.delay },
              }}
              className={`glass-strong absolute hidden rounded-full px-3.5 py-1.5 font-mono text-xs font-medium text-accent-strong lg:block ${c.pos}`}
            >
              {c.label}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
