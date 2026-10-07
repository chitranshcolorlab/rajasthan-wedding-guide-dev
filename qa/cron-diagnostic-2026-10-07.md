# Cron diagnostic — 7 October 2026

DEV only. No source, timer, credential or production changes in this follow-up.

Latest schedule runs: 37549346498 (2026-10-06 23:57:12 UTC), 37525944913 (20:22:27), 37485692237 (15:13:57), 37434340529 (08:10:22), 37400693805 (01:44:34). All success, event=schedule, head_branch=main. Gaps are hours despite five-minute configuration. This confirms intermittent schedule execution and does not satisfy five-minute automatic publication acceptance.

Main contains the offset schedule `2-57/5 * * * *` and explicitly checks out dev/automatic-vendor-system. It has already been offset from busy boundaries. No speculative schedule edits made. Last actual schedule job 112560852009 passed all 47 repository tests and publisher/commit steps. Restored backup dispatch 37574231812 at 05:00:56 UTC completed success; job 112639418767 passed all 47 tests and publisher/commit steps. These successes establish the publisher can execute; backup dispatch is not native cron proof.

GitHub official documentation says scheduled events can be delayed during high load and queued jobs can be dropped: https://docs.github.com/en/actions/how-tos/troubleshoot-workflows . This is a possible explanation, not proof of this repository's exact cause. Workflow detail/list endpoints were rejected as unsupported by the connector, so enabled-state administration was not inspected or changed. Successful recent schedule runs rule out claiming it has never been configured.

Result: cron fresh-change propagation remains BLOCKED / NOT VERIFIED; AUTO-001 open and formal PASS/signoffs unchanged. Earlier isolated marker was restored and original five-minute Apps Script timer reopened/verified. Do not leave the backup paused for hours, manually run a workflow and call it cron, or claim this diagnosis closes the QA gate. A future native schedule run with an attributable changed generated commit and corresponding live value is still required.
