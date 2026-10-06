# DATA-001 live reordered-column developer retest — 6 October 2026

Environment: isolated DEV Apps Script Version 4; frontend/evidence source e258279137b48d63263463f97063030e073465f8. No production changes. Direct Sheets connector returned PERMISSION_DENIED before mutation; user explicitly authorized browser fallback. Browser was signed in as the sheet owner.

Exact target: Rajasthan Wedding Guide — Isolated DEV Vendors; spreadsheet 1HLozIIcXhxepuLac1R7fD_Fvu7NyqH2hgQbn8bqJioE; Vendor Registrations tab, gid 1667711151, 1000 rows / 28 columns. Inspected bounded A1:AB20 through native name-box selection and clipboard copy. Actual populated rectangle was A1:AB14: 28 headers and thirteen disposable vendor rows, twelve Approved and one Rejected.

Email initially occupied F; twelve of thirteen data rows had blank Email. Native column-header drag moved all of F before A. Verified saved state and screenshot: Email became A, Submission ID became B. No cell values, statuses or notes were edited.

While reordered:
- Public GET returned ok:true, count twelve; all twelve approved IDs and their distinct persisted slugs survived, including eleven rows with blank first-column Email. Rejected record remained absent from public output.
- Refreshed authenticated admin-list, then selected Approved: all twelve correct vendor IDs/owners/statuses appeared. Selecting Rejected showed the thirteenth record RWG-259a2c9d-772a-4fa7-9016-ec0085cc1597. Thus twelve blank-first-column data rows were not dropped from the private list.

Restoration: native drag moved Email back to F. Re-copied A1:AB20 and compared to the retained pre-edit TSV: exactTableRestored=true. Original 28-header sequence restored, including Submission ID A and Email F; Saved to Drive confirmed. Google-rendered screenshot at 100% showed original layout. Existing fixed column widths and wrapped tall media rows were preserved; no formatting or autofit change. Screen-reader support was enabled for inspection.

Developer live regression: PASS. This is performed by the developer, not an independent QA owner and not against a formally frozen release candidate. DATA-001 remains FIX READY/release blocker until independent candidate-specific acceptance. Existing formal tests and signatures are unchanged. No vendor status mutation or new publication dispatch was performed by this retest.
