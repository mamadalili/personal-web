# Collaboration CTA and sitemap implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Strengthen the shared invitation to collaborate on Skills and Solutions, and create a native bilingual XML sitemap.

**Architecture:** The shared site shell renders one reusable bilingual CTA. Skills and the Solutions hub/detail pages use it. A dependency-free Node generator builds the sitemap from the six main pages, four solution routes and published posts.

**Tech Stack:** Existing HTML/CSS/JavaScript, JavaScript modules, Node built-ins and Node tests.

**Spec:** The requested CTA improvement, placement on Skills and Solutions, six main site sections, and [portfolio rules](../../../AGENTS.md).

## Global constraints

- Native fa/en and mirrored RTL/LTR; bold black CTA labels on light surfaces, accent `#1c0998`.
- Preserve the top-centre liquid-glass navigation and homepage layout.
- Make the primary contact action clear, keep a secondary CV action and preserve access to Skills from Solutions.
- Use the public personal domain recorded in README: `https://mrdalili.com/`. Keep it configurable; sitemap creation does not imply a deployment.
- Include canonical language variants and reciprocal fa/en/x-default alternates; exclude the template, drafts, duplicate landing/CV tab URLs and fragments.
- Do not invent results, guarantees, response times or modification dates; no private environment details.

## Review focus

- Contact/CV/Skills destinations retain the chosen language and remain usable on mobile.
- The same CTA renders once at the end of each requested page and survives language changes.
- All sitemap entries and alternates are absolute, XML-escaped and use the configured site base.
- Only published articles appear; adding an article or solution can regenerate the complete map.
- `robots.txt` points to the same sitemap host and generated files remain reproducible.

## Tasks

- [x] Replace the old Skills/Solutions closings with one improved shared CTA; visually check fa/en and desktop/mobile.
- [x] Test sitemap publication filtering, locale alternates, XML escaping and base-URL handling; implement the generator and output files.
- [x] Update public documentation, run all checks and review the final diff.

**Publication:** Commit and push the verified change to main; compare the remote revision.

**Verification evidence:** 20 Node tests; generated-file freshness check; XML parsed independently (22 URLs / 66 language alternatives); native fa/en CTA checks on Skills, Solutions and all four detail pages at 320px; desktop and 390px views; Contact/CV destinations and direct CTA fragments verified. Independent code review found no remaining issues.
