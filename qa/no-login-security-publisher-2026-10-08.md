# Independent of login — security and publisher checks, 8 October 2026

Current DEV head f408a572d46c75a83f4d0244458f50432238197b. No authenticated browser action, Sheet mutation, source marker or manual workflow dispatch.

## Live missing/invalid token retest

Four actual POST requests, one each: admin-list with missing token, admin-list with malformed token, status Approved for disposable ID RWG-daff7fe3-a050-4b62-b903-ca505caa2754 with missing token, same status request with malformed token. All returned ok:false. Missing: Google ID token missing. Malformed: Invalid or expired Google ID token. No credentials used or captured. Native CellData A1:AB35 after requests: all24 populated rows exactly equal pre-test snapshot including values, format and validation. Disposable record stays Pending Approval. QA-47 remains partial: genuinely valid-token negative audience/issuer/expiry/email/subject cases not executed.

## Automatic publisher observations

Timer workflow_dispatch runs at09:20:57,09:25:57,09:30:57UTC failed (37756017916,37756603794,37757182006). Inspected latest failure job113244513091: all47 repository tests passed, DEV API HTTP404 in publisher; commit step skipped. Automatic next run37757764974 at09:35:56UTC recovered with job113246435336 success,47pass0fail, vendors16. Next37758336247 and37758911822 succeeded at09:40:56 and09:45:56UTC. These are backup timer dispatches, not GitHub schedule events. No manual intervention. This extends recovery evidence; does not establish flawless reliability, native cron propagation or five-minute SLA. AUTO-001 stays open. Failed runs not declared successful.

## Live output

Fetched approved-vendors.json and sitemap-vendors.xml successfully. Catalog16, sitemap16, unique URLs16, every sitemap URL within exact DEV base. No full acceptance, frozen candidate update or defect closure inferred. Full developer procedure count remains48/64.
