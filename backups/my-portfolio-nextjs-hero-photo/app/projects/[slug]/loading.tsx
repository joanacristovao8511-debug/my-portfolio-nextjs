export default function ProjectLoading() {
  return (
    <main className="project-page min-h-screen px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="h-5 w-36 animate-pulse rounded-full bg-[color-mix(in_srgb,var(--foreground)_8%,transparent)]" />
        <div className="space-y-4">
          <div className="h-4 w-24 animate-pulse rounded-full bg-sky-500/20" />
          <div className="h-14 w-3/4 animate-pulse rounded-2xl bg-[color-mix(in_srgb,var(--foreground)_8%,transparent)]" />
          <div className="h-5 w-2/3 animate-pulse rounded-full bg-[color-mix(in_srgb,var(--foreground)_8%,transparent)]" />
        </div>
        <div className="h-80 animate-pulse rounded-[32px] border border-white/10 bg-[color-mix(in_srgb,var(--foreground)_4%,transparent)]" />
        <p className="sr-only">Loading project case study…</p>
      </div>
    </main>
  );
}
