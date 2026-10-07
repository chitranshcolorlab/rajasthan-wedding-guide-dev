# Live DEV registration validation — 7 October 2026

DEV Version 4 endpoint, corresponding to accepted executable candidate b5219c1a4c54e84b062786868c21ff43d43ea284. Eight negative submit requests made once each. All returned HTTP 200, application ok false and the expected field error:

| Case | Error |
| --- | --- |
| Empty business name | Required field missing: businessName |
| Empty owner name | Required field missing: ownerName |
| Empty services | Required field missing: services |
| Mobile 12345 | Invalid phone: mobile |
| WhatsApp 12345 | Invalid phone: whatsapp |
| Unsupported category | Invalid category |
| Unsupported district | Invalid district/city |
| Didwana-Kuchaman district with Nagaur city | Invalid district/city |

After all eight rejections, one valid disposable registration supplied both status/Status Approved and slug/Slug forged-published-slug. Backend response ok true, ID RWG-e6e1b53a-f3b1-4516-995d-154fc2cda380, status Pending Approval. Fresh public API returned ok true, 15 approved items, and this exact pending ID absent. No POST retry occurred.

Test record: DEV Validation QA 20261007 — Not a real vendor; owner Disposable DEV QA; placeholder mobile/WhatsApp 9999999999; services Disposable server-validation QA. Do not contact. No images. Intentionally remains Pending Approval for later private-sheet/approval acceptance and cleanup; do not publish it to production. Public output count remains 15. No private sheet snapshot or audit comparison captured, so absence of unrelated private changes is not inferred.

QA-05 has full developer procedure evidence for required-field/category/location/phone rejection and server-controlled status. QA-46/49 gain partial evidence only. Formal independent PASS, defect closure and signoffs unchanged. Production untouched.
