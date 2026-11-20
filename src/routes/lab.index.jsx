import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ProjectCard from "@/components/lab/ProjectCard";
import Reveal from "@/components/Reveal";
import { getProjects } from "@/lib/data";

export default function LabPage() {
  const [projects, setProjects] = useState([]);
  useEffect(() => { getProjects().then(setProjects); }, []);
  return <div className="min-h-screen bg-background text-foreground"><SiteNav /><main className="mx-auto max-w-6xl px-6 pb-24 pt-32 sm:pt-40">
    <Link to="/" className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground hover:text-primary">← Back home</Link>
    <Reveal className="mt-8 max-w-2xl"><span className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-primary">The lab</span><h1 className="mt-5 font-heading text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl">Open projects, open doors.</h1><p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">Everything here is unfinished on purpose. Open one, try it, and tell me what breaks. If you want to help build it, ask from the project page.</p></Reveal>
    {projects.length === 0 ? <p className="mt-16 rounded-xl border border-dashed border-border px-6 py-14 text-center text-sm text-muted-foreground">There are no projects in the lab yet.</p> : <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{projects.map((project, i) => <Reveal key={project.id ?? project.slug} delay={i * 70}><ProjectCard project={project} /></Reveal>)}</div>}
  </main><SiteFooter /></div>;
}
