# Production source-only integration review — 2026-10-09

Production repository inspected read-only: chitranshcolorlab/rajasthan-wedding-guide, main commit 75e87651d36d41ce7f53d7158e0a10e99f162eae. CNAME is rajasthanweddingguide.com. No production API requests, Sheet reads or writes, status changes, deployments or repository mutations.

Findings from pinned repository source:
- apps-script-backend.gs exposes all row columns in public list via rowObject_; no public field allowlist.
- doPost status calls updateStatus_ without Google token verification in this source. Frontend Google login does not supply backend protection by itself.
- Backend uses first-cell row filtering and positional status/note columns, predating DEV header-safe fixes.
- vendor-register.html uses no-cors and shows successful registration after fetch resolves without inspecting backend acknowledgment.
- admin-review.html uses Google frontend credentials but lacks both new private-state cleanup and delayed-read logout guards.
- Only inspected production workflow seo-production.yml generates SEO combinations/pages; it is not the new approved-vendor profile publisher pipeline.
- Current DEV publisher/workflows remain intentionally DEV-specific and cannot be copied unchanged to production.

Limits: Repository source is not proof of currently deployed Apps Script source. Actual deployment version/source identity must be inspected before claiming a live vulnerability or replacing backend. Production Sheet ID spelling in repository must be matched to the actual intended Sheet rather than inferred from earlier chat IDs.

Required reviewable integration work:
1. Verify actual production backend deployment/source and data schema read-only.
2. Port verified backend auth/private public-field boundary, header-based mapping, safe submissions/media, audit/persisted slugs into a separately reviewed production configuration.
3. Port frontend acknowledgment/error handling and both private UI cleanup protections.
4. Implement isolated production approved-vendor publisher and deployment, preserving existing legacy/SEO pages and production-only canonical/indexing rules.
5. Prepare data migration mapping and rollback baseline without copying disposable DEV data or overwriting new registrations.
6. Verify configured Google client supports the exact production origin and backend expected audience; do not create/expand credentials silently.
7. Complete current-build acceptance and obtain the actual production release decision.

Release is not blocked solely by native cron. Production integration and deployed-source verification are substantive pending work. This record corrects prior overly narrow readiness statements. Production remains unchanged.
