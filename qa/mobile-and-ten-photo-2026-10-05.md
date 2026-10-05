# Resume checks — 5 October 2026, 17:19 IST onward

- Updated registration form rejected 11 photos before upload, observed before the pause. Ten-photo submit clicked and compression began; receipt was not captured before the browser session ended. Do not mark ten-photo acceptance PASS until database readback verifies the pending row and ten photo URLs.
- DEV QA iframe at qa/mobile-profile-preview.html renders the existing compressed test profile in a 375 px outer viewport (360 px content width after scrollbar). document scrollWidth equals clientWidth, 360; no horizontal document overflow observed.
- Logo and both gallery images loaded. Rendered widths: logo 100 px; gallery images 260 px each; gallery is one column in this narrow viewport. This is an embedded desktop browser layout check, not physical mobile/touch testing.
- Old tabs disappeared after inactivity. Reopened DEV admin and Google sign-in. User selected Sharad account via secure account chooser. Google then requested authentication; browser inspection timed out twice. Ten-photo database readback and approval remain blocked on completing sign-in.

No production modifications and no release sign-off.
