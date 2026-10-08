# Isolated owner-account retry recovery — 2026-10-08

## Result

QA-03 full developer procedure completed on the repaired DEV Pages pipeline. Developer count is now 56/64 full procedures and 8 partial. Formal acceptance remains NOT RUN, independent signoffs are unchanged, and this live procedure is outside frozen candidate b5219c1a4c54e84b062786868c21ff43d43ea284.

## Controlled failure and isolation

The first attempt's failed dispatch was recovered by backup publisher 37803433476 and automatic Pages run 37803640506. It is supporting backup evidence, not the qualifying isolated retry.

For the qualifying procedure, the one existing owner-owned Apps Script timer was temporarily changed from retryDevPublication to read-only doGet. Deployment Head, Minutes timer, Every 5 minutes and Notify me daily remained unchanged. No credentials or access scope changed.

Baseline cleanup publisher 37804144033 and Pages run 37804216249 succeeded. Native Sheet matched the 26-row baseline. The disposable formula fixture was Pending Approval with blank review note and slug; its live profile was HTTP 404. Branch head was afb9d91d0cae35e5b21a700dd461714b41d06bef.

Existing DEV Web App deployment was temporarily switched to historical controlled-failure Version 5. A real authenticated Approve action on RWG-daff7fe3-a050-4b62-b903-ca505caa2754 completed as Approved with UI explicitly reporting publication request not queued. Native changes were exactly Z24, AA24 and AB24. No new publisher run or branch commit appeared; head remained afb9d91. The underlying HTTP failure code was not captured.

The same exact DEV deployment was restored to Version 4, with original endpoint, execution identity and access setting. No new version was created.

## Qualifying retry and source-to-live evidence

Agent ran existing retryDevPublication through the signed-in authorized owner account, as delegated by the user; this was not a physical owner click. Execution log reported queued at 15:54:54 UTC.

- Publisher 37804626736 succeeded, 49 tests passed and 0 failed.
- It generated the first profile commit 358b54905b3de28c75a63ee77374aa4ff4bfaf6c, pushed at 15:55:24 UTC.
- Automatic Pages workflow_run 37804708488 succeeded. Build log showed checkout of exactly 358b549.
- No backup publication, native schedule event or documentation push intervened in the qualifying recovery.
- Native approved snapshot was byte-for-byte identical at the CellData JSON level after retry; the submission ID appeared exactly once and the same assigned slug was retained.
- Generated and live catalogs contained 19 profiles with the fixture exactly once.
- Live dev-build.json returned sourceCommit 358b549, deploymentRun 37804708488 and catalog hash ab26fbdb12e654ed2b4adb1403d326b7d74d3524d1371ba7e41e24569c8be712.
- Direct profile changed from HTTP 404 to HTTP 200 and browser H1 "DEV Formula Safety 20261008 — Not a real vendor". Literal text fields =1+1, -DEV literal languages, @DEV literal speciality and +DEV literal address remained text.
- Initial postdeployment responses still showed the older baseline and 404 before the live response propagated. No instant-publication SLA is claimed.

Proof: isolated-retry-live-20261008.jpg.

## Restoration and cleanup

Original timer function retryDevPublication was restored on the same trigger, with Head / Time-driven / Minutes timer / Every 5 minutes / Notify me daily unchanged. Trigger table confirmed retryDevPublication. Normal Web App Version 4 was restored before the qualifying retry.

Z24:AB24 were restored using their exact baseline userEnteredValue only. All 26 native rows then matched the original CellData baseline, including effective values, formats, data validation and chip runs. Audit entries were retained.

Cleanup publishers 37805538516 and 37805564971 succeeded; cleanup Pages runs 37805712654 and 37805763261 succeeded. Generated cleanup commit was 39caa52276b8cb4571584030745de396255d4154.

Final live verification returned sourceCommit 39caa522, deploymentRun 37805763261, catalog count 18, fixture absent, baseline catalog hash a5c746857c748cd5971bf639434d41a0a8f307bf817e01fe3fc9f59c0780c33f, and direct fixture profile HTTP 404. No temporary backend, timer or fixture changes remain.

## Remaining developer criteria

QA-04, QA-19, QA-20, QA-47, QA-56, QA-62, QA-63 and QA-64 remain partial. Native GitHub event=schedule publication is distinct from the Apps Script backup timer's workflow_dispatch. Formal acceptance and independent defect closures are not inferred from this developer procedure.
