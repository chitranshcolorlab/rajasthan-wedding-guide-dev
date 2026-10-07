# Live candidate-compatible approval lifecycle — 7 October 2026

Owner authorized the explicit Approve → Edit Required → reapprove test. Disposable vendor RWG-e6e1b53a-f3b1-4516-995d-154fc2cda380, DEV Validation QA 20261007 — Not a real vendor, placeholder contact 9999999999 (no contact initiated). Active DEV backend Version 4. Source before action: 8d8d020d0d7ca3370eb120dcb274fa921189693f; backend/Code.gs, admin-review.html, vendor-catalog.json and every scripts/* blob exactly match accepted b5219c1a4c54e84b062786868c21ff43d43ea284. Generated data may change under the accepted timer-active policy.

| Phase | Publisher | Generated commit | Pages | Live verification |
| --- | --- | --- | --- | --- |
| Approve | 37571617008 success | 4d47bb2d9ef2a66f6657b610da66ee1a108e6e14 | 37571656599 success | 16 approved profiles; exact category card; click opens correct profile and reload retains it |
| Edit Required | 37571827062 success | 36de62e4b89c9301f3e1fa11a2511b459a52d0c4 | 37571883837 success | Profile visibly 404 after deployment; target category cards 0, other cards 15; target absent from sitemap |
| Reapprove | 37572007694 success | 4325df777b504257abf99f5db1741049f5870983 | 37572042608 all build/report/deploy jobs success | Target cards exactly 1, total 16; click and refresh show restored profile at identical URL; live sitemap contains URL exactly once |

First publisher job 112631309944 log attributes generated 4d47bb2 directly to run 37571617008, output count 16. Unpublish job 112631946783 attributes generated 36de62e to run 37571827062, output count 15. Restoration's generated commit/Page linkage observed; publisher conclusion subsequently verified success. All are workflow_dispatch events; GitHub cron-specific fresh propagation is not established.

Profile URL throughout: https://chitranshcolorlab.github.io/rajasthan-wedding-guide-dev/vendors/dev-validation-qa-20261007-not-a-real-vendor-didwana/ . Business name, services, category, district/city, tel/WhatsApp recipient hrefs match approved source. Expected normalized persisted slug retained after Edit Required/reapproval. DEV category backlink and breadcrumb routes inspected; no contact click/send/call. A browser reload during the successful first publication retained profile. Full developer evidence: QA-01/07/14/21/23/24/25/26/29/31/44. Partial only for rejection/nonexistent route, rename, retry, legacy media and golden-vendor QA-64 compound steps.

Both observed generated addition commits change only approved-vendors.json, sitemap-vendors.xml and the target profile. No vendor-specific executable edit. An early unpublish HTTP read still returned profile 200 while sitemap had updated; that was before completion and is not the final result. After Pages success, browser refresh showed explicit GitHub Pages 404 and category removal was verified. No POST was resent following UI timeout: reapproval confirmation dialog was inspected and accepted once.

An ambiguous Edit Required `.first()` filter action was rejected by automatic review before execution; no unsafe fallback occurred. DOM inspection identified the dedicated button.filter[data-filter="Edit Required"] list filter, which was used for read-only navigation. Vendor mutations stayed scoped to the exact submission ID.

Final state: test record Approved, 16 generated DEV profiles. Intentionally retained for remaining acceptance; production exclusion/cleanup required. Screenshot of restored profile saved privately. Formal independent PASS, defect closures and signatures unchanged. AUTO-001 stays open; no production mutation.
