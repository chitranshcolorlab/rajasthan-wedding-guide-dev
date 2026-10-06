# Valid empty approved list — developer regression, 6 October 2026

Reviewed source head: 6cdb01696321eddf695c049975cb8f170f495418. Executed actual publisher CLI in a disposable temporary directory with mocked valid DEV health and empty approved list. No live registrations, sheet rows, production files or actual legacy media were changed.

Result: PASS.
- Exit 0; exactly one health GET and one list GET.
- approved-vendors.json becomes {ok:true,items:[]}.
- Existing generated old-profile is removed; managed vendors directory is empty.
- Vendor sitemap contains no URL entries.
- All 48 sentinel files at the pinned legacy copy paths remain byte-identical, covering the four legacy HTML routes, district/category destination HTML, image/poster paths and video paths.
- No .vendors-next staging directory remains.

Command: node --test tests/publisher-preservation.test.js tests/publisher-fetch.test.js
Local result: 12 tests, 12 pass, 0 fail.

This is filesystem preservation coverage using disposable sentinel bytes at the actual copy path names, not a new live playback test of the 48 actual legacy files, physical-device acceptance or independent frozen-candidate QA. It supports proposed QA-28 and QA-57. Formal statuses, blockers, candidate and signatures are unchanged.
