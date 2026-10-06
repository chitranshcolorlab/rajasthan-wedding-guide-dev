# Apps Script timer backup — 6 October 2026

Isolated DEV only. GitHub workflow was active and its default branch main contained cron `2-57/5 * * * *`; repository neither archived nor disabled. No post-baseline cron run existed before timer installation. GitHub documents that scheduled events can be delayed or dropped; this is a possible mechanism, not a confirmed root cause here.

Installed one owner-created time-driven trigger through native Apps Script UI in project 1ET6cuL8kKoH4z-z1nGEg1_DzvCw6KKJsS_4f2Pw0JtAYp9H1CKcV7BBo: retryDevPublication / Head / Minutes timer / Every 5 minutes. Existing daily failure notification default retained. Zero triggers before, one after; reopened saved trigger verified settings. No backend source, web-app deployment, credential or permissions change for timer installation. Existing DEV-only dispatch guards and stored token reused without inspecting any credential. Screenshot dev-backup-timer-20261006.jpg records saved edit settings.

First execution showed Head / retryDevPublication / Time-driven / Completed, duration 2.697 seconds. Browser UI displayed 5 Oct 2026, 22:36:21 in its timezone; corresponding GitHub dispatch created at 2026-10-06T05:36:23Z. Expanded safe log: DEV publisher request: queued. Publisher 37419369915 passed 31 tests, zero failed, synchronized fourteen vendors, generated 1be4876ff8dca607fb1ffb073981a959a1fc2bff. Pages 37419395416 succeeded. Refreshed live profile visibly contained DEV-SCHEDULE-PROBE-20261006-01 in Services and fallback About. No manual publisher dispatch or status mutation was used.

Then restored Vendor Registrations!O16 to original Services `Disposable controlled unreadable-acknowledgement test. Do not contact.`. Current row ID/Approved status/slug grounded first; after edit all twenty-eight A16:AB16 cells exactly matched pre-edit row with only this Services change. Saved to Drive confirmed; formatting preserved. Screenshot dev-timer-probe-cleanup-20261006.jpg. Next timer publisher 37419782520 (05:41:24Z) succeeded, generated 7c6fcffb086d2c34dd87242e3d1584fac4b9264b (05:41:41Z), Pages 37419809362 succeeded. Public snapshot and live profile later both retained original text and contained no marker.

Subsequent dispatch observations included successful runs at 08:26:23, 08:31:23, 08:36:23, 08:41:23 and 08:46:23Z. A failed run 37435553117 at 08:21:23Z passed its test step but public-feed parse logged Unexpected token '<', "<!DOCTYPE "... is not valid JSON. No output commit was made. Upstream HTML response cause unconfirmed; later timer executions recovered. The cadence observed is five minutes for these samples, not a guaranteed delivery SLA.

Publisher now retries GET transport failures, HTTP 408/429/5xx and unreadable JSON at most three times with 1s/2s waits and 30s request timeouts. Permanent HTTP 4xx fail immediately. Valid JSON remains subject to existing health/environment/shape/vendor validation before generated output can be replaced. Exhaustion throws a safe error without response body. Six deterministic tests passed for HTML recovery, transport/transient HTTP, permanent HTTP rejection, bounded parse/transport/HTTP exhaustion, and preservation of valid JSON rejection. Full DEV CI verification follows code push.

GitHub workflow event remains workflow_dispatch, initiated automatically by Apps Script timer; do not relabel it event:schedule. New GitHub cron run 37434340529 at 08:10:22Z succeeded after cleanup, but it is not proof of original marker propagation. Original cron probe is superseded / NOT OBSERVED. AUTO-001 and QA-64 remain open for independent candidate acceptance and cron-specific requirement. Timer is mitigation; real authenticated approval-to-timer propagation, timer removal/expiry behavior and exhaustive cadence acceptance are separate.

Every tick requests publication; unchanged publisher output makes no commit. Approval direct dispatch remains. Token expiry still requires existing planned renewal. Production untouched.

Sources:
- https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows
- https://developers.google.com/apps-script/guides/triggers/installable

## Retry deployment verification

Commit 7ec04f9b4914e17f36b011f09c0f449290a471cc triggered push publisher 37439175688: SUCCESS; job 112188373968 passed all 37 tests, zero failures, fetched and validated fourteen approved DEV vendors and completed publisher without a generated content change. No real transient HTML was forced on the live service; deterministic six-case tests establish retry behavior, live run establishes integration. Browser reopened cleanup profile after resume and observed original About/Services text without marker. Pages documentation rebuild 37439174548 was queued at last check; publisher implementation is executed directly from checked-out repository and its successful run is already verified. Independent QA release gate remains blocked.
