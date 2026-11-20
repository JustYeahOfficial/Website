import Reveal from "@/components/Reveal";

export default function AchievementTimeline({ items }) {
  return (
    <ol className="mt-12">
      {items.map((item, i) => (
        <li key={item.title}>
          <Reveal delay={i * 80}>
            <div className="grid grid-cols-[auto_1fr] gap-x-5 pb-10 sm:gap-x-8 sm:pb-14">
              <div className="relative flex justify-center pt-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-foreground/70 ring-4 ring-background" />
                <span
                  className={`absolute top-6 w-px bg-border ${
                    i === items.length - 1 ? "hidden" : "bottom-[-2.5rem] sm:bottom-[-3.5rem]"
                  }`}
                />
              </div>

              <div className="min-w-0">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground/70">
                  {item.year}
                </span>
                <h2 className="mt-2 font-heading text-lg font-bold tracking-tight text-foreground sm:text-xl">
                  {item.title}
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {item.detail}
                </p>
              </div>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}