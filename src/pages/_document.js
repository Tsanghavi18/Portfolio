import { Html, Head, Main, NextScript } from "next/document";

// Runs before the page paints so the saved theme is applied with no flash.
// Order: saved choice -> dark (default).
const themeScript = `
(function () {
  try {
    var saved = localStorage.getItem("theme");
    document.documentElement.setAttribute("data-theme", saved || "dark");
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();
`;

export default function Document() {
  return (
    <Html lang="en" data-theme="dark">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0a0c11" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
