---
name: idiot-index
description: "Decompose a product, service, component, or process into irreducible inputs and calculate cost-to-floor ratios to find the largest avoidable cost gaps. Use for margin analysis, cost reduction, vendor quotes, delivery economics, or questions about why something is expensive; not for generic personal budgeting."
---

# Idiot Index: Find Expensive Transformations

Use first-principles cost decomposition to find where design, coordination, or
production turns inexpensive inputs into an unnecessarily expensive output.

## Method

1. Define one output unit precisely. Examples: one delivered audit, one API
   request, one manufactured part, or one acquired customer.
2. Establish its current fully loaded cost. Include labor at a realistic time
   or replacement cost, compute, materials, fees, rework, and attributable
   overhead. Do not price founder labor at zero.
3. Estimate the irreducible input floor for the same quality, safety, and legal
   standard. Label every estimate and confidence level.
4. Calculate `index = current cost / input floor`. Also calculate the absolute
   gap, because a large ratio on a tiny cost may not matter.
5. Rank components by economic headroom: absolute gap first, ratio second.
6. For the top gap, identify whether the cause is design complexity, low volume,
   handoffs, waiting, rework, vendor margin, regulation, or a genuinely scarce
   input.
7. Propose the cheapest reversible test that could reduce or explain the gap.

## Output

| Component | Current cost | Input floor | Index | Gap | Confidence | Likely cause | Next test |
| --- | ---: | ---: | ---: | ---: | --- | --- | --- |

Then state:

- **Highest-leverage gap:** the one component worth attacking first.
- **Fundamental costs:** costs that cannot currently be engineered away.
- **Unknowns:** missing measurements that could change the ranking.
- **Next physical action:** one test, quote, measurement, or redesign.

## Boundaries

- A high index is a search signal, not proof of incompetence or price gouging.
- Do not compare selling price directly with raw inputs while ignoring labor,
  risk, support, distribution, intellectual property, or required margin.
- Preserve quality, safety, compliance, and customer outcome.
- If the whole part or process may be unnecessary, run `elon-algo` first. Do
  not optimize something that should be deleted.
