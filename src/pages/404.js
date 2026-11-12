import Head from "next/head";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page not found | Tarun Sanghavi</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <Logo className="mb-8" />
        <p className="glass rounded-full px-3.5 py-1.5 font-mono text-xs text-accent-strong">error 404</p>
        <h1 className="text-display mt-5">Page not found.</h1>
        <p className="mt-5 max-w-md text-muted">The page you are looking for does not exist or has moved.</p>
        <Button href="/" className="mt-8">
          <ArrowLeft size={18} aria-hidden="true" /> Back to portfolio
        </Button>
      </main>
    </>
  );
}
