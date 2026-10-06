# Actual DEV scheduler observed — 6 October 2026

Read-only GitHub Actions inspection found two actual `event: schedule` runs. These were not manual dispatches.

| Run | Start (IST) | Result |
| --- | --- | --- |
| [37373609865](https://github.com/chitranshcolorlab/rajasthan-wedding-guide-dev/actions/runs/37373609865) | 6 October 2026 02:34:17 | Completed success |
| [37400693805](https://github.com/chitranshcolorlab/rajasthan-wedding-guide-dev/actions/runs/37400693805) | 6 October 2026 07:14:34 | Completed success |

Workflow source main commit: 4d348889bfc5434a717a74c12db01b6678f58f19. Both jobs checked out the isolated DEV branch at 92f946a4ac06befb84cb3d9f3cd19d97ba374092. Job IDs 111976565113 and 112066989888: tests 26, pass 26, fail 0; publisher returned six vendors, mode DEV, indexing noindex, DEV base URL. Synchronize/commit steps succeeded. No generated-output commit was produced because the six-vendor snapshot already matched.

This supersedes the previous zero-schedule-run observation. It establishes that scheduled execution can run and synchronize the existing dataset. It does not establish five-minute delivery, the historical root cause, a fresh approved change appearing through the scheduled path, or independent frozen-candidate QA-64 acceptance. AUTO-001 remains open pending formal retest/disposition; no developer closes their own defect. Production was not changed. Google OAuth remains 502 and actual concurrent approval is still blocked.
