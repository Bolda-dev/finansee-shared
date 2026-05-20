import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ChevronRight,
  PiggyBank,
  Briefcase,
  Landmark,
  ShieldCheck,
  ArrowDownToLine,
  ArrowLeftRight,
  RefreshCw,
  UserCog,
  Mic,
  Send,
  TrendingUp,
} from "lucide-react";
import advisorImg from "@/assets/advisor-avatar.jpg";
import { pensionProducts, type PensionProduct } from "@/lib/data";
import { InsightsSheetC } from "@/components/InsightsSheetC";

const formatNIS = (n: number) => "₪" + n.toLocaleString("he-IL");

const iconForType = (t: PensionProduct["type"]) => {
  switch (t) {
    case "pension": return PiggyBank;
    case "study": return Briefcase;
    case "gemel": return Landmark;
    case "managers": return ShieldCheck;
    default: return PiggyBank;
  }
};

// Teal palette — matches Assets
const C = {
  deep: "hsl(178, 80%, 14%)",
  core: "hsl(178, 70%, 26%)",
  fresh: "hsl(174, 65%, 42%)",
  bright: "hsl(170, 70%, 52%)",
  mint: "hsl(176, 55%, 91%)",
  soft: "hsl(180, 25%, 97%)",
  ink: "hsl(200, 30%, 10%)",
  muted: "hsl(200, 12%, 48%)",
  hairline: "hsl(180, 18%, 90%)",
};

const Sparkline = ({ values, color }: { values: number[]; color: string }) => {
  const w = 280, h = 64;
  const min = Math.min(...values), max = Math.max(...values);
  const range = Math.max(1, max - min);
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 6) - 3;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[64px]" preserveAspectRatio="none">
      <defs>
        <linearGradient id="psFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${h} ${pts.join(" ")} ${w},${h}`} fill="url(#psFill)" />
      <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
};

const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div
    className="relative rounded-2xl bg-white p-4 text-right overflow-hidden"
    style={{ border: `1px solid ${C.hairline}`, boxShadow: "0 1px 2px hsla(155, 30%, 20%, 0.04)" }}
    dir="rtl"
  >
    {/* Right accent bar (RTL) */}
    <span
      className="absolute top-3 bottom-3 right-0 w-[3px] rounded-full"
      style={{ background: `linear-gradient(180deg, ${C.fresh}, ${C.core})` }}
      aria-hidden
    />
    <h3 className="text-[12px] font-bold mb-3 pr-2" style={{ color: C.ink, letterSpacing: "-0.01em" }}>
      {title}
    </h3>
    <div className="pr-2">{children}</div>
  </div>
);

const Row = ({ label, value, accent }: { label: string; value: React.ReactNode; accent?: boolean }) => (
  <div className="flex items-center justify-between py-1.5">
    <span className="text-[11.5px]" style={{ color: C.muted }}>{label}</span>
    <span className={`text-[12.5px] ${accent ? "font-extrabold" : "font-semibold"}`} style={{ color: accent ? C.core : C.ink }}>
      {value}
    </span>
  </div>
);

const ActionBtn = ({ Icon, label }: { Icon: any; label: string }) => (
  <button
    className="flex flex-col items-center justify-center gap-1.5 rounded-2xl py-3 px-2 transition-transform active:scale-[0.97] bg-white"
    style={{ border: `1px solid ${C.hairline}` }}
  >
    <span className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: C.mint }}>
      <Icon className="h-4 w-4" style={{ color: C.core }} />
    </span>
    <span className="text-[11px] font-semibold" style={{ color: C.ink }}>{label}</span>
  </button>
);

type TabKey = "overview" | "performance" | "fees" | "coverage";

const PensionProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const product = pensionProducts.find((p) => p.id === id);

  const [chatOpen, setChatOpen] = useState(false);
  const [tab, setTab] = useState<TabKey>("overview");

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" dir="rtl" style={{ background: C.soft }}>
        <button onClick={() => navigate("/assets/pension")} className="text-[13px] font-semibold underline" style={{ color: C.core }}>
          המוצר לא נמצא — חזרה לרשימה
        </button>
      </div>
    );
  }

  const Icon = iconForType(product.type);
  const isExpensive = product.managementFromBalance > product.marketAvgFromBalance;

  const tabs: { key: TabKey; label: string }[] = [
    { key: "overview", label: "סקירה" },
    { key: "performance", label: "ביצועים" },
    { key: "fees", label: "דמי ניהול" },
    ...(product.coverage ? [{ key: "coverage" as TabKey, label: "כיסויים" }] : []),
  ];

  return (
    <div className="min-h-screen max-w-[430px] mx-auto relative" dir="rtl" style={{ background: C.soft }}>
      {/* Header strip + breadcrumb on light bg */}
      <div className="px-5 pt-8 pb-3">
        <nav
          className="inline-flex items-center text-[11px] font-semibold"
          aria-label="breadcrumb"
          dir="rtl"
          style={{ color: C.muted }}
        >
          <button onClick={() => navigate("/assets")} className="hover:opacity-80 transition-opacity">נכסים</button>
          <span className="mx-1.5" style={{ color: C.hairline }}>/</span>
          <button onClick={() => navigate("/assets/pension")} className="hover:opacity-80 transition-opacity">פנסיה</button>
          <span className="mx-1.5" style={{ color: C.hairline }}>/</span>
          <span className="font-extrabold tracking-tight" style={{ color: C.core }}>{product.label}</span>
        </nav>
      </div>

      {/* HERO — Floating contained green card */}
      <div className="px-4">
        <div
          className="relative rounded-3xl p-5 text-white overflow-hidden"
          style={{
            background: `linear-gradient(155deg, ${C.deep} 0%, ${C.core} 65%, ${C.fresh} 130%)`,
            boxShadow: `0 14px 36px hsla(178, 70%, 12%, 0.28), 0 2px 6px hsla(178, 70%, 12%, 0.10)`,
          }}
        >
          {/* Decorative arcs in top-left corner (RTL: visual far side) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-70"
            viewBox="0 0 200 200"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden
          >
            {[60, 100, 140, 180].map((r) => (
              <circle key={r} cx={0} cy={0} r={r} fill="none" stroke="hsla(0,0%,100%,0.10)" strokeWidth="1" />
            ))}
          </svg>

          {/* Header row: identity + icon tile */}
          <div className="relative flex items-start justify-between gap-3 mb-5">
            <div className="flex-1 min-w-0">
              <h1 className="text-[18px] font-extrabold leading-tight tracking-tight truncate">
                {product.label}
              </h1>
              <p className="text-[11px] font-medium opacity-80 truncate mt-0.5">
                {product.provider} · {product.typeLabel}
              </p>
            </div>
            <span
              className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "hsla(0,0%,100%,0.16)",
                backdropFilter: "blur(8px)",
                border: "1px solid hsla(0,0%,100%,0.18)",
              }}
            >
              <Icon className="h-5 w-5 text-white" strokeWidth={2.2} />
            </span>
          </div>

          {/* Primary KPI — left-aligned editorial */}
          <div className="relative mb-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] opacity-70 mb-1">
              צבירה כוללת
            </p>
            <p className="text-[34px] font-extrabold tracking-tight leading-none">
              {formatNIS(product.balance)}
            </p>
          </div>

          {/* KPI 2x2 mini grid */}
          <div className="relative grid grid-cols-2 gap-2.5">
            <div
              className="rounded-2xl p-3"
              style={{ background: "hsla(178, 80%, 8%, 0.32)", border: "1px solid hsla(0,0%,100%,0.08)" }}
            >
              <p className="text-[10px] font-semibold opacity-70 mb-1">סטטוס</p>
              <div className="flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: product.status === "active" ? "hsl(150, 80%, 60%)" : "hsl(30, 95%, 65%)",
                    boxShadow: `0 0 8px ${product.status === "active" ? "hsl(150, 80%, 60%)" : "hsl(30, 95%, 65%)"}`,
                  }}
                />
                <span className="text-[12px] font-bold">
                  {product.status === "active" ? "פעיל" : "לא פעיל"}
                </span>
              </div>
            </div>
            <div
              className="rounded-2xl p-3"
              style={{ background: "hsla(178, 80%, 8%, 0.32)", border: "1px solid hsla(0,0%,100%,0.08)" }}
            >
              <p className="text-[10px] font-semibold opacity-70 mb-1">
                {product.projectedPension
                  ? "צפי קצבה"
                  : product.liquidFrom
                  ? "נזיל מ-"
                  : product.monthlyDeposit
                  ? "הפקדה חודשית"
                  : "הפקדה"}
              </p>
              <p className="text-[12px] font-bold">
                {product.projectedPension
                  ? formatNIS(product.projectedPension)
                  : product.liquidFrom
                  ? product.liquidFrom
                  : product.monthlyDeposit
                  ? formatNIS(product.monthlyDeposit)
                  : "—"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Underline tabs on light bg */}
      <div className="px-5 mt-6">
        <div className="flex gap-1 overflow-x-auto" style={{ borderBottom: `1px solid ${C.hairline}`, scrollbarWidth: "none" }} role="tablist">
          {tabs.map((t) => {
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                role="tab"
                aria-selected={active}
                onClick={() => setTab(t.key)}
                className="relative px-4 py-3 text-[12px] font-bold whitespace-nowrap transition-colors"
                style={{ color: active ? C.core : C.muted }}
              >
                {t.label}
                {active && (
                  <span
                    className="absolute -bottom-px left-2 right-2 h-[2.5px] rounded-t-full"
                    style={{ background: `linear-gradient(90deg, ${C.fresh}, ${C.core})` }}
                    aria-hidden
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content area */}
      <div className="px-4 pt-4 pb-40 flex flex-col gap-4">


        {/* Tab content */}
        {tab === "overview" && (
          <SectionCard title="פרטי החיסכון">
            <Row label="הפקדה חודשית" value={product.monthlyDeposit ? `${formatNIS(product.monthlyDeposit)}/ח` : "לא פעיל"} accent />
            {product.employer && (
              <>
                <Row label="חלק מעסיק" value={`${product.employer.employer}%`} />
                <Row label="חלק עובד" value={`${product.employer.employee}%`} />
                <Row label="פיצויים" value={`${product.employer.severance}%`} />
              </>
            )}
            <Row label="תאריך הצטרפות" value={product.joinedAt} />
            <Row label="מסלול" value={product.track} />
          </SectionCard>
        )}

        {tab === "performance" && (
          <SectionCard title="ביצועים">
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                { l: "12 ח׳", v: product.return12m },
                { l: "3 שנים", v: product.return3y },
                { l: "5 שנים", v: product.return5y },
              ].map((r) => (
                <div key={r.l} className="rounded-xl py-2.5 text-center" style={{ background: C.mint }}>
                  <p className="text-[10px] mb-0.5" style={{ color: C.muted }}>{r.l}</p>
                  <p
                    className="text-[15px] font-extrabold leading-none"
                    style={{ color: r.v >= 0 ? C.deep : "hsl(0, 65%, 50%)" }}
                  >
                    {r.v >= 0 ? "+" : ""}{r.v}%
                  </p>
                </div>
              ))}
            </div>
            <Sparkline values={product.history} color={C.core} />
            <div className="flex items-center justify-between mt-2">
              <p className="text-[10.5px]" style={{ color: C.muted }}>{product.track}</p>
              <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold" style={{ color: C.core }}>
                <TrendingUp className="h-3 w-3" /> תשואה מצטברת
              </span>
            </div>
          </SectionCard>
        )}

        {tab === "fees" && (
          <SectionCard title="דמי ניהול">
            <Row label="מצבירה" value={`${product.managementFromBalance}%`} accent />
            <Row label="מהפקדה" value={`${product.managementFromDeposit}%`} />
            <div
              className="mt-3 flex items-center justify-between rounded-xl px-3 py-2.5"
              style={{
                background: isExpensive ? "hsl(0, 80%, 96%)" : C.mint,
                border: `1px solid ${isExpensive ? "hsl(0, 80%, 90%)" : "hsl(150, 50%, 82%)"}`,
              }}
            >
              <span className="text-[11px] font-medium" style={{ color: C.ink }}>
                ממוצע שוק: {product.marketAvgFromBalance}%
              </span>
              <span
                className="text-[11px] font-extrabold"
                style={{ color: isExpensive ? "hsl(0, 65%, 45%)" : C.deep }}
              >
                {isExpensive ? "יקר מהממוצע" : "תחת הממוצע"}
              </span>
            </div>
          </SectionCard>
        )}

        {tab === "coverage" && product.coverage && (
          <SectionCard title="כיסויים ביטוחיים">
            <Row label="שאירים" value={product.coverage.survivors} />
            <Row label="נכות" value={product.coverage.disability} />
            <Row label="מקרה מוות" value={product.coverage.death} />
          </SectionCard>
        )}

        {/* Actions — daily quick actions first */}
        <SectionCard title="פעולות">
          <div className="grid grid-cols-4 gap-2">
            <ActionBtn Icon={ArrowDownToLine} label="ייצא דוח" />
            <ActionBtn Icon={RefreshCw} label="שנה מסלול" />
            <ActionBtn Icon={ArrowLeftRight} label="ניוד" />
            <ActionBtn Icon={UserCog} label="פנה לסוכן" />
          </div>
        </SectionCard>

        {/* Dana insight card — closing insight, more breathing room */}
        <div
          className="rounded-2xl p-5 text-right"
          style={{
            background: `linear-gradient(135deg, ${C.deep} 0%, ${C.core} 100%)`,
            boxShadow: `0 8px 24px hsla(178, 70%, 14%, 0.30)`,
          }}
          dir="rtl"
        >
          <div className="flex items-start gap-3 mb-4">
            <span className="tri-ring-c relative w-12 h-12 rounded-full flex-shrink-0">
              <span className="block w-full h-full rounded-full overflow-hidden" style={{ boxShadow: "0 4px 10px hsla(0, 0%, 0%, 0.3)" }}>
                <img src={advisorImg} alt="דנה" className="w-full h-full object-cover" />
              </span>
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-extrabold text-white mb-1.5">דנה — תובנה אישית</p>
              <p className="text-[12px] leading-relaxed text-white/90">
                {isExpensive ? (
                  <>
                    דמי הניהול שלך ({product.managementFromBalance}%) גבוהים מממוצע השוק. מעבר למסלול דומה
                    בדמי ניהול 0.3% יחסוך לך כ-
                    <strong> {formatNIS(Math.round((product.managementFromBalance - 0.3) * product.balance / 100))}</strong> בשנה.
                  </>
                ) : product.return12m > 7 ? (
                  <>
                    ביצועי המוצר טובים — תשואה של {product.return12m}% ב-12 החודשים האחרונים.
                    בוא נבדוק יחד אם המסלול מתאים לפרופיל הסיכון שלך.
                  </>
                ) : (
                  <>
                    התשואה כאן נמוכה יחסית. שווה לבחון מסלול עם חשיפה גבוהה יותר למניות
                    בהתאם לטווח הפרישה שלך.
                  </>
                )}
              </p>
            </div>
          </div>
          <button
            onClick={() => setChatOpen(true)}
            className="w-full rounded-xl py-3 text-[12.5px] font-bold flex items-center justify-center gap-1.5 bg-white"
            style={{ color: C.deep }}
          >
            פתחי שיחה איתי
            <Send className="h-3.5 w-3.5 -rotate-90" />
          </button>
        </div>

        <p className="text-[10.5px] text-center mt-2 px-6" style={{ color: C.muted }}>
          הנתונים מתעדכנים אוטומטית מהמסלקה הפנסיונית
        </p>
      </div>



      {/* Bottom Chat Bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-40 px-4 pb-4 pointer-events-none" dir="rtl">
        <button
          onClick={() => setChatOpen(true)}
          dir="rtl"
          className="pointer-events-auto w-full flex items-center gap-2 rounded-full pr-2 pl-4 py-2 transition-all active:scale-[0.99] bg-white"
          style={{
            boxShadow: "0 8px 32px hsla(155, 50%, 18%, 0.14), 0 2px 8px hsla(155, 50%, 18%, 0.06)",
            border: `1px solid ${C.hairline}`,
          }}
          aria-label="פתח צ׳אט עם Finansee AI"
        >
          <span className="tri-ring-c relative w-11 h-11 rounded-full flex-shrink-0" style={{ transform: "translateY(-2px)" }}>
            <span className="block w-full h-full rounded-full overflow-hidden" style={{ boxShadow: "0 6px 20px hsla(155, 50%, 18%, 0.35)" }}>
              <img src={advisorImg} alt="Finansee AI" className="w-full h-full object-cover" />
            </span>
          </span>
          <span className="flex-1 text-start text-sm" style={{ color: C.muted }}>
            שאל את Finansee AI
          </span>
          <span className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: C.soft, border: `1px solid ${C.hairline}` }}>
            <Mic className="h-4 w-4" style={{ color: C.muted }} />
          </span>
          <span className="tri-ring-c relative w-9 h-9 rounded-full flex-shrink-0">
            <span className="flex w-full h-full rounded-full items-center justify-center cta-tri-c">
              <Send className="h-4 w-4 -rotate-90" style={{ color: "white" }} />
            </span>
          </span>
        </button>
      </div>

      <InsightsSheetC open={chatOpen} onOpenChange={setChatOpen} mode="context" />
    </div>
  );
};

export default PensionProductPage;
