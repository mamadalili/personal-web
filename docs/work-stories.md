# Work stories

The page is `work-stories.html?lang=fa` / `lang=en`, linked from CV and the CV card on Home. The glass navigation continues to use its existing CV destination. All eight role records come from `career` in `portfolio.js`, including the two Safir roles and Asiatech.

The shared selector exposes 19 published articles (Boomerang 6, Online Tahrir 5, CAN 3, Datis 3 and BiNiCi 2), plus three existing outlines for each remaining role. Titles, organizations and cover keywords live in `work-editions.mjs`. Role-specific manuscripts live under `posts/work-*.mjs`. The scenarios are educational examples grounded in the author's responsibilities.

To complete a story, collect the author's account of that particular experience, examples and permitted evidence. Finalize Persian first, then native English. Follow the interactive-blog workflow where an interaction adds understanding. Add the actual article to the existing registry and set the corresponding topic's `post` to its published slug. The work-story page will then show a real reading link, using the shared article frame. Drafts, templates, missing posts and incomplete translations never receive a reading link. Native titles, excerpts, section headings and body copy (including nested controls) must be complete before a story receives that link.

Each role has a shareable `role` query. Selection supports keyboard arrows, Home/End, browser Back/Forward and native language changes. Event handlers are disposed on remount. On desktop the role list is sticky; on phones it becomes a horizontal native scroll list. The canonical bilingual page, without role-view parameters, belongs in the sitemap.

Both card rails sit below the employer websites. Published cards open the article in the current language. Unpublished CV cards retain the role/topic link and focus the corresponding outline on arrival. The Work Stories header provides one link back to CV.
