import Image from "next/image";
import { cn } from "@/lib/utils";

/** Your TS logo (public/logo-mark.png) on its own navy tile, so it works in both themes. */
export function LogoMark({ className, decorative = false }) {
  return (
    <Image
      src="/logo-mark.png"
      width={332}
      height={240}
      alt={decorative ? "" : "Tarun Sanghavi logo"}
      priority
      className={cn("h-10 w-auto shrink-0 rounded-lg ring-1 ring-white/15", className)}
    />
  );
}

/** Logo only by default. Pass `showName` to add the name next to it (used in the footer). */
export default function Logo({ showName = false, className }) {
  return (
    <span className={cn("inline-flex items-center gap-3 text-ink", className)}>
      <LogoMark decorative={showName} />
      {showName && (
        <span className="font-display text-lg font-bold leading-none tracking-tight">Tarun Sanghavi</span>
      )}
    </span>
  );
}
