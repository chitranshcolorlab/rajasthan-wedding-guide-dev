# DEV security, SEO and responsive smoke evidence

Source commit: 92f946a4ac06befb84cb3d9f3cd19d97ba374092.
Environment: isolated DEV Apps Script Version 4 and DEV GitHub Pages.
Security/browser observations: 2026-10-05; sitemap/source verification resumed 2026-10-06.
Production was not modified. Credentials were not inspected.

## Live API negative checks — 5 PASS

1. GET public list returned six Approved vendors. Owner Name, Email, Review Notes and Registration Date were absent from every public item.
2. GET list filtered to Rejected returned zero rows.
3. POST admin-list without login returned ok:false, Google ID token missing, and no private items.
4. POST status without login returned ok:false, Google ID token missing. This rejected request targeted the disposable test submission; no authorized status change was issued.
5. POST admin-list with a deliberately invalid, non-secret QA token returned ok:false, Invalid or expired Google ID token, and no private items.

These checks do not independently verify every valid-token audience/issuer/expiry/email/subject permutation or concurrent approvals. Those remain separate acceptance work.

## Rendered profile metadata and contact targets

Browser inspected the recovered DEV Approval Publish Test profile:
- One H1; business-specific title and description.
- Canonical and og:url point to the exact DEV profile URL.
- Robots: noindex,nofollow. Viewport: width=device-width,initial-scale=1.
- Open Graph title, description and website type present.
- LocalBusiness JSON-LD parsed as JSON and matched business name, URL, phone and Didwana/Rajasthan location.
- Call target tel:+919999999999 and WhatsApp target https://wa.me/919999999999 with encoded business-name enquiry. No call or message was initiated.

The no-logo test profile has no og:image by design. A separate logo/media profile in the mobile preview included og:image for its uploaded logo. Social crawler previews and Google rich-result acceptance were not tested.

## Mobile embedded layout

Existing qa/mobile-profile-preview.html embeds the DEV Compression Test profile in a 375 px frame. Its rendered content width was 360 px after scrollbar; scrollWidth was also 360 px, with no horizontal overflow.
- Call button: 96.03125 x 48 px.
- WhatsApp button: 168.796875 x 48 px.
- Logo and both portfolio images complete with nonzero natural width.
- Display widths: logo 100 px; gallery images 260 px.
- Canonical remained the DEV Compression Test profile URL; noindex,nofollow remained present.

This is an embedded browser layout check, not physical iOS/Android or touch-device acceptance.

## Published repository sitemap consistency

On 2026-10-06, sitemap-vendors.xml contained exactly six unique URLs, equal to the six approved snapshot slugs. Every URL used the DEV base. No production URL or extra unapproved vendor URL appeared. This checks the published repository artifacts, not search-engine indexing.

## Release limits

These smoke results are evidence, not full QA-01 through QA-64 signoff. Full candidate mapping, concurrent same-name approval, physical mobile tests, independent defect retest/closure and required role signoffs remain outstanding. DATA-001/AUTO-001 are not closed by this record. Scheduled cron root cause remains unresolved despite the working direct-dispatch alternative. The release gate must continue to block production until its actual requirements are met.
