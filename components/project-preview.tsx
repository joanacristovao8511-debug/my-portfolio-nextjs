import { Code2 } from "lucide-react";
import type { ProjectItem } from "./portfolio-data";

export function ProjectPreview({ project }: { project: ProjectItem }) {
    return (
        <div
            className="absolute inset-x-0 bottom-0 top-8 overflow-hidden bg-slate-900"
            aria-label={`${project.title} project preview`}
        >
            {project.imageUrl ? (
                <img
                    src={project.imageUrl}
                    alt={`${project.title} project preview`}
                    loading="lazy"
                    decoding="async"
                    className="block h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.015] group-hover:brightness-105"
                />
            ) : (
                <div className="flex min-h-full items-center justify-center bg-gradient-to-br from-sky-500/20 via-slate-900 to-slate-950">
                    <Code2 className="h-16 w-16 text-sky-400/60" aria-hidden="true" />
                </div>
            )}
        </div>
    );
}
