# Backend authentication read regression

6 October 2026. Four local tests pass against current repository backend: valid claim variants authorize private admin read; invalid audience/issuer/expiry/email-verification/email/subject prevent any sheet read; malformed verifier JSON and network failure fail closed; missing/non-string tokens do not invoke tokeninfo or sheet reads.

All credentials/claims are synthetic in an isolated VM. No real token accessed, no live Google verifier request, no live spreadsheet read/write. Tests supplement existing invalid-token status-mutation tests. Actual authorized live account access has separate UI evidence; these tests do not establish live identity-provider acceptance or independent frozen-candidate signoff. Backend behavior and deployed version unchanged.

CI validation: publisher run [37469521886](https://github.com/chitranshcolorlab/rajasthan-wedding-guide-dev/actions/runs/37469521886), job 112289669864, succeeded against test commit 025a2110931da5fe32d843822bd5334ce3033b92. Full suite: 47 tests, 47 pass, 0 fail. Publisher synchronization step also succeeded. This supplements developer verification without changing formal acceptance gates.
