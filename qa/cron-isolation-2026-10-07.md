# Bounded isolated cron propagation test — 7 October 2026

Owner explicitly authorized browser DEV Sheet access and temporary backup timer suspension at 10:13:53 IST after Google Drive connector returned permission denied. Production unchanged; no source code/deployment/token property changes.

DEV sheet 1HLozIIcXhxepuLac1R7fD_Fvu7NyqH2hgQbn8bqJioE, Vendor Registrations, target row 19 ID RWG-e6e1b53a-f3b1-4516-995d-154fc2cda380. Header confirms Services is column O. Original value: `Disposable server-validation QA. Do not contact.`. Test value appends ` CRON-QA-20261007-ISOLATED-A`. Browser clipboard read before/after A19:AB19 verified only column 15 changed and Approved status unchanged; Saved to Drive verified.

Original timer: retryDevPublication, Head, Time-driven, Minutes timer, Every 5 minutes, Notify me daily. Suspension preserves trigger by changing only timer mode to Specific date and time, 2026-10-08 00:00 GMT-07:00. Reopened settings verify saved mode/date and same function/deployment/notification. This future date prevents backup dispatch during the bounded test window; restore five-minute recurrence before ending the test.

Before marker write, last dispatch 37573060464 at 04:46:23 UTC completed successfully. Latest five runs all completed; no in-flight publisher observed. Last actual schedule 37549346498 at 23:57:12 UTC on October 6 remained the baseline. No manual workflow dispatch or status update will be used to publish the marker. Only an actual event=schedule run with attributable changed commit and live marker can establish cron propagation.

State: COMPLETE — cleanup verified; cron propagation NOT VERIFIED.

## Outcome and restoration

Observed approximately 04:48–04:58 UTC (10:18–10:28 IST). Source API at 04:49:02 UTC returned Approved with the marker. No new schedule run appeared during the window; latest schedule remained 37549346498 from 23:57:12 UTC October 6. Latest dispatch remained pre-test 37573060464. No manual dispatch/status update was used. Generated catalog and live profile retained original Services; marker was not published. This does not establish the cause of schedule delay, and is not a cron PASS. AUTO-001 remains open; formal QA/signoffs unchanged.

Default-branch main workflow is configured for `2-57/5 * * * *` and checks out dev/automatic-vendor-system. DEV branch workflow has `*/5 * * * *`. Configuration alone is not timing or fresh-publication evidence. No workflow edits were made.

O19 restored to exact original Services. Browser clipboard A19:AB19 matches original full row byte-for-byte; Saved to Drive verified. Backup trigger saved and reopened: retryDevPublication, Head, Time-driven, Minutes timer, Every 5 minutes, Notify me daily. An intermediate unsaved Hour timer selection was corrected before Save. One save-completion wait timed out; subsequent fresh state showed completed save, then reopened values verified recurrence. Proof: cron-timer-restored-20261007.jpg.

Final live profile GET at 2026-10-07T04:59:47.210393+00:00 returned HTTP 200, original Services present, marker absent. Both temporary mutations are restored. Production untouched. Future cron verification must capture an actual new event=schedule run, attributable generated commit, and live changed value; it must not attribute backup dispatch to cron.
