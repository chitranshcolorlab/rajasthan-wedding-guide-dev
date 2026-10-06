# DEV owner review packet — 6 October 2026

Prepared for Sharad Mathur. This is a review handoff, not production approval or a frozen release candidate.

Reviewed DEV source/evidence head: `1882bce409d2db2ece12e534f80e209553bb1f4c`.
Functional publisher preservation test commit: `8ee12e3587ec5cd09da0a6a19ba4635c799a74d0`.
Backend: existing DEV web app Version 4; timer executes Head.
Production repository and production sheet have not been changed.

## Working developer-verified behavior

| Behavior | Evidence and limit |
|---|---|
| Registration, authenticated approval, generated profile/category publication | [Direct publisher](direct-publisher-activation.md); real form and approval smoke, not all formal acceptance cases |
| Image compression and ten-photo gallery | [Backend KB checks](backend-kb-live-result.md), [ten-photo test](ten-photo-live-result.md); original compressed upload limit 200 KB per file |
| Concurrent first approvals and unique persisted URLs | [Concurrent approvals](concurrent-approval-live-result.md); confirmation starts 2 ms apart, server arrival overlap not instrumented |
| Optional fields and safe rendered links | [Optional fields](optional-fields-live-result.md), [unsafe-link omission](safe-links-live-result.md) |
| Automatic five-minute Apps Script backup | [Timer evidence](apps-script-timer-backup.md); fresh content and cleanup reached the live site automatically; this is workflow_dispatch, not GitHub schedule-event proof |
| Transient API retries and preservation on failed validation | [Preservation result](publisher-preservation-result.md); CI run 37439606816 passed 42 tests; old generated files preserved in process-level failure cases |
| Responsive profile layouts | [Nine layout cases](mobile-layout-matrix-result.md); three profiles at 320/390/768 px, zero horizontal overflow, contact buttons 48 px high |
| Android gallery | [Owner observation](android-user-gallery-observation.md); owner says looks correct and screenshot shows both synthetic test images loaded; limited gallery evidence |

The grey/noise and black gallery pictures are intentional disposable compression-test assets, not actual wedding photos. Their appearance is explained in the Android observation. The screenshot remains private and is not copied into this repository.

## Remaining acceptance work

| Item | Concrete next action |
|---|---|
| Exact QA-01 through QA-64 definitions | Map approved individual criteria from the grouped matrix before assigning individual PASS. Do not infer 64 passes from group smoke evidence. |
| Frozen candidate | Release Owner names a single candidate commit and records backend version, timer Head source, and generated snapshot/build evidence. Current candidateCommit is blank. |
| DATA-001 | Independent QA repeats moved blank Email first-column reproduction on that candidate, restores the DEV sheet exactly, and records public/admin results. |
| UI-001 | Independent QA repeats controlled unreadable-acknowledgement recovery; verify one status mutation plus authenticated readback, without duplicate submission. |
| AUTO-001 / QA-64 | Independently test the approved scheduling requirement with fresh approval/content and attributed run/commit/live timestamps. Working Apps Script mitigation does not waive GitHub cron-specific acceptance. |
| Security | Finish valid-token audience/issuer/expiry/subject acceptance using authorized accounts and safe evidence, without logging credentials. |
| Physical devices | Complete [physical checklist](mobile-physical-checklist.md): orientation, refresh, touch navigation, Android/iOS details; use only an authorized real contact for contact behavior. |
| Four legacy profiles | Run independent candidate regression for Chitransh Color Lab, Fashion Flavour, Madan Mohan Resort and Harshita Shekhawat. |
| Signatures | QA, Developer, Release Owner and Approver record names/date/exact candidate only after their work is complete. |

Current formal record: 64 individual cases NOT RUN, four legacy entries NOT RUN, three unresolved blockers, no frozen candidate and four blank role signatures. NOT RUN refers to formal candidate acceptance; substantial developer verification above is complete.

The last unchanged release-gate run reported 73 missing gate entries, not 73 software bugs. Re-run `node scripts/check-release.js qa/release-state.json` after candidate acceptance records change.

## Owner review

Owner can review the DEV behavior now:
- [DEV site](https://chitranshcolorlab.github.io/rajasthan-wedding-guide-dev/)
- [Compression test profile](https://chitranshcolorlab.github.io/rajasthan-wedding-guide-dev/vendors/dev-compression-test-not-a-real-vendor-didwana/)
- [Embedded layout matrix](https://chitranshcolorlab.github.io/rajasthan-wedding-guide-dev/qa/mobile-layout-matrix.html)
- [Draft DEV pull request](https://github.com/chitranshcolorlab/rajasthan-wedding-guide-dev/pull/1)

Owner Android feedback has been recorded. The earlier promise to provide final approval is not treated as a completed sign-off. No production deployment or merge is authorized by this packet.

Repository release policy: [QA README](README.md), “Developer cannot close their own defect.” QA-64 cannot be waived. This packet does not modify those gates.

## Evening verification update — 6 October 2026

- [All-vendor WhatsApp source message](all-vendor-whatsapp-source-message.md): Hindi Rajasthan Wedding Guide attribution standardized for automatic profiles/fallback and four legacy profiles; owner confirmed it appeared.
- [Fresh registration and publication](fresh-owner-qa-publication-result.md): owner saw category card and opened exact profile.
- [Unpublication](fresh-owner-qa-unpublication-result.md): exact disposable record moved to Edit Required, category/public snapshot/sitemap removed it, old profile HTTP 404.
- [Restoration](fresh-owner-qa-restoration-result.md): reapproval recovered after unreadable response through saved-status check; same persisted slug/profile and category card restored. Publisher 37468525858 and Pages 37468581967 succeeded. Current approved count 15.
- [Empty approved list preservation](empty-approved-list-result.md): successful empty list removes managed output and preserves 48 pinned legacy paths; separate from failure preservation.
- Owner legacy media observations are in [owner-legacy-review.md](owner-legacy-review.md). Madan Mohan Resort photo/video confirmation remains outstanding; no PASS inferred from generic next responses.

Scheduler check at 18:43 IST: latest returned schedule-event run remains 37434340529, created 08:10:22 UTC (13:40:22 IST), successful publisher job 112172352202. No new schedule-event run in the returned collection since then; this does not establish five-minute cadence or fresh scheduled propagation. Dispatch/timer mitigations already have evidence. AUTO-001 remains open.

Formal candidate, individual acceptance statuses, independent defect closure and signatures remain unchanged. Recent work is DEV developer verification plus the specifically recorded owner observations, not production approval.
