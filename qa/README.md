# DEV validation and release control

Actual live developer verification is recorded in [launch-checklist.md](launch-checklist.md), release-matrix.csv and the developerVerification fields of release-state.json. Automated tests and developer smoke evidence are distinct from independent acceptance on a frozen candidate. NOT RUN in the formal per-ID records does not mean no work has been tested: group-level completed checks and remaining acceptance are now explicit. Exact per-ID criteria are not mapped from the grouped matrix, so no individual PASS or role signature is inferred.

Direct status-triggered publishing, unpublish, republish and dispatch-failure recovery have live evidence. Concurrent first approvals, twelve optional-field checks, unsafe-link omission, live reordered-column developer regression with exact restoration, and thirteen-profile sitemap/category/metadata checks are now recorded. Actual schedule runs occurred, but fresh scheduled propagation/cadence remains unmeasured (AUTO-001). DATA-001 and UI-001 remain FIX READY pending independent acceptance; UI-001 controlled live-backend/client recovery passed with one mutation and one authenticated readback; original upstream response cause and independent frozen-candidate acceptance remain pending. Physical-device checks, individual criterion mapping, frozen-candidate legacy regression and named signoffs remain incomplete. QA-64 is not waived.

## Defect lifecycle

| Status | Entry | Exit |
|---|---|---|
| NEW | Failed QA with steps, expected/actual, build and evidence | QA Lead confirms impact |
| TRIAGED | Severity/priority agreed | Owner and fix version assigned |
| ASSIGNED | Named developer accepts ownership | Investigation starts |
| IN PROGRESS | Investigation/fix underway | Root cause, fix commit and self-test recorded |
| FIX READY | Fix deployed in DEV | QA starts on exact build |
| RETESTING | Original reproduction plus related regression | QA evidence PASS → CLOSED; failure → REOPENED |
| CLOSED | QA verifies fix, records tester/build/evidence | Same issue recurs → REOPENED |
| REOPENED | Original behavior/root cause recurs | Same ID, increment reopen count; resume investigation |
| DEFERRED | Non-blocker with approved risk and next version | Future fix returns to ASSIGNED |
| REJECTED | Evidence supports expected behavior/duplicate | QA Lead approval and reason; inability to reproduce alone is not rejection |

Defect IDs are assigned only after a failure: AUTO, SLUG, PROF, CAT, LINK, DATA, PUB, CTA, SEO, SEC, REG, UI plus next number. Blank ID means no defect reported, never PASS. Record observed/expected, reproduction, environment/build, severity, priority, blocker, reporter, QA owner, developer, release owner, approver, fix version, timestamps, root cause, changed files, commit, evidence and reopen count. Fix Ready does not mean Closed. An unrelated root cause gets a new linked ID. Second S0/S1 reopen requires root-cause review; third requires architecture review.

## Ownership and escalation

QA reports/retests; developer fixes; QA Lead confirms severity; Release Owner freezes the candidate and enforces gates; Approver accepts only non-blocking risk. Developer cannot close their own defect. Lowering severity/priority or removing a blocker requires documented QA Lead and Release Owner approval. QA-64 cannot be waived.

| Severity | Acknowledge | Start investigation | Fix target | Retest | Escalation |
|---|---|---|---|---|---|
| S0/P0 | 30 minutes | 1 hour | Same day/as soon as safely possible | 2 hours after Fix Ready | Immediate Release Owner + Approver |
| S1 blocker | 2 working hours | 4 working hours | 1 working day | 4 working hours | QA Lead + Release Owner |
| S2 | 1 working day | 1 working day | Current release or agreed patch | 1 working day | Release Owner if blocking |
| S3 | 2 working days | Planned triage | Planned version | Scheduled cycle | QA Lead if overdue |
| S4 | Next backlog triage | Planned | Backlog | Related release | No immediate escalation |

S0 clocks are elapsed during agreed incident coverage; others are working hours. Record coverage/timezone and named backups before claiming an SLA. Missed acknowledgement/start targets escalate immediately; missed blocker fix targets keep the release blocked. These are response targets, not guarantees.

## API and database acceptance

- Public GET list: only approved rows and permitted fields; pending/rejected IDs absent. Authenticated POST admin-list: valid token only; wrong audience/issuer/expiry/email/subject rejected.
- Submission: category and district/city validated, phone validated, status server-controlled, UUID unique, formula-prefixed spreadsheet text stored as text.
- Approval: serialized with ScriptLock; repeat approval preserves slug/count; simultaneous same-name approvals produce separate slugs and correct IDs. Verify this with two actual concurrent requests, not just sequential tests.
- Sheet: header-based updates survive reordered columns; slug persists after edit/unpublish/republish; no unrelated vendor rows change. Save before/after snapshots and audit entries without tokens.
- Publisher: failed API/schema validation never commits partial output. Unpublish removes static profile/sitemap on next successful synchronization; GitHub schedule is best effort and may be delayed. Acceptance must measure actual propagation; approval is not immediate publication.
- QA-64: record source commit before/after, create Shree Krishna Wedding Photography through registration, approve, wait for generated commit, open category link/profile directly and refresh, inspect metadata/sitemap. No vendor-specific code edits allowed.

## Sign-off

Run `node scripts/check-release.js qa/release-state.json`. All required QA IDs require PASS evidence on the frozen candidate, four legacy checks require PASS, and QA, Developer, Release Owner and Approver signatures must reference that candidate. S0/P0/security/data-integrity/linking/QA-64 blockers cannot be deferred. No untested code changes after sign-off. This script reports readiness only and never deploys production.


## Scheduler update — 6 October 2026

The earlier no-scheduled-run observation is superseded: actual schedule-event runs 37373609865 and 37400693805 completed successfully, checked out DEV commit 92f946a4ac06befb84cb3d9f3cd19d97ba374092, passed 26 tests, and synchronized six vendors. See [scheduler-observed-2026-10-06.md](scheduler-observed-2026-10-06.md). Both runs left generated output unchanged. Fresh approval-to-scheduled-generated-commit propagation and regular five-minute cadence are not established. AUTO-001 remains open for formal QA disposition; QA-64 and other acceptance gates remain incomplete. Statements above about no observed schedule describe the earlier evidence only.
