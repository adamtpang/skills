---
name: codex-cloud-ready
description: Prepare an existing repository for Codex Cloud by auditing local dependencies, producing reproducible setup and a safe task handoff, and verifying a fresh cloud workspace when authorized. Use for moving repository work off a laptop, not website deployment or migrating an existing chat's history.
---

# Codex Cloud Ready

Make a project's selected workflow reproducible away from the user's computer.
A project can remain usable locally and gain a cloud environment. Do not treat
this as deployment to production or conversion of an existing local chat.

## Set the scope and check current support

Use the repository and workflow the user named. If none is named, use the current
repository. For a mixed project, identify which work can run remotely and which
must stay local. Ask only when choosing that boundary would change the request.

Before giving cloud setup instructions, search and open current official OpenAI
documentation. Start with [cloud environments](https://learn.chatgpt.com/docs/environments/cloud-environments)
and consult [environment modes](https://learn.chatgpt.com/docs/environments/modes)
or [handoff support](https://learn.chatgpt.com/docs/remote-connections) as needed.
Record the checked date. Do not assume UI labels, platform capabilities, resource
limits, availability, or account access from this skill alone. If documentation
is unavailable, continue local preparation and mark cloud setup unverified.

An audit request is read-only. A preparation request permits scoped repository
edits and safe checks, not an implicit push, deployment, account connection,
credential upload, environment publication, paid service, or new cloud task.
Obtain missing authorization immediately before those external actions.

## Inspect the actual project

Read repository policy and current handoffs. Check Git status, the selected
revision, relevant uncommitted changes, manifests, lockfiles, CI configuration,
and existing installation, startup, build, and test commands.

Prefer targeted file searches. Inspect source and examples, not real credential
files, whole home directories, raw transcripts, or environment-variable values.
List required configuration keys and their purpose without reading their values.

For each selected workflow, identify evidence for:

- runtimes, native packages, package registries, and reproducible install commands;
- required services, databases, generated assets, data fixtures, and network hosts;
- absolute paths, Windows commands, desktop apps, local browser sessions, GPUs,
  localhost services, and assumptions about the user's home directory;
- skills, MCP servers, plugins, hooks, and tools the workflow actually requires.

A local service at localhost does not become a reachable service in the cloud.
Local skills, MCP configuration, credentials, and browser sign-ins are not an
automatic migration bundle. Carry over only the required portable capabilities
through mechanisms confirmed for the selected environment. Do not copy personal
configs wholesale or silently replace a required integration with a mock.

Check what is reachable through the selected remote revision. A successful local
test using untracked, ignored, or unpushed files does not prove the cloud checkout
has those files. Never commit or push the user's work just to clear this check.

## Prepare the smallest useful changes

Reuse existing package managers, lockfiles, CI commands, and setup scripts.
Install only dependencies needed for the chosen workflow. Avoid adding Docker,
another package manager, or a new orchestration layer unless it solves an actual
requirement. Keep Windows-only features intact when portable work can be isolated.

When preparation is requested, add or update only missing reproducible setup,
startup instructions, safe configuration examples, and relevant project policy.
Use the host's normal file-editing tools. Preserve unrelated changes and existing
permissions. Reruns should reuse these artifacts, not generate parallel copies.

Review setup and test commands before running them. An installer that edits user
hooks, settings, startup tasks, or home-directory state is not a safe dependency
installer. Use an isolated environment and verify its actual paths; changing
HOME alone does not reliably isolate a Windows program's home directory.

Use synthetic fixtures for local data. Keep secret values out of generated files,
logs, prompts, commits, and scripts. Describe the required secret names and
destinations for the user to configure through the current cloud secret controls.
Do not weaken permissions or allow unrestricted network access as a blanket fix.

## Produce a safe handoff

Return a compact readiness report and a copy-ready cloud task prompt containing:

- the selected workflow, objective, and explicit exclusions;
- the revision or branch and any changes not yet reachable remotely;
- installation, startup, build, and test commands, with their working directories;
- required configuration keys, network destinations, and relevant portable tools;
- observed checks, failures, decisions, and the next concrete action.

Use repository-relative paths. Keep local-only personal findings in a private
artifact outside published or tracked directories. Do not export conversation
history or include secrets, personal paths, account details, or unrelated projects
in reusable/public skill material. Do not overwrite an existing private handoff.

## Create and verify the cloud environment

If authorized and supported controls are available, use the current Codex Cloud
environment flow to select the repository, prepare dependencies, test setup, and
review access before publishing. Otherwise provide exact user steps and the
copy-ready setup prompt, then stop at the missing UI action or approval.
Do not invent an environment-creation API or use local environment configuration
as proof that a hosted environment exists.

After publication, start a fresh cloud task only when authorized. Verify the
expected revision and tools, run the agreed checks there, and report unsupported
features separately. Local Windows checks do not prove hosted runtime compatibility.

Use these evidence labels independently:

- **Audited:** repository evidence and blockers recorded.
- **Prepared locally:** required artifacts exist; state which local checks ran.
- **Published:** the environment reports successful publication.
- **Cloud verified:** agreed checks passed in a fresh task in that environment.

Partial readiness is valid. Report the workflow that is ready, unresolved blockers,
and the smallest remaining user action. Do not label the entire project cloud
verified when only its portable tests passed locally.
