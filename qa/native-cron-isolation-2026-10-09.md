# Native cron isolated fresh-change check — 2026-10-09

Result: NOT VERIFIED. QA04 and AUTO001 remain open; no formal PASS or frozen-candidate signoff is inferred.

## Scope and method

Isolated DEV only. Existing disposable Approved fixture RWG-421694dc-516b-4f36-b87b-771c38b9c0f7, Vendor Registrations!O4 (Services). No production changes, vendor contact, approval status changes, or manual workflow dispatch.

At 2026-10-09T06:00:06.442Z (11:30:06 IST), temporarily appended marker CRON-QA-20261009-NATIVE-A. The existing retryDevPublication backup timer was temporarily saved as a future one-time trigger, preventing its normal five-minute dispatch during the bounded observation window. Native default-branch schedule has configured ticks at 06:02 and 06:07 UTC.

## Observed result

No new schedule event appeared through 2026-10-09T06:07:21Z. Latest native run remained 37872837751, created 2026-10-09T02:04:43Z, completed/success. An earlier successful schedule does not prove publication of this new marker. No generated commit or live marker attributable to a new schedule was observed. This bounded check does not establish the cause of the scheduling gap.

Polling observations:

```json
undefined
```

## Cleanup verified

- Original O4 userEnteredValue restored by 2026-10-09T06:08:20.309Z: DEV upload acceptance test only. Placeholder contact: do not call.
- Post-read Vendor Registrations!A1:AB28 CellData exactly equals the retained pretest read (userEnteredValue, dataValidation, formattedValue).
- retryDevPublication / Head / Time-driven / Minutes timer / Every 5 minutes / Notify me daily was saved and reopened to verify persistence. No extra trigger was added. Screenshot: dev-cron-backup-restored-20261009.jpg.
- Public approved-vendors.json marker absent; SHA256 a5c746857c748cd5971bf639434d41a0a8f307bf817e01fe3fc9f59c0780c33f, unchanged from baseline.
- Public dev-build.json sourceCommit 930331f98028f6e6e089b428b40effa5f5e79a51 and deploymentRun 37891075144, unchanged from baseline.

## Remaining acceptance criterion

A fresh isolated Approved source change must be consumed by a NEW event=schedule run, with its generated commit and live publication linked to that run. Backup workflow_dispatch remains a separate mechanism and cannot satisfy native cron evidence. Another bounded test is required when native scheduling resumes; no marker is left pending.
