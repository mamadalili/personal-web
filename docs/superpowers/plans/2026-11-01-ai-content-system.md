# AI content system implementation plan

> **For agentic workers:** Use `superpowers:executing-plans` to implement this plan inline. Review is read-only and separate from implementation.

**Goal:** Publish an original, substantial native fa/en interactive guide inspired by Buzz's AI-content-system article, with its translated title, accurate Claude/ChatGPT routes and source-inspired bilingual artwork containing both product marks.

**Architecture:** Keep the existing article engine. Add one reusable `content-studio` block backed by a pure prompt/export composer, then combine it with the existing workflow, tabs, glossary, chart and disclosure blocks. No model call, account connection, publishing automation or backend is part of the reader tool.

**Tech stack:** Framework-free JavaScript modules, HTML/CSS, Node's existing tests and local WebP assets.

**Spec:** Existing `AGENTS.md`, `DESIGN.md`, `docs/content-voice.fa.md`, and the author's current request. Preserve the shared article/sidebar/navigation frame, `#1c0998`, native fa/en and paired-cover rules. The complete source text has been reviewed. The original cover could not be retrieved; the current artwork is an explicitly documented new composition based on the content-system idea, not a claimed visual adaptation.

## Review focus

- ChatGPT Project guidance must not claim automatic local-folder access or automatic reading of `CLAUDE.md`.
- The reader's text stays in the page and exported plain text; it is never interpreted as HTML or sent to a model.
- Blank, unsupported or excessively long inputs must not produce a plausible export.
- Educational comparison numbers must retain their units, window and hypothetical label.
- Language remount and interrupted clipboard operations must not leave stale UI or listeners.

## Tasks

- [x] Add failing tests for `composeContentPrompt({lang,tool,goal,audience,note})` and `createContentStarter(options)`: route differences, goal-dependent deliverables, native text preservation, validation and complete exports. Run red; implement `blog-content-model.mjs`; run green.
- [x] Add `blog-content-studio.mjs` with native select/text inputs, a reviewable prompt, copy/fallback, Markdown download and reset. Integrate with the shared renderer/AbortSignal and scoped CSS.
- [x] Write `posts/ai-content-system.mjs`: original worked example, source attribution, verified product distinctions, a contextual workflow, a hypothetical same-window comparison, voice-rule revision and meaningful continuation links. No copied source prompts, unsupported performance promises or mandatory physical figure.
- [x] Attempt to inspect the source cover and record the access limitation. Generate native fa/en covers with both marks and a related in-body visual. Save WebP exports and final prompts/provenance. Open a new two-article palette pair.
- [x] Register the article, update relevant cache versions, regenerate/check the sitemap, run the required site/skill/syntax checks and inspect fa/en desktop/mobile, copy/download and dialogs.
- [x] Request a read-only review, address actual defects, deploy only public runtime files and verify hashes. The final operator steps are to commit/push `main` and leave the Persian preview open with an actual screenshot and reading-time estimate.
