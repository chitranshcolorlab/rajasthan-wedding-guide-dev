# Live candidate metadata regression — 7 October 2026

Read-only HTTP checks of all 15 generated DEV profiles. Current approved-vendors.json is an exact parsed match to the prior accepted candidate catalog. All 15 return HTTP 200 and pass every assertion below:

- Exact business-specific title and description against source fields.
- Exact og:title, og:description, og:url and website og:type.
- DEV noindex,nofollow.
- DEV relative category backlink present.
- Logo URL is used for og:image when present; no-image profiles omit it safely.

47-test candidate suite separately includes markup/attribute/script injection and safe JSON rendering defenses. Together these provide full developer procedure evidence for QA-34/36/37. QA-31/38/39 remain partial: this batch does not click every navigation control, fetch image bytes or exercise a social crawler. Formal independent PASS and release signoffs remain unchanged.

No live row/status/source changes. Catalog count 15; failures 0. Reproducible script uses Python HTMLParser and urllib with parallel profile reads; it compares parsed metadata strings, not raw HTML substrings.
