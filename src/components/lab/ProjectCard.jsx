import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { STATUS_META } from "@/lib/project-status";

export default function ProjectCard({ project }) {
  const meta = STATUS_META[project.status] ?? STATUS_META.idea;

  return (
    <Link
      to={`/lab/${project.slug}`}
      className="group flex h-full flex-col rounded-xl border border-border bg-card/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/25 hover:bg-card"
    >
      <div className="flex items-center justify-between">
        <span
          className={`inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.22em] ${meta.text}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
          {meta.label}
        </span>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
      </div>
      <h3 className="mt-8 font-heading text-xl font-bold tracking-tight text-foreground">
        {project.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
      <div className="mt-8">
        <div className="flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
          <span>Progress</span>
          <span className="text-foreground">{project.progress ?? 0}%</span>
        </div>
        <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-secondary">
          <div
            className={`h-full rounded-full transition-all duration-700 ${meta.bar}`}
            style={{ width: `${project.progress ?? 0}%` }}
          />
        </div>
      </div>
    </Link>
  );
}