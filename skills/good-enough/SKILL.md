---
name: good-enough
description: Decide whether a result, option, plan, or implementation meets its real acceptance bar and whether further iteration is worth the cost. Use when asked if something is good enough, ready, acceptable, or shippable, or when deciding whether to stop iterating; never use it to waive explicit safety, legal, security, or correctness requirements.
---

# Good Enough

Give a decisive, evidence-backed stopping judgment. "Good enough" means the
smallest result that achieves the intended outcome without a known unacceptable
risk. It does not mean mediocre, merely available, or easiest to justify.

## Establish the real bar

- Identify the intended outcome and the user's explicit constraints.
- Separate **must-haves** from preferences and optional polish. Do not quietly
  weaken a stated requirement to make the current result pass.
- When no acceptance bar is stated, infer the narrowest reasonable bar from the
  task and name any assumption that could change the verdict.
- Judge observed behavior and current evidence, not effort spent, optimism, or
  the number of alternatives explored.
- For high-stakes or irreversible work, apply the relevant professional or
  project standard. Uncertainty about a material risk is a reason to verify, not
  a reason to declare success.

## Return one verdict

Choose exactly one:

- **GOOD ENOUGH**, the core outcome works, every must-have passes, no known
  high-severity blocker remains, and further work is mostly preference or polish.
- **ONE MORE PASS**, the result is close, but a small number of bounded gaps
  still affect the outcome. Specify the smallest pass that would clear them.
- **NOT GOOD ENOUGH**, the core outcome, an explicit must-have, or an acceptable
  risk threshold fails. Name the blocker and the shortest credible route forward.

Do not average away a failed must-have because several other criteria pass.

## Apply the stopping rule

Once the verdict is `GOOD ENOUGH`, stop generating more variants by default.
Recommend the strongest satisfactory option and the next commitment step.
Continue iterating only when another pass is likely to:

- clear a failed must-have;
- materially reduce cost or consequential risk;
- improve the primary outcome enough to justify the added time and complexity;
  or
- incorporate genuinely new information from the user.

When several options clear the bar, prefer the simpler, cheaper, and more
reversible choice unless a competing option has a meaningful outcome advantage.
Ignore sunk cost. Treat attention and decision fatigue as real costs.

Calling something good enough is a recommendation, not authorization for a
purchase, deletion, publication, deployment, external communication, or other
consequential action.

## Present the judgment

Lead with the verdict, then give only what supports the decision:

1. **Bar:** the must-haves used.
2. **Evidence:** what passes or fails.
3. **Tradeoffs:** remaining imperfections that are consciously accepted.
4. **Next action:** stop and commit, perform one bounded pass, or resolve the
   named blocker.

Keep the response compact. Do not append a generic improvement backlog after a
`GOOD ENOUGH` verdict; mention a remaining issue only if it could later change
the decision.
