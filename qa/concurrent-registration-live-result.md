# DEV simultaneous same-name registration — 2026-10-06

Environment: isolated DEV Apps Script Version 4. Source before record: 75c8130efbca52c798b2e1cab333ae0ff0ac084c. No production changes.

Two actual submit HTTP requests used a two-thread barrier, same business name (DEV Concurrent Same Name — Not a real vendor), same district/city/category and different disposable owner labels. Start gap 0.0004639625549316406 seconds. Request intervals overlapped; both completed in about 26 seconds.

- Request 1: RWG-66ff7919-d6b6-4b0d-b0a9-9521987db9af, ok:true, Pending Approval.
- Request 2: RWG-f3e09488-b709-4f0e-a8f5-5d56c19c7eff, ok:true, Pending Approval.
- UUIDs distinct; both public GET entries absent. Public approved count remained six.
- Test contacts 9999999999 are placeholders; do not contact.

Registration concurrency smoke: PASS. This is not approval concurrency or independent inspection of both private sheet rows.

## Approval concurrency blocker

A fresh DEV admin browser session was not signed in. Google OAuth popup rendered 502 Bad Gateway / Connection refused; one reload returned the same error. No credential field was available and no authentication value was requested or inspected. No CAPTCHA/bot block is claimed from this connection error. Actual simultaneous authenticated approvals, slug collision/permanence and related independent retest remain NOT RUN.

The two disposable records are retained Pending Approval for that test after browser sign-in is available. Do not substitute sequential approval or mocked lock tests for actual concurrent approval evidence. Release remains blocked by the existing formal gate.
