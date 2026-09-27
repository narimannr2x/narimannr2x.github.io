# Nariman Naderi Personal Website

This is a static GitHub Pages site. Pages serves the committed HTML and generated assets directly. Node.js is used locally to build the CSS and JavaScript; no server runtime is needed.

> **Source of truth for editing:** HTML pages, `.local-src/site.css`, `.local-src/main.js`, and image assets. The readable `.local-src/` folder is Git-ignored. `assets/css/site.css` and `assets/js/main.js` are generated minified files.

`v1.1/` is a staging copy of a redesigned homepage (thesis hero, trajectory viewer, tabbed Evidence section). It is `noindex` and is not the live GitHub Pages site. See `v1.1/README.md`.

## Source Of Truth

Edit these files:

- `index.html`
- `blog.html`
- `.local-src/site.css`
- `.local-src/main.js`
- image assets in this root folder

The `.nojekyll` file tells GitHub Pages to serve the files directly instead of processing the repository with Jekyll.

## Homepage structure

The homepage is a single page with four sections, top to bottom:

1. **Hero** — name, identity, and portrait
2. **About** — biography and a placeholder visual
3. **Publications** — papers ranked by Google Scholar citations; 5 on small screens, 10 on larger screens, with an in-page “View all publications” control and a Google Scholar link
4. **Contact** — email, Google Scholar, ORCID, and social links

Writing lives on `blog.html`. Article files and URLs in `posts/` are unchanged.

## Behavior notes

- `class="reveal"` content is visible without JavaScript. The `<head>` script adds a `js` class to `<html>`, which gates the fade/slide-in animation.
- The navigation highlights the section currently in view with an active state.
- Publication rows keep separate paper and GitHub links.
- The homepage publications list is ordered by Google Scholar citation count (checked 2026-09-03). CSS shows 5 rows below 860px and 10 rows at larger widths; “View all publications” reveals the rest.
- The Blog page lists the three existing articles. Its page heading is an `h1`.
- Article claims use numbered inline DOI/arXiv citations and retain a complete Related research list.
- The mobile menu button's accessible label switches between `Open navigation` and `Close navigation`.
- Reduced-motion and print styles keep all reveal content visible.

## Portrait and social card

- The portrait uses responsive transparent WebP images at 400, 720, and 1100 pixels; `website_pic-1100.png` is the fallback. The hero portrait appears immediately; other reveal animations remain.
- Fraunces, IBM Plex Sans, and IBM Plex Mono are self-hosted WOFF2 fonts in `assets/fonts/`, with their OFL licenses. The homepage preloads the main display and body subsets.
- `assets/images/social-card-1200x630.png` is the Open Graph / Twitter social card.

## Local build

The readable CSS and JavaScript stay in `.local-src/` on this computer, including their comments. Only the generated assets are committed and pushed. Keep a backup of `.local-src/` because Git does not track it.

Install the pinned build dependencies once with `npm install`. After editing the local sources, run:

```powershell
npm run build
```

This trims CSS selectors whose required classes appear in neither the HTML nor the runtime state list, minifies the CSS and JavaScript, embeds the homepage's first-screen styles, and updates content-based cache versions. The full stylesheet loads without blocking the homepage's first paint. Blog and article pages retain a regular stylesheet link. A `noscript` stylesheet preserves the complete page when JavaScript is disabled.

If JavaScript starts adding a new class, add it to the runtime class list in `scripts/build.mjs`. Run the build after HTML changes too, so new selectors are retained and first-screen styles stay current. Do not edit generated assets or the marked inline critical CSS by hand.

On a fresh clone, run `npm install` then `npm run restore-source`. This creates formatted local CSS and JavaScript from the deployed files without overwriting existing sources. Original comments and selectors removed by trimming remain only in the local source backup or earlier Git history.

To refresh the smaller fonts after text changes:

```powershell
python -m pip install fonttools brotli
npm run fonts
npm run build
```

The font script preserves printable ASCII, the site's other characters, CSS-generated labels, and OpenType layout features. Latin extended fonts remain available for other characters. Original fonts stay in `.local-src/fonts/`; on a fresh clone the script downloads the original versions recorded in `scripts/font-sources.json`.

## Local Preview

Open `index.html` directly in a browser, or serve the folder with any simple static server.

Example:

```powershell
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Deployment

Run `npm run build`, then commit and push the generated assets and updated HTML. The GitHub Pages workflow deploys those committed files directly. Git-ignored `.local-src/` and `node_modules/` are not pushed.

## Content Source

The public wording is based on:

- `__nariman BASE/2_AREAS/Personal/Profile/bio.md`
- `__nariman BASE/2_AREAS/Personal/Profile/research-themes.md`
- `__nariman BASE/2_AREAS/Personal/Profile/papers.md`
- `__nariman BASE/2_AREAS/Personal/Profile/projects-and-apps.md`
- `__nariman BASE/2_AREAS/Personal/Profile/technical-skills.md`
- `__nariman BASE/2_AREAS/Personal/Profile/Nariman Naderi Resume.pdf` for verified education dates only; the résumé itself is not published because it contains private contact information and older role wording

Approved scholarly identity: `https://orcid.org/0000-0003-4820-5497`.

Publication and citation counts can drift. Verify them before using updated public metrics.
