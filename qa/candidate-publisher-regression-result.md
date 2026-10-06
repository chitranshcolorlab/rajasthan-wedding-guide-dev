# Accepted candidate publisher regression checks

Executed against source fetched at immutable candidate b5219c1a4c54e84b062786868c21ff43d43ea284 on 2026-10-06. Isolated local disposable fixtures; no live vendor mutation or production changes.

Command: `node --test tests/publisher-fetch.test.js tests/publisher-preservation.test.js tests/vendor-system.test.js`

Result: 26 tests passed, 0 failed, 0 skipped; process exit 0.

Coverage includes bounded GET retries for unreadable JSON and transient errors; permanent errors without retries; invalid environment/list/status preserving existing generated files; empty approved list removing managed profiles while retaining all 48 legacy paths; approval-driven profile/snapshot/sitemap generation; stable distinct slugs and idempotent approval; unauthorized mutation rejection; private notes and unapproved records excluded from public output; HTML/script injection defenses; unpublish/republish lifecycle; production target and spreadsheet rejection; synthetic token claim validation; header reordering and an empty column moved first; optional details; ten public photo links.

These are developer regression results using mocked API and spreadsheet fixtures. They are not an independent QA-64 acceptance result, a live Google identity validation, an independent DATA-001/UI-001 defect closure, or proof of automatic cron propagation. Formal acceptance statuses and release signoffs remain unchanged.
