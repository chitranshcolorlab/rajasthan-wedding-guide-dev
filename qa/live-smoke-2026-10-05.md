# DEV live smoke test — 5 October 2026

- Isolated Apps Script setup completed; separate spreadsheet 1HLozIIcXhxepuLac1R7fD_Fvu7NyqH2hgQbn8bqJioE.
- DEV Pages source is dev/automatic-vendor-system. Production repository untouched.
- Publisher run 37278866723 passed live health/list checks with 0 approved vendors and all 13 unit tests.
- Registered disposable DEV QA64 Test Studio — Not a real vendor through the live browser form. Readable JSON success shown. Submission ID RWG-259a2c9d-772a-4fa7-9016-ec0085cc1597.
- Google sign-in as authorized admin succeeded. Private list showed Pending Approval; authenticated approval returned VERIFIED Approved.
- Publisher run 37280727611 succeeded. Snapshot contains one approved row with persisted slug dev-qa64-test-studio-not-a-real-vendor-didwana. sitemap-vendors.xml contains the same URL.
- Browser category card opened generated profile. Direct refresh succeeded. Head inspected: correct title, DEV canonical, noindex,nofollow and LocalBusiness schema.
- No vendor-specific code was added to generate this profile. Directory navigation bug found during smoke test and fixed generically; 3530 DEV SEO pages and 13 unit tests passed after fix.
- Main contains schedule-only workflow checking out DEV preview branch. Every-five-minute cron configured; scheduled execution itself has not yet been observed. Manual workflow dispatch verified.

This is developer smoke evidence, not release sign-off. QA-64 requires the exact specified golden vendor, scheduled publishing and candidate-specific independent QA evidence; full 64-case QA, four legacy/media checks and sign-offs remain pending. Test vendor uses placeholder 9999999999, is visibly labelled not real, and remains only on noindex DEV. Do not call it. No photos were submitted in this smoke test.
