#!/usr/bin/env python3
"""Convert hex colors to OKLCH so a project's existing brand survives a
shadcn-style redesign exactly, instead of being re-picked by eye.

Usage:
    python3 hex_to_oklch.py '#0b1220' '#5ec6ff'
    python3 hex_to_oklch.py --named board=#0b1220 accent=#5ec6ff

Why this exists: shadcn's token system is OKLCH. Eyeballing a hex into an
OKLCH triple drifts the brand silently, and nobody notices until the logo no
longer matches the UI. This does the real conversion (sRGB -> linear -> Oklab
-> OKLCH), so the output is the same color, just re-expressed.

Pure stdlib. No dependencies.
"""

import math
import sys


def _srgb_to_linear(channel_0_255: float) -> float:
    c = channel_0_255 / 255.0
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def hex_to_oklch(value: str) -> tuple[float, float, float]:
    """Return (L, C, H) with L in 0..1, C absolute, H in degrees."""
    h = value.strip().lstrip("#")
    if len(h) == 3:
        h = "".join(ch * 2 for ch in h)
    if len(h) != 6:
        raise ValueError(f"not a hex color: {value!r}")

    r, g, b = (_srgb_to_linear(int(h[i:i + 2], 16)) for i in (0, 2, 4))

    # linear sRGB -> LMS
    lms_l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b
    lms_m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b
    lms_s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b

    l_, m_, s_ = (v ** (1 / 3) for v in (lms_l, lms_m, lms_s))

    # LMS -> Oklab
    lightness = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_
    a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_
    b_ = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_

    chroma = math.hypot(a, b_)
    hue = math.degrees(math.atan2(b_, a)) % 360.0
    return lightness, chroma, hue


def fmt(value: str) -> str:
    lightness, chroma, hue = hex_to_oklch(value)
    # Achromatic colors get hue 0, matching how shadcn writes pure neutrals.
    if chroma < 0.0005:
        return f"oklch({lightness:.4f} 0 0)"
    return f"oklch({lightness:.4f} {chroma:.4f} {hue:.2f})"


def main(argv: list[str]) -> int:
    args = [a for a in argv if a != "--named"]
    if not args:
        print(__doc__)
        return 1

    rows = []
    for arg in args:
        if "=" in arg:
            name, _, value = arg.partition("=")
        else:
            name, value = "", arg
        try:
            rows.append((name, value, fmt(value)))
        except ValueError as exc:
            print(f"  skip: {exc}", file=sys.stderr)

    width = max((len(n) for n, _, _ in rows), default=0)
    for name, value, out in rows:
        prefix = f"  --{name:<{width}}  " if name else "  "
        print(f"{prefix}{value:<9} -> {out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
