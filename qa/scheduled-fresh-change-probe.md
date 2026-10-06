# Fresh-change scheduled synchronization probe — 6 October 2026

State: PENDING; not PASS. Isolated DEV only. Existing approved disposable vendor RWG-6dfbc3dc-c041-45d9-8ef4-503a90df44aa; persisted slug dev-response-recovery-20261006-not-a-real-vendor-didwana.

Native owner browser edited Vendor Registrations!O16 (Services) to append marker DEV-SCHEDULE-PROBE-20261006-01. Initial edit started 2026-10-06T05:13:43.570Z. Spreadsheet editor focus briefly caused an unintended A16 ID edit; restored immediately before the final baseline. Re-copied all twenty-eight cells A16:AB16 and verified only column fifteen Services differed. Original ID, Approved status, review note and slug matched. Saved to Drive confirmed; original layout/formatting preserved. This is a content-change synchronization fixture, not an authenticated approval event.

At 2026-10-06T05:15:02.666004Z, public API contained marker, fourteen Approved vendors, original ID/status/slug. Deployed approved-vendors.json retained the original Services without marker. Thus the source change is not yet published and a future successful synchronization can demonstrate actual changed output.

No status API mutation, manual publisher dispatch, publisher-code change or workflow toggle was performed for this probe. Default-branch cron remains 2-57/5 * * * *; last observed actual schedule-event runs remain 37373609865 and 37400693805. Feature push paths exclude qa/**; this documentation-only push cannot trigger vendor-publisher. Pages may rebuild documentation but the generated vendor data remains old until publisher runs.

Completion needs a post-baseline event:schedule run, its checked-out source/tests/publisher log, a generated commit containing marker, successful Pages deployment and live profile marker. Do not claim a five-minute delivery guarantee or substitute workflow_dispatch/push for event:schedule. Original approval-to-scheduled requirement and independent frozen-candidate QA remain separate; this probe alone will not close AUTO-001 or QA-64.

Leave the disposable marker until the scheduled synchronization is observed. Then restore Services to Disposable controlled unreadable-acknowledgement test. Do not contact placeholder numbers. Production untouched.

## Outcome and alternate timer mitigation

GitHub cron-specific marker propagation was NOT OBSERVED before Apps Script five-minute backup installation. Original probe is superseded, not PASS. Automatically initiated workflow_dispatch 37419369915 published marker in generated commit 1be4876ff8dca607fb1ffb073981a959a1fc2bff, Pages 37419395416 succeeded and live marker verified. Native owner restored O16 original text, exact twenty-eight-cell row verified; next automatic timer run 37419782520 published cleanup commit 7c6fcffb086d2c34dd87242e3d1584fac4b9264b, Pages 37419809362 succeeded, public/live marker absent. See qa/apps-script-timer-backup.md. New later event:schedule 37434340529 is separate and does not establish original marker attribution. Production untouched.
