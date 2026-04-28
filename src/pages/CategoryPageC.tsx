import { useEffect, useState, ReactNode } from "react";
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
  PiggyBank,
  LineChart,
  CreditCard,
  Landmark,
  TrendingUp,
  Wallet,
} from "lucide-react";
import advisorImg from "@/assets/advisor-avatar.jpg";
import { InsightsSheetC as InsightsSheet } from "@/components/InsightsSheetC";

const iconMap: Record<string, typeof Heart> = {
  Heart,
  Activity,
  Car,
  Home,
  Briefcase,
  Plane,
  ShieldCheck,
  HeartPulse,
  PiggyBank,
  LineChart,
  CreditCard,
  Landmark,
  TrendingUp,
  Wallet,
};

const formatNIS = (n: number) => "₪" + n.toLocaleString("he-IL");
const formatCompact = (n: number) =>
  n >= 1_000_000 ? `₪${(n / 1_000_000).toFixed(2)}M` : formatNIS(n);

export type CategoryItem = {
  label: string;
  subLabel?: string;
  /** Insurance: "פעיל" | "חסר". Other categories omit. */
  status?: string;
  /** Insurance: coverage text */
  coverage?: string;
  /** Insurance: cost amount */
  cost?: number;
  /** Insurance: billing cadence */
  billing?: "monthly" | "yearly";
  /** Assets: total amount; Liabilities: outstanding balance */
  amount?: number;
  balance?: number;
  /** Assets/Liabilities: monthly stream (income or payment) */
  monthly?: number;
  monthlyLabel?: string;
  icon: string;
  provider?: string;
  alert?: boolean;
  /** When true, render this item with expanded layout (more details, larger card) */
  expanded?: boolean;
  /** Extra detail rows (label → value) shown under the title in expanded mode */
  details?: Array<{ label: string; value: string }>;
};

export type CategoryTheme = {
  /** Hero gradient bg */
  gradient: string;
  /** Accent solid color (chips, icon backgrounds) */
  accent: string;
  /** Lighter background for the icon tile */
  accentBg: string;
  /** Darker accent used for body text on white pill */
  accentText: string;
  /** Sheet shadow tint */
  sheetShadow: string;
};

export type CategoryFilter = {
  key: string;
  label: string;
  test: (item: CategoryItem) => boolean;
};

export type CategoryPageProps = {
  title: string;
  theme: CategoryTheme;
  items: CategoryItem[];
  filters: CategoryFilter[];
  /** Hero KPIs */
  primaryKpiLabel: string; // e.g. "סה״כ עלות חודשית"
  primaryKpiValue: string; // formatted
  secondaryLeft: string; // e.g. "7 פוליסות פעילות"
  secondaryRight?: string; // e.g. "₪44,004 בשנה"
  /** Section header right text */
  sectionTitle: string; // e.g. "כל הפוליסות שלי"
  /** Item count label suffix, e.g. "פוליסות" / "נכסים" / "התחייבויות" */
  itemNoun: string;
  /** Footer note */
  footerNote: string;
  /** Dana CTA text inside hero */
  danaCtaText: string;
  /** Dana proactive bubble text (ReactNode for <strong/> support) */
  danaBubbleText: ReactNode;
  danaBubbleCta: string;
  /** Empty state */
  emptyText: string;
  /** Per item: how to render the leading status (used for insurance "חסר") */
  renderItemTrailing: (item: CategoryItem, theme: CategoryTheme) => ReactNode;
  /** Per item: subtitle line (e.g. coverage / subLabel) */
  renderItemSubtitle: (item: CategoryItem) => string;
};

export const CategoryPageC = ({
  title,
  theme,
  items,
  filters,
  primaryKpiLabel,
  primaryKpiValue,
  secondaryLeft,
  secondaryRight,
  sectionTitle,
  itemNoun,
  footerNote,
  danaCtaText,
  danaBubbleText,
  danaBubbleCta,
  emptyText,
  renderItemTrailing,
  renderItemSubtitle,
}: CategoryPageProps) => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<string>(filters[0]?.key ?? "all");
  const [danaBubbleOpen, setDanaBubbleOpen] = useState(false);
  const [danaBubbleDismissed, setDanaBubbleDismissed] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);

  useEffect(() => {
    if (danaBubbleDismissed) return;
    const t = setTimeout(() => setDanaBubbleOpen(true), 5000);
    return () => clearTimeout(t);
  }, [danaBubbleDismissed]);

  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 180);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeFilterConfig = filters.find((f) => f.key === activeFilter) ?? filters[0];
  const filteredItems = items.filter((i) => activeFilterConfig.test(i));

  return (
    <div
      className="min-h-screen max-w-[430px] mx-auto relative"
      dir="rtl"
      style={{ background: theme.gradient }}
    >
      {/* === Sticky compact header — appears on scroll === */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-30 transition-all duration-300"
        style={{
          background: theme.gradient,
          boxShadow: stickyVisible ? `0 4px 14px ${theme.sheetShadow}` : "none",
          transform: stickyVisible
            ? "translate(-50%, 0)"
            : "translate(-50%, -100%)",
          opacity: stickyVisible ? 1 : 0,
          pointerEvents: stickyVisible ? "auto" : "none",
        }}
        dir="rtl"
      >
        <div className="flex items-center justify-between px-4 py-3 text-white">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-[12px] font-medium opacity-90 hover:opacity-100 transition-opacity"
            aria-label="חזרה"
          >
            <ChevronRight className="h-4 w-4" />
            חזרה
          </button>
          <h2 className="text-[14px] font-bold text-secondary">{title}</h2>
          <span className="w-12" aria-hidden />
        </div>
      </div>

      {/* === Hero — stays in place; sheet scrolls up over it === */}
      <div
        className="sticky top-0 z-0 px-5 pt-10 pb-12"
        style={{ background: theme.gradient }}
      >
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
        <div className="relative flex items-center justify-between mb-5 text-white">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-[12px] font-medium opacity-90 hover:opacity-100 transition-opacity"
            aria-label="חזרה"
          >
            <ChevronRight className="h-4 w-4" />
            חזרה
          </button>
          <h2 className="text-base font-bold text-secondary">{title}</h2>
          <span className="w-7" aria-hidden />
        </div>

        {/* Hero KPI */}
        <div className="relative flex flex-col items-center text-white text-center">
          <p className="text-[12px] font-medium opacity-85 mb-1.5">{primaryKpiLabel}</p>
          <p className="text-[40px] font-extrabold tracking-tight leading-none mb-2">
            {primaryKpiValue}
          </p>

          {/* Two-up secondary KPIs */}
          <div className="flex items-center gap-2 mb-4">
            <span
              className="inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-full"
              style={{
                background: "hsla(0, 0%, 100%, 0.18)",
                color: "white",
                backdropFilter: "blur(8px)",
                border: "1px solid hsla(0, 0%, 100%, 0.18)",
              }}
            >
              {secondaryLeft}
            </span>
            {secondaryRight && (
              <span
                className="inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-full"
                style={{
                  background: "hsla(0, 0%, 100%, 0.18)",
                  color: "white",
                  backdropFilter: "blur(8px)",
                  border: "1px solid hsla(0, 0%, 100%, 0.18)",
                }}
              >
                {secondaryRight}
              </span>
            )}
          </div>

          {/* Pill CTA — Dana invites you to chat */}
          <button
            onClick={() => setChatOpen(true)}
            className="inline-flex items-center gap-2 pr-2 pl-4 py-1.5 rounded-full text-[12px] font-semibold transition-all hover:scale-[1.03] active:scale-[0.98] shadow-lg"
            style={{
              background: "white",
              color: theme.accentText,
              boxShadow: `0 8px 24px ${theme.sheetShadow}`,
            }}
            aria-label={danaCtaText}
          >
            <span
              className="tri-ring relative w-11 h-11 rounded-full flex-shrink-0"
              style={{ marginTop: "-10px", marginBottom: "-10px", marginRight: "-8px" }}
            >
              <span
                className="block w-full h-full rounded-full overflow-hidden"
                style={{ boxShadow: "0 4px 10px hsla(275, 65%, 25%, 0.4)" }}
              >
                <img src={advisorImg} alt="דנה" className="w-full h-full object-cover" />
              </span>
            </span>
            <span>{danaCtaText}</span>
          </button>
        </div>
      </div>

      {/* === White sheet — scrolls up over the hero === */}
      <div
        className="relative -mt-6 rounded-t-3xl pb-32 z-10"
        style={{
          background: "hsl(235, 30%, 97%)",
          boxShadow: `0 -8px 28px ${theme.sheetShadow}`,
          minHeight: "calc(100vh - 24px)",
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-2.5 pb-1">
          <div
            className="w-10 h-1.5 rounded-full"
            style={{ background: "hsl(230, 20%, 88%)" }}
          />
        </div>

        {/* Filter chips */}
        <div className="px-4 pt-3 pb-3">
          <div className="flex gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {filters.map((chip) => {
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
        <div className="px-5 pt-1 pb-1 flex items-center justify-start">
          <span
            className="text-[11px] font-semibold tracking-wide"
            style={{ color: "hsl(230, 15%, 55%)" }}
          >
            {filteredItems.length} {itemNoun}
          </span>
        </div>

        {/* Item list */}
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
                {emptyText}
              </p>
            </div>
          )}
          {filteredItems.map((item, i) => {
            const Icon = iconMap[item.icon] || ShieldCheck;
            const isMissing = item.status === "חסר";
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
                {/* Icon (right in RTL) */}
                <span className="relative flex-shrink-0">
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: isMissing ? "hsl(0, 80%, 95%)" : theme.accentBg,
                    }}
                  >
                    <Icon
                      style={{
                        color: isMissing ? "hsl(0, 65%, 50%)" : theme.accent,
                        width: "18px",
                        height: "18px",
                      }}
                      strokeWidth={2}
                    />
                  </span>
                  {item.alert && (
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

                {/* Title + subtitle */}
                <div className="flex-1 min-w-0 text-right">
                  <p
                    className="text-[13.5px] font-bold text-primary tracking-tight"
                    style={{ color: "hsl(250, 50%, 12%)" }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="text-[10.5px] mt-0.5 truncate"
                    style={{ color: "hsl(230, 15%, 55%)" }}
                  >
                    {renderItemSubtitle(item)}
                  </p>
                </div>

                {/* Trailing: amount or status */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {renderItemTrailing(item, theme)}
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
          {footerNote}
        </p>

      </div>

      {/* === Dana invitation bubble === */}
      {danaBubbleOpen && !danaBubbleDismissed && (
        <div
          className="fixed bottom-[88px] left-1/2 -translate-x-1/2 w-full max-w-[430px] z-40 px-4 pointer-events-none"
          dir="rtl"
        >
          <div
            className="pointer-events-auto max-w-[300px] mr-1"
            style={{
              animation: "bubble-pop 0.45s cubic-bezier(0.22, 1, 0.36, 1) both",
              transformOrigin: "bottom right",
            }}
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
                {danaBubbleText}
              </p>
              <button
                onClick={() => {
                  setDanaBubbleOpen(false);
                  setDanaBubbleDismissed(true);
                  setChatOpen(true);
                }}
                className="cta-tri mt-2.5 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-[12px] font-bold text-primary transition-transform hover:scale-[1.01] active:scale-[0.99]"
              >
                {danaBubbleCta}
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === Bottom Chat Bar === */}
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

export { formatNIS, formatCompact };
