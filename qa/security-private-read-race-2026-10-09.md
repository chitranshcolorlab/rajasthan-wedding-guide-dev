# DEV private-read logout race — 2026-10-09

Found during final security edge-case review: fetchItems could resolve a private admin-list response after logout and load could render it again. Capture request credential before sending; reject response before returning private items if credential changed or expired. Explicit backend auth/token rejection also clears cached private state and updates signed-out UI.

Four actual-function regressions cover logout while awaiting response, another login while awaiting response, backend unauthorized clearing, and authorized successful reads. Full node --test tests/*.test.js: 55 pass, 0 fail, 0 skipped. Production untouched. This executable fix requires affected acceptance on the updated DEV build; previous frozen candidate and signatures are not silently updated. Browser timing race not separately simulated; regression uses controlled deferred network completion.
