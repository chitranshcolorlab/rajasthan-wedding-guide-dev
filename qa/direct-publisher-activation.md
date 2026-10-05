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

This verifies DEV approval, Edit Required removal, reapproval and Reject removal. Live unavailable-branch dispatch failure and owner retry recovery have now been verified; expired/revoked credential rotation itself was not exercised. Scheduled cron root cause remains unresolved; this direct dispatch path avoids waiting for cron. AUTO-001 and full QA-64 acceptance are not independently closed by this smoke test. Production readiness/signoff is not claimed.

## Edit Required and Reject live acceptance (2026-10-05)

The same disposable submission RWG-12eb3b05-9f7f-4005-88fc-96450e2fb3f0 was used throughout. Authenticated admin status changes requested publication without manual workflow dispatch.

- Approved → Edit Required: publisher 37327464173 and Pages 37327514317 succeeded. Public snapshot excluded the submission. Live old profile URL returned GitHub Pages 404.
- Edit Required → Approved: publisher 37327731425 and Pages 37327782271 succeeded. Browser verified the profile was live again at the same persisted slug, dev-approval-publish-test-not-a-real-vendor-didwana.
- Approved → Rejected: publisher 37328012956 and Pages 37328064662 succeeded. Public snapshot excluded the submission. Live profile URL returned 404 and the rendered Didwana photographers category listing contained the other five approved test vendors, with this rejected vendor absent.
- Private Admin Rejected list retained the submission; no row deletion occurred. Final status is Rejected. Review notes identify it as a disposable test and prohibit contacting placeholder numbers.

This is DEV smoke acceptance, not independent full release acceptance. Production was not modified.

## Controlled dispatch failure and recovery (2026-10-05)

- A temporary isolated DEV Version 5 changed only the workflow dispatch ref to rwg-dev-deliberate-missing-branch-20261005. Endpoint, repository, environment/project guards and credential scope stayed fixed. No credential value was inspected or changed.
- The authenticated admin approved disposable submission RWG-12eb3b05-9f7f-4005-88fc-96450e2fb3f0. Backend committed Approved and UI correctly reported Publication request is not queued; approval remained in the private Approved list. No new workflow dispatch run was created by the failed request. The HTTP status was not captured, so no specific code is claimed.
- Editor source was restored and exact clipboard readback matched the tested 15,428-character source. Existing live deployment was restored to verified Version 4 before recovery. Temporary failure configuration is no longer active; Version 5 is historical test evidence only.
- Owner ran retryDevPublication once after restoring the main ref. Execution log returned queued. No second approval was required.
- Retry workflow_dispatch run 37330211284 succeeded. Pages run 37330261375 succeeded. Generated profile commit 6e17020b9296398212a91641e1aec29cfbce37d7.
- Live browser verified the recovered profile at the same slug dev-approval-publish-test-not-a-real-vendor-didwana, with heading, location, About and Services. Final disposable test status is Approved.

This tests actual unavailable dispatch target failure and manual owner retry, not expired/revoked token rotation, failure within a started publisher job, or automatic retry. Independent QA-64 signoff and scheduled cron investigation remain outstanding. Production was untouched.
