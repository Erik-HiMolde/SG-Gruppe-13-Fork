# Engineering Backlog

This backlog collects cross-cutting or future action items that emerge from reviews and planning.

Routing guidance:

- Use this file for non-urgent optimizations, refactors, or follow-ups that span multiple stories/epics.
- Must-fix items to ship a story belong in that story’s `Tasks / Subtasks`.
- Same-epic improvements may also be captured under the epic Tech Spec `Post-Review Follow-ups` section.

| Date | Story | Epic | Type | Severity | Owner | Status | Notes |
| ---- | ----- | ---- | ---- | -------- | ----- | ------ | ----- |
| 2025-11-30 | 1.1 | 1 | Bug | Medium | TBD | Open | Implement unit/integration tests for `/api/hello` endpoint to verify it returns `"{ "message": "Hello World" }"` as expected. [file: sentiabot/app/api/hello/route.ts] |
| 2025-11-30 | 1.1 | 1 | Bug | Medium | TBD | Open | Implement unit/integration tests for `supabase.ts` client to verify successful connection to Supabase. [file: sentiabot/lib/supabase.ts] |
| 2025-11-30 | 1.1 | 1 | TechDebt | Low | TBD | Open | Consider the lifecycle and exposure of `sentiabot/app/api/check-db/route.ts`. Ensure it's not exposed in production, or integrate its testing functionality more formally into a test suite and remove the direct API route. |
