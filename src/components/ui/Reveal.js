import { motion } from "framer-motion";

const tags = { div: motion.div, li: motion.li, p: motion.p, article: motion.article };

/** Fades + lifts content into view once, when it scrolls on screen. */
export default function Reveal({ as = "div", children, delay = 0, y = 20, className }) {
  const Tag = tags[as] || motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
