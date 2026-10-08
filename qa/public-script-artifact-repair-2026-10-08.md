# Public browser-script artifact repair — 8 October 2026

Authorized scope: owner explicitly requested remaining DEV QA and correction of errors the agent can fix.

Fresh source audit: vendor-register.html references scripts/dev-config.js and scripts/vendor-register.js?v=20261005-kb2; generated taxonomy category pages reference scripts/category-vendors.js. The direct Pages staging whitelist contained only dev-config.js. Fresh HTTP probes: config215bytes200; registration404; category404. This is a deployment artifact defect, not a Google sign-in fault.

Fixed DEV main120e6f802ae48096a934a1fc397fe28475749c94 and featureae21d7b86d26736cee6b6f91fe02ecc3804bbbde. Explicitly stage the three public scripts only. Added HTMLParser-based validation over every staged HTML page: each relative local script src, with query/fragment removed, must resolve within site root to an existing file. Backend/publisher scripts are excluded. Build cannot silently publish a missing local browser-script dependency.

Push deployment37817234467SUCCESS, including the new all-pages dependency guard. Live dev-build sourceae21d7b86d26736cee6b6f91fe02ecc3804bbbde and catalogSHA256a5c746857c748cd5971bf639434d41a0a8f307bf817e01fe3fc9f59c0780c33f. Fresh probes: config200215bytes, registration2004801bytes, category2001304bytes.

Live browser regression: selected Photographers & Films, Didwana-Kuchaman -> Didwana dependent dropdown; submitted disposable invalid-phone form with mobile123, other required fields populated. UI first showed UPLOADING then returned Error: Invalid phone: mobile and restored submit button. No valid registration or approval was requested. Category page loaded18 approved cards. Clicking Shree Krishna View Profile opened the expected generated DEV route; direct reload retained correct title and H1. Placeholder call/WhatsApp links were not followed. Screenshotdev-category-link-restored-20261008.jpg retained.

ASSET-001 recorded FIX READY with developer evidence, not independently closed. Existing frozen candidate remains e6f922c; executable workflow changed after designation, so affected artifact/publication acceptance must be revalidated. Formal tests/signoffs unchanged and production untouched. Native cron fresh-change, real backend valid-token negative permutations and fresh backend deployment/Head preflight remain pending. Developer count56full8partial remains historical procedure coverage, not all64 final PASS.
