import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Atom, Braces, Bug, ClipboardCheck, Code, Database, Flag, Flame, GitBranch,
  LayoutGrid, Layers, Leaf, Mail, MonitorSmartphone, Palette, Pause, Play, Plug, Search, Send,
  Server, Smartphone, Sparkles, Webhook, Wind, Wrench,
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { GithubIcon } from "@/components/ui/Icons";
import { skills } from "@/data/portfolio";
import { cn } from "@/lib/utils";

// Icons used by skills in portfolio.js (add one here when you add a new `icon` name)
const iconMap = {
  Code, Palette, Braces, Atom, Layers, Wind, LayoutGrid, Server, Plug, Mail, Database, Leaf,
  GitBranch, Github: GithubIcon, Send, Flag, Sparkles, ClipboardCheck, Search, Bug,
  MonitorSmartphone, Smartphone, Webhook, Flame,
};

const categoryIcons = { frontend: Layers, backend: Server, database: Database, tools: Wrench, quality: ClipboardCheck };

const AUTOPLAY_MS = 4500;

const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: dir * 70, scale: 0.96 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir) => ({ opacity: 0, x: dir * -70, scale: 0.96 }),
};

export default function Skills() {
  const [catIndex, setCatIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [hovered, setHovered] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const group = skills[catIndex];
  const total = group.items.length;
  const current = group.items[index];
  const CurrentIcon = iconMap[current.icon] || Braces;
  const playing = !userPaused && !hovered && !reduceMotion;

  function next() {
    setDirection(1);
    setIndex((i) => (i + 1) % total);
  }
  function prev() {
    setDirection(-1);
    setIndex((i) => (i - 1 + total) % total);
  }
  function jump(i) {
    setDirection(i >= index ? 1 : -1);
    setIndex(i);
  }
  function chooseCategory(i) {
    setDirection(i >= catIndex ? 1 : -1);
    setCatIndex(i);
    setIndex(0);
  }

  // Autoplay: advance one slide at a time; pauses on hover, focus or the pause button
  useEffect(() => {
    if (!playing) return undefined;
    const timer = setTimeout(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % total);
    }, AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [playing, index, catIndex, total]);

  function onKeyDown(e) {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  }

  return (
    <Section id="skills" index="02" effect="scale">
      <SectionHeading
        caption="Technical expertise"
        title="The tools I build and test with."
        description="Pick an area, then swipe, drag or use the arrows to explore each skill."
      />

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Category selector */}
        <Reveal className="min-w-0 lg:col-span-4">
          <div
            role="group"
            aria-label="Skill categories"
            className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0 lg:flex-col lg:overflow-visible lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {skills.map((cat, i) => {
              const Icon = categoryIcons[cat.id] || Layers;
              const isActive = i === catIndex;
              return (
                <button
                  key={cat.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => chooseCategory(i)}
                  className={cn(
                    "relative flex min-w-56 shrink-0 items-center gap-4 overflow-hidden rounded-2xl p-4 text-left transition-colors lg:min-w-0",
                    isActive ? "glass-strong" : "glass hover:border-accent/40"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="cat-indicator"
                      className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-accent to-accent-2"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors",
                      isActive ? "bg-accent text-on-accent" : "bg-accent-soft text-accent-strong"
                    )}
                  >
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-base font-bold leading-tight">{cat.category}</span>
                    <span className="mt-0.5 block font-mono text-xs text-muted">{cat.items.length} skills</span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Slider stage */}
        <Reveal delay={0.1} className="min-w-0 lg:col-span-8">
          <GlassCard
            strong
            role="region"
            aria-roledescription="carousel"
            aria-label={`${group.category} skills`}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
            className="flex min-h-[30rem] flex-col rounded-3xl"
          >
            {/* Autoplay progress */}
            <div aria-hidden="true" className="h-0.5 w-full bg-line">
              {playing && (
                <motion.div
                  key={`${catIndex}-${index}`}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-accent to-accent-2"
                />
              )}
            </div>

            <div className="relative flex flex-1 flex-col overflow-hidden p-6 sm:p-10">
              <p className="font-mono text-xs text-muted">
                {group.category} <span className="text-accent-strong">/ {String(index + 1).padStart(2, "0")} of {String(total).padStart(2, "0")}</span>
              </p>

              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={`${group.id}-${current.name}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -80) next();
                    else if (info.offset.x > 80) prev();
                  }}
                  className="relative mt-6 flex flex-1 cursor-grab flex-col justify-center active:cursor-grabbing"
                >
                  {/* Giant faint icon behind the text */}
                  <CurrentIcon
                    aria-hidden="true"
                    size={260}
                    strokeWidth={1}
                    className="pointer-events-none absolute -bottom-10 -right-6 text-accent opacity-[0.07]"
                  />

                  <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
                    <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-2 text-on-accent shadow-xl shadow-accent/25 sm:h-24 sm:w-24">
                      <CurrentIcon size={40} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">{current.name}</h3>
                      <p className="mt-3 max-w-lg text-base text-muted sm:text-lg">{current.caption}</p>
                    </div>
                  </div>

                  <ul className="relative mt-8 flex flex-wrap gap-2" aria-label="Keywords">
                    {current.keywords.map((k, i) => (
                      <motion.li
                        key={k}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + i * 0.07 }}
                        className="glass rounded-full px-4 py-1.5 font-mono text-xs text-accent-strong"
                      >
                        {k}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls + thumbnails */}
            <div className="border-t border-line p-4 sm:px-8">
              <div className="flex items-center justify-between gap-4">
                <ul className="-mx-1 flex min-w-0 flex-1 gap-2 overflow-x-auto px-1 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Choose a skill">
                  {group.items.map((item, i) => {
                    const Icon = iconMap[item.icon] || Braces;
                    return (
                      <li key={item.name}>
                        <button
                          type="button"
                          onClick={() => jump(i)}
                          aria-label={item.name}
                          aria-current={i === index}
                          title={item.name}
                          className={cn(
                            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all",
                            i === index
                              ? "border-accent bg-accent-soft text-accent-strong"
                              : "border-transparent text-muted hover:border-line hover:text-ink"
                          )}
                        >
                          <Icon size={18} aria-hidden="true" />
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <div className="flex shrink-0 items-center gap-2">
                  {!reduceMotion && (
                    <button
                      type="button"
                      onClick={() => setUserPaused((p) => !p)}
                      aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
                      className="glass inline-flex h-11 w-11 items-center justify-center rounded-xl transition-colors hover:text-accent-strong"
                    >
                      {userPaused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous skill"
                    className="glass inline-flex h-11 w-11 items-center justify-center rounded-xl transition-colors hover:text-accent-strong"
                  >
                    <ArrowLeft size={18} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next skill"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-on-accent transition-transform hover:scale-105"
                  >
                    <ArrowRight size={18} aria-hidden="true" />
                  </button>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted">{group.caption}</p>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </Section>
  );
}
