# DEV indexing controls — 7 October 2026

Current approved catalog16 profiles, all in Photographers & Films / Didwana / Didwana-Kuchaman. All16 immutable profile HTML files at 4042bef914f41ac44deb4c81899c2c96db35ae1c contain noindex,nofollow. Prior live16-profile HTTP check confirms the same robots value (qa/catalog-schema-sitemap-2026-10-07.json). Sole current approved category live HTTP200 at 2026-10-07T05:51:43.528870+00:00 has exactly one robots tag, noindex,nofollow. This closes current profile/category procedure coverage for QA-41 as developer verification, not independent formal PASS.

This checks robots directives, not whether Google has indexed pages or actual crawler behavior. No indexing request, production/source/timer mutation performed. Harshita canonical fix remains separate affected-build QA; no independent signoff inferred.
