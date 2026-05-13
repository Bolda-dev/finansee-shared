import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { TrendingUp, TrendingDown, ShieldCheck, Menu, Lock, Plus, PiggyBank, LineChart, Briefcase, Building2, Mic, Send, X } from "lucide-react";
import { userData } from "@/lib/data";
import advisorImg from "@/assets/advisor-avatar.jpg";
import { InsightsSheet } from "@/components/InsightsSheet";

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

      {/* Floating Dana chatbot */}
      <ChatBot open={chatOpen} onOpenChange={setChatOpen} variant="centered" />
    </div>
  );
};

export default AhaDashboard;
