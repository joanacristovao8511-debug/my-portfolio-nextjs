import Link from "next/link";
import { ArrowLeft, Code2 } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#070b12] px-6 py-20 text-white">
      <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-400/10 text-sky-300">
          <Code2 className="h-7 w-7" aria-hidden="true" />
        </div>
        <p className="mt-7 text-xs font-black uppercase tracking-[0.24em] text-sky-400">404 · Not found</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight">That page does not exist.</h1>
        <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">The link may be outdated, unpublished, or no longer available.</p>
        <Link href="/" className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to portfolio
        </Link>
      </div>
    </main>
  );
}
