# Nariman Naderi Personal Website

This folder is now a static GitHub Pages site. It does not require Jekyll, Ruby, npm, or a build step.

> **Source of truth for editing:** `index.html`, `assets/css/site.css`, `assets/js/main.js`, and image assets in the root folder.

`v1.1/` is a staging copy of a redesigned homepage (thesis hero, trajectory viewer, tabbed Evidence section). It is `noindex` and is not the live GitHub Pages site. See `v1.1/README.md`.

## Source Of Truth

Edit these files:

- `index.html`
- `blog.html`
- `assets/css/site.css`
- `assets/js/main.js`
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

- `website_pic-1100.webp` is the displayed primary portrait format (WebP); `website_pic-min.JPG` is the fallback.
- `assets/images/social-card-1200x630.png` is the Open Graph / Twitter social card.

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

Push this folder's contents to the GitHub Pages repository root. GitHub Pages should serve `index.html` directly.

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
