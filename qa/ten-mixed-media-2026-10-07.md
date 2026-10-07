# Mixed-format ten-photo live QA — 7 October 2026

COMPLETE — developer verification; independent formal acceptance pending.

Owner authorized the next DEV disposable verification at 11:44:10 IST. Production was untouched.

## Submission and media

Exactly one API submission contained ten diagnostic photos (JPEG, PNG and WebP) plus a JPEG logo, all below 200 KB. The response timed out after 30 seconds; no submission retry was made. Admin readback confirmed exactly one pending record: RWG-ec4ed934-7e30-4833-a1aa-6cc4cea7a72b, “DEV Ten Mixed Media QA 20261007 — Not a real vendor”. Only that disposable record was approved.

Direct publisher run 37580571608 succeeded with 47 tests passing and zero failures, producing commit be6b902623f0c63af63a9d45f080d2fb4965f9bf. Pages run 37580605016 succeeded. Backup run 37580602232 made no generated change.

The published record contained exactly ten photo URLs and one logo URL. All eleven image responses were HTTP 200, valid supported image signatures and below 200 KB. Google thumbnail serving converted WebP inputs to JPEG responses; returned WebP MIME is not claimed. Browser DOM confirmed gallery=10, total images=11, loaded images=11 (complete with positive natural width). Diagnostic gallery screenshot was retained.

## Cleanup

The same record was rejected once with review note “QA complete — disposable ten mixed-media fixture; remove public profile.” Admin readback confirmed Rejected and publication requested. Cleanup Pages run 37581050046 completed successfully at generated head 4d6b142a6c95040f01d2175e583ee54dfd626d94.

Final live HTTP readback on 7 October: profile 404, approved-vendors.json count 16 with target absent, sitemap-vendors.xml target absent. No other records or timer settings changed. Rejected source audit and uploaded QA files retained.

QA-15 and QA-18 have full developer procedure evidence, with QA-18 combining this exact-ten positive boundary and the eleven-photo negative test in qa/upload-limit-live-2026-10-07.md. QA-16 large-original frontend compression remains partial. Formal statuses, frozen candidate and signoffs remain unchanged.
