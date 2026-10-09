# Non-admin Google account rejection — 9 October 2026

DEV read-only account security QA. At 11:24:14 IST the owner reported Lensho account rejection. Developer then observed the existing security test page:

ACCESS REJECTED — This Google account is not authorized.
Private item array returned: NO

The backend-specific unauthorized-account response is developer-observed evidence of valid-token non-admin rejection; Lensho account attribution is owner-reported. No token values or private vendor contents inspected. The page callback invokes admin-list without the admin page frontend email prefilter, so this is backend rejection rather than frontend-only filtering.

Together with earlier developer-observed admin ACCESS ALLOWED and retained-token invalid/expired rejection at 11:18, positive admin, non-admin email rejection and retained expiry cases now have live outcome evidence. Wrong-audience/issuer/subject permutations and independent DATA-001 acceptance remain pending. QA-47 retains partial classification; no formal PASS, defect closure, candidate change or signatures inferred. No vendor/status/data/PROD writes.
