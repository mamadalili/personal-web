# Static hosting

Build from the repository root with `npm ci` and `npm run build`; use `npm run check` to verify the release. The web root is `public/`. Deploy its runtime files at the domain root. The article template, release ZIPs and `react-site/build/` belong outside the published tree.

## Publishing a new blog

1. Update the bilingual article, its cover images and its entry in `public/blog-data.mjs`.
2. Run the [generators and checks](repository-layout.md#editing-and-generation) from the repository root.
3. Include the new images and previews, the preview manifest, the referenced hashed JSON, changed source modules, runtime bundles, summaries and sitemap. When an archive card changes, publish all generated archive copies: `blog.html`, `blog.fa.html`, `blog.en.html`, `reading/fa/archive.html` and `reading/en/archive.html`. Each article has its own HTML under both reading directories.
4. Use `python scripts/package_runtime.py --output release.zip <files...>`. Filenames are relative to `public/`. The packager preserves public paths and writes regular files with Unix mode `0644`. Publish dependencies before the pages that use them.
5. Merge the marked rules from `public/.htaccess` into the web server's configuration. Keep host-managed directives and previously referenced hashed assets. Publish `reading/.htaccess` with `article-not-found.html` for missing articles. Older CV links redirect to `cv.fa.html` or `cv.en.html` and retain the employer and selected tab.
6. Open the public article in each language, try its interaction and follow its archive link. Verify changed files against the release hashes and check that a conditional request for an older version receives the new content. Check that a missing article returns HTTP 404 and each sitemap URL opens without a redirect.

Deploy `home.en.html` and `home-entry.php` before the home routing rules. On the PHP-enabled host, the entry script reads the prebuilt English HTML from disk at `/?lang=en`. On older installations, move the former `index.en.html` file into the private rollback copy after checking both home languages. Its public address is handled by the redirect rules.

For a local preview and the complete build commands, see the [repository layout](repository-layout.md).
