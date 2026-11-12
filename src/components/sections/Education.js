import { motion } from "framer-motion";
import { GraduationCap, Info } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import { education } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export default function Education() {
  return (
    <div className="min-w-0">
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-on-accent">
            <GraduationCap size={22} aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-display text-2xl font-bold tracking-tight">Education</h3>
            <p className="text-sm text-muted">Where I studied</p>
          </div>
        </div>
      </Reveal>

      <ul className="mt-6 space-y-4">
        {education.map((item, i) => (
          <Reveal as="li" key={item.institution} delay={0.1 + i * 0.08}>
            <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 24 }}>
              <GlassCard className={cn("p-6", item.placeholder && "border-dashed border-accent/50!")}>
                {item.placeholder && (
                  <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 font-mono text-xs text-accent-strong">
                    <Info size={14} aria-hidden="true" /> Placeholder: add your details
                  </p>
                )}
                <h4 className="font-display text-xl font-bold">{item.institution}</h4>
                <p className="mt-1">{item.degree}{item.field ? `, ${item.field}` : ""}</p>
                <p className="mt-3 inline-block rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">{item.duration}</p>
                {item.details && <p className="mt-4 text-sm text-muted">{item.details}</p>}
              </GlassCard>
            </motion.div>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
