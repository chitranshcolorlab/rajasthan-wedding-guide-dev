# DEV launch checklist — 6 October 2026

Production release: BLOCKED. This is an evidence reconciliation, not a release approval. Live backend is restored Version 4. Production was not changed.

## Completed developer checks and remaining acceptance

| QA group | Completed evidence | Remaining acceptance | Evidence |
| --- | --- | --- | --- |
| QA-01–04 | Authenticated approve / edit-required / reapprove / reject triggered successful direct publication; forced dispatch failure retained approval and owner retry recovered. | Scheduled execution and frozen-candidate acceptance. | [direct-publisher-activation.md](direct-publisher-activation.md) |
| QA-05 | Six invalid live submissions rejected; forged Approved status stored Pending and hidden. | Complete case mapping and candidate retest. | [registration-validation-live-result.md](registration-validation-live-result.md) |
| QA-06 | Repeat approval smoke verified; simultaneous registrations created unique pending IDs. | Actual simultaneous authenticated approvals; registrations are not approval concurrency. | [concurrent-registration-live-result.md](concurrent-registration-live-result.md) |
| QA-07–13 | Persisted slug retained through edit-required / reapprove / reject / recovery; golden-vendor repeat approval smoke. | All slug edge cases and simultaneous same-name approval on candidate. | [direct-publisher-activation.md](direct-publisher-activation.md) |
| QA-14–18 | Large image compressed to 168 KB; server rejected 204801 bytes and eleven photos; ten gallery images loaded. | Full profile/media cases on candidate. | [backend-kb-live-result.md](backend-kb-live-result.md); [ten-photo-live-result.md](ten-photo-live-result.md) |
| QA-19–20 | tel and encoded WhatsApp hrefs inspected. | Actual device contact behavior not exercised with placeholder numbers. | [security-seo-mobile-live-result.md](security-seo-mobile-live-result.md) |
| QA-21–22 | Rejected/edit-required profile returned 404; reapproved profile loaded at same URL. | Candidate-specific route/refresh acceptance. | [direct-publisher-activation.md](direct-publisher-activation.md) |
| QA-23–28 | Rejected vendor absent from category and public snapshot; other five cards retained. | Full category cases on candidate. | [direct-publisher-activation.md](direct-publisher-activation.md) |
| QA-29–32 | Live category card navigation and direct profile refresh verified in developer smoke. | All linking cases on frozen candidate. | [live-smoke-2026-10-05.md](live-smoke-2026-10-05.md) |
| QA-33–35 | Single H1 and business title/description/canonical verified. | Full candidate SEO cases. | [security-seo-mobile-live-result.md](security-seo-mobile-live-result.md) |
| QA-36–39 | Open Graph fields inspected; logo profile has og:image; no-logo omission observed. | Social crawler preview and candidate case mapping. | [security-seo-mobile-live-result.md](security-seo-mobile-live-result.md) |
| QA-40 | LocalBusiness JSON-LD parsed with matching name URL phone and location. | Candidate-specific complete schema acceptance. | [security-seo-mobile-live-result.md](security-seo-mobile-live-result.md) |
| QA-41–45 | Six unique DEV sitemap URLs exactly matched approved slugs; no rejected/production URL; noindex verified. | Scheduled synchronization and full indexing cases; DEV remains noindex. | [security-seo-mobile-live-result.md](security-seo-mobile-live-result.md) |
| QA-46–49 | Approved-only public data; private fields absent; missing/invalid token requests rejected; forged status ignored; overlapping registration IDs unique. | Valid-token audience/issuer/expiry/subject permutations; actual concurrent approval; DATA-001 live reorder retest. | [security-seo-mobile-live-result.md](security-seo-mobile-live-result.md); [registration-validation-live-result.md](registration-validation-live-result.md); [concurrent-registration-live-result.md](concurrent-registration-live-result.md) |
| QA-50 | Optional-field preservation and escaping covered by implementation/local tests only. | Live optional-field acceptance on candidate. | [live-smoke-2026-10-05.md](live-smoke-2026-10-05.md) |
| QA-51–57 | Four pinned legacy DEV profiles: redirects and desktop image/video loading verified. | Full independent candidate legacy regression. | [legacy-dev-live-result.md](legacy-dev-live-result.md) |
| QA-58–63 | 375px frame smoke: no horizontal overflow; contact buttons 48px high; logo/gallery loaded. | Physical Android/iOS touch and all responsive cases. | [security-seo-mobile-live-result.md](security-seo-mobile-live-result.md) |
| QA-64 | Real form submission and authenticated approval produced profile without vendor-specific code; direct status-triggered publish and recovery verified. | Original scheduled-publication requirement remains unverified; complete golden-vendor candidate evidence and independent signoff. | [live-smoke-2026-10-05.md](live-smoke-2026-10-05.md); [direct-publisher-activation.md](direct-publisher-activation.md) |

## Launch gates

1. Run two actual simultaneous authenticated approvals for the same-name pending vendors; verify separate stable slugs and correct rows. Overlapping registration requests already passed but do not prove approval concurrency. Google OAuth currently returns 502 / connection refused; login retry was stopped at the user's direction.
2. Independently retest DATA-001 with reordered columns on the frozen candidate, preserving before/after evidence. Developer automated regression is recorded; the defect remains FIX READY.
3. Complete physical Android/iOS and contact behavior checks using appropriate test contacts, plus the remaining security, optional-field and profile edge cases. Placeholder vendor numbers must not be contacted.
4. Demonstrate an actual scheduled publisher run for the existing requirement. Direct dispatch works and has recovery evidence, but AUTO-001 and the original QA-64 requirement remain unresolved. Any requirement change needs a separate documented decision; none is made here.
5. Freeze the release candidate; map and retest all 64 individual criteria and four legacy checks; record QA, Developer, Release Owner and Approver signoff against that candidate. Role owners are unassigned; no signatures are fabricated.

## Interpretation

`release-matrix.csv` describes partial developer coverage. `release-state.json` retains formal NOT RUN statuses until candidate-specific individual evidence exists, and adds developer coverage/evidence separately. Historical evidence spans multiple commits and deployment versions; it is not a single frozen-candidate result. Run `node scripts/check-release.js qa/release-state.json`: it must remain blocked while these gates are open.


## Scheduler update — 6 October 2026

The earlier no-scheduled-run observation is superseded: actual schedule-event runs 37373609865 and 37400693805 completed successfully, checked out DEV commit 92f946a4ac06befb84cb3d9f3cd19d97ba374092, passed 26 tests, and synchronized six vendors. See [scheduler-observed-2026-10-06.md](scheduler-observed-2026-10-06.md). Both runs left generated output unchanged. Fresh approval-to-scheduled-generated-commit propagation and regular five-minute cadence are not established. AUTO-001 remains open for formal QA disposition; QA-64 and other acceptance gates remain incomplete. Statements above about no observed schedule describe the earlier evidence only.
