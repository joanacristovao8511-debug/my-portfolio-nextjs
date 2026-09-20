export default function Loading() {
  return (
    <main className="min-h-screen bg-[#070b12] text-white" aria-busy="true" aria-label="Loading portfolio">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
        <div className="w-full max-w-md space-y-4">
          <div className="h-3 w-24 animate-pulse rounded-full bg-sky-500/30" />
          <div className="h-12 w-3/4 animate-pulse rounded-2xl bg-white/10" />
          <div className="h-4 w-full animate-pulse rounded-full bg-white/10" />
          <div className="h-4 w-5/6 animate-pulse rounded-full bg-white/10" />
          <p className="sr-only">Loading portfolio content…</p>
        </div>
      </div>
    </main>
  );
}
