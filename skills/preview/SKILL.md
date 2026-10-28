---
name: preview
description: Start or reuse a local web development server, resolve its loopback URL, and open the live site in Codex for visual inspection. Use when the user asks to preview local website changes, open the current app, view a local build, or see what their edits look like.
---

# Preview

Make the current project's local website visible without deploying it.

## Preserve the project contract

- Work from the current project unless the user names another repository.
- Read the applicable repository instructions and documented development commands before starting anything.
- Do not edit application code merely to make a preview possible unless the user also asks for a fix.
- Never deploy, publish, promote, or expose the local server beyond loopback as part of a preview request.
- Do not stop or replace an unknown process occupying a port. Identify it first, then reuse it when it belongs to the current project or choose another supported port.
- Follow the repository's browser preference. When an authenticated session is required, use its configured browser harness rather than an anonymous browser.

## Start or reuse the preview

1. Inspect the nearest `package.json`, lockfile, workspace configuration, and project documentation. Prefer the project's own `dev`, `start`, or `preview` script and its matching package manager.
2. Check whether a healthy local server for this project is already running. Reuse it when its process, working directory, and HTTP response match the current app.
3. Otherwise start the documented command in a managed long-running terminal session so its output and session identifier remain available. Prefer a loopback host. Do not invent framework flags that the script may not support.
4. Poll the same terminal session until it reports readiness or a terminal error. Confirm the resolved URL with an HTTP request before claiming success.
5. If the repository is a monorepo, infer the intended app from the working directory and request. Ask only when multiple plausible apps remain and starting the wrong one would be materially misleading.

Dependency installation is allowed only when it is the project's normal preview prerequisite. Use the existing lockfile and package manager, preserve unrelated changes, and report any files the install changed.

## Show the site

- Open the confirmed local URL with the Codex browser panel when available. If it is unavailable, return the URL as a clickable link.
- Open the requested route when one was named; otherwise use the app's primary local route.
- Leave the server running so the preview updates with subsequent edits. Stop it only when the user asks or when the task no longer needs it.
- A preview request does not imply a design audit, screenshot sweep, code change, or production deployment. Perform those only when requested.

## Report the result

Lead with the working preview URL. Include whether the server was reused or started, the command used, and the managed terminal session identifier when one exists. If startup fails, report the concrete error and the smallest next action instead of claiming that a preview exists.
