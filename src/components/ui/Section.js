import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1];

// Each section opens with its own effect. (clip-path and opacity also play for
// visitors who prefer reduced motion; only the sliding/scaling is removed for them.)
const effects = {
  rise: { hidden: { opacity: 0, y: 44 }, show: { opacity: 1, y: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.95, y: 24 }, show: { opacity: 1, scale: 1, y: 0 } },
  "slide-left": { hidden: { opacity: 0, x: -64 }, show: { opacity: 1, x: 0 } },
  "slide-right": { hidden: { opacity: 0, x: 64 }, show: { opacity: 1, x: 0 } },
};

/**
 * Wraps a page section. On first scroll into view:
 *  1. an amber line draws across the top with the section number,
 *  2. the section content plays its own entrance effect.
 */
export default function Section({ id, index, effect = "rise", className, children }) {
  return (
    <section id={id} className={cn("section-space relative", className)}>
      <div className="container-page">
        {index && (
          <div className="mb-10 flex items-center gap-4" aria-hidden="true">
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.4, ease }}
              className="glass flex h-10 min-w-10 items-center justify-center rounded-xl px-2 font-mono text-sm font-semibold text-accent-strong"
            >
              {index}
            </motion.span>
            <motion.span
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              className="h-px flex-1 bg-gradient-to-r from-accent via-accent-2/60 to-transparent"
            />
          </div>
        )}

        <motion.div
          variants={effects[effect] || effects.rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.06 }}
          transition={{ duration: 0.7, ease }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
