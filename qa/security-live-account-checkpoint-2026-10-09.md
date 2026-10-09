# Live Google account QA checkpoint — 9 October 2026

DEV only. Read-only admin-list requests from dev-security-qa.html; no vendor status mutations, registrations, token extraction or security permission changes.

## Evidence

- Owner reported ACCESS ALLOWED at 09:55 IST. Developer subsequently observed ACCESS ALLOWED with returned item count 26 in the existing cloud-browser page at approximately 09:57 IST.
- A secure account chooser selected Sharad again during the attempted non-admin check; the resulting ACCESS ALLOWED was observed. This is an authorized positive check, not negative coverage.
- Owner reported ACCESS REJECTED at 10:04:31 IST after instructions to choose a different account. Exact account and backend error text were not captured by the developer. Retain as owner-reported negative evidence, not developer-observed full rejection proof.
- Owner accidentally cleared the test login at 10:10 IST and reported fresh login complete at 10:13:19 IST. Developer observed ACCESS ALLOWED and retried the same in-memory login at approximately 10:14 IST; backend returned ACCESS ALLOWED, count 26.
- Expired-token check is PENDING. The page must retain the credential without reload, clear or new sign-in. Approximately 11:15 IST is a planned check window based on reported login time, not an inspected expiry claim. No background execution is claimed.

Google documents a one-hour Sign in with Google ID-token lifetime; exp is the authority. Token expiry does not imply that the Google account session itself is signed out: https://developers.google.com/identity/gsi/web/reference/html-reference#credential

## Remaining

QA-47 valid-token audience, issuer, subject, expiry permutations and independent DATA-001 frozen-candidate acceptance remain partial. Do not upgrade QA-47 or infer formal acceptance from a positive admin-list result or the reported alternate-account outcome.

Existing developer coverage stays 56 full / 8 partial. All formal statuses, candidate identity, signoffs and defect dispositions remain unchanged. Physical device observations from 8 October are retained; missing exact served-build linkage must not be fabricated. No PROD changes.
