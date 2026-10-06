# Fresh owner QA unpublication result

2026-10-06. DEV only; production unchanged.

Owner authorized unpublication of disposable `DEV Owner QA 20261006 1755 — Not a real vendor`, submission `RWG-f4f1d955-f57e-4071-b3d4-4ac053a3369f`.

Authenticated admin action changed Approved to Edit Required. UI explicitly verified this exact ID and requested publication. Reason: disposable owner-authorized unpublication test; keep unpublished.

Publisher run [37467929416](https://github.com/chitranshcolorlab/rajasthan-wedding-guide-dev/actions/runs/37467929416) succeeded. Generated commit `8d14ad96596575d2527927a3dd628802f91eaf8d` updated approved-vendors.json and sitemap-vendors.xml and removed the exact managed profile file. Pages run [37467983621](https://github.com/chitranshcolorlab/rajasthan-wedding-guide-dev/actions/runs/37467983621) succeeded.

Live verification after deployment: approved-vendors.json HTTP 200, 14 items, target absent; sitemap HTTP 200, target slug absent; category browser reload no target card; old profile URL browser File not found and independent HTTP 404. No vendor-specific code edit was necessary. Record remains recoverable in Edit Required with Approve available.

Developer verification only. No independent QA signoff, frozen candidate or formal release gate changed. Placeholder phone was not contacted.
