---
name: shapeable
description: Audit and improve an authorized website or interface through Shapeable's evidence-backed scan, cure, and identical-rescan loop. Use when the user invokes $shapeable, asks for a Shapeable audit, wants to perfect a site's design or UX, or wants measured design findings instead of subjective polish.
---

# Shapeable

Use Shapeable to make the intended task clearer, easier, more accessible, and more coherent. Do not make every product look like `shapeable.art`.

## Establish the contract

- Confirm that the user owns or is authorized to audit the target.
- Treat an audit as read-only. Apply a cure only when the user has authorized changes to that repository or interface.
- Read the target's live instructions, brand, design system, and product purpose before recommending visual changes.
- Name one site-specific visual direction or prior-art reference. Preserve the product's identity rather than copying proprietary assets.

## Collect evidence

For an authorized public HTTPS page, prefer Shapeable's current public audit at `https://shapeable.art` or `POST https://shapeable.art/api/audit` with `{ "url": "https://example.com" }`. The result is a versioned surface audit, not a complete UX score.

For private, authenticated, or local interfaces, never upload the page to the public auditor. Use the available browser harness and repository evidence instead. Capture the real primary task at minimum at:

- mobile: 390 by 844
- desktop: 1440 by 900
- keyboard and visible-focus traversal
- reduced-motion behavior
- loading, success, empty, error, and recovery states that matter to the primary task

Record unavailable evidence as `unmeasured`, never as a failure or an inferred pass.

## Diagnose outcomes

Evaluate the interface through Shapeable's eight outcome pillars:

1. Purpose and task success
2. Perception and accessibility
3. Comprehension and information architecture
4. Interaction, feedback, and recovery
5. Responsive resilience and performance
6. Visual hierarchy and legibility
7. System coherence and craftsmanship
8. Trust, honesty, and identity

Every finding must contain the observation, user impact, affected state or selector, severity, confidence, principle, and measured evidence when available. Separate automated evidence, human judgment, and observed user behavior.

## Write and apply the cure

- Order findings by blockage and leverage, not aesthetic novelty.
- Prefer the smallest correct change that improves the primary task.
- Preserve auth, privacy, safety boundaries, truthful content, and rollback.
- Include explicit acceptance checks and the exact viewport and state matrix for verification.
- Never chase a numeric score by weakening the product or adding decorative clutter.
- Treat "perfect" as the strongest context-appropriate result supported by the declared evidence. A score of 100 only means that one declared profile passed.

After authorized implementation, repeat the identical evidence matrix and report before-and-after deltas, regressions, unmeasured areas, and any judgment that still requires the owner.

## Canonical sources

- Public boundary: `https://shapeable.art/llms.txt`
- Public method: `https://shapeable.art`
- When the local Shapeable repository is available, read its current `README.md`, `AUDIT_MODEL.md`, and `SCORING.md` rather than relying on remembered thresholds.
