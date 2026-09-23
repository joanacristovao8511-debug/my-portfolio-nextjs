import { LoadingProgress } from "@/components/loading-progress";

export default function ProjectLoading() {
  return (
    <main className="project-page min-h-screen px-5 py-10 sm:px-8" aria-busy="true" aria-label="Loading project case study">
      <div className="mx-auto flex min-h-[80vh] max-w-7xl items-center justify-center">
        <div className="w-full max-w-xl rounded-[28px] border border-[color-mix(in_srgb,var(--foreground)_10%,transparent)] bg-[color-mix(in_srgb,var(--foreground)_3%,transparent)] p-7 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-9">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-500">Project case study</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-[color:var(--foreground)]">Preparing project details</h1>
          </div>
          <LoadingProgress
            label="Loading case study"
            description="Preparing the project overview, technology stack, screenshots, and related work…"
          />
          <p className="sr-only">Loading project case study…</p>
        </div>
      </div>
    </main>
  );
}
