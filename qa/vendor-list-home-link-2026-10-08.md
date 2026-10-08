# DEV vendor-list home link repair — 8 October 2026

Live vendors.html header home link href=/ escaped the DEV project prefix to the GitHub domain root. Changed only this link to href=./, resolving to the isolated DEV homepage. Fix commit 0aa3871bf938219a031f5c1fff7614f424608d66; Pages run 37764825072 completed build/deploy/report successfully.

Browser reloaded the listing, observed the correct DEV home href, clicked it and reached https://chitranshcolorlab.github.io/rajasthan-wedding-guide-dev/ with expected DEV homepage heading. Clicked Approved vendors back to vendors.html and observed 16 approved vendors. Vendor data, filters, profile routes and production unchanged.

This is current-build navigation repair verification. Full developer count remains 49/64; independent candidate acceptance remains pending. Physical Android orientation/touch test is a user-device continuation, not inferred from this desktop check.
