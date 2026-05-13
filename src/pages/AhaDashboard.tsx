import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { TrendingUp, TrendingDown, ShieldCheck, Menu, Lock, Plus, PiggyBank, LineChart, Briefcase, Building2, Mic, Send, X, Sparkles, Check, Clock, Loader2, ArrowLeft, Zap, Camera, FileText, ShieldHalf, ChevronDown } from "lucide-react";
import confetti from "canvas-confetti";
import { userData } from "@/lib/data";
import advisorImg from "@/assets/advisor-avatar.jpg";


type Palette = {
  gradient: string;
  shadow: string;
  solid: string;
  soft: string;
};

const palettes: Record<"assets" | "liabilities" | "insurance", Palette> = {
  assets: {
    gradient: "linear-gradient(135deg, hsl(178, 70%, 32%) 0%, hsl(174, 65%, 42%) 55%, hsl(170, 70%, 56%) 100%)",
    shadow: "0 6px 16px -4px hsla(176, 70%, 28%, 0.45)",
    solid: "hsl(178, 70%, 30%)",
    soft: "hsl(176, 55%, 95%)",
  },
  liabilities: {
    gradient: "linear-gradient(135deg, hsl(220, 85%, 48%) 0%, hsl(225, 90%, 60%) 55%, hsl(215, 95%, 75%) 100%)",
    shadow: "0 6px 16px -4px hsla(222, 80%, 45%, 0.4)",
    solid: "hsl(222, 85%, 45%)",
    soft: "hsl(220, 85%, 96%)",
  },
  insurance: {
    gradient: "linear-gradient(135deg, hsl(258, 72%, 55%) 0%, hsl(265, 78%, 65%) 55%, hsl(275, 85%, 78%) 100%)",
    shadow: "0 6px 16px -4px hsla(262, 72%, 50%, 0.42)",
    solid: "hsl(262, 75%, 52%)",
    soft: "hsl(260, 75%, 96%)",
  },
};

const AhaDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const firstName = (location.state as { firstName?: string } | null)?.firstName || userData.name;
  const [chatOpen, setChatOpen] = useState(false);
  const [tipOpen, setTipOpen] = useState(false);
  const [chatStage, setChatStage] = useState<"intro" | "harBituach" | "more">("intro");
  const [showInsight, setShowInsight] = useState(false);

  // Multi-step collection flow:
  // 1..4 = insurance steps, 5 = collecting, 6 = result+insight
  // 7 = credit (assets), 8 = credit (liab), 9 = collecting, 10 = wrap-up
  const [collectStep, setCollectStep] = useState<1|2|3|4|5|6|7|8|9|10>(1);
  const [idNumber, setIdNumber] = useState("");
  const [idDate, setIdDate] = useState("");
  const [usePhoto, setUsePhoto] = useState(false);
  const [consents, setConsents] = useState({ pension: false, copies: false, harBituach: false, creditAssets: false, creditLiab: false });
  const [collectingMsg, setCollectingMsg] = useState(0);
  const [homeAlmostDone, setHomeAlmostDone] = useState(false);
  const [insuranceUpgraded, setInsuranceUpgraded] = useState(false);
  const [danaExpanded, setDanaExpanded] = useState(false);
  const insightRef = useRef<HTMLDivElement | null>(null);

  // Reset chat state when sheet closes (keep homeAlmostDone)
  useEffect(() => {
    if (!chatOpen) {
      const t = setTimeout(() => {
        setChatStage("intro");
        setShowInsight(false);
        setCollectStep(1);
        setIdNumber("");
        setIdDate("");
        setUsePhoto(false);
        setConsents({ pension: false, copies: false, harBituach: false, creditAssets: false, creditLiab: false });
        setCollectingMsg(0);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [chatOpen]);

  // Show Dana tooltip after 4s on first landing
  useEffect(() => {
    const t = setTimeout(() => setTipOpen(true), 4000);
    return () => clearTimeout(t);
  }, []);

  // Collecting animations: step 5 → 6 (insurance), step 9 → 10 (credit)
  useEffect(() => {
    if (collectStep !== 5 && collectStep !== 9) return;
    setCollectingMsg(0);
    const t1 = setTimeout(() => setCollectingMsg(1), 600);
    const t2 = setTimeout(() => setCollectingMsg(2), 1200);
    const t3 = setTimeout(() => {
      if (collectStep === 5) {
        setCollectStep(6);
        setTimeout(() => setShowInsight(true), 1700);
      } else {
        setCollectStep(10);
      }
    }, 1900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [collectStep]);

  // Fire confetti when insight appears
  useEffect(() => {
    if (!showInsight) return;
    const rect = insightRef.current?.getBoundingClientRect();
    const origin = rect
      ? { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + 20) / window.innerHeight }
      : { x: 0.5, y: 0.5 };
    confetti({
      particleCount: 90,
      spread: 75,
      startVelocity: 38,
      origin,
      colors: ["#7C3AED", "#3B82F6", "#10B981", "#F59E0B", "#EC4899"],
      zIndex: 100,
    });
  }, [showInsight]);

  const heroCards = [
    { label: "נכסים", Icon: TrendingUp, estimate: "₪600K - ₪1.4M", category: "assets" as const, route: "/c/assets" },
    { label: "התחייבויות", Icon: TrendingDown, estimate: "₪150K - ₪400K", category: "liabilities" as const, route: "/c/liabilities" },
    { label: "ביטוח", Icon: ShieldCheck, estimate: "חלקי", category: "insurance" as const, route: "/c/insurance" },
  ];

  const centerCards = [
    { label: "פנסיה", Icon: PiggyBank, category: "assets" as const },
    { label: "השקעות", Icon: LineChart, category: "assets" as const },
    { label: "הלוואות", Icon: Briefcase, category: "liabilities" as const },
    { label: "משכנתא", Icon: Building2, category: "liabilities" as const },
  ];

  const dashedBorder = "hsl(230, 18%, 70%)";
  const mutedIconColor = "hsl(230, 14%, 50%)";

  return (
    <div
      className="min-h-screen max-w-[430px] mx-auto relative pb-28"
      dir="rtl"
      style={{ background: "hsl(235, 30%, 97%)" }}
    >
      {/* Soft gradient background */}
      <div className="absolute inset-x-0 top-0 h-[520px] z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, hsl(0, 0%, 100%) 0%, hsl(230, 20%, 96%) 60%, hsl(235, 30%, 97%) 100%)",
          }}
        />
      </div>

      {/* Header */}
      <div className="relative z-10 px-3 pt-6 pb-0" style={{ animation: "aha-item-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0s both" }}>
        <div className="flex flex-col items-start gap-4 text-start">
          <div className="relative flex items-center w-full">
            <button
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "hsla(250, 40%, 99%, 0.55)",
                backdropFilter: "blur(12px)",
                border: "1px solid hsla(250, 50%, 92%, 0.5)",
              }}
              aria-label="תפריט"
            >
              <Menu className="h-5 w-5" style={{ color: "hsl(250, 40%, 20%)" }} />
            </button>
          </div>
          <h1 className="text-lg font-bold mb-1" style={{ color: "hsl(250, 40%, 15%)" }}>
            בוקר טוב, {firstName}
          </h1>
        </div>
      </div>

      {/* Hero — estimated range */}
      <div className="relative z-10 px-3 mb-6" style={{ animation: "aha-item-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.12s both" }}>
        <p className="text-sm font-medium mb-2" style={{ color: "hsl(250, 35%, 30%)" }}>
          הערכה ראשונית
        </p>
        <p
          className="font-extrabold tracking-tight text-4xl mb-1"
          style={{ color: "hsl(250, 50%, 10%)" }}
        >
          ₪450K - ₪1.2M
        </p>
        <p className="text-[12px]" style={{ color: "hsl(230, 15%, 55%)" }}>
          הערכה לפי הפרופיל שלך
        </p>
      </div>

      {/* Dana callout */}
      <div className="relative z-10 px-3 mb-6" style={{ animation: "aha-item-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.24s both" }}>
        {insuranceUpgraded ? (
          <div
            className="rounded-2xl p-4"
            style={{
              background: "white",
              boxShadow: "0 4px 18px hsla(250, 30%, 25%, 0.08)",
              border: "1px solid hsl(230, 20%, 93%)",
            }}
          >
            <div className="flex items-start gap-3">
              <span className="block w-11 h-11 rounded-full overflow-hidden flex-shrink-0" style={{ border: "2px solid hsl(262, 75%, 55%)" }}>
                <img src={advisorImg} alt="דנה" className="w-full h-full object-cover" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] leading-relaxed mb-0.5" style={{ color: "hsl(250, 35%, 22%)" }}>
                  היי {firstName} 👋 חיברנו <span className="font-bold">42%</span> מהנתונים שלך.
                </p>
                <p className="text-[11.5px] leading-snug" style={{ color: "hsl(250, 25%, 45%)" }}>
                  בוא נשלים את התמונה לשווי האמיתי שלך.
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="flex items-center gap-2 mt-3 mb-3">
              <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "hsl(230, 20%, 93%)" }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: "42%",
                    background: "linear-gradient(90deg, hsl(262, 75%, 55%), hsl(220, 85%, 55%))",
                    transition: "width 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                />
              </div>
              <span className="text-[11px] font-extrabold whitespace-nowrap" style={{ color: "hsl(262, 75%, 45%)" }}>
                42%
              </span>
            </div>

            {/* Expand toggle */}
            <button
              onClick={() => setDanaExpanded((v) => !v)}
              className="w-full flex items-center justify-between text-right focus:outline-none"
              style={{ color: "hsl(250, 35%, 25%)" }}
            >
              <span className="text-[12px] font-bold">חיבור לנתונים הבאים</span>
              <ChevronDown
                className="h-4 w-4 transition-transform duration-300"
                style={{ transform: danaExpanded ? "rotate(180deg)" : "rotate(0deg)", color: "hsl(262, 75%, 55%)" }}
              />
            </button>

            {danaExpanded && (
              <div className="space-y-2 mt-3" style={{ animation: "aha-item-in 0.35s cubic-bezier(0.22, 1, 0.36, 1) both" }}>
                {[
                  { Icon: PiggyBank, label: "אשראי", desc: "חשבון בנק וכרטיסי אשראי", category: "liabilities" as const, route: "/c/liabilities" },
                  { Icon: TrendingUp, label: "השקעות ונדל״ן ונכסים", desc: "תיקי השקעות, נדל״ן ונכסים נוספים", category: "assets" as const, route: "/c/assets" },
                ].map((item) => {
                  const p = palettes[item.category];
                  return (
                    <button
                      key={item.label}
                      onClick={() => navigate(item.route)}
                      className="w-full text-start rounded-xl p-3 flex items-center gap-3 transition-transform active:scale-[0.98]"
                      style={{ background: "hsl(230, 30%, 97%)", border: "1px solid hsl(230, 20%, 92%)" }}
                    >
                      <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: p.gradient }}>
                        <item.Icon className="h-4 w-4 text-white" />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-[12.5px] font-extrabold" style={{ color: "hsl(250, 40%, 15%)" }}>{item.label}</span>
                        <span className="block text-[10.5px]" style={{ color: "hsl(230, 15%, 50%)" }}>{item.desc}</span>
                      </span>
                      <Plus className="h-4 w-4 flex-shrink-0" style={{ color: "hsl(262, 75%, 55%)" }} />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div
            className="rounded-2xl p-4 flex items-start gap-3"
            style={{
              background: "white",
              boxShadow: "0 4px 18px hsla(250, 30%, 25%, 0.08)",
              border: "1px solid hsl(230, 20%, 93%)",
            }}
          >
            <span className="block w-11 h-11 rounded-full overflow-hidden flex-shrink-0" style={{ border: "2px solid hsl(262, 75%, 55%)" }}>
              <img src={advisorImg} alt="דנה" className="w-full h-full object-cover" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] leading-relaxed" style={{ color: "hsl(250, 35%, 22%)" }}>
                היי {firstName} 👋 אנשים בפרופיל שלך בדרך כלל שווים בין{" "}
                <span className="font-bold">₪450K ל-₪1.2M</span>. רוצה לראות את השווי האמיתי שלך?
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 3 hero locked cards */}
      <div className="relative z-10 px-3">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {heroCards.map((card, idx) => {
            const p = palettes[card.category];
            const isUpgradedInsurance = card.category === "insurance" && insuranceUpgraded;
            const enterAnim = `aha-item-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) ${0.36 + idx * 0.1}s both`;
            if (isUpgradedInsurance) {
              return (
                <button
                  key={card.label}
                  onClick={() => navigate(card.route)}
                  className="relative rounded-2xl px-3 py-3 text-start flex flex-col justify-between transition-transform active:scale-[0.97]"
                  style={{
                    background: p.gradient,
                    boxShadow: p.shadow,
                    minHeight: "168px",
                    border: "1.5px solid transparent",
                    animation: enterAnim,
                  }}
                >
                  {/* Icon top-right (RTL: start) */}
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ background: "hsla(0,0%,100%,0.22)" }}
                  >
                    <card.Icon className="h-4 w-4 text-white" />
                  </div>
                  {/* Bottom: label + big number */}
                  <div>
                    <p className="text-[12px] font-medium mb-1" style={{ color: "hsla(255,255,255,0.85)" }}>
                      {card.label}
                    </p>
                    <p className="font-extrabold text-xl text-white leading-none">
                      7 פוליסות
                    </p>
                  </div>
                </button>
              );
            }
            return (
              <div
                key={card.label}
                className="relative rounded-2xl px-2.5 py-3 text-start flex flex-col"
                style={{
                  background: "hsla(0, 0%, 100%, 0.4)",
                  border: `1.5px dashed ${dashedBorder}`,
                  minHeight: "168px",
                  animation: enterAnim,
                }}
              >
                <div
                  className="w-9 h-9 mb-3 rounded-full flex items-center justify-center"
                  style={{ background: "hsl(230, 25%, 95%)" }}
                >
                  <card.Icon className="h-4 w-4" style={{ color: mutedIconColor }} />
                </div>
                <p className="text-[11px] font-medium mb-1" style={{ color: "hsl(230, 18%, 40%)" }}>
                  {card.label}
                </p>
                <p className="text-[9.5px] leading-tight mb-2" style={{ color: "hsl(230, 14%, 50%)" }}>
                  הערכה: {card.estimate}
                </p>
                <button
                  onClick={() => navigate(card.route)}
                  className="mt-auto w-full rounded-full py-1.5 text-[10.5px] font-bold flex items-center justify-center text-white transition-transform active:scale-[0.97]"
                  style={{
                    background: p.gradient,
                    boxShadow: p.shadow,
                  }}
                >
                  חיבור לנתונים
                </button>
              </div>
            );
          })}
        </div>

        {/* Financial Center */}
        <h2 className="text-sm font-bold mb-3" style={{ color: "hsl(250, 40%, 20%)", animation: "aha-item-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.7s both" }}>
          מרכז פיננסי
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {centerCards.map((card, idx) => {
            const p = palettes[card.category];
            const ccDelay = 0.78 + idx * 0.08;
            return (
              <div
                key={card.label}
                className="relative rounded-2xl p-3 text-start flex flex-col"
                style={{
                  background: "white",
                  border: "1px solid hsl(230, 20%, 92%)",
                  boxShadow: "0 2px 10px hsla(250, 30%, 25%, 0.04)",
                  minHeight: "138px",
                  animation: `aha-item-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) ${ccDelay}s both`,
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: p.soft }}
                  >
                    <card.Icon className="h-4 w-4" style={{ color: p.solid }} />
                  </div>
                  <p className="text-[12px] font-semibold" style={{ color: "hsl(250, 40%, 20%)" }}>
                    {card.label}
                  </p>
                </div>
                <p className="font-extrabold text-base mb-0.5" style={{ color: "hsl(230, 14%, 60%)" }}>
                  —
                </p>
                <p className="text-[10px] mb-2" style={{ color: "hsl(230, 14%, 55%)" }}>
                  ללא נתונים
                </p>
                <button
                  onClick={() => navigate("/c")}
                  className="mt-auto w-full rounded-full py-1.5 text-[10.5px] font-semibold flex items-center justify-center gap-1 transition-colors"
                  style={{
                    background: "transparent",
                    color: p.solid,
                    border: `1px solid ${p.solid}`,
                  }}
                >
                  <Plus className="h-3 w-3" />
                  חיבור לנתונים
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pulsing glow for tooltip */}
      <style>{`
        @keyframes aha-tip-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        @keyframes aha-tip-glow {
          0%, 100% {
            box-shadow:
              0 0 8px 2px hsla(262, 75%, 58%, 0.35),
              0 10px 24px hsla(250, 40%, 25%, 0.15);
          }
          50% {
            box-shadow:
              0 0 32px 8px hsla(262, 75%, 58%, 0.18),
              0 14px 36px hsla(250, 40%, 25%, 0.2);
          }
        }
        .aha-tip-wrap {
          background: white;
          border-radius: 20px;
          border: 1px solid hsla(262, 75%, 58%, 0.3);
          animation: aha-tip-bob 2.4s ease-in-out infinite, aha-tip-glow 2.4s ease-in-out infinite;
          cursor: pointer;
        }
        .aha-tip-title {
          color: hsl(250, 50%, 10%);
        }
      `}</style>

      {/* Bottom Chat Bar (matches IndexC) */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-40 px-4 pb-4 pointer-events-none" dir="rtl">
        {/* Coach-mark tooltip above avatar */}
        {tipOpen && (
          <div className="relative pointer-events-auto mb-2 mr-1 inline-block">
            <button
              onClick={() => setChatOpen(true)}
              className="aha-tip-wrap block text-right w-full"
              aria-label="פתח צ'אט"
            >
              <div className="flex items-start gap-2 rounded-[18px] px-3.5 py-3 max-w-[300px]">
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-extrabold aha-tip-title mb-1">
                    👋 איזה כיף להכיר. טוב שהצטרפת!
                  </p>
                  <p className="text-[11.5px] leading-snug" style={{ color: "hsl(250, 30%, 30%)" }}>
                    האם ברצונך לחבר כמה נתונים ונראה כמה אנחנו שווים?
                  </p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setTipOpen(false); }}
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: "hsl(230, 25%, 95%)" }}
                  aria-label="סגור"
                >
                  <X className="h-3 w-3" style={{ color: "hsl(230, 15%, 40%)" }} />
                </button>
              </div>
            </button>
            {/* tail */}
            <span
              className="absolute -bottom-1 right-6 w-2.5 h-2.5 rotate-45"
              style={{
                background: "white",
                boxShadow: "2px 2px 0 0 hsla(262, 75%, 58%, 0.3)",
              }}
            />
          </div>
        )}

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

      {chatOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center" dir="rtl">
          <div className="absolute inset-0 bg-black/40" onClick={() => { if (showInsight) setInsuranceUpgraded(true); setChatOpen(false); }} />
          <div
            className="relative w-full max-w-[430px] bg-white rounded-t-3xl shadow-2xl flex flex-col"
            style={{ animation: "sheet-slide-up 0.45s cubic-bezier(0.22, 1, 0.36, 1) both", maxHeight: "92dvh" }}
          >
            <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
              <div className="w-10 h-1.5 rounded-full" style={{ background: "hsl(230, 15%, 88%)" }} />
            </div>

            {/* Header bar with optional back */}
            <div className="px-5 pt-1 pb-2 flex items-center justify-between flex-shrink-0">
              {chatStage !== "intro" ? (
                <button
                  onClick={() => { setChatStage("intro"); setShowInsight(false); setCollectStep(1); setConsents({ pension: false, copies: false, harBituach: false, creditAssets: false, creditLiab: false }); }}
                  className="flex items-center gap-1 text-[11.5px] font-medium"
                  style={{ color: "hsl(230, 15%, 45%)" }}
                >
                  <ArrowLeft className="h-3.5 w-3.5 rotate-180" /> חזרה
                </button>
              ) : <span />}
              <button
                onClick={() => { if (showInsight) setInsuranceUpgraded(true); setChatOpen(false); }}
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: "hsl(230, 25%, 95%)" }}
                aria-label="סגור"
              >
                <X className="h-3.5 w-3.5" style={{ color: "hsl(230, 15%, 45%)" }} />
              </button>
            </div>

            <div className="px-5 pb-6 overflow-y-auto">
              {/* Dana message */}
              <div className="flex items-end gap-2 mb-4">
                <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0" style={{ border: "2px solid hsl(262, 75%, 55%)" }}>
                  <img src={advisorImg} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-2xl rounded-br-md px-3.5 py-2.5 max-w-[85%]" style={{ background: "hsl(230, 30%, 97%)", border: "1px solid hsl(230, 20%, 92%)" }}>
                  {chatStage === "intro" && (
                    <>
                      <p className="text-[13px] leading-relaxed font-bold mb-1" style={{ color: "hsl(250, 40%, 15%)" }}>
                        {firstName}, רוצה התחלה חכמה? ✨
                      </p>
                      <p className="text-[11.5px] leading-relaxed" style={{ color: "hsl(250, 30%, 35%)" }}>
                        בלחיצה אחת על <b>הר הביטוח והמסלקה</b> אני מקבלת את כל התמונה הפיננסית שלך — בלי שתמלא כלום.
                      </p>
                    </>
                  )}
                  {chatStage === "harBituach" && collectStep <= 4 && (
                    <>
                      <p className="text-[13px] leading-relaxed font-bold mb-1" style={{ color: "hsl(250, 40%, 15%)" }}>
                        {collectStep === 1 && "בוא נתחיל — קודם תעודת זהות 🪪"}
                        {collectStep === 2 && "מעולה! עכשיו אישור למסלקת הפנסיה"}
                        {collectStep === 3 && "נשאר מעט — אישור להעתקי הפוליסות"}
                        {collectStep === 4 && "אחרון! אישור להר הביטוח"}
                      </p>
                      <p className="text-[11.5px] leading-relaxed" style={{ color: "hsl(250, 30%, 35%)" }}>
                        {collectStep === 1 && "פרטים אלה דרושים כדי שאוכל לפנות בשמך לרשויות."}
                        {collectStep === 2 && "המסלקה אוספת עבורך מידע על כל קרנות הפנסיה, גמל והשתלמות."}
                        {collectStep === 3 && "כך אקבל את הפוליסות הביטוחיות שלך ישירות מהיצרנים."}
                        {collectStep === 4 && "הר הביטוח הוא המאגר המרכזי של רשות שוק ההון."}
                      </p>
                    </>
                  )}
                  {chatStage === "harBituach" && (collectStep === 5 || collectStep === 9) && (
                    <>
                      <p className="text-[13px] leading-relaxed font-bold mb-1" style={{ color: "hsl(250, 40%, 15%)" }}>
                        אוספת את הנתונים שלך... ⚡
                      </p>
                      <p className="text-[11.5px] leading-relaxed" style={{ color: "hsl(250, 30%, 35%)" }}>
                        רגע אחד, מתחברת למקורות.
                      </p>
                    </>
                  )}
                  {chatStage === "harBituach" && collectStep === 6 && !showInsight && (
                    <>
                      <p className="text-[13px] leading-relaxed font-bold mb-1" style={{ color: "hsl(250, 40%, 15%)" }}>
                        סיימנו! הנה מה שמצאתי 📊
                      </p>
                      <p className="text-[11.5px] leading-relaxed" style={{ color: "hsl(250, 30%, 35%)" }}>
                        הר הביטוח כבר מחובר. המסלקה תהיה זמינה תוך שעתיים.
                      </p>
                    </>
                  )}
                  {chatStage === "harBituach" && collectStep === 6 && showInsight && (
                    <>
                      <p className="text-[13px] leading-relaxed font-bold mb-1" style={{ color: "hsl(250, 40%, 15%)" }}>
                        וואו, מצאתי משהו מיד! 🎯
                      </p>
                      <p className="text-[11.5px] leading-relaxed" style={{ color: "hsl(250, 30%, 35%)" }}>
                        זיהיתי <b>ביטוח חיים כפול</b> — אתה משלם פעמיים על אותו כיסוי.
                      </p>
                    </>
                  )}
                  {chatStage === "harBituach" && (collectStep === 7 || collectStep === 8) && (
                    <>
                      <p className="text-[13px] leading-relaxed font-bold mb-1" style={{ color: "hsl(250, 40%, 15%)" }}>
                        {collectStep === 7 ? "עכשיו דוח אשראי — בשביל הנכסים 💎" : "אחרון! דוח אשראי להתחייבויות 🏦"}
                      </p>
                      <p className="text-[11.5px] leading-relaxed" style={{ color: "hsl(250, 30%, 35%)" }}>
                        {collectStep === 7
                          ? "בעזרת דוח האשראי אוכל לראות את כל הנכסים שלך — חשבונות, פיקדונות והשקעות."
                          : "אותו דוח חושף גם את ההלוואות, המשכנתא והאשראי הפתוח שלך."}
                      </p>
                    </>
                  )}
                  {chatStage === "harBituach" && collectStep === 10 && (
                    <>
                      <p className="text-[13px] leading-relaxed font-bold mb-1" style={{ color: "hsl(250, 40%, 15%)" }}>
                        כמעט סיימנו! 🎉
                      </p>
                      <p className="text-[11.5px] leading-relaxed" style={{ color: "hsl(250, 30%, 35%)" }}>
                        חיברנו 85% מהנתונים שלך. נשארו רק שני דברים קטנים.
                      </p>
                    </>
                  )}
                  {chatStage === "more" && (
                    <>
                      <p className="text-[13px] leading-relaxed font-bold mb-1" style={{ color: "hsl(250, 40%, 15%)" }}>
                        איזה מקור תרצה לחבר?
                      </p>
                      <p className="text-[11.5px] leading-relaxed" style={{ color: "hsl(250, 30%, 35%)" }}>
                        בחר ואני אצרף את הנתונים אוטומטית.
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* === STAGE: INTRO === */}
              {chatStage === "intro" && (
                <div className="space-y-2.5">
                  {/* Primary CTA — clean white card with purple accent */}
                  <button
                    onClick={() => setChatStage("harBituach")}
                    className="w-full text-start rounded-2xl p-4 transition-transform active:scale-[0.98]"
                    style={{
                      background: "white",
                      border: "1.5px solid hsl(262, 60%, 88%)",
                      boxShadow: "0 8px 22px -10px hsla(262, 60%, 45%, 0.28)",
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{ background: palettes.insurance.gradient }}
                      >
                        <Zap className="h-5 w-5 text-white" />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-[14px] font-extrabold" style={{ color: "hsl(250, 40%, 15%)" }}>
                            הר ביטוח + מסלקה
                          </span>
                          <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold" style={{ background: "hsl(262, 75%, 95%)", color: "hsl(262, 75%, 45%)" }}>
                            מומלץ
                          </span>
                        </span>
                        <span className="block text-[11px] leading-snug" style={{ color: "hsl(250, 22%, 50%)" }}>
                          חיבור אחד · כל הנתונים שלך
                        </span>
                      </span>
                    </div>

                    <div
                      className="w-full rounded-full py-3 text-center text-[14px] font-extrabold text-white flex items-center justify-center gap-1.5"
                      style={{
                        background: "hsl(250, 40%, 12%)",
                        boxShadow: "0 8px 18px -8px hsla(250, 40%, 12%, 0.55)",
                      }}
                    >
                      בוא נתחבר
                      <ArrowLeft className="h-4 w-4" />
                    </div>
                  </button>

                  {/* Secondary */}
                  <button
                    onClick={() => setChatStage("more")}
                    className="w-full rounded-2xl py-2.5 text-[12.5px] font-semibold flex items-center justify-center gap-1.5"
                    style={{
                      background: "white",
                      border: "1px solid hsl(230, 20%, 88%)",
                      color: "hsl(250, 35%, 30%)",
                    }}
                  >
                    <Plus className="h-3.5 w-3.5" />
                    התחלה בחיבורים נוספים
                  </button>
                </div>
              )}

              {/* === STAGE: HAR BITUACH — multi-step collection === */}
              {chatStage === "harBituach" && (
                <div className="space-y-3">
                  {/* Progress bar (steps 1-4 only) */}
                  {collectStep <= 4 && (
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "hsl(230, 20%, 93%)" }}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(collectStep / 4) * 100}%`,
                            background: "linear-gradient(90deg, hsl(262, 75%, 55%), hsl(220, 85%, 55%))",
                            transition: "width 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                          }}
                        />
                      </div>
                      <span className="text-[10.5px] font-bold whitespace-nowrap" style={{ color: "hsl(250, 40%, 20%)" }}>
                        שלב {collectStep}/4
                      </span>
                    </div>
                  )}

                  {/* === STEP 1: ID details === */}
                  {collectStep === 1 && (
                    <div className="rounded-2xl p-4" style={{ background: "white", border: "1px solid hsl(230, 20%, 90%)" }}>
                      <p className="text-center text-[15px] font-extrabold mb-1" style={{ color: "hsl(250, 40%, 15%)" }}>פרטי תעודת זהות</p>
                      <p className="text-center text-[11px] mb-4" style={{ color: "hsl(230, 15%, 50%)" }}>נדרשים לאימות הזהות שלך</p>

                      <label className="block text-[11px] font-bold text-right mb-1" style={{ color: "hsl(250, 40%, 20%)" }}>מספר תעודת זהות</label>
                      <input
                        dir="rtl"
                        type="text"
                        inputMode="numeric"
                        maxLength={9}
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value.replace(/\D/g, ""))}
                        placeholder="123456789"
                        className="w-full text-right text-[15px] font-semibold tracking-wide rounded-xl py-3 px-3 mb-3 focus:outline-none"
                        style={{ border: "1.5px solid hsl(230, 20%, 88%)", color: "hsl(250, 40%, 15%)", background: "hsl(230, 30%, 98%)" }}
                      />

                      <label className="block text-[11px] font-bold text-right mb-1" style={{ color: "hsl(250, 40%, 20%)" }}>תאריך הוצאת תעודת זהות</label>
                      <input
                        dir="rtl"
                        type="text"
                        inputMode="numeric"
                        value={idDate}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/\D/g, "");
                          let formatted = raw;
                          if (raw.length >= 2) formatted = `${raw.slice(0, 2)}/${raw.slice(2)}`;
                          if (raw.length >= 4) formatted = `${raw.slice(0, 2)}/${raw.slice(2, 4)}/${raw.slice(4, 8)}`;
                          setIdDate(formatted.slice(0, 10));
                        }}
                        placeholder="dd/mm/yyyy"
                        className="w-full text-right text-[15px] font-semibold tracking-wide rounded-xl py-3 px-3 mb-3 focus:outline-none"
                        style={{ border: "1.5px solid hsl(230, 20%, 88%)", color: "hsl(250, 40%, 15%)", background: "hsl(230, 30%, 98%)" }}
                      />

                      <div className="flex items-center justify-between gap-2 mt-2">
                        <span className="text-[10.5px]" style={{ color: "hsl(230, 15%, 55%)" }}>או מלא אוטומטית מצילום</span>
                        <button
                          onClick={() => setUsePhoto(!usePhoto)}
                          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-all active:scale-[0.97]"
                          style={{
                            border: `1px dashed ${usePhoto ? "hsl(262, 75%, 55%)" : "hsl(262, 50%, 70%)"}`,
                            background: usePhoto ? "hsl(262, 75%, 96%)" : "transparent",
                          }}
                        >
                          {usePhoto ? <Check className="h-3.5 w-3.5" strokeWidth={3} style={{ color: "hsl(262, 75%, 45%)" }} /> : <Camera className="h-3.5 w-3.5" style={{ color: "hsl(262, 75%, 45%)" }} />}
                          <span className="text-[11.5px] font-bold" style={{ color: "hsl(262, 75%, 40%)" }}>צלם תעודה</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* === STEPS 2-4: consent annexes === */}
                  {collectStep === 2 && (
                    <ConsentAnnex
                      icon={<ShieldHalf className="h-6 w-6" style={{ color: "hsl(262, 75%, 55%)" }} />}
                      iconBg="hsl(262, 75%, 94%)"
                      title="נספח א' - מסלקת הפנסיה"
                      subtitle="יציאה בשמך להבאת מידע פנסיוני"
                      bullets={[
                        "יציאה בשמך למסלקת הפנסיה המרכזית",
                        "קבלת מידע על כל קרנות פנסיה, קופות גמל והשתלמות",
                        "ניתוח מלא של החיסכון הפנסיוני שלך",
                      ]}
                      consentText="יציאה בשמי למסלקת הפנסיה להבאת מידעים"
                      checked={consents.pension}
                      onToggle={() => setConsents((c) => ({ ...c, pension: !c.pension }))}
                    />
                  )}
                  {collectStep === 3 && (
                    <ConsentAnnex
                      icon={<FileText className="h-6 w-6" style={{ color: "hsl(220, 85%, 55%)" }} />}
                      iconBg="hsl(220, 85%, 94%)"
                      title="נספח ב' - העתקי פוליסות"
                      subtitle="קבלת העתקי פוליסות מהיצרנים"
                      bullets={[
                        "אישור לקבלת העתקי פוליסות ביטוח בשמך",
                        "מידע ישירות מחברות הביטוח והיצרנים",
                        "נתונים מפורטים על כל הכיסויים הביטוחיים שלך",
                      ]}
                      consentText="קבלת העתקי פוליסות מהיצרנים בשמי"
                      checked={consents.copies}
                      onToggle={() => setConsents((c) => ({ ...c, copies: !c.copies }))}
                    />
                  )}
                  {collectStep === 4 && (
                    <ConsentAnnex
                      icon={<Building2 className="h-6 w-6" style={{ color: "hsl(220, 85%, 55%)" }} />}
                      iconBg="hsl(220, 85%, 94%)"
                      title="נספח ה' - הר הביטוח"
                      subtitle="יציאה בשמך להבאת מידע ביטוחי"
                      bullets={[
                        "יציאה בשמך להר הביטוח המרכזי",
                        "קבלת מידע על כל פוליסות הביטוח שלך",
                        "עדכונים אוטומטיים מהמאגר המרכזי",
                      ]}
                      consentText="יציאה בשמי להר הביטוח להבאת מידעים"
                      checked={consents.harBituach}
                      onToggle={() => setConsents((c) => ({ ...c, harBituach: !c.harBituach }))}
                    />
                  )}

                  {/* Continue button (steps 1-4) */}
                  {collectStep <= 4 && (() => {
                    const stepValid =
                      collectStep === 1 ? (usePhoto || (idNumber.length === 9 && idDate.trim().length >= 8)) :
                      collectStep === 2 ? consents.pension :
                      collectStep === 3 ? consents.copies :
                      consents.harBituach;
                    return (
                      <button
                        onClick={() => setCollectStep((s) => (s === 4 ? 5 : (s + 1) as 1 | 2 | 3 | 4))}
                        disabled={!stepValid}
                        className="w-full rounded-full py-3.5 text-[14px] font-extrabold text-white transition-all active:scale-[0.98]"
                        style={{
                          background: stepValid ? "hsl(0, 0%, 8%)" : "hsl(230, 18%, 80%)",
                          boxShadow: stepValid ? "0 10px 24px -10px hsla(0, 0%, 0%, 0.5)" : "none",
                          opacity: stepValid ? 1 : 0.5,
                        }}
                      >
                        {collectStep === 4 ? "סיים והתחל איסוף" : "המשך"}
                      </button>
                    );
                  })()}

                  {/* === STEP 5/9: chat skeleton loader === */}
                  {(collectStep === 5 || collectStep === 9) && (
                    <div className="space-y-3" dir="rtl">
                      {/* Dana avatar + bubble skeleton */}
                      <div className="flex items-end gap-2">
                        <div className="w-9 h-9 rounded-full flex-shrink-0 chat-shimmer" />
                        <div className="flex-1 h-16 rounded-2xl rounded-br-md chat-shimmer" style={{ maxWidth: "85%" }} />
                      </div>

                      {/* Card skeleton */}
                      <div className="w-full h-20 rounded-2xl chat-shimmer" />

                      {/* status text */}
                      <p className="text-[12px] text-center font-medium pt-1" style={{ color: "hsl(230, 15%, 50%)" }}>
                        {collectStep === 5 && collectingMsg === 0 && "מתחברת לרשות שוק ההון..."}
                        {collectStep === 5 && collectingMsg === 1 && "מאמתת את הזהות שלך..."}
                        {collectStep === 5 && collectingMsg === 2 && "מושכת את הפוליסות שלך..."}
                        {collectStep === 9 && collectingMsg === 0 && "מושכת את דוח האשראי שלך..."}
                        {collectStep === 9 && collectingMsg === 1 && "מזהה נכסים והתחייבויות..."}
                        {collectStep === 9 && collectingMsg === 2 && "מסכמת את התמונה הפיננסית..."}
                      </p>
                      <style>{`
                        @keyframes chat-shimmer-anim {
                          0% { background-position: -200% 0; }
                          100% { background-position: 200% 0; }
                        }
                        .chat-shimmer {
                          background: linear-gradient(90deg,
                            hsl(230, 25%, 93%) 0%,
                            hsl(230, 20%, 98%) 50%,
                            hsl(230, 25%, 93%) 100%);
                          background-size: 200% 100%;
                          animation: chat-shimmer-anim 1.8s ease-in-out infinite;
                        }
                      `}</style>
                    </div>
                  )}

                  {/* === STEPS 7-8: credit report consents === */}
                  {collectStep === 7 && (
                    <ConsentAnnex
                      icon={<TrendingUp className="h-6 w-6" style={{ color: "hsl(178, 70%, 32%)" }} />}
                      iconBg="hsl(176, 55%, 92%)"
                      title="אישור לדוח אשראי - נכסים"
                      subtitle="לניתוח פיננסי מלא נצטרך גישה לדוח האשראי שלך"
                      bullets={[
                        "זיהוי כל החשבונות והפיקדונות שלך",
                        "מיפוי השקעות וקרנות פעילות",
                        "ניהול אופטימלי של הנכסים",
                      ]}
                      consentText="המידע מוצפן ומאובטח"
                      checked={consents.creditAssets}
                      onToggle={() => setConsents((c) => ({ ...c, creditAssets: !c.creditAssets }))}
                    />
                  )}
                  {collectStep === 8 && (
                    <ConsentAnnex
                      icon={<TrendingDown className="h-6 w-6" style={{ color: "hsl(220, 85%, 55%)" }} />}
                      iconBg="hsl(220, 85%, 94%)"
                      title="אישור לדוח אשראי - התחייבויות"
                      subtitle="כדי להציג מצב מלא נצטרך לראות גם את ההתחייבויות"
                      bullets={[
                        "זיהוי הלוואות ומשכנתאות פעילות",
                        "אסטרטגיות לשיפור ציון אשראי",
                        "ניהול אופטימלי של מסגרות",
                      ]}
                      consentText="המידע מוצפן ומאובטח"
                      checked={consents.creditLiab}
                      onToggle={() => setConsents((c) => ({ ...c, creditLiab: !c.creditLiab }))}
                    />
                  )}

                  {/* Continue button (steps 7-8) */}
                  {(collectStep === 7 || collectStep === 8) && (() => {
                    const stepValid = collectStep === 7 ? consents.creditAssets : consents.creditLiab;
                    return (
                      <button
                        onClick={() => setCollectStep((s) => (s === 7 ? 8 : 9))}
                        disabled={!stepValid}
                        className="w-full rounded-full py-3.5 text-[14px] font-extrabold text-white transition-all active:scale-[0.98]"
                        style={{
                          background: stepValid ? "hsl(0, 0%, 8%)" : "hsl(230, 18%, 80%)",
                          boxShadow: stepValid ? "0 10px 24px -10px hsla(0, 0%, 0%, 0.5)" : "none",
                          opacity: stepValid ? 1 : 0.5,
                        }}
                      >
                        {collectStep === 8 ? "סיים והתחל איסוף" : "המשך"}
                      </button>
                    );
                  })()}

                  {/* === STEP 10: wrap-up === */}
                  {collectStep === 10 && (
                    <div className="rounded-2xl p-4" style={{ background: "white", border: "1px solid hsl(230, 20%, 90%)", boxShadow: "0 4px 14px hsla(250, 30%, 25%, 0.05)" }}>
                      <ul className="space-y-3 mb-4">
                        {[
                          "ביטוח, פנסיה והשקעות מחוברים",
                          "דוח אשראי לנכסים והתחייבויות התקבל",
                          "המידע יתעדכן אוטומטית כל חודש",
                        ].map((t, i) => (
                          <li key={i} className="flex items-center gap-2.5">
                            <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "hsl(150, 65%, 45%)" }}>
                              <Check className="h-3 w-3 text-white" strokeWidth={3.5} />
                            </span>
                            <span className="text-[12.5px] leading-snug text-end flex-1" style={{ color: "hsl(250, 35%, 22%)" }}>
                              {t}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => { setHomeAlmostDone(true); setChatOpen(false); }}
                        className="w-full rounded-full py-3 text-[13px] font-extrabold text-white flex items-center justify-center gap-1.5 transition-transform active:scale-[0.98]"
                        style={{
                          background: "hsl(250, 40%, 12%)",
                          boxShadow: "0 8px 20px -4px hsla(250, 40%, 12%, 0.45)",
                        }}
                      >
                        חזרה לדף הבית
                      </button>
                    </div>
                  )}

                  {/* === STEP 6: result + insight === */}
                  {collectStep === 6 && (
                    <>
                      {/* Insurance — connected, white card with purple icon (FIRST) */}
                      <button
                        onClick={() => { setChatOpen(false); navigate("/c/insurance"); }}
                        className="w-full text-start rounded-2xl p-4 flex items-center gap-3 transition-transform active:scale-[0.98] relative overflow-hidden"
                        style={{
                          background: "white",
                          border: "1px solid hsl(230, 20%, 90%)",
                          opacity: 0,
                          animation: "aha-item-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) 0.05s forwards",
                        }}
                      >
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-extrabold flex items-center gap-1" style={{ background: "hsl(150, 60%, 95%)", color: "hsl(150, 70%, 28%)", border: "1px solid hsl(150, 50%, 85%)" }}>
                          <Check className="h-2.5 w-2.5" strokeWidth={4} /> הכל תקין
                        </span>
                        <span className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 relative" style={{ background: palettes.insurance.gradient }}>
                          <ShieldCheck className="h-5 w-5 text-white" />
                          <span
                            className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
                            style={{ background: "hsl(150, 65%, 45%)", border: "2px solid white" }}
                          >
                            <Check className="h-2 w-2 text-white" strokeWidth={4} />
                          </span>
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-[14px] font-extrabold mb-0.5" style={{ color: "hsl(250, 40%, 15%)" }}>ביטוח</span>
                          <span className="block text-[11px]" style={{ color: "hsl(250, 22%, 50%)" }}>7 פוליסות מחוברות · עדכון אוטומטי</span>
                        </span>
                      </button>

                      {/* Pension clearing house — pending */}
                      <button
                        className="w-full text-start rounded-2xl p-4 flex items-center gap-3 relative overflow-hidden"
                        style={{
                          background: "white",
                          border: "1px solid hsl(230, 20%, 90%)",
                          opacity: 0,
                          animation: "aha-item-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) 0.25s forwards",
                        }}
                      >
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-extrabold flex items-center gap-1" style={{ background: "hsl(45, 95%, 92%)", color: "hsl(35, 85%, 35%)", border: "1px solid hsl(45, 90%, 75%)" }}>
                          <Clock className="h-2.5 w-2.5" strokeWidth={3} /> שעתיים
                        </span>
                        <span className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 relative" style={{ background: "hsl(45, 90%, 95%)" }}>
                          <Building2 className="h-5 w-5" style={{ color: "hsl(35, 85%, 40%)" }} />
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-[14px] font-extrabold mb-0.5" style={{ color: "hsl(250, 40%, 15%)" }}>מסלקת הפנסיה</span>
                          <span className="block text-[11px]" style={{ color: "hsl(35, 60%, 40%)" }}>הנתונים יגיעו בשעתיים הקרובות</span>
                        </span>
                      </button>

                      {/* Subtle bullets — after the cards */}
                      <ul className="space-y-2 px-1 pt-1" dir="rtl">
                        {[
                          "קיבלנו אישור לגשת להר הביטוח ומסלקה",
                          "נתוני הביטוח שלך מוכנים לצפייה",
                          "המידע מעודכן באופן אוטומטי כל חודש",
                        ].map((t, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-right"
                            style={{
                              opacity: 0,
                              animation: `aha-item-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) ${0.5 + i * 0.12}s forwards`,
                            }}
                          >
                            <span
                              className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ background: "hsl(150, 50%, 92%)" }}
                            >
                              <Check className="h-2.5 w-2.5" strokeWidth={3.5} style={{ color: "hsl(150, 55%, 35%)" }} />
                            </span>
                            <span className="text-[11.5px] leading-snug flex-1 text-right" style={{ color: "hsl(230, 15%, 45%)" }}>
                              {t}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {showInsight && (
                        <div
                          ref={insightRef}
                          className="relative rounded-2xl p-4 overflow-hidden mt-2"
                          style={{
                            background: palettes.insurance.gradient,
                            boxShadow: palettes.insurance.shadow,
                            opacity: 0,
                            animation: "aha-item-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards",
                          }}
                        >
                          <span
                            className="absolute top-3 left-3 w-6 h-6 rounded-full flex items-center justify-center"
                            style={{ background: "hsla(0,0%,100%,0.25)" }}
                          >
                            <Check className="h-3 w-3 text-white" strokeWidth={3.5} />
                          </span>
                          <div
                            className="w-9 h-9 mb-3 rounded-full flex items-center justify-center"
                            style={{ background: "hsla(0,0%,100%,0.22)" }}
                          >
                            <ShieldCheck className="h-4 w-4 text-white" />
                          </div>
                          <p className="text-[11px] font-medium mb-1" style={{ color: "hsla(0,0%,100%,0.85)" }}>
                            ביטוח חיים כפול
                          </p>
                          <p className="font-extrabold text-lg mb-1 text-white">
                            חוסך ₪2,000/שנה
                          </p>
                          <p className="text-[11px] leading-snug mb-3" style={{ color: "hsla(0,0%,100%,0.85)" }}>
                            אתה משלם פעמיים על אותו כיסוי. אפשר לבטל אחד בקליק.
                          </p>
                          <button
                            onClick={() => { setInsuranceUpgraded(true); navigate("/aha2"); }}
                            className="w-full rounded-full py-2.5 text-[12px] font-extrabold flex items-center justify-center gap-1.5 transition-transform active:scale-[0.98] overflow-hidden relative"
                            style={{
                              background: "linear-gradient(110deg, hsl(220, 60%, 8%), hsl(250, 60%, 10%), hsl(220, 60%, 8%))",
                              backgroundSize: "250% 100%",
                              color: "white",
                              animation: "insight-cta-shimmer 4s linear infinite",
                              boxShadow: "0 6px 18px -6px hsla(0,0%,0%,0.5)",
                            }}
                          >
                            <span className="relative z-[1] flex items-center gap-1.5">
                              <span className="text-[14px] leading-none">⚡</span>
                              חסוך ₪2,000 בקליק
                            </span>
                          </button>
                        </div>
                      )}

                      {showInsight && (
                        <div className="flex justify-center mt-3">
                          <button
                            onClick={() => { setInsuranceUpgraded(true); navigate("/aha2"); }}
                            className="text-[12.5px] font-bold py-1.5 px-2 focus:outline-none"
                            style={{ color: "hsl(262, 75%, 50%)" }}
                          >
                            לתובנות נוספות ←
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* === STAGE: MORE === */}
              {chatStage === "more" && (
                <div className="grid grid-cols-1 gap-2.5">
                  {[
                    { label: "הוצאות", desc: "חיבור לחשבון בנק וכרטיסי אשראי", category: "liabilities" as const, route: "/c/liabilities" },
                    { label: "השקעות", desc: "תיקי השקעות, קרנות וני״ע", category: "assets" as const, route: "/c/assets" },
                    { label: "נדל״ן ונכסים", desc: "דירות, רכבים ונכסים נוספים", category: "assets" as const, route: "/c/assets" },
                  ].map((opt) => {
                    const p = palettes[opt.category];
                    return (
                      <button
                        key={opt.label}
                        onClick={() => { setChatOpen(false); navigate(opt.route); }}
                        className="w-full text-start rounded-2xl p-3 flex items-center gap-3 transition-transform active:scale-[0.98]"
                        style={{ background: "white", border: `1.5px solid ${p.solid}` }}
                      >
                        <span className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: p.gradient }}>
                          <Plus className="h-4 w-4 text-white" />
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-[13px] font-bold" style={{ color: "hsl(250, 40%, 15%)" }}>{opt.label}</span>
                          <span className="block text-[11px]" style={{ color: "hsl(230, 15%, 50%)" }}>{opt.desc}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ConsentAnnex = ({
  icon,
  iconBg,
  title,
  subtitle,
  bullets,
  consentText,
  checked,
  onToggle,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  subtitle: string;
  bullets: string[];
  consentText: string;
  checked: boolean;
  onToggle: () => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  return (
  <div dir="rtl" className="space-y-3">
    {/* Header — flat info */}
    <div className="flex items-center gap-3 px-1">
      <span
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: iconBg }}
      >
        {icon}
      </span>
      <div className="flex-1 min-w-0 text-right">
        <p className="text-[14.5px] font-extrabold leading-tight" style={{ color: "hsl(250, 40%, 15%)" }}>
          {title}
        </p>
        <p className="text-[11px] leading-tight mt-0.5" style={{ color: "hsl(230, 15%, 50%)" }}>
          {subtitle}
        </p>
      </div>
    </div>

    {/* Collapsible: details + full document */}
    <div className="rounded-2xl overflow-hidden" style={{ background: "hsl(230, 30%, 98%)" }}>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-3.5 py-2.5 focus:outline-none"
        aria-expanded={expanded}
      >
        <span className="text-[12px] font-bold" style={{ color: "hsl(250, 40%, 20%)" }}>
          מה כולל הנספח
        </span>
        <ChevronDown
          className="h-4 w-4 transition-transform duration-300"
          style={{
            color: "hsl(230, 15%, 45%)",
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>
      {expanded && (
        <div className="px-3.5 pb-3.5 pt-0">
          <ul className="space-y-1 mb-2.5">
            {bullets.map((b, i) => (
              <li
                key={i}
                className="text-[11.5px] leading-snug flex gap-1.5 text-right"
                style={{ color: "hsl(250, 25%, 35%)" }}
              >
                <span style={{ color: "hsl(262, 75%, 55%)" }}>•</span>
                <span className="flex-1">{b}</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="text-[11px] font-semibold inline-flex items-center gap-1 underline-offset-2 hover:underline"
            style={{ color: "hsl(220, 85%, 50%)" }}
          >
            קרא את המסמך המלא
            <ArrowLeft className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>

    {/* Action — the only real card */}
    <button
      onClick={onToggle}
      className="w-full rounded-2xl p-3.5 flex items-center gap-3 transition-all active:scale-[0.99]"
      style={{
        background: "white",
        border: `2px solid ${checked ? "hsl(262, 75%, 55%)" : "hsl(230, 20%, 88%)"}`,
        boxShadow: checked
          ? "0 6px 18px -8px hsla(262, 75%, 55%, 0.45)"
          : "0 4px 14px -10px hsla(250, 40%, 20%, 0.18)",
      }}
    >
      <span
        className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
        style={{
          background: checked ? "hsl(262, 75%, 55%)" : "white",
          border: `1.5px solid ${checked ? "hsl(262, 75%, 55%)" : "hsl(230, 20%, 75%)"}`,
        }}
      >
        {checked && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
      </span>
      <div className="flex-1 min-w-0 text-right">
        <p className="text-[13.5px] font-extrabold leading-tight" style={{ color: "hsl(250, 40%, 15%)" }}>
          אני מאשר/ת
        </p>
        <p className="text-[10.5px] leading-snug mt-0.5" style={{ color: "hsl(230, 15%, 50%)" }}>
          {consentText}
        </p>
      </div>
    </button>
  </div>
  );
};

const ResultRow = ({
  title,
  subtitle,
  badgeText,
  badgeBg,
  badgeColor,
  iconGradient,
  borderColor,
}: {
  title: string;
  subtitle: string;
  badgeText: string;
  badgeBg: string;
  badgeColor: string;
  iconGradient: string;
  borderColor: string;
}) => (
  <div
    className="rounded-2xl p-3 flex items-center gap-3"
    style={{
      background: "white",
      border: `1.5px solid ${borderColor}`,
      boxShadow: "0 6px 16px -4px hsla(230, 30%, 25%, 0.08)",
    }}
  >
    <span className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: iconGradient }}>
      <Check className="h-5 w-5 text-white" strokeWidth={3} />
    </span>
    <div className="flex-1 min-w-0">
      <p className="text-[13px] font-bold" style={{ color: "hsl(250, 40%, 15%)" }}>{title}</p>
      <p className="text-[10.5px] leading-tight mt-0.5" style={{ color: "hsl(230, 15%, 50%)" }}>{subtitle}</p>
    </div>
    <span className="text-[10.5px] font-bold flex-shrink-0 px-2 py-1 rounded-full whitespace-nowrap" style={{ color: badgeColor, background: badgeBg }}>
      {badgeText}
    </span>
  </div>
);

export default AhaDashboard;
