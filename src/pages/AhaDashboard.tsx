import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { TrendingUp, TrendingDown, ShieldCheck, Menu, Lock, Plus, PiggyBank, LineChart, Briefcase, Building2, Mic, Send, X, Sparkles, Check, Clock, Loader2, ArrowLeft, Zap, Camera, FileText, ShieldHalf } from "lucide-react";
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
  const [tipOpen, setTipOpen] = useState(true);
  const [chatStage, setChatStage] = useState<"intro" | "harBituach" | "more">("intro");
  const [showInsight, setShowInsight] = useState(false);

  // Multi-step collection flow (1..4 = steps, 5 = collecting, 6 = result)
  const [collectStep, setCollectStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [idNumber, setIdNumber] = useState("");
  const [idDate, setIdDate] = useState("");
  const [usePhoto, setUsePhoto] = useState(false);
  const [consents, setConsents] = useState({ pension: false, copies: false, harBituach: false });
  const [collectingMsg, setCollectingMsg] = useState(0);
  const insightRef = useRef<HTMLDivElement | null>(null);

  // Reset chat state when sheet closes
  useEffect(() => {
    if (!chatOpen) {
      const t = setTimeout(() => {
        setChatStage("intro");
        setShowInsight(false);
        setCollectStep(1);
        setIdNumber("");
        setIdDate("");
        setUsePhoto(false);
        setConsents({ pension: false, copies: false, harBituach: false });
        setCollectingMsg(0);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [chatOpen]);

  // Collecting animation: cycle messages then advance to result
  useEffect(() => {
    if (collectStep !== 5) return;
    setCollectingMsg(0);
    const t1 = setTimeout(() => setCollectingMsg(1), 600);
    const t2 = setTimeout(() => setCollectingMsg(2), 1200);
    const t3 = setTimeout(() => {
      setCollectStep(6);
      setTimeout(() => setShowInsight(true), 450);
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
            style={{ animation: "sheet-slide-up 0.45s cubic-bezier(0.22, 1, 0.36, 1) both", maxHeight: "92dvh" }}
          >
            <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
              <div className="w-10 h-1.5 rounded-full" style={{ background: "hsl(230, 15%, 88%)" }} />
            </div>

            {/* Header bar with optional back */}
            <div className="px-5 pt-1 pb-2 flex items-center justify-between flex-shrink-0">
              {chatStage !== "intro" ? (
                <button
                  onClick={() => { setChatStage("intro"); setShowInsight(false); setCollectStep(1); setConsents({ pension: false, copies: false, harBituach: false }); }}
                  className="flex items-center gap-1 text-[11.5px] font-medium"
                  style={{ color: "hsl(230, 15%, 45%)" }}
                >
                  <ArrowLeft className="h-3.5 w-3.5 rotate-180" /> חזרה
                </button>
              ) : <span />}
              <button
                onClick={() => setChatOpen(false)}
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
                  {chatStage === "harBituach" && collectStep === 5 && (
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
                  {chatStage === "harBituach" && showInsight && (
                    <>
                      <p className="text-[13px] leading-relaxed font-bold mb-1" style={{ color: "hsl(250, 40%, 15%)" }}>
                        וואו, מצאתי משהו מיד! 🎯
                      </p>
                      <p className="text-[11.5px] leading-relaxed" style={{ color: "hsl(250, 30%, 35%)" }}>
                        זיהיתי <b>ביטוח חיים כפול</b> — אתה משלם פעמיים על אותו כיסוי.
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
                  {/* Primary CTA — large, gradient */}
                  <button
                    onClick={() => setChatStage("harBituach")}
                    className="w-full text-start rounded-2xl p-4 flex items-center gap-3 transition-transform active:scale-[0.98] relative overflow-hidden"
                    style={{
                      background: palettes.insurance.gradient,
                      boxShadow: "0 12px 28px -8px hsla(262, 72%, 50%, 0.55)",
                    }}
                  >
                    <span className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ background: "hsla(0,0%,100%,0.25)", color: "white" }}>
                      <Sparkles className="h-2.5 w-2.5" /> מומלץ
                    </span>
                    <span className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "hsla(0,0%,100%,0.22)" }}>
                      <Zap className="h-5 w-5 text-white" />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-[14px] font-extrabold text-white mb-0.5">הר ביטוח + מסלקה</span>
                      <span className="block text-[11px]" style={{ color: "hsla(0,0%,100%,0.85)" }}>חיבור אחד · כל הנתונים שלך · התובנה הראשונה תוך דקה</span>
                    </span>
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

                      <label className="block text-[11px] font-bold text-end mb-1" style={{ color: "hsl(250, 40%, 20%)" }}>מספר תעודת זהות</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={9}
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value.replace(/\D/g, ""))}
                        placeholder="123456789"
                        className="w-full text-center text-[15px] font-bold tracking-widest rounded-xl py-3 mb-3 focus:outline-none"
                        style={{ border: "1.5px solid hsl(230, 20%, 88%)", color: "hsl(250, 40%, 15%)", background: "hsl(230, 30%, 98%)" }}
                      />

                      <label className="block text-[11px] font-bold text-end mb-1" style={{ color: "hsl(250, 40%, 20%)" }}>תאריך הוצאת תעודת זהות</label>
                      <input
                        type="text"
                        value={idDate}
                        onChange={(e) => setIdDate(e.target.value)}
                        placeholder="dd/mm/yyyy"
                        className="w-full text-end text-[14px] rounded-xl py-3 px-3 mb-3 focus:outline-none"
                        style={{ border: "1.5px solid hsl(230, 20%, 88%)", color: "hsl(250, 40%, 15%)", background: "hsl(230, 30%, 98%)" }}
                      />

                      <div className="flex items-center gap-2 my-3">
                        <div className="flex-1 h-px" style={{ background: "hsl(230, 20%, 88%)" }} />
                        <span className="text-[10.5px] font-medium" style={{ color: "hsl(230, 15%, 55%)" }}>או</span>
                        <div className="flex-1 h-px" style={{ background: "hsl(230, 20%, 88%)" }} />
                      </div>

                      <button
                        onClick={() => setUsePhoto(!usePhoto)}
                        className="w-full rounded-2xl py-3 flex flex-col items-center gap-1.5 transition-all active:scale-[0.99]"
                        style={{
                          border: `1.5px dashed ${usePhoto ? "hsl(262, 75%, 55%)" : "hsl(262, 50%, 75%)"}`,
                          background: usePhoto ? "hsl(262, 75%, 96%)" : "transparent",
                        }}
                      >
                        <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "hsl(262, 75%, 92%)" }}>
                          {usePhoto ? <Check className="h-4 w-4" strokeWidth={3} style={{ color: "hsl(262, 75%, 45%)" }} /> : <Camera className="h-4 w-4" style={{ color: "hsl(262, 75%, 45%)" }} />}
                        </span>
                        <span className="text-[12.5px] font-bold" style={{ color: "hsl(250, 40%, 15%)" }}>צלם תעודת זהות</span>
                        <span className="text-[10.5px]" style={{ color: "hsl(230, 15%, 50%)" }}>נמלא את הפרטים אוטומטית</span>
                      </button>
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
                        className="w-full rounded-full py-3 text-[13px] font-extrabold text-white transition-all active:scale-[0.98]"
                        style={{
                          background: stepValid
                            ? "linear-gradient(135deg, hsl(262, 75%, 52%), hsl(220, 85%, 55%))"
                            : "hsl(230, 18%, 80%)",
                          boxShadow: stepValid ? "0 8px 20px -6px hsla(262, 72%, 50%, 0.5)" : "none",
                          opacity: stepValid ? 1 : 0.7,
                        }}
                      >
                        {collectStep === 4 ? "סיים והתחל איסוף" : "המשך"}
                      </button>
                    );
                  })()}

                  {/* === STEP 5: collecting animation === */}
                  {collectStep === 5 && (
                    <div className="rounded-2xl p-6 flex flex-col items-center gap-3" style={{ background: "white", border: "1px solid hsl(230, 20%, 90%)" }}>
                      <div className="relative w-16 h-16 flex items-center justify-center">
                        <div
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: "conic-gradient(from 0deg, hsl(262, 75%, 55%), hsl(220, 85%, 55%), hsl(178, 70%, 45%), hsl(262, 75%, 55%))",
                            animation: "spin 1.2s linear infinite",
                          }}
                        />
                        <div className="absolute inset-1.5 rounded-full bg-white flex items-center justify-center">
                          <Loader2 className="h-6 w-6 animate-spin" style={{ color: "hsl(262, 75%, 55%)" }} />
                        </div>
                      </div>
                      <p className="text-[13px] font-bold" style={{ color: "hsl(250, 40%, 15%)" }}>
                        {collectingMsg === 0 && "מתחברת לרשות שוק ההון..."}
                        {collectingMsg === 1 && "מאמתת את הזהות שלך..."}
                        {collectingMsg === 2 && "מושכת את הפוליסות שלך..."}
                      </p>
                    </div>
                  )}

                  {/* === STEP 6: result + insight === */}
                  {collectStep === 6 && (
                    <>
                      {/* 3-bullet progress checklist */}
                      <div className="rounded-2xl p-4" style={{ background: "white", border: "1px solid hsl(230, 20%, 90%)", boxShadow: "0 4px 14px hsla(250, 30%, 25%, 0.05)" }}>
                        <ul className="space-y-3">
                          {[
                            "קיבלנו אישור לגשת להר הביטוח ומסלקה",
                            "נתוני הביטוח שלך מוכנים לצפייה",
                            "המידע מעודכן באופן אוטומטי כל חודש",
                          ].map((t, i) => (
                            <li key={i} className="flex items-center gap-2.5">
                              <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "hsl(220, 85%, 55%)" }}>
                                <Check className="h-3 w-3 text-white" strokeWidth={3.5} />
                              </span>
                              <span className="text-[12.5px] leading-snug text-end flex-1" style={{ color: "hsl(250, 35%, 22%)" }}>
                                {t}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Insurance card — purple gradient, connected */}
                      <button
                        onClick={() => { setChatOpen(false); navigate("/c/insurance"); }}
                        className="w-full text-start rounded-2xl p-4 flex items-center gap-3 transition-transform active:scale-[0.98] relative overflow-hidden"
                        style={{
                          background: palettes.insurance.gradient,
                          boxShadow: "0 12px 28px -8px hsla(262, 72%, 50%, 0.55)",
                        }}
                      >
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-extrabold flex items-center gap-1" style={{ background: "hsla(0,0%,100%,0.95)", color: "hsl(150, 70%, 28%)" }}>
                          <Check className="h-2.5 w-2.5" strokeWidth={4} /> הכל תקין
                        </span>
                        <span className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "hsla(0,0%,100%,0.22)" }}>
                          <ShieldCheck className="h-5 w-5 text-white" />
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-[14px] font-extrabold text-white mb-0.5">ביטוח</span>
                          <span className="block text-[11px]" style={{ color: "hsla(0,0%,100%,0.9)" }}>7 פוליסות מחוברות · עדכון אוטומטי</span>
                        </span>
                      </button>

                      {showInsight && (
                        <div
                          ref={insightRef}
                          className="rounded-2xl p-4 mt-2 relative overflow-hidden"
                          style={{
                            background: "linear-gradient(135deg, hsl(260, 75%, 97%) 0%, hsl(265, 70%, 95%) 55%, hsl(275, 75%, 96%) 100%)",
                            border: "1.5px solid hsl(262, 60%, 82%)",
                            boxShadow: "0 12px 32px -8px hsla(262, 60%, 45%, 0.22)",
                            animation: "sheet-slide-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
                          }}
                        >
                          <div className="flex items-center gap-1.5 mb-2">
                            <span className="px-2 py-0.5 rounded-full text-[9.5px] font-extrabold flex items-center gap-1" style={{ background: palettes.insurance.gradient, color: "white" }}>
                              <Sparkles className="h-2.5 w-2.5" /> התובנה הראשונה שלך
                            </span>
                          </div>
                          <p className="text-[20px] font-extrabold leading-tight mb-1" style={{ color: "hsl(258, 55%, 18%)" }}>
                            ביטוח חיים כפול
                          </p>
                          <p className="text-[13px] font-bold leading-tight mb-1" style={{ color: "hsl(258, 50%, 35%)" }}>
                            חיסכון של <span className="text-[15px] font-extrabold" style={{ color: "hsl(265, 75%, 45%)" }}>₪2,000</span> בשנה
                          </p>
                          <p className="text-[11.5px] leading-snug mb-3" style={{ color: "hsl(258, 25%, 38%)" }}>
                            אתה משלם פעמיים על אותו כיסוי. אפשר לבטל אחד בקליק.
                          </p>
                          <button
                            onClick={() => { setChatOpen(false); navigate("/c/insurance"); }}
                            className="w-full rounded-full py-3 text-[13px] font-extrabold text-white flex items-center justify-center gap-1.5 transition-transform active:scale-[0.98]"
                            style={{
                              background: "hsl(250, 40%, 12%)",
                              boxShadow: "0 8px 20px -4px hsla(250, 40%, 12%, 0.45)",
                            }}
                          >
                            <Zap className="h-3.5 w-3.5" />
                            חסוך ₪2,000 בקליק
                          </button>
                        </div>
                      )}

                      {/* Dana follow-up: connect assets */}
                      {showInsight && (
                        <div className="flex items-end gap-2 mt-4" style={{ animation: "sheet-slide-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both", opacity: 0, animationFillMode: "forwards" }}>
                          <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0" style={{ border: "2px solid hsl(262, 75%, 55%)" }}>
                            <img src={advisorImg} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="rounded-2xl rounded-br-md px-3.5 py-2.5 max-w-[85%]" style={{ background: "hsl(230, 30%, 97%)", border: "1px solid hsl(230, 20%, 92%)" }}>
                            <p className="text-[13px] leading-relaxed font-bold mb-1" style={{ color: "hsl(250, 40%, 15%)" }}>
                              מעולה! עכשיו בוא נחבר את הנכסים שלך 💎
                            </p>
                            <p className="text-[11.5px] leading-relaxed" style={{ color: "hsl(250, 30%, 35%)" }}>
                              חיבור לבנק ולתיקי ההשקעות יחשוף את השווי האמיתי שלך.
                            </p>
                          </div>
                        </div>
                      )}

                      {showInsight && (
                        <button
                          onClick={() => { setChatOpen(false); navigate("/c/assets"); }}
                          className="w-full text-start rounded-2xl p-4 flex items-center gap-3 transition-transform active:scale-[0.98] mt-2"
                          style={{
                            background: palettes.assets.gradient,
                            boxShadow: "0 12px 28px -8px hsla(176, 70%, 32%, 0.5)",
                            animation: "sheet-slide-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.4s both",
                            opacity: 0,
                            animationFillMode: "forwards",
                          }}
                        >
                          <span className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "hsla(0,0%,100%,0.22)" }}>
                            <TrendingUp className="h-5 w-5 text-white" />
                          </span>
                          <span className="flex-1 min-w-0">
                            <span className="block text-[14px] font-extrabold text-white mb-0.5">חיבור לנכסים</span>
                            <span className="block text-[11px]" style={{ color: "hsla(0,0%,100%,0.9)" }}>בנק, השקעות ונדל״ן · גילוי השווי האמיתי</span>
                          </span>
                        </button>
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
}) => (
  <div className="rounded-2xl p-4" style={{ background: "white", border: "1px solid hsl(230, 20%, 90%)" }}>
    <div className="flex justify-center mb-2">
      <span className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: iconBg }}>
        {icon}
      </span>
    </div>
    <p className="text-center text-[15px] font-extrabold mb-1" style={{ color: "hsl(250, 40%, 15%)" }}>{title}</p>
    <p className="text-center text-[11px] mb-3" style={{ color: "hsl(230, 15%, 50%)" }}>{subtitle}</p>

    <div className="rounded-xl p-3 mb-3" style={{ background: "hsl(220, 60%, 97%)", border: "1px solid hsl(220, 50%, 92%)" }}>
      <div className="flex items-center justify-between mb-1.5">
        <button className="text-[10.5px] font-bold flex items-center gap-0.5" style={{ color: "hsl(220, 85%, 50%)" }}>
          <ArrowLeft className="h-3 w-3" /> קרא את המסמך המלא
        </button>
        <p className="text-[12px] font-extrabold" style={{ color: "hsl(250, 40%, 15%)" }}>מה כולל הנספח?</p>
      </div>
      <ul className="space-y-1 text-end">
        {bullets.map((b, i) => (
          <li key={i} className="text-[11px] leading-snug" style={{ color: "hsl(250, 30%, 30%)" }}>• {b}</li>
        ))}
      </ul>
    </div>

    <button
      onClick={onToggle}
      className="w-full rounded-xl p-3 flex items-center gap-2.5 text-end transition-all active:scale-[0.99]"
      style={{
        background: checked ? "hsl(262, 75%, 96%)" : "white",
        border: `1.5px solid ${checked ? "hsl(262, 75%, 55%)" : "hsl(230, 20%, 88%)"}`,
      }}
    >
      <span
        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: checked ? "hsl(262, 75%, 55%)" : "hsl(230, 25%, 95%)" }}
      >
        {checked && <Check className="h-4 w-4 text-white" strokeWidth={3} />}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-extrabold" style={{ color: "hsl(250, 40%, 15%)" }}>אני מאשר/ת</p>
        <p className="text-[10.5px] leading-tight mt-0.5" style={{ color: "hsl(230, 15%, 50%)" }}>{consentText}</p>
      </div>
    </button>
  </div>
);

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
