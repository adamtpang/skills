---
name: parallelize-gestation
description: "Restructure a project so independent long-latency work starts in parallel while true dependencies, work-in-progress limits, and synchronization points remain explicit. Use for launches, integrations, approvals, research, procurement, hiring, and multi-lane delivery that has been serialized by habit."
---

# Parallelize Gestation: Start Waiting Early

Reduce calendar time by starting independent work with unavoidable waiting or
gestation periods before the main lane reaches it.

## Method

1. Define the final deliverable and done condition.
2. Inventory tasks with owner, active effort, elapsed time, prerequisites, and
   external wait time.
3. Challenge every dependency. A true dependency requires an output from the
   predecessor, not merely a preferred order.
4. Identify gestation tasks such as approvals, vendor setup, research, review,
   data collection, indexing, shipping, or account verification.
5. Start independent gestation tasks now and group work into a small number of
   named lanes.
6. Set a work-in-progress limit so parallelism does not become context-switching
   overload.
7. Define synchronization points where lane outputs must converge, plus the
   fallback when one lane slips.
8. Recalculate the critical path and expected calendar reduction.

## Output

| Lane | Owner | Start now | Waiting period | True dependency | Sync point | Fallback |
| --- | --- | --- | --- | --- | --- | --- |

Then state:

- **Old critical path:** serialized duration and cause.
- **New critical path:** parallel duration and remaining constraint.
- **Start-now queue:** independent actions that begin immediately.
- **WIP limit:** maximum active lanes and why.
- **Next synchronization:** event, owner, and date.

## Boundaries

- Do not parallelize tightly coupled work that will create rework.
- Do not launch irreversible, costly, public, or externally mutating actions
  without the authorization they normally require.
- Parallelism reduces waiting, not the need for ownership or integration.
- Prefer two or three clean lanes over a large board of partially started work.
