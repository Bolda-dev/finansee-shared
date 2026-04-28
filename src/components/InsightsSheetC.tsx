import { useState, useEffect, useRef } from "react";
import { X, Send, Mic, Sparkles, TrendingUp, Shield, Landmark, ArrowLeft } from "lucide-react";
import { incomeItems, expenseItems, insuranceItems } from "@/lib/data";
import advisorImg from "@/assets/advisor-avatar.jpg";

/**
 * Mode:
 *  - "context" → contextual insights with pie/donut charts and category tabs
 *  - "actions" → 3 actionable improvements stacked one below the other inside Dana's bubble
 */
type Mode = "context" | "actions";

type ContextTabKey = "assets" | "liabilities" | "insurance";
type ActionKey = "investments" | "insurance" | "liabilities";

interface InsightsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: Mode;
}

const formatNIS = (n: number) => "₪" + n.toLocaleString("he-IL");

/* ---------- CONTEXT MODE: Donut + tabs config ---------- */
const contextTabs: Record<
  ContextTabKey,
  {
    label: string;
    accent: string;
    gradient: string;
    items: { label: string; value: number }[];
    headline: string;
  }
> = {
  assets: {
    label: "נכסים",
    accent: "hsl(222, 85%, 45%)",
    gradient: "linear-gradient(135deg, hsl(220, 85%, 48%) 0%, hsl(225, 90%, 60%) 55%, hsl(215, 95%, 75%) 100%)",
    items: incomeItems.map((i) => ({ label: i.label, value: i.amount })),
    headline: "פירוט מקורות הכנסה חודשיים",
  },
  liabilities: {
    label: "התחייבויות",
    accent: "hsl(174, 85%, 24%)",
    gradient: "linear-gradient(135deg, hsl(172, 85%, 26%) 0%, hsl(176, 80%, 36%) 55%, hsl(180, 75%, 52%) 100%)",
    items: expenseItems.map((i) => ({ label: i.label, value: i.amount })),
    headline: "פירוט הוצאות חודשיות",
  },
  insurance: {
    label: "ביטוח",
    accent: "hsl(262, 75%, 52%)",
    gradient: "linear-gradient(135deg, hsl(258, 72%, 55%) 0%, hsl(265, 78%, 65%) 55%, hsl(275, 85%, 78%) 100%)",
    items: insuranceItems.map((i) => ({ label: i.label, value: i.status === "פעיל" ? 1 : 0 })),
    headline: "סטטוס פוליסות הביטוח",
  },
};

/* ---------- ACTIONS MODE: improvement cards config ---------- */
const actionsConfig: Record<
  ActionKey,
  {
    label: string;
    accent: string;
    accentBg: string;
    gradient: string;
    Icon: typeof TrendingUp;
    title: string;
    description: string;
    cta: string;
  }
> = {
  investments: {
    label: "השקעות",
    accent: "hsl(222, 85%, 45%)",
    accentBg: "hsl(220, 85%, 95%)",
    gradient: "linear-gradient(135deg, hsl(220, 85%, 48%) 0%, hsl(225, 90%, 60%) 55%, hsl(215, 95%, 75%) 100%)",
    Icon: TrendingUp,
    title: "איזון תיק השקעות",
    description: "הקצאת המניות שלך גבוהה כרגע ב-15% מפרופיל הסיכון היעד שלך.",
    cta: "איזון אוטומטי של התיק",
  },
  insurance: {
    label: "ביטוח",
    accent: "hsl(262, 75%, 52%)",
    accentBg: "hsl(260, 75%, 95%)",
    gradient: "linear-gradient(135deg, hsl(258, 72%, 55%) 0%, hsl(265, 78%, 65%) 55%, hsl(275, 85%, 78%) 100%)",
    Icon: Shield,
    title: "ביטוח כפול",
    description: "ייתכן שאתה משלם פעמיים על כיסוי בריאות דרך מקום העבודה ופוליסה פרטית.",
    cta: "בדוק פרטי כיסוי",
  },
  liabilities: {
    label: "התחייבויות",
    accent: "hsl(174, 85%, 24%)",
    accentBg: "hsl(172, 60%, 90%)",
    gradient: "linear-gradient(135deg, hsl(172, 85%, 26%) 0%, hsl(176, 80%, 36%) 55%, hsl(180, 75%, 52%) 100%)",
    Icon: Landmark,
    title: "אופטימיזציה של משכנתא",
    description: "ריבית המשכנתא ירדה — תוכל לחסוך ₪500 בחודש על ידי מיחזור התוכנית הנוכחית.",
    cta: "בדוק הצעת מיחזור",
  },
};

/* ---------- Donut SVG ---------- */
const Donut = ({
  data,
  centerLabel,
  centerValue,
  baseColor,
}: {
  data: { label: string; value: number }[];
  centerLabel: string;
  centerValue: string;
  baseColor: string;
}) => {
  const size = 160;
  const radius = 60;
  const stroke = 22;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * radius;
  const total = data.reduce((s, d) => s + d.value, 0) || 1;

  const match = baseColor.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  const h = match ? parseInt(match[1]) : 280;
  const s = match ? parseInt(match[2]) : 70;
  const baseL = match ? parseInt(match[3]) : 55;

  let cumulative = 0;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {data.map((d, i) => {
          const fraction = d.value / total;
          const dash = fraction * circumference;
          const gap = circumference - dash;
          const offset = -cumulative * circumference;
          cumulative += fraction;
          const lightness = Math.max(35, Math.min(78, baseL - 18 + i * 9));
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={radius}
              fill="none"
              stroke={`hsl(${h}, ${s}%, ${lightness}%)`}
              strokeWidth={stroke}
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={offset}
              transform={`rotate(-90 ${cx} ${cy})`}
              style={{ transition: "all 0.5s ease" }}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-[10px]" style={{ color: "hsl(230, 15%, 55%)" }}>{centerLabel}</p>
        <p className="font-extrabold text-base text-primary-foreground" style={{ color: "hsl(250, 45%, 15%)" }}>{centerValue}</p>
      </div>
    </div>
  );
};

type ChatMessage =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "ai"; text: string }
  | { id: string; role: "ai-typing" };

export const InsightsSheetC = ({ open, onOpenChange, mode = "context" }: InsightsSheetProps) => {
  const [activeTab, setActiveTab] = useState<ContextTabKey>("assets");
  const [selectedAction, setSelectedAction] = useState<ActionKey>("investments");
  const [actionsView, setActionsView] = useState<"radio" | "list">("radio");
  const [input, setInput] = useState("");
  const [stage, setStage] = useState<"typing-greeting" | "greeting" | "typing-insights" | "insights">("typing-greeting");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Autofocus input when sheet opens
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 380);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Stage progression
  useEffect(() => {
    if (!open) {
      setStage("typing-greeting");
      setMessages([]);
      setInput("");
      setActiveTab("assets");
      setSelectedAction("investments");
      setActionsView("radio");
      return;
    }
    const t1 = setTimeout(() => setStage("greeting"), 900);
    const t2 = setTimeout(() => setStage("typing-insights"), 1700);
    const t3 = setTimeout(() => setStage("insights"), 2700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [open]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, stage]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    const userId = `u-${Date.now()}`;
    const typingId = `t-${Date.now()}`;
    setMessages((m) => [...m, { id: userId, role: "user", text }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, { id: typingId, role: "ai-typing" }]);
    }, 400);
    setTimeout(() => {
      setMessages((m) => [
        ...m.filter((x) => x.id !== typingId),
        {
          id: `a-${Date.now()}`,
          role: "ai",
          text: "שאלה מצוינת! אני בודקת את הנתונים שלך ואחזור אליך עם המלצה מותאמת אישית בעוד רגע 💡",
        },
      ]);
    }, 1800);
  };

  if (!open) return null;

  // Context-mode derived values
  const tab = contextTabs[activeTab];
  const isInsurance = activeTab === "insurance";
  const total = tab.items.reduce((s, i) => s + i.value, 0);

  // Greeting text per mode
  const greetingText =
    mode === "actions"
      ? "היי משה 👋 הכנתי לך 3 פעולות לשיפור שיכולות לחסוך לך כסף ולשפר את המצב הפיננסי שלך."
      : "היי משה 👋 הכנתי לך תובנות על המצב הפיננסי שלך. בחר קטגוריה למטה או שאל אותי כל שאלה.";

  const suggestedQuestions =
    mode === "actions"
      ? ["איך מאזנים את התיק?", "כמה אחסוך במיחזור?", "איך לבטל כפילות?"]
      : activeTab === "assets"
      ? ["איך להגדיל הכנסות?", "איפה כדאי להשקיע?", "מה התשואה הצפויה?"]
      : activeTab === "liabilities"
      ? ["איך להוריד הוצאות?", "כדאי למחזר משכנתא?", "מה הוצאה גבוהה מדי?"]
      : ["איזה ביטוח חסר לי?", "אני משלם יותר מדי?", "מה הכיסוי המיטבי?"];

  const suggestedHeader = mode === "actions" ? "שאל אותי על הפעולות שלך" : `שאל אותי על ${tab.label}`;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" dir="rtl" style={{ height: "100dvh" }}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30"
        style={{ animation: "backdrop-in 0.45s ease-out 0.05s both" }}
        onClick={() => onOpenChange(false)}
      />

      {/* Sheet */}
      <div
        className="relative w-full max-w-[430px] bg-white rounded-t-3xl shadow-2xl flex flex-col"
        style={{
          height: "calc(100dvh - 48px)",
          maxHeight: "calc(100dvh - 48px)",
          marginTop: "48px",
          animation: "sheet-slide-up 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.05s both",
        }}
      >
        {/* Floating avatar with rotating tri-color ring */}
        <div className="tri-ring absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full" style={{ top: "-32px" }}>
          <div className="w-full h-full rounded-full overflow-hidden" style={{ boxShadow: "0 8px 24px hsla(250, 30%, 20%, 0.3)" }}>
            <img src={advisorImg} alt="Finansee AI" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1.5 rounded-full" style={{ background: "hsl(230, 15%, 88%)" }} />
        </div>

        {/* Header */}
        <div className="relative flex flex-col items-center px-5 pt-7 pb-3">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-2 left-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-black/5"
          >
            <X className="h-4 w-4" style={{ color: "hsl(230, 15%, 45%)" }} />
          </button>
          <p className="text-sm font-bold" style={{ color: "hsl(250, 45%, 15%)" }}>
            {mode === "actions" ? "התובנות של דנה" : "דנה — Finansee AI"}
          </p>
        </div>

        {/* Scrollable content */}
        <div ref={scrollRef} className="overflow-y-auto px-5 pb-4 flex-1">
          {/* Typing → greeting */}
          {stage === "typing-greeting" && (
            <div className="flex items-end gap-2 mb-3 animate-fade-in">
              <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0" style={{ boxShadow: "0 2px 6px hsla(275, 65%, 25%, 0.35)" }}>
                <img src={advisorImg} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl rounded-br-md px-3.5 py-3 flex items-center gap-1" style={{ background: "white", border: "1px solid hsl(230, 20%, 92%)", boxShadow: "0 2px 10px hsla(230, 30%, 50%, 0.06)" }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(230, 15%, 65%)", animation: "typing-dot 1.2s infinite", animationDelay: "0s" }} />
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(230, 15%, 65%)", animation: "typing-dot 1.2s infinite", animationDelay: "0.2s" }} />
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(230, 15%, 65%)", animation: "typing-dot 1.2s infinite", animationDelay: "0.4s" }} />
              </div>
            </div>
          )}

          {/* Greeting bubble */}
          {stage !== "typing-greeting" && (
            <div className="flex items-end gap-2 mb-3 animate-fade-in">
              <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0" style={{ boxShadow: "0 2px 6px hsla(275, 65%, 25%, 0.35)" }}>
                <img src={advisorImg} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col items-start max-w-[85%]">
                <div className="rounded-2xl rounded-br-md px-3.5 py-2.5" style={{ background: "white", border: "1px solid hsl(230, 20%, 92%)", boxShadow: "0 2px 10px hsla(230, 30%, 50%, 0.06)" }}>
                  <p className="text-xs leading-relaxed text-right" style={{ color: "hsl(250, 35%, 25%)" }}>
                    {greetingText}
                  </p>
                </div>
                <p className="text-[9px] mt-1 mr-1" style={{ color: "hsl(230, 15%, 60%)" }}>עכשיו</p>
              </div>
            </div>
          )}

          {/* Typing → insights */}
          {stage === "typing-insights" && (
            <div className="flex items-end gap-2 mb-3 animate-fade-in">
              <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0" style={{ boxShadow: "0 2px 6px hsla(275, 65%, 25%, 0.35)" }}>
                <img src={advisorImg} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl rounded-br-md px-3.5 py-3 flex items-center gap-1" style={{ background: "white", border: "1px solid hsl(230, 20%, 92%)", boxShadow: "0 2px 10px hsla(230, 30%, 50%, 0.06)" }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(230, 15%, 65%)", animation: "typing-dot 1.2s infinite", animationDelay: "0s" }} />
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(230, 15%, 65%)", animation: "typing-dot 1.2s infinite", animationDelay: "0.2s" }} />
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(230, 15%, 65%)", animation: "typing-dot 1.2s infinite", animationDelay: "0.4s" }} />
              </div>
            </div>
          )}

          {/* === CONTEXT MODE: Donut + tabs bubble === */}
          {stage === "insights" && mode === "context" && (
            <div className="flex items-end gap-2 mb-3 animate-fade-in">
              <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0" style={{ boxShadow: "0 2px 6px hsla(275, 65%, 25%, 0.35)" }}>
                <img src={advisorImg} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col items-end max-w-[92%] flex-1 min-w-0">
                <div className="rounded-2xl rounded-br-md p-3.5 w-full" style={{ background: "white", border: "1px solid hsl(230, 20%, 92%)", boxShadow: "0 2px 10px hsla(230, 30%, 50%, 0.06)" }}>
                  {/* Tabs */}
                  <div className="flex gap-1.5 mb-3">
                    {(Object.keys(contextTabs) as ContextTabKey[]).map((key) => {
                      const t = contextTabs[key];
                      const isActive = activeTab === key;
                      return (
                        <button
                          key={key}
                          onClick={() => setActiveTab(key)}
                          className="flex-1 py-1.5 rounded-lg text-[11px] font-semibold transition-all"
                          style={{
                            background: isActive ? t.gradient : "hsl(230, 20%, 96%)",
                            color: isActive ? "white" : "hsl(230, 15%, 45%)",
                            boxShadow: isActive ? `0 3px 10px hsla(${t.accent.match(/\d+/)?.[0] || 280}, 60%, 50%, 0.3)` : "none",
                          }}
                        >
                          {t.label}
                        </button>
                      );
                    })}
                  </div>

                  <p className="text-[10px] mb-2.5" style={{ color: "hsl(230, 15%, 55%)" }}>{tab.headline}</p>

                  <div className="flex items-center gap-3">
                    <Donut
                      data={tab.items.map((i) => ({ label: i.label, value: Math.max(i.value, 0.001) }))}
                      centerLabel={isInsurance ? "פעילות" : "סה״כ"}
                      centerValue={isInsurance ? `${tab.items.filter((i) => i.value === 1).length}/${tab.items.length}` : formatNIS(total)}
                      baseColor={tab.accent}
                    />
                    <div className="flex-1 space-y-1.5 min-w-0">
                      {tab.items.slice(0, 5).map((item, i) => {
                        const match = tab.accent.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
                        const h = match ? parseInt(match[1]) : 280;
                        const s = match ? parseInt(match[2]) : 70;
                        const baseL = match ? parseInt(match[3]) : 55;
                        const lightness = Math.max(35, Math.min(78, baseL - 18 + i * 9));
                        const pct = isInsurance
                          ? item.value === 1 ? "פעיל" : "חסר"
                          : `${Math.round((item.value / (total || 1)) * 100)}%`;
                        return (
                          <div key={i} className="flex items-center gap-2 text-[11px]">
                            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: `hsl(${h}, ${s}%, ${lightness}%)` }} />
                            <span className="truncate flex-1" style={{ color: "hsl(250, 35%, 25%)" }}>{item.label}</span>
                            <span className="font-bold flex-shrink-0" style={{ color: "hsl(250, 40%, 20%)" }}>{pct}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <p className="text-[9px] mt-1 mr-1" style={{ color: "hsl(230, 15%, 60%)" }}>עכשיו</p>
              </div>
            </div>
          )}

          {/* === ACTIONS MODE: 3 compact cards in a 2-col grid + selection + single CTA, no surrounding bubble === */}
          {stage === "insights" && mode === "actions" && (
            <div className="mb-3 animate-fade-in" dir="rtl">
              {/* Toggle between two display modes */}
              <div
                className="flex p-1 rounded-full mb-3 mx-auto"
                style={{
                  background: "hsl(230, 25%, 95%)",
                  border: "1px solid hsl(230, 20%, 92%)",
                  width: "fit-content",
                }}
              >
                {([
                  { key: "radio" as const, label: "מומלץ" },
                  { key: "list" as const, label: "כל הפעולות" },
                ]).map((opt) => {
                  const isActive = actionsView === opt.key;
                  return (
                    <button
                      key={opt.key}
                      onClick={() => setActionsView(opt.key)}
                      className="px-3.5 py-1 rounded-full text-[11px] font-semibold transition-all"
                      style={{
                        background: isActive
                          ? "linear-gradient(135deg, hsl(265, 60%, 35%), hsl(290, 70%, 60%))"
                          : "transparent",
                        color: isActive ? "white" : "hsl(230, 20%, 45%)",
                        boxShadow: isActive ? "0 2px 8px hsla(280, 60%, 40%, 0.3)" : "none",
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              {actionsView === "radio" && (
                <>
                  <p className="text-[11px] mb-2.5 px-1 text-right" style={{ color: "hsl(250, 30%, 25%)" }}>
                    הנה 3 פעולות לשיפור שהכנתי לך 👇
                  </p>

                  {/* Compact cards — 2 per row, no outer bubble */}
                  <div className="grid grid-cols-2 gap-2">
                    {(Object.keys(actionsConfig) as ActionKey[]).map((key) => {
                      const t = actionsConfig[key];
                      const Icon = t.Icon;
                      const isSelected = selectedAction === key;
                      return (
                        <button
                          key={key}
                          onClick={() => setSelectedAction(key)}
                          className="relative rounded-xl p-2.5 flex flex-col gap-1.5 overflow-hidden text-right transition-all hover:scale-[1.02] active:scale-[0.98]"
                          style={{
                            background: "white",
                            boxShadow: isSelected
                              ? `0 4px 14px hsla(250, 30%, 25%, 0.10), 0 0 0 2px ${t.accent}`
                              : "0 2px 8px hsla(250, 30%, 25%, 0.05)",
                            border: isSelected ? "1px solid transparent" : "1px solid hsl(230, 20%, 94%)",
                          }}
                        >
                          <div className="flex items-center gap-1.5">
                            <Icon className="h-3 w-3 flex-shrink-0" style={{ color: t.accent }} strokeWidth={2.5} />
                            <span className="text-[10px] font-bold tracking-wide" style={{ color: t.accent }}>
                              {t.label}
                            </span>
                          </div>
                          <p className="text-[12px] font-extrabold tracking-tight leading-tight" style={{ color: "hsl(250, 50%, 12%)" }}>
                            {t.title}
                          </p>
                          <p className="text-[10px] leading-snug" style={{ color: "hsl(230, 15%, 45%)" }}>
                            {t.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Single CTA for the selected card */}
                  {(() => {
                    const sel = actionsConfig[selectedAction];
                    return (
                      <div className="mt-3 flex justify-start" dir="ltr">
                        <button className="cta-tri inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-[12px] font-bold transition-transform hover:scale-[1.01] active:scale-[0.99]">
                          {sel.cta}
                          <ArrowLeft className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })()}
                </>
              )}

              {actionsView === "list" && (
                <div className="space-y-2">
                  {(Object.keys(actionsConfig) as ActionKey[]).map((key) => {
                    const t = actionsConfig[key];
                    const Icon = t.Icon;
                    return (
                      <div
                        key={key}
                        className="rounded-xl p-3 flex items-start gap-3 text-right"
                        style={{
                          background: "white",
                          border: "1px solid hsl(230, 20%, 94%)",
                          boxShadow: "0 2px 8px hsla(250, 30%, 25%, 0.05)",
                        }}
                      >
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: t.accentBg }}
                        >
                          <Icon className="h-4 w-4" style={{ color: t.accent }} strokeWidth={2.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-[9px] font-bold tracking-wide" style={{ color: t.accent }}>
                              {t.label}
                            </span>
                          </div>
                          <p className="text-[12px] font-extrabold tracking-tight leading-tight mb-1" style={{ color: "hsl(250, 50%, 12%)" }}>
                            {t.title}
                          </p>
                          <p className="text-[10px] leading-snug mb-2" style={{ color: "hsl(230, 15%, 45%)" }}>
                            {t.description}
                          </p>
                          <div className="flex justify-start" dir="ltr">
                            <button className="cta-tri inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-transform hover:scale-[1.02] active:scale-[0.98]">
                              {t.cta}
                              <ArrowLeft className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Suggested questions — hidden in actions mode */}
          {stage === "insights" && mode !== "actions" && (
            <>
              <div className="flex items-center gap-1.5 mb-2.5 justify-center" dir="rtl">
                <Sparkles className="w-3 h-3" style={{ color: "hsl(230, 15%, 55%)" }} />
                <p className="text-[11px] font-semibold" style={{ color: "hsl(230, 20%, 40%)" }}>{suggestedHeader}</p>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-2 justify-center" dir="rtl">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      setInput(q);
                      inputRef.current?.focus();
                    }}
                    className="inline-flex items-center text-[11px] font-medium px-3 py-1.5 rounded-full transition-all hover:scale-[1.04] active:scale-[0.98]"
                    style={{
                      background: "white",
                      border: "1px solid hsl(230, 20%, 90%)",
                      color: "hsl(230, 20%, 35%)",
                      boxShadow: "0 1px 2px hsla(230, 20%, 40%, 0.04)",
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Conversation messages */}
          {messages.map((msg) => {
            if (msg.role === "user") {
              return (
                <div key={msg.id} className="flex justify-end mb-3 animate-fade-in" dir="rtl">
                  <div className="max-w-[80%] rounded-2xl rounded-bl-md px-3.5 py-2.5" style={{ background: "hsl(250, 30%, 8%)", boxShadow: "0 4px 14px hsla(250, 30%, 15%, 0.35)" }}>
                    <p className="text-xs leading-relaxed text-right" style={{ color: "white" }}>{msg.text}</p>
                  </div>
                </div>
              );
            }
            if (msg.role === "ai-typing") {
              return (
                <div key={msg.id} className="flex items-end gap-2 mb-3 animate-fade-in" dir="rtl">
                  <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0" style={{ boxShadow: "0 2px 6px hsla(275, 65%, 25%, 0.35)" }}>
                    <img src={advisorImg} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="rounded-2xl rounded-br-md px-3.5 py-3 flex items-center gap-1" style={{ background: "white", border: "1px solid hsl(230, 20%, 92%)", boxShadow: "0 2px 10px hsla(230, 30%, 50%, 0.06)" }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(230, 15%, 65%)", animation: "typing-dot 1.2s infinite", animationDelay: "0s" }} />
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(230, 15%, 65%)", animation: "typing-dot 1.2s infinite", animationDelay: "0.2s" }} />
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(230, 15%, 65%)", animation: "typing-dot 1.2s infinite", animationDelay: "0.4s" }} />
                  </div>
                </div>
              );
            }
            return (
              <div key={msg.id} className="flex items-end gap-2 mb-3 animate-fade-in" dir="rtl">
                <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0" style={{ boxShadow: "0 2px 6px hsla(275, 65%, 25%, 0.35)" }}>
                  <img src={advisorImg} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="max-w-[85%]">
                  <div className="rounded-2xl rounded-br-md px-3.5 py-2.5" style={{ background: "white", border: "1px solid hsl(230, 20%, 92%)", boxShadow: "0 2px 10px hsla(230, 30%, 50%, 0.06)" }}>
                    <p className="text-xs leading-relaxed text-right" style={{ color: "hsl(250, 35%, 25%)" }}>{msg.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input bar */}
        <div className="px-5 py-3 border-t" style={{ borderColor: "hsl(230, 20%, 93%)", background: "white" }} dir="rtl">
          <div
            className="flex items-center gap-2 rounded-full px-4 py-2 transition-all"
            style={{
              background: input ? "white" : "hsl(230, 25%, 96%)",
              border: input ? "1px solid hsla(280, 60%, 38%, 0.55)" : "1px solid hsl(230, 20%, 90%)",
              boxShadow: input ? "0 0 0 3px hsla(280, 60%, 38%, 0.14)" : "none",
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="שאל את Finansee AI..."
              className="flex-1 bg-transparent text-sm outline-none text-right placeholder:text-xs"
              style={{ color: "hsl(250, 40%, 20%)" }}
              dir="rtl"
            />
            {!input && (
              <button className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform hover:scale-105 active:scale-95" style={{ background: "white", border: "1px solid hsl(230, 20%, 90%)" }}>
                <Mic className="h-3.5 w-3.5" style={{ color: "hsl(230, 15%, 45%)" }} />
              </button>
            )}
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${input ? "cta-tri" : ""}`}
              style={{
                background: input ? undefined : "hsl(230, 20%, 88%)",
                boxShadow: input ? "0 4px 12px hsla(250, 30%, 15%, 0.4)" : "none",
              }}
            >
              <Send className="h-3.5 w-3.5 rotate-180" style={{ color: "white" }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
