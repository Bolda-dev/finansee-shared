import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { TrendingUp, TrendingDown, ShieldCheck, Menu, Plus, PiggyBank, LineChart, Briefcase, Building2, Mic, Send, X, Check, ArrowLeft, ChevronDown, Loader } from "lucide-react";
import { ConsentAnnex } from "@/components/aha/ConsentAnnex";
import { userData } from "@/lib/data";
import advisorImg from "@/assets/advisor-avatar.jpg";

type Palette = { gradient: string; shadow: string; solid: string; soft: string };
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

const CARD_MIN_H = 140;

type Stage = "intro" | "creditReport" | "investStyle";

const styleQuestions = [
  {
    title: "מה סגנון ההשקעה שלך?",
    subtitle: "נתאים את ניתוח התיק בהתאם",
    options: [
      { id: "conservative", label: "שמרני", emoji: "🛡", desc: "שמירת הון והכנסה קבועה" },
      { id: "balanced", label: "מאוזן", emoji: "⚖️", desc: "איזון בין צמיחה לשמירה" },
      { id: "aggressive", label: "אגרסיבי", emoji: "🚀", desc: "צמיחה ותשואות גבוהות" },
    ],
  },
  {
    title: "מהו טווח הזמן המתוכנן להשקעה?",
    subtitle: "זה יעזור לנו להתאים את רמת הסיכון בתיק.",
    options: [
      { id: "short", label: "טווח קצר", emoji: "🐖", desc: "(עד שנתיים) שמירה על הכסף עבור שימוש קרוב." },
      { id: "mid", label: "טווח בינוני", emoji: "🏠", desc: "(2–7 שנים) צבירת הון למטרה מוגדרת בעתיד." },
      { id: "long", label: "טווח ארוך", emoji: "🌳", desc: "(7 שנים ומעלה) השקעה לטובת עתיד רחוק או פרישה." },
    ],
  },
  {
    title: "מה היקף הנכסים שלך?",
    subtitle: "חיסכון, השקעות, פנסיה וקופות גמל",
    options: [
      { id: "u200", label: "עד ₪200,000", emoji: "💰", desc: "" },
      { id: "200_500", label: "₪200,000 - ₪500,000", emoji: "💵", desc: "" },
      { id: "500_800", label: "₪500,000 - ₪800,000", emoji: "💎", desc: "" },
      { id: "800_1200", label: "₪800,000 - ₪1.2M", emoji: "💸", desc: "" },
      { id: "over_1200", label: "מעל ₪1.2M", emoji: "🏆", desc: "" },
    ],
  },
];

const AhaDashboard2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navState = (location.state || {}) as {
    firstName?: string;
    connected?: { pension?: boolean; insurance?: boolean; credit?: boolean };
  };
  const initialCompleted = !!(
    navState.connected &&
    (navState.connected.pension || navState.connected.insurance || navState.connected.credit)
  );
  const firstName = navState.firstName || userData.name;

  const [chatOpen, setChatOpen] = useState(false);
  const [tipOpen, setTipOpen] = useState(false);
  const [stage, setStage] = useState<Stage>("intro");
  // creditReport: 1=consent assets, 2=consent liab, 3=collecting
  // investStyle: 0..2 = three questions
  const [creditStep, setCreditStep] = useState<1 | 2 | 3>(1);
  const [styleStep, setStyleStep] = useState(0);
  const [styleAnswers, setStyleAnswers] = useState<Record<number, string>>({});
  const [consents, setConsents] = useState({ creditAssets: false, creditLiab: false });
  const [collectingMsg, setCollectingMsg] = useState(0);
  const [completed85, setCompleted85] = useState(initialCompleted);
  const [danaExpanded, setDanaExpanded] = useState(false);
  const [danaCollapsed, setDanaCollapsed] = useState(false);

  // Easter-egg: 5 rapid hamburger clicks → /c
  const burgerClicks = useRef(0);
  const burgerTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleBurgerClick = () => {
    burgerClicks.current += 1;
    if (burgerClicks.current >= 5) {
      burgerClicks.current = 0;
      if (burgerTimer.current) clearTimeout(burgerTimer.current);
      navigate("/");
      return;
    }
    if (burgerTimer.current) clearTimeout(burgerTimer.current);
    burgerTimer.current = setTimeout(() => {
      burgerClicks.current = 0;
    }, 2000);
  };

  // Reset chat when sheet closes (preserve completed85)
  useEffect(() => {
    if (!chatOpen) {
      const t = setTimeout(() => {
        if (!completed85) {
          setStage("intro");
          setCreditStep(1);
          setStyleStep(0);
          setConsents({ creditAssets: false, creditLiab: false });
          setStyleAnswers({});
          setCollectingMsg(0);
        }
      }, 300);
      return () => clearTimeout(t);
    }
  }, [chatOpen, completed85]);

  // Tooltip after 4s on first landing
  useEffect(() => {
    if (completed85) return;
    const t = setTimeout(() => setTipOpen(true), 4000);
    return () => clearTimeout(t);
  }, [completed85]);

  // Collecting animation for credit report
  useEffect(() => {
    if (stage !== "creditReport" || creditStep !== 3) return;
    setCollectingMsg(0);
    const t1 = setTimeout(() => setCollectingMsg(1), 600);
    const t2 = setTimeout(() => setCollectingMsg(2), 1200);
    const t3 = setTimeout(() => {
      setStage("investStyle");
      setStyleStep(0);
    }, 1900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [stage, creditStep]);

  const heroCards = [
    { label: "נכסים", Icon: TrendingUp, estimate: "₪600K - ₪1.4M", category: "assets" as const, route: "/assets" },
    { label: "התחייבויות", Icon: TrendingDown, estimate: "₪150K - ₪400K", category: "liabilities" as const, route: "/liabilities" },
    { label: "ביטוח", Icon: ShieldCheck, estimate: "5 פוליסות", category: "insurance" as const, route: "/insurance" },
  ];

  const centerCards = [
    { label: "פנסיה", Icon: PiggyBank, category: "assets" as const },
    { label: "השקעות", Icon: LineChart, category: "assets" as const },
    { label: "הלוואות", Icon: Briefcase, category: "liabilities" as const },
    { label: "משכנתא", Icon: Building2, category: "liabilities" as const },
  ];

  const dashedBorder = "hsl(230, 18%, 70%)";
  const mutedIconColor = "hsl(230, 14%, 50%)";

  const openCreditChat = () => {
    setStage("creditReport");
    setCreditStep(1);
    setChatOpen(true);
    setTipOpen(false);
  };

  const insuranceP = palettes.insurance;

  const progressPct = completed85 ? 85 : 42;

  return (
    <div
      className="min-h-screen max-w-[430px] mx-auto relative pb-28"
      dir="rtl"
      style={{ background: "hsl(235, 30%, 97%)" }}
    >
      {/* gradient bg */}
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
              onClick={handleBurgerClick}
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
        <p className="font-extrabold tracking-tight text-4xl mb-1" style={{ color: "hsl(250, 50%, 10%)" }}>
          ₪450K - ₪1.2M
        </p>
        <p className="text-[12px]" style={{ color: "hsl(230, 15%, 55%)" }}>
          הערכה לפי הפרופיל שלך
        </p>
      </div>

      {/* 3 hero cards (insurance bold, others dashed at same height) */}
      <div className="relative z-10 px-3">
        <div className="grid grid-cols-3 gap-3 mb-6">
          {heroCards.map((card) => {
            const p = palettes[card.category];
            if (card.category === "insurance") {
              return (
                <button
                  key={card.label}
                  onClick={() => navigate(card.route)}
                  className="relative rounded-2xl px-2.5 py-3 text-start overflow-hidden transition-transform active:scale-[0.97]"
                  style={{
                    background: p.gradient,
                    boxShadow: `0 8px 24px hsla(262, 72%, 50%, 0.4)`,
                    minHeight: `${CARD_MIN_H}px`,
                  }}
                >
                  <div
                    className="w-9 h-9 mb-4 rounded-full flex items-center justify-center relative z-10"
                    style={{
                      background: "hsla(0, 0%, 100%, 0.95)",
                      boxShadow: "0 2px 8px hsla(0, 0%, 0%, 0.1)",
                    }}
                  >
                    <card.Icon className="h-4 w-4" style={{ color: p.solid }} />
                  </div>
                  <div className="relative z-10">
                    <p className="text-[11px] font-medium mb-1" style={{ color: "hsla(0, 0%, 100%, 0.9)" }}>
                      {card.label}
                    </p>
                    <p className="font-extrabold text-base text-white">5 פוליסות</p>
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
                  minHeight: `${CARD_MIN_H}px`,
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
                {completed85 ? (
                  <div className="mt-auto flex">
                    <span
                      className="inline-flex items-center gap-1 text-[9.5px] font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: "hsl(45, 95%, 88%)",
                        color: "hsl(35, 85%, 28%)",
                        border: "1px solid hsl(45, 90%, 75%)",
                      }}
                    >
                      <Loader className="h-2.5 w-2.5 animate-spin" />
                      שולף נתונים
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={openCreditChat}
                    className="mt-auto w-full rounded-full py-1.5 text-[10.5px] font-bold flex items-center justify-center text-white transition-transform active:scale-[0.97]"
                    style={{ background: p.gradient, boxShadow: p.shadow }}
                  >
                    חיבור לנתונים
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Dana insights card */}
        <div className="mb-8">
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
                  היי {firstName} 👋 חיברנו <span className="font-bold">{progressPct}%</span> מהנתונים שלך.
                </p>
                <p className="text-[11.5px] leading-snug" style={{ color: "hsl(250, 25%, 45%)" }}>
                  {completed85 ? "כמעט שם — נשארו רק שני מקורות לחבר." : "בוא נשלים את התמונה לשווי האמיתי שלך."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-3 mb-3">
              <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "hsl(230, 20%, 93%)" }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${progressPct}%`,
                    background: "linear-gradient(90deg, hsl(262, 75%, 55%), hsl(220, 85%, 55%))",
                    transition: "width 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                />
              </div>
              <span className="text-[11px] font-extrabold whitespace-nowrap" style={{ color: "hsl(262, 75%, 45%)" }}>
                {progressPct}%
              </span>
            </div>

            {completed85 ? (
              <>
                <button
                  onClick={() => setDanaExpanded((v) => !v)}
                  className="w-full flex items-center justify-between text-right focus:outline-none"
                  style={{ color: "hsl(250, 35%, 25%)" }}
                >
                  <span className="text-[12px] font-bold">גישה מהירה</span>
                  <ChevronDown
                    className="h-4 w-4 transition-transform duration-300"
                    style={{ transform: danaExpanded ? "rotate(180deg)" : "rotate(0deg)", color: "hsl(262, 75%, 55%)" }}
                  />
                </button>
                {danaExpanded && (
                  <div className="space-y-2 mt-3">
                    {[
                      { Icon: Building2, label: "נדל״ן", desc: "דירות, רכבים ונכסים", category: "assets" as const, route: "/assets" },
                      { Icon: LineChart, label: "השקעות", desc: "תיקי השקעות וני״ע", category: "assets" as const, route: "/assets" },
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
                          <ArrowLeft className="h-4 w-4 flex-shrink-0" style={{ color: "hsl(262, 75%, 55%)" }} />
                        </button>
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
              <>
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
                  <div className="space-y-2 mt-3">
                    {[
                      { Icon: PiggyBank, label: "אשראי ובנק", desc: "חשבון בנק וכרטיסי אשראי", soft: palettes.liabilities.soft, solid: palettes.liabilities.solid },
                      { Icon: Briefcase, label: "השקעות", desc: "תיקי השקעות וני״ע", soft: palettes.assets.soft, solid: palettes.assets.solid },
                      { Icon: Building2, label: "נדל״ן ונכסים", desc: "דירות, רכבים ונכסים", soft: palettes.assets.soft, solid: palettes.assets.solid },
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={openCreditChat}
                        className="w-full text-start rounded-xl p-3 flex items-center gap-3 transition-transform active:scale-[0.98]"
                        style={{ background: "hsl(230, 30%, 97%)", border: "1px solid hsl(230, 20%, 92%)" }}
                      >
                        <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: item.soft }}>
                          <item.Icon className="h-4 w-4" style={{ color: item.solid }} />
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-[12.5px] font-extrabold" style={{ color: "hsl(250, 40%, 15%)" }}>{item.label}</span>
                          <span className="block text-[10.5px]" style={{ color: "hsl(230, 15%, 50%)" }}>{item.desc}</span>
                        </span>
                        <Plus className="h-4 w-4 flex-shrink-0" style={{ color: "hsl(262, 75%, 55%)" }} />
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Financial Center */}
        <h2 className="text-sm font-bold mb-3" style={{ color: "hsl(250, 40%, 20%)" }}>
          מרכז פיננסי
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {centerCards.map((card) => {
            const p = palettes[card.category];
            const isPension = card.label === "פנסיה";
            if (isPension) {
              return (
                <button
                  key={card.label}
                  onClick={() => navigate("/assets")}
                  className="relative rounded-2xl p-3.5 pt-4 text-start flex flex-col gap-1 overflow-hidden transition-transform active:scale-[0.98]"
                  style={{
                    background: "white",
                    boxShadow: "0 3px 14px hsla(250, 30%, 25%, 0.07)",
                    border: "1px solid hsl(230, 20%, 94%)",
                    minHeight: "150px",
                  }}
                >
                  <span className="absolute top-0 inset-x-0 h-[3px] pointer-events-none" style={{ background: p.solid }} aria-hidden />
                  <div className="flex items-center justify-start gap-2 mb-1">
                    <span className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: p.soft }}>
                      <card.Icon className="h-4 w-4" style={{ color: p.solid }} strokeWidth={2} />
                    </span>
                    <span className="text-[12px] font-bold tracking-tight" style={{ color: "hsl(250, 50%, 12%)" }}>{card.label}</span>
                  </div>
                  <p className="text-[22px] font-extrabold tracking-tight leading-none" style={{ color: "hsl(250, 50%, 12%)" }}>₪1,233,500</p>
                  <p className="text-[10px] mt-1" style={{ color: "hsl(230, 12%, 58%)" }}>סך החיסכון</p>
                  <div className="mt-auto pt-2 border-t" style={{ borderColor: "hsl(230, 20%, 94%)" }}>
                    <p className="text-[11px] leading-none whitespace-nowrap">
                      <span className="font-bold" style={{ color: "hsl(250, 50%, 12%)" }}>₪9,069</span>
                      <span className="mx-1" style={{ color: "hsl(250, 50%, 12%)" }}>·</span>
                      <span style={{ color: "hsl(250, 50%, 12%)" }}>צפי קצבה חודשית</span>
                    </p>
                  </div>
                </button>
              );
            }
            return (
              <button
                key={card.label}
                onClick={() => navigate(card.category === "liabilities" ? "/liabilities" : "/assets")}
                className="rounded-2xl flex flex-col items-center justify-center text-center px-3 py-4 gap-2 transition-transform active:scale-[0.98]"
                style={{
                  background: "hsla(0, 0%, 100%, 0.4)",
                  border: `1.5px dashed ${dashedBorder}`,
                  minHeight: "150px",
                }}
              >
                <div className="relative w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "hsl(230, 25%, 95%)", color: mutedIconColor }}>
                  <card.Icon className="h-4 w-4" strokeWidth={2} />
                  <span
                    className="absolute -bottom-0.5 -left-0.5 w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ background: "hsl(230, 14%, 70%)", color: "white", border: "1.5px solid white" }}
                  >
                    <Plus className="h-2.5 w-2.5" strokeWidth={3} />
                  </span>
                </div>
                <span className="text-[12px] font-bold tracking-tight" style={{ color: "hsl(250, 50%, 12%)" }}>{card.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tooltip styles */}
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
        @keyframes sheet-slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes aha-item-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Bottom Chat Bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-40 px-4 pb-4 pointer-events-none before:content-[''] before:absolute before:inset-x-0 before:bottom-0 before:h-[160px] before:bg-gradient-to-t before:from-white before:via-white/85 before:to-transparent before:-z-10 before:pointer-events-none" dir="rtl">
        {tipOpen && !completed85 && (
          <div className="relative pointer-events-auto mb-2 mr-1 inline-block">
            <button
              onClick={openCreditChat}
              className="aha-tip-wrap block text-right w-full"
              aria-label="פתח צ'אט"
            >
              <div className="flex items-start gap-2 rounded-[18px] px-3.5 py-3 max-w-[300px]">
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-extrabold mb-1" style={{ color: "hsl(250, 50%, 10%)" }}>
                    💎 בוא נשלים את התמונה
                  </p>
                  <p className="text-[11.5px] leading-snug" style={{ color: "hsl(250, 30%, 30%)" }}>
                    חיבור לדוח האשראי יחשוף את הנכסים וההתחייבויות שלך
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

            <div className="px-5 pt-1 pb-2 flex items-center justify-between flex-shrink-0">
              <span />
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
                  {(stage === "intro" || (stage === "creditReport" && creditStep === 1)) && (
                    <>
                      <p className="text-[13px] leading-relaxed font-bold mb-1" style={{ color: "hsl(250, 40%, 15%)" }}>
                        בוא נחבר את דוח האשראי 💎
                      </p>
                      <p className="text-[11.5px] leading-relaxed" style={{ color: "hsl(250, 30%, 35%)" }}>
                        זה יחשוף את כל הנכסים שלך — חשבונות, פיקדונות והשקעות.
                      </p>
                    </>
                  )}
                  {stage === "creditReport" && creditStep === 2 && (
                    <>
                      <p className="text-[13px] leading-relaxed font-bold mb-1" style={{ color: "hsl(250, 40%, 15%)" }}>
                        אחרון! דוח אשראי להתחייבויות 🏦
                      </p>
                      <p className="text-[11.5px] leading-relaxed" style={{ color: "hsl(250, 30%, 35%)" }}>
                        אותו דוח חושף גם את ההלוואות, המשכנתא והאשראי הפתוח שלך.
                      </p>
                    </>
                  )}
                  {stage === "creditReport" && creditStep === 3 && (
                    <>
                      <p className="text-[13px] leading-relaxed font-bold mb-1" style={{ color: "hsl(250, 40%, 15%)" }}>
                        אוספת את הנתונים שלך... ⚡
                      </p>
                      <p className="text-[11.5px] leading-relaxed" style={{ color: "hsl(250, 30%, 35%)" }}>
                        רגע אחד, מתחברת לדוח האשראי.
                      </p>
                    </>
                  )}
                  {stage === "investStyle" && (
                    <>
                      <p className="text-[13px] leading-relaxed font-bold mb-1" style={{ color: "hsl(250, 40%, 15%)" }}>
                        {styleQuestions[styleStep].title}
                      </p>
                      <p className="text-[11.5px] leading-relaxed" style={{ color: "hsl(250, 30%, 35%)" }}>
                        {styleQuestions[styleStep].subtitle}
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Intro: launch card */}
              {stage === "intro" && (
                <div className="space-y-2.5">
                  <button
                    onClick={() => setStage("creditReport")}
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
                        style={{ background: palettes.liabilities.gradient }}
                      >
                        <PiggyBank className="h-5 w-5 text-white" />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-[14px] font-extrabold" style={{ color: "hsl(250, 40%, 15%)" }}>
                            דוח אשראי
                          </span>
                          <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold" style={{ background: "hsl(262, 75%, 95%)", color: "hsl(262, 75%, 45%)" }}>
                            מומלץ
                          </span>
                        </span>
                        <span className="block text-[11px] leading-snug" style={{ color: "hsl(250, 22%, 50%)" }}>
                          נכסים והתחייבויות במקום אחד
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
                </div>
              )}

              {/* Credit consent (single step) */}
              {stage === "creditReport" && (creditStep === 1 || creditStep === 2) && (
                <div className="space-y-3">
                  <ConsentAnnex
                    icon={creditStep === 1 ? <PiggyBank className="h-6 w-6" style={{ color: "hsl(220, 85%, 50%)" }} /> : undefined}
                    iconBg="hsl(220, 85%, 94%)"
                    title="אישור לדוח אשראי - אשראי ובנק"
                    subtitle="לניתוח פיננסי מלא נצטרך גישה לדוח האשראי שלך"
                    bullets={[
                      "זיהוי כל החשבונות, הפיקדונות וההשקעות שלך",
                      "מיפוי הלוואות, משכנתאות ומסגרות פעילות",
                      "אסטרטגיות לשיפור ציון אשראי וניהול אופטימלי",
                    ]}
                  />

                  <button
                    onClick={() => setConsents((c) => ({ creditAssets: !c.creditAssets, creditLiab: !c.creditAssets }))}
                    className="w-full rounded-2xl p-3.5 flex items-center gap-3 transition-all active:scale-[0.99]"
                    style={{
                      background: "white",
                      border: `2px solid ${consents.creditAssets ? "hsl(262, 75%, 55%)" : "hsl(230, 20%, 88%)"}`,
                      boxShadow: consents.creditAssets
                        ? "0 6px 18px -8px hsla(262, 75%, 55%, 0.45)"
                        : "0 4px 14px -10px hsla(250, 40%, 20%, 0.18)",
                    }}
                  >
                    <span
                      className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                      style={{
                        background: consents.creditAssets ? "hsl(262, 75%, 55%)" : "white",
                        border: `1.5px solid ${consents.creditAssets ? "hsl(262, 75%, 55%)" : "hsl(230, 20%, 75%)"}`,
                      }}
                    >
                      {consents.creditAssets && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
                    </span>
                    <div className="flex-1 min-w-0 text-right">
                      <p className="text-[13.5px] font-extrabold leading-tight" style={{ color: "hsl(250, 40%, 15%)" }}>
                        אני מאשר/ת
                      </p>
                      <p className="text-[10.5px] leading-snug mt-0.5" style={{ color: "hsl(230, 15%, 50%)" }}>
                        המידע מוצפן ומאובטח
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => setCreditStep(3)}
                    disabled={!consents.creditAssets}
                    className="w-full rounded-full py-3.5 text-[14px] font-extrabold text-white transition-all active:scale-[0.98]"
                    style={{
                      background: consents.creditAssets ? "hsl(0, 0%, 8%)" : "hsl(230, 18%, 80%)",
                      boxShadow: consents.creditAssets ? "0 10px 24px -10px hsla(0, 0%, 0%, 0.5)" : "none",
                      opacity: consents.creditAssets ? 1 : 0.5,
                    }}
                  >
                    סיים והתחל איסוף
                  </button>
                </div>
              )}

              {/* Collecting skeleton */}
              {stage === "creditReport" && creditStep === 3 && (
                <div className="space-y-3" dir="rtl">
                  <div className="flex items-end gap-2">
                    <div className="w-9 h-9 rounded-full flex-shrink-0 chat-shimmer" />
                    <div className="flex-1 h-16 rounded-2xl rounded-br-md chat-shimmer" style={{ maxWidth: "85%" }} />
                  </div>
                  <div className="w-full h-20 rounded-2xl chat-shimmer" />
                  <p className="text-[12px] text-center font-medium pt-1" style={{ color: "hsl(230, 15%, 50%)" }}>
                    {collectingMsg === 0 && "מושכת את דוח האשראי שלך..."}
                    {collectingMsg === 1 && "מזהה נכסים והתחייבויות..."}
                    {collectingMsg === 2 && "מסכמת את התמונה הפיננסית..."}
                  </p>
                </div>
              )}

              {/* Investment style questions */}
              {stage === "investStyle" && (
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "hsl(230, 20%, 93%)" }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${((styleStep + 1) / 3) * 100}%`,
                          background: "linear-gradient(90deg, hsl(262, 75%, 55%), hsl(220, 85%, 55%))",
                          transition: "width 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                      />
                    </div>
                    <span className="text-[10.5px] font-bold whitespace-nowrap" style={{ color: "hsl(250, 40%, 20%)" }}>
                      שאלה {styleStep + 1}/3
                    </span>
                  </div>

                  {styleQuestions[styleStep].options.map((opt) => {
                    const selected = styleAnswers[styleStep] === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setStyleAnswers((s) => ({ ...s, [styleStep]: opt.id }));
                          if (styleStep < 2) {
                            setTimeout(() => setStyleStep((s) => s + 1), 220);
                          }
                        }}
                        className="w-full text-start rounded-2xl p-3.5 flex items-center gap-3 transition-all active:scale-[0.98]"
                        style={{
                          background: selected
                            ? "linear-gradient(white, white) padding-box, linear-gradient(110deg, hsl(262, 75%, 45%), hsl(220, 85%, 50%)) border-box"
                            : "white",
                          border: selected ? "2px solid transparent" : "1.5px solid hsl(230, 20%, 88%)",
                          boxShadow: selected ? "0 6px 18px -10px hsla(262, 75%, 45%, 0.45)" : "none",
                        }}
                      >
                        {selected && (
                          <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "hsl(220, 85%, 50%)" }}>
                            <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                          </span>
                        )}
                        <div className="flex-1 min-w-0 text-right">
                          <p className="text-[13.5px] font-extrabold leading-tight" style={{ color: "hsl(250, 40%, 15%)" }}>
                            {opt.label}
                          </p>
                          {opt.desc && (
                            <p className="text-[10.5px] leading-snug mt-0.5" style={{ color: "hsl(230, 15%, 50%)" }}>
                              {opt.desc}
                            </p>
                          )}
                        </div>
                        {opt.emoji && <span className="text-2xl flex-shrink-0">{opt.emoji}</span>}
                      </button>
                    );
                  })}

                  {styleStep === 2 && (
                    <button
                      onClick={() => { setCompleted85(true); setChatOpen(false); }}
                      disabled={!styleAnswers[styleStep]}
                      className="w-full rounded-full py-3.5 text-[14px] font-extrabold text-white transition-all active:scale-[0.98]"
                      style={{
                        background: styleAnswers[styleStep] ? "hsl(0, 0%, 8%)" : "hsl(230, 18%, 80%)",
                        boxShadow: styleAnswers[styleStep] ? "0 10px 24px -10px hsla(0, 0%, 0%, 0.5)" : "none",
                        opacity: styleAnswers[styleStep] ? 1 : 0.5,
                      }}
                    >
                      סיום
                    </button>
                  )}

                  {styleStep > 0 && (
                    <div className="flex justify-center pt-1">
                      <button
                        onClick={() => setStyleStep((s) => Math.max(0, s - 1))}
                        className="text-[12px] font-medium py-1.5 px-2 focus:outline-none flex items-center gap-1"
                        style={{ color: "hsl(230, 15%, 50%)" }}
                      >
                        <ArrowLeft className="h-3 w-3 rotate-180" />
                        שאלה קודמת
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AhaDashboard2;
