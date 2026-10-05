# DEV Version 3 upload verification — 5 October 2026

Isolated Apps Script deployment updated successfully to Version 3; same DEV endpoint and existing access scope.

Live API negative checks returned ok:false for a 204801-byte image (Image exceeds 200 KB limit) and eleven photos (Maximum 10 photos allowed), before storage.

Post-deployment browser registration used rwg-large-upload-test.png (11,380,532 bytes). The site automatically compressed it and received a successful server receipt: RWG-cd5f666e-b66b-488d-bbbe-2b6abcc558af, Pending Approval, uploaded image size 168 KB. Disposable vendor: DEV Version 3 Upload Test — Not a real vendor. No approval/publication is claimed for this record.

Publisher run 37308064614 passed all 20 tests, zero failures; Pages run 37308063794 succeeded.

Default-branch scheduler workflow has cron */5 * * * * and checks out dev/automatic-vendor-system. At verification, GitHub schedule-event run count remained zero; timed execution is not verified. Full DEV legacy regression and independent QA signoff remain outstanding. Production unchanged.

Browser receipt proof: rwg-v3-compressed-upload-1791203580201.jpg.
