import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = url && anonKey ? createClient(url, anonKey) : null;

// Projects can be managed in Supabase, or entered here for a fully static site.
export const LOCAL_PROJECTS = [];

export async function getProjects() {
  if (!supabase) return LOCAL_PROJECTS;
  const { data, error } = await supabase.from("projects").select("*").order("position", { ascending: true });
  if (error) { console.error("Could not load projects:", error.message); return LOCAL_PROJECTS; }
  return data ?? LOCAL_PROJECTS;
}

export async function getProject(slug) {
  if (!supabase) return { project: LOCAL_PROJECTS.find((item) => item.slug === slug) ?? null, feedback: [] };
  const [{ data: project, error: projectError }, { data: feedback, error: feedbackError }] = await Promise.all([
    supabase.from("projects").select("*").eq("slug", slug).maybeSingle(),
    supabase.from("feedback").select("*").eq("project_slug", slug).order("created_at", { ascending: false }).limit(50),
  ]);
  if (projectError) console.error(projectError.message);
  if (feedbackError) console.error(feedbackError.message);
  return { project: project ?? LOCAL_PROJECTS.find((item) => item.slug === slug) ?? null, feedback: feedback ?? [] };
}

export async function sendFeedback({ project, name, message }) {
  if (!supabase) throw new Error("Feedback is not configured yet. Add your Supabase settings to the GitHub repository.");
  const { error } = await supabase.from("feedback").insert({ project_id: project.id, project_slug: project.slug, name: name || "Anonymous", message });
  if (error) throw error;
}

export async function sendJoinRequest({ project, name, contact, message }) {
  if (!supabase) throw new Error("Collaboration requests are not configured yet. Add your Supabase settings to the GitHub repository.");
  const { error } = await supabase.from("join_requests").insert({ project_id: project.id, project_title: project.title, name, contact, message });
  if (error) throw error;
}
