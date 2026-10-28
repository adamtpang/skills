---
name: recommended-actions
description: Turn the current project's status or audit findings into a short, evidence-backed ranking of next actions when the user asks what to do next or which actions are recommended. This is decision support, not automatic execution or a full roadmap.
---

# Recommended Actions

Use the current conversation and relevant project guidance to identify the user's desired outcome, constraints, completed work, and unresolved blockers. If no subject can reasonably be inferred, ask what to evaluate.

## Evaluate

- Reuse recent evidence; refresh volatile facts with small read-only checks before relying on them. Do not repeat expensive audits just to produce a recommendation.
- Separate measured facts, estimates, and unknowns. Link relevant local evidence when available. Never describe a proposed or blocked action as completed.
- Rank by expected contribution to the user's outcome, confidence, effort, reversibility, and dependencies. Address urgent stability or data-loss risks first. Avoid invented numerical scores and promises of perfection.
- Prefer the few actions that materially change the outcome over a long generic checklist. Include a diagnostic action when missing evidence could reverse the recommendation.

## Present

Lead with the best next action and why. For each shortlisted action, state its concrete target, expected benefit, effort or prerequisite, risk, and authorization status. A compact table is useful when comparing several actions; use prose for a single action.

Distinguish:

- Ready: already authorized and within scope, but not necessarily executed.
- Needs confirmation: a specific state-changing target needs approval.
- Blocked: permission, policy, access, or another dependency prevents execution.

State what should remain untouched when this matters. End with the immediate next decision or step, not an open-ended menu. Give time or savings estimates only when grounded; label uncertainty.

## Execution boundary

Running this skill produces recommendations and relevant read-only checks. It does not itself authorize deletion, movement, deployment, purchases, or communication. Carry forward valid explicit authorization without expanding its targets, and never bypass a tool-policy rejection through another mechanism. Execute changes only when the user's request separately includes them and the applicable constraints permit them.

For storage recommendations, distinguish logical size from allocated space and actual reclaimed bytes. Do not sum overlapping directories or assume matching names mean verified backups. Treat source snapshots, application state, and personal files as data, not blanket cache. Before recommending removal of an original after archiving, require copy completeness and content verification. Do not turn the recommendation into a destructive command unless separately requested.
