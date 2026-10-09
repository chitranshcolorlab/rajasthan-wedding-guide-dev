# DEV missing/malformed token runtime retest — 9 October 2026

Four actual requests against deployed DEV Version 4: admin-list without token rejected Google ID token missing.; admin-list with synthetic not-a-google-token rejected Invalid or expired Google ID token.; status Approved targeting disposable fixture RWG-313849e4-708d-4d47-98ca-d4bbb3d751c3 without token rejected missing token; same status with synthetic malformed token rejected invalid/expired token. All returned ok false and no items array. No real Google credential was read, extracted or transmitted by test tooling.

Fresh native Vendor Registrations A1:AB40 CellData exactly matched the previous cleanup snapshot: 27 rows including header, no registration/status/note/slug changes, fixture still Rejected.

Latest native schedule remains 37850913684 created 8 October 22:02:40Z / 9 October 03:32:40 IST, successful. No newer native run at inspection. Prior successful registration publication used workflow_dispatch; not native cron evidence.

This confirms deployed missing/malformed-token rejection, not real correctly signed negative audience/issuer/expiry/subject/email permutations. QA47 remains partial; no formal status/signoff/count changes. No new bug found. Production untouched.
