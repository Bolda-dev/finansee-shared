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
import { InsightsSheetC } from "@/components/InsightsSheetC";
import { useVersionCSettings } from "@/contexts/VersionCSettings";

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
  /** Optional numeric badge count rendered as red dot on icon (overrides alert "1"). */
  badgeCount?: number;
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
  /** Optional: text color for hero (defaults to white) */
  heroTextColor?: string;
  /** Optional: CSS class for primary CTA buttons (e.g. "cta-tri-life") */
  ctaClass?: string;
  /** Optional: CSS class for tri-color avatar ring (e.g. "tri-ring-life") */
  ringClass?: string;
  /** Optional: color for the send icon inside chat bar */
  sendIconColor?: string;
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
  /** Optional: which insights sheet variant to use ("c" default or "life") */
  insightsVariant?: "c" | "life";
  /** Optional: per-item click handler. When provided, the card becomes a navigation trigger. */
  onItemClick?: (item: CategoryItem, index: number) => void;
  /** Optional: parent breadcrumb label, e.g. "נכסים" — renders a small "‹ נכסים" pill above title. */
  parentLabel?: string;
  /** Optional: where the parent label navigates to (default: -1). */
  parentPath?: string;
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
  insightsVariant = "c",
  onItemClick,
  parentLabel,
  parentPath,
}: CategoryPageProps) => {
  const navigate = useNavigate();
  const { innerGrid } = useVersionCSettings();
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

  const heroText = theme.heroTextColor ?? "white";
  const ctaCls = theme.ctaClass ?? "cta-tri-c";
  const ringCls = theme.ringClass ?? "tri-ring-c";
  const sendColor = theme.sendIconColor ?? "white";

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
        <div className="flex items-center px-4 py-3" style={{ color: heroText }} dir="rtl">
          <button
            onClick={() => navigate(parentPath ?? "/")}
            className="flex items-center justify-center w-7 h-7 -mr-1 opacity-90 hover:opacity-100 transition-opacity"
            aria-label="חזרה"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <nav
            className="flex-1 inline-flex items-center gap-1 text-[12.5px] font-semibold mr-1 truncate"
            aria-label="breadcrumb"
          >
            <button
              onClick={() => navigate("/")}
              className="transition-opacity hover:opacity-100"
              style={{ color: heroText, opacity: 0.6 }}
            >
              בית
            </button>
            {parentLabel && (
              <>
                <span style={{ opacity: 0.4 }}>›</span>
                <button
                  onClick={() => navigate(parentPath ?? "/")}
                  className="transition-opacity hover:opacity-100"
                  style={{ color: heroText, opacity: 0.6 }}
                >
                  {parentLabel}
                </button>
              </>
            )}
            <span style={{ opacity: 0.4 }}>›</span>
            <span style={{ color: heroText, fontWeight: 800 }} className="truncate">{title}</span>
          </nav>
        </div>
      </div>

      {/* === Hero — stays in place; sheet scrolls up over it === */}
      <div
        className="sticky top-0 z-0 px-5 pt-10 pb-12"
        style={{ background: theme.gradient }}
      >
        {/* Decorative ripples — same style as category cards */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 140 140"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          {[28, 56, 86, 118, 150, 184].map((r) => (
            <circle
              key={r}
              cx={125}
              cy={18}
              r={r}
              fill="none"
              stroke="hsla(0, 0%, 100%, 0.09)"
              strokeWidth="1"
            />
          ))}
        </svg>

        {/* Top bar: inline breadcrumb (parent › current) OR back + title */}
        <div className="relative flex items-center justify-between mb-5 min-h-[28px]" style={{ color: heroText }}>
          {parentLabel ? (
            <nav
              className="inline-flex items-center gap-1.5 -mr-1 py-1.5 pl-2 pr-1 text-[13px] font-semibold"
              aria-label="breadcrumb"
              dir="rtl"
            >
              <button
                onClick={() => navigate(parentPath ?? "/")}
                className="inline-flex items-center gap-0.5 transition-opacity hover:opacity-100"
                style={{ color: heroText, opacity: 0.65 }}
                aria-label={`חזרה ל${parentLabel}`}
              >
                <ChevronRight className="h-4 w-4" />
                <span>{parentLabel}</span>
              </button>
              <span style={{ opacity: 0.4 }}>›</span>
              <span style={{ color: heroText, fontWeight: 800 }}>{title}</span>
            </nav>
          ) : (
            <>
              <button
                onClick={() => navigate(parentPath ?? "/")}
                className="flex items-center gap-1 text-[12px] font-medium opacity-90 hover:opacity-100 transition-opacity"
                aria-label="חזרה"
              >
                <ChevronRight className="h-4 w-4" />
                חזרה
              </button>
              <h2 className="text-base font-bold" style={{ color: heroText }}>{title}</h2>
            </>
          )}
          <span className="w-7" aria-hidden />
        </div>

        {/* Hero KPI */}
        <div className="relative flex flex-col items-center text-center" style={{ color: heroText }}>
          <p className="text-[12px] font-medium opacity-85 mb-1.5">{primaryKpiLabel}</p>
          <p className="text-[40px] font-extrabold tracking-tight leading-none mb-2">
            {primaryKpiValue}
          </p>

          {/* Two-up secondary KPIs */}
          <div className="flex items-center gap-2 mb-4">
            <span
              className="inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-full"
              style={{
                background: heroText === "white" ? "hsla(0, 0%, 100%, 0.18)" : "hsla(0, 0%, 0%, 0.10)",
                color: heroText,
                backdropFilter: "blur(8px)",
                border: heroText === "white" ? "1px solid hsla(0, 0%, 100%, 0.18)" : "1px solid hsla(0, 0%, 0%, 0.10)",
              }}
            >
              {secondaryLeft}
            </span>
            {secondaryRight && (
              <span
                className="inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-full"
                style={{
                  background: heroText === "white" ? "hsla(0, 0%, 100%, 0.18)" : "hsla(0, 0%, 0%, 0.10)",
                  color: heroText,
                  backdropFilter: "blur(8px)",
                  border: heroText === "white" ? "1px solid hsla(0, 0%, 100%, 0.18)" : "1px solid hsla(0, 0%, 0%, 0.10)",
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
              className={`${ringCls} relative w-11 h-11 rounded-full flex-shrink-0`}
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
        {!innerGrid && (
        <div className="mx-4 mt-2 flex flex-col gap-2.5">
          {filteredItems.length === 0 && (
            <div
              className="px-4 py-8 text-center rounded-2xl"
              style={{
                background: "white",
                border: "1px solid hsl(230, 20%, 94%)",
              }}
            >
              <p className="text-[12px]" style={{ color: "hsl(230, 15%, 55%)" }}>
                {emptyText}
              </p>
            </div>
          )}
          {filteredItems.map((item, i) => {
            const Icon = iconMap[item.icon] || ShieldCheck;
            const isMissing = item.status === "חסר";
            const isExpanded = !!item.expanded;

            return (
              <button
                key={i}
                onClick={onItemClick ? () => onItemClick(item, i) : undefined}
                className="w-full flex items-start gap-3 px-4 py-4 rounded-2xl transition-colors hover:bg-[hsl(230,25%,98%)] active:bg-[hsl(230,25%,96%)]"
                style={{
                  background: "white",
                  boxShadow: "0 3px 14px hsla(250, 30%, 25%, 0.05)",
                  border: "1px solid hsl(230, 20%, 94%)",
                }}
                dir="rtl"
              >
                {/* Icon (right in RTL) */}
                <span className="relative flex-shrink-0">
                  <span
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{
                      background: isMissing ? "hsl(0, 80%, 95%)" : theme.accentBg,
                    }}
                  >
                    <Icon
                      style={{
                        color: isMissing ? "hsl(0, 65%, 50%)" : theme.accent,
                        width: "20px",
                        height: "20px",
                      }}
                      strokeWidth={2}
                    />
                  </span>
                  {(item.alert || (item.badgeCount && item.badgeCount > 0)) && (
                    <span
                      className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                      style={{
                        background: "hsl(0, 78%, 55%)",
                        border: "2px solid white",
                      }}
                    >
                      {item.badgeCount && item.badgeCount > 0 ? item.badgeCount : 1}
                    </span>
                  )}
                </span>

                {/* Title + subtitle (+ details when expanded) */}
                <div className="flex-1 min-w-0 text-right">
                  <p
                    className="text-[14px] font-bold tracking-tight"
                    style={{ color: "hsl(250, 50%, 12%)" }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="text-[11.5px] mt-0.5 truncate"
                    style={{ color: "hsl(230, 15%, 55%)" }}
                  >
                    {renderItemSubtitle(item)}
                  </p>

                  {isExpanded && item.details && item.details.length > 0 && (
                    <div className="mt-1.5 space-y-0.5">
                      {item.details.map((d) => (
                        <p
                          key={d.label}
                          className="text-[11px] leading-snug"
                        >
                          <span style={{ color: "hsl(230, 15%, 60%)" }}>{d.label}:</span>{" "}
                          <span className="font-medium" style={{ color: "hsl(250, 40%, 22%)" }}>
                            {d.value}
                          </span>
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                {/* Trailing: amount or status */}
                <div className="flex items-center gap-1.5 flex-shrink-0 self-center">
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
        )}

        {innerGrid && (
          <div className="mx-4 mt-2 grid grid-cols-2 gap-3">
            {filteredItems.length === 0 && (
              <div className="col-span-2 py-8 text-center rounded-2xl bg-white border" style={{ borderColor: "hsl(230, 20%, 94%)" }}>
                <p className="text-[12px]" style={{ color: "hsl(230, 15%, 55%)" }}>{emptyText}</p>
              </div>
            )}
            {filteredItems.map((item, i) => {
              const Icon = iconMap[item.icon] || ShieldCheck;
              const isMissing = item.status === "חסר";
              const isExpanded = !!item.expanded;
              return (
                <button
                  key={i}
                  onClick={onItemClick ? () => onItemClick(item, i) : undefined}
                  className="relative rounded-2xl p-3.5 pt-4 flex flex-col gap-1 transition-transform hover:scale-[1.02] active:scale-[0.98] text-right"
                  style={{
                    background: "white",
                    boxShadow: "0 3px 14px hsla(250, 30%, 25%, 0.07)",
                    border: "1px solid hsl(230, 20%, 94%)",
                    minHeight: isExpanded ? "160px" : "130px",
                  }}
                  dir="rtl"
                >
                  <div className="flex items-center justify-start gap-2 mb-1">
                    <span className="relative">
                      <span
                        className="w-9 h-9 rounded-full flex items-center justify-center"
                        style={{ background: isMissing ? "hsl(0, 80%, 95%)" : theme.accentBg }}
                      >
                        <Icon
                          style={{
                            color: isMissing ? "hsl(0, 65%, 50%)" : theme.accent,
                            width: "16px",
                            height: "16px",
                          }}
                          strokeWidth={2}
                        />
                      </span>
                      {(item.alert || (item.badgeCount && item.badgeCount > 0)) && (
                        <span
                          className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                          style={{ background: "hsl(0, 78%, 55%)", border: "2px solid white" }}
                        >
                          {item.badgeCount && item.badgeCount > 0 ? item.badgeCount : 1}
                        </span>
                      )}
                    </span>
                    <span
                      className="text-[12px] font-bold tracking-tight"
                      style={{ color: "hsl(250, 50%, 12%)" }}
                    >
                      {item.label}
                    </span>
                  </div>

                  {isMissing ? (
                    <p
                      className="text-[18px] font-extrabold tracking-tight leading-none text-right"
                      style={{ color: "hsl(0, 65%, 50%)" }}
                    >
                      חסר
                    </p>
                  ) : (() => {
                    const numeric = [item.amount, (item as any).balance, (item as any).cost, (item as any).value]
                      .find((v) => typeof v === "number") as number | undefined;
                    const display = typeof numeric === "number"
                      ? `₪${numeric.toLocaleString("he-IL")}`
                      : (item.label ?? "—");
                    return (
                      <p
                        className="text-[20px] font-extrabold tracking-tight leading-none text-right"
                        style={{ color: "hsl(250, 50%, 12%)" }}
                      >
                        {display}
                      </p>
                    );
                  })()}
                  <p className="text-[10px] mt-1 text-right" style={{ color: "hsl(230, 12%, 58%)" }}>
                    {renderItemSubtitle(item)}
                  </p>

                  {isExpanded && item.details && item.details.length > 0 && (
                    <div
                      className="mt-auto pt-2 border-t space-y-0.5 text-right"
                      style={{ borderColor: "hsl(230, 20%, 94%)" }}
                    >
                      {item.details.map((d) => (
                        <p key={d.label} className="text-[10px] leading-snug">
                          <span style={{ color: "hsl(230, 15%, 60%)" }}>{d.label}:</span>{" "}
                          <span className="font-medium" style={{ color: "hsl(250, 40%, 22%)" }}>
                            {d.value}
                          </span>
                        </p>
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}

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
          className="fixed bottom-[88px] left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 px-4 pointer-events-none"
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
              className="relative rounded-2xl rounded-br-sm pt-6 pb-3.5 px-3.5 pr-4"
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
                className="absolute top-2 left-2 w-5 h-5 rounded-full flex items-center justify-center transition-colors hover:bg-black/5"
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
                className="mt-2.5 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-[12px] font-bold transition-transform hover:scale-[1.01] active:scale-[0.99]"
                style={{ background: "hsl(0, 0%, 8%)", color: "white" }}
              >
                {danaBubbleCta}
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === Bottom Chat Bar === */}
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
          <span
            className={`${ringCls} relative w-11 h-11 rounded-full flex-shrink-0`}
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

          <span className={`${ringCls} relative w-9 h-9 rounded-full flex-shrink-0`}>
            <span className={`flex w-full h-full rounded-full items-center justify-center ${ctaCls}`}>
              <Send className="h-4 w-4 -rotate-90" style={{ color: sendColor }} />
            </span>
          </span>
        </button>
      </div>

      <InsightsSheetC open={chatOpen} onOpenChange={setChatOpen} mode="context" />
    </div>
  );
};

export { formatNIS, formatCompact };
