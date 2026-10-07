# Large-original frontend compression — 7 October 2026

QA-16 full developer procedure verified. Formal acceptance remains NOT RUN.

A disposable deterministic noise JPEG, 2400 × 1600 pixels, quality 94 and 4,197,660 bytes, was selected through the native file chooser on the live DEV registration form. Diagnostic input only; no personal image used.

One form submission: DEV Large Original QA 20261007 — Not a real vendor, placeholder contact 9999999999 (do not contact). Browser observed COMPRESSING PHOTOS…, then UPLOADING…, then a successful acknowledgement with submission ID RWG-e749e37b-21ee-47f1-87d9-bb373f74f623, Pending Approval and “Uploaded image sizes: 171 KB.” No retry, API precompression or alternate submission bypass used. The frontend compressed the >4 MB input below the 200 KB limit and backend accepted it. Size is the UI-reported rounded KB; exact Drive file byte length was not independently inspected. Success screenshot retained.

Cleanup is OPEN: Google admin sign-in popup returned 502 Bad Gateway / Connection refused; one reload returned the same error. No credential entry or sign-in success claimed. Target remains Pending Approval, never approved/published. Public approved-vendors.json readback remained 16 items and excludes its ID. Uploaded file and source audit retained. Resume rejection of only this exact disposable ID once authorized admin sign-in is available. Production and other records unchanged.
