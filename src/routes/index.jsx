import { useEffect, useState } from "react";
import SiteNav from "@/components/SiteNav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SocialMatrix from "@/components/SocialMatrix";
import LabPreview from "@/components/LabPreview";
import SiteFooter from "@/components/SiteFooter";
import { getProjects } from "@/lib/data";

export default function HomePage() {
  const [projects, setProjects] = useState([]);
  useEffect(() => { getProjects().then(setProjects); }, []);
  return <div className="min-h-screen bg-background text-foreground"><SiteNav /><main><Hero /><About /><LabPreview projects={projects} /><SocialMatrix /></main><SiteFooter /></div>;
}
