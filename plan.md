# Personal Website Improvement Plan

## Purpose

This is the implementation specification for improving the **current local draft** of Nariman Naderi's personal website.

The worker must implement this plan literally. Do not replace exact instructions with a redesign or with generic "improvements."

## Authorization boundary

- Creating this plan does **not** authorize implementation.
- Wait until Nariman explicitly says to implement it.
- Do not commit, push, deploy, or alter GitHub Pages unless Nariman separately authorizes deployment.
- Do not discard, reset, or overwrite the existing uncommitted changes.
- The current local files are the baseline, not the older live website.
- Do not invent publications, project results, affiliations, repositories, CV links, ORCID IDs, metrics, or evidence URLs.

## Required outcome

Turn the current site into a focused, evidence-led physician-researcher portfolio while preserving its existing reading-room/medical-imaging identity.

The finished site must communicate this message:

> Nariman Naderi is a physician researcher who translates clinical questions into rigorous medical AI research and practical evaluation workflows, with current work in medical LLM reliability, guideline synthesis, and medical imaging.

## Preserve unchanged

- The paper/sage background, dark navy sections, cyan and amber accents.
- Fraunces, IBM Plex Sans, and IBM Plex Mono typography.
- Sticky header, single-page homepage, section order, ECG dividers, and dark viewer panel.
- All five existing research-output URLs and titles.
- All three existing article URLs.
- Existing GitHub, Google Scholar, LinkedIn, X, and email destinations.
- Reduced-motion support, skip link, semantic `main`, and one homepage `h1`.
- The two-project local draft; do not restore the deleted technical-profile/Growth Areas section or the older four-card project grid.

## Files in scope

- `index.html`
- `assets/css/site.css`
- `assets/js/main.js`
- `posts/rag-medical-guidelines.html`
- `posts/future-of-medical-ai.html`
- `posts/computer-vision-medical-imaging.html`
- `sitemap.xml`
- `README.md`
- `SITE-MAP.md`
- `website_pic-1100.webp` (use the existing file; do not regenerate it)
- New final asset: `assets/images/social-card-1200x630.png`

Do not modify `.github/`, `.git/`, DOI destinations, publication titles, or unrelated files.

---

# 1. Pre-implementation gates

Before editing, run `git status --short` and record the result in the implementation handoff. Do not clean the worktree.

Ask Nariman for these optional inputs once. Missing inputs block only the corresponding optional feature, not the rest of the plan:

| Input key | Needed for | Rule if missing |
|---|---|---|
| `CV_URL_OR_FILE` | CV link | Do not display a CV button or placeholder. |
| `ORCID_URL` | ORCID link and Person schema | Do not display or invent an ORCID. |
| `PERIFISTAID_EVIDENCE_URL` | Public evidence link on Perifistaid card | Keep the exact status text specified below and do not add a link. |
| `QUESTION_WORKFLOW_EVIDENCE_URL` | Public evidence link on question-workflow card | Keep the exact status text specified below and do not add a link. |

Never publish text such as `TODO`, `TBD`, `coming soon`, `insert URL`, or `USER_INPUT_REQUIRED`.

---

# 2. Exact homepage copy changes (`index.html`)

Apply every replacement below exactly, including capitalization and punctuation.

## 2.1 Metadata

Replace the homepage meta description:

**Current**

> Nariman Naderi is a physician researcher connecting clinical reasoning, medical AI research, technical implementation, and real healthcare workflows.

**Replace with**

> Nariman Naderi is a physician researcher translating clinical questions into rigorous medical AI research and practical evaluation workflows.

Replace the Open Graph description:

**Current**

> Physician researcher working across medical LLMs, guideline RAG, computer vision, dataset quality, and practical clinical AI systems.

**Replace with**

> Physician researcher working on medical LLM reliability, clinical guideline synthesis, and medical imaging under real healthcare constraints.

Use the same new sentence for `twitter:description`.

## 2.2 Hero identity

Replace:

> Physician / Programmer / AI Researcher

with:

> Physician Researcher · Practical Medical AI

Replace the hero lede:

**Current**

> I work where clinical reasoning, research design, technical implementation, and healthcare workflow reality meet.

**Replace with**

> I translate clinical questions into rigorous medical AI research and practical evaluation workflows.

Wrap only `clinical questions` in `<strong>`.

Replace the hero support paragraph:

**Current**

> Current focus: practical, reliable AI for clinical care, spanning gastroenterology, medical imaging, and evidence synthesis.

**Replace with**

> Current work: medical LLM reliability, clinical guideline synthesis, and medical imaging—grounded in gastroenterology and real healthcare constraints.

Keep the primary button text `View publications`.

Replace secondary button text:

> See project evidence

with:

> Explore projects

## 2.3 Hero viewer

Keep the viewer design and three-step structure. Change only this copy:

| Current | Replace with |
|---|---|
| `CLINIC_TO_SYSTEM.dcm` | `CLINIC_TO_SYSTEM` |
| `ACTIVE` | `CURRENT` |
| `Operating model: applied medical AI` | `Research workflow` |
| `From clinical questions through rigorous evaluation to practical systems.` | `From a clinical question to a tested workflow with explicit failure boundaries.` |
| `01 / Base` | `01 / Clinical base` |
| `02 / Research` | `02 / Research focus` |
| `03 / Builder` | `03 / Implementation` |
| `Medical LLMs · guideline RAG · VLMs · imaging datasets` | `LLM reliability · guideline synthesis · medical imaging` |
| `Python workflows · evaluation pipelines · prototypes · medical imaging` | `Python workflows · evaluation pipelines · local prototypes` |

Do not restore the old calibration chart.

## 2.4 About section

Replace heading:

> A clinical bridge for practical medical AI

with:

> Clinical insight, rigorous evaluation, practical systems

Replace the section summary:

**Current**

> My strongest role is connecting the clinical problem, the research frame, the implementation path, and the real-world failure modes.

**Replace with**

> My role is to connect the clinical question with the research design, technical workflow, and failure analysis needed to evaluate a medical AI system responsibly.

Replace the first biography paragraph in full with:

> I am a **physician researcher** at the Gastroenterology and Liver Research Center, Taleghani Hospital. My work focuses on medical AI in gastroenterology and extends to clinical large language models, guideline synthesis, computer vision, and imaging-dataset evaluation.

Replace the second biography paragraph in full with:

> I am most interested in systems that are **useful under clinical constraints**: traceable enough to audit, rigorous enough to study, and practical enough to fit real healthcare workflows.

Replace the methods value with:

> Python · LLM evaluation · retrieval-augmented generation · medical imaging · data workflows · lightweight clinical tools

Keep the existing `Methods` label.

## 2.5 Research section

Replace the section summary:

**Current**

> Research-first proof: themes where clinical relevance, reliability, and evaluation matter more than benchmark appearance alone.

**Replace with**

> Four connected themes centered on reliability, evidence synthesis, medical imaging, and clinical relevance.

Do not change the four research-card titles or descriptions.

Change the stat labels exactly:

| Count | Current label | New label |
|---:|---|---|
| 5 | `Publications · 2025–26` | `Selected research outputs · 2025–26` |
| 2 | `First-author works` | `First-author outputs` |
| 4 | `Active research themes` | `Active research themes` |
| 3 | `Domain areas · GI · CV · LLM` | `Domain clusters · GI · LLM · imaging` |

Change the visible fallback content inside every `.stat-num` from `0` to its final number (`5`, `2`, `4`, `3`). JavaScript may animate from zero, but the HTML must show the correct values when JavaScript is disabled.

## 2.6 Publications

Replace heading:

> Selected work

with:

> Selected research outputs

For all five `<time>` elements, add `datetime` with the displayed year, for example `<time datetime="2026">2026</time>`.

Apply these exact metadata replacements without changing titles or URLs:

| Paper | New `.pub-kind` | New description |
|---|---|---|
| LLM self-confidence paper | `Peer-reviewed journal article · co-first author` | `npj Gut and Liver · Co-first author.` |
| IBD guideline RAG paper | `Peer-reviewed journal article · guideline RAG` | `Colorectal Disease · Co-author.` |
| Polyp VLM paper | `Peer-reviewed journal article · vision-language models` | `Scientific Reports · Co-author.` |
| Prompt-engineering paper | `Conference paper · first author` | `EXTRAAMAS · Lecture Notes in Computer Science · First author.` |
| Abdominal CT dataset paper | `Preprint · dataset review` | `arXiv · Co-author.` |

Replace the small terminal link text `DOI ↗` with `View DOI ↗`. Keep `View arXiv ↗` for the preprint.

Make the entire content area of each publication card clickable using one `.publication-card-link` anchor per card. Do not nest anchors. The complete title must remain visible and be included in the anchor's accessible name.

## 2.7 Projects

Keep exactly two project cards.

Replace the section summary with:

> Two active projects showing how I connect clinical questions, technical workflows, and research evaluation.

Replace the Perifistaid card content with:

- Category: `Medical imaging AI`
- Title: `Perifistaid MRI segmentation work`
- Description: `Perianal fistula MRI segmentation research focused on workflow validation, segmentation review, and clinically readable evaluation.`
- Status: `Validation and manuscript development`
- Add these details as a semantic `<dl class="project-details">`:
  - Role: `Clinical–technical research workflow and validation`
  - Methods: `MRI segmentation review · workflow validation · research evaluation`

Replace the question-generation card content with:

- Category: `Local AI application`
- Title: `Question-generation and review workflow`
- Description: `A local-first workflow for generating, reviewing, and organizing structured educational questions.`
- Status: `Application workflow in development`
- Add these details as a semantic `<dl class="project-details">`:
  - Role: `Workflow design and local application development`
  - Methods: `Local generation · structured review · educational content workflow`

Evidence-link rules:

- If the corresponding evidence URL was supplied, add `View evidence ↗` as a `.project-link` at the bottom of that card.
- If no evidence URL was supplied, add no link and no placeholder.
- Never use the word `PROOF`.
- Keep the visible prefix `STATUS` before the status value.

## 2.8 Insights

Keep the three existing article titles, descriptions, categories, and URLs.

Make each entire insight card a single anchor:

```html
<a class="insight-card reveal" data-delay="1" href="posts/rag-medical-guidelines.html">
  <span>Guideline RAG</span>
  <h3>Making medical guidelines usable with RAG</h3>
  <p>...</p>
  <span class="card-arrow" aria-hidden="true">→</span>
</a>
```

Use the same structure for all three cards. Do not leave a nested heading link. Preserve the animated arrow, but attach its hover/focus behavior to `.insight-card`.

## 2.9 Contact

Replace heading:

> Collaboration around medical AI, LLM reliability, and imaging AI

with:

> Research collaboration in medical AI

Replace the contact summary with:

> I welcome collaboration on medical LLM evaluation, clinical guideline synthesis, and medical imaging research. Email is the best way to start.

Replace the first primary button with:

```html
<a class="button primary" href="mailto:narimannaderi.md@gmail.com">Email me <span class="arrow">→</span></a>
```

Keep Google Scholar as the secondary button.

Use this exact order for additional contact links:

1. GitHub
2. LinkedIn
3. X / Twitter
4. ORCID, only if `ORCID_URL` was supplied
5. CV, only if `CV_URL_OR_FILE` was supplied

Do not repeat Email in the smaller link row because Email is now the primary action.

## 2.10 Footer

Replace:

> © [year] Nariman Naderi · Static GitHub Pages · reading-room build

with:

> © [year] Nariman Naderi · Physician researcher in medical AI

Put the literal current year inside the `data-year` span as fallback content, for example `<span data-year>2026</span>`.

Use footer links in this order: `Email`, `Google Scholar`, `LinkedIn`.

---

# 3. JavaScript and no-JavaScript behavior

## 3.1 Make reveal content safe without JavaScript

In `<head>`, immediately before the stylesheet, add:

```html
<script>document.documentElement.classList.add('js');</script>
```

In `site.css`, replace the reveal rules with:

```css
.reveal {
  opacity: 1;
  transform: none;
}

.js .reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity var(--dur) var(--ease), transform var(--dur) var(--ease);
}

.js .reveal.is-visible {
  opacity: 1;
  transform: none;
}
```

Keep existing delay selectors, but prefix them with `.js`, for example `.js .reveal[data-delay="1"]`.

Add:

```css
@media print {
  .reveal,
  .js .reveal {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }

  .site-header,
  .scroll-rail,
  .scroll-scale {
    position: static;
  }
}
```

## 3.2 Correct mobile-menu naming

In `main.js`, add:

```js
const navLabel = navToggle?.querySelector('.sr-only');
```

Inside `closeMenu()`, set `navLabel.textContent = 'Open navigation'` when `navLabel` exists.

Inside `openMenu()`, set `navLabel.textContent = 'Close navigation'` when `navLabel` exists.

Do not remove Escape-key closing, outside-click closing, or link-click closing.

## 3.3 Active navigation state

Observe `#about`, `#research`, `#publications`, `#projects`, `#insights`, and `#contact` with `IntersectionObserver`.

When a section becomes the primary visible section:

- Add class `is-active` to the matching `.nav-menu a`.
- Add `aria-current="location"` to that link.
- Remove both from the other navigation links.

Do not set an active link while the hero `#top` is the primary visible section.

Use CSS to show the active link with `color: var(--cyan-deep)` and the existing underline/accent treatment. Do not use a filled pill or redesign the navigation.

## 3.4 Counter fallback

HTML contains final values. Immediately before starting each count-up animation, set that counter's text to `0`; then run the existing animation. With reduced motion or no JavaScript, final values must remain visible.

---

# 4. CSS changes

## 4.1 Contrast

- Change `.stat-num` from `color: var(--cyan)` to `color: var(--cyan-deep)`.
- Change `.project-evidence` text to `#6f3f08`.
- Change `.project-evidence::before` to `#6f3f08`.
- Do not globally darken `--cyan`; it works correctly on the dark project section.

## 4.2 Minimum readable instrument text

Set these to at least `0.75rem`:

- `.viewer-bar`
- `.viewer-title`
- `.snapshot-list dt`
- `.portrait figcaption`
- `.theme-number`
- `.pub-kind`
- `.project-grid article > span`
- `.stat-label`

Do not reduce any existing body text size.

## 4.3 Target sizes

- Change `.nav-toggle` from `42px × 42px` to `44px × 44px`.
- Give `.contact-links a` and `.footer-inner a` `min-height: 32px` and `padding: 0.25rem 0.15rem`.
- The new publication-card anchor must fill the card and provide at least `1.3rem 1.5rem` padding.
- The new insight-card anchor must fill the card and retain the current card padding.

## 4.4 Interaction affordances

- Keep hover lift only on clickable `.insight-card` elements.
- Remove hover lift from non-clickable project cards unless that card has a real `.project-link`.
- Keep research cards static; remove any transform that implies they are clickable.
- Provide visible `:focus-visible` outlines on publication cards, insight cards, project evidence links, and contact buttons.

## 4.5 Mobile length and spacing

At `max-width: 520px`:

- Use section vertical padding of `3.5rem 0` instead of the desktop clamp.
- Use `2.5rem` padding for the dark project section.
- Use `1rem` gaps between stacked cards.
- Do not reduce paragraph font size.
- Keep hero buttons full width.
- Preserve zero horizontal overflow at 390px.

---

# 5. Images, fonts, and social sharing

## 5.1 Portrait

Replace the current portrait markup with:

```html
<picture>
  <source srcset="website_pic-1100.webp" type="image/webp">
  <img src="website_pic-min.JPG" alt="Nariman Naderi, physician researcher" width="1100" height="1100" loading="lazy" decoding="async">
</picture>
```

Add:

```css
.portrait picture {
  display: block;
  width: 100%;
  height: 100%;
}
```

Keep the current `object-fit: cover` and 4:5 portrait frame.

Update Person JSON-LD `image` to the absolute WebP URL:

> https://narimannr2x.github.io/website_pic-1100.webp

## 5.2 Social card

Create `assets/images/social-card-1200x630.png` with exactly:

- Canvas: 1200 × 630.
- Background: `#e9ede6`.
- Left side: `Nariman Naderi` in dark `#0b1620` display type.
- Subtitle: `Physician Researcher · Practical Medical AI`.
- Supporting line: `LLM reliability · guideline synthesis · medical imaging`.
- Right side: a crop of the existing portrait.
- Minimum 60px safe margin on every edge.
- No fake graph, fake DICOM filename, badges, publication count, or unverified claim.

Update homepage and all article `og:image` and `twitter:image` values to this absolute URL:

> https://narimannr2x.github.io/assets/images/social-card-1200x630.png

## 5.3 Fonts

Remove the Google Fonts `@import` from `site.css`.

Add these links in every HTML `<head>` before `site.css`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,560;9..144,760;9..144,900&family=IBM+Plex+Mono:wght@400;500;700&family=IBM+Plex+Sans:wght@400;500;600;800&display=swap" rel="stylesheet">
```

Do not change the font families.

---

# 6. Article-page changes

Apply the shared changes to all three files in `posts/`.

## 6.1 Visible author

Immediately after each article `h1`, insert:

```html
<p class="article-byline">By <a href="../#about">Nariman Naderi</a> · Physician researcher</p>
```

Style it as small, readable metadata. Minimum font size: `0.82rem`.

## 6.2 Replace self-promotional final sections

### `rag-medical-guidelines.html`

Replace heading `Why this fits my work` with `Practical takeaway`.

Replace its paragraphs with:

> A useful guideline RAG system should be judged in this order: source quality, retrieval quality, citation accuracy, conflict handling, and only then fluency. If an earlier layer fails, a polished answer should not be treated as reliable.

Add `Related research` with this link:

- `Using large language models to integrate international IBD guidelines: A retrieval-augmented generation approach` → `https://doi.org/10.1111/codi.70436`

### `future-of-medical-ai.html`

Replace heading `What I want to build toward` with `Practical takeaway`.

Replace its paragraphs with:

> Medical AI should be evaluated as a clinical workflow, not only as a model. A credible project must specify the intended user, the decision being supported, the failure boundary, the audit trail, and what happens when the system is uncertain.

Add `Related research` with these links:

- `Large language models poorly report self-confidence in gastroenterology clinical reasoning tasks` → `https://doi.org/10.1038/s44355-026-00053-3`
- `Using large language models to integrate international IBD guidelines` → `https://doi.org/10.1111/codi.70436`

### `computer-vision-medical-imaging.html`

Replace heading `Why this is part of my direction` with `Practical takeaway`.

Replace its paragraphs with:

> An imaging AI result is credible only when the dataset, preprocessing, annotations, evaluation metrics, and case-level failures can be inspected. Model architecture is one component of that chain, not the whole project.

Add `Related research` with these links:

- `Vision language models versus machine learning models performance on polyp detection and classification in colonoscopy images` → `https://doi.org/10.1038/s41598-025-29566-2`
- `State of abdominal CT datasets` → `https://arxiv.org/abs/2508.13626`

## 6.3 Related notes

Before `Back to insights`, add a `Related notes` navigation containing links to the other two articles. Never link an article to itself.

## 6.4 Article structured data

Add one `BlogPosting` JSON-LD object to each article with:

- `@context`: `https://schema.org`
- `@type`: `BlogPosting`
- Exact visible headline
- Existing meta description
- `datePublished`: `2026-05-28`
- `dateModified`: actual implementation date in `YYYY-MM-DD`
- Author as `Person` named `Nariman Naderi`
- Exact canonical URL
- Social-card absolute image URL

Do not invent review counts, keywords, publisher logos, or citations.

---

# 7. SEO and documentation

## 7.1 Sitemap

Update all `<lastmod>` values to the actual implementation date. Keep the same four URLs.

## 7.2 Person schema

- Replace the Person description with the new homepage meta description.
- Use the WebP portrait URL.
- Add ORCID to `sameAs` only when supplied.
- Do not add CV to `sameAs`.

## 7.3 Documentation

Update `README.md` and `SITE-MAP.md` so they describe the final implementation.

Required corrections:

- Remove every reference to `#technical-profile`, `Strongest areas`, `Comfortable areas`, and `Growth areas`.
- State that the homepage has seven sections: hero, about, research, publications, projects, insights, contact.
- State that Projects contains two cards.
- Describe the hero panel as a clinical-question-to-system workflow, not a confidence chart.
- Document `.js .reveal`, active navigation, full-card links, and the mobile menu label behavior.
- Document `website_pic-1100.webp` as the displayed primary portrait format and the JPG as fallback.
- Document the social-card path.

---

# 8. Verification gates

The worker must not claim completion until every applicable gate passes.

## 8.1 Text checks

These strings must not exist in public HTML after implementation:

- `Physician / Programmer / AI Researcher`
- `General physician with broad clinical exposure`
- `Contributed author`
- `Static GitHub Pages`
- `reading-room build`
- `Growth areas`
- `technical-profile`
- `PROOF`
- `TODO`
- `TBD`
- `coming soon`

These strings must exist on the homepage:

- `Physician Researcher · Practical Medical AI`
- `I translate clinical questions into rigorous medical AI research and practical evaluation workflows.`
- `Research collaboration in medical AI`
- `Email me`
- `Selected research outputs`

## 8.2 Structural checks

- Exactly one homepage `h1`.
- Exactly one `main` landmark per page.
- All images have non-empty alt text.
- All five publication cards contain valid existing destinations.
- All three insight cards are fully clickable and have no nested anchors.
- No project evidence link exists unless a real URL was supplied.
- Article pages contain visible author text, `BlogPosting` JSON-LD, Related research, Related notes, and Back to insights.
- Homepage contains Person JSON-LD.

## 8.3 Browser checks

Serve locally with:

```powershell
& 'C:\Users\Nariman\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' -m http.server 8000 --bind 127.0.0.1
```

Check at these viewports:

- 1280 × 720 desktop
- 768 × 1024 tablet
- 390 × 844 mobile

At each viewport verify:

- No horizontal overflow.
- Header and navigation remain usable.
- Text does not overlap or clip.
- Cards align and stack correctly.
- Contact buttons are visible and usable.
- Article headings wrap without clipping.

Additional required checks:

- Disable JavaScript: all content and final stat values remain visible.
- Enable reduced motion: content is visible without animations.
- Open and close mobile navigation: accessible label changes correctly.
- Use keyboard only: focus order is logical and visible.
- Print preview: no content is hidden by reveal styles.
- Open all three local article routes.
- Confirm no browser console errors and no missing local assets.

## 8.4 Final source checks

Run:

```powershell
git diff --check
git status --short
```

The final handoff must list:

- Files modified.
- Optional input-dependent features completed or skipped.
- Verification performed and its results.
- Remaining blockers.
- Confirmation that no commit, push, or deployment occurred unless separately authorized.

---

# 9. Implementation order

The worker must use this order:

1. Record current `git status --short`.
2. Apply exact homepage copy changes.
3. Update publication and card markup.
4. Update project cards, respecting evidence-link gates.
5. Update contact and footer.
6. Implement no-JavaScript reveal behavior, menu naming, counters, and active navigation.
7. Apply contrast, sizing, click-target, and responsive CSS changes.
8. Wire the existing WebP portrait and create the social card.
9. Update all three articles and add structured data.
10. Update sitemap, README, and SITE-MAP.
11. Run structural and source checks.
12. Run targeted desktop, tablet, mobile, no-JavaScript, reduced-motion, keyboard, and print verification.
13. Stop and present the local result to Nariman.
14. Do not deploy until Nariman explicitly approves the reviewed local result.

## Definition of done

The implementation is done only when the exact copy and structure above are present, all applicable verification gates pass, missing user inputs have been handled without placeholders or invented claims, the original visual identity remains recognizable, and Nariman has a local version ready for review.
