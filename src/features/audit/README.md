# features/audit/

Audit trail for privileged actions.

## Contents

- `log.ts` — `logEvent(action, { targetType, targetId, metadata })`. Best-effort:
  never throws / never breaks the audited action. The actor is captured
  server-side by the `log_event` DB function (SECURITY DEFINER), so it cannot be
  forged by the client.
- `queries.ts` — `listAuditLogs(limit)` (RLS-restricted to owner/admin).
- `components/audit-table.tsx` — read-only DataTable of recent events.

Page: `src/app/(app)/audit/page.tsx` (owner/admin). Table + function live in
`supabase/migrations/0005_audit_logs.sql`.

## Emitting events

Call `logEvent` after a successful mutation, e.g.:

```ts
await logEvent("user.role_changed", {
  targetType: "user", targetId: userId, metadata: { from, to },
});
```
