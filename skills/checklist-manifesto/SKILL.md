---
name: checklist-manifesto
description: Turn a goal, plan, or strategy into a brief operating manifesto and a dependency-ordered checklist with observable completion conditions. Use when the user wants action without dates, calendar plans, or narrative scheduling.
---

# Checklist Manifesto

Convert a body of intent into a standard for action and a checklist that can be completed without rereading the source material.

## Ground the work

Use the user's stated objective and the relevant conversation, research, or project files. Preserve established decisions, completed work, constraints, privacy rules, and authorization boundaries. Do not invent facts, completed work, or permission for external actions.

If current state matters, inspect it before writing. Research only when the user requests it or when a required fact is materially uncertain and time-sensitive.

## Write the manifesto

Begin with `**Manifesto**` and write:

- one sentence stating the mission;
- three to seven terse commitments that resolve the important tradeoffs;
- concrete language about what the work is and is not.

The manifesto is an operating doctrine, not motivational prose. Each commitment should change a decision, standard, or behavior. Remove slogans that do not affect execution.

## Define completion

Add `**Done When**` followed by one sentence describing the observable end state. Do not substitute effort, activity, or a date for completion.

## Build the checklist

Add `**Checklist**` and write a dependency-ordered Markdown checklist containing the smallest useful set of outcomes, usually five to fifteen top-level items.

Each item must:

- begin with a verb;
- produce an observable result;
- be binary enough to check honestly;
- expose prerequisites or external dependencies;
- identify human-only actions when approval, communication, publication, payment, or another consequential external action is required;
- remain unchecked unless current evidence proves it is complete.

Prefer one level of checklist items. Add nested items only when a top-level outcome would otherwise hide multiple independently verifiable requirements.

## Constraints

- Do not add dates, days, weeks, calendars, schedules, time blocks, or time estimates unless the user explicitly asks for them.
- Do not add owners, priority scores, tables, streaks, or gamification unless requested.
- Do not execute checklist items unless the user separately asks for implementation.
- Do not turn human relationships into automated outreach. Mark person-to-person communication as a human-only action when relevant.
- Do not repeat the source plan as prose after the checklist.
- Use no em dashes.

If the user names a file, update that file. If the user explicitly asks to save the result without naming a file, choose the project's existing checklist or planning file when one clearly fits; otherwise create `CHECKLIST.md` at the project root. If persistence is not requested, return the result without changing project files.
