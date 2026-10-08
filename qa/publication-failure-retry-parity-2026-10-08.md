# Publication failure/retry continuation — 8 October 2026

Read-only source verification at current DEV head f4bf35fe04fab182268b179f57079cfa6db48b6f: admin-review.html and backend/Code.gs each byte-identical to frozen candidate b5219c1a4c54e84b062786868c21ff43d43ea284. This establishes source parity, not a new live test or independent acceptance.

Existing actual dispatch-failure/retry evidence remains qa/direct-publisher-activation.md:
- Committed Approved state survived an unavailable dispatch ref.
- UI explicitly reported publication not queued.
- Backend configuration was restored to Version 4.
- Owner retry queued once without a second approval.
- Publisher 37330211284 and Pages 37330261375 succeeded.
- Same persisted slug recovered; this historical smoke is not re-labelled fresh frozen-candidate acceptance.

Current source preserves the distinction between queued and not-queued feedback. Its unreadable-response branch reads saved status without blindly resending the mutation.

## Concrete remaining execution

Resume through authorized Sharad admin sign-in when Google OAuth is available. Use a disposable DEV record only. Capture before native row/ID/slug and publication baseline. Force only the isolated DEV dispatch-target failure through the established controlled procedure; commit one approval and verify persisted Approved plus not-queued UI and absence of a new dispatch. Restore exact configuration before recovery. Owner retries once, without reapproval; attribute publisher, generated commit, Pages and live profile. Compare ID/slug uniqueness and unaffected native rows, then restore disposable state/configuration exactly.

Current Google sign-in blocker was 502 Connection refused. No new authentication attempt, token extraction, backend configuration change or vendor status mutation was made for this parity review. QA-02/03 remain partial. Developer full coverage remains 49/64; formal PASS and signatures unchanged. Native cron QA-04 is separate.
