# Work-story counts and cards

**Request:** Show five topics for Boomerang, four each for Online Tahrir and CAN, three for every earlier role. Replace the plain list/callout with recognizable story cards beneath employer websites, accessible from the corresponding CV experience.

**Scope:** Update the existing CV/Work Stories interface and the generated compatibility preview. React migration of those pages remains phase 3. Keep original topic IDs, native fa/en, employer references, role selection, one page-level CV link and truthful draft/publication status.

**Design:** Use a shared, responsive horizontal card rail. CV cards link to the specific role and outline in Work Stories. Work Stories displays published reading links only after the existing publication guard; unpublished outlines stay clearly labelled, without fake reading buttons. Native swipe/trackpad/keyboard focus and a visible scrollbar provide browsing. No automatic motion or decorative numbers.

**Data:** A shared selector exposes 5/4/4/3 topics; keep the additional original plans in the source so previously supplied content/document IDs are not destroyed.

- [x] Write/run failing count, native-card and deep-link tests.
- [x] Add the shared selector and safe card renderer; update CV and Work Stories, styles and asset versions.
- [x] Pass the site/migration suites and static build; inspect both pages, roles, native languages, phone overflow, deep links and keyboard use.
- [x] Read-only review, fix important findings and record evidence. Publish only the isolated feature branch.

## Ledger

Base: `4a4be45f72c1ef52891606e9782fc4388b15ee7f`. Reuse the isolated worktree on `codex/work-story-cards`. Existing source has 40 editorial topic plans and no published work-story articles. This change must not invent case-study bodies.

## Evidence

- Count and native-card tests first failed on the missing selector/renderer, then passed. Additional review regressions first failed for a mapped story's misleading outline label and stale dependency URLs; both now pass.
- Independent read-only review confirmed the retained topic inventory, visible selection, CV stale-mount guard, employer-site ordering, role-specific URLs and publication checks. Its three important findings were fixed: initial/history topic activation is separate from a language remount; a mapped CV story uses a neutral label without promising publication; selector imports and the historical CV entry use release versions.
- Browser RED→GREEN: changing language after a topic deep link initially stole focus back to the card. After the fix the language switch retained focus; arrival from a CV card still revealed/focused the exact topic. Tested native Persian/English and keyboard activation.
- At 320px, browser QA found the CV grid's automatic minimum widened its detail column to 748px. Setting the detail grid item's minimum width to zero reduced it to 238px; the card rail was 234px and the document stayed 320px. Work Stories also stayed 320px, with native horizontal overflow confined to its 240px card rail. Glass navigation remained at the bottom.
- Browser counts: Boomerang 5, Online Tahrir 4, CAN 4, Asiatech 3; shared selector tests cover every role, including both Safir roles. CV-to-topic navigation preserved role, story, native language and fragment. Work Stories retained one page-level CV action.
- Final verification: 90 site tests and 21 migration checks passed; static build and whitespace checks passed. No browser console errors were observed. A CV preview and screenshot were retained for review. No production deployment or phase-3 migration is claimed.
