# DEV approval-triggered publisher (activated and live smoke verified)

The isolated Apps Script deployment is Version 4, updated on 2026-10-05. After a verified status change commits to the isolated sheet and releases its lock, requestDevPublication_ asks the fixed DEV GitHub workflow to run. Approved, Rejected and Edit Required changes all request synchronization. HTTP/API failure never changes a committed approval into a reported approval failure. Admin feedback distinguishes queued publication from completed live publication.

The user created and saved a fine-grained credential through the secure account UI. Intended scope: only chitranshcolorlab/rajasthan-wedding-guide-dev, Actions read/write, mandatory Metadata read only, 30-day expiry. It is stored in the isolated Apps Script property DEV_PUBLISH_GITHUB_TOKEN. Its value was not read, copied, logged or included in source by the agent. A renewal reminder was created for 2026-11-01 morning Asia/Calcutta; selected expiry was 2026-11-04. Production was not modified.

## Live evidence

- Owner retryDevPublication returned queued; publisher run 37325329150 completed successfully.
- Disposable submission RWG-12eb3b05-9f7f-4005-88fc-96450e2fb3f0 started Pending Approval.
- Authenticated admin sharadmn29@gmail.com approved it. UI confirmed Approved and Publication requested.
- The approval triggered workflow_dispatch run 37326541025 at 2026-10-05T14:40:02Z; no manual workflow dispatch was performed for this approval.
- Publisher run succeeded. Its CI executed 26 tests: 26 pass, 0 fail.
- Generated snapshot and profile commit: f66ac0e8ef2062c6bdecbe680d8b1a10fe6013c3.
- Pages deployment run 37326593337 completed successfully.
- Live browser verified heading, category, location, About and Services at https://chitranshcolorlab.github.io/rajasthan-wedding-guide-dev/vendors/dev-approval-publish-test-not-a-real-vendor-didwana/ . This is a disposable test vendor with placeholder phone 9999999999; do not contact it.

Fixed endpoint: https://api.github.com/repos/chitranshcolorlab/rajasthan-wedding-guide-dev/actions/workflows/vendor-publisher.yml/dispatches, ref main (workflow checks out DEV feature branch). Authorization is a header; redirect following is disabled. Helper accepts 200 or 204. Missing configuration or wrong environment/project dispatches nothing. Owner retryDevPublication remains available.

This verifies the DEV approval path. Reject/Edit Required publication and token-failure recovery still require live acceptance. Scheduled cron root cause remains unresolved; this direct dispatch path avoids waiting for cron. AUTO-001 and full QA-64 acceptance are not independently closed by this smoke test. Production readiness/signoff is not claimed.
