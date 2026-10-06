# DEV concurrent authenticated first approvals — 6 October 2026

Environment: isolated DEV backend Version 4; no production writes. Two separate cloud-browser DEV admin tabs showed the authorized Google account and loaded two fresh same-name Pending Approval records. Test name: DEV Parallel Approval 20261006 — Not a real vendor. Contacts 9999999999 are placeholders and were not contacted.

| Test | Submission ID | Confirmation start UTC | Persisted slug |
| --- | --- | --- | --- |
| 1 | RWG-e27ed2ce-fb00-444e-a7db-15814551ac50 | 2026-10-06T04:39:24.954Z | dev-parallel-approval-20261006-not-a-real-vendor-didwana |
| 2 | RWG-f4289f8f-ff95-4a14-aeb4-47d9c647b5f1 | 2026-10-06T04:39:24.956Z | dev-parallel-approval-20261006-not-a-real-vendor-didwana-2 |

Both native Approve confirmation dialogs were accepted via Promise.allSettled; start gap 2 ms. Both tabs simultaneously showed Sending secure Approved request; later each showed VERIFIED Approved and Publication requested for its own ID. These are measured browser action starts, not exact network arrival or backend lock timestamps. No credential values were read or exported.

Public GET returned eleven approved records, including both distinct IDs and distinct slugs; neither overwrote the other. First direct publisher run 37414742734 succeeded; generated commit 81fda939928cd681c4d4781061694df68e930cd0; Pages run 37414763430 succeeded. Second direct publisher run 37414745154 status at final check: completed/success. Both exact profile URLs subsequently loaded in browser with the correct H1/location/services, rather than 404:

- https://chitranshcolorlab.github.io/rajasthan-wedding-guide-dev/vendors/dev-parallel-approval-20261006-not-a-real-vendor-didwana/
- https://chitranshcolorlab.github.io/rajasthan-wedding-guide-dev/vendors/dev-parallel-approval-20261006-not-a-real-vendor-didwana-2/

Developer concurrent first-approval smoke: PASS. Backend arrival-time overlap, full independent frozen-candidate acceptance, rename/permanence edge cases and formal signoffs are not claimed. Existing release blockers and all formal individual statuses remain unchanged.

The earlier two DEV Concurrent Same Name records were approved sequentially by the user; they are not the concurrency evidence above. The previous Google-login blocker was resolved by user cloud-browser sign-in in each tab.
