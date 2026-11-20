import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { Image } from "@/components/ui/image";

const LEFT_IMAGE = {
  src: "https://media.base44.com/images/public/6afebc065ab451142ad9ae5f/ed299bc82_generated_image.png",
  alt: "A dim desk at night with two monitors showing code",
};

const RIGHT_IMAGE = {
  src: "https://media.base44.com/images/public/6afebc065ab451142ad9ae5f/00fb71145_generated_image.png",
  alt: "An overhead view of a workbench with a half-disassembled keyboard and notebooks",
};

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-16 border-t border-border/60">
      <div className="matrix-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <SectionHead title="About me" />

        <Reveal className="mt-12">
          <div className="max-w-4xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            <Image
              src={LEFT_IMAGE.src}
              alt={LEFT_IMAGE.alt}
              fittingType="fill"
              className="float-left mb-5 mr-5 aspect-[4/5] w-[42%] max-w-[230px] rounded-[1.75rem] border border-border object-cover shadow-[0_24px_60px_-40px_hsl(var(--foreground)/0.6)] sm:mr-8 sm:w-[30%]"
            />

            <p className="mb-5">
              Hey! I'm Yeah <span className="text-foreground">:)</span> I'm a Taiwanese creator who
              enjoys programming, experimenting with code, and making all sorts of things for the
              internet. I like coming up with random ideas and seeing how far I can take them,
              whether it's a small coding experiment, a YouTube project, or something completely
              unusual.
            </p>

            <Image
              src={RIGHT_IMAGE.src}
              alt={RIGHT_IMAGE.alt}
              fittingType="fill"
              className="float-right mb-5 ml-5 mt-1 aspect-square w-[38%] max-w-[210px] rounded-[1.75rem] border border-border object-cover shadow-[0_24px_60px_-40px_hsl(var(--foreground)/0.6)] sm:ml-8 sm:w-[26%]"
            />

            <p className="mb-5">
              As for my nickname, my last name sounds a bit like "Yay", so my friends used to
              combine my real name with "Yay". I eventually chose{" "}
              <span className="text-foreground">Yeah</span> instead because its spelling looks more
              like my actual last name!
            </p>

            <p>
              I'm always curious about trying new things, learning how stuff works, and turning
              interesting ideas into something real.
            </p>

            <div className="clear-both pt-6">
              <p className="text-sm text-muted-foreground">
                Want to know a little more about what I've done?
              </p>
              <Link
                to="/achievements"
                className="glass glass-gold group mt-3 inline-flex min-h-[48px] items-center gap-2 rounded-full px-6 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary-foreground"
              >
                My achievements
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}