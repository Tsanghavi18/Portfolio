import { profile } from "@/data/portfolio";

// Served at /sitemap.xml. Uses profile.siteUrl from src/data/portfolio.js.
export async function getServerSideProps({ res }) {
  const base = profile.siteUrl.replace(/\/$/, "");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${base}/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>
</urlset>`;
  res.setHeader("Content-Type", "application/xml");
  res.write(xml);
  res.end();
  return { props: {} };
}

export default function Sitemap() {
  return null;
}
