# The Cabin — Turnover Guide

One source (`content/guide.yaml`) → two outputs that never drift:
- **Web app** (`dist/index.html`): one step per screen, Next/Back, progress bar, resumes where you left off. Phone-first.
- **Print PDF** (`dist/turnover-guide.pdf`): 8.5×11 for the binder, checkbox per step.

DoGood home: DG-618213 (Airbnb turnover guide for Savannah & Spencer).

## Edit loop
1. Edit steps in `content/guide.yaml`.
2. `npm run build` (web) · `npm run pdf` (web + PDF) · `npm run serve` (preview on phone over LAN).
3. Commit + push.

## Restyle
All style values live in `theme/tokens.css`. `web.css` and `print.css` only reference tokens. Swapping in the cabin design system (DG-13936) = replacing `tokens.css`.

## Step schema
```yaml
- id: unique-kebab-id        # required, stable (progress + links key off it)
  title: Short imperative
  photo: photos/final/x.jpg  # optional, relative to assets/
  do: [line, line]           # the instructions, in order
  if:                        # optional conditional callouts
    - when: condition
      then: what to do
  supplies: [item, item]     # optional
```

## Assets
- `assets/photos/raw/` — originals, NOT committed (gitignored).
- `assets/photos/final/` — corrected/cropped versions the guide uses.
- `assets/floorplan/` — floor plan SVG.

## Home + sync
Lives at `~/cabin-turnover-guide` on alvin, remote on GitHub (touchedtone/cabin-turnover-guide, PUBLIC). Every push to main rebuilds the web app + PDF and publishes to GitHub Pages (Ben 2026-09-23: public page is fine). Raw photos stay local (gitignored) — only `assets/photos/final/` is published.

## Room + photos
- `content/room.yaml` — what's where, wall by wall (N = window, W = headboard, S = desk/closet/door, E = screen).
- `content/photos.yaml` — every source photo: what it shows, where, what it's for, flags.
