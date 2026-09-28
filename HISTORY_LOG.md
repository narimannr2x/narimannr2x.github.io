# Personal Website History

Keep material website changes, validation, and deployment-relevant decisions
here. Current behavior and editing entry points belong in `README.md`.

## 2026-05-26 to 2026-05-28 - Static GitHub Pages rebuild and V1 polish

- Converted the site from mixed Jekyll/generated copies to a static GitHub
  Pages structure and removed obsolete generated/deployment duplicates.
- Rebuilt the public content from the Personal Profile source, retained the
  preferred warm orange/blue academic identity, and rolled back an unsuitable
  experimental layout before completing the research-first V1 polish.
- Added `robots.txt`, `sitemap.xml`, canonical/social metadata, and Person
  JSON-LD. Static link, anchor, text, and CSS checks were run; browser visual QA
  was unavailable during the original rebuild.
- Kept the three `my_website_1.1_field_notes` experiments separate from this
  base site.

## 2026-08-30 - v1.1 staging folder

- Added `v1.1/` as a self-contained staging copy. Live v1 at repo root is
  unchanged (no sitemap, robots, or canonical edits).
- v1.1 hero uses the thesis + four-stage trajectory viewer. Publications,
  projects, and field notes are one Evidence section with Published / Built /
  Questions tabs.
- v1.1 pages are `noindex`. Preview: `python -m http.server 8001` from `v1.1/`.


## 2026-08-30 - v1.2 staging folder ("clinical paper" identity)

- Added `v1.2/` as a self-contained staging copy; v1 and v1.1 untouched.
- New minimal identity per Nariman's choices: clinical-paper light theme,
  hairline rules, one teal accent, thesis line kept, hero signature is Fig. 1
  (illustrative calibration diagram tied to the npj Gut and Liver finding).
- Editorial hairline rows replace cards; stats strip and ECG divider removed;
  numbered section kickers (01 About ... 04 Contact). Tabs kept.
- Files: `v1.2/index.html`, `assets/css/site.css` (rewritten), `assets/js/main.js`
  (comment only), `README.md`. Copied posts/images unchanged.
- Validation: all 9 pages/assets serve 200 locally; one h1 per page (template
  comment matches are false positives); no nested anchors; all section anchors
  resolve; every HTML class has a CSS rule. v1.2 pages stay `noindex`.
- Preview: `python -m http.server 8002` from `v1.2/`.

## 2026-08-30 - v1.3 section vertical padding

- Tightened `.section` / `.contact-section` top+bottom padding (~35%): desktop 8.5→5.5rem, contact 9/10→6/6.5rem, mobile 5.5→3.75rem.
- Hero, heading internals, horizontal padding unchanged. File: `v1.3/assets/css/site.css`.

## 2026-08-30 - v1.3 tighter 02–04 vertical space

- Reverted the 860px width change. `#research` / `#evidence` / `#contact` top+bottom padding 5.5→3.5rem (mobile 2.5rem). Contact 3.75/4rem. `#about` width and padding unchanged.

## 2026-08-30 - v1.3 hero width back

- `.hero-inner` max-width 1400→`--max` (1060px) to match sections. Two-column gap 4→2.75rem.

## 2026-08-30 - v1.3 hero fits one desktop view

- Desktop (≥900px): hero locked to `100svh - nav`, smaller title, tighter gaps, Fig. 1 capped at 38vh/340px so Publications/Projects/Contact stay on first screen.
- Below 900px: stacked, no forced full-height; links sit above Fig. 1.

## 2026-09-03 - Promote v1.4 to live GitHub Pages

- Copied this folder (no `.git`) to `v1.0-reference` as the last live v1.0 snapshot.
- Overlaid `v1.4/` site files here, then pushed `main` to `narimannr2x.github.io`.
- Git remote unchanged. `HISTORY_LOG.md` stays local.

## 2026-09-26 - v1.5 staging folder (clinician / engineer lens)

- Copied live v1.0 into the empty sibling `v1.5/` (no `.git`); live site untouched. v1.5 is `noindex`.
- Added a hero "Read as: Clinician / Engineer" switch. Engineer mode swaps hero, About, contact, and a one-line reading per paper, and re-themes the page dark via token overrides. The notebook card stays light.
- Paper one-liners are derived from titles only; no findings or numbers added. Needs Nariman's review before going live.
- Files: `v1.5/index.html`, `v1.5/assets/css/site.css` (lens block at end), `v1.5/assets/js/main.js` (lens block). Choice persists in `localStorage`; View Transitions crossfade, instant under reduced motion.
- Validation: browser check at ~630px width in both modes; 17 paired blocks swap correctly; aria-pressed updates. Desktop width not yet checked.
- Preview: `python -m http.server 8005` from `v1.5/`.

## 2026-09-28 - Fix mobile story flicker from the fast-scroll limiter

- The limiter from 5f16c2f called `window.scrollTo` on every scroll event during
  touch and momentum, so the active chapter oscillated and the story text
  flickered between chapters on phones.
- Touch now caps `updateStory` progress at one chapter while the finger and
  momentum are live, and applies a single correction after scrolling settles
  (`scrollend` when available, otherwise a 200ms debounce). Corrections are
  skipped when the fling has left the pinned range so a hard fling is not
  yanked back. Wheel bursts keep the live clamp.
- `npm run build` regenerated `assets/js/main.js` and bumped the script cache
  version in all six pages. CSS unchanged.
- Validation: headless-Chrome CDP checks at 390x844 and 1280x800 - no
  mid-gesture `scrollTo`, one chapter per swipe/burst, settle clamps exactly to
  the limit, two quick swipes advance two chapters, reduced motion and short
  viewports stay unpinned, engineer lens unaffected, no page exceptions.
  Real-device check on Android Chrome and iPhone Safari still pending.

## 2026-09-28 - v1.6 staging folder (story pacing variants)

- Copied live v1.0 into sibling `v1.6/` (no `.git`); live site untouched.
- Story scenes felt rushed: each chapter is only 85vh (70vh phone) of
  scroll-scrubbed animation, and the fast-scroll limiter and chapter buttons
  land at 80% of a chapter, so scenes arrive nearly finished.
- `v1.6/index.html?fix=0-5` switches variants via a bottom-right panel:
  0 current, 1 longer chapters (140vh / 110vh phone), 2 land at 20%,
  3 smoothed progress (~0.5s catch-up), 4 timed scenes (1.8s once active;
  scroll only switches chapters), 5 combo (115vh / 95vh + land early + smoothing).
- Edited `v1.6/.local-src/main.js`, `v1.6/.local-src/site.css` (block at end),
  `v1.6/index.html` (head script + switcher), `v1.6/scripts/build.mjs`
  (`is-playing` runtime class); ran `npm run build` in `v1.6/`.
- Validation: headless-Chrome CDP at 1280x800 for all six variants and
  390x844 for 4 and 5 - landing points, --cp timing, and no page errors.
  Real touch devices not checked. Preview: `python -m http.server 8016` from `v1.6/`.
- Nariman's phone test: all pinned variants still misbehave on real swipes.
  Added `?fix=6`: at 860px and below the story is not pinned (native scroll,
  no limiter). Desktop keeps the current pinned story.
- Phone stack effects, all from cached layout offsets in the existing scroll
  frame: each scene scrubs `--cp` as it rises from 92% to 50% of the screen
  (also drives the 2022 code offset, which the plain timeline froze at its end
  frame); the scene tilts and rises into place; the chapter spanning screen
  center is in focus (per-chapter color glow and outline ghost label, others dim);
  an amber line fills to a reading line with lit dots; year labels stick under
  the header within their chapter.
- The 2025 chart and 2022 code looked static in the plain timeline because the
  2.4s reveal starts when the chapter top appears, before its scene is on screen.
- Validation: headless Chrome 390x844 both lenses, scrub values sampled across
  the story, desktop still pinned, no page errors. Real phone check pending.

## 2026-09-28 - Promote phone-stack story from v1.6 to live

- Live site now uses v1.6 `fix=6` as the default: phones (860px and below)
  keep native stacked scroll with the filling timeline, ghost labels, sticky
  years, and scene-scrubbed 2022/2025 animations. Desktop stays pinned.
- Dropped the v1.6 `?fix=` switcher and variant CSS from the live tree.
- Files: `.local-src/main.js`, `.local-src/site.css`, `scripts/build.mjs`
  (`is-lit` runtime class). `npm run build` regenerated deployed CSS/JS.

