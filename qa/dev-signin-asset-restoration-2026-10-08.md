# DEV sign-in asset restoration — 8 October 2026

Owner screenshot showed Not signed in, missing Google button and Loading submissions. Fresh cloud Chrome reproduced this. Page console reported TypeError: Cannot read properties of undefined (reading 'apiUrl') at admin-review.html:2:34. The admin loads scripts/dev-config.js; the new direct Pages staging copied root public files plus vendors and rajasthan but omitted that public script.

Fixed Pages staging to create scripts and copy only scripts/dev-config.js, with an existence assertion. Backend and publisher scripts remain excluded. Applied on DEV main c8398459b7d71953127c67cfb2d48b9d42fbda99 and DEV feature 61bb4e192feba4fdb3a86ba4d411882c8df06719. Push deployment 37814164195 completed successfully. Reloaded live DEV admin displayed Sign in with Google and Sign in to load private submissions. Screenshot dev-signin-restored-20261008.jpg retained.

Button rendering and page initialization are verified. Actual account login and unauthorized-account backend validation are not claimed. No Google permission, credential, vendor data, active backend version or production changes. Candidate, formal acceptance and prior QA counts remain unchanged. A native schedule run 37813855660 was observed successful during repair, but fresh schedule-only source-to-live attribution is not established by that observation.
