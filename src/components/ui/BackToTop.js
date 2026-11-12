import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

/**
 * Floating counter button that displays real-time percentage of the
 * home page visited/scrolled by the user, and scrolls to top on click.
 */
export default function BackToTop() {
  const [percent, setPercent] = useState(0);
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight > 0) {
        const currentPercent = Math.min(
          100,
          Math.max(0, Math.round((scrollY / docHeight) * 100))
        );
        setPercent(currentPercent);
      }

      // Show counter as soon as the user starts scrolling down the page
      setVisible(scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Circular progress calculations
  const radius = 20;
  const circumference = 2 * Math.PI * radius; // ~125.66
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label={`Page visited ${percent} percent, click to return to top`}
          title={`Page explored: ${percent}% (Click to return to top)`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          initial={{ opacity: 0, y: 16, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.85 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="glass fixed bottom-5 right-5 z-40 flex h-13 w-13 items-center justify-center rounded-full border border-accent/40 shadow-xl shadow-accent/20 backdrop-blur-md transition-colors hover:border-accent hover:shadow-accent/30 sm:bottom-8 sm:right-8"
        >
          {/* Circular progress SVG */}
          <svg
            className="absolute inset-0 -rotate-90 pointer-events-none"
            width="52"
            height="52"
            viewBox="0 0 52 52"
          >
            {/* Background Track */}
            <circle
              cx="26"
              cy="26"
              r={radius}
              fill="transparent"
              stroke="currentColor"
              strokeWidth="3"
              className="text-border opacity-20"
            />
            {/* Active Percentage Stroke */}
            <circle
              cx="26"
              cy="26"
              r={radius}
              fill="transparent"
              stroke="url(#page-visit-gradient)"
              strokeWidth="3.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-[stroke-dashoffset] duration-150 ease-out"
            />
            <defs>
              <linearGradient id="page-visit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--accent, #f0a920)" />
                <stop offset="100%" stopColor="var(--accent-2, #f07a1a)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center text/icon: shows % during scroll, switches directly to Arrow at 100% or on hover */}
          <div className="relative z-10 flex items-center justify-center">
            {isHovered || percent >= 100 ? (
              <ArrowUp
                size={19}
                className="text-accent-strong transition-transform duration-200"
                aria-hidden="true"
              />
            ) : (
              <span className="text-[11px] font-bold font-mono tracking-tight text-ink select-none">
                {percent}%
              </span>
            )}
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
