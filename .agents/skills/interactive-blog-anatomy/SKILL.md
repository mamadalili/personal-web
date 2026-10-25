---
name: interactive-blog-anatomy
description: Create or revise interactive blog articles using Anatomy as a required authoring step. Use for every interactive blog, explorable article, or bilingual interactive post, including requests in Persian such as بلاگ تعاملی or بلاگ اینترکتیو. In personal-web, integrate with its existing article engine and native Persian/English content. Does not apply to plain prose, unrelated website edits, or merely installing a skill.
---

# Interactive blogs with Anatomy

The user requires Anatomy for every interactive blog. This is an authoring workflow, not an instruction to publish somewhere new or change the host site's framework.

## Load the actual skill first

Read [Anatomy](../anatomy/SKILL.md), then its `references/craft.md` and the closest example before planning a figure. Resolve those paths from the Anatomy folder. Read motion, kit, verification and optional shader/3D references as the task needs them. Never treat this bridge as a replacement for the full skill.

Prefer the repository-local pair under `.agents/skills` when available, so the checked-in revision is used. Otherwise use this skill's sibling `anatomy` folder in the user skills directory. If the actual Anatomy package or required reference is missing, report the missing dependency; do not claim that Anatomy was used.

## Give each article a real explanatory figure

Before implementation, identify the article's teaching goal, the reader's question and the relationship that interaction should make understandable. Write one sentence mapping that relationship to a recognisable mechanism: what moves, what the reader controls and what the movement means.

Include at least one substantive Anatomy figure tied to that goal, unless the user explicitly changes this requirement. A generic chart, a decorative SVG or merely reading the skill does not satisfy it. Keep other interactions only where they help the article.

Follow Anatomy's sizing and craft rules, including its purposeful parts, solid shading, true depth order and meaningful mechanism. Start at Figure scope when that meets the article's goal. Do not silently expand into an Epic. If no truthful mechanism fits, surface that specific content problem and a concrete proposal while continuing independent article work; do not invent facts to force an analogy.

Distinguish real data from an explanatory model. Record the input, formula, unit, source/date, assumption and limitation. Geometry, animation and readout must come from the same model. Do not turn a hypothetical mechanism into a claim about a real company or a real physical device.

## Fit the host project

Respect its stack, language, brand, accessibility and publication instructions. On the personal-web portfolio (identified by `blog.mjs` and `blog-data.mjs`), read `AGENTS.md`, `docs/interactive-blog.md` and `prompts/interactive-blog.fa.md` before editing.

For that portfolio:

- Keep the static HTML/CSS/JavaScript stack. Use the framework-free Anatomy kit; do not add React, a package runtime or the entire example collection to the visitor's page just to use Anatomy.
- Keep the vendored package immutable. Put authored figures, models, selected runtime assets and builds in article-specific project files; extend the shared article/block renderer with proper mount/dispose handling instead of copying the entire blog engine.
- Provide native `fa` and `en` titles, hints, captions, glossary terms, controls and readouts, with RTL/LTR layout. Keep words outside the drawing where the skill calls for it.
- Use the site's `#1c0998` accent, light surfaces and bold black call-to-action labels. The user's prohibition on decorative ordinals overrides Anatomy's default `Fig n` card label; do not introduce numbered cards or leading-zero labels.
- Preserve the liquid-glass navigation, CV and unrelated pages. Use actual internal targets and sources. Do not add implementation logs, private paths or skill instructions to visitor-facing content.

## Verify the figure and article

Check pointer and keyboard input, visible focus, an accessible live readout, mobile and desktop fit, reduced motion, pausing offscreen and cleanup on language remount. Inspect normal size and 4× details, including moving states, not only the opening still. Run the relevant pure model and geometry checks and address their actual failures.

Use the host's permitted browser/computer tools. In Codex sessions requiring `cua_repl` for UI, do browser actions and screenshots there; do not run bundled capture/drive/CDP helpers as a substitute. Use only allowed read-only DOM inspection. Preserve the upstream browser-check objectives without bypassing the tool restrictions. Node-only geometry helpers remain available after inspecting their side effects.

For personal-web, run `node scripts/check-blog-skills.mjs`, `node scripts/test-site.mjs`, module syntax checks, the real fa/en page in mobile/desktop, and sitemap generation/check after registry changes. Keep authoring notes sufficient to review the concept-to-mechanism mapping, model, figure files and verification results.

Finish according to the user's existing Git/publication instructions. Anatomy's optional community-gallery publishing, session-log collection and external submission are separate actions: use them only if the human explicitly asks. Installing or using this workflow does not authorize them.
