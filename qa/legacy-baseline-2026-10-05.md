# Legacy profile baseline — 5 October 2026

Read-only browser checks of the existing production site establish the media baseline. No production files, data or settings were changed. These observations do not constitute DEV regression approval.

| Profile | Observed live result |
| --- | --- |
| Chitransh Color Lab | Legacy URL redirects to its district/city/category profile. Heading and content render. No image or video elements were present. |
| Fashion Flavour | Legacy URL redirects to its district/city/category profile. All 6 image elements loaded with non-zero natural width. |
| Madan Mohan Resort | Legacy URL redirects to its district/city/category profile. Hero video plays, readyState 4, no media error. All 9 gallery images loaded; final balcony image madan_mohan_09.webp has natural width 600 after scrolling. |
| Anchor Harshita Shekhawat | Profile renders. All 9 images loaded after gallery scrolling. All 9 video elements loaded metadata, have posters and no media error. Native keyboard playback started and currentTime advanced for every video. |

Production repository source references were compared against its recursive file tree: all relative media references found in the four root profile files exist (0, 6, 11 and 27 references respectively). File existence alone does not prove browser playback.

No call, WhatsApp, email or contact action was submitted. No production edits were made.

Remaining release work: reproduce these profiles and media in DEV and verify the candidate there; finish optional fields/photo upload and remaining QA-64 cases; observe actual scheduled publishing; freeze the candidate and obtain independent QA and required sign-offs. Production release remains blocked.
