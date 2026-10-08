# Responsive width retest — 8 October 2026

Isolated DEV source head a28d23c98e0bd6fe0c77f473af210982ff651ab9. Existing mobile-layout-matrix.html UI used; no site code or Sheet data changes.

Nine cases: DEV Compression Test, DEV Ten Photo Test and DEV Optional Fields 20261006, each at 320, 390 and 768 px. Waited for each exact expected H1 before collecting measurements; earlier stale-frame samples discarded.

All three profiles: document clientWidth/scrollWidth matched at 305/305, 375/375 and 753/753. Iframe scrollbar accounts for 15px. Contact controls were 96.03125×48 and 168.796875×48px in every case. Gallery boxes stayed inside content bounds. Ten-photo profile: single column at 320/390, three columns at 768; maximum right edge 255/325/703 respectively. Optional-field profile had no gallery and fit all widths.

QA-58, QA-59 and QA-60 now have complete developer width/layout procedure evidence. No real call or WhatsApp click. Fresh lazy image decode completion is not claimed; existing Oct6 media evidence remains separate. QA-61 long/empty content matrix remains incomplete: the current optional fixture text is short. Physical Android/iOS and independent frozen-candidate acceptance remain pending. Formal statuses unchanged.
