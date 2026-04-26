import { useState, useEffect, useRef } from "react";
import { X, Send, Mic, Sparkles } from "lucide-react";
import { incomeItems, expenseItems, insuranceItems } from "@/lib/data";
import advisorImg from "@/assets/advisor-avatar.jpg";

type TabKey = "assets" | "liabilities" | "insurance";

interface InsightsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formatNIS = (n: number) => "₪" + n.toLocaleString("he-IL");

const tabsConfig: Record<
  TabKey,
  {
    label: string;
    color: string;
    gradient: string;
    accent: string;
    items: { label: string; value: number }[];
    headline: string;
  }
> = {
  assets: {
    label: "נכסים",
    color: "hsl(200, 80%, 45%)",
    gradient: "linear-gradient(135deg, hsl(190, 85%, 55%), hsl(205, 90%, 45%))",
    accent: "hsl(190, 85%, 55%)",
    items: incomeItems.map((i) => ({ label: i.label, value: i.amount })),
    headline: "פירוט מקורות הכנסה חודשיים",
  },
  liabilities: {
    label: "התחייבויות",
    color: "hsl(345, 70%, 50%)",
    gradient: "linear-gradient(135deg, hsl(335, 75%, 60%), hsl(350, 80%, 50%))",
    accent: "hsl(345, 75%, 55%)",
    items: expenseItems.map((i) => ({ label: i.label, value: i.amount })),
    headline: "פירוט הוצאות חודשיות",
  },
  insurance: {
    label: "ביטוח",
    color: "hsl(28, 80%, 45%)",
    gradient: "linear-gradient(135deg, hsl(40, 95%, 60%), hsl(25, 92%, 55%))",
    accent: "hsl(30, 90%, 55%)",
    items: insuranceItems.map((i) => ({
      label: i.label,
      value: i.status === "פעיל" ? 1 : 0,
    })),
    headline: "סטטוס פוליסות הביטוח",
  },
};

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

  // Generate harmonious shades from baseColor by varying lightness
  // baseColor expected as "hsl(H, S%, L%)"
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
        <p className="text-[10px]" style={{ color: "hsl(230, 15%, 55%)" }}>
          {centerLabel}
        </p>
        <p className="text-base font-extrabold" style={{ color: "hsl(250, 45%, 15%)" }}>
          {centerValue}
        </p>
      </div>
    </div>
  );
};

export const InsightsSheet = ({ open, onOpenChange }: InsightsSheetProps) => {
  const [activeTab, setActiveTab] = useState<TabKey>("assets");
  const [input, setInput] = useState("");
  const [stage, setStage] = useState<"typing-greeting" | "greeting" | "typing-insights" | "insights">("typing-greeting");
  const inputRef = useRef<HTMLInputElement>(null);

  // Autofocus input when sheet opens — pops the mobile keyboard
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 380);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Stage progression: typing → greeting → typing → insights
  useEffect(() => {
    if (!open) {
      setStage("typing-greeting");
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

  const tab = tabsConfig[activeTab];
  const total = tab.items.reduce((s, i) => s + i.value, 0);
  const isInsurance = activeTab === "insurance";

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" dir="rtl">
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
          height: "calc(100vh - 48px)",
          maxHeight: "calc(100vh - 48px)",
          marginTop: "48px",
          animation: "sheet-slide-up 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.05s both",
          transition: "max-height 0.4s cubic-bezier(0.22, 1, 0.36, 1), height 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {/* Floating avatar — half over the top of the sheet */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full overflow-hidden"
          style={{
            top: "-32px",
            boxShadow:
              "0 0 0 3px white, 0 0 0 5px hsla(290, 70%, 55%, 0.35), 0 8px 24px hsla(290, 70%, 55%, 0.25)",
          }}
        >
          <img src={advisorImg} alt="Finansee AI" className="w-full h-full object-cover" />
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
            דנה — Finansee AI
          </p>
        </div>
        {/* Scrollable content */}
        <div className="overflow-y-auto px-5 pb-4 flex-1">
          {/* Typing indicator before greeting */}
          {stage === "typing-greeting" && (
            <div className="flex items-end gap-2 mb-3 animate-fade-in">
              <div
                className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0"
                style={{ boxShadow: "0 2px 6px hsla(290, 70%, 55%, 0.25)" }}
              >
                <img src={advisorImg} alt="" className="w-full h-full object-cover" />
              </div>
              <div
                className="rounded-2xl rounded-br-md px-3.5 py-3 flex items-center gap-1"
                style={{
                  background: "white",
                  border: "1px solid hsl(230, 20%, 92%)",
                  boxShadow: "0 2px 10px hsla(230, 30%, 50%, 0.06)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(230, 15%, 65%)", animation: "typing-dot 1.2s infinite", animationDelay: "0s" }} />
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(230, 15%, 65%)", animation: "typing-dot 1.2s infinite", animationDelay: "0.2s" }} />
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(230, 15%, 65%)", animation: "typing-dot 1.2s infinite", animationDelay: "0.4s" }} />
              </div>
            </div>
          )}

          {/* Greeting bubble */}
          {stage !== "typing-greeting" && (
            <div className="flex items-end gap-2 mb-3 animate-fade-in">
              <div
                className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0"
                style={{ boxShadow: "0 2px 6px hsla(290, 70%, 55%, 0.25)" }}
              >
                <img src={advisorImg} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col items-start max-w-[85%]">
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
                    היי משה 👋 הכנתי לך תובנות על המצב הפיננסי שלך. בחר קטגוריה למטה או שאל אותי כל שאלה.
                  </p>
                </div>
                <p
                  className="text-[9px] mt-1 mr-1"
                  style={{ color: "hsl(230, 15%, 60%)" }}
                >
                  עכשיו
                </p>
              </div>
            </div>
          )}

          {/* Typing indicator before insights */}
          {stage === "typing-insights" && (
            <div className="flex items-end gap-2 mb-3 animate-fade-in">
              <div
                className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0"
                style={{ boxShadow: "0 2px 6px hsla(290, 70%, 55%, 0.25)" }}
              >
                <img src={advisorImg} alt="" className="w-full h-full object-cover" />
              </div>
              <div
                className="rounded-2xl rounded-br-md px-3.5 py-3 flex items-center gap-1"
                style={{
                  background: "white",
                  border: "1px solid hsl(230, 20%, 92%)",
                  boxShadow: "0 2px 10px hsla(230, 30%, 50%, 0.06)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(230, 15%, 65%)", animation: "typing-dot 1.2s infinite", animationDelay: "0s" }} />
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(230, 15%, 65%)", animation: "typing-dot 1.2s infinite", animationDelay: "0.2s" }} />
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(230, 15%, 65%)", animation: "typing-dot 1.2s infinite", animationDelay: "0.4s" }} />
              </div>
            </div>
          )}

          {/* Insights as a chat bubble from Dana */}
          {stage === "insights" && (
          <div className="flex items-end gap-2 mb-3 animate-fade-in">
            <div
              className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0"
              style={{ boxShadow: "0 2px 6px hsla(290, 70%, 55%, 0.25)" }}
            >
              <img src={advisorImg} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col items-end max-w-[92%] flex-1">
              <div
                className="rounded-2xl rounded-br-md p-3.5 w-full"
                style={{
                  background: "white",
                  border: "1px solid hsl(230, 20%, 92%)",
                  boxShadow: "0 2px 10px hsla(230, 30%, 50%, 0.06)",
                }}
              >
                {/* Tabs inside the bubble */}
                <div className="flex gap-1.5 mb-3">
                  {(Object.keys(tabsConfig) as TabKey[]).map((key) => {
                    const t = tabsConfig[key];
                    const isActive = activeTab === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className="flex-1 py-1.5 rounded-lg text-[11px] font-semibold transition-all"
                        style={{
                          background: isActive ? t.gradient : "hsl(230, 20%, 96%)",
                          color: isActive ? "white" : "hsl(230, 15%, 45%)",
                          boxShadow: isActive
                            ? `0 3px 10px hsla(${t.accent.match(/\d+/)?.[0] || 280}, 60%, 50%, 0.3)`
                            : "none",
                        }}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>

                <p
                  className="text-[10px] mb-2.5"
                  style={{ color: "hsl(230, 15%, 55%)" }}
                >
                  {tab.headline}
                </p>

                <div className="flex items-center gap-3">
                  <Donut
                    data={tab.items.map((i) => ({
                      label: i.label,
                      value: Math.max(i.value, 0.001),
                    }))}
                    centerLabel={isInsurance ? "פעילות" : "סה״כ"}
                    centerValue={
                      isInsurance
                        ? `${tab.items.filter((i) => i.value === 1).length}/${tab.items.length}`
                        : formatNIS(total)
                    }
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
                        ? item.value === 1
                          ? "פעיל"
                          : "חסר"
                        : `${Math.round((item.value / (total || 1)) * 100)}%`;
                      return (
                        <div key={i} className="flex items-center gap-2 text-[11px]">
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ background: `hsl(${h}, ${s}%, ${lightness}%)` }}
                          />
                          <span
                            className="truncate flex-1"
                            style={{ color: "hsl(250, 35%, 25%)" }}
                          >
                            {item.label}
                          </span>
                          <span
                            className="font-bold flex-shrink-0"
                            style={{ color: "hsl(250, 40%, 20%)" }}
                          >
                            {pct}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <p
                className="text-[9px] mt-1 mr-1"
                style={{ color: "hsl(230, 15%, 60%)" }}
              >
                עכשיו
              </p>
            </div>
          </div>
          )}

          {stage === "insights" && (<>
          {/* Suggested questions */}
          <div className="flex items-center gap-1.5 mb-2.5 justify-end">
            <p
              className="text-[11px] font-semibold"
              style={{ color: "hsl(230, 20%, 40%)" }}
            >
              שאל אותי על {tab.label}
            </p>
            <Sparkles className="w-3 h-3" style={{ color: tab.accent }} />
          </div>
          <div className="flex flex-wrap gap-1.5 mb-2 justify-end">
            {(activeTab === "assets"
              ? ["איך להגדיל הכנסות?", "איפה כדאי להשקיע?", "מה התשואה הצפויה?"]
              : activeTab === "liabilities"
              ? ["איך להוריד הוצאות?", "כדאי למחזר משכנתא?", "מה הוצאה גבוהה מדי?"]
              : ["איזה ביטוח חסר לי?", "אני משלם יותר מדי?", "מה הכיסוי המיטבי?"]
            ).map((q) => {
              const m = tab.accent.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
              const h = m ? parseInt(m[1]) : 280;
              const s = m ? parseInt(m[2]) : 70;
              return (
                <button
                  key={q}
                  onClick={() => {
                    setInput(q);
                    inputRef.current?.focus();
                  }}
                  className="group inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-full transition-all hover:scale-[1.04] active:scale-[0.98]"
                  style={{
                    background: `linear-gradient(135deg, hsla(${h}, ${s}%, 96%, 1), hsla(${h}, ${s}%, 92%, 1))`,
                    border: `1px solid hsla(${h}, ${s}%, 75%, 0.5)`,
                    color: `hsl(${h}, ${Math.min(s + 5, 90)}%, 35%)`,
                    boxShadow: `0 1px 3px hsla(${h}, ${s}%, 50%, 0.08), inset 0 1px 0 hsla(0, 0%, 100%, 0.6)`,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: tab.accent }}
                  />
                  <span>{q}</span>
                </button>
              );
            })}
          </div>
          </>
          )}
        </div>

        {/* Input bar */}
        <div
          className="px-5 py-3 border-t"
          style={{ borderColor: "hsl(230, 20%, 93%)", background: "white" }}
          dir="rtl"
        >
          <div
            className="flex items-center gap-2 rounded-full px-4 py-2"
            style={{
              background: "hsl(230, 25%, 96%)",
              border: "1px solid hsl(230, 20%, 90%)",
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="שאל את Finansee AI..."
              className="flex-1 bg-transparent text-sm outline-none text-right placeholder:text-xs"
              style={{ color: "hsl(250, 40%, 20%)" }}
              dir="rtl"
            />
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform hover:scale-105 active:scale-95"
              style={{ background: "white", border: "1px solid hsl(230, 20%, 90%)" }}
            >
              <Mic className="h-3.5 w-3.5" style={{ color: "hsl(230, 15%, 45%)" }} />
            </button>
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, hsl(285, 75%, 62%), hsl(310, 70%, 55%))",
                boxShadow: "0 4px 12px hsla(295, 70%, 50%, 0.38)",
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
