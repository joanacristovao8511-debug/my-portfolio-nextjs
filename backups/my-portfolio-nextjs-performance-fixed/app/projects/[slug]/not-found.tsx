import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function ProjectNotFound() {
  return (
    <main className="project-page min-h-screen px-6 py-10">
      <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center text-center">
        <div className="fixed right-5 top-5 z-10"><ThemeToggle className="project-theme-toggle h-10 w-10 !justify-center !px-0 !py-0" /></div>
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-400/10 text-sky-300">
          <SearchX className="h-7 w-7" aria-hidden="true" />
        </div>
        <p className="mt-7 text-xs font-black uppercase tracking-[0.24em] text-sky-400">Project unavailable</p>
        <h1 className="project-heading mt-3 text-4xl font-black tracking-tight">That case study is not published.</h1>
        <p className="project-muted mt-4 max-w-md text-sm leading-7">It may have been unpublished or the link may be outdated.</p>
        <Link href="/#work" className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to selected work
        </Link>
      </div>
    </main>
  );
}
