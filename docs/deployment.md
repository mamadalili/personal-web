# Static hosting

The public domain is https://mrdalili.ir/. This site runs as static HTML, CSS, JavaScript modules and local assets; it needs no database or Node.js server on the hosting account.

Publish the root HTML, CSS, JS and MJS files, `robots.txt`, `sitemap.xml` and the `assets`, `figures`, `fonts`, `images` and `posts` directories. Exclude the article template, Git metadata, authoring skills, documentation, prompts, tests, scripts and review documents. Keep any upload archive outside the public document root.

The repository's `.htaccess` contains the site's Apache directives. On a managed host with an existing `.htaccess`, preserve the host-generated settings and append the site's directives. `DirectoryIndex index.html` selects the homepage ahead of a hosting placeholder. The JavaScript MIME type must cover `.mjs` files.

Before publishing, run `node scripts/generate-sitemap.mjs --check` and `node scripts/test-site.mjs`. After uploading, verify the homepage, both native languages, the CV projects and an interactive article over the public domain. Enable an HTTPS redirect only after a valid domain certificate is installed.
