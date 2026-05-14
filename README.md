# Tilt Live Commerce Lab

Tilt Live Commerce Lab is a single-page React prototype that explores a core live-commerce growth thesis: the biggest opportunity is not only driving more room traffic, but converting passive viewers into first-time bidders while the auction is live.

This prototype is intentionally product-led rather than slide-like. It includes a live auction room simulation, intervention toggles, an experiment details panel, and a compact participation framework table. All data is mock and illustrative.

## Stack

- React
- Vite
- Local component state only
- No backend or database

## Local development

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open the local URL shown in your terminal.

## Production build

Create a production build with:

```bash
npm run build
```

Preview the built app locally with:

```bash
npm run preview
```

## Deploying to Vercel

1. Push this project to a Git repository.
2. Import the repository into [Vercel](https://vercel.com/).
3. Use the default Vite settings.
4. Build command: `npm run build`
5. Output directory: `dist`

No environment variables or backend services are required.

## Project structure

```text
.
├─ index.html
├─ package.json
├─ vite.config.js
├─ src
│  ├─ App.jsx
│  ├─ main.jsx
│  ├─ styles.css
│  ├─ components
│  │  ├─ ExperimentPanel.jsx
│  │  ├─ InterventionPills.jsx
│  │  ├─ LiveRoom.jsx
│  │  └─ ParticipationTable.jsx
│  └─ data
│     └─ interventions.js
└─ README.md
```

## Notes

- The experience is text-only and does not use proprietary Tilt brand assets.
- The page explicitly avoids implying official Tilt ownership.
- Metrics and room behavior are illustrative and intended to communicate strategy, experimentation, and product thinking in a work sample format.
