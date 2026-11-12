import { motion } from "framer-motion";
import { Blocks, Bug, MonitorSmartphone, Plug, Quote, Users } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { about } from "@/data/portfolio";

const icons = { MonitorSmartphone, Blocks, Plug, Bug, Users };

export default function About() {
  const [lead, ...rest] = about.paragraphs;
  return (
    <Section id="about" index="01" effect="slide-left">
      <SectionHeading caption="Who I am" title={about.title} />

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Story */}
        <Reveal className="min-w-0 lg:col-span-7">
          <GlassCard strong className="h-full p-7 sm:p-10">
            <p className="font-display text-xl font-medium leading-snug tracking-tight sm:text-2xl">{lead}</p>
            <div className="mt-6 space-y-4 text-muted">
              {rest.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
            <figure className="mt-8 flex gap-4 rounded-xl border-l-2 border-accent bg-accent-soft p-5">
              <Quote size={22} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
              <blockquote className="text-sm font-medium leading-relaxed sm:text-base">{about.quote}</blockquote>
            </figure>
          </GlassCard>
        </Reveal>

        {/* Focus areas */}
        <div className="min-w-0 lg:col-span-5">
          <Reveal delay={0.1}>
            <h3 className="font-display text-xl font-bold">{about.focusTitle}</h3>
          </Reveal>
          <ul className="mt-4 space-y-3">
            {about.focus.map((item, i) => {
              const Icon = icons[item.icon] || Blocks;
              return (
                <Reveal as="li" key={item.text} delay={0.12 + i * 0.07} y={20}>
                  <motion.div whileHover={{ x: 6 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}>
                    <GlassCard className="group flex items-center gap-4 p-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-strong transition-colors group-hover:bg-accent group-hover:text-on-accent">
                        <Icon size={20} aria-hidden="true" />
                      </span>
                      <span className="text-sm font-medium sm:text-base">{item.text}</span>
                    </GlassCard>
                  </motion.div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
