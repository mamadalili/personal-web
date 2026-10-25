# Solutions pages implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Group Strategy, Execution, Technology and AI Tools under «راهکارها» / Solutions, with a hub, four complete bilingual pages and navigation directly after Home.

**Architecture:** Keep the static site and shared shell. A focused content module and renderer serve five HTML entry points. The shell owns language changes, navigation and version-guarded module loading.

**Tech Stack:** HTML, CSS, native JavaScript modules; existing Node tests and browser verification.

**Spec:** The requested four pages and category label, plus [portfolio rules](../../../AGENTS.md). Publish the verified change directly to the existing main branch.

## Global constraints

- Native Persian/English and mirrored RTL/LTR; no browser translation.
- Accent `#1c0998`; call-to-action labels bold (`700`) and black (`#000`) on light surfaces.
- Rounded liquid-glass navigation fixed at the top centre. Order: Home, Solutions, Blog, CV, Contact.
- Four substantial unnumbered homepage capability tiles, in the existing balanced 2×2 layout with a 5px gap.
- Ground experience links in the existing CV. Describe proposed collaboration without invented achievements, prices or guarantees.
- Keep personal environment and account information out of public files.

## Review focus

- Every detail page retains its route when language changes; fast changes cannot render a stale language.
- All five navigation labels fit a 320px viewport and retain accessible tap targets.
- Solutions remains active on hub and detail pages; Blog remains active on articles.
- Homepage cards lead to the correct detail page; CV/project and legacy Skills links still resolve.
- Content, headings, descriptions, breadcrumbs and calls to action exist in both languages.

### Task: Complete the Solutions section

- [x] Add `solutions-data.mjs`, `solutions.mjs`, `solutions.css`, `solutions.html`, `strategy.html`, `execution.html`, `technology.html` and `ai-tools.html`.
- [x] Connect the shell's route loading, native language switch, five-item navigation and homepage capability links.
- [x] Extend contextual article-link targets and update README, authoring guidance and persistent design rules.
- [x] Run existing Node tests, syntax/content/link checks and inspect all routes in both languages, mobile and desktop.
- [x] Review the final diff and resolve substantive findings.

**Publication:** Commit and push the verified change to main, then compare the remote revision.

**Verification evidence:** 13 Node tests; syntax and content/link checks; all five routes in both languages on desktop and 320px mobile; five navigation labels fit; CV/article links and native FAQs checked. Independent review found no remaining issues.
