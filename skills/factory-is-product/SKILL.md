---
name: factory-is-product
description: "Design or improve the production system that repeatedly delivers a product or service with predictable quality, cycle time, capacity, and cost. Use when prototypes work but delivery is slow, fragile, bespoke, expensive, or difficult to scale; not for ordinary product feature ideation."
---

# Factory Is The Product: Engineer Repeatable Delivery

Treat the delivery system as a product with its own inputs, interfaces, quality
bar, telemetry, and iteration loop.

## Method

1. Define one output unit and its customer-visible acceptance criteria.
2. Map the complete flow from demand to delivered outcome. Include queues,
   handoffs, approvals, rework, support, and payment.
3. Measure or estimate cycle time, touch time, wait time, first-pass yield,
   rework, throughput, capacity, and fully loaded cost per unit.
4. Identify the step that currently limits throughput or reliability.
5. Co-design the output and the production process. Change the deliverable when
   its shape makes reliable production unnecessarily hard.
6. Standardize stable interfaces, checklists, templates, reusable components,
   and acceptance tests.
7. Automate only steps that have repeated manually enough to reveal the real
   exceptions and failure modes.
8. Feed defects, customer feedback, and delivery economics into the next factory
   revision.

## Output

- **Output unit:** one precise delivered result.
- **Factory map:** ordered flow with queues and handoffs.
- **Current metrics:** cycle time, yield, throughput, capacity, and unit cost.
- **Constraint:** the one step setting system output.
- **Factory redesign:** changes to interfaces, tools, checks, and ownership.
- **Version plan:** manual v1, standardized v2, automated v3.
- **Next production run:** one real unit that tests the redesign.

## Boundaries

- A polished prototype is not a production system.
- Do not automate a process that has not produced successful manual units.
- Do not trade away the customer outcome, safety, or quality merely to raise
  throughput.
- Keep one accountable owner for every handoff and acceptance decision.
