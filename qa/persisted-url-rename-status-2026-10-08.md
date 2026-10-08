# Persisted URL after rename/status changes — 8 October 2026

QA-32 developer procedure complete, isolated DEV only. Disposable ID RWG-12eb3b05-9f7f-4005-88fc-96450e2fb3f0 row 8. Persisted slug dev-approval-publish-test-not-a-real-vendor-didwana and original business DEV Approval Publish Test — Not a real vendor.

## Live execution

Baseline bounded Vendor Registrations A1:AB40 native snapshot contained 26 rowData entries, including userEnteredValue, effectiveValue, dataValidation, userEnteredFormat, chipRuns. Authorized Sharad admin submitted Edit Required and verified exact ID. Publisher 37789377056 and Pages 37789477004 succeeded, generated removal commit e7b3e7b3bd52090bacf307916c16dee33edba48f. Live approved catalog had 17 items, target absent; original URL HTTP/browser 404.

Precise native B8 userEnteredValue changed to DEV URL Rename QA 20261008 — Not a real vendor. Reapproval in authenticated admin verified Approved. Slug remained original. All unrelated native rows unchanged; only target B/Z/AA changed while Edit Required, then only B differed after reapproval.

Publisher 37789683364 synchronized renamed record, commit 63428a258e26c5f6e73cbd7535f49bceff29063b. Direct action publisher 37789729018 also succeeded. Pages 37789749668 failed before build steps, deploy skipped. Failed-job retry API returned 403 This workflow run cannot be retried. Documentation checkpoint commit 40dda6c628ae49a3892b010bc2fe9105434d4fc2 requested fresh Pages 37789954000, which succeeded. Browser reloaded original persisted URL and showed renamed H1, same location/About/services. Live catalog had 18 items, same target once, same slug. No extra URL/duplicate profile.

## Cleanup

Scoped B8 restored original name. Native 26 rowData entries matched baseline exactly before and after cleanup approval. Intentional audit entries retained. One idempotent authorized reapproval requested publication. Cleanup timer publisher 37790358240 synchronized original name (generated 3710fd4ff1e03a89632e5330d411c655e0f98c8a); direct publisher 37790388282 also started. Pages 37790431472 succeeded. Browser reload showed original business name at same exact URL. Repository approved catalog JSON matched pretest baseline exactly.

Proof persisted-url-rename-20261008.jpg captures renamed test phase; original name subsequently restored. Developer full coverage 54/64; formal statuses NOT RUN, formal PASS 0, frozen candidate/signoffs/defect dispositions unchanged. Pages intermittent pre-build failure recovered for this test; cause not resolved and no service guarantee inferred. No executable changes, PROD writes, or placeholder contact use.
