# QA-49 live formula storage and server status

8 October 2026, isolated DEV backend Version 4. Current branch source 2f484a305df1bffc7c0e8cbd49c17097aa96536a. One actual submit request accepted UUID RWG-daff7fe3-a050-4b62-b903-ca505caa2754, business DEV Formula Safety 20261008 — Not a real vendor, placeholder 9999999999. No images. Initial local requests-module import failed before network transmission; corrected to urllib and submitted once, no POST retry.

Request included forged status/Status Approved and slug/Slug forged-formula-published. Response and native Sheet row24 show Pending Approval; Slug absent. All 23 prior populated rows in A1:AB35 exactly match pre-submit native CellData snapshot including values, validation and format. 23 data-record IDs unique after append.

Four fields show both userEnteredValue.stringValue and effectiveValue.stringValue exactly equal input, with no formulaValue:
- About Business: =1+1
- Full Address: +DEV literal address
- Languages: -DEV literal languages
- Specialities: @DEV literal speciality

Fresh public GET: approved count16; exact new Pending ID absent. Intentionally retain disposable Pending source record for future authenticated header-reordered status update; do not publish or contact it. No production changes or existing vendor edits. Native cell metadata verified directly. No new styled sheet authored.

QA-49 remains partial: header-reordered authenticated status mutation and related unrelated-row comparison remain. Existing concurrency evidence supports unique IDs, and current live storage/status evidence adds four prefixes. Formal status/signatures unchanged; full developer count stays48/64.
