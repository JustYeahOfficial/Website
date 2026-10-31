YEAH :) — STATIC WEBSITE

Files:
- index.html, style.css, script.js
- discord-card is converted into the Socials card markup in index.html
- supabase.js: add your Supabase project URL and publishable key
- supabase-setup.sql: run in Supabase SQL Editor

Deploy:
1. Create a Supabase project.
2. Run supabase-setup.sql in SQL Editor.
3. In Authentication > Users, create your admin email/password.
4. Copy Project URL and publishable key into supabase.js.
5. Upload all files/folders to your GitHub repository.
6. Enable GitHub Pages for the repository (Settings > Pages).

No Vite, React, Node.js, Express, or local server is used.

Important:
- Do not put a Supabase service_role/secret key in supabase.js.
- Supabase Auth replaces the old shared 4-digit PIN with an admin email/password.
- The LAN scanner and LAN IP display cannot work on GitHub Pages; browsers cannot scan a visitor's local network.
- Maintenance mode control is currently a placeholder; it needs a server-side gate (e.g. Supabase Edge Function or an RLS-protected settings table) before it can securely block visitors.
- GitHub Pages requires a base path at the repository URL; relative file paths are used here.
