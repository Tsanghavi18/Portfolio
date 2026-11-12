import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Link2, Layers } from "lucide-react";
import { GithubIcon } from "./Icons";
import GlassCard from "./GlassCard";
import { cn } from "@/lib/utils";

/* ---------- Illustrated previews (shown until you add a real screenshot) ---------- */

function SnipPreview() {
  return (
    <div className="flex h-full flex-col justify-center gap-4 p-6">
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
        <Link2 size={16} className="shrink-0 text-accent" aria-hidden="true" />
        <span className="truncate font-mono text-xs text-white/50">https://example.com/a/very/long/link/…</span>
      </div>
      <div className="flex items-center justify-center text-accent">
        <span className="h-px w-10 bg-accent/40" />
        <span className="mx-2 font-mono text-xs">shorten</span>
        <span className="h-px w-10 bg-accent/40" />
      </div>
      <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-accent to-accent-2 px-4 py-3 text-on-accent">
        <span className="font-mono text-sm font-semibold">short.link/x7k</span>
        <span className="rounded-md bg-black/15 px-2 py-0.5 text-xs font-semibold">Copy</span>
      </div>
    </div>
  );
}

function LinkTreePreview() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2.5 p-6">
      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-accent to-accent-2" />
      <div className="h-2.5 w-24 rounded-full bg-white/25" />
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="w-4/5 rounded-xl border border-white/10 bg-white/[0.07] py-2.5 text-center">
          <div className={cn("mx-auto h-2 rounded-full bg-white/30", i % 2 ? "w-1/3" : "w-1/2")} />
        </div>
      ))}
    </div>
  );
}

function ExpensePreview() {
  const bars = [40, 65, 35, 80, 55, 90, 50];
  return (
    <div className="flex h-full flex-col justify-between gap-4 p-6">
      <div className="flex items-end justify-between">
        <div>
          <div className="h-2 w-16 rounded-full bg-white/25" />
          <div className="mt-2 h-4 w-28 rounded-full bg-white/60" />
        </div>
        <div className="h-6 w-14 rounded-md bg-accent/80" />
      </div>
      <div className="flex h-24 items-end gap-2">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-accent/30 to-accent" style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="space-y-2">
        {[0, 1].map((i) => (
          <div key={i} className="flex items-center justify-between rounded-lg bg-white/[0.06] px-3 py-2">
            <div className="h-2 w-20 rounded-full bg-white/30" />
            <div className="h-2 w-10 rounded-full bg-white/50" />
          </div>
        ))}
      </div>
    </div>
  );
}

function NextPreview() {
  return (
    <div className="flex h-full flex-col justify-center gap-4 p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-sm font-black text-black">N</span>
        <div className="h-2.5 w-28 rounded-full bg-white/30" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={cn("flex h-16 items-center justify-center rounded-xl border border-white/10", i === 1 ? "bg-accent/80" : "bg-white/[0.07]")}>
            <Layers size={18} className={i === 1 ? "text-on-accent" : "text-white/50"} aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}

const previews = { snipurl: SnipPreview, linktree: LinkTreePreview, expense: ExpensePreview, nextjs: NextPreview };

function Preview({ project }) {
  const Art = previews[project.preview] || NextPreview;
  return (
    <div className="relative overflow-hidden rounded-xl bg-[#0b0f18] ring-1 ring-white/10">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-accent" />
        <span className="ml-2 truncate font-mono text-[11px] text-white/45">{project.live || project.name.toLowerCase().replace(/\s+/g, "-")}</span>
      </div>
      <div className="relative aspect-[16/10]">
        {project.image ? (
          <Image
            src={project.image}
            alt={`Screenshot of ${project.name}`}
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <>
            <div className="h-full transition-transform duration-500 group-hover:scale-[1.03]">
              <Art />
            </div>
            <span className="absolute bottom-2 right-3 rounded-full bg-black/40 px-2 py-0.5 font-mono text-[10px] text-white/60">
              Preview illustration
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default function ProjectCard({ project }) {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 24 }} className="group h-full">
      <GlassCard as="article" className="flex h-full flex-col p-4 sm:p-5">
        <Preview project={project} />

        <div className="flex flex-1 flex-col px-1 pb-1 pt-5">
          <p className="inline-flex w-fit items-center rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent-strong">
            {project.category}
          </p>
          <h3 className="mt-3 font-display text-2xl font-bold tracking-tight">{project.name}</h3>
          <p className="mt-2 text-sm text-muted">{project.description}</p>

          <ul className="mt-4 space-y-2">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-2.5 text-sm">
                <Check size={16} className="mt-0.5 shrink-0 text-accent-strong" aria-hidden="true" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-2 px-4 py-2 text-sm font-semibold text-on-accent transition-transform hover:-translate-y-0.5"
              >
                <GithubIcon size={16} /> View on GitHub
              </a>
            ) : (
              <span className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-dashed border-accent/50 px-4 py-2 text-sm text-muted">
                <GithubIcon size={16} /> Repository link coming soon
              </span>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="glass inline-flex min-h-11 items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors hover:text-accent-strong"
              >
                Live demo <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
