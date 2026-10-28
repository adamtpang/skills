---
name: platonic-ideal
description: Derive the simplest, hard-to-vary perfect form of a project by identifying its irreducible purpose, causal mechanism, boundaries, and deletion list. Use when asked for a project's Platonic ideal, perfect version, north star, what it is or is not, first-principles simplification, or what should be removed. Do not use for ordinary implementation planning or generic brainstorming unless the user first wants the project's defining theory clarified.
---

# Platonic Ideal

Find the version of the project whose parts feel inevitable because each one follows from the purpose and real constraints. Perfection here means explanatory compression, not maximal features, polish, or personal taste.

An ideal is **hard to vary** when its important details cannot be changed independently without weakening the causal explanation for why the project works. If a feature, role, metric, screen, or process can be swapped arbitrarily while the theory remains intact, it is probably incidental and should be removed from the ideal.

## Posture

Be opinionated and declarative. Pontificate only after reading the available evidence. Challenge inherited requirements, euphemisms, copied category conventions, and complexity justified by its own existence. Name the project that should exist, and name the tempting adjacent projects it must refuse to become.

Do not confuse simplicity with minimal surface area. A rocket can contain many necessary parts. The goal is to delete arbitrary parts until the remaining system is the smallest complete mechanism that produces the outcome.

## Establish reality first

Read the project's source-of-truth documents, current product behavior, evidence, constraints, and relevant user feedback before deriving the ideal. Prefer observed behavior and receipts over aspirational copy. Use current peer research when the user asks for comparison or when category conventions materially affect the thesis.

Identify:

- the exact person or system served;
- the irreversible outcome the project exists to create;
- the unit of value delivered;
- the physical, economic, behavioral, legal, and authority constraints;
- the current mechanism and where it fails;
- the binding constraint now, without mistaking it for the timeless purpose.

If the evidence is missing, state the assumption that carries the most weight. Do not fabricate certainty.

## Derive the ideal

1. Compress the purpose into one sentence with a subject, transformation, and proof.
2. Trace the shortest causal chain from user action to verified outcome.
3. Name the few objects, roles, or stages without which that chain breaks.
4. Apply the hard-to-vary test to each detail: explain why it must be this way, or delete/demote it.
5. Apply deletion before optimization:
   - question every requirement and name its source;
   - delete parts and process steps;
   - simplify what survives;
   - shorten the feedback cycle;
   - automate only after the mechanism is correct.
6. Define the negative space. State what the project is not, including plausible products it could drift into.
7. Define proof. Name observable results that would confirm the theory and evidence that would falsify it.

Search peers for invariants, not skins. Borrow a competitor's choice only when the same causal reason applies. A copied feature without the originating constraint is cargo culting.

## Tests

An answer is not finished until it passes these tests:

- **Causal:** every core part connects to the outcome through an explicit because-chain.
- **Hard to vary:** changing a core detail would require changing the project's purpose or constraints.
- **Deletion:** removing a proposed part would measurably damage the outcome; otherwise remove it.
- **Compression:** the project can be explained in one sentence, one loop, and one page without contradiction.
- **Boundary:** the `is not` section prevents the most likely forms of product drift.
- **Reality:** claimed progress and value can be verified from evidence rather than activity theater.
- **Human:** the ideal reduces the user's burden or increases their agency instead of moving complexity onto them.

## Output

Use the smallest structure that makes the theory clear. Usually include:

### The Platonic ideal

One memorable sentence. Then a short description of the perfect end-to-end experience.

### The inevitable loop

Show the irreducible sequence from input to verified outcome. Keep one primary loop. Secondary loops must support it.

### Why it is hard to vary

For each indispensable element, state the causal reason it exists and what breaks if it changes. Do not defend incidental implementation choices.

### What it is

A short set of affirmative identity statements.

### What it is not

A sharper set of exclusions aimed at likely drift, not absurd straw men.

### Delete until this remains

Name features, layers, metrics, roles, steps, or language that should disappear or be demoted. Separate timeless deletions from items that are merely premature.

### Proof and falsifiers

Name the smallest receipts that prove the ideal works, plus the evidence that would force the theory to change.

### Gap from today

When current project evidence is available, identify the few differences between today's project and the ideal. Rank the binding difference first. Do not turn this into an implementation plan unless the user asks.

## Scope and edits

The default deliverable is analysis. Modify project files, strategy documents, or product code only when the user asks for those changes. When asked to write the ideal into a repository, update the existing north-star or product source of truth rather than creating a competing doctrine file, unless no such source exists.
