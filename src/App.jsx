import { Routes, Route } from "react-router-dom";
import HomePage from "./routes/index.jsx";
import AchievementsPage from "./routes/achievements.jsx";
import LabPage from "./routes/lab.index.jsx";
import ProjectPage from "./routes/lab.$slug.jsx";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

function MissingPage() {
  return <div className="min-h-screen bg-background text-foreground"><SiteNav /><main className="mx-auto max-w-3xl px-6 pb-24 pt-40"><p className="font-mono text-sm text-muted-foreground">404 · Nothing here</p><h1 className="mt-3 font-heading text-4xl font-bold">Lost in the internet :)</h1><a className="glass mt-8 inline-flex rounded-full px-5 py-3" href="#/">Back home</a></main><SiteFooter /></div>;
}

export default function App() {
  return <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/achievements" element={<AchievementsPage />} />
    <Route path="/lab" element={<LabPage />} />
    <Route path="/lab/:slug" element={<ProjectPage />} />
    <Route path="*" element={<MissingPage />} />
  </Routes>;
}
