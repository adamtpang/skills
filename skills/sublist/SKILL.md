---
name: sublist
description: Take the first unchecked top-level item in the active Markdown todo list and turn it into its own short, dependency-ordered todo list. Use when a user wants a focused checklist for what is currently first.
---

# Sublist

Turn the top open todo into a separate focused checklist with clear finish lines and fast feedback.

## Select the target

Use the checklist or file the user identifies. If none is named, use the todo list most directly associated with the current task.

Select the first unchecked top-level item:

1. Ignore completed top-level items.
2. Do not descend into existing child items.
3. Treat the selected top-level item as the complete objective for the new sublist.

Respect an item the user explicitly selects even if it is not first. Ask a question only when multiple plausible lists would produce materially different work and context cannot resolve the choice.

## Create its own todo list

Write a standalone Markdown checklist for the selected item, not a nested fragment of the parent list. Include:

1. A one-sentence goal naming the selected parent outcome.
2. A one-sentence completion condition.
3. The smallest complete set of unchecked tasks that makes progress observable, usually four to ten items, ordered by real dependency.

Each task should:

- produce a concrete output or observable state;
- have an unambiguous completion test;
- be narrow enough for focused execution, preferably 20 to 90 minutes when the work permits;
- state a verb and object;
- preserve necessary research, validation, safety, or user-only actions;
- connect directly to completing the selected top-level item.

Do not copy unrelated parent-list items into the sublist. Do not mark new tasks complete, execute them, or expand them another level unless the user asks.

When useful, add one short completion signal beneath the children. Do not turn a simple item into ceremony or manufacture substeps that add no decision value.

## Write location

If the user asks to save the sublist, create or update the identified sublist file without replacing or nesting it into the master todo list. Otherwise return the standalone sublist in the response without changing files.

Report which top-level item was expanded and where the sublist was saved, if applicable.
