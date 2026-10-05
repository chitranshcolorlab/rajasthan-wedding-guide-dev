# DEV publisher recovery and live check — 5 October 2026

AUTO-001: timed publication remains unverified and release-blocking. Approved record RWG-cd5f666e-b66b-488d-bbbe-2b6abcc558af was absent from approved-vendors.json before manual dispatch, while GitHub schedule-event run count remained zero. Workflow was enabled; default-branch cron was present. Offset cron to 2-57/5 previously; now disabled/re-enabled once with UI success confirmation. Recheck still showed zero scheduled runs. Root cause is unconfirmed. No claim that reset repaired scheduling.

Manual recovery: workflow_dispatch run 37313684667 succeeded with all 20 tests passing, zero failures. Generated snapshot includes the approved record and slug dev-version-3-upload-test-not-a-real-vendor-didwana. Pages 37313724866 succeeded.

Live browser opened https://chitranshcolorlab.github.io/rajasthan-wedding-guide-dev/vendors/dev-version-3-upload-test-not-a-real-vendor-didwana/ and verified heading. Its one compressed gallery image loaded with positive natural width. Direct refresh retained the profile; scrolling loaded the lazy image again. Screenshot rwg-dev-published-v3-1791205415526.jpg records the profile view.

Manual publication is operational; scheduled publication and full QA-64 are incomplete. Independent QA/signoff remains required for release. Production unchanged.
