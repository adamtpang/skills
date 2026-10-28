/* beautify: verify a redesign against the RUNNING page, not by eye.
 *
 * Paste the whole thing into the browser tool's JS eval while the page is
 * loaded. Works when screenshots are unavailable (a hidden browser pane does
 * not composite frames, so screenshot calls time out).
 *
 * Reports, from real rendered pixels:
 *   - WCAG AA contrast for every text pair
 *   - horizontal page overflow, and which elements cause it
 *   - whether OKLCH resolved and the derived radius scale computed
 *   - leftover skeletons, responsive reflow
 *
 * Colors are resolved through a canvas because getComputedStyle returns
 * oklch()/oklab() strings verbatim in modern browsers. Parsing those numbers
 * as if they were RGB produces confidently wrong contrast ratios.
 */
(() => {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });

  function toRGB(cssColor) {
    ctx.fillStyle = "#000";
    ctx.fillStyle = cssColor;           // browser resolves oklch -> rgb here
    ctx.fillRect(0, 0, 1, 1);
    const d = ctx.getImageData(0, 0, 1, 1).data;
    return [d[0], d[1], d[2]];
  }
  function luminance([r, g, b]) {
    const f = (v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  }
  function contrast(fg, bg) {
    const a = luminance(toRGB(fg));
    const b = luminance(toRGB(bg));
    const [hi, lo] = a > b ? [a, b] : [b, a];
    return +(((hi + 0.05) / (lo + 0.05)).toFixed(2));
  }
  const grade = (r, large) =>
    r + (r >= (large ? 3 : 4.5) ? " AA" : r >= 3 ? " large-only" : " FAIL");

  const pick = (sel) => document.querySelector(sel);
  const style = (sel, prop) => {
    const el = pick(sel);
    return el ? getComputedStyle(el)[prop] : null;
  };

  const viewport = document.documentElement.clientWidth;
  const report = {
    theme: document.documentElement.getAttribute("data-theme") || "(system)",
    viewport,
  };

  // A hidden pane reports clientWidth 0, which makes EVERY element look
  // overflowing. Refuse to report overflow rather than report a false alarm.
  if (!viewport) {
    report.WARNING =
      "viewport is 0, the pane is not displayed. Set an explicit size " +
      "(resize_window) before trusting overflow results.";
  }

  /* ---- contrast ---------------------------------------------------- */
  const bodyBg = style("body", "backgroundColor");
  const cardBg = style(".card", "backgroundColor") || bodyBg;
  const sideBg = style(".sidebar", "backgroundColor") || bodyBg;

  const pairs = {
    body_text:    [style("body", "color"), bodyBg, false],
    card_desc:    [style(".card-desc", "color"), cardBg, false],
    metric_label: [style(".metric .label", "color"), cardBg, false],
    metric_value: [style(".metric .value", "color"), cardBg, true],
    sidebar_nav:  [style(".nav-item", "color"), sideBg, false],
    primary_btn:  [style(".btn-primary", "color"),
                   style(".btn-primary", "backgroundColor"), false],
  };
  report.contrast = {};
  for (const [name, [fg, bg, large]] of Object.entries(pairs)) {
    if (fg && bg) report.contrast[name] = grade(contrast(fg, bg), large);
  }
  // A ratio near 1.0 almost always means stale computed styles after a JS
  // theme toggle, not a real design failure. Reload before "fixing" it.
  const suspicious = Object.entries(report.contrast)
    .filter(([, v]) => parseFloat(v) < 1.2)
    .map(([k]) => k);
  if (suspicious.length) {
    report.contrast_WARNING =
      "Near-1.0 ratio on [" + suspicious.join(", ") +
      "] is usually a stale-style artifact from toggling the theme via JS. " +
      "Reload the page and re-measure before changing any CSS.";
  }

  /* ---- overflow ------------------------------------------------------ */
  if (viewport) {
    const offenders = [];
    document.querySelectorAll("*").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.right > viewport + 1 && r.width > 0) {
        const cls = el.className?.baseVal ?? el.className ?? "";
        offenders.push((el.tagName.toLowerCase() + "." + cls).slice(0, 46));
      }
    });
    report.horizontalOverflow =
      document.documentElement.scrollWidth > viewport;
    report.overflowOffenders = offenders.slice(0, 6);
    if (report.horizontalOverflow) {
      report.overflow_HINT =
        "Most common cause: a grid track that will not shrink below its " +
        "content. `grid-template-columns: Npx 1fr` needs `minmax(0,1fr)`, " +
        "and a flex child that must ellipsize needs `min-width: 0`.";
    }
  }

  /* ---- token system -------------------------------------------------- */
  const root = getComputedStyle(document.documentElement);
  report.tokens = {
    radiusBase: root.getPropertyValue("--radius").trim() || "(none)",
    radiusXlComputed: pick(".card")
      ? getComputedStyle(pick(".card")).borderRadius : "(no .card)",
    oklchResolves: /^(oklch|oklab|color|rgb)/.test(String(bodyBg)),
    tabularNums:
      style(".metric .value", "fontVariantNumeric") === "tabular-nums",
  };

  /* ---- loading / responsive ------------------------------------------ */
  report.skeletonsLeft = document.querySelectorAll(".skel").length;
  const cards = pick(".section-cards");
  if (cards) {
    report.metricColumns =
      getComputedStyle(cards).gridTemplateColumns.split(" ").length;
  }
  const sb = pick(".sidebar");
  if (sb) {
    report.sidebarCollapsed = getComputedStyle(sb).flexDirection === "row";
  }

  return report;
})();
