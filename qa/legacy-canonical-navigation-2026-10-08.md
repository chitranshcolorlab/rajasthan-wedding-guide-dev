# Legacy canonical and navigation retest — 8 October 2026

Developer read-only live browser retest at approximately 10:50 IST. Source branch head 1146cf70ff8e2438a5c756cc4cec7bf166a6a5e7; accepted frozen candidate remains b5219c1a4c54e84b062786868c21ff43d43ea284. This includes the Harshita canonical patch outside that frozen candidate. No production or vendor data writes.

| Profile | Live canonical | Robots | Navigation |
| --- | --- | --- | --- |
| Chitransh Color Lab | One canonical, exact DEV nested profile URL | noindex,nofollow | Root redirect reached correct profile; clicked Photographers link and reached DEV category |
| Fashion Flavour | One canonical, exact DEV nested profile URL | noindex,nofollow | Root redirect reached correct profile; clicked Didwana backlink and reached DEV rental-dresses category |
| Madan Mohan Resort | One canonical, exact DEV nested profile URL | noindex,nofollow | Root redirect reached correct profile; clicked Wedding Venues link and reached DEV category |
| Harshita Shekhawat | One canonical, exact DEV anchor-harshita-shekhawat.html URL | noindex,nofollow | No internal navigation links present; public professional contact/social links remain external |

All six internal profile links enumerated in rendered DOM are within /rajasthan-wedding-guide-dev/. Harshita DOM contains nine images and nine video elements; this observation does not establish playback or media loading. Fashion category visibly showed no approved vendors; category-card completeness was not part of this metadata retest and is not claimed.

QA-55 metadata and available category backlink checks succeeded on the current patch build. Home links were inspected, not clicked. This is supplemental developer evidence, not independent frozen-candidate acceptance. SEO-001 remains FIX READY; formal statuses and signatures unchanged. Full-procedure developer count remains 41/64.

Google sign-in returned 502 Connection refused, so fresh source-change automatic publication remains blocked. No marker was written and no cleanup is outstanding from that probe.
