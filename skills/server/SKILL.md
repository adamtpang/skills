---
name: server
description: Restore, start, or reuse a local development server for the current project, recover safely from stale same-project processes or locks, verify HTTP readiness, and report the working URL. Use when the user says the app or localhost is down, asks to start, restart, run, serve, or preview it locally, or invokes $server.
---

# Server

Get the current project's local app back up, prove it is reachable, and leave the intended server running.

## Procedure

1. Read the repository instructions and the project manifest before choosing a command. Respect `AGENTS.md`, `CLAUDE.md`, framework documentation required by the repository, and any documented port.
2. Identify the runtime and package manager from lockfiles and manifests. Prefer the project's existing development script (`dev`, then `start`) over an invented command.
3. Inspect the preferred port before starting anything. Determine the listening process, command line, and working project when possible.
4. Request the expected local URL. Reuse the process only when it is healthy and belongs to this project.
5. If this project's process owns the port but is unhealthy, capture the useful error or log tail, stop only that exact process, wait for the port to clear, and restart once.
6. If no matching process exists, remove a stale runtime lock only after verifying its resolved path is inside this project and no live project server owns it. Remove the lock, not the build cache or its parent directory.
7. If another project owns the preferred port, leave it untouched. Choose the next available sensible port and pass it using the framework's supported syntax.
8. Start the server in a persistent terminal or PTY. On Windows, use `-WindowStyle Hidden` for a detached `Start-Process` helper and keep its logs and PID discoverable.
9. Watch startup output for the actual URL and fatal errors. Do not treat a spawned process or listening socket as proof of readiness.
10. Request a lightweight health endpoint when one exists, then request the user-facing route. Accept expected redirects or deliberate authentication responses, but investigate connection failures and server errors.
11. Report the project, command, URL, and whether the server was reused, recovered, or started. Include the process or terminal session identifier when available.

## Recovery Order

Use the smallest recovery that restores service:

1. Reuse a healthy same-project server.
2. Resume or restart an unhealthy same-project server.
3. Clear a verified stale lock and start normally.
4. Use another port only when the preferred port belongs to an unrelated healthy process.

Do not delete `.next`, `node_modules`, lockfiles, virtual environments, caches, databases, or user data as a generic server fix. A clean rebuild or dependency install requires evidence that it addresses the observed failure.

## Command Selection

- For JavaScript projects, infer `pnpm`, `yarn`, `npm`, or `bun` from the lockfile. Run the matching package script.
- For Next.js, prefer the repository's `dev` script. Use the script's supported port argument when the default is occupied.
- For Vite and similar tools, pass the port after the package runner's argument separator when required.
- For Python, Ruby, Go, Rust, or other stacks, follow the checked-in development documentation and manifest instead of assuming a generic static server.
- Do not install dependencies unless they are missing and installation is necessary. Explain the installation before running it.

## Process Safety

- Never kill, restart, or replace an unrelated process just to reclaim a port.
- Never launch a duplicate server when the same project already has a healthy instance.
- If startup fails, stop only the process started by this invocation before retrying.
- Limit automatic recovery to one same-port restart and one justified alternate-port attempt. Surface the blocking error instead of looping.
- If the user asks to stop a server, identify the exact project process before terminating it.
- Leave a successful server running unless the user explicitly asks for a one-shot check.

## Verification

Use both process output and an HTTP request. Check a lightweight health endpoint when the project defines one; otherwise request `/`. For authenticated applications, an expected `2xx`, `3xx`, or deliberate `401`/`403` can establish readiness. A listening socket alone is insufficient.

If the application cannot become ready, report the blocking error and the last command attempted. Never claim a URL works without testing it.
