# Nariman Naderi Personal Website

This folder is now a static GitHub Pages site. It does not require Jekyll, Ruby, npm, or a build step.

## Source Of Truth

Edit these files:

- `index.html`
- `assets/css/site.css`
- `assets/js/main.js`
- image assets in this root folder

The `.nojekyll` file tells GitHub Pages to serve the files directly instead of processing the repository with Jekyll.

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

Publication and citation counts can drift. Verify them before using updated public metrics.
