import { motion } from "framer-motion";
import { socials } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "./Icons";
import { cn } from "@/lib/utils";

const items = [
  { label: "GitHub profile", href: socials.github, Icon: GithubIcon },
  { label: "LinkedIn profile", href: socials.linkedin, Icon: LinkedinIcon },
  { label: "Instagram profile", href: socials.instagram, Icon: InstagramIcon },
];

export default function SocialLinks({ className }) {
  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {items.map(({ label, href, Icon }) => (
        <li key={label}>
          <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            whileHover={{ y: -3 }}
            className="glass inline-flex h-11 w-11 items-center justify-center rounded-xl text-ink transition-colors hover:border-accent/60 hover:text-accent-strong"
          >
            <Icon size={18} />
          </motion.a>
        </li>
      ))}
    </ul>
  );
}
