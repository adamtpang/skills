---
name: auto-prompt
description: Toggle auto-prompt mode for Claude Code. When on, Claude keeps taking its own best next step at the end of each reply instead of waiting for you to accept a suggested prompt with Tab and Enter. Use when the user types /auto-prompt on, /auto-prompt off, /auto-prompt status, or asks to turn auto-prompt or auto-continue mode on or off. Capped per session; ends on AUTO-PROMPT: DONE; tool permissions still apply.
---

# Auto-prompt mode

A Stop hook at `~/.claude/hooks/auto-prompt.js` checks for the toggle file
`~/.claude/auto-prompt.on`. When it exists, the hook blocks the stop and hands
Claude the instruction to take its single best next step, up to the cap in the
file (default 8 steps per session). Claude ends the loop by finishing a reply
with the line `AUTO-PROMPT: DONE`, or you end it by removing the file.

## Commands

Interpret the argument and run exactly one of these, then confirm the state in
one line.

- `on` or `on <n>`: create the toggle with the cap (default 8).

```bash
printf '8' > ~/.claude/auto-prompt.on
```

- `off`: remove the toggle. Also clear per-session counters.

```bash
rm -f ~/.claude/auto-prompt.on ~/.claude/auto-prompt/*.count
```

- `status`: report on or off and the cap.

```bash
if [ -f ~/.claude/auto-prompt.on ]; then echo "auto-prompt ON, cap $(cat ~/.claude/auto-prompt.on)"; else echo "auto-prompt OFF"; fi
```

## Rules while the mode is on

- Take the next step you would have suggested; do not ask "want me to".
- Stop with `AUTO-PROMPT: DONE` when nothing worth doing remains, or when the
  next step needs a decision only the user can make (spending, sending,
  deleting, anything irreversible or outward-facing).
- Tool permissions and the permission mode are unchanged. This removes a
  keypress, never a permission prompt.
- This is Claude Code only. Codex has no stop hook, so there is no equivalent
  toggle there.
