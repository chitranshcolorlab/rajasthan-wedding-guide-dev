# JSON-LD escaping supplement — 7 October 2026

PASS — three local render cases on publisher source fetched from DEV head 4dd4e9204da75cd528fefe17749f85d040a747f8. Supplemental developer evidence only; QA-40 remains partial until live hostile-name permutations are exercised.

Names/address/services included quotes and ampersand, a closing-script plus injected-script string, and Hindi/backslash/newline/Unicode line separator. Each rendered HTML contained exactly one JSON-LD script; JSON.parse succeeded; name and address round-tripped exactly; phone, locality and URL matched expected source; JSON body contained no raw less-than sign; no additional script element was created.

No code fix needed. No live record created, no browser script payload executed, no production or source vendor changes. Prior live sixteen-profile source-to-schema checks remain in qa/catalog-schema-sitemap-2026-10-07.md. Current developer full count remains 33/64; formal statuses/signoffs unchanged. Pending large-original fixture cleanup remains open due Google sign-in 502.
