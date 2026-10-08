# Directory breadcrumb live QA — 8 October 2026

Read-only browser clicked the actual directory links Rajasthan → Didwana-Kuchaman → Didwana → Photographers & Films. Every page rendered the expected heading, with no 404 or path escape.

Loaded category contained 16 View Profile links, all within /rajasthan-wedding-guide-dev/vendors/, and noindex,nofollow. All 19 same-origin links on that category (three breadcrumbs plus sixteen profiles) stayed in DEV. Profile pages themselves were not re-tested in this procedure.

Clicked reverse breadcrumbs category → Didwana city → Didwana-Kuchaman district → Rajasthan directory, verifying rendered heading after every transition. Directory branding is plain text, not an additional Home control; no nonexistent Home click is claimed.

This samples the Didwana route, not every district/city. No data/code changes required. Full developer count remains 49/64 and formal acceptance unchanged.
