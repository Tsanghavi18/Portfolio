import Head from "next/head";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";
import BackToTop from "@/components/ui/BackToTop";
import TechStrip from "@/components/ui/TechStrip";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { profile, socials } from "@/data/portfolio";

const title = `${profile.name} | ${profile.role}`;
const description =
  "Full Stack Developer building modern, responsive and user-focused web experiences with React.js, Next.js, JavaScript, Node.js and MySQL.";
const base = profile.siteUrl.replace(/\/$/, "");

export default function Home() {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content={profile.name} />
        <link rel="canonical" href={profile.siteUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={profile.siteUrl} />
        <meta property="og:site_name" content={profile.name} />
        <meta property="og:image" content={`${base}/og-image.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="TS logo of Tarun Sanghavi" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${base}/og-image.jpg`} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: profile.name,
              jobTitle: profile.role,
              url: profile.siteUrl,
              sameAs: [socials.github, socials.linkedin],
            }),
          }}
        />
      </Head>

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
      >
        Skip to content
      </a>

      <Navbar />
      <main id="main">
        <Hero />
        <TechStrip />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Section id="education" index="05" effect="slide-left">
          <SectionHeading caption="Learning" title="Education & Certifications." />
          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
            <Education />
            <Certifications />
          </div>
        </Section>
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
