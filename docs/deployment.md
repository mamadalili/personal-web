# Static hosting

Build from the repository root with `npm ci` and `npm run build`; use `npm run check` to verify the release. The web root is `public/`. Deploy its runtime files at the domain root. The article template, release ZIPs and `react-site/build/` belong outside the published tree.

## Publishing a new blog

1. Update the bilingual article, its cover images and its entry in `public/blog-data.mjs`.
2. Run the [generators and checks](repository-layout.md#editing-and-generation) from the repository root.
3. Include the new images and previews, the preview manifest, the referenced hashed JSON, changed source modules, runtime bundles, summaries and sitemap. When an archive card changes, include `blog.html`, `reading/fa/archive.html` and `reading/en/archive.html`. Each article has its own HTML under both reading directories.
4. Use `python scripts/package_runtime.py --output release.zip <files...>`. Filenames are relative to `public/`. The packager preserves public paths and writes regular files with Unix mode `0644`. Publish dependencies before the pages that use them.
5. Merge the marked rules from `public/.htaccess` into the web server's configuration. They provide the existing language URLs, module MIME types and cache rules. Keep host-managed directives and previously referenced hashed assets.
6. Open the public article in each language, try its interaction and follow its archive link. Verify changed files against the release hashes and check that a conditional request for an older version receives the new content.

For a local preview and the complete build commands, see the [repository layout](repository-layout.md).
