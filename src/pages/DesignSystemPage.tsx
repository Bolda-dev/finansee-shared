import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  ChevronLeft,
  Mic,
  Send,
  Phone,
  FileText,
  Stethoscope,
  UserCog,
  Layers,
  Heart,
  PiggyBank,
  TrendingUp,
  ShieldCheck,
  X,
  Calculator,
  RefreshCw,
  ArrowDownToLine,
  
} from "lucide-react";
import advisorImg from "@/assets/advisor-avatar.jpg";

/**
 * Internal design system reference — `/design-system`, not linked from the app.
 * Every snippet is copied 1:1 from its source page. The labels show exactly
 * where each element lives. Per-category palettes are kept separate.
 */

/* ===== Live font detector =====
   Measures candidate font widths against monospace/serif/sans-serif baselines
   to figure out which font in the CSS stack the browser actually rendered. */
const FONT_CANDIDATES = [
  "SF Pro Display",
  "SF Pro Text",
  "-apple-system",
  "BlinkMacSystemFont",
  "Segoe UI",
  "Roboto",
  "Helvetica Neue",
  "Heebo",
  "Assistant",
  "Arial Hebrew",
  "Arial",
  "SF Mono",
  "Menlo",
  "Consolas",
  "ui-monospace",
];

const detectFont = (stack: string): string => {
  if (typeof document === "undefined") return "—";
  const test = "mmmmmmmmmmlliABCDEabcde0123אבגדהוז₪";
  const baseFonts = ["monospace", "serif", "sans-serif"];
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return "—";

  const baseline: Record<string, number> = {};
  for (const b of baseFonts) {
    ctx.font = `16px ${b}`;
    baseline[b] = ctx.measureText(test).width;
  }

  // First try each candidate independently
  for (const cand of FONT_CANDIDATES) {
    let detected = false;
    for (const b of baseFonts) {
      ctx.font = `16px "${cand}", ${b}`;
      const w = ctx.measureText(test).width;
      if (Math.abs(w - baseline[b]) > 0.5) {
        detected = true;
        break;
      }
    }
    if (detected) {
      // Confirm this candidate is what the actual stack resolves to
      ctx.font = `16px "${cand}", monospace`;
      const candWidth = ctx.measureText(test).width;
      ctx.font = `16px ${stack}`;
      const stackWidth = ctx.measureText(test).width;
      if (Math.abs(candWidth - stackWidth) < 0.5) return cand;
    }
  }
  return "system default";
};

const ResolvedFontReport = () => {
  const tokens = [
    { token: "--font-display", label: "font-display" },
    { token: "--font-sans", label: "font-sans" },
    { token: "--font-body", label: "font-body" },
    { token: "--font-numeric", label: "font-numeric" },
    { token: "--font-mono", label: "font-mono" },
  ];
  const [info, setInfo] = useState<
    Record<string, { stack: string; detected: string }>
  >({});

  useEffect(() => {
    const out: Record<string, { stack: string; detected: string }> = {};
    const root = getComputedStyle(document.documentElement);
    for (const t of tokens) {
      const stack = root.getPropertyValue(t.token).trim() || "sans-serif";
      out[t.token] = { stack, detected: detectFont(stack) };
    }
    setInfo(out);
  }, []);

  const weights = [100, 200, 300, 400, 500, 600, 700, 800, 900];

  return (
    <div className="space-y-4">
      {tokens.map((t) => {
        const i = info[t.token];
        return (
          <div
            key={t.token}
            className="rounded-xl p-3"
            style={{
              border: "1px solid hsl(230, 20%, 92%)",
              background: "white",
            }}
          >
            <div className="flex items-baseline justify-between mb-1.5">
              <span
                className="text-[11px] font-bold"
                style={{ color: "hsl(250, 50%, 12%)" }}
              >
                {t.label}
              </span>
              <span
                className="text-[10px] font-mono"
                style={{ color: "hsl(220, 70%, 45%)" }}
              >
                → {i?.detected ?? "…"}
              </span>
            </div>
            <p
              className="text-[9px] font-mono mb-2 leading-snug break-all"
              style={{ color: "hsl(230, 15%, 55%)" }}
              dir="ltr"
            >
              {i?.stack ?? "—"}
            </p>
            <div className="space-y-1">
              {weights.map((w) => (
                <div
                  key={w}
                  className="flex items-baseline justify-between gap-3 py-0.5 border-b last:border-0"
                  style={{ borderColor: "hsl(230, 20%, 96%)" }}
                >
                  <span
                    style={{
                      fontFamily: `var(${t.token})`,
                      fontWeight: w,
                      fontSize: 16,
                      color: "hsl(250, 50%, 12%)",
                      lineHeight: 1.15,
                    }}
                  >
                    Aa אב ₪123,456
                  </span>
                  <span
                    className="text-[9px] font-mono"
                    style={{ color: "hsl(230, 15%, 55%)" }}
                  >
                    {w}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
      <div
        className="rounded-xl p-3 text-[10.5px] leading-relaxed"
        style={{
          background: "hsl(210, 80%, 96%)",
          border: "1px solid hsl(210, 70%, 88%)",
          color: "hsl(220, 50%, 25%)",
        }}
      >
        ℹ הפונט שמופיע בחץ ← הוא הפונט האמיתי שהדפדפן בחר מהסטאק במכשיר הזה.
        ב-iOS / macOS זה תמיד <b>SF Pro</b> (Display לכותרות, Text לגוף).
        ב-Windows: <b>Segoe UI</b>. באנדרואיד: <b>Roboto</b>. SF Pro תומך במשקלים
        100, 200, 300, 400, 500, 600, 700, 800, 900 — כולם מותקנים במכשיר.
      </div>
    </div>
  );
};


const Section = ({
  title,
  source,
  children,
}: {
  title: string;
  source?: string;
  children: React.ReactNode;
}) => (
  <section
    className="px-5 py-6 border-t"
    style={{ borderColor: "hsl(230, 20%, 92%)" }}
  >
    <div className="mb-4">
      <h2
        className="text-[14px] font-extrabold"
        style={{ color: "hsl(250, 50%, 12%)" }}
      >
        {title}
      </h2>
      {source && (
        <p
          className="text-[10px] mt-0.5 font-mono"
          style={{ color: "hsl(230, 15%, 55%)" }}
        >
          {source}
        </p>
      )}
    </div>
    <div className="space-y-5">{children}</div>
  </section>
);

const Row = ({
  label,
  where,
  children,
}: {
  label: string;
  where?: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-baseline justify-between gap-2">
      <span
        className="text-[10px] font-bold uppercase tracking-wider"
        style={{ color: "hsl(230, 15%, 45%)" }}
      >
        {label}
      </span>
      {where && (
        <span
          className="text-[9px] font-mono"
          style={{ color: "hsl(230, 15%, 60%)" }}
        >
          {where}
        </span>
      )}
    </div>
    <div>{children}</div>
  </div>
);

const Swatch = ({
  c,
  name,
  use,
}: {
  c: string;
  name: string;
  use?: string;
}) => (
  <div className="flex flex-col gap-1">
    <div
      className="w-full aspect-square rounded-xl"
      style={{ background: c, border: "1px solid hsl(230, 20%, 92%)" }}
    />
    <span
      className="text-[9px] font-bold leading-tight"
      style={{ color: "hsl(250, 50%, 12%)" }}
    >
      {name}
    </span>
    {use && (
      <span className="text-[8px]" style={{ color: "hsl(230, 15%, 55%)" }}>
        {use}
      </span>
    )}
    <span
      className="text-[8px] font-mono leading-tight"
      style={{ color: "hsl(230, 15%, 55%)" }}
    >
      {c.replace("hsl(", "").replace(")", "")}
    </span>
  </div>
);

// Per-category palettes EXACTLY as defined in source code
const palettes = {
  insurance: {
    label: "ביטוח / Insurance",
    source: "InsurancePageC.tsx · HealthInsurancePage.tsx",
    colors: [
      { c: "hsl(258, 72%, 52%)", name: "Hero from", use: "gradient start" },
      { c: "hsl(265, 78%, 62%)", name: "Hero mid", use: "gradient 55%" },
      { c: "hsl(275, 85%, 75%)", name: "Hero to", use: "gradient end" },
      { c: "hsl(262, 75%, 52%)", name: "Accent", use: "icons, bars" },
      { c: "hsl(260, 75%, 95%)", name: "Accent BG", use: "icon tile" },
      { c: "hsl(262, 65%, 28%)", name: "Accent text", use: "Dana CTA text" },
      { c: "hsl(262, 80%, 14%)", name: "Deep", use: "inner hero deep" },
      { c: "hsl(262, 75%, 26%)", name: "Core", use: "inner accent" },
      { c: "hsl(262, 35%, 12%)", name: "Ink", use: "inner body" },
      { c: "hsl(262, 12%, 48%)", name: "Muted", use: "inner muted" },
      { c: "hsl(260, 20%, 90%)", name: "Hairline", use: "inner border" },
      { c: "hsl(260, 30%, 98%)", name: "Soft", use: "page bg" },
    ],
  },
  assets: {
    label: "נכסים / Assets",
    source: "AssetsPageC.tsx · PensionCategoryPage · PensionProductPage",
    colors: [
      { c: "hsl(170, 80%, 35%)", name: "Hero from", use: "Assets gradient" },
      { c: "hsl(174, 65%, 42%)", name: "Hero mid", use: "gradient 55%" },
      { c: "hsl(170, 70%, 56%)", name: "Hero to", use: "gradient end" },
      { c: "hsl(178, 70%, 30%)", name: "Accent", use: "Assets icon" },
      { c: "hsl(176, 55%, 91%)", name: "Mint", use: "pill bg, KPI tile" },
      { c: "hsl(178, 70%, 22%)", name: "Pill ink", use: "pill text" },
      { c: "hsl(176, 50%, 82%)", name: "Pill border", use: "amount pill" },
      { c: "hsl(178, 80%, 14%)", name: "Deep", use: "Pension hero" },
      { c: "hsl(178, 70%, 26%)", name: "Core", use: "Pension accent" },
      { c: "hsl(200, 30%, 10%)", name: "Ink", use: "Pension body" },
      { c: "hsl(200, 12%, 48%)", name: "Muted", use: "Pension muted" },
      { c: "hsl(180, 18%, 90%)", name: "Hairline", use: "Pension border" },
    ],
  },
  liabilities: {
    label: "התחייבויות / Liabilities",
    source: "LiabilitiesPageC.tsx · MortgageInvestmentPage.tsx",
    colors: [
      { c: "hsl(220, 85%, 45%)", name: "Hero from", use: "gradient start" },
      { c: "hsl(225, 90%, 58%)", name: "Hero mid", use: "gradient 55%" },
      { c: "hsl(215, 95%, 72%)", name: "Hero to", use: "gradient end" },
      { c: "hsl(222, 85%, 45%)", name: "Accent", use: "Liab icon" },
      { c: "hsl(220, 85%, 95%)", name: "Accent BG", use: "icon tile" },
      { c: "hsl(222, 80%, 28%)", name: "Accent text", use: "Dana CTA" },
      { c: "hsl(222, 90%, 14%)", name: "Deep", use: "Mortgage hero" },
      { c: "hsl(222, 85%, 24%)", name: "Core", use: "Mortgage accent" },
      { c: "hsl(220, 70%, 95%)", name: "Mint", use: "Mortgage KPI tile" },
      { c: "hsl(222, 35%, 10%)", name: "Ink", use: "Mortgage body" },
      { c: "hsl(222, 12%, 48%)", name: "Muted", use: "Mortgage muted" },
      { c: "hsl(220, 20%, 90%)", name: "Hairline", use: "Mortgage border" },
    ],
  },
  status: {
    label: "סטטוס / Status",
    source: "כל העמודים",
    colors: [
      { c: "hsl(0, 78%, 55%)", name: "Alert red", use: "! badge" },
      { c: "hsl(0, 65%, 50%)", name: "Alert ink", use: "icon חסר" },
      { c: "hsl(0, 65%, 45%)", name: "Alert text", use: "חסר label" },
      { c: "hsl(0, 80%, 95%)", name: "Alert tint", use: "missing tile" },
      { c: "hsl(0, 80%, 96%)", name: "Alert tint 2", use: "expensive row" },
      { c: "hsl(0, 80%, 90%)", name: "Alert border", use: "expensive row" },
      { c: "hsl(150, 65%, 45%)", name: "Live dot", use: "Dana active" },
      { c: "hsl(150, 65%, 30%)", name: "Save green", use: "חיסכון value" },
      { c: "hsl(150, 50%, 82%)", name: "Save border", use: "fees ok row" },
    ],
  },
  neutrals: {
    label: "Neutrals",
    source: "IndexC · CategoryPageC · chat bar · chips",
    colors: [
      { c: "hsl(250, 50%, 12%)", name: "Ink", use: "primary text" },
      { c: "hsl(250, 35%, 20%)", name: "Ink 2", use: "Dana bubble" },
      { c: "hsl(250, 40%, 15%)", name: "Ink 3", use: "home title" },
      { c: "hsl(250, 40%, 22%)", name: "Detail ink", use: "expanded detail" },
      { c: "hsl(230, 15%, 55%)", name: "Muted", use: "subtitle" },
      { c: "hsl(230, 15%, 50%)", name: "Muted 2", use: "Dana subtext" },
      { c: "hsl(230, 12%, 58%)", name: "Muted 3", use: "card cap" },
      { c: "hsl(230, 15%, 45%)", name: "Mic ink", use: "Mic icon" },
      { c: "hsl(230, 15%, 60%)", name: "Chevron", use: "trailing icon" },
      { c: "hsl(230, 20%, 35%)", name: "Chip ink", use: "inactive chip" },
      { c: "hsl(230, 20%, 94%)", name: "Hairline", use: "card border" },
      { c: "hsl(230, 20%, 92%)", name: "Hairline 2", use: "chat bar border" },
      { c: "hsl(230, 20%, 90%)", name: "Hairline 3", use: "mic border" },
      { c: "hsl(230, 25%, 96%)", name: "Surface", use: "mic bg" },
      { c: "hsl(235, 30%, 97%)", name: "Sheet bg", use: "white sheet" },
      { c: "hsl(250, 30%, 12%)", name: "Chip active", use: "filter active" },
      { c: "hsl(230, 20%, 88%)", name: "Drag handle", use: "sheet handle" },
      { c: "hsl(265, 60%, 70%)", name: "Avatar ring", use: "Dana avatar" },
    ],
  },
};

// ============= Snippet helpers (mirror real markup) =============

const AmountPillTeal = ({ children }: { children: React.ReactNode }) => (
  <span
    className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
    style={{
      background: "hsl(176, 55%, 91%)",
      color: "hsl(178, 70%, 22%)",
      border: "1px solid hsl(176, 50%, 82%)",
    }}
  >
    {children}
  </span>
);

const DesignSystemPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen max-w-[430px] mx-auto"
      dir="rtl"
      style={{ background: "hsl(235, 30%, 97%)" }}
    >
      {/* Header */}
      <div
        className="px-5 pt-8 pb-5 sticky top-0 z-20 bg-white"
        style={{ borderBottom: "1px solid hsl(230, 20%, 92%)" }}
      >
        <div className="relative flex items-center justify-center min-h-[40px]">
          <button
            onClick={() => navigate("/")}
            className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full transition-all hover:scale-105 active:scale-95"
            style={{
              background: "hsl(230, 25%, 96%)",
              border: "1px solid hsl(230, 20%, 90%)",
            }}
            aria-label="חזרה"
          >
            <ChevronRight
              className="h-5 w-5"
              style={{ color: "hsl(250, 50%, 12%)" }}
            />
          </button>
          <h1
            className="text-[15px] font-extrabold"
            style={{ color: "hsl(250, 50%, 12%)" }}
          >
            Design System
          </h1>
        </div>
        <p
          className="text-[11px] text-center mt-2"
          style={{ color: "hsl(230, 15%, 55%)" }}
        >
          מראה מדויק לכל אלמנט שבשימוש בזרימה
        </p>
      </div>

      {/* 1 — Palettes per category */}
      {Object.entries(palettes).map(([key, p]) => (
        <Section key={key} title={p.label} source={p.source}>
          <div className="grid grid-cols-4 gap-2">
            {p.colors.map((c) => (
              <Swatch key={c.name + c.c} {...c} />
            ))}
          </div>
        </Section>
      ))}

      {/* 2-pre — Resolved font + all weights (live on this device) */}
      <Section
        title="Resolved font on this device"
        source="getComputedStyle + font detection · משקלים 100→900"
      >
        <ResolvedFontReport />
      </Section>

      {/* 2a — Font families (system stack) */}
      <Section
        title="Font families"
        source="native system stack · index.css → --font-* · tailwind: font-sans/display/body/mono/numeric"
      >
        {[
          {
            token: "--font-display",
            tw: "font-display",
            usage: "כותרות, KPI גדולים, hero",
            sample: "₪7.4M · ביטוח בריאות",
            weight: 800,
            size: 22,
          },
          {
            token: "--font-sans",
            tw: "font-sans (ברירת מחדל)",
            usage: "כל ה-UI הכללי",
            sample: "מסך בית · פוטנציאל פיננסי אישי",
            weight: 600,
            size: 15,
          },
          {
            token: "--font-body",
            tw: "font-body",
            usage: "פסקאות, תיאורים",
            sample: "נכסים, התחייבויות וביטוחים — מתעדכנים אוטומטית",
            weight: 400,
            size: 13,
          },
          {
            token: "--font-numeric",
            tw: "font-numeric / .tabular-nums",
            usage: "כל סכום, אחוז, ספרה בטבלה",
            sample: "₪1,234,567.89  ·  12.5%",
            weight: 700,
            size: 16,
            numeric: true,
          },
          {
            token: "--font-mono",
            tw: "font-mono",
            usage: "תוויות טכניות, קוד, מטא",
            sample: "DesignSystemPage.tsx · 12/700",
            weight: 500,
            size: 12,
            mono: true,
          },
        ].map((f) => (
          <div
            key={f.token}
            className="rounded-xl p-3"
            style={{
              border: "1px solid hsl(230, 20%, 92%)",
              background: "hsl(230, 30%, 99%)",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-[10px] font-bold uppercase tracking-wider"
                style={{ color: "hsl(230, 15%, 45%)" }}
              >
                {f.tw}
              </span>
              <span
                className="text-[9px] font-mono"
                style={{ color: "hsl(230, 15%, 55%)" }}
              >
                {f.token}
              </span>
            </div>
            <div
              style={{
                fontFamily: `var(${f.token})`,
                fontSize: f.size,
                fontWeight: f.weight,
                color: "hsl(250, 50%, 12%)",
                lineHeight: 1.2,
                fontVariantNumeric: f.numeric ? "tabular-nums" : undefined,
              }}
            >
              {f.sample}
            </div>
            <p
              className="text-[10.5px] mt-1.5"
              style={{ color: "hsl(230, 15%, 50%)" }}
            >
              {f.usage}
            </p>
          </div>
        ))}
        <div
          className="rounded-xl p-3 text-[10.5px] leading-relaxed"
          style={{
            background: "hsl(45, 90%, 96%)",
            border: "1px solid hsl(45, 70%, 85%)",
            color: "hsl(35, 50%, 25%)",
          }}
        >
          ⚠ אין web fonts. הסטאק: Apple (SF Pro) → Segoe UI (Windows) → Roboto
          (Android) → Heebo / Assistant / Arial Hebrew לעברית. כל מספר במערכת
          חייב להיות עם <code className="font-mono">tabular-nums</code> כדי
          שעמודות סכומים יישרו.
        </div>
      </Section>

      {/* 2b — Typography sizes (real sizes incl. .5) */}
      <Section
        title="Typography scale"
        source="כל הגדלים שבאמת רצים, כולל ערכי .5"
      >
        {[
          { size: 40, weight: 800, text: "₪7.4M", where: "CategoryPageC · hero KPI" },
          { size: 36, weight: 800, text: "₪1.23M", where: "PensionCategoryPage · floating KPI" },
          { size: 20, weight: 800, text: "₪650,000", where: "PensionProduct · provider name / KPI" },
          { size: 18, weight: 800, text: "חסר", where: "CategoryPageC grid · missing" },
          { size: 15, weight: 800, text: "ביטוח בריאות", where: "hero h1 title" },
          { size: 14, weight: 800, text: "מצאתי לך הזדמנות!", where: "Dana row headline" },
          { size: 14, weight: 700, text: "ביטוח חיים", where: "card title" },
          { size: 14, weight: 800, text: "₪9,069/חודש", where: "Floating KPI value" },
          { size: 13, weight: 700, text: "₪842,300", where: "trailing amount" },
          { size: 12.5, weight: 700, text: "12.5px Row value", where: "PensionProduct/Health Row" },
          { size: 12, weight: 700, text: "פרטי החיסכון", where: "SectionCard title" },
          { size: 12, weight: 500, text: "12px body / סטטוס", where: "body, secondary KPI pill" },
          { size: 11.5, weight: 500, text: "11.5px subtitle", where: "list subtitle, Row label" },
          { size: 11, weight: 600, text: "11px chip / caption", where: "filter chips, secondary" },
          { size: 10.5, weight: 500, text: "10.5px micro", where: "footer notes, market avg" },
          { size: 10, weight: 700, text: "UPPERCASE LABEL", where: "KPI tile label" },
          { size: 9, weight: 700, text: "9", where: "badge counter" },
        ].map((t) => (
          <div
            key={t.size + t.where}
            className="flex items-baseline justify-between gap-3 py-1 border-b last:border-0"
            style={{ borderColor: "hsl(230, 20%, 94%)" }}
          >
            <span
              style={{
                fontSize: t.size,
                fontWeight: t.weight,
                color: "hsl(250, 50%, 12%)",
                lineHeight: 1.1,
              }}
            >
              {t.text}
            </span>
            <span
              className="text-[9px] font-mono text-left flex-shrink-0"
              style={{ color: "hsl(230, 15%, 55%)" }}
            >
              {t.size}/{t.weight}
              <br />
              {t.where}
            </span>
          </div>
        ))}
      </Section>

      {/* 3 — Radii */}
      <Section title="Radii" source="rounded-xl / 2xl / 3xl / full">
        <div className="flex items-center gap-3 flex-wrap">
          {[
            { r: "rounded-xl", label: "xl · 12px", use: "icon tile, inner row" },
            { r: "rounded-2xl", label: "2xl · 16px", use: "כל הכרטיסיות" },
            { r: "rounded-3xl", label: "3xl · 24px", use: "white sheet top" },
            { r: "rounded-full", label: "full", use: "pills, FAB, avatars" },
          ].map((x) => (
            <div key={x.label} className="flex flex-col items-center gap-1">
              <div
                className={`w-14 h-14 ${x.r}`}
                style={{
                  background: "hsl(260, 75%, 95%)",
                  border: "1px solid hsl(260, 65%, 88%)",
                }}
              />
              <span
                className="text-[10px] font-bold"
                style={{ color: "hsl(250, 50%, 12%)" }}
              >
                {x.label}
              </span>
              <span
                className="text-[9px]"
                style={{ color: "hsl(230, 15%, 55%)" }}
              >
                {x.use}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* 4 — Shadows (real values from source) */}
      <Section title="Shadows" source="ערכים מדויקים בלבד">
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              s: "0 3px 14px hsla(250, 30%, 25%, 0.05)",
              label: "list card",
              where: "CategoryPageC list row",
            },
            {
              s: "0 3px 14px hsla(250, 30%, 25%, 0.07)",
              label: "grid card",
              where: "IndexC + CategoryPageC grid",
            },
            {
              s: "0 4px 18px hsla(250, 30%, 25%, 0.08)",
              label: "raised",
              where: "Dana home card",
            },
            {
              s: "0 8px 24px hsla(250, 30%, 25%, 0.08), 0 1px 3px hsla(250, 30%, 25%, 0.04)",
              label: "dana row inner",
              where: "PensionProduct dana row",
            },
            {
              s: "0 14px 36px hsla(262, 70%, 12%, 0.20), 0 2px 6px hsla(262, 70%, 12%, 0.06)",
              label: "floating purple",
              where: "HealthInsurance summary",
            },
            {
              s: "0 14px 36px hsla(178, 70%, 12%, 0.18), 0 2px 6px hsla(178, 70%, 12%, 0.06)",
              label: "floating teal",
              where: "Pension summary",
            },
            {
              s: "0 14px 36px hsla(222, 70%, 12%, 0.20), 0 2px 6px hsla(222, 70%, 12%, 0.06)",
              label: "floating blue",
              where: "Mortgage summary",
            },
            {
              s: "0 8px 32px hsla(250, 30%, 30%, 0.14), 0 2px 8px hsla(250, 30%, 30%, 0.06)",
              label: "chat bar",
              where: "bottom FAB bar",
            },
            {
              s: "0 1px 2px hsla(178, 70%, 14%, 0.04)",
              label: "section card",
              where: "PensionProduct SectionCard",
            },
            {
              s: "0 8px 28px hsla(250, 30%, 25%, 0.18)",
              label: "dana bubble",
              where: "DanaTeaserBubbles",
            },
            {
              s: "0 4px 12px hsla(250, 30%, 15%, 0.25)",
              label: "chip active",
              where: "filter chip active",
            },
            {
              s: "0 6px 20px hsla(250, 30%, 20%, 0.35)",
              label: "avatar halo",
              where: "tri-ring avatar inside chat bar",
            },
          ].map((x) => (
            <div key={x.label} className="flex flex-col items-center gap-1">
              <div
                className="w-full h-16 rounded-2xl bg-white"
                style={{
                  boxShadow: x.s,
                  border: "1px solid hsl(230, 20%, 94%)",
                }}
              />
              <span
                className="text-[10px] font-bold text-center"
                style={{ color: "hsl(250, 50%, 12%)" }}
              >
                {x.label}
              </span>
              <span
                className="text-[9px] text-center"
                style={{ color: "hsl(230, 15%, 55%)" }}
              >
                {x.where}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* 5 — Hero blocks (3 real variants) */}
      <Section title="Hero blocks" source="3 וריאציות אמיתיות">
        <Row label="Main category hero" where="CategoryPageC">
          <div
            className="relative rounded-2xl overflow-hidden px-5 pt-8 pb-10 text-white text-center"
            style={{
              background:
                "linear-gradient(160deg, hsl(258, 72%, 52%) 0%, hsl(265, 78%, 62%) 55%, hsl(275, 85%, 75%) 100%)",
            }}
          >
            <div className="relative flex items-center justify-center min-h-[40px] mb-5">
              <span
                className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full"
                style={{
                  background: "hsla(0,0%,100%,0.18)",
                  border: "1px solid hsla(0,0%,100%,0.25)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <ChevronRight className="h-5 w-5 text-white" />
              </span>
              <h3 className="text-[15px] font-extrabold">ביטוח</h3>
            </div>
            <p className="text-[12px] font-medium opacity-85 mb-1.5">
              סה״כ עלות חודשית
            </p>
            <p className="text-[40px] font-extrabold tracking-tight leading-none mb-2">
              ₪3,051
            </p>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span
                className="inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-full"
                style={{
                  background: "hsla(0, 0%, 100%, 0.18)",
                  border: "1px solid hsla(0, 0%, 100%, 0.18)",
                  backdropFilter: "blur(8px)",
                }}
              >
                7 פוליסות פעילות
              </span>
              <span
                className="inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-full"
                style={{
                  background: "hsla(0, 0%, 100%, 0.18)",
                  border: "1px solid hsla(0, 0%, 100%, 0.18)",
                  backdropFilter: "blur(8px)",
                }}
              >
                ₪36,612 בשנה
              </span>
            </div>
            <button
              className="inline-flex items-center gap-2 pr-2 pl-4 py-1.5 rounded-full text-[12px] font-semibold shadow-lg"
              style={{
                background: "white",
                color: "hsl(262, 65%, 28%)",
                boxShadow: "0 8px 24px hsla(262, 65%, 25%, 0.35)",
              }}
            >
              <span
                className="tri-ring-c relative w-11 h-11 rounded-full flex-shrink-0"
                style={{ marginTop: "-10px", marginBottom: "-10px", marginRight: "-8px" }}
              >
                <span
                  className="block w-full h-full rounded-full overflow-hidden"
                  style={{ boxShadow: "0 4px 10px hsla(275, 65%, 25%, 0.4)" }}
                >
                  <img src={advisorImg} alt="" className="w-full h-full object-cover" />
                </span>
              </span>
              <span>איך לחסוך בביטוחים שלי?</span>
            </button>
          </div>
        </Row>

        <Row label="Pension hero + floating KPI" where="PensionCategoryPage">
          <div className="rounded-2xl overflow-hidden">
            <div
              className="relative px-5 pt-10 pb-20 overflow-hidden"
              style={{
                background:
                  "linear-gradient(160deg, hsl(178, 80%, 14%) 0%, hsl(178, 70%, 26%) 70%, hsl(174, 65%, 42%) 130%)",
              }}
            >
              <div className="relative flex items-center justify-center min-h-[40px]">
                <span
                  className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full text-white"
                  style={{
                    background: "hsla(0,0%,100%,0.18)",
                    border: "1px solid hsla(0,0%,100%,0.25)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <ChevronLeft className="h-5 w-5 rotate-180" />
                </span>
                <h1 className="text-[15px] font-extrabold text-white">פנסיה</h1>
              </div>
              <div className="relative flex items-center justify-between mt-4">
                <h2 className="text-[14px] font-medium text-white/75">
                  סך החיסכון הפנסיוני
                </h2>
                <span className="text-[11px] font-medium text-white/60">
                  מעודכן להיום
                </span>
              </div>
            </div>
            <div className="px-5 -mt-12 relative z-10 pb-4">
              <div
                className="w-full text-right rounded-2xl bg-white p-5"
                style={{
                  border: "1px solid hsl(180, 18%, 90%)",
                  boxShadow:
                    "0 14px 36px hsla(178, 70%, 12%, 0.18), 0 2px 6px hsla(178, 70%, 12%, 0.06)",
                }}
              >
                <p
                  className="text-[11px] font-bold uppercase tracking-wide mb-1"
                  style={{ color: "hsl(200, 12%, 48%)" }}
                >
                  סך החיסכון הפנסיוני
                </p>
                <p
                  className="text-[36px] font-extrabold tracking-tight leading-none"
                  style={{ color: "hsl(200, 30%, 10%)" }}
                >
                  <span
                    className="text-[20px] font-bold ml-1"
                    style={{ color: "hsl(178, 70%, 26%)" }}
                  >
                    ₪
                  </span>
                  1.23M
                </p>
                <p
                  className="text-[11px] mt-1.5 font-medium"
                  style={{ color: "hsl(200, 12%, 48%)" }}
                >
                  4 מוצרים פנסיוניים
                </p>
                <div
                  className="grid grid-cols-2 gap-3 pt-4 mt-4"
                  style={{ borderTop: "1px solid hsl(180, 18%, 90%)" }}
                >
                  <div>
                    <p
                      className="text-[10px] font-bold uppercase tracking-wide mb-1"
                      style={{ color: "hsl(200, 12%, 48%)" }}
                    >
                      צפי קצבה
                    </p>
                    <p
                      className="text-[14px] font-extrabold"
                      style={{ color: "hsl(200, 30%, 10%)" }}
                    >
                      ₪9,069
                      <span className="text-[10px] font-medium opacity-70">
                        /חודש
                      </span>
                    </p>
                  </div>
                  <div
                    className="pr-3"
                    style={{ borderRight: "1px solid hsl(180, 18%, 90%)" }}
                  >
                    <p
                      className="text-[10px] font-bold uppercase tracking-wide mb-1"
                      style={{ color: "hsl(200, 12%, 48%)" }}
                    >
                      פעילים
                    </p>
                    <p
                      className="text-[14px] font-extrabold"
                      style={{ color: "hsl(200, 30%, 10%)" }}
                    >
                      3{" "}
                      <span className="text-[10px] font-medium opacity-70">
                        מוצרים
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Row>

        <Row label="StickyHeader (compact)" where="StickyHeader.tsx">
          <div
            className="px-4 py-3 min-h-[44px] relative flex items-center justify-center rounded-2xl"
            style={{
              background:
                "linear-gradient(160deg, hsl(262, 80%, 14%) 0%, hsl(262, 75%, 26%) 70%, hsl(265, 78%, 48%) 130%)",
              boxShadow: "0 4px 14px hsla(262, 70%, 14%, 0.3)",
              color: "white",
            }}
          >
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full"
              style={{
                background: "hsla(0,0%,100%,0.18)",
                border: "1px solid hsla(0,0%,100%,0.25)",
                backdropFilter: "blur(8px)",
              }}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <h1 className="text-[14px] font-extrabold">ביטוח בריאות</h1>
          </div>
        </Row>
      </Section>

      {/* 6 — Cards */}
      <Section title="Cards" source="כל וריאציות הכרטיסיות בשימוש">
        <Row label="Category list card" where="CategoryPageC list row">
          <div
            className="flex items-start gap-3 px-4 py-4 rounded-2xl"
            style={{
              background: "white",
              boxShadow: "0 3px 14px hsla(250, 30%, 25%, 0.05)",
              border: "1px solid hsl(230, 20%, 94%)",
            }}
          >
            <span className="relative flex-shrink-0">
              <span
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: "hsl(260, 75%, 95%)" }}
              >
                <Heart
                  className="h-5 w-5"
                  style={{ color: "hsl(262, 75%, 52%)" }}
                />
              </span>
              <span
                className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                style={{
                  background: "hsl(0, 78%, 55%)",
                  border: "2px solid white",
                }}
              >
                1
              </span>
            </span>
            <div className="flex-1 min-w-0 text-right">
              <p
                className="text-[14px] font-bold tracking-tight"
                style={{ color: "hsl(250, 50%, 12%)" }}
              >
                ביטוח חיים
              </p>
              <p
                className="text-[11.5px] mt-0.5"
                style={{ color: "hsl(230, 15%, 55%)" }}
              >
                מגדל · ₪2,000,000
              </p>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0 self-center">
              <span
                className="flex flex-col items-end gap-1 leading-tight"
              >
                <span
                  className="block text-[13px] font-bold tracking-tight"
                  style={{ color: "hsl(250, 50%, 12%)" }}
                >
                  ₪650
                  <span className="text-[10px] font-medium opacity-60">
                    {" "}/חודש
                  </span>
                </span>
              </span>
              <ChevronLeft
                className="h-4 w-4"
                style={{ color: "hsl(230, 15%, 60%)" }}
              />
            </div>
          </div>
        </Row>

        <Row label="Pension product list row" where="PensionCategoryPage">
          <div
            className="flex items-start gap-3 px-4 py-4 rounded-2xl"
            style={{
              background: "white",
              boxShadow: "0 3px 14px hsla(250, 30%, 25%, 0.05)",
              border: "1px solid hsl(230, 20%, 94%)",
            }}
          >
            <span className="relative flex-shrink-0">
              <span
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{ background: "hsl(176, 55%, 91%)" }}
              >
                <PiggyBank
                  className="h-5 w-5"
                  style={{ color: "hsl(178, 70%, 26%)" }}
                />
              </span>
              <span
                className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                style={{
                  background: "hsl(0, 78%, 55%)",
                  border: "2px solid white",
                }}
              >
                !
              </span>
            </span>
            <div className="flex-1 min-w-0 text-right">
              <p
                className="text-[14px] font-bold tracking-tight"
                style={{ color: "hsl(250, 50%, 12%)" }}
              >
                מגדל
              </p>
              <p
                className="text-[11.5px] mt-0.5"
                style={{ color: "hsl(230, 15%, 55%)" }}
              >
                מגדל מנהלים · ביטוח מנהלים
              </p>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0 self-center">
              <div className="text-left">
                <p
                  className="text-[13px] font-extrabold tracking-tight"
                  style={{ color: "hsl(250, 50%, 12%)" }}
                >
                  ₪842,300
                </p>
                <AmountPillTeal>+₪2,400/ח</AmountPillTeal>
              </div>
              <ChevronLeft
                className="h-4 w-4"
                style={{ color: "hsl(230, 15%, 60%)" }}
              />
            </div>
          </div>
        </Row>

        <Row label="Grid card (2-col)" where="CategoryPageC innerGrid">
          <div className="grid grid-cols-2 gap-3">
            <div
              className="relative rounded-2xl p-3.5 pt-4 flex flex-col gap-1 text-right"
              style={{
                background: "white",
                boxShadow: "0 3px 14px hsla(250, 30%, 25%, 0.07)",
                border: "1px solid hsl(230, 20%, 94%)",
                minHeight: 130,
              }}
            >
              <div className="flex items-center justify-start gap-2 mb-1">
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: "hsl(176, 55%, 91%)" }}
                >
                  <TrendingUp
                    className="h-4 w-4"
                    style={{ color: "hsl(178, 70%, 30%)" }}
                  />
                </span>
                <span
                  className="text-[12px] font-bold tracking-tight"
                  style={{ color: "hsl(250, 50%, 12%)" }}
                >
                  השקעות
                </span>
              </div>
              <p
                className="text-[20px] font-extrabold tracking-tight leading-none text-right"
                style={{ color: "hsl(250, 50%, 12%)" }}
              >
                ₪2,095,000
              </p>
              <p
                className="text-[10px] mt-1 text-right"
                style={{ color: "hsl(230, 12%, 58%)" }}
              >
                תיק השקעות
              </p>
            </div>
            <div
              className="relative rounded-2xl p-3.5 pt-4 flex flex-col gap-1 text-right"
              style={{
                background: "white",
                boxShadow: "0 3px 14px hsla(250, 30%, 25%, 0.07)",
                border: "1px solid hsl(230, 20%, 94%)",
                minHeight: 130,
              }}
            >
              <div className="flex items-center justify-start gap-2 mb-1">
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: "hsl(0, 80%, 95%)" }}
                >
                  <ShieldCheck
                    className="h-4 w-4"
                    style={{ color: "hsl(0, 65%, 50%)" }}
                  />
                </span>
                <span
                  className="text-[12px] font-bold tracking-tight"
                  style={{ color: "hsl(250, 50%, 12%)" }}
                >
                  ביטוח חיים
                </span>
              </div>
              <p
                className="text-[18px] font-extrabold tracking-tight leading-none text-right"
                style={{ color: "hsl(0, 65%, 50%)" }}
              >
                חסר
              </p>
              <p
                className="text-[10px] mt-1 text-right"
                style={{ color: "hsl(230, 12%, 58%)" }}
              >
                אין כיסוי פעיל
              </p>
            </div>
          </div>
        </Row>

        <Row label="Section card (top accent bar)" where="Pension/Health/Mortgage">
          <div
            className="relative rounded-2xl bg-white p-4 text-right overflow-hidden"
            style={{
              border: "1px solid hsl(180, 18%, 90%)",
              boxShadow: "0 1px 2px hsla(178, 70%, 14%, 0.04)",
            }}
          >
            <span
              className="absolute top-0 left-0 right-0 h-[3px]"
              style={{ background: "hsl(178, 70%, 26%)" }}
            />
            <h3
              className="text-[12px] font-bold mb-3"
              style={{
                color: "hsl(200, 30%, 10%)",
                letterSpacing: "-0.01em",
              }}
            >
              פרטי החיסכון
            </h3>
            <div className="flex items-center justify-between py-1.5">
              <span
                className="text-[11.5px]"
                style={{ color: "hsl(200, 12%, 48%)" }}
              >
                הפקדה חודשית
              </span>
              <span
                className="text-[12.5px] font-extrabold"
                style={{ color: "hsl(178, 70%, 26%)" }}
              >
                ₪2,400/ח
              </span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span
                className="text-[11.5px]"
                style={{ color: "hsl(200, 12%, 48%)" }}
              >
                מסלול
              </span>
              <span
                className="text-[12.5px] font-semibold"
                style={{ color: "hsl(200, 30%, 10%)" }}
              >
                כללי
              </span>
            </div>
          </div>
        </Row>

        <Row label="KPI tiles row (mint)" where="Pension/Health Performance">
          <div className="grid grid-cols-3 gap-2">
            {[
              { l: "12 ח׳", v: "+8.4%" },
              { l: "3 שנים", v: "+18.6%" },
              { l: "5 שנים", v: "-2.1%", neg: true },
            ].map((r) => (
              <div
                key={r.l}
                className="rounded-xl py-2.5 text-center"
                style={{ background: "hsl(176, 55%, 91%)" }}
              >
                <p
                  className="text-[10px] mb-0.5"
                  style={{ color: "hsl(200, 12%, 48%)" }}
                >
                  {r.l}
                </p>
                <p
                  className="text-[15px] font-extrabold leading-none"
                  style={{
                    color: r.neg ? "hsl(0, 65%, 50%)" : "hsl(178, 80%, 14%)",
                  }}
                >
                  {r.v}
                </p>
              </div>
            ))}
          </div>
        </Row>

        <Row label="Comparison row (ok / expensive)" where="Health/Mortgage fees">
          <div className="space-y-2">
            <div
              className="flex items-center justify-between rounded-xl px-3 py-2.5"
              style={{
                background: "hsl(176, 55%, 91%)",
                border: "1px solid hsl(150, 50%, 82%)",
              }}
            >
              <span
                className="text-[11px] font-medium"
                style={{ color: "hsl(200, 30%, 10%)" }}
              >
                ממוצע שוק: 0.35%
              </span>
              <span
                className="text-[11px] font-extrabold"
                style={{ color: "hsl(178, 80%, 14%)" }}
              >
                תחת הממוצע
              </span>
            </div>
            <div
              className="flex items-center justify-between rounded-xl px-3 py-2.5"
              style={{
                background: "hsl(0, 80%, 96%)",
                border: "1px solid hsl(0, 80%, 90%)",
              }}
            >
              <span
                className="text-[11px] font-medium"
                style={{ color: "hsl(200, 30%, 10%)" }}
              >
                ממוצע שוק: 0.35%
              </span>
              <span
                className="text-[11px] font-extrabold"
                style={{ color: "hsl(0, 65%, 45%)" }}
              >
                יקר מהממוצע
              </span>
            </div>
          </div>
        </Row>

        <Row label="Empty state" where="filters with no items">
          <div
            className="px-4 py-8 text-center rounded-2xl"
            style={{
              background: "white",
              border: "1px solid hsl(230, 20%, 94%)",
            }}
          >
            <p
              className="text-[12px]"
              style={{ color: "hsl(230, 15%, 55%)" }}
            >
              אין פוליסות בקטגוריה זו
            </p>
          </div>
        </Row>
      </Section>

      {/* 7 — Buttons & Actions */}
      <Section title="Buttons & Actions">
        <Row label="Back circle (on hero)" where="white/18% blur">
          <button
            className="flex items-center justify-center w-9 h-9 rounded-full text-white"
            style={{
              background:
                "linear-gradient(160deg, hsl(258, 72%, 52%), hsl(265, 78%, 62%))",
            }}
          >
            <span
              className="flex items-center justify-center w-9 h-9 rounded-full"
              style={{
                background: "hsla(0,0%,100%,0.18)",
                border: "1px solid hsla(0,0%,100%,0.25)",
                backdropFilter: "blur(8px)",
              }}
            >
              <ChevronRight className="h-5 w-5" />
            </span>
          </button>
        </Row>

        <Row label="Back circle (on white)" where="DesignSystem header / IndexC">
          <button
            className="flex items-center justify-center w-9 h-9 rounded-full"
            style={{
              background: "hsl(230, 25%, 96%)",
              border: "1px solid hsl(230, 20%, 90%)",
            }}
          >
            <ChevronRight
              className="h-5 w-5"
              style={{ color: "hsl(250, 50%, 12%)" }}
            />
          </button>
        </Row>

        <Row label="Filter chips" where="CategoryPageC + Pension + Product">
          <div className="flex gap-1.5">
            <span
              className="inline-flex items-center text-[11px] font-medium px-3 py-1.5 rounded-full"
              style={{
                background: "hsl(250, 30%, 12%)",
                color: "white",
                boxShadow: "0 4px 12px hsla(250, 30%, 15%, 0.25)",
              }}
            >
              הכל
            </span>
            <span
              className="inline-flex items-center text-[11px] font-medium px-3 py-1.5 rounded-full"
              style={{
                background: "white",
                border: "1px solid hsl(230, 20%, 90%)",
                color: "hsl(230, 20%, 35%)",
                boxShadow: "0 1px 2px hsla(230, 20%, 40%, 0.04)",
              }}
            >
              חודשי
            </span>
            <span
              className="inline-flex items-center text-[11px] font-medium px-3 py-1.5 rounded-full"
              style={{
                background: "white",
                border: "1px solid hsl(230, 20%, 90%)",
                color: "hsl(230, 20%, 35%)",
              }}
            >
              שנתי
            </span>
          </div>
        </Row>

        <Row label="Action grid (4)" where="MortgageInvestmentPage actions">
          <div className="grid grid-cols-4 gap-2">
            {[
              { Icon: Calculator, label: "סימולציה" },
              { Icon: RefreshCw, label: "מחזור" },
              { Icon: ArrowDownToLine, label: "ייצא דוח" },
              { Icon: UserCog, label: "פנה ליועץ" },
            ].map(({ Icon, label }) => (
              <button
                key={label}
                className="flex flex-col items-center justify-center gap-1.5 rounded-2xl py-3 px-2 bg-white"
                style={{ border: "1px solid hsl(180, 18%, 90%)" }}
              >
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: "hsl(176, 55%, 91%)" }}
                >
                  <Icon
                    className="h-4 w-4"
                    style={{ color: "hsl(178, 70%, 26%)" }}
                  />
                </span>
                <span
                  className="text-[11px] font-semibold"
                  style={{ color: "hsl(200, 30%, 10%)" }}
                >
                  {label}
                </span>
              </button>
            ))}
          </div>
        </Row>

        <Row label="Dark CTA (Dana bubble)" where="DanaTeaserBubbles">
          <button
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-[12px] font-bold"
            style={{ background: "hsl(0, 0%, 8%)", color: "white" }}
          >
            ספרי לי איך
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
        </Row>
      </Section>

      {/* 8 — Pills & Badges */}
      <Section title="Pills & Badges">
        <Row label="Amount pill (teal)" where="Assets/Liab/Pension trailing">
          <div className="flex gap-2 flex-wrap">
            <AmountPillTeal>+₪3,200/ח</AmountPillTeal>
            <AmountPillTeal>-₪8,500/ח</AmountPillTeal>
            <AmountPillTeal>
              <Layers className="h-2.5 w-2.5" strokeWidth={2.5} />4 מוצרים
            </AmountPillTeal>
          </div>
        </Row>

        <Row label="Status missing (red)" where="InsurancePageC trailing">
          <span
            className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
            style={{
              background: "hsl(0, 80%, 95%)",
              color: "hsl(0, 65%, 45%)",
            }}
          >
            חסר
          </span>
        </Row>

        <Row label="Secondary KPI pill" where="hero secondary KPIs">
          <div
            className="inline-flex p-3 rounded-2xl"
            style={{
              background:
                "linear-gradient(160deg, hsl(258, 72%, 52%), hsl(265, 78%, 62%))",
            }}
          >
            <span
              className="inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-full text-white"
              style={{
                background: "hsla(0, 0%, 100%, 0.18)",
                border: "1px solid hsla(0, 0%, 100%, 0.18)",
                backdropFilter: "blur(8px)",
              }}
            >
              7 פוליסות פעילות
            </span>
          </div>
        </Row>

        <Row label="Red ! badge on icon tile" where="alert items">
          <span
            className="relative inline-block w-11 h-11 rounded-xl"
            style={{ background: "hsl(260, 75%, 95%)" }}
          >
            <span
              className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
              style={{
                background: "hsl(0, 78%, 55%)",
                border: "2px solid white",
              }}
            >
              !
            </span>
          </span>
        </Row>

        <Row label="Numeric badge (avatar)" where="Dana home card">
          <span className="relative inline-block">
            <span className="block w-12 h-12 rounded-full overflow-hidden">
              <img
                src={advisorImg}
                alt=""
                className="w-full h-full object-cover"
              />
            </span>
            <span
              className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
              style={{ background: "hsl(0, 78%, 55%)" }}
            >
              3
            </span>
          </span>
        </Row>

        <Row label="Live dot (with halo)" where="Dana row · IndexC card">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{
              background: "hsl(150, 65%, 45%)",
              boxShadow: "0 0 0 3px hsla(150, 65%, 45%, 0.18)",
            }}
          />
        </Row>

        <Row label="Drag handle" where="top of white sheet">
          <div className="flex justify-center">
            <div
              className="w-10 h-1.5 rounded-full"
              style={{ background: "hsl(230, 20%, 88%)" }}
            />
          </div>
        </Row>
      </Section>

      {/* 9 — Chat */}
      <Section title="Chat elements">
        <Row label="Bottom chat bar (FAB)" where="כל עמוד פנימי">
          <div
            className="rounded-full pr-2 pl-4 py-2 flex items-center gap-2"
            style={{
              background: "white",
              boxShadow:
                "0 8px 32px hsla(250, 30%, 30%, 0.14), 0 2px 8px hsla(250, 30%, 30%, 0.06)",
              border: "1px solid hsl(230, 20%, 92%)",
            }}
          >
            <span
              className="tri-ring-c relative w-11 h-11 rounded-full flex-shrink-0"
              style={{ transform: "translateY(-2px)" }}
            >
              <span
                className="block w-full h-full rounded-full overflow-hidden"
                style={{ boxShadow: "0 6px 20px hsla(250, 30%, 20%, 0.35)" }}
              >
                <img
                  src={advisorImg}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </span>
            </span>
            <span
              className="flex-1 text-start text-sm"
              style={{ color: "hsl(230, 15%, 55%)" }}
            >
              שאל את Finansee AI
            </span>
            <span
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{
                background: "hsl(230, 25%, 96%)",
                border: "1px solid hsl(230, 20%, 90%)",
              }}
            >
              <Mic
                className="h-4 w-4"
                style={{ color: "hsl(230, 15%, 45%)" }}
              />
            </span>
            <span className="tri-ring-c relative w-9 h-9 rounded-full flex-shrink-0">
              <span className="flex w-full h-full rounded-full items-center justify-center cta-tri-c">
                <Send
                  className="h-4 w-4 -rotate-90"
                  style={{ color: "white" }}
                />
              </span>
            </span>
          </div>
        </Row>

        <Row label="Dana insights row (in-page)" where="PensionProduct / Health">
          <div
            className="flex items-center gap-3 rounded-2xl bg-white p-4"
            style={{
              boxShadow:
                "0 8px 24px hsla(250, 30%, 25%, 0.08), 0 1px 3px hsla(250, 30%, 25%, 0.04)",
              border: "1px solid hsl(230, 20%, 94%)",
            }}
          >
            <span className="relative w-14 h-14 rounded-full flex-shrink-0">
              <span
                className="block w-full h-full rounded-full overflow-hidden"
                style={{ border: "2px solid hsl(265, 60%, 70%)" }}
              >
                <img
                  src={advisorImg}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </span>
              <span
                className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 rounded-full flex items-center justify-center text-[12px] font-extrabold text-white"
                style={{
                  background: "hsl(0, 78%, 55%)",
                  border: "2px solid white",
                }}
              >
                !
              </span>
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-end gap-1.5">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{
                    background: "hsl(150, 65%, 45%)",
                    boxShadow: "0 0 0 3px hsla(150, 65%, 45%, 0.18)",
                  }}
                />
                <p
                  className="text-[14px] font-extrabold tracking-tight leading-snug truncate"
                  style={{ color: "hsl(250, 50%, 12%)" }}
                >
                  מצאתי לך הזדמנות לשפר!
                </p>
              </div>
              <p
                className="text-[11.5px] mt-1"
                style={{ color: "hsl(230, 15%, 50%)" }}
              >
                בלחיצה כאן אפשר להרוויח מעל ₪48,000
              </p>
            </div>
            <ChevronLeft
              className="h-5 w-5 flex-shrink-0"
              style={{ color: "hsl(230, 15%, 60%)" }}
            />
          </div>
        </Row>

        <Row label="Dana home card" where="IndexC home">
          <div
            className="rounded-2xl p-4 flex items-center gap-3 bg-white"
            style={{
              boxShadow: "0 4px 18px hsla(250, 30%, 25%, 0.08)",
              border: "1px solid hsl(230, 20%, 93%)",
            }}
          >
            <span className="relative">
              <span className="tri-ring-c relative w-12 h-12 rounded-full block">
                <span className="block w-full h-full rounded-full overflow-hidden">
                  <img
                    src={advisorImg}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </span>
              </span>
              <span
                className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                style={{ background: "hsl(0, 78%, 55%)" }}
              >
                3
              </span>
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p
                  className="text-sm font-bold"
                  style={{ color: "hsl(250, 40%, 18%)" }}
                >
                  התובנות של דנה
                </p>
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: "hsl(150, 65%, 48%)",
                    boxShadow: "0 0 0 3px hsla(150, 65%, 48%, 0.18)",
                  }}
                />
              </div>
              <p
                className="text-[11px] mt-0.5"
                style={{ color: "hsl(230, 15%, 50%)" }}
              >
                פעולות לשיפור מחכות לך
              </p>
            </div>
            <ChevronLeft
              className="h-4 w-4"
              style={{ color: "hsl(230, 15%, 55%)" }}
            />
          </div>
        </Row>

        <Row label="Dana teaser bubble" where="DanaTeaserBubbles">
          <div className="max-w-[300px] ml-auto">
            <div
              className="relative rounded-2xl rounded-br-sm pt-6 pb-3.5 px-3.5 pr-4"
              style={{
                background: "white",
                border: "1px solid hsl(230, 20%, 92%)",
                boxShadow: "0 8px 28px hsla(250, 30%, 25%, 0.18)",
              }}
            >
              <button
                className="absolute top-2 left-2 w-5 h-5 rounded-full flex items-center justify-center"
              >
                <X
                  className="h-3 w-3"
                  style={{ color: "hsl(230, 15%, 55%)" }}
                />
              </button>
              <p
                className="text-[12px] leading-relaxed pr-1 text-right"
                style={{ color: "hsl(250, 35%, 20%)" }}
              >
                מצאתי לך חיסכון של{" "}
                <strong style={{ color: "hsl(250, 50%, 12%)" }}>₪48,000</strong>{" "}
                ✨
              </p>
              <button
                className="mt-2.5 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-[12px] font-bold"
                style={{ background: "hsl(0, 0%, 8%)", color: "white" }}
              >
                ספרי לי איך
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </Row>

        <Row label="Dana greeting bubble (in sheet)" where="InsightsSheetC">
          <div className="flex items-end gap-2">
            <div
              className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0"
              style={{ boxShadow: "0 2px 6px hsla(275, 65%, 25%, 0.35)" }}
            >
              <img
                src={advisorImg}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="rounded-2xl rounded-br-md px-3.5 py-2.5"
              style={{
                background: "white",
                border: "1px solid hsl(230, 20%, 92%)",
                boxShadow: "0 2px 10px hsla(230, 30%, 50%, 0.06)",
              }}
            >
              <p
                className="text-xs leading-relaxed text-right"
                style={{ color: "hsl(250, 35%, 25%)" }}
              >
                היי משה 👋 הכנתי לך תובנות על המצב הפיננסי שלך.
              </p>
            </div>
          </div>
        </Row>

        <Row label="Typing indicator" where="InsightsSheetC">
          <div className="flex items-end gap-2">
            <div
              className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0"
              style={{ boxShadow: "0 2px 6px hsla(275, 65%, 25%, 0.35)" }}
            >
              <img
                src={advisorImg}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="rounded-2xl rounded-br-md px-3.5 py-3 flex items-center gap-1"
              style={{
                background: "white",
                border: "1px solid hsl(230, 20%, 92%)",
                boxShadow: "0 2px 10px hsla(230, 30%, 50%, 0.06)",
              }}
            >
              {[0, 0.2, 0.4].map((d) => (
                <span
                  key={d}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: "hsl(230, 15%, 65%)",
                    animation: "typing-dot 1.2s infinite",
                    animationDelay: `${d}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </Row>

        <Row label="Insights gradient bubble" where="InsightsSheetC context">
          <div
            className="rounded-2xl rounded-br-md p-3.5"
            style={{
              background:
                "linear-gradient(135deg, hsl(258, 72%, 55%) 0%, hsl(265, 78%, 65%) 55%, hsl(275, 85%, 78%) 100%)",
              boxShadow: "0 8px 24px hsla(280, 60%, 30%, 0.35)",
            }}
          >
            <div className="flex gap-1.5 mb-3">
              <span
                className="flex-1 py-1.5 rounded-lg text-[11px] font-semibold text-center"
                style={{
                  background: "hsla(0,0%,100%,0.95)",
                  color: "hsl(262, 75%, 52%)",
                }}
              >
                ביטוח
              </span>
              <span
                className="flex-1 py-1.5 rounded-lg text-[11px] font-semibold text-center text-white"
                style={{
                  background: "hsla(0,0%,100%,0.18)",
                  border: "1px solid hsla(0,0%,100%,0.22)",
                }}
              >
                נכסים
              </span>
            </div>
            <p
              className="text-[13px] leading-relaxed"
              style={{ color: "hsla(0,0%,100%,0.92)" }}
            >
              3 הזדמנויות לחיסכון חודשי של ₪1,200
            </p>
          </div>
        </Row>
      </Section>

      <div className="h-12" />
    </div>
  );
};

export default DesignSystemPage;
