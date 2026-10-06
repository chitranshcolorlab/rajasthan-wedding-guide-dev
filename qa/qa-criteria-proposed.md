# Proposed individual QA criteria — review required

This draft expands the existing 18 grouped matrix entries into 64 explicit cases. It does not claim these are previously approved criteria, replace the release matrix, or set any PASS/signature.

Review [qa-criteria-proposed.csv](qa-criteria-proposed.csv), confirm each procedure/expected result, and record any changes before executing formal acceptance on a frozen candidate. Compound cases require all listed subchecks and their evidence. Existing developer evidence may guide reproduction but is not automatically candidate acceptance.

Special review points:
- QA-04/45/64 retain the original scheduled-publication requirement. Apps Script timer workflow_dispatch is separately evidenced mitigation; changing this acceptance requires an explicit requirement decision.
- QA-06 combines repeat and actual concurrent approval because the existing matrix assigns one ID to double approval.
- QA-46–49 aggregate security/data checks because four IDs cover several distinct subchecks; no credential values belong in evidence.
- QA-19/20 require an authorized real contact; do not use disposable placeholder 9999999999.
- QA-58–63 cover embedded widths plus physical Android/iOS. Existing owner Android screenshot supports gallery visibility only.
- Formal candidateCommit, test statuses, blockers and signatures are unchanged.

After criteria are agreed, each result should record candidate/build/backend version, tester/date, steps, expected/actual and evidence. Independent QA closes defects under [README.md](README.md); developer smoke does not close them.
