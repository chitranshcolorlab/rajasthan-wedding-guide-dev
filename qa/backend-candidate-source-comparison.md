# DEV backend source comparison — 6 October 2026

Read-only Apps Script Project history comparison inspected active deployed Version 4 and Current version (Head). Full Code.gs copied separately from both source panes using the editor platform shortcut, without reading script-property secrets or executing functions.

- Version 4 and Head source strings are identical: 15,430 UTF-8 bytes, 69 lines.
- Both raw Git blob SHA-1 hashes: b8072a324381f083e967833c3185d30cc7150fde.
- Removing one final newline produces 15,429 bytes and Git blob 76a2ba1866732128976191d5dc478ae597fdb451, exactly the backend/Code.gs blob in proposed candidate b5219c1a4c54e84b062786868c21ff43d43ea284. Difference is one extra trailing blank line, not executable code.
- Active deployment ID matches the configured DEV API; Manage deployments showed Version 4. Installed time-based retryDevPublication trigger executes Head.
- getSpreadsheet_ reads DEV_SPREADSHEET_ID and requires RWG_ENV=dev; the SPREADSHEET_ID constant is a production deny-list value. requestDevPublication_ validates DEV environment and exact project, and dispatches only rajasthan-wedding-guide-dev. retryDevPublication has no spreadsheet-write call.

## Correction during verification

The production deny-list constant was initially misinterpreted as an active sheet target. Its first line was briefly changed to the DEV ID and saved; after reading the guard, the exact original production deny-list line was restored and Saved to Drive verified. No function was manually executed, no deployment changed, and no production sheet write was performed by the agent. Since Head is mutable and a timer remains installed, this record does not infer that no automatic execution occurred during that interval. Final full source comparison above confirms restoration to Version 4 source.

Candidate remains proposed. Source comparison does not approve QA criteria, establish data immutability, close defects or supply role signatures. Formal release-state.json unchanged. Production repository unchanged.
