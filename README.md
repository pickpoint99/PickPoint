# PickPoint

Colorful e-commerce starter built with **React + Vite + Tailwind**.

## What's included
- Home product grid (sample products)
- Cart (localStorage) + Cash on Delivery checkout
- Tailwind styling (colorful & unique)
- GitHub-ready structure

## Setup (locally)
1. Clone or download this repo.
2. Install dependencies:
```bash
npm install
```
3. Start dev server:
```bash
npm run dev
```
4. Open shown URL (usually http://localhost:5173)

## Deploy
You can push this repo to GitHub and deploy via GitHub Pages, Netlify, or Vercel. For Vercel/Netlify, just link the repo and set build command `npm run build` and publish directory `dist`.

## Notes
- This starter uses sample products in `src/App.jsx`. Replace with your real products or connect to a backend later.
- Payment method: **Cash on Delivery** only (mock checkout).

Built for you by MH Tech Assistant.


## Admin Page
- Route: `/admin` in your React Router (add routing later)
- Add, remove products dynamically (currently local state)
- Future-ready to connect backend API

## Deployment
- Already deploy-ready for Vercel / Netlify / GitHub Pages
- Build: `npm run build`, Publish directory: `dist`
- Optional: GitHub Actions workflow can auto-deploy from `main` branch
