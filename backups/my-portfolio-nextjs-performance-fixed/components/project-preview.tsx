import { Code2 } from "lucide-react";
import type { ProjectItem } from "./portfolio-data";

export function ProjectPreview({ project }: { project: ProjectItem }) {
    return (
        <div
            className="project-preview-scroll absolute inset-x-0 bottom-0 top-9 overflow-auto overscroll-contain bg-slate-900"
            aria-label={`${project.title} preview. Scroll to explore the full image when needed.`}
        >
            {project.imageUrl ? (
                <img
                    src={project.imageUrl}
                    alt={`${project.title} project preview`}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto min-h-full w-full max-w-none object-contain object-top align-top transition duration-500 group-hover:brightness-105"
                />
            ) : (
                <div className="flex min-h-full items-center justify-center bg-gradient-to-br from-sky-500/20 via-slate-900 to-slate-950">
                    <Code2 className="h-16 w-16 text-sky-400/60" aria-hidden="true" />
                </div>
            )}
        </div>
    );
}
