# Candidate slug edge cases — 7 October 2026

Four supplemental isolated Node tests executed against backend/Code.gs and reused VM spreadsheet fixture from immutable candidate b5219c1a4c54e84b062786868c21ff43d43ea284. Four pass, zero fail, exit 0. Separate from the 47 repository tests; no backend/source/live sheet mutation.

| Scenario | Verified result |
| --- | --- |
| `  A & B !!! Wedding / Studio  ` | `a-and-b-wedding-studio-didwana` |
| Two `श्री कृष्णा स्टूडियो` records | `vendor-didwana` and `vendor-didwana-2`; repeat approval retains first |
| `Café Studio` | `cafe-studio-didwana` |
| 180 punctuation characters | `vendor-didwana` |
| 300 ASCII letters | Safe slug bounded to 160 characters |
| Rename Hindi business to English; Edit Required/Rejected/Approved/repeat | Existing persisted slug unchanged |

The implementation transliterates no Hindi characters: an all-Hindi name uses `vendor` fallback plus city and collision suffix. That is permitted by approved QA-09's deterministic-fallback criterion. VM fixture evidence is partial for QA-07–13; live approval, public-route and independent acceptance are not inferred. Formal PASS, defect closure and release signatures unchanged.
