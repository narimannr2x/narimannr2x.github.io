# SITE MAP — how this website is built

This is the internal map of the site. It tells you which file does what and where to edit each thing when you want to customize it.

## The 30-second version

Only **3 files matter** for editing content and design:

| File | What it controls |
|---|---|
| `index.html` | All the **text and structure** of the page (your bio, papers, projects...) |
| `assets/css/site.css` | All the **look** (colors, fonts, spacing, layout) |
| `assets/js/main.js` | All the **behavior** (animations, mobile menu, scroll bar) |

Blog articles live in `posts/` and reuse the same style files.

---

## Full file tree

```
my_website_step_1/
├── index.html                     <- THE site. One page, all sections.
├── assets/
│   ├── css/site.css               <- All styling (sectioned by banners)
│   ├── js/main.js                 <- All interactivity (animations, nav, counters)
│   └── images/
│       └── social-card-1200x630.png   <- Open Graph / Twitter share image
├── posts/
│   ├── rag-medical-guidelines.html          <- Blog: Guideline RAG
│   ├── future-of-medical-ai.html            <- Blog: Practical future of medical AI
│   └── computer-vision-medical-imaging.html <- Blog: Medical imaging beyond the model
├── website_pic-1100.webp         <- Displayed primary portrait (WebP)
├── website_pic-min.JPG           <- Portrait fallback (JPG)
├── website_pic.JPG               <- Original large portrait file (not displayed)
├── doctor-svgrepo-com.png        <- Browser tab favicon (the "NN"/doctor icon)
├── robots.txt                    <- Tells search engines what to crawl (nothing to do)
├── sitemap.xml                   <- Tells Google which pages exist (add new posts here)
├── google735b66d5321ef2fe.html   <- Google Search Console ownership proof (do not delete)
├── .nojekyll                     <- Tells GitHub Pages: serve files as-is, no Jekyll
├── .gitignore                    <- Files git should ignore
├── README.md                     <- Project notes + content sources
├── SITE-MAP.md                   <- This file
└── .github/workflows/static.yml  <- Auto-deploys site to GitHub Pages on every push
```

---

## The sections of index.html (top to bottom)

The homepage has **seven sections** in this order:

| # | Section id | Content | Where to edit |
|---|---|---|---|
| 1 | `#top` | Name + identity + the dark clinical-question-to-system viewer workflow | hero block |
| 2 | `#about` | Bio paragraphs + portrait (WebP with JPG fallback) | About section |
| 3 | `#research` | 4 research theme cards + animated stats | Research section |
| 4 | `#publications` | 5 selected research outputs with DOI/arXiv links | Publications section |
| 5 | `#projects` | Dark section, **2 public research-code cards** with role/methods details and GitHub evidence links | Projects section |
| 6 | `#insights` | 3 full-card links to blog posts | Insights section |
| 7 | `#contact` | Contact panel + Google Scholar, ORCID, and social links | Contact section |

The top navigation bar links to `#about`, `#research`, `#publications`, `#projects`, `#insights`, `#contact`. The section currently in view is highlighted automatically by `main.js` (active navigation).

> Decorative ECG "field notes"/"short notes" divider lines sit between some sections. They are pure decoration.

---

## "I want to change..." — quick lookup table

| I want to... | Edit this |
|---|---|
| Change my name / tagline | `index.html` → `<title>`, `.brand` (top bar), hero `<h1>` |
| Change any intro/bio text | `index.html` → matching section (see table above) |
| Change the meta description (Google search result text) | `index.html` → `<meta name="description">` in `<head>` |
| Change the share image | replace `assets/images/social-card-1200x630.png`, keep the filename |
| Add / remove a nav link | `index.html` → the `.nav-menu` block (must point to an existing section id) |
| Add a publication | `index.html` → `#publications` section, copy one `<article>` |
| Change the stats numbers | `index.html` → `#research`, the `data-count="N"` values (HTML text must show the final value) |
| Add a research theme / project | `index.html` → `#research` or `#projects`, copy one card |
| Add a blog post | copy a file from `posts/`, edit it, add a card in `#insights`, add URL to `sitemap.xml` |
| Change portrait photo | replace `website_pic-1100.webp` (keep the filename) |
| Change site colors | `assets/css/site.css` → `:root` block at top (the `--cyan`, `--amber`, `--ink`, `--paper` variables) |
| Change fonts | `assets/css/site.css` `:root` font variables + the Google Fonts `<link>` in every `<head>` |
| Change social links / email | `index.html` → `#contact` section + footer |
| Change ORCID | `index.html` → Person JSON-LD `sameAs`, `#contact`, and footer |
| Change article citations | `posts/*.html` → numbered `.citation` links and the matching Related research list |
| Change animations speed/style | `assets/css/site.css` (transition lines) + `assets/js/main.js` |
| Change layout widths / paddings | `assets/css/site.css` → `:root` `--max`, and the `.section` rules |

---

## The HTML ↔ JS wiring (data- attributes)

`main.js` does NOT target classes. It finds elements by these `data-*` attributes. If you duplicate an element, the JS will find the first match, so keep these unique.

| Attribute | Where | What JS does |
|---|---|---|
| `data-nav-toggle` | hamburger button in header | opens/closes mobile menu; updates the `sr-only` label to `Open navigation` / `Close navigation` |
| `data-nav-menu` | the nav links container | shown/hidden by the toggle |
| `data-year` | `<span>` in footer | fills in the current year (HTML contains the fallback year) |
| `data-scroll-bar` | thin bar at very top | fills across as you scroll |
| `data-scroll-scale` | tiny rail on right edge | marker slides down as you scroll |
| `data-count` | stat numbers in `#research` | counts from 0 to that number on scroll (HTML text is the final value) |

Plus:

- The CSS class **`reveal`** — any element with `class="reveal"` fades in when scrolled into view. Without JavaScript, `reveal` content stays visible; the `<head>` script adds a `js` class to `<html>` and only then do the `js .reveal` rules hide/fade it. `data-delay="1".."4"` staggers cards.
- The navigation active state — `main.js` observes the six content sections and adds `is-active` + `aria-current="location"` to the matching nav link.

---

## Full-card links

- **Publication cards** — each card is one `.publication-card-link` anchor wrapping the whole card (title stays visible inside the anchor's accessible name). No nested anchors.
- **Insight cards** — each card is one `.insight-card` anchor with an animated `.card-arrow`.
- **Project evidence** — each project card contains one `.project-link` pointing to the public repository; the surrounding card remains an `<article>` so links are not nested.

---

## How the styling is organized (site.css)

The file is split by big banner comments. Jump to any one of them:

1. `:root` — the master theme (colors, fonts, widths)
2. Accessibility — skip link, focus styles
3. Scroll progress — the top bar + right rail
4. Header + nav — top bar, brand, hamburger, active link
5. Hero — big title + the viewer workflow panel
6. Section heading — shared heading style for all sections
7. Reveal animation — the `.js .reveal` system (no-JS safe)
8. Divider — the ECG pulse lines
9. About — bio panel, portrait, methods line
10. Research themes — 4-card grid
11. Publications — full-card paper links
12. Projects — dark cards + public repository links + status/evidence callouts + article citation links
13. Stats strip — the big numbers
14. Contact + Footer
15. Article pages — styles used by `posts/*.html`
16. Responsive — tablet/phone layouts (the last block)

---

## Local preview

```powershell
python -m http.server 8000
```
then open `http://localhost:8000` (or just double-click `index.html`).

## Deploying

The site auto-deploys to GitHub Pages (`narimannr2x.github.io`) whenever you push to `main` — handled by `.github/workflows/static.yml`. You never build anything; the files are served as-is thanks to `.nojekyll`.
