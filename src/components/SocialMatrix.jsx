import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import BrandIcon from "@/components/socials/BrandIcon";
import { SOCIALS } from "@/lib/sample-data";

const BRAND_COLOR = {
  youtube: "text-brand-youtube",
  github: "text-brand-github",
  discord: "text-brand-discord",
  instagram: "text-brand-instagram",
  x: "text-foreground",
  tiktok: "text-foreground",
  twitch: "text-brand-discord",
};

export default function SocialMatrix() {
  return (
    <section id="socials" className="relative scroll-mt-16 border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <SectionHead title="Socials" intro="Where to find me. Pick whichever one you actually use." />

        <ul className="mt-12 border-t border-border/70">
          {SOCIALS.map((social, i) => (
            <li key={social.key}>
              <Reveal delay={i * 60}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 border-b border-border/70 py-5 transition-colors duration-300 hover:border-foreground/30 sm:gap-6 sm:py-6"
                >
                  <span
                    className={`glass flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${BRAND_COLOR[social.key] ?? "text-foreground"}`}
                  >
                    <BrandIcon brand={social.key} className="h-[19px] w-[19px]" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-heading text-base font-medium tracking-tight text-foreground sm:text-lg">
                      {social.platform}
                    </span>
                    <span className="mt-0.5 block truncate font-mono text-[0.72rem] tracking-wide text-muted-foreground">
                      {social.handle}
                    </span>
                  </span>
                  <span className="hidden font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground/70 sm:block">
                    {social.note}
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}