# ShotSweep Docs Site

Marketing site + documentation for `@nfsfu234/shotsweep`, built with Next.js 15 (App Router) and
Nextra 4, matching the shell used by the FormValidation docs site — violet brand tokens instead
of orange.

## Getting started

```bash
npm install
npm run dev
```

- `/` — marketing homepage
- `/about` — about page, featuring the ShotSweep sketch poster
- `/docs` — full documentation (Nextra theme)

## Structure

```
app/
  (marketing)/        # homepage + about — its own root layout (html/body)
  docs/                # Nextra docs shell — its own root layout (html/body)
    layout.jsx
    [[...mdxPath]]/page.jsx
  components/          # shared marketing components (Reveal, InstallTerminal, ...)
  globals.css          # brand tokens (violet) + marketing shell styles
content/                # all MDX docs content, mirrors the /docs route tree
lib/json-ld.js          # SEO structured-data helpers
public/                 # shotsweep-mark.svg, shotsweep-icon-full.svg, poster PNG
```

## Editing docs content

Every file under `content/` maps directly to a route under `/docs`. Each folder needs a
`_meta.js` controlling sidebar order and labels — see the existing files for the pattern.

## Deploying

`npm run build && npm run start`, or deploy directly to Vercel — this is a standard Next.js App
Router project.
