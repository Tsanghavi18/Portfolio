import { profile } from "@/data/portfolio";

// Served at /robots.txt.
export async function getServerSideProps({ res }) {
  const base = profile.siteUrl.replace(/\/$/, "");
  res.setHeader("Content-Type", "text/plain");
  res.write(`User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`);
  res.end();
  return { props: {} };
}

export default function Robots() {
  return null;
}
