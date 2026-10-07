# Per-criterion evidence reconciliation — 7 October 2026

Accepted executable candidate: b5219c1a4c54e84b062786868c21ff43d43ea284. This update links the five recent candidate evidence batches and explicit owner observations to individual criteria. No new acceptance result is inferred from a test count or owner approval of the testing plan.

| Measure | Count |
| --- | --- |
| Criteria with newly linked candidate/owner evidence | 45 / 64 |
| Full procedure verified by developer evidence | 5 / 64 |
| Partial procedure evidence among linked criteria | 40 / 64 |
| Criteria without evidence from these selected new batches | 19 / 64 |
| Formal independent PASS | 0 / 64 |
| Exact-candidate automated regression tests passing | 35 |

Full developer procedures: QA-27 (failed publisher validation preserves previous output in isolated process fixture), QA-28 (empty list removes managed output and preserves 48 legacy paths), QA-33 (one expected H1 on all 15 generated profiles), QA-35 (exact DEV canonical on all 15), QA-42 (exact approved sitemap set, zero duplicate URLs).

Other linked criteria are partial because their compound steps, live mutation attribution, physical-device/build metadata or independent acceptance remain incomplete. A linked owner report is not reclassified as no work performed, and no already-confirmed orientation/legacy/contact checks need automatically be repeated. Missing metadata can be supplied separately; source compatibility must still be established. Earlier developer evidence remains retained for every criterion, including the 19 criteria without selected new-batch links.

The complete per-ID references and limitations are in release-state.json under tests[id].evidenceReconciliation. Formal status, defect closure and role signatures remain unchanged. Developer cannot close their own defect under qa/README.md.

Remaining selected-batch IDs: QA-01, QA-02, QA-03, QA-04, QA-08, QA-09, QA-14, QA-15, QA-16, QA-17, QA-24, QA-36, QA-38, QA-39, QA-45, QA-58, QA-59, QA-60, QA-61.
