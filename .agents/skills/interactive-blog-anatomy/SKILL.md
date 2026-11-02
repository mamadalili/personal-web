---
name: interactive-blog-anatomy
description: Create or revise interactive blog articles with content-led interactions and native Persian/English. In personal-web, integrate with its existing article engine. Consider Anatomy only when a physical mechanism helps explain the subject; no figure is required. Does not apply to plain prose or unrelated site edits.
---

# Content-led interactive blogs

Choose interactions for the article’s teaching goal and the reader’s question. The user’s current preference is relevance over a mandatory illustration: Anatomy is optional, and an article may need no diagram. Do not force a physical device, animation or arbitrary calculator into an article to satisfy this skill.

For content creation or substantive revision, use [content-production](../content-production/SKILL.md) alongside this guide: establish the reader question, supported claims and reviewed voice before choosing the interaction. Keep reusable corrections scoped to the kind of content that prompted them. Do not turn every article into a content-system tutorial or require every example widget.

## Choose the useful interaction

Identify what the reader should understand or decide, and what an action reveals. Use the simplest relevant form: a searchable set of offers, focused details, comparison tabs, sourced data, a glossary or a calculation with meaningful inputs. Keep prose where interaction adds no value. Do not invent facts, timing assumptions or business outcomes to make a widget fit.

Before choosing a chart, turn usable source material into explicit objects: stable ID, source link, evidence type, category, input, output, dependency, time precision, measure, unit and unknowns as applicable. Ask which relationship a reader can inspect by selecting or filtering those objects. A categorical workflow may support a dependency map or slicer without supporting a numeric performance chart; a prose sequence without dates does not support a Gantt. Keep source observations, editorial interpretation and proposed operating rules distinguishable in both the model and visible copy.

For a long article, consider original in-body images where a scene can clarify a transition or decision that text alone leaves abstract. Put them beside the relevant passage, with native Persian/English alt and captions. An image of a source, approval gate or concrete example can help; a decorative office scene or fake dashboard cannot substitute for evidence. Use local optimised assets. Covers still require separate native-language artwork and the site's paired palette; a language-neutral in-body image may be shared when it contains no readable words.

If a recognisable physical mechanism genuinely clarifies the subject, load the full [Anatomy skill](../anatomy/SKILL.md), its `references/craft.md` and the closest relevant example before designing. Read further kit/motion/verification references only as needed. Prefer the repository-local package when present. If Anatomy is unnecessary, omit it without requesting an exception. If a specifically requested Anatomy figure needs a missing package, report that dependency; never claim it was used.

For a selected figure, state the concept-to-mechanism relationship: what the reader controls, what changes and what that change means. Geometry, movement and readouts must agree with the stated model. Distinguish real data from illustrative assumptions and record formulas, units, sources/dates and limits. Follow the full skill’s craft rules only when actually authoring a figure.

## Fit the host project

### Spatial object motion

When a source supports meaningful entities or common-unit quantities, consider a scene in which stable objects regroup or hand off visibly. Define one object's meaning before drawing: a person, an order, one minute or a weighted unit are different encodings. Keep IDs and the represented total stable through the motion; retain exact native-language values, source and an accessible static alternative outside the scene. Use continuous, staggered travel only when it explains the relationship.

A crowd-style reference supplies visual grammar, not demographic evidence or a validated behavioral model. Do not copy its people, percentages or assumed contagion rules into an unrelated article. An animation between aggregate snapshots does not establish a causal process or intermediate measurements. Fractional or unsupported quantities need a different encoding, not invented members. Use this option selectively, without adding a second section that repeats an existing comparison.

For personal-web, consult `MOTION.md` and `blog-unit-objects.mjs` for the existing minute-object example and shared player lifecycle. Preserve native fa/en, mirrored geometry without mirrored text, refresh/pause, reduced motion, offscreen/hidden suspension and cleanup. This is an optional explanation technique, not a required style for every blog.

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
