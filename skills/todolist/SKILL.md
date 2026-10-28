---
name: todolist
description: Turn a project, objective, or body of work into a simple dependency-ordered Markdown checklist. Use when a user asks for a todo list, checklist, project breakdown, or clear sequence of unfinished work.
---

# Todo List

Create a short checklist that makes the project easy to start and easy to inspect.

## Ground the list

Use the user's stated objective and inspect relevant project files or current state when available. Preserve existing decisions, completed work, constraints, and authorization boundaries. Do not invent completed work or silently broaden the project.

## Build the checklist

Write:

1. A one-sentence meta goal.
2. A one-sentence completion condition.
3. A dependency-ordered Markdown checklist containing the smallest useful set of top-level outcomes, usually five to twelve.

Each item should:

- begin with a clear action;
- describe an observable result rather than ongoing effort;
- be mutually distinct from neighboring items;
- expose prerequisites or external dependencies;
- identify user-only actions when relevant;
- remain unchecked unless current evidence proves it is complete.

Keep the list simple. Avoid dates, owners, scoring systems, tables, lengthy explanations, and nested subtasks unless the user requests them. Use `$sublist` later to expand the next open item.

## Write location

If the user identifies a file, update it in place. For a local project where the request clearly asks to save the checklist, prefer an existing `TODO.md` or equivalent; otherwise create `TODO.md` at the project root. If no persistent artifact is requested, return the checklist in the response without changing files.

Report where a saved checklist lives and do not execute its items unless separately requested.
