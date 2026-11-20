# Yeah website — GitHub Pages version

## Run it on your computer
1. Install Node.js 22 or newer.
2. Open this folder in a terminal.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local URL Vite prints (usually http://localhost:5173).

## Publish with GitHub Pages
1. Create a GitHub repository and upload the contents of this folder to its `main` branch.
2. In the repository, open **Settings → Pages**. Set **Build and deployment → Source** to **GitHub Actions**.
3. The included `.github/workflows/deploy.yml` builds and deploys the site whenever you push to `main`.
4. Your site will appear at `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.

The app uses hash-based navigation, so refreshing a page on GitHub Pages works without a server or 404 rewrite.

## Supabase (optional)
The public pages work without Supabase. Supabase is only needed for the Lab's live project list, feedback, and collaboration request forms.

1. Create a free Supabase project.
2. Open **SQL Editor**, paste and run `supabase-setup.sql`.
3. In **Project Settings → API**, copy the Project URL and anon/public key.
4. In GitHub, open **Settings → Secrets and variables → Actions → New repository secret**. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
5. Push a commit to trigger a fresh deployment.
6. Add projects in Supabase **Table Editor → projects**. Use a unique `slug`, a title, summary, status (`idea`, `building`, `testing`, or `shipped`), progress from 0–100, and optional URLs/tags.

Only the Supabase anon/public key belongs in the browser. Never put a `service_role` key in this website or GitHub Actions secrets used by this frontend. The SQL enables public reading and visitor submissions; protect moderation/admin actions separately.

## Important migration note
The uploaded source was originally built around Base44's server runtime and database. GitHub Pages cannot run that server runtime. This version replaces the server-dependent project and form calls with optional Supabase calls. Existing Base44 project records are not included in the ZIP, so add them to the Supabase `projects` table if you want them to appear in the Lab.
