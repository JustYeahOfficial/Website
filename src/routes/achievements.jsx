import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import AchievementTimeline from "@/components/achievements/AchievementTimeline";
import Reveal from "@/components/Reveal";

const MILESTONES = [
  {
    year: "2026",
    title: "Opened the lab",
    detail:
      "Turned the half-finished projects into a public lab: anyone can try them, leave notes, or ask to help build one.",
  },
  {
    year: "2026",
    title: "Started @Just_Yeah_Official",
    detail:
      "A channel for the experiments that survive, so they get explained properly instead of sitting in a folder nobody opens.",
  },
  {
    year: "2026",
    title: "Opened the Discord",
    detail:
      "A workbench where people can poke at projects early, argue about the ideas, and join in while things are still broken.",
  },
  {
    year: "Ongoing",
    title: "Kept making the strange things",
    detail:
      "Small tools, games and code experiments that mostly exist because I wanted to find out if I could make them work.",
  },
];

export default function AchievementsPage() {

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <main className="relative mx-auto max-w-4xl px-6 pb-24 pt-32 sm:pt-40">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back home
        </Link>

        <Reveal className="mt-8 max-w-2xl">
          <h1 className="font-heading text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl">
            Things I actually finished<span className="text-primary"> :)</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            A running list of what I've shipped, joined or stubbornly kept going. I add to it
            whenever something real happens.
          </p>
        </Reveal>

        <AchievementTimeline items={MILESTONES} />

        <Reveal>
          <div className="rounded-xl border border-border bg-card/60 p-6 sm:p-8">
            <h2 className="font-heading text-lg font-bold tracking-tight">Want to be on this list?</h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
              The lab projects are open. Pick one, try it, or ask to help build it.
            </p>
            <Link
              to="/lab"
              className="glass glass-gold group mt-6 inline-flex min-h-[48px] items-center gap-2 rounded-full px-6 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Enter the lab
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </main>

      <SiteFooter />
    </div>
  );
}