import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, ShieldCheck, Menu, Lock, Plus, PiggyBank, LineChart, Briefcase, Building2, Mic, Send, X, Sparkles, Check, Clock, Loader2, ArrowLeft, Zap } from "lucide-react";
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
  const [tipOpen, setTipOpen] = useState(true);
  const [chatStage, setChatStage] = useState<"intro" | "harBituach" | "more">("intro");
  const [insuranceStatus, setInsuranceStatus] = useState<"idle" | "connecting" | "done">("idle");
  const [clearingStatus, setClearingStatus] = useState<"idle" | "scheduled">("idle");
  const [showInsight, setShowInsight] = useState(false);

  // Reset chat state when sheet closes
  useEffect(() => {
    if (!chatOpen) {
      const t = setTimeout(() => {
        setChatStage("intro");
        setInsuranceStatus("idle");
        setClearingStatus("idle");
        setShowInsight(false);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [chatOpen]);

  // Simulate insurance connection
  useEffect(() => {
    if (insuranceStatus === "connecting") {
      const t = setTimeout(() => {
        setInsuranceStatus("done");
        setTimeout(() => setShowInsight(true), 500);
      }, 1800);
      return () => clearTimeout(t);
    }
  }, [insuranceStatus]);

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
      <div className="relative z-10 px-3 pt-6 pb-0">
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
      <div className="relative z-10 px-3 mb-6">
        <p className="text-sm font-medium mb-2" style={{ color: "hsl(250, 35%, 30%)" }}>
          הערכה ראשונית
        </p>
        <p
          className="font-extrabold tracking-tight text-4xl mb-1"
          style={{
            background:
              "linear-gradient(110deg, hsl(262, 75%, 45%) 0%, hsl(220, 85%, 50%) 50%, hsl(178, 70%, 38%) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          ₪450K - ₪1.2M
        </p>
        <p className="text-[12px]" style={{ color: "hsl(230, 15%, 55%)" }}>
          הערכה לפי הפרופיל שלך
        </p>
      </div>

      {/* Dana callout */}
      <div className="relative z-10 px-3 mb-6">
        <div
          className="rounded-2xl p-4 flex items-start gap-3"
          style={{
            background: "white",
            boxShadow: "0 4px 18px hsla(250, 30%, 25%, 0.08)",
            border: "1px solid hsl(230, 20%, 93%)",
          }}
        >
          <span className="relative flex-shrink-0">
            <span className="block w-12 h-12 rounded-full overflow-hidden" style={{ border: "2px solid hsl(262, 75%, 55%)" }}>
              <img src={advisorImg} alt="דנה" className="w-full h-full object-cover" />
            </span>
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] leading-relaxed" style={{ color: "hsl(250, 35%, 22%)" }}>
              היי {firstName} 👋 אנשים בפרופיל שלך בדרך כלל שווים בין{" "}
              <span className="font-bold">₪450K ל-₪1.2M</span>. רוצה לראות את השווי האמיתי שלך?
            </p>
          </div>
        </div>
      </div>

      {/* 3 hero locked cards */}
      <div className="relative z-10 px-3">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {heroCards.map((card) => {
            const p = palettes[card.category];
            return (
              <div
                key={card.label}
                className="relative rounded-2xl px-2.5 py-3 text-start flex flex-col"
                style={{
                  background: "hsla(0, 0%, 100%, 0.4)",
                  border: `1.5px dashed ${dashedBorder}`,
                  minHeight: "168px",
                }}
              >
                <span
                  className="absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: "hsl(230, 25%, 95%)" }}
                >
                  <Lock className="h-3 w-3" style={{ color: mutedIconColor }} />
                </span>

                <div
                  className="w-9 h-9 mb-3 rounded-full flex items-center justify-center"
                  style={{ background: "hsl(230, 25%, 95%)" }}
                >
                  <card.Icon className="h-4 w-4" style={{ color: mutedIconColor }} />
                </div>
                <p className="text-[11px] font-medium mb-1" style={{ color: "hsl(230, 18%, 40%)" }}>
                  {card.label}
                </p>
                <p className="font-extrabold text-lg mb-1" style={{ color: "hsl(230, 14%, 55%)" }}>
                  —
                </p>
                <p className="text-[9.5px] leading-tight mb-2" style={{ color: "hsl(230, 14%, 50%)" }}>
                  הערכה: {card.estimate}
                </p>
                <button
                  onClick={() => navigate(card.route)}
                  className="mt-auto w-full rounded-full py-1.5 text-[10px] font-semibold flex items-center justify-center gap-1 text-white transition-transform active:scale-[0.97]"
                  style={{
                    background: p.gradient,
                    boxShadow: p.shadow,
                  }}
                >
                  <Plus className="h-3 w-3" />
                  חיבור לנתונים
                </button>
              </div>
            );
          })}
        </div>

        {/* Financial Center */}
        <h2 className="text-sm font-bold mb-3" style={{ color: "hsl(250, 40%, 20%)" }}>
          מרכז פיננסי
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {centerCards.map((card) => {
            const p = palettes[card.category];
            return (
              <div
                key={card.label}
                className="relative rounded-2xl p-3 text-start flex flex-col"
                style={{
                  background: "white",
                  border: "1px solid hsl(230, 20%, 92%)",
                  boxShadow: "0 2px 10px hsla(250, 30%, 25%, 0.04)",
                  minHeight: "138px",
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
          background: linear-gradient(135deg, hsl(262, 75%, 50%), hsl(220, 85%, 55%), hsl(178, 70%, 45%));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
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
                    איזה כיף להכיר. טוב שהצטרפת!
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
          <div className="absolute inset-0 bg-black/40" onClick={() => setChatOpen(false)} />
          <div
            className="relative w-full max-w-[430px] bg-white rounded-t-3xl shadow-2xl flex flex-col"
            style={{ animation: "sheet-slide-up 0.45s cubic-bezier(0.22, 1, 0.36, 1) both" }}
          >
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1.5 rounded-full" style={{ background: "hsl(230, 15%, 88%)" }} />
            </div>
            <div className="px-5 pt-2 pb-6">
              <div className="flex items-end gap-2 mb-4">
                <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0" style={{ border: "2px solid hsl(262, 75%, 55%)" }}>
                  <img src={advisorImg} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-2xl rounded-br-md px-3.5 py-2.5 max-w-[85%]" style={{ background: "hsl(230, 30%, 97%)", border: "1px solid hsl(230, 20%, 92%)" }}>
                  <p className="text-[13px] leading-relaxed font-semibold mb-1" style={{ color: "hsl(250, 40%, 15%)" }}>
                    מה תרצה לחבר תחילה?
                  </p>
                  <p className="text-[11.5px] leading-relaxed" style={{ color: "hsl(250, 30%, 35%)" }}>
                    אפשר להתחיל עם הר הביטוח ומסלקת אשראי, או עם הוצאות והשקעות.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {[
                  { label: "הר הביטוח ומסלקת אשראי", desc: "חיבור מהיר לכל הפוליסות והאשראי", category: "insurance" as const, route: "/c/insurance" },
                  { label: "הוצאות", desc: "חיבור לחשבון בנק וכרטיסי אשראי", category: "liabilities" as const, route: "/c/liabilities" },
                  { label: "השקעות", desc: "חיבור לתיקי השקעות וקרנות", category: "assets" as const, route: "/c/assets" },
                ].map((opt) => {
                  const p = palettes[opt.category];
                  return (
                    <button
                      key={opt.label}
                      onClick={() => { setChatOpen(false); navigate(opt.route); }}
                      className="w-full text-start rounded-2xl p-3 flex items-center gap-3 transition-transform active:scale-[0.98]"
                      style={{ background: "white", border: `1.5px solid ${p.solid}`, boxShadow: p.shadow }}
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

              <button
                onClick={() => setChatOpen(false)}
                className="w-full mt-4 text-[12px] font-medium py-2"
                style={{ color: "hsl(230, 15%, 50%)" }}
              >
                אולי מאוחר יותר
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AhaDashboard;
