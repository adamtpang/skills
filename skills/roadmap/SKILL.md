---
name: roadmap
description: Create or refresh a project-root roadmap.md by comparing verified current state with a concrete perfect version, then sequencing milestones, dependencies, task ETA ranges, risks, and completion criteria. Use when the user asks for a roadmap, project plan, delivery path, milestone timeline, path to perfect, or an estimate of how far a Codex project is from completion.
---

# Roadmap

Create an honest, evidence-based `roadmap.md` that helps the team decide and execute, not a generic feature wishlist.

## Workflow

1. Read the nearest project instructions and continuity files before inspecting the project.
2. Inspect the current implementation, tests, build and deployment configuration, product or design specs, open work, and Git status. Treat generated artifacts and old plans as hints until verified.
3. If `roadmap.md` already exists, preserve valid user decisions and completed work. Update it instead of replacing it blindly.
4. Define the perfect version as a finite acceptance standard grounded in the project's intent. Separate essential excellence from speculative expansion.
5. Identify the gaps between verified current state and that standard. Sequence work by user value, risk reduction, and dependency order.
6. Write or refresh lowercase `roadmap.md` in the project root.
7. Re-read the result and verify that every task has an observable finish line, dependency position, and defensible ETA range.

## Required roadmap structure

Use the following sections unless a project clearly needs a small adaptation:

1. `# Roadmap`
2. `## North star`
3. `## Perfect version definition`
4. `## Verified current state`
5. `## Gap map`
6. `## Milestones`
7. `## Now, next, later`
8. `## ETA model`
9. `## Risks and decision gates`
10. `## Progress protocol`

For each milestone include:

- Outcome and user value
- Tasks in dependency order
- Completion criteria
- Focused engineering ETA range
- Likely elapsed calendar range
- Dependencies and risks
- Status: not started, in progress, blocked, or complete

## Estimation rules

- Use ranges, not false precision.
- State the assumptions behind estimates, including team size, review latency, platform approvals, signing, data migration, or external dependencies.
- Separate focused engineering time from elapsed calendar time.
- Distinguish `time to useful`, `time to excellent`, and `time to perfect` when the difference matters.
- Include confidence as high, medium, or low for major milestones.
- Do not count already completed work again.
- Do not imply that AI implementation speed removes QA, security, distribution, or user-feedback time.

## Quality bar

- Cite local paths, commands, tests, or deployed surfaces as evidence for current-state claims.
- Mark inference and aspiration clearly.
- Put safety, data integrity, privacy, migration, and rollback before irreversible operations.
- Keep tasks small enough to verify but large enough to represent meaningful outcomes.
- Make the critical path obvious.
- Put deferred ideas in `Later`; do not let them inflate the perfect-version finish line unless they are required by the north star.
- Use dates only when the project has a real start date and assumptions support calendar forecasting.

## Progress protocol

When refreshing a roadmap:

- Change task status only when evidence supports it.
- Record material scope or estimate changes in a short changelog at the end.
- Recalculate downstream ETAs when a critical-path assumption changes.
- Keep the document usable as the next implementation plan.
