# Isolated DEV backend deployment

`Code.gs` derives from RWG_Code_District_Development.gs and must be deployed as a separate Apps Script project. It refuses the existing spreadsheet ID. Before setup/deployment configure Script Properties `RWG_ENV=dev` and `DEV_SPREADSHEET_ID=<separate DEV spreadsheet ID>`. Run setupSystem only in this isolated project. Use the same verified OAuth client/authorized admin for authentication; register the actual DEV origin in the OAuth client if necessary.

Set the new Web App URL in `scripts/dev-config.js`, GitHub secret `DEV_API_URL`, and repository variable `DEV_BASE_URL` (actual DEV Pages base including repository prefix and trailing slash). Never substitute the production API. Run vendor-publisher manually first, then verify the schedule. The health API must return environment=dev and version=automatic-vendor-v1. Deployment requires access to the Apps Script project; committing this source alone does not update the running backend.

New vendor slugs persist on first approval under a script lock. Existing approved rows without Slug intentionally block the publisher; in the isolated DEV sheet, reapprove those rows through authenticated admin before enabling synchronization. Do not migrate existing premium URLs with this generic publisher. The production repository and original backend remain unchanged.

Public API provides approved data only. Admin listing uses authenticated POST. Registration waits for a readable JSON acknowledgement instead of treating opaque no-cors as success. Scheduled publishing generates a managed `vendors/` directory, approved snapshot and vendor sitemap. Links and SEO come from that same data. Publishing delay is best effort, not immediate.

## Deployed isolated DEV (5 October 2026)

Project: `1ET6cuL8kKoH4z-z1nGEg1_DzvCw6KKJsS_4f2Pw0JtAYp9H1CKcV7BBo`. Spreadsheet: `1HLozIIcXhxepuLac1R7fD_Fvu7NyqH2hgQbn8bqJioE`. Web app: https://script.google.com/macros/s/AKfycbwd2VnMXDxSHO_7dm992VZVX8wz1wUXs04lJ84ZeOMFDtYAB530DxtJN6ns6pr3B6gP6g/exec. Version 1, execute as owner, Anyone access explicitly approved. `setupDevSystem` creates the isolated sheet and configures script properties only in this exact project. Setup completed successfully. Public endpoint is configuration, not a secret. Workflow allows secret/variable overrides with isolated DEV defaults. Live endpoint testing remains pending because Cloud Browser reported ERR_BLOCKED_BY_CLIENT. Release QA remains blocked.
