# Legacy profile embedded widths — 8 October 2026

Current DEV fixture build d79d1d4f945b8da00e2e14f9854eed748a62406e; Pages run 37761567045 completed build, deploy and report successfully.

Four existing profiles (Chitransh Color Lab, Fashion Flavour, Madan Mohan Resort, Harshita Shekhawat) each rendered in 320, 390 and 768px frames. All twelve expected headings were present. DOM document and body scroll widths equaled client widths (305, 375, 753px respectively; scrollbar accounts for 15px). All measured media right edges fit the client width.

Contact heights: Chitransh 49px (768px WhatsApp wraps to 70px); Fashion 47px; Resort 49px; Harshita 50.797–52.797px. These exact measurements are recorded, not a blanket 48px-target claim. No contact links were activated and no calls/messages sent. Media playback/loading was not repeated or inferred from element counts.

Results: legacy-widths-results-2026-10-08.json. Initial iframe contentDocument sampling was unavailable and discarded; measurements came from frame-scoped body evaluation after loaded headings were observed.

QA-56 remains partial: real Android/iOS portrait/landscape and touch plus independent acceptance remain pending. Full developer count remains 49/64, formal PASS count zero. Frozen candidate and defects unchanged. No vendor/source data changes; only isolated DEV QA fixture and evidence.

A screenshot was captured in the browser but its synchronized file was unavailable after the five-second check, so no downloadable image evidence is claimed.
