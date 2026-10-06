# Controlled live response-recovery fixture

This dedicated isolated DEV page copies postStatus/setStatus exactly from admin-review.html at source 60ab472214be00d9434a5ab4c7115e4575267435. It is not the normal admin page. Only disposable record RWG-6dfbc3dc-c041-45d9-8ef4-503a90df44aa can receive Approved mutations. Exact DEV host/path/API guards prevent writes elsewhere.

After a real authenticated successful status response (ok:true), a one-shot client wrapper deliberately replaces its acknowledgement with unreadable text. The unchanged recovery functions must issue authenticated admin-list readback, show saved Approved, avoid a second mutation and avoid claiming publication confirmation. Explicit error/auth responses are returned unchanged. Visible counters contain only booleans/counts; credential values are never displayed or exported.

This is controlled live-backend/client fault injection. It does not reproduce the unknown original upstream response cause and does not close UI-001 or replace independent candidate acceptance. Local syntax/core-parity checks required before deployment. Live result: PASS controlled developer smoke, one real status update and one authenticated readback. See admin-response-recovery-live-result.md. UI-001 remains FIX READY pending independent acceptance.
