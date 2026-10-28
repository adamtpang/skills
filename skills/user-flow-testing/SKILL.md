---
name: user-flow-testing
description: Simulate real users in a running product, test complete journeys and recovery paths, fix reproducible failures, and assess MVP readiness with evidence. Use for user-flow testing, end-to-end product QA, or checking whether an app is ready for its first users.
---

# User flow testing

Test the product as a user would experience it, fix failures within the authorized scope, and produce a bounded MVP readiness verdict. A passing build, screenshot, DOM snapshot, or status endpoint alone cannot establish a working journey. Never promise that software has no bugs.

## Establish the test environment

Read applicable project instructions and handoffs. Identify the actual URL, running revision, browser, account state, locale, and storage mode. Respect the user's browser preference and use an available browser skill when needed. Use the selected environment, not a convenient substitute. Distinguish local, preview and production. Do not silently replace durable storage with process-memory storage to make a setup check pass.

Infer the primary user and intended outcome from the task/product. Ask only if missing scope blocks useful testing. Use a disposable test project/account when authorized; mark synthetic data clearly. Record what was created, preserve existing data, and clean up only owned fixtures. Do not execute destructive operations, purchases, paid generation, or external communications without applicable authorization. Skill invocation does not provide it. Stop at passkeys/MFA and stage the exact human handoff while continuing independent checks.

## Choose complete journeys

Write a short coverage table before testing: persona, starting state, steps, expected outcome, and required evidence. Prioritize the path that delivers the product's core value. Include, where the product supports them:

- First visit: understand the offer, choose the primary action, complete onboarding, reach a useful result.
- Returning visit: sign in, reopen saved work, edit it, reload, navigate away and back, verify persistence.
- Main task: enter realistic data, run the workflow, inspect the actual result and its destination, reuse or export it.
- Multiple workspaces/accounts: create or select two owned test contexts; verify names, state, history and permissions remain isolated.
- Recovery: invalid/empty input, empty results, loading, unavailable service, expired session, failed save and safe retry.
- Navigation and presentation: direct links, browser back/forward, refresh, mobile layout, keyboard activation, visible labels, default language and direction.
- Restart/cross-client behavior when persistence is part of the promise. State explicitly if accounts or results disappear when the server restarts.

Tailor coverage to the product. Do not invent irrelevant checklist work or exercise every provider just because it exists.

## Execute like a user

Use visible controls and ordinary navigation for the principal journey. Prefer native click/type/key events. If browser automation fails, separate a harness failure from an application failure: inspect the current target, coordinates, focus and loading state. DOM activation may help diagnose, but does not count as a passed pointer/touch test. Direct API calls and storage fixtures are supplemental checks and must be labeled as such.

Before calling visible copy a bug, inspect the actual rendered page. Accessibility-tree names, hidden screen-reader labels, option text and DOM text extraction can differ from what the user sees. Check the screenshot and computed visibility when relevant. Never invent a cause from concatenated extracted text.

For each journey, verify the resulting state, not only the click or success toast. Check retained data after reload, account/project identity, the actual output, and a read-only receipt where available. Never retry an uncertain external write until its outcome is reconciled. Inspect console/network errors relevant to failures without exposing credentials or private content.

Check representative small-screen, tablet and desktop widths. Inspect clipping, horizontal overflow, menus, focus, touch targets and long/empty content. Test the key controls themselves; a screenshot does not prove interaction.

## Fix and retest

Record each reproducible issue with steps, expected versus observed behavior, environment, severity and evidence. Fix agent-owned issues as you find them. Retest the exact failing journey and adjacent behavior affected by the change. Run appropriate build/type/security checks for the changes. Refresh or restart the actual preview after rebuilding, then verify the served revision so the user does not review stale code.

Do not hide errors, weaken authentication, fabricate results, replace real services with mocks, or remove necessary consent/status information to claim readiness. Keep essential copy concise and move optional detail behind clear controls. Preserve existing data and supported functionality.

## Exit with evidence

Save a concise report in the project's normal artifact location with:

- Tested URL/revision/date, storage mode, personas and browser/viewport coverage.
- Journey results: pass, fail, blocked, or not tested; distinguish real from synthetic evidence.
- Fixed issues and the regression evidence for each.
- Remaining blockers with owners and concrete closing actions.
- A readiness verdict scoped to the tested MVP.

Use “Ready for the tested MVP scope” only when core journeys pass on the intended environment, no critical/high-impact failures remain, and required persistence, permissions and recovery have evidence. Use “Not ready” or “Readiness blocked” when material gaps remain. Do not infer readiness from absence of alerts or a configured=true response. Stop repetitive testing once meaningful coverage passes; never keep rerunning the same checks to avoid reporting a real dependency.
