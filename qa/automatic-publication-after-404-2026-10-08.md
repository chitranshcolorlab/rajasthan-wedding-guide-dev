# Automatic publication after bounded Apps Script 404 retry — 2026-10-08

Developer procedure evidence only; formal acceptance remains NOT RUN. All timestamps below UTC (IST = UTC + 05:30). Only isolated DEV was changed.

## Probe and attribution

Existing Approved disposable vendor RWG-e27ed2ce-fb00-444e-a7db-15814551ac50, row 12 Services O12, received marker DEV-AUTO-AFTER404-20261008-1525 at 09:55:29.343Z. No manual workflow dispatch or code/document push occurred during the probe. The existing Apps Script timer invoked workflow_dispatch; this is not evidence of native GitHub schedule delivery.

Publisher run 37760052429 created 09:55:56Z succeeded: 49 tests passed, 0 failed, 16 vendors. Generated commit c9a60faac19e43c88ca1b811dc87fecba75fc8be at 09:56:21Z changed only approved-vendors.json and the target profile. Pages run 37760105957 created 09:56:23Z completed successfully.

Before deployment, catalog and sitemap returned HTTP 200 with Last-Modified 09:54:06Z. After deployment:
- Catalog: HTTP 200, marker present, Last-Modified 09:57:14Z; observed 09:57:28.836961Z.
- Sitemap: HTTP 200, 16 URLs, byte-identical to baseline, Last-Modified 09:57:14Z; observed 09:57:33.955202Z.
- Target profile: HTTP 200, marker present, Last-Modified 09:57:14Z; observed 09:57:38.958661Z.

Sitemap bytes correctly stayed unchanged because this Services edit did not change URL or approval status. Timestamp and Pages attribution establish the fresh deployment, not an invented sitemap content change. Prior lifecycle evidence covers approved/rejected sitemap membership and DEV-only noindex routes.

## Exact cleanup

Restored original Services at 09:58:10.784Z. Native A1:AB35 snapshot contained 24 rowData entries (header plus 23 records); all userEnteredValue, effectiveValue, dataValidation, userEnteredFormat and chipRuns exactly matched the pre-probe snapshot after restoration.

Automatic cleanup run 37760629789 created 10:00:56Z succeeded. Generated cleanup commit abe3fcf9e3bddd6b9db914fbf975c01bd470d6a4 at 10:01:28Z changed only the catalog and target profile. Pages 37760698464 created 10:01:30Z completed all build/deploy/report jobs successfully.

Live cleanup verification returned HTTP 200 for catalog, sitemap and profile, all marker-free, Last-Modified 10:02:28Z. Observed catalog at 10:02:42.438125Z, sitemap 10:02:48.665168Z and profile 10:02:55.618733Z. Catalog and sitemap were byte-identical to baseline. Browser reload showed original About/Services and no marker.

## Limits

QA-45 current-build developer synchronization coverage is complete with prior indexing evidence. QA-04 native schedule fresh-change attribution remains pending; AUTO-001 is open. This proves neither a five-minute SLA nor removal of upstream transient failures. The frozen candidate is unchanged; the newer 404 retry patch still needs independent acceptance. No defect closure or signature is inferred.
