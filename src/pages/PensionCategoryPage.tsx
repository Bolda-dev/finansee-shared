import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PiggyBank,
  Briefcase,
  Landmark,
  ShieldCheck,
  Mic,
  Send,
  ChevronLeft,
} from "lucide-react";
import advisorImg from "@/assets/advisor-avatar.jpg";
import { pensionProducts, type PensionProduct } from "@/lib/data";
import { InsightsSheetC } from "@/components/InsightsSheetC";
import { ProviderLogo } from "@/lib/providerLogo";
import { StickyHeader } from "@/components/StickyHeader";

// Brand palette — same teal as Assets, applied with a different LAYOUT
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

const formatNIS = (n: number) => "₪" + n.toLocaleString("he-IL");
const formatCompact = (n: number) =>
  n >= 1_000_000 ? `₪${(n / 1_000_000).toFixed(2)}M` : formatNIS(n);

const iconForType = (t: PensionProduct["type"]) => {
  switch (t) {
    case "pension": return PiggyBank;
    case "study": return Briefcase;
    case "gemel": return Landmark;
    case "managers": return ShieldCheck;
    default: return PiggyBank;
  }
};

type FilterKey = "all" | "pension" | "study_gemel" | "managers" | "alert";
const filters: { key: FilterKey; label: string; test: (p: PensionProduct) => boolean }[] = [
  { key: "all", label: "הכל", test: () => true },
  { key: "pension", label: "קרנות פנסיה", test: (p) => p.type === "pension" },
  { key: "study_gemel", label: "קופ״ג והשתלמות", test: (p) => p.type === "study" || p.type === "gemel" },
  { key: "managers", label: "ביטוחי מנהלים", test: (p) => p.type === "managers" },
  { key: "alert", label: "התראות", test: (p) => !!p.alert },
];

const PensionCategoryPage = () => {
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  const [active, setActive] = useState<FilterKey>("all");

  const totalBalance = pensionProducts.reduce((s, p) => s + p.balance, 0);
  const monthlyPension = pensionProducts.reduce((s, p) => s + (p.projectedPension ?? 0), 0);
  const activeCount = pensionProducts.filter((p) => p.status === "active").length;
  const currentFilter = filters.find((f) => f.key === active) ?? filters[0];
  const visible = pensionProducts.filter(currentFilter.test);

  return (
    <div className="min-h-screen max-w-[430px] mx-auto relative" dir="rtl" style={{ background: C.soft }}>
      <StickyHeader
        title="פנסיה"
        backTo="/assets"
        gradient={`linear-gradient(160deg, ${C.deep} 0%, ${C.core} 70%, ${C.fresh} 130%)`}
        shadowColor="hsla(178, 70%, 12%, 0.25)"
      />
      {/* Compact teal banner — short, just identity */}
      <div
        className="relative px-5 pt-10 pb-20 overflow-hidden hero-rise"
        style={{
          background: `linear-gradient(160deg, ${C.deep} 0%, ${C.core} 70%, ${C.fresh} 130%)`,
        }}
      >
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
          viewBox="0 0 200 120"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          {[40, 70, 100, 130, 160].map((r) => (
            <circle key={r} cx={0} cy={0} r={r} fill="none" stroke="hsla(0,0%,100%,0.08)" strokeWidth="1" />
          ))}
        </svg>

        {/* Top bar: back button + centered title */}
        <div className="relative flex items-center justify-center min-h-[40px]" dir="rtl">
          <button
            onClick={() => navigate("/assets")}
            className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full text-white transition-all hover:scale-105 active:scale-95"
            style={{
              background: "hsla(0,0%,100%,0.18)",
              border: "1px solid hsla(0,0%,100%,0.25)",
              backdropFilter: "blur(8px)",
            }}
            aria-label="חזרה"
          >
            <ChevronLeft className="h-5 w-5 rotate-180" />
          </button>
          <h1 className="text-[15px] font-extrabold text-white truncate max-w-[230px]">פנסיה</h1>
        </div>


        <div className="relative flex items-center justify-between mt-4">
          <h2 className="text-[14px] font-medium text-white/75">סך החיסכון הפנסיוני</h2>
          <span className="text-[11px] font-medium text-white/60">מעודכן להיום</span>
        </div>
      </div>

      {/* Floating Summary Card — no avatar, clean KPI */}
      <div className="px-5 -mt-12 relative z-10 float-card-in">
        <div
          className="w-full text-right rounded-2xl bg-white p-5"
          style={{
            border: `1px solid ${C.hairline}`,
            boxShadow: "0 14px 36px hsla(178, 70%, 12%, 0.18), 0 2px 6px hsla(178, 70%, 12%, 0.06)",
          }}
        >
          <p className="text-[11px] font-bold uppercase tracking-wide mb-1" style={{ color: C.muted }}>
            סך החיסכון הפנסיוני
          </p>
          <p className="text-[36px] font-extrabold tracking-tight leading-none" style={{ color: C.ink }}>
            <span className="text-[20px] font-bold ml-1" style={{ color: C.core }}>₪</span>
            {(totalBalance / 1_000_000).toFixed(2)}M
          </p>
          <p className="text-[11px] mt-1.5 font-medium" style={{ color: C.muted }}>
            {pensionProducts.length} מוצרים פנסיוניים
          </p>

          <div className="grid grid-cols-2 gap-3 pt-4 mt-4" style={{ borderTop: `1px solid ${C.hairline}` }}>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: C.muted }}>צפי קצבה</p>
              <p className="text-[14px] font-extrabold" style={{ color: C.ink }}>{formatNIS(monthlyPension)}<span className="text-[10px] font-medium opacity-70">/חודש</span></p>
            </div>
            <div className="pr-3" style={{ borderRight: `1px solid ${C.hairline}` }}>
              <p className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: C.muted }}>פעילים</p>
              <p className="text-[14px] font-extrabold" style={{ color: C.ink }}>{activeCount} <span className="text-[10px] font-medium opacity-70">מוצרים</span></p>
            </div>
          </div>
        </div>
      </div>


      {/* Filter chips */}
      <div className="px-4 pt-3 pb-1">
        <div className="flex gap-1.5 overflow-x-auto overflow-y-visible px-2 py-4 -mx-2 -my-3" style={{ scrollbarWidth: "none" }}>
          {filters.map((chip) => {
            const isActive = chip.key === active;
            return (
              <button
                key={chip.key}
                onClick={() => setActive(chip.key)}
                className="inline-flex items-center text-[11px] font-medium px-3 py-1.5 rounded-full transition-all hover:scale-[1.04] active:scale-[0.98] flex-shrink-0"
                style={{
                  background: isActive ? "hsl(250, 30%, 12%)" : "white",
                  border: isActive
                    ? "1px solid hsl(250, 30%, 12%)"
                    : "1px solid hsl(230, 20%, 90%)",
                  color: isActive ? "white" : "hsl(230, 20%, 35%)",
                  boxShadow: isActive
                    ? "0 4px 12px hsla(250, 30%, 15%, 0.25)"
                    : "0 1px 2px hsla(230, 20%, 40%, 0.04)",
                }}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* List header */}
      <div className="px-5 mt-3 mb-2 flex items-center justify-between">
        <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: C.muted }}>
          מוצרי הפנסיה שלך
        </p>
        <span className="text-[11px] font-semibold" style={{ color: C.muted }}>
          {visible.length} מוצרים
        </span>
      </div>

      {/* Product list — Assets-style rows */}
      <div className="mx-4 pb-32 flex flex-col gap-2.5">
        {visible.length === 0 && (
          <div
            className="px-4 py-8 text-center rounded-2xl bg-white"
            style={{ border: "1px solid hsl(230, 20%, 94%)" }}
          >
            <p className="text-[12px]" style={{ color: "hsl(230, 15%, 55%)" }}>אין מוצרים בקטגוריה זו</p>
          </div>
        )}
        {visible.map((p) => (
          <button
            key={p.id}
            onClick={() => navigate(`/assets/pension/${p.id}`)}
            className="w-full flex items-start gap-3 px-4 py-4 rounded-2xl transition-colors hover:bg-[hsl(230,25%,98%)] active:bg-[hsl(230,25%,96%)]"
            style={{
              background: "white",
              boxShadow: "0 3px 14px hsla(250, 30%, 25%, 0.05)",
              border: "1px solid hsl(230, 20%, 94%)",
            }}
            dir="rtl"
          >
            {/* Logo (right in RTL) */}
            <span className="relative flex-shrink-0">
              <ProviderLogo provider={p.provider} size={44} />
              {p.alert && (
                <span
                  className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                  style={{ background: "hsl(0, 78%, 55%)", border: "2px solid white" }}
                >
                  !
                </span>
              )}
            </span>

            {/* Title + subtitle */}
            <div className="flex-1 min-w-0 text-right">
              <p className="text-[14px] font-bold tracking-tight" style={{ color: "hsl(250, 50%, 12%)" }}>
                {p.provider}
              </p>
              <p className="text-[11.5px] mt-0.5 truncate" style={{ color: "hsl(230, 15%, 55%)" }}>
                {p.label} · {p.typeLabel}
              </p>
            </div>

            {/* Trailing */}
            <div className="flex items-center gap-1.5 flex-shrink-0 self-center">
              <div className="text-left">
                <p className="text-[13px] font-extrabold tracking-tight" style={{ color: "hsl(250, 50%, 12%)" }}>
                  {formatNIS(p.balance)}
                </p>
                {p.monthlyDeposit ? (
                  <span
                    className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full mt-1"
                    style={{
                      background: "hsl(150, 60%, 93%)",
                      color: "hsl(150, 65%, 26%)",
                      border: "1px solid hsl(150, 55%, 84%)",
                    }}
                  >
                    +{formatNIS(p.monthlyDeposit)}/חודש
                  </span>
                ) : (
                  <span className="block text-[10px] font-medium mt-0.5" style={{ color: "hsl(230, 15%, 55%)" }}>ללא הפקדה</span>
                )}
              </div>
              <ChevronLeft className="h-4 w-4 flex-shrink-0" style={{ color: "hsl(230, 15%, 60%)" }} />
            </div>
          </button>
        ))}

        <p className="text-[10.5px] text-center mt-3 px-6" style={{ color: C.muted }}>
          הנתונים מתעדכנים אוטומטית מהמסלקה הפנסיונית
        </p>
      </div>

      {/* Bottom Chat Bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-40 px-4 pb-4 pointer-events-none before:content-[''] before:absolute before:inset-x-0 before:bottom-0 before:h-[160px] before:bg-gradient-to-t before:from-white before:via-white/85 before:to-transparent before:-z-10 before:pointer-events-none" dir="rtl">
        <button
          onClick={() => setChatOpen(true)}
          dir="rtl"
          className="pointer-events-auto w-full flex items-center gap-2 rounded-full pr-2 pl-4 py-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
          style={{
            background: "white",
            boxShadow: "0 8px 32px hsla(250, 30%, 30%, 0.14), 0 2px 8px hsla(250, 30%, 30%, 0.06)",
            border: "1px solid hsl(230, 20%, 92%)",
          }}
          aria-label="פתח צ׳אט עם Finansee AI"
        >
          <span className="tri-ring-c relative w-11 h-11 rounded-full flex-shrink-0" style={{ transform: "translateY(-2px)" }}>
            <span className="block w-full h-full rounded-full overflow-hidden" style={{ boxShadow: "0 6px 20px hsla(250, 30%, 20%, 0.35)" }}>
              <img src={advisorImg} alt="Finansee AI" className="w-full h-full object-cover" />
            </span>
          </span>
          <span className="flex-1 text-start text-sm" style={{ color: "hsl(230, 15%, 55%)" }}>
            שאל את Finansee AI
          </span>
          <span
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "hsl(230, 25%, 96%)", border: "1px solid hsl(230, 20%, 90%)" }}
          >
            <Mic className="h-4 w-4" style={{ color: "hsl(230, 15%, 45%)" }} />
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

export default PensionCategoryPage;
