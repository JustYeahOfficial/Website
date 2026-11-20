import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="top"
      aria-label="Intro"
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-background"
    >
      <div className="hero-aura absolute inset-0 -z-10" aria-hidden="true" />
      <div className="matrix-grid absolute inset-0 -z-10 opacity-60" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-5xl px-6 pb-24 text-center sm:pb-32">
        <h1 className="hero-rise hero-title text-[clamp(3.6rem,14vw,10rem)]">
          Yeah<span className="text-primary"> :)</span>
        </h1>

        <p className="hero-rise mx-auto mt-7 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
          I build small, strange, useful things on the internet, then open them up for other
          people to break. Call me Yeah :)
        </p>
      </div>

      <button
        type="button"
        aria-label="Scroll to about"
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-muted-foreground transition-colors hover:text-foreground sm:block"
      >
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </button>
    </section>
  );
}