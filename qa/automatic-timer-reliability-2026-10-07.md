# Automatic timer reliability follow-up — 7 October 2026

User explicitly requires automatic publishing. Existing DEV-only Apps Script five-minute timer remains operational; no source/configuration changes were necessary or made.

Read-only GitHub evidence: twelve successive workflow_dispatch runs from 11:25:58Z to 12:20:56Z (16:55:58–17:50:56 IST) all completed successfully. Interval range 295–305 seconds, consistent with five-minute observed polling. This is observed reliability, not a delivery SLA or proof of every Apps Script execution.

Latest run 37620346215, publish job 112788730487: 47 tests passing, zero failures, successful public DEV API read and synchronization of 16 approved vendors. Main workflow explicitly checks out dev/automatic-vendor-system; restricted DEV repository and API/base guards remain. Timer dispatches main workflow, which operates on DEV branch. Unchanged approved data produces no content commit. Approval direct dispatch and five-minute automatic retry coexist; no manual dispatch was issued for this observation.

Prior controlled fresh source→timer→generated commit→Pages→live and exact source restoration are documented in qa/backup-fresh-change-2026-10-07.md. Native GitHub event=schedule cadence remains separately unresolved; QA-45/native-cron acceptance is not closed or relabeled. Existing three-attempt GET retry handles transient transport, 408/429/5xx and unreadable JSON; permanent 404 safely fails and a later timer tick retries afresh.

Production untouched. No credential inspection or access expansion. Token renewal remains required at its existing expiry. Developer count stays 33/64; formal statuses/signoffs unchanged.
