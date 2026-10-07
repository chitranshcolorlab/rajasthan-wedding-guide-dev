# Full immutable-candidate regression suite — 7 October 2026

All nine tests/*.test.js files and their source dependencies fetched from accepted candidate b5219c1a4c54e84b062786868c21ff43d43ea284. Command: `node --test tests/*.test.js`. Result: 47 tests, 47 pass, 0 fail, 0 skipped, exit 0. This supersedes the selected-batch total of 35; it adds 12 tests rather than 47 new independent checks.

Additional coverage: backend accepts exactly 204800 image bytes; rejects 204801 bytes before file creation; rejects unsupported GIF and eleven photos before data/file access; client compression stays within cap and fails instead of uploading original if compression cannot meet cap; dispatch is fixed to isolated DEV destination, guards wrong project/environment/missing token, preserves approval after publication failure, exposes no synthetic credential; release gate rejects untested candidate, missing signoff and self-closed blocker without independent QA evidence.

All fixtures are isolated synthetic VM/process tests. No live vendor/media/status mutation. Related QA-02/03/16/17/18 remain partial developer evidence and formal statuses are unchanged.

Read-only GitHub schedule observation: run 37525944913 created 2026-10-06T20:22:27Z (7 October 01:52:27 IST), success; run 37549346498 created 2026-10-06T23:57:12Z (7 October 05:27:12 IST), success. Actual schedule-event execution is confirmed, but several-hour intervals do not establish the configured five-minute cadence or fresh-change attribution. AUTO-001 remains open. Production unchanged.
