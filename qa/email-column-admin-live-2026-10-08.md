# QA-48 — authenticated Email-first column regression

Date: 2026-10-08. Environment: isolated DEV only. Served DEV frontend source head: 630a6805b2d94973c2e98301aa71919fc23886a8. Backend: existing DEV deployment Version 4. Formal candidate remains b5219c1a4c54e84b062786868c21ff43d43ea284.

## Procedure and observed results

1. Saved bounded native CellData for Vendor Registrations!A1:AB30: 23 populated rowData entries, including userEnteredValue, effectiveValue, dataValidation, userEnteredFormat and chipRuns.
2. Moved original Email column F to A using native moveDimension, preserving complete columns and metadata.
3. Public GET returned 16 approved vendors; decoded complete JSON payload exactly matched the baseline collected before column movement.
4. Signed in through Google as the authorized DEV administrator. Used the admin Refresh control to issue a fresh authenticated admin-list while Email was first. Approved: 16 article texts identical to baseline. Rejected: six article texts identical to baseline. Pending: zero. Compared complete visible article contents, including IDs, names, status, owner, contact and services.
5. Restored original order with native moveDimension (A to original F). Full 23-row bounded CellData exactly matched the original snapshot, including formats and validation.
6. Refreshed authenticated admin after restoration. All 16 approved article texts exactly matched baseline again.

No vendor values or statuses were changed. No production writes. No credentials or ID tokens captured. Current developer procedure complete; formal QA status remains NOT RUN and DATA-001 remains FIX READY awaiting independent candidate acceptance.
