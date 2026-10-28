---
name: problem-prioritize-list
description: Turn an audit, project context, or messy backlog into one evidence-backed list of solvable problems in priority order. Use when asked what is wrong, what can be fixed, what to do first, or how to triage an operational or product estate; do not execute the fixes unless the user separately asks for implementation.
---

# Problem Prioritize List

Produce a complete, decision-ready problem list rather than a feature wishlist or
an unordered collection of tasks.

## Establish the evidence boundary

- State the system, project, or time window covered by the list.
- Load the most recent local handoff and required project documents before
  relying on older conversation context.
- Verify facts that can change, such as deployment state, renewal settings,
  incidents, costs, deadlines, and live availability, with the authoritative
  source available in the environment.
- Treat unsupported suspicions as unverified leads. Rank them below confirmed
  problems unless their possible impact requires immediate investigation.
- Interpret "all" as all distinct problems supported by the inspected scope.
  Name any important coverage gap instead of implying certainty.

## Build the problem ledger

Describe each item as a current undesirable state, not as a proposed feature.
For every distinct problem, capture:

- evidence and affected scope;
- consequence if ignored;
- likely root cause, when known;
- the smallest credible fix or next diagnostic;
- effort and reversibility;
- disposition: `act now`, `decision needed`, `authorization needed`,
  `external dependency`, or `monitor`.

Collapse duplicate symptoms under a shared root cause. Keep a symptom separate
only when it needs a different remedy, owner, or deadline. When one fix unlocks
several downstream fixes, rank the prerequisite ahead of them and make the
dependency explicit.

## Rank in this order

Use these tiers before considering convenience:

1. **P0, Active harm:** security exposure, irreversible data loss, active
   financial loss, or a core production outage.
2. **P1, Imminent or blocking:** expiry/deadline risk, broken public journeys,
   failed production changes, or a blocker to the primary outcome.
3. **P2, High leverage:** recurring root causes, duplicated cost/content,
   operational fragility, or one fix that unlocks several others.
4. **P3, Maintainability and efficiency:** stale resources, confusing
   ownership, weak observability, manual toil, and safe cleanup.
5. **P4, Optional improvement:** polish, speculative optimization, and ideas
   without current evidence of meaningful impact.

Within a tier, prefer higher impact and urgency, broader reach, stronger
evidence, lower effort, and safer reversibility. Use exact numbers when they are
real. If a numeric score would create false precision, explain the ordering in
plain language instead. A low-effort cosmetic fix does not outrank a harder
deadline or root-cause fix merely because it is easy.

## Present the result

Lead with a numbered table containing:

| Rank | Tier | Problem and evidence | Why it matters now | Proposed fix | Disposition | Effort |
| --- | --- | --- | --- | --- | --- | --- |

Keep each row concise while retaining enough evidence to defend its position.
After the table, include:

- **Top three moves:** the next executable sequence, including dependencies.
- **Decision queue:** only the choices the user must make, with a recommendation.
- **Combined or excluded items:** symptoms merged into root causes, accepted
  tradeoffs, or unverified leads that were deliberately not ranked higher.

Do not silently omit lower-priority confirmed problems. Do not pad the list with
generic best practices that were not observed.

## Preserve authorization boundaries

Prioritization is read-only. A request to list or audit problems does not by
itself authorize deletion, purchases, renewal changes, publication, external
communication, security reduction, or other consequential mutations. For such
actions, identify exact targets and impact, then obtain the needed authorization
immediately before execution. Ordinary reversible fixes may be implemented only
when the user has also asked to fix or execute.
