# Home release freshness

The user reported the earlier illustrated Home capsules instead of the current compact links. The source and unconditional public responses already contained the compact Home. The preceding ZIP used `ZipInfo(name)` without a timestamp, so extracted runtime files reported `Last-Modified: Mon, 31 Dec 1979 20:30:00 GMT`. An actual conditional GET with the previous release date returned 304 for both Home HTML and portfolio JavaScript. This let an older browser copy survive the revalidation policy.

Keep the reviewed Home and Solutions designs unchanged. Package the affected runtime files with the current release timestamp and Unix 0644 modes, then verify a conditional request from the prior release returns 200 with current bytes. Check normal Home navigation, four compact links with zero artwork, the Solutions artwork, both languages and mobile. Preserve hosting configuration and HTTPS.

Add a small packager for explicit root HTML/CSS/JS/MJS files so timestamps and modes are not assembled manually. The test first failed because no packager existed. It must verify the actual archive date, permissions, bytes and rejection of private/configuration paths. Record release evidence after publication and save the fix on main under the author's approved workflow.

## Evidence

The corrected archive contains twelve runtime files with explicit 2026 release timestamps and Unix 0644 modes. All twelve normal public responses match local bytes and now report the correct release date. The three previous-version conditional requests now return 200 with current content, whereas they returned 304 before the fix. A request carrying the actual current modification date correctly returns 304.

Chrome verified ordinary navigation Home to Solutions and back: Home has four compact links and zero artwork nodes; Solutions has four artwork nodes. English Home at 390px has two columns, four compact links, no artwork, no horizontal overflow and no console errors. No runtime content or visual code was changed in this fix.

`python -B -m unittest discover -s tests -p test_package_runtime.py` passes. The independent review identified an output path that could overwrite its input; the regression failed before the guard and now passes while preserving the HTML bytes. The guard rejects resolved-path and same-file collisions before opening the ZIP. The reviewer reran the test and reported no remaining important findings.

The scoped design gate retains the reviewed design exactly. This release corrects freshness metadata and records its verification; it does not add UI, assets, copy or motion.
