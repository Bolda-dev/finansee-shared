import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  ChevronLeft,
  Heart,
  Activity,
  Car,
  Home,
  Briefcase,
  Plane,
  ShieldCheck,
  HeartPulse,
  X,
  Mic,
  Send,
} from "lucide-react";
import { insuranceItems } from "@/lib/data";
import advisorImg from "@/assets/advisor-avatar.jpg";
import { InsightsSheet } from "@/components/InsightsSheet";

const iconMap: Record<string, typeof Heart> = {
  Heart,
  Activity,
  Car,
  Home,
  Briefcase,
  Plane,
  ShieldCheck,
  HeartPulse,
};

const formatNIS = (n: number) => "₪" + n.toLocaleString("he-IL");

// Quick filter chips — same visual language as chat chips
const filterChips = [
  { key: "all", label: "הכל" },
  { key: "monthly", label: "חודשי" },
  { key: "yearly", label: "שנתי" },
  { key: "missing", label: "חסר" },
  { key: "life", label: "חיים" },
  { key: "health", label: "בריאות" },
  { key: "car", label: "רכב" },
  { key: "home", label: "דירה" },
] as const;
type FilterKey = (typeof filterChips)[number]["key"];

const matchesFilter = (
  item: (typeof insuranceItems)[number],
  filter: FilterKey,
): boolean => {
  if (filter === "all") return true;
  if (filter === "monthly") return item.status === "פעיל" && item.billing === "monthly";
  if (filter === "yearly") return item.status === "פעיל" && item.billing === "yearly";
  if (filter === "missing") return item.status === "חסר";
  if (filter === "life") return item.label.includes("חיים") || item.label.includes("מנהלים") || item.label.includes("סיעודי") || item.label.includes("כושר");
  if (filter === "health") return item.label.includes("בריאות");
  if (filter === "car") return item.label.includes("רכב");
  if (filter === "home") return item.label.includes("דירה");
  return true;
};

const InsurancePage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [danaBubbleOpen, setDanaBubbleOpen] = useState(false);
  const [danaBubbleDismissed, setDanaBubbleDismissed] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  // Show Dana invitation bubble after 5s on this page
  useEffect(() => {
    if (danaBubbleDismissed) return;
    const t = setTimeout(() => setDanaBubbleOpen(true), 5000);
    return () => clearTimeout(t);
  }, [danaBubbleDismissed]);

  const activePolicies = insuranceItems.filter((i) => i.status === "פעיל");
  const monthlyPolicies = activePolicies.filter((i) => i.billing === "monthly");
  const yearlyPolicies = activePolicies.filter((i) => i.billing === "yearly");

  const monthlyFromMonthly = monthlyPolicies.reduce((s, i) => s + i.cost, 0);
  const monthlyFromYearly = yearlyPolicies.reduce((s, i) => s + i.cost, 0) / 12;
  const totalMonthly = Math.round(monthlyFromMonthly + monthlyFromYearly);

  const headerGradient =
    "linear-gradient(160deg, hsl(270, 78%, 52%) 0%, hsl(278, 82%, 60%) 55%, hsl(288, 88%, 70%) 100%)";

  const filteredItems = insuranceItems.filter((i) => matchesFilter(i, activeFilter));

  return (
    <div
      className="min-h-screen max-w-[430px] mx-auto relative overflow-hidden"
      dir="rtl"
      style={{ background: headerGradient }}
    >
      {/* === Purple gradient hero (sits underneath; sheet covers it on scroll) === */}
      <div className="relative px-5 pt-10 pb-12">
        {/* Decorative blobs */}
        <div
          className="absolute -top-10 -left-12 w-44 h-44 rounded-full pointer-events-none"
          style={{ background: "hsla(0, 0%, 100%, 0.10)" }}
          aria-hidden
        />
        <div
          className="absolute -bottom-20 -right-10 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: "hsla(0, 0%, 100%, 0.07)" }}
          aria-hidden
        />

        {/* Top bar: back + title */}
        <div className="relative flex items-center justify-between mb-6 text-white">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-[12px] font-medium opacity-90 hover:opacity-100 transition-opacity"
            aria-label="חזרה"
          >
            <ChevronRight className="h-4 w-4" />
            חזרה
          </button>
          <h2 className="text-base font-bold">ביטוח</h2>
          <span className="w-7" aria-hidden />
        </div>

        {/* Hero KPI */}
        <div className="relative flex flex-col items-center text-white text-center">
          <p className="text-[12px] font-medium opacity-85 mb-1.5">סה״כ עלות חודשית</p>
          <p className="text-[44px] font-extrabold tracking-tight leading-none mb-1">
            {formatNIS(totalMonthly)}
          </p>
          <p className="text-[11px] opacity-80 mb-4">
            {activePolicies.length} פוליסות פעילות
          </p>

          {/* Pill CTA — Dana invites you to chat */}
          <button
            className="inline-flex items-center gap-2 pr-2 pl-4 py-1.5 rounded-full text-[12px] font-semibold transition-all hover:scale-[1.03] active:scale-[0.98] shadow-lg"
            style={{
              background: "white",
              color: "hsl(280, 60%, 30%)",
              boxShadow: "0 8px 24px hsla(280, 60%, 25%, 0.35)",
            }}
            aria-label="שאל את דנה איך לחסוך בביטוחים"
          >
            <span
              className="tri-ring relative w-11 h-11 rounded-full flex-shrink-0"
              style={{ marginTop: "-10px", marginBottom: "-10px", transform: "translateX(-6px)" }}
            >
              <span
                className="block w-full h-full rounded-full overflow-hidden"
                style={{ boxShadow: "0 4px 10px hsla(275, 65%, 25%, 0.4)" }}
              >
                <img src={advisorImg} alt="דנה" className="w-full h-full object-cover" />
              </span>
            </span>
            <span>איך לחסוך בביטוחים שלי?</span>
          </button>
        </div>
      </div>

      {/* === White sheet that overlaps the purple area and covers it on scroll === */}
      <div
        className="relative -mt-6 rounded-t-3xl pb-32"
        style={{
          background: "hsl(235, 30%, 97%)",
          boxShadow: "0 -8px 28px hsla(280, 60%, 25%, 0.18)",
          minHeight: "70vh",
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-2.5 pb-1">
          <div
            className="w-10 h-1.5 rounded-full"
            style={{ background: "hsl(230, 20%, 88%)" }}
          />
        </div>

        {/* Filter chips — matches chat chip styling */}
        <div className="px-4 pt-3 pb-3">
          <div className="flex gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {filterChips.map((chip) => {
              const isActive = chip.key === activeFilter;
              return (
                <button
                  key={chip.key}
                  onClick={() => setActiveFilter(chip.key)}
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

        {/* Section header */}
        <div className="px-5 pt-1 pb-1 flex items-center justify-between">
          <span
            className="text-[11px] font-semibold tracking-wide"
            style={{ color: "hsl(230, 15%, 55%)" }}
          >
            {filteredItems.length} פוליסות
          </span>
          <span
            className="text-[11px] font-semibold tracking-wide"
            style={{ color: "hsl(250, 30%, 25%)" }}
          >
            כל הפוליסות שלי
          </span>
        </div>

        {/* === Policy list (RTL: icon on right, title+coverage middle-right, price+chevron on left) === */}
        <div
          className="mx-4 mt-2 rounded-2xl overflow-hidden"
          style={{
            background: "white",
            boxShadow: "0 3px 14px hsla(250, 30%, 25%, 0.05)",
            border: "1px solid hsl(230, 20%, 94%)",
          }}
        >
          {filteredItems.length === 0 && (
            <div className="px-4 py-8 text-center">
              <p className="text-[12px]" style={{ color: "hsl(230, 15%, 55%)" }}>
                אין פוליסות בקטגוריה זו
              </p>
            </div>
          )}
          {filteredItems.map((item, i) => {
            const Icon = iconMap[item.icon] || ShieldCheck;
            const isActive = item.status === "פעיל";
            const showAlert = (item as { alert?: boolean }).alert;
            const monthlyCost =
              item.billing === "monthly"
                ? item.cost
                : Math.round(item.cost / 12);
            const isLast = i === filteredItems.length - 1;

            return (
              <button
                key={i}
                className="w-full flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-[hsl(230,25%,98%)] active:bg-[hsl(230,25%,96%)]"
                style={{
                  borderBottom: isLast ? "none" : "1px solid hsl(230, 20%, 94%)",
                }}
                dir="rtl"
              >
                {/* RIGHT (RTL start): icon */}
                <span className="relative flex-shrink-0">
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: isActive
                        ? "hsl(280, 70%, 95%)"
                        : "hsl(0, 80%, 95%)",
                    }}
                  >
                    <Icon
                      style={{
                        color: isActive
                          ? "hsl(280, 75%, 50%)"
                          : "hsl(0, 65%, 50%)",
                        width: "18px",
                        height: "18px",
                      }}
                      strokeWidth={2}
                    />
                  </span>
                  {showAlert && (
                    <span
                      className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                      style={{
                        background: "hsl(0, 78%, 55%)",
                        border: "2px solid white",
                      }}
                    >
                      1
                    </span>
                  )}
                </span>

                {/* MIDDLE: title + coverage (RTL right-aligned) */}
                <div className="flex-1 min-w-0 text-right">
                  <p
                    className="text-[13.5px] font-bold tracking-tight"
                    style={{ color: "hsl(250, 50%, 12%)" }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="text-[10.5px] mt-0.5 truncate"
                    style={{ color: "hsl(230, 15%, 55%)" }}
                  >
                    {isActive ? item.coverage : "אין כיסוי פעיל"}
                  </p>
                </div>

                {/* LEFT (RTL end): monthly price + chevron */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {isActive && monthlyCost > 0 ? (
                    <span className="text-end leading-tight">
                      <span
                        className="block text-[13px] font-bold tracking-tight"
                        style={{ color: "hsl(250, 50%, 12%)" }}
                      >
                        {formatNIS(monthlyCost)}
                      </span>
                      <span
                        className="block text-[10px] font-medium"
                        style={{ color: "hsl(230, 15%, 55%)" }}
                      >
                        /חודש
                      </span>
                    </span>
                  ) : (
                    <span
                      className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        background: "hsl(0, 80%, 95%)",
                        color: "hsl(0, 65%, 45%)",
                      }}
                    >
                      חסר
                    </span>
                  )}
                  <ChevronLeft
                    className="h-4 w-4 flex-shrink-0"
                    style={{ color: "hsl(230, 15%, 60%)" }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        <p
          className="text-[10.5px] text-center mt-3 px-6"
          style={{ color: "hsl(230, 15%, 55%)" }}
        >
          כל הפוליסות מתעדכנות אוטומטית מהחיבור לקופות
        </p>
      </div>

      {/* === Dana invitation bubble (after 5s) — anchored to bottom chat bar's avatar === */}
      {danaBubbleOpen && !danaBubbleDismissed && (
        <div
          className="fixed bottom-[88px] left-1/2 -translate-x-1/2 w-full max-w-[430px] z-40 px-4 pointer-events-none"
          dir="rtl"
        >
          <div
            className="pointer-events-auto max-w-[300px] mr-1"
            style={{ animation: "bubble-pop 0.45s cubic-bezier(0.22, 1, 0.36, 1) both", transformOrigin: "bottom right" }}
          >
            <div
              className="relative rounded-2xl rounded-br-sm p-3.5 pr-4"
              style={{
                background: "white",
                border: "1px solid hsl(230, 20%, 92%)",
                boxShadow: "0 8px 28px hsla(250, 30%, 25%, 0.18)",
              }}
            >
              <button
                onClick={() => {
                  setDanaBubbleOpen(false);
                  setDanaBubbleDismissed(true);
                }}
                className="absolute top-1.5 left-1.5 w-5 h-5 rounded-full flex items-center justify-center transition-colors hover:bg-black/5"
                aria-label="סגור"
              >
                <X className="h-3 w-3" style={{ color: "hsl(230, 15%, 55%)" }} />
              </button>
              <p
                className="text-[12px] leading-relaxed pr-1 text-right"
                style={{ color: "hsl(250, 35%, 20%)" }}
              >
                היי משה 👋 ראיתי שיש לך 7 פוליסות פעילות —
                <br />
                אני יכולה לעזור לך לחסוך עד <strong>₪450 בחודש</strong>. רוצה שנבדוק יחד?
              </p>
              <button
                onClick={() => {
                  setDanaBubbleOpen(false);
                  setDanaBubbleDismissed(true);
                  setChatOpen(true);
                }}
                className="cta-tri mt-2.5 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-[12px] font-bold transition-transform hover:scale-[1.01] active:scale-[0.99]"
              >
                בוא/י נחסוך ביחד
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Bottom Chat Bar — identical to home */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-40 px-4 pb-4 pointer-events-none" dir="rtl">
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
          <span
            className="tri-ring relative w-11 h-11 rounded-full flex-shrink-0"
            style={{ transform: "translateY(-2px)" }}
          >
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

          <span className="tri-ring relative w-9 h-9 rounded-full flex-shrink-0">
            <span className="flex w-full h-full rounded-full items-center justify-center cta-tri">
              <Send className="h-4 w-4 -rotate-90" style={{ color: "white" }} />
            </span>
          </span>
        </button>
      </div>

      <InsightsSheet open={chatOpen} onOpenChange={setChatOpen} mode="context" />
    </div>
  );
};

export default InsurancePage;
