import { useRef } from "react";
import { cn } from "@/lib/utils";

/** Glass panel with a soft amber light that follows the cursor. */
export default function GlassCard({ as: Tag = "div", strong = false, className, children, ...props }) {
  const ref = useRef(null);

  function handleMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMove}
      className={cn(strong ? "glass-strong" : "glass", "glass-spot rounded-2xl", className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
