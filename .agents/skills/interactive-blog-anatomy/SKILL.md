---
name: interactive-blog-anatomy
description: Create or revise interactive blog articles with content-led interactions and native Persian/English. In personal-web, integrate with its existing article engine. Consider Anatomy only when a physical mechanism helps explain the subject; no figure is required. Does not apply to plain prose or unrelated site edits.
---

# Content-led interactive blogs

Choose interactions for the article’s teaching goal and the reader’s question. The user’s current preference is relevance over a mandatory illustration: Anatomy is optional, and an article may need no diagram. Do not force a physical device, animation or arbitrary calculator into an article to satisfy this skill.

## Choose the useful interaction

Identify what the reader should understand or decide, and what an action reveals. Use the simplest relevant form: a searchable set of offers, focused details, comparison tabs, sourced data, a glossary or a calculation with meaningful inputs. Keep prose where interaction adds no value. Do not invent facts, timing assumptions or business outcomes to make a widget fit.

If a recognisable physical mechanism genuinely clarifies the subject, load the full [Anatomy skill](../anatomy/SKILL.md), its `references/craft.md` and the closest relevant example before designing. Read further kit/motion/verification references only as needed. Prefer the repository-local package when present. If Anatomy is unnecessary, omit it without requesting an exception. If a specifically requested Anatomy figure needs a missing package, report that dependency; never claim it was used.

For a selected figure, state the concept-to-mechanism relationship: what the reader controls, what changes and what that change means. Geometry, movement and readouts must agree with the stated model. Distinguish real data from illustrative assumptions and record formulas, units, sources/dates and limits. Follow the full skill’s craft rules only when actually authoring a figure.

## Fit the host project

On personal-web, read `AGENTS.md`, `docs/interactive-blog.md` and `prompts/interactive-blog.fa.md`. Use its existing shared article renderer and lifecycle.

- Keep the framework-free HTML/CSS/JavaScript stack and native `fa`/`en`, including controls, results, accessible labels and mirrored RTL/LTR.
- Use `#1c0998`, light surfaces, bold black CTA labels and unnumbered cards. Preserve the liquid-glass navigation and unrelated pages.
- Use real internal destinations and sources. Keep skill instructions, private paths and implementation logs out of visitor content.
- Load only the assets used by the selected interactions. Keep the pinned Anatomy package and MIT license unmodified; put any new figure source/models outside it.
- The rejected Solo workbench is a retired prototype. Do not reintroduce it through the article template or treat it as a required example.

## Verify and finish

Check the interactions actually used: pointer/keyboard input, visible focus, dialog Escape/return focus, accessible results, mobile/desktop fit, native languages and disposal on language remount. For animation, also inspect reduced motion, offscreen behavior and moving states. Run relevant model/geometry checks only for the chosen features.

Use the host’s permitted browser tools. Where `cua_repl` is required, do not substitute upstream headless capture/drive/CDP helpers. For personal-web, run `node scripts/check-blog-skills.mjs`, `node scripts/test-site.mjs`, relevant syntax checks and actual fa/en browser verification; generate/check the sitemap after publication changes.

Follow the user’s existing Git/publication authorization. Community-gallery submission, session-log collection or other external uploads require their own explicit human request. Availability of a skill does not authorize external actions.
