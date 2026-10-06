# DEV launch checklist — current evidence, 6 October 2026

Production release: BLOCKED. Live backend remains Version 4. This reconciles developer evidence and does not grant formal acceptance.

## Completed developer checks and remaining acceptance

| QA group | Completed developer checks | Remaining acceptance | Evidence |
| --- | --- | --- | --- |
| QA-01–04 | Authenticated approve / edit-required / reapprove / reject triggered successful direct publication; forced dispatch failure retained approval and owner retry recovered. | Two actual schedule runs succeeded (qa/scheduler-observed-2026-10-06.md); fresh scheduled change propagation and candidate acceptance pending. | qa/direct-publisher-activation.md |
| QA-05 | Six invalid live submissions rejected; forged Approved status stored Pending and hidden. | Complete case mapping and candidate retest. | qa/registration-validation-live-result.md |
| QA-06 | Actual concurrent first approvals in two authenticated tabs (2 ms confirmation-start gap) saved both vendors with distinct persisted slugs and live profiles; repeat approval smoke previously verified. | Complete individual double-approval cases and independent frozen-candidate retest. | qa/concurrent-approval-live-result.md; qa/concurrent-registration-live-result.md |
| QA-07–13 | Persisted slugs retained through edit-required/reapprove/reject/recovery; actual same-name first approvals produced distinct live base and -2 profiles. | All rename/normalization/slug edge cases and independent frozen-candidate acceptance. | qa/direct-publisher-activation.md; qa/concurrent-approval-live-result.md |
| QA-14–18 | Large image compressed to 168 KB; server rejected 204801 bytes and eleven photos; ten gallery images loaded. | Full profile/media cases on candidate. | qa/backend-kb-live-result.md; qa/ten-photo-live-result.md |
| QA-19–20 | tel and encoded WhatsApp hrefs inspected. | Actual device contact behavior not exercised with placeholder numbers. | qa/security-seo-mobile-live-result.md |
| QA-21–22 | All thirteen current approved profiles returned HTTP 200; prior rejected/edit-required 404 and stable republish verified. | Independent candidate-specific direct URL/refresh/404 acceptance. | qa/latest-catalog-route-live-result.md; qa/direct-publisher-activation.md |
| QA-23–28 | Current live category contains thirteen unique approved profile cards; rejected vendor absent. | Full category/filter/publishing cases on frozen candidate. | qa/latest-catalog-route-live-result.md; qa/direct-publisher-activation.md |
| QA-29–32 | Thirteen current category cards have distinct correct DEV profile URLs; all profile HTTP routes return 200; prior card navigation/direct refresh verified. | Full individual linking acceptance on frozen candidate. | qa/latest-catalog-route-live-result.md; qa/live-smoke-2026-10-05.md |
| QA-33–35 | All thirteen current profiles have single H1 and exact canonical; earlier title/description smoke verified. | Full candidate SEO criteria and independent acceptance. | qa/latest-catalog-route-live-result.md; qa/security-seo-mobile-live-result.md |
| QA-36–39 | Open Graph fields inspected; logo profile has og:image; no-logo omission observed. | Social crawler preview and candidate case mapping. | qa/security-seo-mobile-live-result.md |
| QA-40 | All thirteen profiles parse as LocalBusiness JSON-LD matching business name and canonical URL; earlier phone/location smoke verified. | Full schema/candidate acceptance. | qa/latest-catalog-route-live-result.md; qa/security-seo-mobile-live-result.md |
| QA-41–45 | Thirteen unique current sitemap URLs exactly match approved API slugs; category and profiles remain noindex; rejected and production URLs absent. Two actual schedule runs previously observed. | Fresh scheduled change propagation/cadence and complete indexing cases; DEV remains noindex. | qa/latest-catalog-route-live-result.md; qa/scheduler-observed-2026-10-06.md |
| QA-46–49 | Public privacy and token-negative checks; actual concurrent approvals; live blank-Email-first-column public/admin regression with exact sheet restoration; unsafe profile links omitted and literal markup escaped. | Valid-token audience/issuer/expiry/subject permutations; full security matrix; independent DATA-001 candidate retest. | qa/data001-column-reorder-live-result.md; qa/concurrent-approval-live-result.md; qa/safe-links-live-result.md; qa/security-seo-mobile-live-result.md |
| QA-50 | Twelve optional submitted values retained exactly; live display, safe HTTPS links and literal HTML-tag escaping verified; private fields absent. | Complete optional-field cases and independent frozen-candidate acceptance. | qa/optional-fields-live-result.md |
| QA-51–57 | Four pinned legacy DEV profiles: redirects and desktop image/video loading verified. | Full independent candidate legacy regression. | qa/legacy-dev-live-result.md |
| QA-58–63 | 375px frame smoke: no horizontal overflow; contact buttons 48px high; logo/gallery loaded. | Physical Android/iOS touch and all responsive cases. | qa/security-seo-mobile-live-result.md |
| QA-64 | Real form submission and authenticated approval produced profile without vendor-specific code; direct status-triggered publish and recovery verified. | Actual schedule execution observed (qa/scheduler-observed-2026-10-06.md); fresh scheduled change propagation remains unverified; complete golden-vendor candidate evidence and independent signoff. | qa/live-smoke-2026-10-05.md; qa/direct-publisher-activation.md |

## Outstanding release gates

1. UI-001: controlled live-backend unreadable-acknowledgement recovery passed (one status update, one authenticated readback; no publication claim). See admin-response-recovery-live-result.md. Independent frozen-candidate acceptance remains required; original upstream failure cause is unconfirmed.
2. AUTO-001 / QA-64: actual schedule runs exist, but fresh-change scheduled propagation and cadence remain unmeasured. Direct status-triggered publishing/recovery has live evidence. Original requirement is not waived.
3. DATA-001: developer live reordered-column retest passed and sheet restored exactly. Independent frozen-candidate acceptance must close the defect; developer cannot self-close.
4. Complete remaining auth permutations, slug/profile edge cases, physical Android/iOS and real test-contact behavior, social crawler checks and individual criterion mapping. Placeholder contacts must not be contacted.
5. Release Owner freezes a candidate; independent QA maps/retests all 64 criteria and four legacy cases. QA, Developer, Release Owner and Approver sign against that candidate. No roles/signatures are inferred.

## Interpretation

Current approved count is thirteen at this verification. Historical documents retain their earlier counts. All 64 formal tests remain NOT RUN because individual candidate evidence is incomplete; group developer smoke passes do not make formal PASS. Three tracked blockers remain DATA-001 FIX READY, AUTO-001 NEW and UI-001 FIX READY. Run the unchanged check-release.js against release-state.json; it must remain blocked.
