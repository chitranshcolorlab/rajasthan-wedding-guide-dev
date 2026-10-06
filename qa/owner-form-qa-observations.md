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

## Owner profile navigation and unpublication

19:41 private screenshot shows correct /vendors/dev-owner-qa-1930-not-a-real-vendor-didwana/ profile name/location/services. At 19:42 owner answered ha to explicit profile hard-refresh and category-backlink checks. Category-to-profile path requested previously, but screenshot alone proves final correct destination, not every click.

19:43 screenshot shows only Edit Required filter, no status mutation. At 19:46 screenshot instead verified Shree Krishna submission RWG-7569d007-b2a7-49c1-b447-8f5bad3dbecc changed to Edit Required; owner was instructed to restore it. Restoration NOT yet verified. At 19:52 screenshot showed exact DEV Owner QA 1930 still Approved; owner was directed to lower exact card. At 19:54 screenshot verifies correct target RWG-f9ae20c0-5c82-43b8-b46e-b2640a411992 now Edit Required and Publication requested.

Developer checked publisher 37478460689 success, Pages 37478514139 success, generated commit 512136dbbd0c55ef81cc93c6c5de9a95a5fb02f4 snapshot contains 14 records and excludes both target and Shree Krishna. Owner-observed category absence/old profile 404 still pending; Shree Krishna restoration remains a separate cleanup requirement. Screenshots private, no formal release gate changes.

## Owner restoration, rejection and session checks (19:56–20:15 IST)

- 19:56: owner confirmed the 1930 profile returned 404 after Edit Required.
- 19:59: private screenshot verified Shree Krishna ID RWG-7569d007-b2a7-49c1-b447-8f5bad3dbecc restored to Approved. Developer HTTP check confirmed its original profile returned 200, while 1930 remained 404. This resolves the accidental DEV cleanup item above.
- 20:02: private screenshot verified exact 1930 ID Approved again. 20:04 screenshot showed the original persisted profile URL, correct name, category/location and disposable services. Owner confirmed category card visibility at 20:04:50. Restoration Pages run 37479897488 succeeded for generated commit 236e9a1a10504e9e27156c8756ab3fce832b0286.
- 20:06: private screenshot verified exact 1930 ID Rejected, with Shree Krishna still Approved. Owner confirmed old profile 404 at 20:07:36 and category card absent after hard refresh at 20:08:03. Publisher run 37480313906 and Pages run 37480371583 succeeded; deployed generated commit a8d64fa193f09ec8d343e3e1085bfcb8ad538c1e. Test vendor intentionally remains Rejected.
- 20:09: private desktop screenshot showed Not signed in, Google sign-in button and Sign in to load private submissions; cards/action buttons absent. Owner confirmed the same after hard refresh at 20:09:35, then confirmed authorized re-login and Rejected card visible at 20:10:12.

## Owner Android observations (20:12–20:15 IST)

Owner followed Android Chrome instructions and explicitly confirmed registration form layout without horizontal scrolling at 20:12; changing Didwana-Kuchaman/Didwana to Nagaur cleared the old City and showed the new list at 20:13:07; authorized admin login and Rejected card/button layout at 20:15:11; sign-out followed by refresh hid records and required sign-in at 20:15:48. These are owner reports, without mobile screenshots, model or browser version. No mobile status mutation or placeholder-number contact was requested.

## Remaining acceptance at 20:16 IST

These observations support the owner-operated DEV lifecycle and desktop/Android session checks, but do not freeze a release candidate or approve individual QA criteria. Formal 64 case statuses, defect closure and signatures remain unchanged. iOS checks, full candidate-specific acceptance, independent DATA-001/UI-001 retests and cron-specific fresh-change/cadence acceptance remain outstanding. Read-only schedule check still lists latest actual schedule run 37434340529 at 08:10:22 UTC (13:40:22 IST); recent five-minute runs are workflow_dispatch timer events, not evidence of GitHub cron cadence. Production was not modified. Private screenshots are not copied into this public repository.
