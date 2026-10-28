---
name: beautify
description: Make an existing project's UI beautiful by starting from real prior art instead of a blank canvas. Sources concrete references first (shadcn blocks/themes/registries, plus free design galleries), names ONE reference to build against, then applies shadcn's design system to whatever stack the project actually is, including plain HTML, Python-served templates, Tauri, or anything with no build step. Use when the user says "beautify this", "make it beautiful", "throw shadcn at this", "make the UI nice", "redesign this page", "our UI looks bad", "make this look professional", "give this a design pass", or points at an ugly internal tool or dashboard. Distinct from the `shadcn` skill (that one is Next.js + Tailwind init and migration only) and from `frontend-design-guidelines` (rules with no external references): beautify's job is to refuse to design from scratch and to work on stacks shadcn's CLI cannot touch.
---

# beautify

Make it beautiful by **stealing structure from real prior art**, not by
inventing a design. The failure this skill exists to prevent is opening an
empty file and improvising a color palette.

## When to hand off instead

Check these first. Do not duplicate them.

| Situation | Use instead |
|---|---|
| Next.js/React + Tailwind, and the ask is literally "install shadcn" | `shadcn` skill |
| Need generic good-UI rules while writing a component | `frontend-design-guidelines` |
| Need a style/palette/font catalog to browse | `ui-ux-pro-max` |
| "This looks AI-generated", taste-level direction | `design-taste` |
| Want to study ONE named site's CSS in depth | `sitegrab` |

Use **beautify** when the ask is "make this existing thing beautiful" and you
need references plus a system, especially when the stack is not
React + Tailwind.

---

## Step 1. Detect the stack before choosing an approach

This decides everything downstream. Run it, do not assume.

```bash
ls package.json tailwind.config.* components.json 2>/dev/null
grep -l '"next"\|"react"\|"vite"' package.json 2>/dev/null
```

- **Path A, React + Tailwind present** (`package.json` has react/next AND a
  tailwind config): use the real shadcn CLI. Go to Step 4A.
- **Path B, everything else** (plain HTML, Flask/Django/FastAPI templates, a
  Python stdlib server, Tauri vanilla, Go templates, a single `index.html`):
  **do NOT install shadcn.** Hand-port its token layer. Go to Step 4B.

> Path B is the common case for internal tools and it is where the `shadcn`
> skill cannot help. Adding React + Tailwind + a bundler to a project whose
> whole install story is `pip install -e .` costs far more than the components
> are worth. Say this out loud to the user rather than silently migrating them.

---

## Step 2. Source references, two lanes

Never design from a blank canvas. Pull real prior art first.

### Lane 1, agent-fetchable (you can actually WebFetch these)

Verified reachable. Use these for structure and code:

- `https://ui.shadcn.com/blocks`, canonical dashboard/sidebar/login/auth
  layouts. **Start here for any dashboard.** `dashboard-01` is the reference
  anatomy: sidebar-inset, section cards, chart, data table.
- `https://ui.shadcn.com/themes`, prebuilt token palettes to diff against.
- `https://tweakcn.com`, visual shadcn theme editor, exports the CSS variables.
- `https://www.shadcn.io/awesome`, Awesome shadcn/ui: components, registries,
  templates.
- `https://registry.directory`, explorer for the shadcn registry ecosystem.
- `https://originui.com`, `https://magicui.design`, `https://ui.aceternity.com`,
  `https://tailark.com`, extended component/animation/marketing registries.
- Open galleries that do not block bots: `https://godly.website`,
  `https://refero.design`, `https://saaslandingpage.com`,
  `https://screenlane.com`, `https://curated.design`, `https://httpster.net`,
  `https://pageflows.com`.

### Lane 2, human-browsable only (ask the user to look, do not try to fetch)

These paywall or block automated access. Tell the user to open them; do not
burn calls proving they 403.

- **`https://mobbin.com`**, 621k+ real app screens, browsable by UI element
  and user flow. **Free tier is 4 apps and 3 collections**, which is not enough
  for real research, and it returns 403 to automated fetch. Treat as: *ask the
  user to browse and paste a screenshot or describe what they liked.* A Mobbin
  MCP server exists if the user wants agent access; suggest it only if they
  keep hitting this wall.
- `https://land-book.com`, `https://uxarchive.com`, `https://lapa.ninja`,
  `https://www.awwwards.com`, real sites, bot-blocked to curl/WebFetch.

**Rule: never invent a URL.** If you are unsure a resource exists, verify it
before putting it in front of the user:

```bash
curl -s -o /dev/null -w '%{http_code}\n' -L --max-time 12 -A 'Mozilla/5.0' <url>
```

A 403 means bot-blocked, not dead. Say which it is.

---

## Step 3. Name ONE reference, out loud

Before writing any CSS, state in one line what you are building against:

> "Building against shadcn `dashboard-01`: sidebar-inset, section cards with
> badges, muted-foreground secondary text."

If the user has a preference, that wins. If they have not looked at anything,
show 2 or 3 concrete options from Lane 1 and let them pick. Do not silently
pick a direction and present it as finished.

---

## Step 4A. Path A: real shadcn

```bash
npx shadcn@latest init
npx shadcn@latest add sidebar card badge button input skeleton
```

Third-party registries use a verified namespace syntax. Declare in
`components.json`:

```json
{ "registries": { "@magicui": "https://magicui.design/r/{name}.json" } }
```

Then:

```bash
npx shadcn@latest add @magicui/magic-card
```

**Preserve the project's brand.** After init, overwrite the generated
`--primary` / `--background` with the project's real values (Step 5). Shipping
shadcn's default neutral palette over someone's existing brand is a downgrade
disguised as an upgrade.

---

## Step 4B. Path B: hand-port the token layer (no build step)

Write plain CSS that mirrors shadcn's architecture. This gets ~95% of the look
with zero dependencies.

**1. Convert the project's existing brand colors to OKLCH exactly.** Do not
re-pick them by eye, or the brand silently drifts. Use the bundled script:

```bash
python3 ~/.claude/skills/beautify/scripts/hex_to_oklch.py '#0b1220' '#5ec6ff'
```

**2. Map them onto shadcn's semantic pairs.** Always these names, so any future
shadcn component drops in unchanged:

```
--background/--foreground   --card/--card-foreground
--popover/--popover-foreground   --primary/--primary-foreground
--secondary/--secondary-foreground   --muted/--muted-foreground
--accent/--accent-foreground   --destructive   --border   --input   --ring
--sidebar/--sidebar-foreground/--sidebar-border/--sidebar-accent
--chart-1 .. --chart-5
```

**3. Derive the radius scale from one source:**

```css
--radius: 0.625rem;
--radius-sm: calc(var(--radius) - 4px);
--radius-md: calc(var(--radius) - 2px);
--radius-lg: var(--radius);
--radius-xl: calc(var(--radius) + 4px);
```

**4. Do a complete light AND dark pass.** Define the full palette on bare
`:root`, redefine under `@media (prefers-color-scheme: dark)` guarded as
`:root:not([data-theme="light"])`, and again under `:root[data-theme="dark"]`
so an explicit toggle wins both ways. **Never define a color only inside a
media query or only inside `[data-theme]`.**

**5. Copy the component anatomy, not just the colors.** What actually makes it
read as shadcn:
- Cards: `--card` bg, 1px `--border`, `--radius-xl`, a small shadow
- Secondary text: `--muted-foreground`, ~13px
- Labels: mono, ~10.5px, uppercase, letter-spacing 0.12em
- Numbers: `font-variant-numeric: tabular-nums` everywhere
- Focus: `box-shadow: 0 0 0 3px color-mix(in oklch, var(--ring) 45%, transparent)`
- Skeleton shimmer while loading, never the word "Loading..."
- Buttons at h-36px, `--radius-md`, weight 550

---

## Step 5. Verify against the running page, do not eyeball

Screenshots are often unavailable (a hidden browser pane does not composite
frames). Verify computationally instead. Paste
`scripts/verify_ui.js` into the browser tool's JS eval against the live page.
It reports, on the real rendered pixels:

- WCAG AA contrast for every text pair, in both themes
- horizontal page overflow, and which element causes it
- whether OKLCH resolved and the radius scale computed
- leftover skeletons, responsive reflow

**Two traps this catches, both hit for real:**

1. **A grid track will not shrink below its content.**
   `grid-template-columns: 240px 1fr` forces sideways page scroll because
   `1fr` defaults to `min-width:auto`. Use `minmax(0,1fr)`.
2. **Toggling a theme via JS can leave stale computed styles**, producing a
   fake contrast failure. If a contrast number looks absurd (near 1.0),
   **reload the page and re-measure before "fixing" anything.** Do not chase a
   bug that is a measurement artifact.

Also confirm the viewport is non-zero before trusting any overflow check. A
hidden pane reports `clientWidth: 0`, which makes every element look
overflowing.

---

## Hard rules

- **No em dashes** in any UI copy, ever. Commas, colons, parentheses, periods.
- **Preserve the brand.** Convert, do not re-pick. If the project has a
  `DESIGN.md` or `brand.md`, it is the source of truth; read it first and
  update it after.
- **Escape every interpolated value** that reaches `innerHTML`.
- **Do not add a build step to a project that does not have one** without
  saying so explicitly and getting agreement.
- **Report what you did not verify.** If you could not screenshot it, say so
  and say what you checked instead.
- Update the project's `DESIGN.md` with the token table and the verification
  results so the next session does not re-derive them.
