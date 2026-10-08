# Bounded Apps Script 404 recovery patch — 8 October 2026

Observed three actual automatic publisher failures (37756017916,37756603794,37757182006) with DEV API HTTP404, then automatic recovery37757764974. Existing fetch helper treated404 as permanent. New narrow handling retries404 only for https://script.google.com/macros/s/<deployment>/exec GET reads, maximum3 attempts, waits1s then2s. Other404 endpoints and400/401/403 still fail immediately. Persistent404 still fails without entering publication.

Source before patch fca3877f51e738b6e39dd44890e02f2c32803033. Changed publish-vendors.js plus fetch and process preservation tests. Full current49-test suite passes,0fails. Added bounded endpoint-specific404 tests and subprocess proof that exhausted404 leaves prior catalog, sitemap and profile byte-identical. Existing JSON/schema/auth/environment checks unchanged. No credentials, backend deployment, PROD writes or manual workflow dispatch. Current DEV workflow push will run CI; backup timer main workflow checks out this DEV branch.

This is a current DEV mitigation, outside frozen accepted candidate. AUTO-001 remains open; failures separated by timer runs and native GitHub schedule cadence are not fixed by this patch. Full developer acceptance coverage remains48/64; independent affected-build retest required. Does not claim original intermittent upstream404 cause resolved.
