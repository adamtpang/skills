---
name: startup-idea-evaluator
description: Evaluate a startup or business idea as a potential good quest using impact, problem quality, market growth, willingness to pay, novelty, utility delta, timing, and founder-problem fit. Use when a user asks whether to build, fund, pursue, compare, or improve a startup idea.
---

# Startup Idea Evaluator

Evaluate whether an idea deserves years of a founder's life. Be rigorous and specific; do not confuse an attractive market with a worthy problem or a founder's enthusiasm with earned fit.

## Intake

Extract what is known. Before a final verdict, ask only the missing questions that materially change the result:

1. What precise user has the problem, how often, and what do they do today?
2. What personal experience, access, technical edge, or repeated observation gives the founder non-obvious insight? Why them?
3. Why is this newly feasible now? Name the technology, cost, regulation, distribution change, or market shift.
4. What is the proposed intervention and measurable before/after state?
5. Who pays, what budget does it replace or unlock, and what proof exists that they will pay?

Do not issue a final score if founder fit, customer, or the status quo is unknown. Give a provisional range and a validation plan instead.

## Evaluation

Read [the scorecard](references/scorecard.md). Score each dimension from 0 to 5 using evidence, then calculate the weighted total out of 100. Label every claim as one of: `evidenced`, `inferred`, `founder claim`, or `unknown`.

Apply these gates before recommending the idea:

- **Good-quest gate:** the outcome is materially net-positive, and the problem has meaningful scale or severity.
- **Utility gate:** the proposed solution has a credible, measurable advantage over the state of the art. A feature without a step-change is not enough.
- **Founder-fit gate:** identify the specific earned insight or access. Passion alone is not fit.
- **Why-now gate:** name the changed condition. "AI exists" is not a sufficient answer.

If a gate fails, say so plainly. Recommend killing, narrowing, or investigating the idea instead of manufacturing optimism.

## Output

Return this structure:

```markdown
# [Idea], [Pursue / Validate / Narrow / Pass]

**Thesis:** one sentence on the opportunity.

| Dimension | Score | Weight | Evidence | Judgment |
| --- | ---: | ---: | --- | --- |
| ... | ... | ... | ... | ... |

**Weighted score:** NN/100 (`provisional` when key inputs are unknown)

## The problem
- Affected people, frequency, severity, and current workaround.
- Why the problem is important rather than merely convenient.

## The delta
- State of the art.
- Proposed before/after improvement and how to measure it.

## Why this founder, why now
- Earned founder-problem fit and the missing proof.
- Specific timing catalyst and its expiry/risk.

## Market and capital
- Buyer, budget, market growth, pricing power, and credible comparables.

## Risks and disconfirming evidence
- Three ways the thesis could be false.

## Next 30 days
1. The fastest falsifiable test.
2. The one person or dataset to contact.
3. The threshold that changes the recommendation to pass.
```

When comparing ideas, score them on the same evidence standard, rank them, and state which one best matches the founder rather than selecting only the biggest market.
