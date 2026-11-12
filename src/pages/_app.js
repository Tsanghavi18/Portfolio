import "@/styles/globals.css";
import { motion, MotionConfig } from "framer-motion";
import { Inter, Geist, Geist_Mono } from "next/font/google";

// Fonts are self-hosted by Next.js at build time (no layout shift, no external requests).
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export default function App({ Component, pageProps }) {
  return (
    // reducedMotion="user": visitors who prefer less motion get no movement animations
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`${inter.variable} ${geist.variable} ${geistMono.variable} relative z-10 font-sans`}
      >
        <Component {...pageProps} />
      </motion.div>
    </MotionConfig>
  );
}
