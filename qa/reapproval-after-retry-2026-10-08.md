# Reapproval after publication retry — 8 October 2026

QA-13 procedure: reapprove after publication retry; no extra slug or duplicate profile. DEV only.

Same disposable RWG-12eb3b05-9f7f-4005-88fc-96450e2fb3f0 previously underwent real unavailable-ref dispatch failure on 5 October, persisted Approved, then owner retry after Version 4 restoration. Historical retry publisher 37330211284 and Pages 37330261375 succeeded, documented in qa/direct-publisher-activation.md. That failure/retry was not recreated today; QA-02/03 fresh experiment remains pending.

8 October: before native A1:AB40 snapshot showed Approved, Approved by authorized admin, slug dev-approval-publish-test-not-a-real-vendor-didwana. Exact article Preview exposed Approve. One native confirm accepted with authorized Sharad sign-in; click timeout handled by inspecting current dialog without duplicate click. UI VERIFIED exact ID Approved and publication requested. All 26 native rowData entries matched baseline after completion (userEnteredValue, effectiveValue, dataValidation, userEnteredFormat, chipRuns); no source cleanup needed, audit entry intentionally retained.

Publisher 37788197872 completed success; job 113348327241 passed 49 tests, 0 failed, generated 18 vendors. Current repository catalog matched before JSON exactly. Live approved-vendors.json HTTP 200 held 18 items and target ID exactly once with identical slug. Browser loaded same exact profile URL and correct business/location/About/services. No extra slug or duplicate profile. No content change requiring a new deployment claimed.

Developer QA-13 full procedure complete through explicitly cross-date evidence. Developer full coverage 53/64; formal NOT RUN and formal PASS 0 unchanged, candidate/signoffs/defect dispositions unchanged. Proof reapproval-after-retry-20261008.jpg saved. No PROD write or contact call/message.
