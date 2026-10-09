# Retained Google ID-token expiry check — 9 October 2026

DEV only, developer-observed read-only backend check.

The existing security QA browser tab was retained without developer refresh, navigation, token extraction or renewed sign-in. Earlier same-page retry at approximately 10:14 IST returned ACCESS ALLOWED, item count26. Owner reported renewed admin sign-in complete at 10:13:19 IST.

At approximately 11:18 IST the developer clicked the existing same-login retry control once. The rendered result was:

ACCESS REJECTED — Invalid or expired Google ID token.
Private item array returned: NO

This is a successful developer expiry rejection observation for the retained previously accepted credential. Exact exp claim was not inspected; backend wording combines invalid and expired. The earlier positive observation and hour-long retained-page interval support expiry attribution. No private vendor list was displayed, no vendor writes occurred, and no secrets were exposed.

QA-47 still remains partial: actual wrong-audience/issuer/subject permutations and independent DATA-001 frozen-candidate acceptance remain pending. This check does not supply formal PASS, close defects, change the candidate or sign roles. Existing 56 full / 8 partial classification is unchanged.
