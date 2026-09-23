"use client";

import { useEffect, useMemo, useState } from "react";

type LoadingProgressProps = {
  label?: string;
  description?: string;
  durationMs?: number;
  onComplete?: () => void;
};

const stages = [
  { until: 24, label: "Initializing", detail: "Preparing the portfolio experience…" },
  { until: 48, label: "Loading content", detail: "Bringing projects, experience, and services into place…" },
  { until: 72, label: "Building interface", detail: "Setting up layouts, typography, and responsive interactions…" },
  { until: 90, label: "Polishing experience", detail: "Applying theme, motion, and final visual details…" },
  { until: 100, label: "Almost ready", detail: "Finishing up and getting everything ready for you…" },
];

export function LoadingProgress({
  label,
  description,
  durationMs = 2600,
  onComplete,
}: LoadingProgressProps) {
  const [progress, setProgress] = useState(4);

  useEffect(() => {
    const startedAt = performance.now();
    const timer = window.setInterval(() => {
      const elapsed = performance.now() - startedAt;
      const ratio = Math.min(1, elapsed / durationMs);
      // Ease-out progress so it feels active early, then deliberately slows
      // near completion instead of snapping to 100%.
      const eased = 1 - Math.pow(1 - ratio, 1.8);
      const next = Math.min(100, Math.max(4, Math.round(eased * 100)));

      setProgress(next);

      if (ratio >= 1) {
        window.clearInterval(timer);
        onComplete?.();
      }
    }, 50);

    return () => window.clearInterval(timer);
  }, [durationMs, onComplete]);

  const stage = useMemo(
    () => stages.find((item) => progress <= item.until) ?? stages[stages.length - 1],
    [progress],
  );

  const title = label ?? stage.label;
  const detail = description ?? stage.detail;

  return (
    <div className="w-full max-w-xl" aria-live="polite">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold tracking-tight text-[color:var(--foreground)]">{title}</p>
          <p className="mt-1 text-sm text-[color:var(--muted)]">{detail}</p>
        </div>
        <span className="shrink-0 text-2xl font-bold tabular-nums tracking-tight text-sky-500">
          {progress}%
        </span>
      </div>

      <div
        className="relative h-3 overflow-hidden rounded-full border border-[color-mix(in_srgb,var(--foreground)_10%,transparent)] bg-[color-mix(in_srgb,var(--foreground)_6%,transparent)] shadow-inner"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
        aria-label={`${title}: ${progress}%`}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 shadow-[0_0_18px_rgba(59,130,246,0.35)] transition-[width] duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
        <div className="absolute inset-y-0 left-0 w-1/3 -translate-x-full animate-[loading-shimmer_1.6s_ease-in-out_infinite] bg-white/30 blur-sm" />
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.16em] text-[color:var(--muted)]">
        <span>Portfolio</span>
        <span>Loading</span>
      </div>
    </div>
  );
}
