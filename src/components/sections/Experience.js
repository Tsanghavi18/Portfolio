import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowRight, Briefcase, Check, GraduationCap } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { experience } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export default function Experience() {
  const ref = useRef(null);
  // The timeline line draws itself as you scroll through the list
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Oldest role first in the "growth" widget
  const path = [...experience].reverse();

  return (
    <Section id="experience" index="04" effect="clip">
      <SectionHeading caption="Professional journey" title="Where I have grown." />

      {/* Company widget */}
      <Reveal className="mt-12">
        <GlassCard strong className="relative overflow-hidden p-6 sm:p-8">
          <div aria-hidden="true" className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-2 font-display text-2xl font-bold text-on-accent">
                A
              </span>
              <div>
                <p className="font-display text-2xl font-bold tracking-tight">AzzipTech</p>
                <p className="font-mono text-xs text-muted">January 2025 - Present</p>
              </div>
            </div>

            <ol className="flex flex-wrap items-center gap-3" aria-label="Career path at AzzipTech">
              {path.map((job, i) => (
                <li key={job.position} className="flex items-center gap-3">
                  <span className={cn("rounded-full px-4 py-1.5 text-sm font-medium", job.current ? "bg-accent text-on-accent" : "glass")}>
                    {job.position}
                  </span>
                  {i < path.length - 1 && <ArrowRight size={18} className="text-accent" aria-hidden="true" />}
                </li>
              ))}
            </ol>
          </div>
        </GlassCard>
      </Reveal>

      {/* Timeline */}
      <div ref={ref} className="relative mt-14">
        <div aria-hidden="true" className="absolute bottom-0 left-4 top-0 w-px bg-line md:left-1/2" />
        <motion.div
          aria-hidden="true"
          style={{ scaleY }}
          className="absolute bottom-0 left-4 top-0 w-px origin-top bg-gradient-to-b from-accent to-accent-2 md:left-1/2"
        />

        <ol className="space-y-12">
          {experience.map((job, i) => {
            const Icon = job.current ? Briefcase : GraduationCap;
            const right = i % 2 === 1;
            return (
              <li key={job.position} className="relative md:grid md:grid-cols-2 md:gap-16">
                {/* timeline dot */}
                <span aria-hidden="true" className="absolute left-4 top-8 z-10 -translate-x-1/2 md:left-1/2">
                  <span className="relative flex h-4 w-4">
                    {job.current && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />}
                    <span className="relative inline-flex h-4 w-4 rounded-full bg-accent ring-4 ring-[var(--page)]" />
                  </span>
                </span>

                <Reveal className={cn("pl-12 md:pl-0", right ? "md:col-start-2" : "md:col-start-1")} y={44}>
                  <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 24 }}>
                    <GlassCard strong className="p-6 sm:p-8">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-strong">
                            <Icon size={22} aria-hidden="true" />
                          </span>
                          <div>
                            <h3 className="font-display text-xl font-bold leading-tight tracking-tight sm:text-2xl">{job.position}</h3>
                            <p className="text-sm text-muted">{job.company}</p>
                          </div>
                        </div>
                        {job.current && (
                          <span className="shrink-0 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-on-accent">Present</span>
                        )}
                      </div>

                      <p className="mt-5 inline-block rounded-full border border-line px-3 py-1 font-mono text-xs text-accent-strong">{job.period}</p>
                      <p className="mt-4 text-sm text-muted">{job.summary}</p>

                      <ul className="mt-5 space-y-2.5">
                        {job.responsibilities.map((r, ri) => (
                          <motion.li
                            key={r}
                            initial={{ opacity: 0, x: -12 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.4, delay: 0.1 + ri * 0.06 }}
                            className="flex gap-3 text-sm"
                          >
                            <Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                            <span>{r}</span>
                          </motion.li>
                        ))}
                      </ul>

                      <ul className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5" aria-label="Keywords">
                        {job.keywords.map((k) => (
                          <li key={k} className="glass rounded-full px-3 py-1 font-mono text-xs">{k}</li>
                        ))}
                      </ul>
                    </GlassCard>
                  </motion.div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
