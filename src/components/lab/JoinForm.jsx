import { useState } from "react";
import { sendJoinRequest } from "@/lib/data";
import { Button } from "@/components/ui/button";

export default function JoinForm({ project }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      await sendJoinRequest({ project, name: name.trim(), contact: contact.trim(), message: message.trim() });
      setName("");
      setContact("");
      setMessage("");
      setSent(true);
    } catch (err) {
      setError(err?.message || "Could not send that just yet. Try again in a moment.");
    } finally {
      setSaving(false);
    }
  }

  if (sent) {
    return (
      <p className="rounded-lg border border-primary/40 bg-primary/5 px-4 py-5 text-sm leading-relaxed text-foreground">
        Request received. I read everything myself and will get back to you
        <span className="text-primary"> :)</span>
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          maxLength={60}
          placeholder="Your name"
          className="min-h-[44px] w-full rounded-md border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none"
        />
        <input
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
          maxLength={120}
          placeholder="Email or handle"
          className="min-h-[44px] w-full rounded-md border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none"
        />
      </div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        maxLength={1200}
        rows={3}
        placeholder="What you would like to work on, and what you are good at."
        className="w-full resize-y rounded-md border border-input bg-background px-3 py-2.5 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none"
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button
        type="submit"
        variant="outline"
        disabled={saving}
        className="min-h-[44px] font-mono text-[0.7rem] uppercase tracking-[0.2em]"
      >
        {saving ? "Sending" : "Ask to help build it"}
      </Button>
    </form>
  );
}