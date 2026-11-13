import { useRef } from "react";
import { useInView } from "framer-motion";

// A slow, calm strip of core technologies. It only moves while it is on screen,
// pauses on hover, and stays still for reduced-motion visitors.
const items = [
  "React.js", "Next.js", "JavaScript", "Tailwind CSS", "React Native", "Node.js",
  "MySQL", "MongoDB", "Firebase", "Technical SEO", "Git", "GitHub", "Postman", "Jira",
];

export default function TechStrip() {
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <section
      ref={ref}
      aria-label="Core technologies"
      className="relative overflow-hidden border-y border-line bg-page py-5"
    >
      <ul
        className="flex w-max animate-marquee will-change-transform hover:[animation-play-state:paused]"
        style={{ animationPlayState: inView ? undefined : "paused" }}
      >
        {[...items, ...items].map((tech, i) => (
          <li
            key={i}
            aria-hidden={i >= items.length}
            className="flex items-center gap-10 whitespace-nowrap pr-10 font-display text-lg font-semibold text-muted"
          >
            {tech}
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
          </li>
        ))}
      </ul>

      {/* Edge fades drawn as plain gradients (cheaper and steadier than a mask on moving content) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-page to-transparent sm:w-32" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-page to-transparent sm:w-32" />
    </section>
  );
}
