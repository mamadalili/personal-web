# Work Stories Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task-by-task in the current session. Steps use checkbox syntax for tracking.

**Goal:** Prepare a work-story archive with all eight existing roles and five independent story records per role.

**Architecture:** Keep the CV as the source of role facts and pass its career records to a small page module. A separate topic catalogue and pure routing helpers distinguish editorial plans from published articles. Reuse the existing article engine for future published stories.

**Tech Stack:** Static HTML, CSS, JavaScript ES modules, Node's built-in test runner.

**Spec:** ../specs/2026-10-31-work-stories.md

## Global Constraints

- Native Persian and English; mirror RTL/LTR.
- Preserve the existing five-link liquid-glass navigation and approved professional title.
- All eight CV roles, five independent content records each.
- Facts come from the existing CV; planned titles do not establish completed outcomes.
- No new hosting, framework, CMS, fabricated articles or client metrics.

## Review Focus

- Unknown role queries fall back to an existing role.
- Planned, missing, template or incomplete-language articles cannot get a reading link.
- Language changes retain the selected role.
- Browser history and remounts do not leave duplicate event handlers.
- Phone content remains readable above the fixed bottom navigation.

## Task: Data, page and discovery

**Files:** Create work-stories.html, work-stories.css, work-stories.mjs, work-stories-model.mjs, work-stories-data.mjs and tests/work-stories.test.mjs. Modify portfolio.js, blog-core.mjs, sitemap-core.mjs, relevant entry assets and sitemap tests.

**Interfaces:** `selectWorkRole(roles, requested)` returns the matched role or first role; `workStoryHref(story, language, posts, base)` returns a valid native published article URL or null. `mountWorkStories(root,{language,roles,formatYears})` returns a disposer.

- [x] Write and run failing routing/data tests for all eight roles, five topics each, invalid role IDs and unpublished/incomplete story targets.
- [x] Implement pure helpers and the bilingual topic catalogue; keep the role facts in the existing CV.
- [x] Build the page using the shared shell, selector, five story topics per role and honest publication states.
- [x] Add CV/Home discovery links and the canonical bilingual sitemap route.
- [x] Run the scoped site tests, syntax checks and sitemap generation/check.
- [x] Inspect both languages at desktop/phone widths, including role selection, history, keyboard use and language remount.
- [ ] Commit and push the verified result to the existing main branch under the standing publication instruction.

## Verification record

- Read-only final review completed; its publication-completeness finding is fixed. Empty sections and partial nested translations were observed failing, then passing after the guard change. All existing complete article formats retain valid links.
- `node scripts/test-site.mjs`: 64 passed, 0 failed. Changed JavaScript syntax checks and `git diff --check` pass.
- Sitemap check: 72 localized URLs, including the new canonical fa/en page.
- Browser: all eight roles show five outlines; native language, keyboard navigation, Back/Forward, CV/Home discovery and mobile end-of-page clearance checked. Selected-role visibility after a language remount and the Home secondary-link hit area were corrected and rechecked.
- Publication is recorded by the resulting Git commit and remote branch state.
