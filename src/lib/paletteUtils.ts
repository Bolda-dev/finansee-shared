// Utilities for the manual color palette version

export type HSL = { h: number; s: number; l: number };

export const hslToString = (c: HSL) => `hsl(${c.h}, ${c.s}%, ${c.l}%)`;
export const hslaToString = (c: HSL, a: number) =>
  `hsla(${c.h}, ${c.s}%, ${c.l}%, ${a})`;

export const hslToHex = ({ h, s, l }: HSL): string => {
  const sN = s / 100;
  const lN = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = sN * Math.min(lN, 1 - lN);
  const f = (n: number) =>
    lN - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
  const toHex = (x: number) =>
    Math.round(x * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
};

export const hexToHsl = (hex: string): HSL => {
  let h = hex.replace("#", "");
  if (h.length === 3)
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let hh = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        hh = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        hh = (b - r) / d + 2;
        break;
      case b:
        hh = (r - g) / d + 4;
        break;
    }
    hh /= 6;
  }
  return {
    h: Math.round(hh * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

// Build a 3-stop gradient that mirrors the C-version style (deep → mid → light)
export const buildGradient = (base: HSL): string => {
  const dark: HSL = { h: base.h, s: base.s, l: Math.max(base.l - 14, 18) };
  const light: HSL = {
    h: base.h,
    s: Math.max(base.s - 10, 50),
    l: Math.min(base.l + 22, 80),
  };
  return `linear-gradient(135deg, ${hslToString(dark)} 0%, ${hslToString(base)} 55%, ${hslToString(light)} 100%)`;
};

export const buildAccentBg = (base: HSL): string =>
  hslToString({ h: base.h, s: Math.max(base.s - 25, 40), l: 95 });

export const buildShadow = (base: HSL): string =>
  `0 2px 6px ${hslaToString(base, 0.15)}`;

export const buildGlow = (base: HSL): string => hslaToString(base, 0.08);
export const buildOutline = (base: HSL): string => hslaToString(base, 0.18);
