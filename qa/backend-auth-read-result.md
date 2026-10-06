# Backend authentication read regression

6 October 2026. Four local tests pass against current repository backend: valid claim variants authorize private admin read; invalid audience/issuer/expiry/email-verification/email/subject prevent any sheet read; malformed verifier JSON and network failure fail closed; missing/non-string tokens do not invoke tokeninfo or sheet reads.

All credentials/claims are synthetic in an isolated VM. No real token accessed, no live Google verifier request, no live spreadsheet read/write. Tests supplement existing invalid-token status-mutation tests. Actual authorized live account access has separate UI evidence; these tests do not establish live identity-provider acceptance or independent frozen-candidate signoff. Backend behavior and deployed version unchanged.
