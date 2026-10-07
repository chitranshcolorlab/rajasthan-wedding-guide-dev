# Status lifecycle keeps persisted slug — 2026-10-07

Exact disposable DEV ID RWG-e27ed2ce-fb00-444e-a7db-15814551ac50. Original approved name DEV Parallel Approval 20261006 — Not a real vendor. Slug dev-parallel-approval-20261006-not-a-real-vendor-didwana.

Authenticated admin sequence: Approved -> Edit Required -> Rejected -> Approved. One mutation per transition, no resend. Each saved state was VERIFIED by authenticated readback. Independent Sheet A12:AB12 showed Edit Required and Rejected with same ID/slug. Final A12:AB12 equals original complete row exactly, including name/status/notes/slug. Source/API excludes target while Rejected (15 items).

Publication blocker: every status acknowledgement reported publication request not queued. Expected new backup run was not observed after last publisher 37642204343 at 15:05:57 UTC through 15:16 UTC checks. Manual GitHub workflow submit rendered Server Error/500 at /actions/manual; no new run appeared. Existing-job API rerun of job112863846646 accepted and run37642204343 attempt2 queued at final check. Root cause unconfirmed. https://www.githubstatus.com/ reported All Systems Operational and no Oct7 incident at observation; the observed browser failure does not establish global outage or token failure. Earlier successful timer evidence remains historical, not a guarantee for this interval.

Restoration: final source entire row matches baseline. Live approved-vendors.json contains16 items; target original ID/slug/name. Original profile HTTP200 and correct H1. No unpublish commit occurred during this attempt, so live removal/reappearance is not claimed. User-facing proof status-lifecycle-restored-20261007.jpg shows VERIFIED Approved and not-queued message.

QA-12's saved-status slug-retention procedure developer verified; total41/64. QA-32 and automatic-publication acceptance remain partial/open. Formal individual statuses NOT RUN and independent signatures unchanged. AUTO-001 remains NEW; new queue observation appended. Production untouched; no code/token/config changes. Test vendor restored to original state.
