# Category navigation and empty-category repair — 8 October 2026

Live browser clicked Categories on vendors.html and reproduced GitHub Pages 404 at DEV/categories.html; immutable repository source confirmed the file was absent. Added a noindex/nofollow DEV category directory using the same 15 category labels as vendor-register.html, each linking to the approved listing category query. Directory commit d76d2a680d60acd3be87b4e56a3c9fd5378496e6.

The current listing populated category options only from approved rows. A query category with no approved rows was discarded by native select initialization, allowing unrelated vendors to display. Fixed by retaining the requested category as a safe text option before selection. Commit b55026610dbccfc116081dd0f7f168aa847de170. No vendor rows, approval state, catalog, sitemap or production changed.

Pages run 37766553722 deployed; live browser verified:
- Categories document loads with all 15 correctly encoded DEV listing links.
- Click Photographers & Films: selected matching category, 16 approved cards.
- Click Categories returns to directory.
- Click Caterers: selected Caterers, zero cards, explicit empty message.
- Reload Caterers deep link: Caterers remains selected, zero cards, no unrelated vendors.
- Return to directory succeeds. Home and All approved vendors links resolve within DEV.

Current-build developer verification only. Frozen candidate and independent formal statuses/signatures unchanged. New listing behavior needs independent acceptance; full developer 49/64 is not increased for these supplemental repairs.
