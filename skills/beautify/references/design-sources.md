# Design sources, with real access status

Every URL here was checked with a real HTTP request on **2026-08-23**. Status
is recorded so no session wastes calls proving a site blocks bots, and so
nothing here is a hallucinated link. Re-verify if a row looks stale:

```bash
curl -s -o /dev/null -w '%{http_code}\n' -L --max-time 12 -A 'Mozilla/5.0' <url>
```

`403` means bot-blocked, not dead. The site is real, an agent just cannot read
it. Say which it is rather than reporting a broken link.

---

## Lane 1: agent-fetchable (WebFetch works)

### shadcn core, start here

| Resource | URL | What it is for |
|---|---|---|
| Blocks | https://ui.shadcn.com/blocks | Canonical layouts. `dashboard-01` is the reference dashboard anatomy: sidebar-inset, section cards, chart, data table. Sidebar, login, and auth blocks too. |
| Themes | https://ui.shadcn.com/themes | Prebuilt token palettes. Diff yours against these. |
| Theming docs | https://ui.shadcn.com/docs/theming | The authoritative token list and OKLCH format. |
| Registry docs | https://ui.shadcn.com/docs/registry | How namespaced registries work. |

Verified registry syntax (2026-08-23). In `components.json`:

```json
{ "registries": { "@magicui": "https://magicui.design/r/{name}.json" } }
```

```bash
npx shadcn@latest add @magicui/magic-card
npx shadcn@latest add https://registry.example.com/button.json
```

`{name}` is substituted with the resource id. Registries needing auth take an
object with `headers` and `${ENV_VAR}` interpolation.

### Registries and catalogs

| Resource | URL | Notes |
|---|---|---|
| Awesome shadcn/ui | https://www.shadcn.io/awesome | Components, registries, templates, tools. |
| registry.directory | https://registry.directory | Explorer for the whole registry ecosystem. |
| tweakcn | https://tweakcn.com | Visual theme editor, exports the CSS variables. Fastest way to a non-default palette. |
| Origin UI | https://originui.com | Advanced primitives. |
| Magic UI | https://magicui.design | Animation layer, 150+ components. |
| Aceternity | https://ui.aceternity.com | Motion-heavy marketing components. |
| Tailark | https://tailark.com | Marketing/landing blocks. |

### Open galleries (no bot block)

| Resource | URL | Best for |
|---|---|---|
| Godly | https://godly.website | Award-tier web design, strong for editorial and marketing. |
| Refero | https://refero.design | Real product UI, searchable by pattern. **Caveat: JS-rendered, WebFetch returns only the page title.** Treat as human-browsable in practice. |
| SaaS Landing Page | https://saaslandingpage.com | Landing page structure specifically. |
| Screenlane | https://screenlane.com | Mobile and web UI patterns. |
| Curated.design | https://curated.design | Broad curation. |
| Httpster | https://httpster.net | Contemporary web aesthetics. |
| Page Flows | https://pageflows.com | User flows rather than static screens. |

---

## Lane 2: human-browsable only (do NOT try to fetch)

Ask the user to open these and paste a screenshot or describe what they liked.

| Resource | URL | Status checked 2026-08-23 |
|---|---|---|
| **Mobbin** | https://mobbin.com | Real and excellent: 621,500+ screens, 323,900 flows, 1,428 apps, browsable by UI element and by user flow. **But: free tier is 4 apps and 3 collections**, which is not enough for real research, and it returns **403 to automated fetch**. A Mobbin MCP server exists exposing the library to agents; suggest it only if the user repeatedly hits this wall. |
| Land-book | https://land-book.com | Real, 403 to curl. |
| UX Archive | https://uxarchive.com | Real, 403 to curl. Mobile flows. |
| Lapa Ninja | https://lapa.ninja | Real, 403 to curl. Landing pages. |
| Awwwards | https://www.awwwards.com | Reachable but heavy JS, low signal for product UI. Better for marketing sites. |

**The practical consequence:** Mobbin is the best-known name in this space and
the one users will ask for by name, but it is the *least* usable by an agent.
Lead with Lane 1 for anything you have to implement, and route the user to
Mobbin when they want to browse taste themselves.

---

## Choosing a reference by project type

| Building | Go to |
|---|---|
| Internal dashboard / admin / dev tool | shadcn `dashboard-01`, then Refero |
| Marketing or landing page | SaaS Landing Page, Tailark, Godly |
| Auth / onboarding flow | shadcn login blocks, Page Flows |
| Mobile app UI | Mobbin (user browses), Screenlane |
| Needs motion | Magic UI, Aceternity |
| Just needs a better palette | tweakcn, shadcn themes |
