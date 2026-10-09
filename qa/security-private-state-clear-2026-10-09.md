# DEV security privacy review — 2026-10-09

Reviewed backend token verification, private reads, status writes and admin privacy cleanup at f019d5f6d276f158cc9868a190551c058319298f.

Found and fixed cached private preview/review-note retention after sign-out. clearPrivateState now removes list and preview children, hides action and preview dialogs, clears review notes, selected IDs, cached submissions and the in-memory credential. Applied to logout, client expiry and explicit authorization rejection paths.

Validation: node --test tests/*.test.js: 51 passed, 0 failed, 0 skipped. Two new regressions exercise the actual signOut/requireAuth implementation with populated private DOM. Existing status-response fixture updated for the new cleanup helper.

Previously recorded live evidence covers authorized admin, non-admin rejection, expired credential rejection and missing/malformed protected requests without sheet mutation. Audience/issuer/subject/verified-email permutations are controlled test coverage, not claimed as genuine live Google credential tests.

This change is DEV only. It changes the admin implementation after the earlier frozen candidate, so affected release acceptance must use the new build. No production deployment or independent formal signoff is claimed. Native schedule publication QA remains separate and unproved. Deployment verified: fix commit 9868138364327c4568b509a7688fbd616f15b754; Pages push run 37939673088 succeeded; publisher push run 37939673174 succeeded. Served dev-build.json identified that exact source commit, deployment run 37939739202 and unchanged 18-vendor catalog SHA a5c746857c748cd5971bf639434d41a0a8f307bf817e01fe3fc9f59c0780c33f.

Live browser regression: after refresh confirmed the new cleanup implementation, genuine Sharad Google sign-in loaded the disposable pending DEV Formula Safety fixture. Opened preview, closed preview, clicked Sign out. DOM inspection: preview innerHTML length 0, textContent length 0, children length 0; private list cards 0; both dialogs hidden; review note empty; signed-out actions locked. Initial pre-refresh tab still had the old code and retained preview; this was not counted as a passing fixed-build check. No vendor status changed. Proof: dev-security-private-clear-20261009.jpg.
