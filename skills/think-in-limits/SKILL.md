---
name: think-in-limits
description: "Stress-test a claim, design, price, process, or business model by taking important variables toward zero, one, and extreme scale to reveal invariants, nonlinear breakpoints, and false constraints. Use when ordinary-range reasoning hides what actually limits the system."
---

# Think In Limits: Expose Breakpoints

Use extreme cases as analytical probes. This is not a prediction that the
extreme will occur. It reveals what changes, what remains true, and where the
current model breaks.

## Method

1. State the claim or decision being tested.
2. Identify the few variables that plausibly drive the result. Keep units
   explicit.
3. Test each useful limit: near zero, one unit, 10x, 1000x, and effectively
   unbounded. Skip limits that add no information.
4. At each limit, identify what remains invariant, what changes linearly, what
   changes nonlinearly, and what fails first.
5. Locate breakpoints where the architecture, economics, organization, or user
   behavior must change.
6. Distinguish fundamental limits from limits caused by the current design.
7. Translate the result back to the present decision and choose one test near
   the closest meaningful breakpoint.

## Output

| Variable | Near zero | One unit | 10x | Extreme scale | First breakpoint |
| --- | --- | --- | --- | --- | --- |

Then provide:

- **Invariants:** truths that survive every useful limit.
- **False constraints:** limits caused by the current implementation.
- **Nonlinear risks:** effects that ordinary extrapolation misses.
- **Decision now:** what changes in the current plan.
- **Next test:** one experiment near a real breakpoint.

## Boundaries

- Do not extrapolate a linear trend through a discovered breakpoint.
- Do not mistake a mathematical limit for a reachable operating state.
- Preserve quality, safety, law, and customer outcome in every comparison.
- Use ranges when the governing relationship is uncertain.
