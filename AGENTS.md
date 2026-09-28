# Site workflow

These rules apply to this static GitHub Pages site. Read `README.md` for the build and recovery details.

## Editing and building

- Edit readable CSS in `.local-src/site.css` and JavaScript in `.local-src/main.js`. Both are Git-ignored local sources; preserve their comments and existing contents.
- Edit HTML pages and image assets directly. Preserve the established design, typography, portrait transparency, and working interactions unless the task requests a change.
- Treat `assets/css/site.css`, `assets/js/main.js`, and the homepage's marked inline critical CSS as generated output. Make changes in the sources, then regenerate them.
- After CSS, JavaScript, or HTML edits, run `npm run build` before reporting completion or committing. It trims unused selectors, minifies deployed assets, generates first-screen CSS, and updates cache versions.
- When adding a class through JavaScript, add it to the runtime class list in `scripts/build.mjs` so CSS trimming retains its styles.
- After changing site text or CSS-generated labels, run `npm run fonts` before `npm run build`. This regenerates font subsets from originals in `.local-src/fonts/`.
- On a fresh clone with missing local sources, follow the recovery instructions in `README.md`. `npm run restore-source` recovers formatted files from deployed assets without overwriting existing sources. Original comments require the local backup or earlier Git history.
- Keep `.local-src/` and `node_modules/` ignored. Only generated CSS/JS and related tracked changes belong in commits. Documentation-only edits do not need a build.

## Performance and checks

- Keep the hero portrait immediately visible, responsive WebP sources, local fonts, and key font preloads.
- Keep first-screen CSS inline and the complete homepage stylesheet asynchronous, with the existing fragment-link and no-JavaScript fallbacks.
- Initialize layout-dependent behavior after complete styles load. Refresh cached measurements after resizing, font loading, or content-height changes.
- Keep offscreen and hidden-tab animations paused. Use cached geometry and batched updates for scroll and pointer behavior.
- For layout or behavior changes, check desktop and mobile in both reading modes and exercise the affected interactions. For stylesheet-loading changes, also check delayed CSS, fragment links, and JavaScript disabled.
- Describe throttled local timings as simulated results, not guaranteed visitor load times.

## Deployment

- When a push is requested, build first, commit the scoped tracked changes, and push to the configured repository branch.
- Confirm the GitHub Pages workflow succeeds and verify that live HTML and generated assets match the deployment before reporting it as live.
