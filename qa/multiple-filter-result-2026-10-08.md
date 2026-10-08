# Multiple category/district/city filters — 8 October 2026

Isolated QA fixture build 2e15936597cf310d8a678bf0148698d4cb7846f0, Pages 37765662570 successful. Copied current vendors.html UI with only data endpoint and QA banner/navigation adaptations; filter, rendering and query initialization logic unchanged. Six synthetic records, three categories, three districts, four cities. No registration/approval source data or main approved catalog changed; synthetic profile links were not used and their publication is not claimed.

Twelve observed cases matched expected card IDs:
1. All: F1–F6.
2. Photographers: F1,F3.
3. Photographers + Nagaur district: F3.
4. Plus Nagaur city: F3.
5. Change district to Jaipur: old Nagaur city cleared, city options only Jaipur, no matching photographers.
6. Wedding Venues + Jaipur: F5.
7. Wedding Venues + Didwana-Kuchaman: F2; cities Didwana/Kuchaman.
8. Plus Kuchaman: empty state, zero cards.
9. Caterers + Kuchaman: F6.
10. Reset category/district: all six, city reset.
11. Query deep link Caterers/Jaipur/Jaipur: F4.
12. Reload same query deep link: F4 and all selections preserved.

Raw browser observations: multiple-filter-results-2026-10-08.json. Assertions compared every observed card ID sequence and verified district-change city reset/options. Correct empty message observed. No calls/messages or credentials.

Owner Android feedback at 16:14:54 IST confirmed prompted refresh/buttons/photo visibility/scroll for the existing single-category listing; selected profile and device version unspecified. Synthetic desktop multi-filter test does not establish real approval/publishing across categories, physical touch acceptance, native cron or independent candidate PASS. Full developer coverage remains 49/64.
