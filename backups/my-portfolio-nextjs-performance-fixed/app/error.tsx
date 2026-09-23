"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="min-h-screen bg-[#070b12] px-6 py-20 text-white">
      <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-sky-400">Something went wrong</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight">The portfolio could not load.</h1>
        <p className="mt-4 text-sm leading-7 text-slate-400">Please try again. If the problem continues, come back a little later.</p>
        <button type="button" onClick={() => reset()} className="mt-7 min-h-11 rounded-full bg-sky-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-500/30">Try again</button>
      </div>
    </main>
  );
}
