# Approved vendor rename preserves URL — 2026-10-07

Isolated DEV only. Target RWG-e27ed2ce-fb00-444e-a7db-15814551ac50. Exact sheet Vendor Registrations!B12: original `DEV Parallel Approval 20261006 — Not a real vendor`; temporary `DEV Renamed URL QA 20261007 — Not a real vendor`. Before edit A12:AB12 matched baseline. Changed range comparison A1:AB20 showed only B12 changed. ID, status Approved and persisted slug stayed identical. After restoration the complete bounded A1:AB20 matched baseline exactly and Sheet showed Saved to Drive.

Public API returned temporary name with unchanged ID and slug. Existing automatic Apps Script timer dispatched publisher 37639452069 at 14:45:57 UTC, generated ac11a60a52d73fdbc8d9801ea1b0e62875636088 (only catalog and existing profile modified). 47 tests pass, zero fail, 16 approved vendors. Pages 37639542106 succeeded. Browser old URL loaded new H1 and parsed JSON-LD name, canonical stayed old URL. Screenshot rename-url-qa-20261007.jpg shows temporary name before restoration. No new URL or duplicate profile generated.

Restored original source name. Manual GitHub DEV publisher dispatch 37639860528 succeeded, 47 pass/0 fail, generated 3c75728b9dc5acd328b6c30bac6de91c5405d005. Pages 37639920204 succeeded. Live original URL HTTP 200 with original name. All 16 public ID/name/slug pairs equal pre-edit baseline; sitemap contains original target URL exactly once and no rename-derived URL.

QA-11 full developer procedure verified; total 39/64. QA-32 gains rename evidence but remains partial for compound same-record status permutations. Formal NOT RUN statuses and independent signatures unchanged. This automatic timer is not GitHub native schedule evidence. No production, OAuth, token, workflow or source-code changes.
