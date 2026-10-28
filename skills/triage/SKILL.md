---
name: triage
description: Sweep the current conversation for unresolved problems, sort them on an Eisenhower urgency-vs-importance matrix, and work through the top items one at a time. Use whenever the user says "triage this chat," "what's outstanding," "what's left," "where are we," "what should I do next," "help me prioritize," "tackle the open issues," "clean this up," "I'm losing track," "list all the problems," or any variant of asking what hasn't been finished yet. Also use proactively at natural pause points in long sessions, after a major task completes, when several follow-ups have accumulated without being addressed, or when the user signals they want to wrap up. Trigger this skill even when the user doesn't explicitly say the word "triage." The skill is especially valuable in sprawling Claude Code sessions where multiple tasks, errors, and TODOs have piled up and the user has lost the thread.
---

# Triage

Triage takes a sprawling conversation and turns it into a prioritized, executable list. Three steps, in order:

1. **Sweep**, re-read the conversation and collect every unresolved problem.
2. **Rank**, sort items on an Eisenhower 2×2.
3. **Execute**, work the top items, one at a time, pausing between each.

That sequence is the whole skill. Each step is short, but doing them in order matters: if you skip the sweep you'll miss things; if you skip the rank you'll work in the wrong order; if you skip the pause you'll steamroll the user.

## Why this skill exists

Long sessions accumulate debris. The user mentions five things, you handle the loudest two, three more bubble up while you work, the original two get amended, a tool errors out and the error gets noted-not-fixed, the user goes for coffee, comes back, and now nobody, *especially* not the model, has a clean view of what's actually still on the table.

Triage is the reset. It pulls every loose end into one frame, ranks them so the user can see what matters, and starts moving through them in the right order. The user's time is the bottleneck; the skill spends a few hundred tokens producing structure so the next few thousand tokens land on the right work.

## Step 1, Sweep

Re-read the entire conversation top to bottom. You're looking for any of these patterns:

- **User-flagged problems.** "This doesn't work," "still broken," "fix this," "why is X happening." Explicit complaints.
- **User asks without a clean resolution.** A question was posed, you answered partially or deferred, the user moved on without confirming. The deferred part counts.
- **Assistant-flagged follow-ups.** Anywhere you wrote "TODO," "follow-up," "you might also want to," "consider doing X later," "I didn't do Y because Z." Those are debts you incurred on the user's behalf.
- **Tool errors that weren't followed up.** A `Bash` failure, a build error, a 404, a deploy warning. If the error scrolled past without being addressed, it goes on the list.
- **Pending decisions.** "We should pick A or B" that never resolved. "Let me know which approach" with no answer. Open forks.
- **Placeholders in shipped code.** `TODO:`, `PLACEHOLDER`, `XXX`, hardcoded values that were knowingly temporary, mock URLs, fake credentials. If they're in a file you wrote, they belong on the list.
- **Things the user explicitly deferred.** "Let's come back to this." "Not now." Those have to land on the schedule somewhere.

What does *not* go on the list:

- Things that were actually completed, even if they were complicated.
- Hypothetical concerns you raised that the user explicitly dismissed.
- Stylistic preferences the user said they don't care about.

The sweep is comprehensive on purpose. Better to overcollect and let prioritization filter than to silently drop items the user was tracking in their head.

## Step 2, Rank

Place every item on an Eisenhower 2×2:

|                       | **Urgent**                          | **Not urgent**                          |
| --------------------- | ----------------------------------- | --------------------------------------- |
| **Important**         | **Q1, Do now.** Blockers, in-flight bugs, ship-stoppers. | **Q2, Schedule.** Strategic work, deferred design decisions, technical debt with a known cost. |
| **Not important**     | **Q3, Delegate or defer.** Interrupt-driven tasks, small admin, things urgent only because someone is waiting. | **Q4, Drop.** Nice-to-haves, perfectionism, things that felt productive to mention but aren't worth doing. |

For each item, give:

- A short label (≤ 8 words) that names the thing
- The quadrant
- One sentence on *why* it landed there

The "why" is the load-bearing part. Two items can both be Q1, but if you've explained why, the user can disagree intelligently. Without the reasoning, your ranking is a black box and the user can't course-correct.

Be honest about Q4. The temptation is to put everything in Q1 or Q2 because dropping things feels like giving up. But Q4 is the most valuable quadrant, it's where time gets bought back. If an item belongs in Q4, say so and explain the trade-off.

## Step 3, Present

Output the triage in one message before doing any execution work. Use this exact shape:

```
**Triage, [N items]**

**🔴 Q1, Do now**
1. [label], [why]
2. [label], [why]

**🟡 Q2, Schedule**
3. [label], [why]
…

**🟢 Q3, Delegate or defer**
6. [label], [why]
…

**⚪ Q4, Drop (with reasoning)**
8. [label], [why drop]
…

**Plan:** I'll start with #1, report, then ask before #2. Tell me to skip, reorder, or add anything.
```

The numbering runs across all four quadrants. That gives the user a way to reference items ("skip 3 and 5") without having to repeat the labels.

Keep the labels short. The user is scanning. If they need detail they'll ask.

## Step 4, Execute, one at a time

After presenting the list, **pause for explicit user confirmation before starting item 1.** Even a one-word "go" is enough, but you wait for it. The user may want to reorder, add an item, or kill an item you mis-ranked. The pause exists for that.

Once confirmed, work item 1 to completion. Then:

1. Report what you did (one short paragraph, not a wall of text).
2. State what's next: "Item 2 is X, proceed?"
3. **Wait.**

This is the pattern through the whole list. The reason for the pause-between is twofold: the user may want to redirect after seeing the actual result of item 1, and a single ambiguous item handled wrong can poison the next two if you just barrel forward. Pausing is cheap; backing out is expensive.

If the user says "just do all of them" or "auto" or similar, switch to no-pause mode and report at the end. But don't *assume* that's what they want, they picked pause-between when setting up the skill for a reason.

## Edge cases

### No problems found

If the sweep genuinely turns up nothing, say so plainly and summarize what's been resolved in the session. Something like:

> **All clear.** Everything mentioned in this conversation looks resolved. Recent wins: [3 short bullets].

Don't manufacture items to triage. The "all clear" output is a real outcome and the user benefits from hearing it.

### User adds an item you missed

Insert it into the appropriate quadrant, re-show the affected lines (not the whole list), and continue. Don't re-print the entire triage unless they ask.

### User disagrees with your ranking

Re-rank the affected item, give your one-sentence justification for the new placement, and continue. Don't argue. The user has context you don't.

### User wants to skip the execution phase

Stop after the triage. Output should end with "Triage is yours, let me know which items you want me to take." The skill doesn't fail because the user only wanted the list.

### The conversation is genuinely huge

If the chat is long enough that you can't hold all of it confidently, say so. Triage what you can see, flag that earlier turns may have items you didn't include, and ask the user to point you at anything important you might've dropped. Don't pretend you have perfect recall, false confidence is worse than admitted limits.

## Tone

- **Concise.** This is structured output, not a memo. Short labels, short justifications.
- **Direct.** Don't soften with "perhaps we might consider." Just rank them.
- **Don't moralize.** No "great progress so far!" preamble. Get to the list.
- **Match the conversation's register.** If the chat has been casual, the triage can be casual. If it's been technical and formal, match that. The skill is a tool, not a personality.

## Examples

### Example 1, Mid-deploy session, lots of debris

**Conversation context:** User has been deploying a marketing site. They've pushed code, hit a CI failure, fixed it, pushed again, redirected a custom domain, noticed the OG image is broken, asked about analytics setup, and tangentially complained that the README is out of date.

**Triage output:**

```
**Triage, 6 items**

**🔴 Q1, Do now**
1. OG image returns 404, visible to anyone sharing the URL right now.
2. Domain redirect 302 → 301, SEO leak is bleeding link equity each day.

**🟡 Q2, Schedule**
3. Set up analytics, important for launch metrics; not blocking.
4. Refresh the README, onboarding friction for anyone new to the repo.

**🟢 Q3, Delegate or defer**
5. CI failure root-cause writeup, useful for the team but not a blocker now that the build is green.

**⚪ Q4, Drop**
6. Switch from Tailwind to vanilla CSS, raised in passing; no concrete payoff identified.

**Plan:** I'll start with #1 (fix the OG image), report, then ask before #2.
```

### Example 2, Conversation ends cleanly

**Conversation context:** User asked a tightly-scoped question, got an answer, confirmed it worked, said thanks.

**Triage output:**

```
**All clear.** Nothing unresolved in this conversation.

Recent wins:
- Identified the root cause of the timezone bug (`Date` parsing in non-UTC env).
- Patched `formatDate()` and confirmed the test suite passes.
- Cleaned up two unused imports flagged by the linter while you were in there.

If you want me to look at something else, name it.
```

### Example 3, User redirects mid-execution

**Conversation context:** Skill has triaged 5 items, started item 1 (OG image fix), is mid-way through. User cuts in: "actually skip the OG image, the link previews don't matter for this launch. do #2 first."

**Skill's next message:**

```
Switching off #1. New order:

1. ~~OG image~~ (skipped)
2. → Domain redirect 302 → 301 (starting now)
3. Set up analytics
4. Refresh the README
5. CI failure writeup
6. ~~Tailwind → vanilla~~ (still in Q4)

Going to do #2.
```

Short. No "great, I'll get right on that!" preamble. Acknowledges the change and moves on.

## A note on this skill's relationship with TodoWrite

If `TodoWrite` is available in the session, mirror the Q1 + Q2 items into the todo list as you produce the triage. That gives the user a persistent UI surface for the items even after this message scrolls. Q3 and Q4 items don't need to be in the todo list, those are decisions about *not* doing things, not work to track.

If `TodoWrite` isn't available, the triage output in the message is the whole interface. That's fine. Don't make the skill depend on tools that might not be there.
