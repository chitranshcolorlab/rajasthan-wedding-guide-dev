# Candidate security and recovery tests — 6 October 2026

Exact files retrieved from candidate b5219c1a4c54e84b062786868c21ff43d43ea284 into an isolated local directory: backend/Code.gs, admin-review.html, tests/backend-auth-read.test.js and tests/admin-status-response.test.js. Node test runner: 9 tests, 9 pass, 0 fail.

Security VM cases verify valid synthetic claims, rejected audience/issuer/expiry/email/verification/subject variants, missing/non-string tokens, verifier outage/malformed JSON. Unauthorized cases never read the synthetic private sheet. No real token or live Google verifier used.

Response recovery cases verify unreadable acknowledgement reconciled by authenticated readback with one update; unconfirmed write never reports success/resends; explicit authorization rejection is not overridden; failed readback never reports success; normal queued feedback retained. These are local candidate-source tests, not independent live UI-001 closure or reproduction of the original upstream cause.

Additional read-only candidate checks: all 15 LocalBusiness schema name/url/telephone/city/type match snapshot; rendered Didwana photographers category contains 15 unique DEV profile links and excludes rejected Owner QA 1930. Initial static HTML link scrape did not find the dynamically generated cards; browser DOM inspection verified actual rendered links. This is not a category failure.

Owner at 21:02:20 reaffirmed prior orientation and four legacy profile checks were correct. Record as owner confirmation of previous checks, without inventing device/build/screenshots or individual exact-candidate PASS.

Formal independent defect closures and signatures unchanged. No production mutation, credentials exported or contact messages sent.
