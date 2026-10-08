# Proposed updated DEV acceptance candidate — 8 October 2026

Prepared for Release Owner review. Proposal only: existing candidate b5219c1a4c54e84b062786868c21ff43d43ea284 and all formal statuses remain unchanged.

Proposed source candidate: e6f922c2cc3c033487df2808ee049e0d8a49af72 on dev/automatic-vendor-system, repository chitranshcolorlab/rajasthan-wedding-guide-dev. This incorporates the direct Actions Pages pipeline, the public DEV config staging fix, Harshita canonical fix and current QA evidence. Backend repository blob remains the existing Version 4 source blob.

| Component | Git blob |
| --- | --- |
| .github/workflows/pages-deploy.yml | 856cfb3d50cce117d78f4ad0de79409b7523ded6 |
| .github/workflows/vendor-publisher.yml | 85c15daf4492f31e56dfb88da845dd81201e6bca |
| admin-review.html | c61ecdd75f3a0cffb6767995f20368ea331fcf02 |
| approved-vendors.json | c61716e73671c790ad32a4cc498df87693d49ace |
| backend/Code.gs | 76a2ba1866732128976191d5dc478ae597fdb451 |
| scripts/dev-config.js | e0742dc101991da5cc5b94ecb2272c1d375fb991 |

Default-branch Pages workflow fix commit c8398459b7d71953127c67cfb2d48b9d42fbda99 is a separate pipeline identity; default-branch native publisher workflow must also be recorded for schedule tests. First corrected push deployment 37814164195 succeeded and live admin Google button rendering was observed. Do not infer latest proposed candidate deployment from that earlier run.

Before acceptance starts: verify live dev-build.json matches the proposed source, freshly confirm deployed Version 4 / mutable timer Head source correspondence and exact DEV Sheet fixture states. Timer may continue under existing data policy; every mutable-data test must link source rows, generated commit, triggering event, deployed commit and live result. Do not call current live data immutable.

Remaining procedure IDs: QA-04, QA-19, QA-20, QA-47, QA-56, QA-62, QA-63, QA-64. Owner two-device evidence supports the mobile/contact procedures but does not replace exact-candidate formal acceptance. QA-04 needs isolated fresh source-change propagation from native event=schedule. QA-47 live backend valid-token negative permutations remain incomplete; alternate-account screenshot establishes frontend rejection only.

Independent QA must retest DATA-001, UI-001, SEO-001 and AUTO-001 on the designated candidate, map all 64 formal results, and provide four legacy regressions plus required exact-candidate signoffs. No defect closure or signatures inferred. Existing developer total 56 full / 8 partial and formal PASS 0 remain unchanged.

Requested owner decision: designate this proposed DEV source for final acceptance checks only. This does not authorize production release, waive cron/security requirements or provide QA/signoff identities.
