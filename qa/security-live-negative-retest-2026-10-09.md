# Live security negative retest — 2026-10-09

DEV Version 4 endpoint only. Four actual POST requests: admin-list/missing token, admin-list/malformed synthetic token, status/missing token, status/malformed synthetic token. Status targets existing disposable fixture RWG-421694dc-516b-4f36-b87b-771c38b9c0f7 with Approved requested. No real credential read or stored.

All four returned ok:false and no items array. Missing token error: Google ID token missing. Malformed token error: Invalid or expired Google ID token.

Bounded native Vendor Registrations!A1:AB28 read before and after, fields userEnteredValue,dataValidation,formattedValue: exact structured response equality true. No successful status mutation observed; no production access.

QA-47 remains PARTIAL: these prove actual deployed missing/malformed rejection, not genuine wrong-audience/issuer/subject token permutations. Existing actual expiry/non-admin evidence retained. No formal status, freeze, signoff or defect closure changes.
