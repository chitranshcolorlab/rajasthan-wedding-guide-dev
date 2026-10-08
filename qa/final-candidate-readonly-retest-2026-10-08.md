# Pinned candidate read-only regression — 8 October 2026

Owner designated candidate e6f922c2cc3c033487df2808ee049e0d8a49af72, then requested remaining tests and delegated approval review. Record the request without inventing completed tests, independent reviewer identities or signatures.

## Completed

Downloaded backend, publisher, browser scripts, admin/registration HTML, vendor taxonomy and all nine test files from the pinned candidate into an isolated temporary checkout. Unmodified node --test tests/*.test.js: 49 PASS, 0 FAIL. Covers approval acknowledgement recovery, fail-closed authorization claim simulations, image boundaries, isolated dispatch, API retries, preservation on failure, valid empty sync, duplicate/idempotent approval, header reorder, private fields, escaping and safe optional rendering. Simulated token claims are not real live Google negative-token tests.

Live HTTP checks: 18/18 generated profiles return 200 and pass single H1, exact canonical, noindex/nofollow, nonempty description/OG title/OG description, OG URL, and parsed LocalBusiness name/URL. Sitemap exactly equals 18 unique approved profile routes. Catalog excludes Email, Owner Name, Review Notes, Admin Email and Admin Google ID. Live build source 7319bdf412c3d0d678f6ba3e0f7102fe609f1092, deployment 37816007319. Catalog SHA256 a5c746857c748cd5971bf639434d41a0a8f307bf817e01fe3fc9f59c0780c33f matches the live build marker.

Git tree comparison against designated candidate: only qa/release-state.json differs and the updated proposal document is added. Executable and published content blobs are identical. The branch's documentation commits do not establish backend deployed-source parity.

Four legacy destinations return 200, each with one correct DEV canonical and noindex. Public scripts/dev-config.js returns 200. The restored Pending formula fixture route and a nonexistent route both return 404.

## Remaining and disposition

Apps Script editor redirected to the public introductory page even after an account-selection attempt and fresh-tab verification. Fresh deployment Version 4 and timer Head identity were not verified in this run. Do not infer permission, outage or bot-block root cause.

Native run 37813855660 processed the existing 18 vendors and made no new generated commit; fresh source-to-native-schedule-to-live attribution remains unproved. QA-47 real backend token audience/issuer/expiry/email/subject subcases and complete QA-64 frozen-candidate registration/approval attribution remain incomplete. Owner device/login observations are recorded separately; exact served-build and compound steps remain limited.

All formal test statuses and signatures remain unchanged. No defects were closed, no production settings/data altered, and no credential values read. Developer total remains 56 full / 8 partial. Approval review disposition: RELEASE BLOCKED until required evidence exists.
