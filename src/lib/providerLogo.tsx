// Brand-colored provider logo bubble (initials based)
// Keeps a consistent visual identity per insurer/financial provider.

type Brand = { bg: string; fg: string; initials: string };

const BRANDS: Record<string, Brand> = {
  "מנורה מבטחים": { bg: "hsl(217, 70%, 28%)", fg: "#fff", initials: "מנ" },
  "מנורה": { bg: "hsl(217, 70%, 28%)", fg: "#fff", initials: "מנ" },
  "כלל": { bg: "hsl(355, 75%, 45%)", fg: "#fff", initials: "כל" },
  "הראל": { bg: "hsl(145, 60%, 32%)", fg: "#fff", initials: "הר" },
  "מגדל": { bg: "hsl(28, 85%, 50%)", fg: "#fff", initials: "מג" },
  "הפניקס": { bg: "hsl(15, 80%, 48%)", fg: "#fff", initials: "הפ" },
  "אלטשולר שחם": { bg: "hsl(210, 30%, 18%)", fg: "#fff", initials: "אש" },
  "בנק הפועלים": { bg: "hsl(8, 75%, 50%)", fg: "#fff", initials: "בה" },
  "בנק לאומי": { bg: "hsl(220, 80%, 38%)", fg: "#fff", initials: "בל" },
  "בנק מזרחי": { bg: "hsl(45, 90%, 50%)", fg: "#1a1a1a", initials: "במ" },
  "בנק דיסקונט": { bg: "hsl(190, 75%, 38%)", fg: "#fff", initials: "בד" },
};

export const getProviderBrand = (provider: string): Brand => {
  if (BRANDS[provider]) return BRANDS[provider];
  // Fallback: hash to a neutral teal-family color, use first 2 chars
  const initials = provider.replace(/[^א-תa-zA-Z]/g, "").slice(0, 2) || "?";
  let h = 0;
  for (let i = 0; i < provider.length; i++) h = (h * 31 + provider.charCodeAt(i)) >>> 0;
  const hue = h % 360;
  return { bg: `hsl(${hue}, 55%, 35%)`, fg: "#fff", initials };
};

export const ProviderLogo = ({
  provider,
  size = 40,
  className = "",
  ring = false,
}: {
  provider: string;
  size?: number;
  className?: string;
  ring?: boolean;
}) => {
  const { bg, fg, initials } = getProviderBrand(provider);
  const fontSize = Math.round(size * 0.38);
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full flex-shrink-0 font-extrabold tracking-tight ${className}`}
      style={{
        width: size,
        height: size,
        background: bg,
        color: fg,
        fontSize,
        letterSpacing: "-0.02em",
        boxShadow: ring
          ? "0 0 0 3px #fff, 0 0 0 4px hsla(178, 70%, 14%, 0.18), 0 6px 14px hsla(0,0%,0%,0.18)"
          : "0 2px 6px hsla(0,0%,0%,0.12)",
      }}
      aria-label={provider}
    >
      {initials}
    </span>
  );
};
