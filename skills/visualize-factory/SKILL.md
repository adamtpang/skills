---
name: visualize-factory
description: Visualize an existing production workflow and design its operating cadence around a target output, such as one essay shipped daily. Use when the user asks what their factory looks like or where throughput gets stuck.
---

# Visualize factory

Make the path from raw inputs to a delivered artifact visible and actionable.

Read project instructions, live handoffs, and the implementation behind the workflow. Follow relevant cross-repository connections read-only. Prefer actual code and dated receipts over older summaries. Do not mistake a button label or a generated URL for successful delivery.

Identify the output unit, intended recipient, cadence, and definition of shipped. State reasonable assumptions where the user has not specified them. Separate observed implementation, verified operations, proposed process, and unknowns. Never invent queue counts, throughput, working integrations, or publication receipts.

Map inputs → selection → transformation → quality gate → delivery → evidence → feedback. Adapt the stages to the actual system. For each stage name its owner, tool, output, and exit condition. Highlight one evidence-backed bottleneck, or label it a hypothesis if operational measurements are absent.

For a cadence target, propose a time budget, work-in-progress limit, reserve policy, and recovery rule. These are proposed operating parameters, not measured capacity. Preserve quality when shrinking scope. For personal writing, preserve the author's thesis and examples; distinguish researched additions from their own words and avoid exposing private notes.

Create a self-contained local HTML visualization when stage selection or scenario controls aid understanding; otherwise use Mermaid. Include accessible controls, responsive layout, an evidence legend, and useful stage details. Keep private source excerpts out of the visual. Save a compact Markdown operating contract alongside it so the process remains usable without the visual.

Include a clear next action and a receipt schema: artifact ID, title, delivery URL or path, delivery time and timezone, verification result, and source revision where available. A prepared artifact and a shipped artifact must remain distinct. The target metric counts distinct artifacts actually delivered in each cadence window.

Check the skill output against source evidence, validate interactive behavior where practical, and open the visualization for the user. Report limitations candidly. A visualization request does not itself authorize publication, paid services, or recurring automation; handle explicit scheduling requests through available automation tools and preserve existing authorization boundaries.
