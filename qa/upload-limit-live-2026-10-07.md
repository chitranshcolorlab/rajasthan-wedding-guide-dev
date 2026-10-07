# Live invalid upload limits — 7 October 2026

Isolated DEV Version4 endpoint, user requested next verification. At 2026-10-07T06:12:10.735728+00:00 three invalid public submit requests returned okfalse with exact expected errors: image/gif unsupported type; image/png encoded204801 decoded bytes exceeds200KB limit; eleven photos exceeds maximum10. Requests used valid required fields and disposable9999999999 contact, no contact action. All three pass. No retry.

Browser Sheet Vendor Registrations A1:A50 copied before/after: byte-identical;19 vendor IDs, no new rows. Source submitVendor_ checks photo count and validateImage_ before getSheet_, getUploadFolder_ and saveFile_. Thus these exact throws occur before Drive/file creation by source execution ordering; no separate Drive folder listing is claimed. This inference is supported by existing candidate automated upload tests; not an inventory observation.

QA-17 full defined developer procedure verified. QA-18 eleven-photo negative edge verified; exact-ten accepted-upload coverage remains separately pending on candidate. Formal statuses/signatures and production unchanged.
