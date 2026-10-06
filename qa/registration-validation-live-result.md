# DEV registration validation and release checkpoint — 2026-10-06

Environment: isolated DEV Apps Script Version 4. Source before evidence update: 7c34564f02bb01ee11445720e808c9c4e28acd97. Production untouched.

## Live registration checks: 8 PASS

Six invalid submissions returned ok:false with no submission ID:
- Missing business name: Required field missing: businessName.
- Invalid mobile: Invalid phone: mobile.
- Invalid WhatsApp: Invalid phone: whatsapp.
- Unknown category: Invalid category.
- Jaipur city under Didwana-Kuchaman district: Invalid district/city.
- Unknown district: Invalid district/city.

A valid disposable submission included both status:Approved and Status:Approved in the client payload. Backend created RWG-46640310-db9c-48e1-94c4-0fd4f17a8ccd as Pending Approval. The public GET list did not contain this ID and continued to contain six approved records. Test business: DEV Server Status Test — Not a real vendor. Phone/WhatsApp 9999999999 are placeholders; do not contact. Final test status remains Pending Approval.

## Release checkpoint

Ran node scripts/check-release.js using the current remote qa/release-state.json. Exit 1, decision RELEASE BLOCKED. Missing frozen candidate, required QA-01 through QA-64 candidate PASS records, four legacy candidate records and QA/Developer/Release Owner/Approver signoffs. DATA-001 and AUTO-001 remain unresolved blockers in formal state.

Existing smoke evidence records functional DEV checks, not independent full release signoff. Do not mark all formal tests PASS by copying unrelated smoke evidence. Specific remaining work includes:
- Identify/freeze candidate and map each exact acceptance test to reproducible evidence.
- Actual concurrent same-name approvals and original DATA-001 reproduction/related regression on that candidate.
- Resolve/retest scheduled cron requirement or have the appropriate owners formally approve an updated direct-dispatch acceptance requirement; direct approval dispatch has live evidence, scheduled cron root cause does not.
- Physical iOS/Android/touch and contact-flow acceptance with controlled real contact details.
- Independent QA retest/defect closure and named required role signoffs.

No production deployment, permission expansion, real customer contact, or defect closure occurred.
