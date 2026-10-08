# Direct DEV Pages deployment repair — 2026-10-08

Owner approved activation with "yes" at 21:02:32 IST. Scope is chitranshcolorlab/rajasthan-wedding-guide-dev only.

## Implemented

Installed .github/workflows/pages-deploy.yml on DEV main (7cd6fecc2f1703b5d43dc2fa46fc4613e31535f2) and DEV feature branch (485d1c1abb9bba178b5ef29c97d9cd4a1de19f72). DEV Pages source was changed from branch-based publishing to GitHub Actions through the existing signed-in owner session.

Successful vendor-publisher completion triggers workflow_run deployment, including when the publisher commits with GITHUB_TOKEN. DEV branch pushes and explicit dispatch are also supported. The build checks out the latest DEV feature branch, stages public website assets, and emits dev-build.json containing the actual source commit and catalog digest. Deployments are serialized. Backend, QA, scripts, tests and .github are not included in the site artifact.

Only the deploy job has pages: write and id-token: write, targeting the existing github-pages environment. The build has contents: read and checkout credentials are not persisted. No PAT or Google credential change; no PROD write.

## Fresh verification

- Initial push deployment 37801708359: build and deploy successful.
- Changed only B8 of approved disposable fixture RWG-12eb3b05-9f7f-4005-88fc-96450e2fb3f0 to "DEV Automatic Pages QA 20261008 — Not a real vendor". Full native before/after comparison found exactly B8 changed.
- Owner-authorized Apps Script retryDevPublication run queued the publisher at 15:35:21 UTC.
- Publisher 37802000855 succeeded: 49 tests passed, 0 failed; generated commit 7b8181dd9a014dd3e923bb996c205d20180a9510.
- Deployment 37802085633 was triggered automatically by workflow_run and succeeded without a documentation push or manual Pages build. Backup publisher 37802079564 subsequently completed, triggering successful deployment 37802172001.
- Live dev-build.json returned source commit 7b8181d, deployment run 37802085633 and catalog digest 0532ede906f5a08bffb01f11a58bd7f161a7ad5acd92585f5d8cce45f3cb7e49. The live catalog had 18 records and the temporary name exactly once, with original slug preserved.
- The direct profile route still returned its original name during the temporary-name observation. Later responses also returned an older build marker. Cache headers included max-age=600. The precise cause of mixed live responses is not established; do not claim the temporary profile heading propagated successfully.

## Cleanup completed

Restored B8 from its exact native baseline userEnteredValue. All 26 rows matched the pretest native baseline, including formats, validation, effective values and chip runs.

Cleanup publisher 37802592885 succeeded, generating c5e91e5a0505e08bdd94f989cb5cda7e6bbf5a33. Automatic cleanup deployment 37802682342 succeeded. Subsequent live checks returned:
- dev-build.json sourceCommit c5e91e5a0505e08bdd94f989cb5cda7e6bbf5a33 and deploymentRun 37802682342;
- catalog count 18 with original fixture name and hash a5c746857c748cd5971bf639434d41a0a8f307bf817e01fe3fc9f59c0780c33f;
- profile HTTP 200 and original H1.

## QA limits

55/64 full developer procedures and 9 partial are unchanged. QA-03 needs a fresh clean failure-to-retry-to-profile procedure under this repaired pipeline; QA-04 still needs actual event=schedule source-to-live attribution. The backup Apps Script timer emits workflow_dispatch, which is not native GitHub cron evidence. Latest native schedule observed was run 37759426685 at 09:50:27 UTC.

The new pipeline resolves the documented GITHUB_TOKEN branch-publishing limitation and has successful automatic runtime evidence. It cannot guarantee hosted-runner availability or immediate cache propagation. Frozen candidate, formal NOT RUN statuses and independent defect signoffs remain unchanged. This repair is outside the frozen candidate.

Prior diagnosis and inactive draft in qa/pages-deployment-diagnosis-2026-10-08.md and qa/proposed-pages-deploy.yml are historical preactivation review records.

Proof screenshot: dev-pages-automatic-success-20261008.jpg, showing successful workflow_run build and deploy.
