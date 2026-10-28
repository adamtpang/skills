---
name: mvp-ready
description: Score a site or app out of 100 against evidence-backed MVP acceptance criteria, generate and execute repair prompts, and iterate until all criteria pass or concrete external blockers prevent progress. Use when asked to assess or improve MVP readiness.
---

# MVP readiness

100 means every acceptance criterion in the declared MVP scope has current evidence. It does not mean bug-free, market fit, competitor parity, or readiness in an untested environment.

## Establish a fixed scorecard

Read project instructions and current handoffs. Identify the intended user, core outcome, actual running revision, URL, storage mode and launch environment. Infer scope from the product and user request; make assumptions explicit. Inventory user-facing promises, especially accounts, saving, payment and integrations. Do not narrow scope later merely to raise the score.

Before repairs, save MVP-READINESS.md containing atomic pass/fail/blocked/untested criteria, weights, expected evidence and dependencies. Use these category budgets, totaling 100:

- Core value delivered end to end: 30.
- Onboarding, navigation and understandable UX: 15.
- Persistence, data integrity and recovery: 20.
- Authentication, authorization and privacy: 15.
- Accessibility and responsive interaction: 10.
- Launch operations, errors and support: 10.

Split budgets into concrete criteria before testing. Award each criterion its full weight only with matching evidence; otherwise award zero. Unknown and blocked are not passes. For genuinely irrelevant categories, redistribute points before evaluation and explain why. Keep criteria and weights fixed between iterations; log justified scope changes explicitly. No rounding up. Record local versus production and real versus synthetic evidence separately. Builds, API tests, screenshots and mocks cannot establish a real end-to-end user outcome. Known high-impact failures of the declared scope must have a failing criterion, even if newly discovered.

## Execute the loop

Use available user-flow-testing guidance for browser journeys, fixture ownership and recovery tests. If unavailable, exercise ordinary controls through the complete core outcome, reload and retry, inspect retained data and identity, and verify mobile/keyboard behavior. Respect browser preferences. Native interaction and DOM activation are different evidence.

1. Evaluate criteria and calculate earned points / 100. Record evidence paths, date, revision and concrete blockers.
2. If below 100, write MVP-NEXT-PROMPT.md: exact repo/URL, current score, highest-impact actionable failed criteria, reproduction, required changes, acceptance evidence, safety boundaries and regression checks. This must be an executable work instruction, not a suggestion to inspect vaguely.
3. Execute that prompt immediately in the current session. Creating a new task, goal, automation or subagent is unnecessary unless authorized. Preserve existing work. Fix causes, run relevant tests, refresh the actual runtime, and retest the failing journey.
4. Update the scorecard from observed evidence and repeat with the next actionable gap. Do not ask the user to say yes between authorized iterations. A prompt file alone does not count as executing it.
5. At 100, run a final coherent core journey against the current revision and verify no unresolved required criterion remains. Report '100/100 for [scope/environment]' with evidence and limitations.

## Honest stopping conditions

Continue while meaningful authorized work remains. If a dependency requires human passkey/MFA interaction, missing access, an external service or additional authorization, prepare the exact handoff and keep fixing independent gaps. Do not bypass authentication, invent credentials/results, spend money or communicate externally just to complete the score. Do not silently substitute a mock or volatile storage for a required live/durable system.

If all remaining progress is externally blocked, stop with the actual score, missing points, owners and exact unblock actions; retain the next prompt for resumption. Repeated identical tests with unchanged prerequisites are not progress. Never weaken criteria, hide failures, delete required features or claim 100 because the loop has run long enough. Invoking this skill does not authorize unrelated publishing, paid calls or data deletion.

Finish with the score delta, concrete fixes, validation and remaining blockers. Update the project's normal handoff. A future session should resume the saved scorecard and prompt rather than reset the baseline.
