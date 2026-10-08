# Owner alternate Google account UI rejection — 8 October 2026

Owner was asked to sign into the DEV admin page using an account other than the authorized owner. Submitted Chrome screenshot Screenshot_20261008_224032_Chrome.jpg (Library libfile_4d53198614d881919446945da4779c67) visibly shows Not signed in, Sign in with Google, and the error “This Google account is not authorized for vendor approvals.”

This establishes frontend unauthorized-account rejection for the owner-reported alternate-account flow. The screenshot does not expose the chosen account identifier or document a backend request. Source handleCredentialResponse rejects a mismatched email before admin-list, so do not treat this as a real backend valid-token negative-email test. No token or credential was read or copied.

QA-47 stays partial; audience/issuer/expiry/email/subject backend live cases remain pending. Developer total remains 56 full / 8 partial. Formal acceptance, frozen candidate, defects and signoffs unchanged. The screenshot also corroborates restored Google button rendering on owner Chrome after the DEV staging repair.
