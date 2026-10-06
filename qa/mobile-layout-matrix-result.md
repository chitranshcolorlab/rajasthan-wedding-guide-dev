# DEV embedded mobile layout matrix — 6 October 2026

Result: PASS developer width/layout smoke, nine cases across three existing approved disposable profiles and 320/390/768px iframe widths. This is not physical Android/iOS or independent candidate acceptance.

Fixture commit 1832b83600dc84aecbf0acca2cba672a1cd467d4; Pages deployment 37440205342 succeeded. Profile/publisher source before fixture was 22aed905f2fbb1ed9c143c858e08baab1a2936e7; fixture changes only QA files and do not trigger vendor publisher. Backend remains Version 4. Production untouched.

| Profile | Iframe widths | Content widths | Gallery images | Result |
|---|---|---|---|---|
| DEV Compression Test | 320/390/768 | 305/375/753 | 2 plus logo | No horizontal overflow, all images loaded |
| DEV Ten Photo Test | 320/390/768 | 305/375/753 | 10 | No horizontal overflow, all ten images loaded |
| DEV Optional Fields | 320/390/768 | 305/375/753 | 0 | No horizontal overflow in long-field profile |

Fifteen pixels of width are reserved by the browser iframe vertical scrollbar. Document scrollWidth equals clientWidth in all cases. Exactly one H1 in every profile; device-width viewport and noindex,nofollow preserved. Call and WhatsApp links measure approximately 96x48 and 169x48 pixels in every case. No contact target was clicked or message/call initiated. Placeholder 9999999999 remains test-only.

Native profile selector changed iframe source/width. Browser inspected each live iframe DOM read-only; portfolio image clicks scroll images into view without navigation or mutation, ensuring lazy-loaded images complete with positive naturalWidth. Initial optional-320 observation returned the previous iframe during navigation and was discarded; expected optional-profile heading was awaited and correct URL/profile/width remeasured before recording final matrix. Raw final measurements: mobile-layout-matrix-results.json. Screenshot dev-mobile-layout-390-20261006.jpg.

Physical Android/iOS, actual touchscreen, portrait/landscape device orientation, mobile browser navigation and real authorized test-contact behavior remain pending. No QA-58–63 PASS, defect closure, candidate freeze or signature inferred. User offered future final approval; no final approval recorded. See mobile-physical-checklist.md.
