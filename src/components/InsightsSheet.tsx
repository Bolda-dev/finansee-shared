import { useState, useEffect, useRef } from "react";
import { X, Send, Mic, Sparkles, TrendingUp, Shield, Landmark, ArrowLeft } from "lucide-react";
import advisorImg from "@/assets/advisor-avatar.jpg";

type TabKey = "investments" | "insurance" | "liabilities";

interface InsightsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}



const tabsConfig: Record<
  TabKey,
  {
    label: string;
    color: string;
    gradient: string;
    accent: string;
    accentBg: string;
    Icon: typeof TrendingUp;
    title: string;
    description: string;
    cta: string;
  }
> = {
  investments: {
    label: "השקעות",
    color: "hsl(195, 85%, 45%)",
    gradient: "linear-gradient(135deg, hsl(190, 85%, 50%) 0%, hsl(195, 90%, 62%) 55%, hsl(190, 95%, 75%) 100%)",
    accent: "hsl(195, 85%, 42%)",
    accentBg: "hsl(190, 80%, 95%)",
    Icon: TrendingUp,
    title: "איזון תיק השקעות",
    description:
      "הקצאת המניות שלך גבוהה כרגע ב-15% מפרופיל הסיכון היעד שלך.",
    cta: "איזון אוטומטי של התיק",
  },
  insurance: {
    label: "ביטוח",
    color: "hsl(280, 75%, 52%)",
    gradient: "linear-gradient(135deg, hsl(270, 75%, 55%) 0%, hsl(282, 80%, 65%) 55%, hsl(295, 90%, 78%) 100%)",
    accent: "hsl(280, 75%, 50%)",
    accentBg: "hsl(280, 70%, 95%)",
    Icon: Shield,
    title: "ביטוח כפול",
    description:
      "ייתכן שאתה משלם פעמיים על כיסוי בריאות דרך מקום העבודה ופוליסה פרטית.",
    cta: "בדוק פרטי כיסוי",
  },
  liabilities: {
    label: "התחייבויות",
    color: "hsl(22, 90%, 50%)",
    gradient: "linear-gradient(135deg, hsl(18, 90%, 55%) 0%, hsl(28, 95%, 62%) 55%, hsl(38, 100%, 72%) 100%)",
    accent: "hsl(22, 90%, 48%)",
    accentBg: "hsl(28, 90%, 95%)",
    Icon: Landmark,
    title: "אופטימיזציה של משכנתא",
    description:
      "ריבית המשכנתא ירדה — תוכל לחסוך ₪500 בחודש על ידי מיחזור התוכנית הנוכחית.",
    cta: "בדוק הצעת מיחזור",
  },
};

type ChatMessage =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "ai"; text: string }
  | { id: string; role: "ai-typing" };

export const InsightsSheet = ({ open, onOpenChange }: InsightsSheetProps) => {
  const [input, setInput] = useState("");
  const [stage, setStage] = useState<"typing-greeting" | "greeting" | "typing-insights" | "insights">("typing-greeting");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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
      setMessages([]);
      setInput("");
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

  // Auto-scroll to bottom when new messages arrive
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
    // simulate AI typing then reply
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
        {/* Floating avatar — half over the top of the sheet, with rotating tri-color ring */}
        <div
          className="tri-ring absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full"
          style={{ top: "-32px" }}
        >
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
            דנה — Finansee AI
          </p>
        </div>
        {/* Scrollable content */}
        <div ref={scrollRef} className="overflow-y-auto px-5 pb-4 flex-1">
          {/* Typing indicator before greeting */}
          {stage === "typing-greeting" && (
            <div className="flex items-end gap-2 mb-3 animate-fade-in">
              <div
                className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0"
                style={{ boxShadow: "0 2px 6px hsla(275, 65%, 25%, 0.35)" }}
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
                style={{ boxShadow: "0 2px 6px hsla(275, 65%, 25%, 0.35)" }}
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
                style={{ boxShadow: "0 2px 6px hsla(275, 65%, 25%, 0.35)" }}
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

          {/* Insights as a chat bubble from Dana — 3 insights side by side */}
          {stage === "insights" && (
          <div className="flex items-end gap-2 mb-3 animate-fade-in">
            <div
              className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0"
              style={{ boxShadow: "0 2px 6px hsla(275, 65%, 25%, 0.35)" }}
            >
              <img src={advisorImg} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col items-end max-w-[92%] flex-1 min-w-0">
              <div
                className="rounded-2xl rounded-br-md p-3 w-full"
                style={{
                  background: "white",
                  border: "1px solid hsl(230, 20%, 92%)",
                  boxShadow: "0 2px 10px hsla(230, 30%, 50%, 0.06)",
                }}
              >
                <p
                  className="text-[11px] mb-2.5 px-1 text-right"
                  style={{ color: "hsl(250, 30%, 25%)" }}
                >
                  הנה 3 תובנות פעילות שהכנתי לך 👇
                </p>

                {/* Horizontally scrollable insight cards */}
                <div
                  className="flex gap-2.5 overflow-x-auto pb-1 -mx-1 px-1 snap-x snap-mandatory"
                  style={{ scrollbarWidth: "none" }}
                >
                  {(Object.keys(tabsConfig) as TabKey[]).map((key) => {
                    const t = tabsConfig[key];
                    const Icon = t.Icon;
                    return (
                      <div
                        key={key}
                        className="relative rounded-2xl p-3 pt-3.5 flex flex-col gap-1 overflow-hidden flex-shrink-0 snap-start"
                        style={{
                          background: "white",
                          boxShadow: "0 3px 14px hsla(250, 30%, 25%, 0.07)",
                          border: "1px solid hsl(230, 20%, 94%)",
                          width: "200px",
                          minHeight: "210px",
                        }}
                      >
                        {/* Top color bar — category accent */}
                        <span
                          className="absolute top-0 inset-x-0 h-[3px] pointer-events-none"
                          style={{ background: t.gradient }}
                          aria-hidden
                        />

                        {/* Header: label + icon (matching financial-center cards) */}
                        <div className="flex items-start justify-between mb-1">
                          <span
                            className="text-[10px] font-semibold tracking-wide"
                            style={{ color: "hsl(250, 20%, 50%)" }}
                          >
                            {t.label}
                          </span>
                          <span
                            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: t.accentBg }}
                          >
                            <Icon className="h-4 w-4" style={{ color: t.accent }} strokeWidth={2} />
                          </span>
                        </div>

                        {/* Insight title */}
                        <p
                          className="text-[14px] font-extrabold tracking-tight leading-tight text-right"
                          style={{ color: "hsl(250, 50%, 12%)" }}
                        >
                          {t.title}
                        </p>

                        {/* Description */}
                        <p
                          className="text-[10.5px] leading-relaxed text-right mt-1"
                          style={{ color: "hsl(230, 12%, 50%)" }}
                        >
                          {t.description}
                        </p>

                        {/* CTA — black with rotating tri-color gradient */}
                        <button
                          className="cta-tri mt-auto w-full flex items-center justify-center gap-1 py-2 rounded-xl text-[11px] font-bold transition-transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                          {t.cta}
                          <ArrowLeft className="w-3 h-3" />
                        </button>
                      </div>
                    );
                  })}
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
          <div className="flex items-center gap-1.5 mb-2.5 justify-center" dir="rtl">
            <Sparkles className="w-3 h-3" style={{ color: "hsl(230, 15%, 55%)" }} />
            <p
              className="text-[11px] font-semibold"
              style={{ color: "hsl(230, 20%, 40%)" }}
            >
              שאל אותי על התובנות שלך
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-2 justify-center" dir="rtl">
            {["איך מאזנים את התיק?", "כמה אחסוך במיחזור?", "איך לבטל כפילות?"].map((q) => (
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
                  <div
                    className="max-w-[80%] rounded-2xl rounded-bl-md px-3.5 py-2.5"
                    style={{
                      background: "hsl(250, 30%, 8%)",
                      boxShadow: "0 4px 14px hsla(250, 30%, 15%, 0.35)",
                    }}
                  >
                    <p className="text-xs leading-relaxed text-right" style={{ color: "white" }}>
                      {msg.text}
                    </p>
                  </div>
                </div>
              );
            }
            if (msg.role === "ai-typing") {
              return (
                <div key={msg.id} className="flex items-end gap-2 mb-3 animate-fade-in" dir="rtl">
                  <div
                    className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0"
                    style={{ boxShadow: "0 2px 6px hsla(275, 65%, 25%, 0.35)" }}
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
              );
            }
            return (
              <div key={msg.id} className="flex items-end gap-2 mb-3 animate-fade-in" dir="rtl">
                <div
                  className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0"
                  style={{ boxShadow: "0 2px 6px hsla(275, 65%, 25%, 0.35)" }}
                >
                  <img src={advisorImg} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="max-w-[85%]">
                  <div
                    className="rounded-2xl rounded-br-md px-3.5 py-2.5"
                    style={{
                      background: "white",
                      border: "1px solid hsl(230, 20%, 92%)",
                      boxShadow: "0 2px 10px hsla(230, 30%, 50%, 0.06)",
                    }}
                  >
                    <p className="text-xs leading-relaxed text-right" style={{ color: "hsl(250, 35%, 25%)" }}>
                      {msg.text}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input bar */}
        <div
          className="px-5 py-3 border-t"
          style={{ borderColor: "hsl(230, 20%, 93%)", background: "white" }}
          dir="rtl"
        >
          <div
            className="flex items-center gap-2 rounded-full px-4 py-2 transition-all"
            style={{
              background: input ? "white" : "hsl(230, 25%, 96%)",
              border: input
                ? "1px solid hsla(280, 60%, 38%, 0.55)"
                : "1px solid hsl(230, 20%, 90%)",
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
              <button
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform hover:scale-105 active:scale-95"
                style={{ background: "white", border: "1px solid hsl(230, 20%, 90%)" }}
              >
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
