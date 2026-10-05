# Four legacy DEV profiles — live regression, 5 October 2026

Pinned production source: 75e87651d36d41ce7f53d7158e0a10e99f162eae. Copy job 37311948017 succeeded; Pages job 37311982744 succeeded. Candidate containing copied profiles: bfd075fa31973aae353f313d968b4475588ffef2. Only DEV was written; production source was read-only. Copies use DEV-relative redirects/base/navigation, DEV canonical URLs and noindex,nofollow.

| Profile | Live DEV observation |
| --- | --- |
| Chitransh Color Lab | Root URL redirects to DEV district/category profile. Heading/content render; zero image elements, matching baseline. |
| Fashion Flavour | Root URL redirects within DEV; all six images loaded with positive natural width. |
| Madan Mohan Resort | Root URL redirects within DEV; all nine images loaded after gallery scroll. Hero video autoplay advanced from 27.036 to 29.142 seconds, readyState 4, no media error. |
| Harshita Shekhawat | All nine images loaded. All nine videos have posters and metadata, readyState 4, no media errors. Native Space-key playback advanced currentTime for every video: 7.4, 52.3, 27.12, 18.1, 42.4, 18.1, 28.433, 22.6, 32.080 seconds. |

Saved browser proof: rwg-dev-legacy-videos-1791204846812.jpg. No contact actions were triggered. These are desktop DEV media/redirect checks, not a full release signoff or physical mobile test.

## Publisher follow-up

Default-branch workflow is enabled (UI offered Disable workflow), but schedule-event run count remained zero. Default-branch cron was changed to 2-57/5 * * * * to avoid the start-of-hour boundary; GitHub documentation notes that scheduled jobs can be delayed or dropped during high load (https://docs.github.com/en/actions/how-tos/troubleshoot-workflows). This is a mitigation, not a verified fix or root-cause finding.

Disposable Version 3 upload record RWG-cd5f666e-b66b-488d-bbbe-2b6abcc558af was approved using authenticated DEV admin; UI confirmed VERIFIED Approved. Timed synchronization of that record is still unverified. QA-64 and independent signoff remain incomplete. Production release remains blocked.
