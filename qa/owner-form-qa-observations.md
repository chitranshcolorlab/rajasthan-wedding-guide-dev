# Owner form QA observations — 6 October 2026

Owner Sharad Mathur agreed to perform final QA at 19:18 IST. The following explicit prompted checks received affirmative responses on the supplied DEV registration form:

| Time IST | Prompted check | Owner response |
|---|---|---|
| 19:23:13 | Form opens, all fields visible | ha |
| 19:23:53 | Empty Submit blocked with required-field message | ha |
| 19:24:27 | Didwana-Kuchaman City list shows Didwana, Kuchaman City, Ladnun, Makrana, Parbatsar, Nawa | ha |
| 19:24:55 | Select Didwana, switch district to Nagaur; previous City cleared and new list appears | ha |
| 19:25:19 | Category options include Wedding Venues, Photographers & Films, Anchors & Emcees | ha |

These are owner-reported UI observations, without screenshots or exact browser/device details. No submission success inferred. No approved individual criteria mapping or frozen candidate has yet been recorded; therefore formal per-ID statuses, independent defect closure and release signatures remain unchanged. Snapshot repository head when recording: 0e46695d4d46dae7bda9f5dd9772830818b8e92b. This is not evidence that owner's browser served that exact build.

## Desktop environment and invalid phone check

Owner specified computer Chrome at 19:25:59 IST, applying to preceding five UI checks. OS/browser version not specified.

At 19:26:51 owner reported no error after entering 12345 in Mobile and leaving field. Source review confirms there is no blur validation: phone validation occurs in backend at Submit. At 19:28:22 the initially incomplete form was blocked at Business Name by required-field validation; this was not a phone-validation failure. Owner was then instructed to fill all required fields with disposable DEV Phone QA values, Mobile 12345 and WhatsApp 9999999999, without photos. At 19:29:37 owner explicitly reported invalid phone number message after Submit. This supports owner-observed rejection of invalid Mobile. Exact error text, backend/database audit and absence of a saved row were not independently captured. No success or formal candidate PASS inferred.

## WhatsApp rejection, successful submission and pending visibility

19:30:42 IST: owner reported invalid phone message after instruction to use Mobile 9999999999 and WhatsApp 12345; exact error field wording not captured.

19:33 private screenshot was inspected: DEV registration page visibly shows Submitted for review, submission ID RWG-f9ae20c0-5c82-43b8-b46e-b2640a411992, Status Pending Approval. Screenshot displays only lower form, so submitted name/phone values cannot be inferred. User screenshot is not copied into public repository.

19:34 follow-up developer read-only live public API check returned ok true and 15 approved items; exact pending submission ID absent. This establishes live public API exclusion at observation time; authenticated pending record details, direct category and profile checks remain separate. No approval action taken in this check. Formal candidate acceptance remains unchanged.

## Owner authenticated approval

Private desktop Chrome screenshot at 19:36 shows exact pending ID RWG-f9ae20c0-5c82-43b8-b46e-b2640a411992, name DEV Owner QA 1930 — Not a real vendor, Mobile 9999999999 and expected disposable services. Owner was instructed to Approve this exact card. At 19:37 screenshot shows VERIFIED exact ID is now Approved by authorized owner and Publication requested; Pending list empty.

Developer followed publisher run 37476335973 success, generated commit 6b9b8c56e3faeeb55190d0a06bc380f54627b280 approved snapshot includes target slug dev-owner-qa-1930-not-a-real-vendor-didwana; Pages 37476468359 success. Owner category/profile navigation confirmation remains to be collected. No vendor-specific code edit. Screenshots kept private. Formal frozen-candidate acceptance unchanged.
