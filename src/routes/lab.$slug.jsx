import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import FeedbackForm from "@/components/lab/FeedbackForm";
import FeedbackList from "@/components/lab/FeedbackList";
import JoinForm from "@/components/lab/JoinForm";
import { STATUS_META } from "@/lib/project-status";
import { getProject } from "@/lib/data";

export default function ProjectPage() {
  const { slug } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);
  useEffect(() => { let live = true; setLoading(true); getProject(slug).then((value) => { if (live) setResult(value); }).finally(() => { if (live) setLoading(false); }); return () => { live = false; }; }, [slug, refresh]);
  const project = result?.project;
  const feedback = result?.feedback ?? [];
  if (loading) return <div className="min-h-screen bg-background"><SiteNav /><main className="mx-auto max-w-5xl px-6 pt-40 text-muted-foreground">Loading project…</main></div>;
  if (!project) return <div className="min-h-screen bg-background text-foreground"><SiteNav /><main className="mx-auto max-w-4xl px-6 pb-24 pt-40"><h1 className="font-heading text-4xl font-bold">Project not found</h1><Link className="glass mt-8 inline-flex rounded-full px-5 py-3" to="/lab">Back to the lab</Link></main><SiteFooter /></div>;
  const meta = STATUS_META[project.status] ?? STATUS_META.idea;
  return <div className="min-h-screen bg-background text-foreground"><SiteNav /><main className="mx-auto max-w-6xl px-6 pb-24 pt-32 sm:pt-40">
    <Link to="/lab" className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground hover:text-primary"><ArrowLeft className="h-3.5 w-3.5" />All projects</Link>
    <div className="mt-8 flex flex-wrap items-center gap-3"><span className={`inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.2em] ${meta.text}`}><span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />{meta.label}</span><span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">{project.progress ?? 0}% built</span></div>
    <h1 className="mt-5 font-heading text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl">{project.title}</h1><p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{project.summary}</p>
    <div className="mt-6 h-[3px] w-full max-w-md overflow-hidden rounded-full bg-secondary"><div className={`h-full rounded-full ${meta.bar}`} style={{ width: `${project.progress ?? 0}%` }} /></div>
    <div className="mt-10 flex flex-wrap gap-3">{project.demo_url && <a href={project.demo_url} target="_blank" rel="noreferrer" className="glass glass-gold inline-flex min-h-[48px] items-center gap-2 rounded-full px-6 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary-foreground">Try it <ExternalLink className="h-3.5 w-3.5" /></a>}{project.repo_url && <a href={project.repo_url} target="_blank" rel="noreferrer" className="glass inline-flex min-h-[48px] items-center gap-2 rounded-full px-6 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-foreground">Source <Github className="h-3.5 w-3.5" /></a>}</div>
    {project.description && <p className="mt-10 max-w-3xl whitespace-pre-line text-base leading-relaxed text-foreground/80">{project.description}</p>}
    {project.tags?.length > 0 && <div className="mt-8 flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="rounded-full border border-border px-3 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-muted-foreground">{tag}</span>)}</div>}
    <div className="mt-14 grid gap-6 lg:grid-cols-2"><section className="rounded-xl border border-border bg-card/60 p-6 sm:p-8"><h2 className="font-heading text-lg font-bold">Notes from testers</h2><p className="mt-1.5 text-sm text-muted-foreground">{feedback.length} {feedback.length === 1 ? "note" : "notes"} so far. Anything helps.</p><div className="mt-6"><FeedbackForm project={project} onSaved={() => setRefresh((n) => n + 1)} /></div><div className="mt-8"><FeedbackList feedback={feedback} /></div></section><section className="rounded-xl border border-border bg-card/60 p-6 sm:p-8"><h2 className="font-heading text-lg font-bold">Want to help build it?</h2><p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">This one is open to collaborators. Tell me what you would take on and how to reach you.</p><div className="mt-6"><JoinForm project={project} /></div></section></div>
  </main><SiteFooter /></div>;
}
