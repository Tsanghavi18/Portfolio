import { motion } from "framer-motion";
import { ArrowUpRight, Award, Info } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import { certifications } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export default function Certifications() {
  return (
    <div className="min-w-0">
      <Reveal delay={0.1}>
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-on-accent">
            <Award size={22} aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-display text-2xl font-bold tracking-tight">Certifications</h3>
            <p className="text-sm text-muted">Credentials I have earned</p>
          </div>
        </div>
      </Reveal>

      <ul className="mt-6 space-y-4">
        {certifications.map((item, i) => (
          <Reveal as="li" key={item.name} delay={0.2 + i * 0.08}>
            <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 24 }}>
              <GlassCard className={cn("p-6", item.placeholder && "border-dashed border-accent/50!")}>
                {item.placeholder && (
                  <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 font-mono text-xs text-accent-strong">
                    <Info size={14} aria-hidden="true" /> Placeholder: add your details
                  </p>
                )}
                <h4 className="font-display text-xl font-bold">{item.name}</h4>
                <p className="mt-1">{item.issuer}</p>
                <p className="mt-3 inline-block rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">{item.date}</p>
                {item.url && (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center gap-1 text-sm font-medium text-accent-strong underline underline-offset-4">
                    View credential <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                )}
              </GlassCard>
            </motion.div>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
