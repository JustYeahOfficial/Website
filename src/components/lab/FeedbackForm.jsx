import { useState } from "react";
import { sendFeedback } from "@/lib/data";
import { Button } from "@/components/ui/button";

export default function FeedbackForm({ project, onSaved }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (!message.trim()) return;
    setSaving(true);
    setError("");
    try {
      await sendFeedback({ project, name: name.trim() || "Anonymous", message: message.trim() });
      setMessage("");
      setName("");
      setSent(true);
      onSaved?.();
    } catch (err) {
      setError(err?.message || "Could not send that just yet. Try again in a moment.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={60}
          placeholder="Your name (optional)"
          className="min-h-[44px] w-full rounded-md border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none"
        />
        <Button
          type="submit"
          disabled={saving || !message.trim()}
          className="min-h-[44px] font-mono text-[0.7rem] uppercase tracking-[0.2em]"
        >
          {saving ? "Sending" : "Leave feedback"}
        </Button>
      </div>
      <textarea
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          setSent(false);
        }}
        maxLength={1200}
        rows={3}
        placeholder="What worked, what broke, what you would change."
        className="w-full resize-y rounded-md border border-input bg-background px-3 py-2.5 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none"
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
      {sent && !error && (
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary">
          Got it. Thanks :)
        </p>
      )}
    </form>
  );
}