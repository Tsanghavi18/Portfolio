import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const base =
  "relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-xl px-6 py-3 text-sm font-semibold transition-all sm:text-base";

const variants = {
  // Amber-to-orange gradient with a light sweep on hover
  primary:
    "bg-gradient-to-r from-accent to-accent-2 text-on-accent shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 before:absolute before:inset-0 before:-translate-x-full before:skew-x-12 before:bg-white/30 before:transition-transform before:duration-700 hover:before:translate-x-full",
  glass: "glass text-ink hover:border-accent/60 hover:text-accent-strong",
  ghost: "text-muted hover:text-ink",
};

const motionProps = {
  whileHover: { y: -2 },
  whileTap: { scale: 0.97 },
  transition: { type: "spring", stiffness: 400, damping: 26 },
};

/** Renders a link when `href` is given, otherwise a button. */
export default function Button({ href, variant = "primary", className, children, ...props }) {
  const classes = cn(base, variants[variant], className);
  const content = <span className="relative z-10 inline-flex items-center gap-2">{children}</span>;

  if (href) {
    return (
      <motion.a href={href} className={classes} {...motionProps} {...props}>
        {content}
      </motion.a>
    );
  }
  return (
    <motion.button type="button" className={classes} {...motionProps} {...props}>
      {content}
    </motion.button>
  );
}
