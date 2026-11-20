import Reveal from "@/components/Reveal";

export default function SectionHead({ title, intro }) {
  return (
    <Reveal className="max-w-3xl">
      <h2 className="font-heading text-3xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">{intro}</p>
      )}
    </Reveal>
  );
}