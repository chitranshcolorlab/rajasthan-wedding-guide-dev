# Bounded isolated cron propagation test — 7 October 2026

Owner explicitly authorized browser DEV Sheet access and temporary backup timer suspension at 10:13:53 IST after Google Drive connector returned permission denied. Production unchanged; no source code/deployment/token property changes.

DEV sheet 1HLozIIcXhxepuLac1R7fD_Fvu7NyqH2hgQbn8bqJioE, Vendor Registrations, target row 19 ID RWG-e6e1b53a-f3b1-4516-995d-154fc2cda380. Header confirms Services is column O. Original value: `Disposable server-validation QA. Do not contact.`. Test value appends ` CRON-QA-20261007-ISOLATED-A`. Browser clipboard read before/after A19:AB19 verified only column 15 changed and Approved status unchanged; Saved to Drive verified.

Original timer: retryDevPublication, Head, Time-driven, Minutes timer, Every 5 minutes, Notify me daily. Suspension preserves trigger by changing only timer mode to Specific date and time, 2026-10-08 00:00 GMT-07:00. Reopened settings verify saved mode/date and same function/deployment/notification. This future date prevents backup dispatch during the bounded test window; restore five-minute recurrence before ending the test.

Before marker write, last dispatch 37573060464 at 04:46:23 UTC completed successfully. Latest five runs all completed; no in-flight publisher observed. Last actual schedule 37549346498 at 23:57:12 UTC on October 6 remained the baseline. No manual workflow dispatch or status update will be used to publish the marker. Only an actual event=schedule run with attributable changed commit and live marker can establish cron propagation.

State: IN PROGRESS. Observe approximately ten minutes, then restore original cell, verify exact row, restore original timer, and verify final public output has no marker. Formal PASS and blocker status unchanged. The next version of this document must record actual outcome and restoration evidence.
