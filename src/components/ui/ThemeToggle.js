import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

// Reads the theme that _document.js put on <html data-theme="...">.
function subscribe(callback) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const getSnapshot = () => document.documentElement.getAttribute("data-theme") || "dark";
const getServerSnapshot = () => "dark";

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === "dark";

  function toggle() {
    const next = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage blocked: the choice just won't be remembered */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="glass inline-flex h-10 w-10 items-center justify-center rounded-xl text-ink transition-colors hover:border-accent/60 hover:text-accent-strong"
    >
      {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  );
}
