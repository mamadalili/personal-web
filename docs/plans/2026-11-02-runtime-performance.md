# Production performance

The live site still uses the root application; the React migration remains a separate preview. A cold Home load fetched 68 same-origin resources (2,815,808 bytes), including 38 article modules and a 428 KB portrait displayed at 59px. Compression is already active on the host.

1. Generate a checked, bilingual article summary index for Home and the archive. Load only the selected article's complete data on article pages. Preserve every source object and existing interaction.
2. Generate smaller card-only WebP exports, small portrait derivatives and a WOFF2 font. Keep original article banners, portrait and font source files.
3. Verify generated content against its source, run existing site checks and the React preview build, and inspect native languages and mobile scrolling.
4. Publish explicit runtime files and generated assets with current timestamps and Unix file permissions. Verify production bytes, conditional requests and the same cold-load measurement before saving the release to main.

Preserve the shared four illustrated capability cards, glass navigation, native language content and article artwork. Report measured payload improvements separately from network-dependent elapsed times.
