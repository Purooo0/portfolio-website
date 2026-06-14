# Portfolio Website

Personal portfolio website built with Next.js, Tailwind CSS, Framer Motion, and components exported from v0.

## Edit Content

Most personal details can be changed in:

```txt
lib/portfolio-data.ts
```

Edit this file for:

- name and short name
- role/class text
- email
- LinkedIn link
- GitHub link
- CV link
- hero intro text
- profile highlights
- toolkit
- project cards
- skills
- education and journey

## Run Locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Deploy to Vercel

1. Push this folder to GitHub.
2. Import the GitHub repository in Vercel.
3. Use the default Next.js settings.
4. Build command: `pnpm build`.

The contact form uses `mailto:`, so it does not need a backend.
