---
name: magic-wand-number
description: "Calculate a defensible theoretical floor or ceiling for a system, compare it with current performance, and size the true improvement headroom. Use before optimizing cost, speed, capacity, conversion, reliability, or resource use; not as a forecast or permission to ignore hard constraints."
---

# Magic Wand Number: Size Theoretical Headroom

Find the best physically, legally, and contractually possible result if avoidable
transformation losses temporarily disappeared. The result is a direction and a
gap, not a promised target.

## Method

1. Name one metric and direction: minimum cost, minimum cycle time, maximum
   capacity, maximum conversion, or maximum reliability.
2. Define the output unit and quality bar so the current and ideal cases are
   comparable.
3. Separate fixed constraints from contingent ones. Fixed means physics, law,
   safety, or an explicit contract. Tradition, current tooling, org boundaries,
   and vendor habits are contingent until proven otherwise.
4. Set avoidable transformation loss to zero and calculate the theoretical
   floor or ceiling from the fixed constraints.
5. Compare current performance with the ideal using both absolute and relative
   gaps.
6. Decompose the gap into known losses, estimated losses, and unexplained loss.
7. Choose an intermediate milestone that captures meaningful headroom without
   pretending perfection is immediately reachable.

## Output

- **Metric and unit:** what is being optimized.
- **Current number:** measured, with date and source.
- **Magic-wand number:** calculation and fixed assumptions.
- **Headroom:** absolute gap and improvement multiple.
- **Gap ledger:** each loss source, size, confidence, and whether it is fixed.
- **Next milestone:** a defensible step between current and ideal.
- **Next test:** the cheapest way to challenge the largest contingent loss.

## Boundaries

- Never present the theoretical number as a forecast, deadline, or customer
  promise.
- Do not remove safety, legal, quality, or human constraints merely to improve
  the number.
- If inputs are too uncertain, return a range and name the measurement needed.
- Use `idiot-index` when the next question is which component creates the cost
  gap. Use `think-in-limits` when the next question is how the system behaves at
  extreme scale.
