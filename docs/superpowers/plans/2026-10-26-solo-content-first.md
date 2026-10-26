# Solo article content correction

> Execution: native implementation in this session, followed by fresh read-only review.

**Goal:** Remove the rejected workbench from the second article and stop requiring Anatomy for every blog, following the user's explicit correction and existing authorization to complete and push changes.

**Approach:** Remove the physical rig and its artificial timing exercise, keep the existing offer filters/search/details, engagement tabs and comprehension quiz. Revise Persian and English copy so no reader is directed to the removed device. Remove the rig from the reusable template and visitor module/CSS; preserve the pinned authoring package and historical figure source without loading them in the site.

**Files:** `posts/solo-business.mjs`, `blog-data.mjs`, `blog-solo.mjs`, `blog-solo.css`; `AGENTS.md`, `README.md`, `docs/interactive-blog.md`, `prompts/interactive-blog.fa.md`; project/global `interactive-blog-anatomy` workflow and UI metadata.

**Constraints:** Preserve native fa/en, stable published section IDs, actual sources, useful interactions and shared glass navigation. No new figures, invented data or framework dependencies. Anatomy is optional only when it materially explains the article.

- [x] Remove the rig and its dependent copy; retain relevant offer exploration and interactions.
- [x] Replace the mandatory Anatomy wording in authoring instructions and installed companion skill.
- [x] Verify actual fa/en desktop/mobile, offer filtering/search/dialog keyboard behavior, tabs/quiz, template, and absence of the figure/runtime on the article.
- [x] Run scoped site tests, module syntax, skill integrity/validation, sitemap and diff checks; obtain read-only review. Git history records the subsequent commit/push under existing authorization.

## Evidence

This is a reversible content/UI removal; no tests were added that merely assert exact prose or CSS. Existing model/link/publication tests and direct browser observations cover the affected behavior.

- `node scripts/test-site.mjs`: 32 passed, zero failures. Changed data/visitor modules pass syntax checks. Sitemap still covers 24 localized URLs; diff whitespace checks pass.
- `node scripts/check-blog-skills.mjs --global`: both 173-file upstream copies match the pinned revision, and installed/project companion workflows match. Both companion skills pass the upstream `quick_validate.py`; its missing PyYAML dependency was supplied in an isolated temporary directory, with no site dependency change.
- Actual article in Persian and English has 12 offer cards and no capacity figure. Persian Commerce filtering yields two offers and catalog search narrows to one. English filtering yields two offers. Detail dialogs show the relevant buyer/output, AI contribution, human responsibility and first experiment; Escape closes and returns focus. Engagement tabs and both localized quiz feedback paths work after language remount.
- No horizontal overflow at desktop, 390px in both languages or 320px Persian. Shared glass navigation remains 56px on the 390px view. Template renders four example offers in both languages without the rejected rig. No observed Anatomy/workbench resource in the browser resource tree and no page error logs.
- Fresh read-only review found no Critical, Important or Minor issues. Browser layout, focus and loading were separately checked by the main agent. The retired figure source and original upstream skill are preserved as optional authoring resources, without visitor imports.
