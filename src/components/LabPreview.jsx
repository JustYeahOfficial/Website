import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import ProjectWheel from "@/components/lab/ProjectWheel";

export default function LabPreview({ projects = [] }) {
  return (
    <section id="lab" className="relative scroll-mt-16 border-t border-border/60">
      <div className="matrix-grid absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead
            title="The lab"
            intro="Work in progress, on purpose. Spin the wheel, open a project, leave feedback, or ask to help build it."
          />
          <Reveal delay={120}>
            <Link
              to="/lab"
              className="glass group inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-foreground transition-transform hover:-translate-y-0.5"
            >
              All projects
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        {projects.length === 0 ? (
          <p className="mt-12 rounded-[1.5rem] border border-dashed border-border px-6 py-14 text-center text-sm text-muted-foreground">
            There are no projects in the lab yet.
          </p>
        ) : (
          <ProjectWheel projects={projects.slice(0, 8)} />
        )}
      </div>
    </section>
  );
}