# DEV Pages deployment diagnosis and proposed repair — 2026-10-08

## Observed evidence

- Failed Pages run 37798669238 for generated commit 9bf8a8ed08ab7797e8c7266a721641ba40b89c80 never executed build steps. Its job page explicitly showed waiting for a hosted runner; API reported build queued, report-build-status successful, deploy skipped.
- Failed cleanup Pages run 37799371598 likewise did not supply a build-step failure in earlier inspection.
- Documentation commits triggered successful Pages deployments: 37799106945 and 37799538687. These observations do not establish the exact internal GitHub failure cause.
- DEV Pages settings observed: Deploy from a branch; dev/automatic-vendor-system; root; enforced HTTPS. No settings changed.
- Default-branch publisher checks out dev/automatic-vendor-system and commits generated profiles using the workflow GITHUB_TOKEN.
- GitHub explicitly documents that commits pushed by an Actions workflow using GITHUB_TOKEN do not trigger a branch-based Pages build. This is a confirmed configuration limitation, separate from the unproven underlying cause of the observed queued/failed runs.

## Proposed repair, inactive

The sibling proposed-pages-deploy.yml is a reviewed draft, deliberately outside .github/workflows and therefore inactive.

After owner approval:
1. Install it as .github/workflows/pages-deploy.yml on both DEV main and DEV feature branch using fresh head leases.
2. Change only this DEV repository's Pages publishing source to GitHub Actions.
3. Let successful publisher completion (workflow_run) trigger an explicit artifact deployment. Manual dispatch and DEV branch pushes also deploy.
4. Check out the latest DEV branch at build time, serialize deployments, and stage only public root web assets plus vendors and rajasthan. Backend, scripts, tests, qa and .github are excluded.
5. Publish dev-build.json with the checked-out source commit, deployment run ID and approved-catalog hash for source-to-live attribution.
6. Verify actual workflow success and fresh live evidence, then perform a controlled approval/retry/cleanup test. Do not rerun historical commits containing restored Pending test records.

## Permission and activation boundary

Build has contents: read. Only the deploy job requests pages: write and id-token: write; it uses the existing github-pages environment and official actions/deploy-pages@v4. This grants the new workflow authority to publish the existing DEV site with a temporary workflow identity. It does not change the user's PAT, its 30-day expiry, Google credentials, or PROD.

Action-time owner confirmation is required before enabling this new deployment authority. No active workflow or Pages permission/source change has been made.

## Validation and QA status

Draft YAML parses; staging Python compiles; job permissions checked. No runtime deployment test has yet occurred. Runner availability is not guaranteed by the repair. QA-03 and QA-04 remain partial; counts remain 55/64 full developer procedures and 9 partial. Formal acceptance and defect signoffs remain unchanged.

Primary documentation:
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#workflow_run
