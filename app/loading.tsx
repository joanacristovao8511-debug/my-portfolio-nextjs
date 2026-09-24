import { LoadingProgress } from "@/components/loading-progress";

export default function Loading() {
  return (
    <main
      className="min-h-screen bg-[var(--background)] text-[var(--foreground)]"
      aria-busy="true"
      aria-label="Loading portfolio"
    >
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
        <div className="w-full max-w-xl rounded-[28px] border border-[color-mix(in_srgb,var(--foreground)_10%,transparent)] bg-[color-mix(in_srgb,var(--foreground)_3%,transparent)] p-7 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-9">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-500 text-sm font-black text-white shadow-lg shadow-blue-500/20">
              A
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight">Portfolio</p>
              <p className="text-xs text-[color:var(--muted)]">Full-stack developer & AI product builder</p>
            </div>
          </div>
          <LoadingProgress />
          <p className="sr-only">Loading portfolio content…</p>
        </div>
      </div>
    </main>
  );
}
