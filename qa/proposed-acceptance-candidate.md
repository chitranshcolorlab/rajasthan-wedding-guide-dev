# Proposed DEV acceptance candidate — 6 October 2026

Prepared at 20:27 IST for owner review. This is a candidate proposal, not a freeze, completed acceptance or production authorization. release-state.json remains unchanged.

| Component | Exact reference / verification |
|---|---|
| Proposed source candidate | b5219c1a4c54e84b062786868c21ff43d43ea284 |
| Successful Pages deployment of candidate | 37483104823 |
| Backend repository Code.gs blob | 76a2ba1866732128976191d5dc478ae597fdb451 |
| Approved snapshot blob | 03ea5083a105ec53d5eaa55ea670ce2383af8cab |
| Publisher workflow blob in candidate | 85c15daf4492f31e56dfb88da845dd81201e6bca |
| Live web app | Version 4 per prior DEV evidence; exact deployed source requires fresh comparison before freeze |
| Timer | retryDevPublication executes mutable Apps Script Head; live Head/source correspondence requires fresh comparison before freeze |
| Data | Owner QA 1930 intentionally Rejected; Shree Krishna restored Approved per owner screenshots and live checks |

Recent automatic dispatch runs 37479671072, 37480371620, 37481065613 and 37481774878 succeeded at approximately five-minute spacing. This limited interval is timer evidence, not GitHub schedule-event acceptance. Latest observed schedule event remains 37434340529 at 13:40:22 IST.

## Before a formal freeze

1. Compare current live backend deployment and timer Head source with recorded source; capture exact deployment/source identities without credentials.
2. Obtain Release Owner designation of the candidate and approved QA-01–64 criteria mapping. No individual PASS is inferred from owner smoke reports.
3. Establish how generated-content and sheet changes will be tracked during acceptance: timer continues to publish, so this source proposal alone does not immobilize live data.
4. Independently retest DATA-001 and UI-001, resolve AUTO-001 against the approved requirement, complete candidate-specific acceptance and four legacy regressions, then collect exact-candidate signatures.

Owner desktop, Android Chrome and iPhone Safari reports are recorded in owner-form-qa-observations.md. Device versions and full responsive/security/contact matrices remain incomplete. Production is unchanged.
