# Nariman Naderi Personal Website

This folder is now a static GitHub Pages site. It does not require Jekyll, Ruby, npm, or a build step.

> **Confused about what does what? Read [`SITE-MAP.md`](SITE-MAP.md)** — it maps every file and shows where to edit each thing.

## Source Of Truth

Edit these files:

- `index.html`
- `assets/css/site.css`
- `assets/js/main.js`
- image assets in this root folder

The `.nojekyll` file tells GitHub Pages to serve the files directly instead of processing the repository with Jekyll.

## Homepage structure

The homepage is a single page with seven sections, top to bottom:

1. **Hero** — name, identity, and the clinical-question-to-system viewer workflow
2. **About** — biography and portrait
3. **Research** — four research themes and stat counters
4. **Publications** — five selected research outputs
5. **Projects** — two public research-code repositories with inspectable evidence links
6. **Insights** — three article cards
7. **Contact** — email, Google Scholar, ORCID, and social links

## Behavior notes

- `class="reveal"` content is visible without JavaScript. The `<head>` script adds a `js` class to `<html>`, which gates the fade/slide-in animation; the stat numbers shown in the HTML are the final values (JavaScript animates from zero only when JavaScript is on).
- The navigation highlights the section currently in view with an active state.
- Publication cards and insight cards are full-card links.
- Project cards link to the public code/data companions for the two first-author medical-LLM studies.
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
