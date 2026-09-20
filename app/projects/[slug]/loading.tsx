export default function ProjectLoading() {
  return (
    <main className="min-h-screen bg-[#070b12] px-5 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="h-5 w-36 animate-pulse rounded-full bg-white/10" />
        <div className="space-y-4">
          <div className="h-4 w-24 animate-pulse rounded-full bg-sky-500/20" />
          <div className="h-14 w-3/4 animate-pulse rounded-2xl bg-white/10" />
          <div className="h-5 w-2/3 animate-pulse rounded-full bg-white/10" />
        </div>
        <div className="h-80 animate-pulse rounded-[32px] border border-white/10 bg-white/[0.04]" />
        <p className="sr-only">Loading project case study…</p>
      </div>
    </main>
  );
}
