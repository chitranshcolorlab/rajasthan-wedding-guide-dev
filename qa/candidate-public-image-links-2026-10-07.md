# Public candidate image link checks — 7 October 2026

Read-only HTTP validation of every distinct Logo URL and Photo URLs entry in the accepted 15-vendor snapshot. Fifteen distinct image URLs checked, fifteen pass, zero failure. Each responded HTTP 200 with image MIME and a supported JPEG, PNG or WebP byte signature. No login credential supplied, private files read or file sharing modified.

The sole logo-backed profile, DEV Compression Test, has og:image exactly matching its source public thumbnail URL; that thumbnail passed actual-image checks. Combined with candidate-metadata-2026-10-07.md this completes developer procedure evidence for QA-38. Fourteen no-logo profiles safely omit og:image. Social crawler preview has not been exercised, so QA-39 remains partial.

These tests establish publicly reachable supported image data at observation time. They do not decode every full image, establish social crawler cache behavior or repeat the upload procedure. QA-15 and QA-18 gain partial live media evidence only. Formal independent statuses and role signoffs unchanged; no production mutation.
