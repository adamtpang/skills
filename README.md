# Claude Code skills

Skills I use every day with [Claude Code](https://claude.com/claude-code), shared for friends.
Each folder is one skill: a `SKILL.md` plus any files it needs.

## Install

Copy any skill folder into `~/.claude/skills/`, then start a new Claude Code session.

```bash
git clone https://github.com/adamtpang/skills
cp -r skills/skills/sync ~/.claude/skills/
```

Type `/` in Claude Code to see it, or just describe the task and Claude picks the skill.

## Start here: sync

[sync](skills/sync) keeps Claude, Codex and Grok in step. When one agent hits its usage
limit, run `/sync` in the next one and it picks up exactly where the last stopped:
transcripts, new skills, skill updates, and threads that were cut off. Needs Node 18+.
See its SKILL.md for setup.

## All skills

| Skill | What it does |
| --- | --- |
| [1000-pots](skills/1000-pots) | Turn a project into a fast cycle of small completed artifacts and periodic curation. |
| [asap](skills/asap) | Use when the user invokes /asap, asap, speed mode, go fast, urgent execution, or wants the fastest safe path through a goal as a simple checklist. |
| [auto-prompt](skills/auto-prompt) | Toggle auto-prompt mode for Claude Code. |
| [beautify](skills/beautify) | Make an existing project's UI beautiful by starting from real prior art instead of a blank canvas. |
| [calendar-stage](skills/calendar-stage) | Recommend the publishing venue, artifact format, exact next time slot, and repeat cadence for an artifact. |
| [check-work](skills/check-work) | Check your work with a verification subagent that reviews diffs, runs builds and tests, and evaluates correctness. |
| [checklist-manifesto](skills/checklist-manifesto) | Turn a goal, plan, or strategy into a brief operating manifesto and a dependency-ordered checklist with observable completion conditions. |
| [codex-cloud-ready](skills/codex-cloud-ready) | Prepare an existing repository for Codex Cloud by auditing local dependencies, producing reproducible setup and a safe task handoff, and verifying a fresh cloud worksp... |
| [competitive-landscape](skills/competitive-landscape) | Map the competitive landscape for a crypto product idea. |
| [create-skill](skills/create-skill) | Interactively create a new Grok skill (SKILL.md + optional scripts/references). |
| [derisk](skills/derisk) | Reduce avoidable risk in a proposed project, purchase, business strategy, investment, launch, or irreversible decision. |
| [design-taste](skills/design-taste) | Design direction, judgment calls, and anti-AI-slop review for crypto UIs. |
| [dorsey-minimal-perfection](skills/dorsey-minimal-perfection) | Reduce a creative artifact or product to its essential details, refine those details against concrete quality criteria, and establish a finite shipping threshold. |
| [easy](skills/easy) | Simplify overwhelming, overengineered, or interview-heavy work by asking "What would this look like if it were easy?" Use when the user says easy, simplify, stuck, or ... |
| [eisenhower](skills/eisenhower) | Prioritize a supplied task or workstream list using the four-quadrant Eisenhower matrix, with separate importance and urgency judgments, reasons, and recommended handl... |
| [eli5](skills/eli5) | Explain or rewrite supplied text in very simple, concrete language while preserving its important meaning. |
| [factory-is-product](skills/factory-is-product) | Design or improve the production system that repeatedly delivers a product or service with predictable quality, cycle time, capacity, and cost. |
| [feature-parity](skills/feature-parity) | Research successful peers for a business or product, obtain the user's approval of a primary parity target, then audit and close the highest-value capability gaps with... |
| [find-scientific-papers](skills/find-scientific-papers) | Find and critically assess scientific papers relevant to the current conversation, life situation, practical decision, or project. |
| [frontend-design-guidelines](skills/frontend-design-guidelines) | Apply high-quality web interface design rules when building, reviewing, or styling frontend code. |
| [github-star-match](skills/github-star-match) | Evaluate a starred or external GitHub repository against a local codebase, then recommend adoption, selective borrowing, deferral, or rejection using license, duplicat... |
| [good-enough](skills/good-enough) | Decide whether a result, option, plan, or implementation meets its real acceptance bar and whether further iteration is worth the cost. |
| [heros-journey](skills/heros-journey) | Use the hero's journey to reflect on a life transition or project, identify the chapter supported by actual evidence, and choose one practical next step. |
| [idiot-index](skills/idiot-index) | Decompose a product, service, component, or process into irreducible inputs and calculate cost-to-floor ratios to find the largest avoidable cost gaps. |
| [learn](skills/learn) | / |
| [less-wrong](skills/less-wrong) | Calibrate an uncertain decision by turning assumptions into explicit beliefs, weighing evidence, defining falsifiers, and selecting the cheapest feedback loop that can... |
| [lulie-untangle](skills/lulie-untangle) | Untangle a concrete want-to/don't-want-to mental conflict through Lulie Tanett's ideas about noncoercion, curiosity, and the fun criterion. |
| [magic-wand-number](skills/magic-wand-number) | Calculate a defensible theoretical floor or ceiling for a system, compare it with current performance, and size the true improvement headroom. |
| [mammoth-ambitious-boldness](skills/mammoth-ambitious-boldness) | Explore the most ambitious credible versions of any project, challenge assumed ceilings, and work backward to decisive experiments. |
| [mobile-style](skills/mobile-style) | Build or refactor application interfaces around familiar mobile-app interaction patterns, especially messaging lists, master-detail panes, touch controls, and responsi... |
| [mvp-ready](skills/mvp-ready) | Score a site or app out of 100 against evidence-backed MVP acceptance criteria, generate and execute repair prompts, and iterate until all criteria pass or concrete ex... |
| [one-power-law-move](skills/one-power-law-move) | Identify the single highest-leverage next action in a situation when the user asks for a power-law move, an outsized-impact intervention, or the one thing to do. |
| [parallelize-gestation](skills/parallelize-gestation) | Restructure a project so independent long-latency work starts in parallel while true dependencies, work-in-progress limits, and synchronization points remain explicit. |
| [platonic-ideal](skills/platonic-ideal) | Derive the simplest, hard-to-vary perfect form of a project by identifying its irreducible purpose, causal mechanism, boundaries, and deletion list. |
| [preview](skills/preview) | Start or reuse a local web development server, resolve its loopback URL, and open the live site in Codex for visual inspection. |
| [problem-prioritize-list](skills/problem-prioritize-list) | Turn an audit, project context, or messy backlog into one evidence-backed list of solvable problems in priority order. |
| [product-review](skills/product-review) | Product quality review, UX flows, onboarding, feature completeness, and user value. |
| [productize](skills/productize) | Turn an existing capability, project, or service into a bounded customer offer with delivery economics and a falsifiable demand test. |
| [recommended-actions](skills/recommended-actions) | Turn the current project's status or audit findings into a short, evidence-backed ranking of next actions when the user asks what to do next or which actions are recom... |
| [roadmap](skills/roadmap) | Create or refresh a project-root roadmap.md by comparing verified current state with a concrete perfect version, then sequencing milestones, dependencies, task ETA ran... |
| [sequenced-strategy](skills/sequenced-strategy) | Design a gated product or company sequence in which a high-value, low-volume entry offer proves demand and funds capabilities for later lower-cost, higher-volume, or m... |
| [server](skills/server) | Restore, start, or reuse a local development server for the current project, recover safely from stale same-project processes or locks, verify HTTP readiness, and repo... |
| [shapeable](skills/shapeable) | Audit and improve an authorized website or interface through Shapeable's evidence-backed scan, cure, and identical-rescan loop. |
| [signal-over-noise](skills/signal-over-noise) | Audit a budget, backlog, calendar, marketing plan, or operating portfolio and classify effort as direct outcome signal, necessary overhead, unproven work, or noise. |
| [startup-idea-evaluator](skills/startup-idea-evaluator) | Evaluate a startup or business idea as a potential good quest using impact, problem quality, market growth, willingness to pay, novelty, utility delta, timing, and fou... |
| [sublist](skills/sublist) | Take the first unchecked top-level item in the active Markdown todo list and turn it into its own short, dependency-ordered todo list. |
| [sync](skills/sync) | Pull everything another coding agent (Codex, Grok, Devin, Antigravity, Kimi) did into Claude, or push Claude's progress out to them, so switching agents when a usage l... |
| [think-in-limits](skills/think-in-limits) | Stress-test a claim, design, price, process, or business model by taking important variables toward zero, one, and extreme scale to reveal invariants, nonlinear breakp... |
| [tier-list](skills/tier-list) | Rank a set of options from the current chat into S/A/B/C/D/F tiers using the user's goals, constraints, and evidence. |
| [todolist](skills/todolist) | Turn a project, objective, or body of work into a simple dependency-ordered Markdown checklist. |
| [triage](skills/triage) | Sweep the current conversation for unresolved problems, sort them on an Eisenhower urgency-vs-importance matrix, and work through the top items one at a time. |
| [user-flow-testing](skills/user-flow-testing) | Simulate real users in a running product, test complete journeys and recovery paths, fix reproducible failures, and assess MVP readiness with evidence. |
| [vector-not-scalar](skills/vector-not-scalar) | Evaluate work by both speed and direction, then redirect high-effort activity that does not move the stated outcome. |
| [visualize-factory](skills/visualize-factory) | Visualize an existing production workflow and design its operating cadence around a target output, such as one essay shipped daily. |
