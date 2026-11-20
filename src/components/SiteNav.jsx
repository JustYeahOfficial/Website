import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const LINKS = [{ label: "About", id: "about" }, { label: "Lab", id: "lab" }, { label: "Socials", id: "socials" }];
export default function SiteNav() {
  const [solid, setSolid] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => { const onScroll = () => setSolid(window.scrollY > 40); onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  const goToSection = (id) => { if (pathname !== "/") { navigate("/"); window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 120); } else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  return <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${solid ? "border-border/70 bg-background/75 backdrop-blur-2xl" : "border-transparent bg-transparent"}`}><nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"><Link to="/" className="font-mono text-sm uppercase tracking-[0.28em] text-foreground hover:text-primary">Yeah<span className="text-primary"> :)</span></Link><div className="flex items-center gap-1 sm:gap-2">{LINKS.map((link) => <button key={link.id} type="button" onClick={() => goToSection(link.id)} className="glass-nav rounded-full px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground sm:px-4">{link.label}</button>)}<Link to="/achievements" className="glass-nav rounded-full px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground sm:px-4">Achievements</Link></div></nav></header>;
}
