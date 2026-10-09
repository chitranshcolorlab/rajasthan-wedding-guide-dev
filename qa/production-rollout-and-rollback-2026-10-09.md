# Production rollout and rollback preparation — 2026-10-09

Status: preparation only, no production changes or release approval.
Reviewed DEV source: 0ded024c9c455d77a8132260b034d1fa5c6b8fe1; latest admin executable fix 0ded024c9c455d77a8132260b034d1fa5c6b8fe1.
55 automated tests passed and both publisher/deployment succeeded for that executable fix.

## Important scope correction

Production is not ready merely because native cron QA eventually passes. Existing scripts/dev-config.js points only to isolated DEV. The publisher explicitly rejects rajasthanweddingguide.com, emits DEV mode, and generates noindex,nofollow. Pages workflow permits only the DEV repository, checks out dev/automatic-vendor-system, and emits dev-build.json. These controls must stay in DEV. Production requires a separately reviewed integration/configuration change; do not copy the DEV workflow/configuration unchanged or remove the DEV guard as a shortcut.

## Before a production implementation

1. Confirm intended production hosting/domain, repository branch, production Sheet/project/deployment and authorized administrator configuration by read-only inspection. Do not assume DEV identifiers are production identifiers.
2. Capture production code commit, deployment version, publication configuration and approved vendor data baseline. Retain rollback artifacts before mutation. Never copy disposable DEV vendor rows or test media.
3. Create a reviewable production integration change with explicit environment isolation, production API/base URL, production-only workflow guards, correct canonical/sitemap origin and approved indexing policy. Keep private admin claims verified on the backend; do not expose private Sheet columns.
4. Include both recent admin privacy fixes and public-script staging dependency guard. Run meaningful production-configuration tests and affected end-to-end checks in a non-production preview.
5. Reconcile current candidate acceptance and the existing release gate. Native fresh-change schedule evidence remains open. Genuine special token-claim live coverage and required formal evidence/signoffs remain incomplete.
6. Present concrete production diff, deployment destination and rollback plan for the release decision. This file is not that approval and contains no production mutation commands.

## Deployment order after approval

1. Validate production backend configuration and restricted administrator verification against the intended production Sheet.
2. Deploy reviewed backend version, verify public/protected API boundaries, then deploy frontend with the exact production endpoint.
3. Publish only approved production vendors. Verify generated count, unique IDs/slugs, canonical URLs, sitemap and absence of private fields/test fixtures.
4. Verify one real authorized registration-to-approval publication, rejection/unpublish behavior and mobile/contact UI without sending messages or calls.
5. Observe scheduled/backup publication using correctly attributed events and monitor failures. Do not count workflow_dispatch as native schedule.

## Rollback

- Stop further production publication before restoring output if a privacy, data-integrity, routing or authentication regression appears.
- Restore the previously captured frontend artifact/source and backend deployment version; preserve vendor registrations/audit history.
- Restore prior publisher configuration only after ensuring it cannot immediately overwrite the restored artifact.
- Do not restore a complete Sheet snapshot over legitimate submissions made after the snapshot. Reconcile only affected cells/records with audit evidence.
- Verify restored canonical routes, private API rejection and vendor count; record exact restored source/deployment identifiers.

## Open decisions requiring production inspection

Production hosting/branch, backend version and source identity, environment configuration, approved indexing policy, current rollback baseline and acceptance ownership. No production deployment or migration is claimed.
