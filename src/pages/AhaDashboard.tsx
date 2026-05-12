import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { TrendingUp, TrendingDown, ShieldCheck, Menu, Lock, Plus } from "lucide-react";
import { userData } from "@/lib/data";
import advisorImg from "@/assets/advisor-avatar.jpg";

const AhaDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const firstName = (location.state as { firstName?: string } | null)?.firstName || userData.name;
  const ctaRef = useRef<HTMLDivElement>(null);

  const scrollToCta = () => {
    ctaRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const cards = [
    { label: "נכסים", Icon: TrendingUp, estimate: "₪600K - ₪1.4M" },
    { label: "התחייבויות", Icon: TrendingDown, estimate: "₪150K - ₪400K" },
    { label: "ביטוח", Icon: ShieldCheck, estimate: "חלקי" },
  ];

  const dashedBorder = "hsl(230, 18%, 70%)";
  const mutedIconColor = "hsl(230, 14%, 50%)";

  return (
    <div
      className="min-h-screen max-w-[430px] mx-auto relative pb-32"
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
          <h1
            className="text-lg font-bold mb-1"
            style={{ color: "hsl(250, 40%, 15%)" }}
          >
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

      {/* 3 colored cards (locked) */}
      <div className="relative z-10 px-3">
        <div className="grid grid-cols-3 gap-3 mb-6">
          {cards.map((card) => (
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
                onClick={scrollToCta}
                className="mt-auto w-full rounded-full py-1.5 text-[10px] font-semibold flex items-center justify-center gap-1 transition-transform active:scale-[0.97]"
                style={{
                  background: "hsl(250, 40%, 15%)",
                  color: "white",
                }}
              >
                <Plus className="h-3 w-3" />
                חיבור לנתונים
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky bottom CTA */}
      <div
        ref={ctaRef}
        className="fixed bottom-0 inset-x-0 z-20 px-4 pb-6 pt-4 max-w-[430px] mx-auto"
        style={{
          background:
            "linear-gradient(to top, hsl(235, 30%, 97%) 60%, hsla(235, 30%, 97%, 0))",
        }}
      >
        <button
          onClick={() => navigate("/c")}
          className="btn-black-deep w-full rounded-full py-4 text-sm font-semibold text-white transition-all active:scale-[0.98]"
          style={{
            boxShadow:
              "0 10px 24px -10px hsla(0, 0%, 0%, 0.55), 0 2px 6px hsla(0, 0%, 0%, 0.2), inset 0 1px 0 hsla(0, 0%, 100%, 0.12)",
          }}
        >
          גלה את השווי האמיתי שלי ←
        </button>
      </div>
    </div>
  );
};

export default AhaDashboard;
