# Live DEV private-admin authentication check

Observed 2026-10-06 at approximately 18:38 UTC (IST 00:08 on October 7). Developer verification against the active DEV Apps Script Version 4 endpoint; accepted executable candidate b5219c1a4c54e84b062786868c21ff43d43ea284.

Read-only POST requests used action `admin-list`. No real credentials were supplied and no vendor records or statuses were changed.

| Case | HTTP | Application ok | Private items returned | Error |
| --- | --- | --- | --- | --- |
| Missing idToken | 200 | false | No | Google ID token missing. |
| Synthetic invalid idToken | 200 | false | No | Invalid or expired Google ID token. |

Both negative authentication checks passed: the application denied access despite the Apps Script transport returning HTTP 200. This evidence covers missing-token and invalid-token rejection only. It does not establish valid Google claim handling, expired-real-token behavior, browser session behavior, independent defect closure, or completion of the 64-case acceptance suite. Formal acceptance statuses and release signoffs remain unchanged.
