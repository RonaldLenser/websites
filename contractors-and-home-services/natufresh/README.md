# NatuFresh — commercial cleaning website

Production-ready, responsive marketing site (Vite, React, TypeScript, Tailwind CSS) for **NatuFresh** — a commercial cleaning company (B2B / facilities; no residential positioning).

**Repository:** [github.com/ronlenserdigital/nutrue](https://github.com/ronlenserdigital/nutrue)  
**Live site (after Pages is enabled):** [ronlenserdigital.github.io/nutrue](https://ronlenserdigital.github.io/nutrue/)

## GitHub Pages

The app is built with Vite’s `base: "/nutrue/"` so assets work under `https://ronlenserdigital.github.io/nutrue/`. A GitHub Actions workflow (`.github/workflows/pages.yml`) deploys the `dist` folder on every push to `main`. After the first run completes:

1. In the repo: **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions** (if it isn’t already).
3. Open the **Actions** tab and confirm the “Deploy to GitHub Pages” workflow is green.

`npm run build` also writes `dist/404.html` (copy of `index.html`) so direct loads or refresh on routes like `/nutrue/services` work on GitHub Pages.

## Local dev

```bash
npm run dev
```

Open **http://localhost:5173/** (Vite is set to open the browser automatically). Development uses `base: "/"` so you don’t need the `/nutrue/` path locally.

**Preview the production build** (after `npm run build`):

```bash
npm run preview
```

Open **http://localhost:4173/nutrue/** (production build still uses the GitHub Pages base path).

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Go-live checklist

1. **Images** — add to `public/images/`:
   - `natufresh-logo.png`
   - `commercial-hallway.jpg`, `long-hallway.jpg`, `office-cubicle.jpg`
   - `business-card.jpg` (about page; not stretched, `object-contain` in about)

2. **Web3Forms** — in `src/pages/Contact.tsx`, replace `REPLACE_WITH_WEB3FORMS_ACCESS_KEY` with your key from [web3forms.com](https://www.web3forms.com).

3. **Deploy** — build (`npm run build`) and host the `dist` folder (Netlify, Vercel, or any static host). Configure SPA rewrites so client-side routes work (`/services`, `/about`, `/contact`).

## Push to GitHub (new repo)

From this folder, after [GitHub CLI](https://cli.github.com/) is installed and you are logged in:

```bash
gh auth login
gh repo create natufresh-website --public --source=. --remote=origin --push
```

This creates a new public repo named `natufresh-website` under your account, sets `origin`, and pushes the `main` branch. To use a different name, change `natufresh-website` in the command.

**Git only:** create an empty repo on GitHub, then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/natufresh-website.git
git push -u origin main
```

## License

You own the site content. Modify as needed for NatuFresh LLC.
