import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { navLinks, profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  // Thin amber reading-progress line along the bottom of the bar
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  // Handle scroll events: navbar backdrop style and reliable active section tracking
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 12);

          // 1. If at the very top of the page, activate "home"
          if (window.scrollY < 100) {
            setActive("home");
            ticking = false;
            return;
          }

          // 2. If scrolled near the bottom of the page, activate the last section ("contact")
          if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
            setActive(navLinks[navLinks.length - 1].id);
            ticking = false;
            return;
          }

          // 3. Find which section is currently active based on viewport position
          let currentSection = "home";
          const threshold = 180; // 180px from top (below navbar)

          for (const link of navLinks) {
            const el = document.getElementById(link.id);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= threshold) {
                currentSection = link.id;
              }
            }
          }

          setActive(currentSection);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: close with Escape and lock page scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Handle mobile navigation click: unlock body scroll, close menu, and scroll accurately
  const handleMobileNavClick = (e, id) => {
    e.preventDefault();
    setActive(id);
    document.body.style.overflow = "";
    setOpen(false);

    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const navHeight = 88;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - navHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 60);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5"
    >
      <div
        className={cn(
          "relative mx-auto max-w-6xl rounded-2xl transition-[background-color,box-shadow] duration-300",
          scrolled || open ? "nav-glass" : "nav-glass-top"
        )}
      >
        <div className="flex h-18 items-center justify-between px-3 sm:px-4">
          <a
            href="#home"
            aria-label="Tarun Sanghavi, back to top"
            onClick={(e) => {
              if (open) {
                handleMobileNavClick(e, "home");
              } else {
                setActive("home");
              }
            }}
          >
            <Logo />
          </a>

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden items-center gap-2 lg:flex">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setActive(link.id)}
                    aria-current={active === link.id ? "page" : undefined}
                    className={cn(
                      "relative block rounded-xl px-4 py-2 text-sm font-medium transition-colors",
                      active === link.id ? "text-accent-strong" : "text-muted hover:text-ink"
                    )}
                  >
                    {active === link.id && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-xl bg-accent-soft ring-1 ring-accent/30"
                        transition={{ type: "spring", stiffness: 450, damping: 36 }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
            <ThemeToggle />
            <Button href={profile.resumeUrl} download className="ml-1 min-h-10 px-4 py-2 text-sm">
              <Download size={16} aria-hidden="true" /> Resume
            </Button>
          </nav>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--glass-border)] bg-ink/[0.06]"
            >
              {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobile-menu"
              aria-label="Mobile"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden border-t border-line lg:hidden"
            >
              <ul className="px-4 pt-2">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i + 0.08 }}
                    className="border-b border-line last:border-0"
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => handleMobileNavClick(e, link.id)}
                      aria-current={active === link.id ? "page" : undefined}
                      className={cn(
                        "flex min-h-14 items-center font-display text-xl font-bold",
                        active === link.id ? "text-accent-strong" : "text-ink"
                      )}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="p-4">
                <Button href={profile.resumeUrl} download className="w-full">
                  <Download size={18} aria-hidden="true" /> Download Resume
                </Button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

        <motion.div aria-hidden="true" style={{ scaleX: progress }} className="absolute inset-x-4 bottom-0 h-0.5 origin-left rounded-full bg-gradient-to-r from-accent to-accent-2" />
      </div>
    </motion.header>
  );
}
