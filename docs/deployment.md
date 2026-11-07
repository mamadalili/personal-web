# Static hosting

The public domain is https://mrdalili.ir/. This site runs as static HTML, CSS, JavaScript modules and local assets; it needs no database or Node.js server on the hosting account.

Publish the root HTML, CSS, JS and MJS files, `robots.txt`, `sitemap.xml` and the `assets`, `figures`, `fonts`, `images` and `posts` directories. Exclude the article template, Git metadata, authoring skills, documentation, prompts, tests, scripts and review documents. Keep any upload archive outside the public document root.

Package only the runtime figure dependency `figures/solo-model.mjs`; the other figure files are retired authoring prototypes. ZIP archives created on Windows must explicitly store Unix file modes: regular files `0644`, directories `0755` when directory entries are included. Verify the archive's stored modes before uploading. The host refuses world-writable `0666` files. Keep a working backup outside the public document root before replacing files.

The repository's `.htaccess` contains the site's Apache directives. On a managed host with an existing `.htaccess`, preserve the host-generated settings and append the site's directives. `DirectoryIndex index.html` selects the homepage ahead of a hosting placeholder. The JavaScript MIME type must cover `.mjs` files.

Before publishing, run `node scripts/generate-sitemap.mjs --check` and `node scripts/test-site.mjs`. After uploading, verify the homepage, both native languages, the CV projects and an interactive article over the public domain. Enable an HTTPS redirect only after a valid domain certificate is installed.

The hosting account can issue a free Let's Encrypt certificate with AutoSSL renewal. After its installation, enable Force HTTPS Redirect in the domain settings and verify an HTTP request keeps its path and language query while redirecting to HTTPS. Preserve these host-managed directives when updating `.htaccess`; a runtime archive can omit that file to avoid overwriting them.

The production release still uses the root application. `react-site/build/client` is the phased migration preview until the separate cutover described in `react-migration.md`; do not replace production with a partial preview or its noindex/robots policy.

## Publishing a new blog

A normal new-blog task includes both Git and live publication. Draft-only requests remain unpublished. Pushing `main` alone does not update this host: the current deployment procedure is an explicit upload, not a configured GitHub Actions pipeline.

1. Finish the Persian and English article, useful interactions, native cover images and local WebP previews. Add the published article to `blog-data.mjs`.
2. Generate and check the runtime and sitemap:

   ```sh
   node scripts/generate-blog-runtime.mjs
   node scripts/generate-sitemap.mjs
   node scripts/generate-blog-runtime.mjs --check
   node scripts/generate-sitemap.mjs --check
   node scripts/check-blog-skills.mjs
   node scripts/test-site.mjs
   ```

   Run syntax/model checks for changed code and inspect the article in both languages on desktop and phone layouts. Regenerate exports after any final article edit.
3. Commit the verified source, images and generated files; push to `main` and confirm the remote commit. Keep private review material and credentials out of Git.
4. Build a release ZIP with `scripts/package_runtime.py --output <release.zip> <explicit-runtime-files...>`. Include new covers/previews, the exact hashed JSON referenced by the generated index, source post modules and their dependencies, changed widget modules/styles, `blog-data.mjs`, `blog-summaries.mjs`, `sitemap.xml` and any changed shared runtime such as `blog.mjs`. Include pending earlier articles if the current index references them. Put assets/dependencies before the shared entry files. Check file hashes, contemporary timestamps and Unix `0644` modes; retain the previous release for rollback.
5. In the existing host's cPanel **File Manager**, open the account home and use **Upload** to upload the ZIP outside `public_html`. Wait for **100% complete**. Select that ZIP and choose **Extract**, using `/public_html` as the destination. Confirm the extraction results and preserve any unrelated sites/subdirectories and host-managed `.htaccess` rules. Do not upload a whole development checkout.
6. Open the public article using `article.html?post=<slug>&lang=fa` and `lang=en`. Check artwork, the actual selected interactions, Home and the archive entry. Compare public asset hashes with the release manifest. For changed shared files, send `If-Modified-Since` using the prior release's `Last-Modified`: it must return fresh `200` bytes rather than a stale `304`. Reopen or reload the page after publication when checking an already open tab.
7. Report the live article link and verified Git commit. A successful upload or Git push alone is not sufficient evidence. If access is unavailable, report the blocker and the prepared release without claiming publication.

For a manual upload of an already prepared release, steps 5 and 6 are the hosting actions. The ZIP already contains the directory structure; extract its contents into the web root rather than creating another nested release folder there.

## Automatic publication setup

The prepared workflow is `.github/workflows/deploy.yml`. It becomes operational when merged to `main`, the three Actions secrets below are configured and its first real deployment passes. Until then, use the manual procedure above; workflow source alone is not proof of a working connection.

- `DEPLOY_FTPS_HOST`: the certificate-valid FTPS hostname supplied by the host.
- `DEPLOY_FTPS_USER`: a separate deployment FTP account confined to the existing site's document root.
- `DEPLOY_FTPS_PASSWORD`: that account's password. Store it only in GitHub Actions environment secrets, never source, a workflow literal or logs.

Create a GitHub environment named `production`, with a custom deployment branch policy allowing only `main`, and store all three secrets there rather than at repository level. The workflow already targets this environment. Existing protection rules must be read and preserved before changing an environment; do not silently remove reviewer gates.

Creating this account and storing its credentials in GitHub grants persistent write access to the FTP account's root **and its subdirectories**. Directory confinement does not isolate individual files inside that root. Do not reuse the main cPanel account. Obtain action-time approval for this credential grant before completing account creation or secret transmission.

On a push to `main`, Actions checks the generated article data/sitemap, authoring package integrity, site tests and the deployment model tests. The transfer uses Python's standard-library FTP_TLS with validated control/data TLS; certificates are never bypassed. Official Actions are pinned to exact release commits, the repository token is read-only, and no pull-request trigger receives deployment credentials. Production runs are serialized without cancelling an in-flight transfer; a queued superseded commit is skipped.

`scripts/deploy_site.py --dry-run` lists the tracked public runtime inventory without connecting or reading secrets. `.htaccess`, development/React-preview files, authoring skills and templates are excluded. The live script checks the existing site's identity before writing, promotes each file from a temporary name with `0644` permissions and verifies changed bytes over HTTPS. A successful `site-release.json` identifies the deployed commit and file hashes. Matching remote hash metadata, size and modification time allow unchanged files to be skipped; this metadata is an optimisation, not a security boundary. No remote files are deleted, including old cached article assets and unrelated directories.

Promotion is per file, not an atomic switch of the entire site. Assets precede shared entry files, and the commit marker is written last. A failed run can leave a partial set of changed files; retry it in **GitHub → Actions → Publish production site**. For rollback, revert the relevant content commits on `main` while retaining the deployment workflow, then observe the resulting deployment. Always confirm the successful run and public marker before reporting the site updated.
