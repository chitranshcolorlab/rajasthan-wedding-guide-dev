# DEV Email-column reorder retest — 8 October 2026

QA-48 supplemental developer live evidence. Source branch 9cabe1609a3e7749fa45ba8dc6d476324d59dc0f; frozen candidate remains b5219c1a4c54e84b062786868c21ff43d43ea284. Isolated DEV Sheet 1HLozIIcXhxepuLac1R7fD_Fvu7NyqH2hgQbn8bqJioE, Vendor Registrations sheet1667711151. Correct Sharad connector account used.

Read bounded A1:AB30 native CellData: 23 populated rowData entries. Snapshot includes userEnteredValue,effectiveValue,dataValidation,userEnteredFormat,chipRuns. Header F1=Email. Public GET baseline ok=true,16 approved items.

Native moveDimension column F to A, preserving entire column structure. Readback A1=Email; all23 rows exactly match expected column rotation including metadata. Public GET during reordered state ok=true,16 items; complete decoded public response byte-equivalent after canonical JSON comparison (dictionary equality), no lost/misowned rows.

Restore via native moveDimension A to original F. Final A1:AB30 rowData JSON exactly equals baseline including values, formats, validation and chips. No record content/status change, no cleanup pending. No unrelated sheet modified. Native visual render unavailable due browser Google sign-in502; API-native metadata validation completed without restyling.

Authenticated admin-list under reordered columns not exercised in this turn; therefore QA48 remains partial, DATA001 FIX READY pending full independent acceptance. Developer full count42/64 unchanged. Formal acceptance/signatures unchanged. Production untouched.
