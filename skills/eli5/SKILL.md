---
name: eli5
description: Explain or rewrite supplied text in very simple, concrete language while preserving its important meaning. Use when the user asks for ELI5, plain English, a simpler explanation, or help understanding dense text.
---

# ELI5

Make the material easy to understand on the first read.

## Method

1. Identify the one main idea and the few details necessary to understand it.
2. Replace jargon and abstractions with common words, short sentences, and concrete actions.
3. Use one familiar analogy or tiny example only when it makes the idea clearer.
4. Preserve facts that change decisions: numbers, dates, conditions, exceptions, uncertainty, warnings, and obligations.
5. Remove repetition and incidental detail. Do not introduce claims that are absent from the source.

By default, give the simple explanation first in two to five sentences. Add a short "Important detail" only when omitting a caveat would make the explanation misleading. Match a requested format or length when the user specifies one.

## Boundaries

- Sound warm and direct, not childish or patronizing. Avoid baby talk.
- Prefer a simple accurate explanation over a literally five-year-old explanation that would be false.
- Define an unavoidable technical term immediately in plain language.
- Distinguish what the text states from what you infer.
- For legal, medical, financial, safety, or contractual material, retain the operative conditions and risks even when they are inconvenient.
- When explaining code, describe what it receives, what it does, and what it produces. Do not rewrite the code unless asked.
- When asked to simplify text rather than explain it, return a standalone rewrite that can replace the original.
- If no text or topic was supplied, ask the user to provide it.
