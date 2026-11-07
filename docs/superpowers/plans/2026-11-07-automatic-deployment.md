# Automatic production deployment implementation plan

**Goal:** A verified push to `main` updates the existing static host without a separate upload request.

**Architecture:** GitHub Actions runs the existing checks, selects only tracked public runtime files and transfers changes using certificate-verified explicit FTPS. A separate FTP account is confined to the web root; its credentials are Actions secrets in a production environment restricted to main, never source. Existing host configuration, unrelated directories and cached article exports are retained. Production remains the root application.

**Tech stack:** Official SHA-pinned checkout/setup-node actions, Node 24, Python standard-library FTPS and HTTPS.

- [x] Add tests for file selection, traversal/symlink rejection, changed-file transfer, temporary-file promotion and release-marker ordering. Observe initial failure, then implement `scripts/deploy_site.py`.
- [x] Add `.github/workflows/deploy.yml`: main-only push/manual triggers, read-only repository token, serialized deployments, existing content/runtime checks and stale-commit guard. No third-party deployment action.
- [x] Verify locally without credentials; review source and workflow before enabling access. Keep CI secrets unavailable to pull requests. Eight deployment tests and 120 site tests pass; the dry run selects 310 runtime files. Independent source review found no blocking issue. Production FTPS control TLS was verified without login; authenticated transfer remains untested.
- [ ] Obtain action-time confirmation for creating a separate web-root FTP account and giving its credentials to this repository's deployment workflow. Do not create or transmit credentials before that confirmation. A directory restriction includes its subdirectories; application allowlisting is not an FTP permission boundary within that root.
- [ ] Store credentials through GitHub Secrets without printing/logging them, push the reviewed workflow and observe its first real run. Report it active only after the public release marker matches the main commit and the live article/asset checks pass.

## Failure and rollback

Files are promoted individually by rename, with assets before shared entry files and a public commit marker last. This is not an atomic whole-site switch. A transfer failure must fail the run without claiming the marker was published. Old article assets and unrelated files are not deleted. Revert content commits on main while retaining the deployment workflow to publish a previous version. A first deployment or an interrupted transfer can be retried manually through Actions.
