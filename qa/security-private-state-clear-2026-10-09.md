# DEV security privacy review — 2026-10-09

Reviewed backend token verification, private reads, status writes and admin privacy cleanup at f019d5f6d276f158cc9868a190551c058319298f.

Found and fixed cached private preview/review-note retention after sign-out. clearPrivateState now removes list and preview children, hides action and preview dialogs, clears review notes, selected IDs, cached submissions and the in-memory credential. Applied to logout, client expiry and explicit authorization rejection paths.

Validation: node --test tests/*.test.js: 51 passed, 0 failed, 0 skipped. Two new regressions exercise the actual signOut/requireAuth implementation with populated private DOM. Existing status-response fixture updated for the new cleanup helper.

Previously recorded live evidence covers authorized admin, non-admin rejection, expired credential rejection and missing/malformed protected requests without sheet mutation. Audience/issuer/subject/verified-email permutations are controlled test coverage, not claimed as genuine live Google credential tests.

This change is DEV only. It changes the admin implementation after the earlier frozen candidate, so affected release acceptance must use the new build. No production deployment or independent formal signoff is claimed. Native schedule publication QA remains separate and unproved. Deployment verification pending.
