import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1];

// The h2 itself is what scrolls into view (it is never clipped), and it tells
// each word to rise from behind its mask in turn.
const titleVariants = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } } };
const wordVariants = {
  hidden: { y: "115%", opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.8, ease } },
};

/** Caption pill + title (words rise from behind a mask) + optional description. */
export default function SectionHeading({ caption, title, description, className }) {
  const words = title.split(" ");
  return (
    <div className={cn("max-w-2xl", className)}>
      <motion.p
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.2, ease }}
        className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-accent-strong"
      >
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
        {caption}
      </motion.p>

      <motion.h2
        className="text-title mt-5"
        variants={titleVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        <span className="sr-only">{title}</span>
        <span aria-hidden="true">
          {words.map((word, i) => (
            <span key={i} className="-mb-[0.12em] mr-[0.25em] inline-block overflow-hidden pb-[0.12em] align-bottom">
              <motion.span className="inline-block" variants={wordVariants}>
                {word}
              </motion.span>
            </span>
          ))}
        </span>
      </motion.h2>

      {description && (
        <Reveal delay={0.5}>
          <p className="mt-4 max-w-xl text-lg text-muted">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
