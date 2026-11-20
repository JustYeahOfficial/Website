const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });

export default function FeedbackList({ feedback }) {
  if (!feedback.length) {
    return (
      <p className="rounded-lg border border-dashed border-border px-4 py-6 text-sm text-muted-foreground">
        No notes on this one yet. Yours would be the first.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-border/70">
      {feedback.map((item) => (
        <li key={item.id} className="py-4">
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-heading text-sm font-medium text-foreground">
              {item.name || "Anonymous"}
            </span>
            <span className="shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground/70">
              {formatDate(item.created_at || item.created_date)}
            </span>
          </div>
          <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
            {item.message}
          </p>
        </li>
      ))}
    </ul>
  );
}