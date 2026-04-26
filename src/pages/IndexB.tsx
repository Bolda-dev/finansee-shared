import { useState } from "react";
import { TrendingUp, TrendingDown, Shield, Home, Plus, Calendar, BarChart3, Wallet, ShieldCheck, Menu, Info, Send, Mic } from "lucide-react";
import { userData, recommendations, incomeItems, expenseItems, insuranceItems, criticalityConfig } from "@/lib/data";
import { ChatBot } from "@/components/ChatBot";
import { MenuDrawer } from "@/components/MenuDrawer";
import { InsightsSheet } from "@/components/InsightsSheet";
import advisorImg from "@/assets/advisor-avatar.jpg";
import natureBg from "@/assets/nature-bg.jpg";

const formatCurrency = (n: number) =>
  "₪" + n.toLocaleString("he-IL");

const RadialGauge = ({ percent, current, max }: { percent: number; current: number; max: number }) => {
  const radius = 80;
  const stroke = 16;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * 0.75;
  const offset = arcLength - (arcLength * percent) / 100;

  return (
    <div className="flex flex-col items-center">
      <svg width="200" height="180" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r={radius} fill="none" stroke="hsl(230, 30%, 92%)" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={`${arcLength} ${circumference}`} strokeDashoffset={0} transform="rotate(135 100 100)" />
        <circle cx="100" cy="100" r={radius} fill="none" stroke="url(#gaugeGradient)" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={`${arcLength} ${circumference}`} strokeDashoffset={offset} transform="rotate(135 100 100)" style={{ transition: "stroke-dashoffset 1.5s ease-out" }} />
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(250, 70%, 60%)" />
            <stop offset="100%" stopColor="hsl(200, 80%, 55%)" />
          </linearGradient>
        </defs>
        <text x="100" y="88" textAnchor="middle" className="text-[11px]" fill="hsl(230, 20%, 55%)" fontFamily="inherit">המצב הנוכחי שלך</text>
        <text x="100" y="115" textAnchor="middle" fill="hsl(250, 40%, 25%)" fontFamily="inherit" fontSize="18" fontWeight="800">{formatCurrency(current)}</text>
        <text x="100" y="138" textAnchor="middle" className="text-[10px]" fill="hsl(230, 20%, 65%)" fontFamily="inherit" fontSize="10">מתוך {formatCurrency(max)}</text>
      </svg>
    </div>
  );
};

const IndexB = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"status" | "income" | "expenses" | "insurance">("status");
  const progressPercent = (userData.currentPotential / userData.maxPotential) * 100;

  const navItems = [
    { key: "status" as const, label: "בית", icon: Home },
    { key: "income" as const, label: "הכנסות", icon: TrendingUp },
    { key: "expenses" as const, label: "הוצאות", icon: Wallet },
    { key: "insurance" as const, label: "ביטוחים", icon: ShieldCheck },
  ];

  const recIcons: Record<string, React.ReactNode> = {
    Home: <Home className="h-4 w-4" style={{ color: "hsl(290, 70%, 55%)" }} />,
    Plus: <Plus className="h-4 w-4" style={{ color: "hsl(290, 70%, 55%)" }} />,
    Calendar: <Calendar className="h-4 w-4" style={{ color: "hsl(290, 70%, 55%)" }} />,
  };

  const extendedRecs = [
    ...recommendations,
    { id: 4, title: "אופטימיזציה של ביטוחים", description: "ניתן לחסוך על ביטוחים קיימים", saving: "₪1,800/שנה", action: "בדוק עכשיו", icon: "Home", criticality: "high" as const },
    { id: 5, title: "הגדלת הפקדות לפנסיה", description: "ניצול מלא של הטבות מס", saving: "₪5,000/שנה", action: "פרטים", icon: "Plus", criticality: "medium" as const },
  ];

  const leftNav = navItems.slice(0, 2);
  const rightNav = navItems.slice(2, 4);

  return (
    <div className="min-h-screen max-w-[430px] mx-auto relative" dir="rtl" style={{ background: "hsl(235, 30%, 97%)" }}>
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
      <div className="relative z-10 px-5 pt-12 pb-0" dir="rtl">
        <div className="flex flex-col items-start gap-8 text-start">
          <button onClick={() => setMenuOpen(true)} className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 flex-shrink-0" style={{ background: "hsla(250, 40%, 99%, 0.55)", backdropFilter: "blur(12px)", border: "1px solid hsla(250, 50%, 92%, 0.5)" }}>
            <Menu className="h-5 w-5" style={{ color: "hsl(250, 40%, 20%)" }} />
          </button>
          <h1 className="text-lg font-bold text-start mb-1" style={{ color: "hsl(250, 40%, 15%)" }}>בוקר טוב, {userData.name}</h1>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "status" && (
        <div className="relative z-10 px-5">
          {/* Net worth header block */}
          <div className="mb-6">
            <div className="flex items-center justify-start gap-1.5 mb-2">
              <p className="text-sm font-medium" style={{ color: "hsl(250, 35%, 30%)" }}>שווי נטו</p>
              <Info className="h-3.5 w-3.5" style={{ color: "hsl(250, 30%, 55%)" }} />
            </div>
            <div className="flex items-center justify-start gap-3 mb-1">
              <p
                className="text-5xl font-extrabold tracking-tight networth-shimmer"
              >
                {formatCurrency(userData.currentPotential)}
              </p>
              <span
                className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{
                  background: "hsla(250, 50%, 99%, 0.7)",
                  border: "1px solid hsla(250, 50%, 88%, 0.6)",
                  color: "hsl(290, 70%, 55%)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <TrendingUp className="h-3 w-3" />
                1.8%+
              </span>
            </div>
            <p className="text-[11px] text-start" style={{ color: "hsl(230, 15%, 55%)" }}>
              עודכן היום בשעה 09:41
            </p>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              {
                label: "נכסים",
                value: "₪8.4M",
                Icon: TrendingUp,
                gradient: "linear-gradient(135deg, hsl(190, 85%, 55%) 0%, hsl(205, 90%, 45%) 100%)",
                shadow: "0 8px 24px hsla(195, 85%, 45%, 0.35)",
                iconColor: "hsl(200, 80%, 35%)",
                ripple: { cx: 18, cy: 130, radii: [22, 44, 70, 98, 130] },
              },
              {
                label: "התחייבויות",
                value: "₪1.37M",
                Icon: TrendingDown,
                gradient: "linear-gradient(135deg, hsl(335, 75%, 60%) 0%, hsl(350, 80%, 50%) 100%)",
                shadow: "0 8px 24px hsla(345, 75%, 50%, 0.35)",
                iconColor: "hsl(345, 70%, 40%)",
                ripple: { cx: 130, cy: 20, radii: [18, 38, 62, 92, 124] },
              },
              {
                label: "ביטוח",
                value: "5 פוליסות",
                Icon: ShieldCheck,
                gradient: "linear-gradient(135deg, hsl(40, 95%, 60%) 0%, hsl(25, 92%, 55%) 100%)",
                shadow: "0 8px 24px hsla(30, 90%, 50%, 0.35)",
                iconColor: "hsl(28, 80%, 38%)",
                ripple: { cx: 70, cy: 145, radii: [28, 56, 86, 118] },
              },
            ].map((card) => (
              <button
                key={card.label}
                className="relative rounded-2xl p-4 text-start overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: card.gradient,
                  boxShadow: card.shadow,
                  minHeight: "130px",
                }}
              >
                {/* Static ripples — unique placement per card */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 140 140"
                  preserveAspectRatio="xMidYMid slice"
                >
                  {card.ripple.radii.map((r, idx) => (
                    <circle
                      key={`${r}-${idx}`}
                      cx={card.ripple.cx}
                      cy={card.ripple.cy}
                      r={r}
                      fill="none"
                      stroke="hsla(0, 0%, 100%, 0.22)"
                      strokeWidth="1"
                    />
                  ))}
                </svg>

                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center mb-4 relative z-10"
                  style={{
                    background: "hsla(0, 0%, 100%, 0.95)",
                    boxShadow: "0 2px 8px hsla(0, 0%, 0%, 0.1)",
                  }}
                >
                  <card.Icon className="h-4 w-4" style={{ color: card.iconColor }} />
                </div>
                <div className="relative z-10">
                  <p className="text-[11px] font-medium mb-1" style={{ color: "hsla(0, 0%, 100%, 0.9)" }}>
                    {card.label}
                  </p>
                  <p className="text-lg font-extrabold" style={{ color: "white" }}>
                    {card.value}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <h2 className="text-sm font-bold mb-3" style={{ color: "hsl(250, 40%, 20%)" }}>המלצות לשיפור</h2>
          <div className="space-y-3 pb-32">
            {extendedRecs.map((rec) => (
              <div key={rec.id} className="rounded-xl p-4 flex items-center gap-4" style={{ background: "white", boxShadow: "0 2px 12px rgba(100, 80, 180, 0.06)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "hsl(250, 50%, 95%)" }}>
                  {recIcons[rec.icon]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm font-bold" style={{ color: "hsl(250, 40%, 20%)" }}>{rec.title}</h3>
                    <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full" style={{ background: criticalityConfig[rec.criticality].bg, color: criticalityConfig[rec.criticality].color }}>
                      {criticalityConfig[rec.criticality].label}
                    </span>
                  </div>
                  <p className="text-[11px]" style={{ color: "hsl(230, 15%, 55%)" }}>
                    {rec.description}
                    {rec.saving && <span className="font-bold" style={{ color: "hsl(290, 70%, 55%)" }}> • {rec.saving}</span>}
                  </p>
                </div>
                <button className="text-xs font-medium py-2 rounded-lg flex-shrink-0 transition-all w-20 text-center" style={{ background: "linear-gradient(135deg, hsl(285, 75%, 62%), hsl(310, 70%, 55%))", color: "white", boxShadow: "0 4px 12px hsla(295, 70%, 50%, 0.38)" }}>
                  {rec.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "income" && (
        <div className="relative z-10 px-5 pb-32">
          <div className="flex items-center justify-between mb-4">
            <div className="rounded-2xl p-4 flex-1" style={{ background: "white", boxShadow: "0 4px 24px rgba(100,80,180,0.08)" }}>
              <p className="text-xs" style={{ color: "hsl(230,15%,55%)" }}>סה״כ הכנסות חודשיות</p>
              <p className="text-2xl font-extrabold mt-1" style={{ color: "hsl(250,40%,20%)" }}>
                ₪{incomeItems.reduce((s, i) => s + i.amount, 0).toLocaleString("he-IL")}
              </p>
            </div>
            <button className="w-10 h-10 rounded-xl flex items-center justify-center mr-3 flex-shrink-0 transition-all hover:scale-105 active:scale-95" style={{ background: "linear-gradient(135deg, hsl(285, 75%, 62%), hsl(310, 70%, 55%))", boxShadow: "0 4px 12px hsla(295, 70%, 50%, 0.38)" }}>
              <Plus className="h-5 w-5" style={{ color: "white" }} />
            </button>
          </div>
          <div className="space-y-2">
            {incomeItems.map((item, i) => (
              <div key={i} className="rounded-xl p-4 flex justify-between items-center" style={{ background: "white", boxShadow: "0 2px 8px rgba(100,80,180,0.05)" }}>
                <span className="text-sm" style={{ color: "hsl(250,40%,20%)" }}>{item.label}</span>
                <span className="text-sm font-bold" style={{ color: "hsl(250,60%,55%)" }}>₪{item.amount.toLocaleString("he-IL")}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "expenses" && (
        <div className="relative z-10 px-5 pb-32">
          <div className="flex items-center justify-between mb-4">
            <div className="rounded-2xl p-4 flex-1" style={{ background: "white", boxShadow: "0 4px 24px rgba(100,80,180,0.08)" }}>
              <p className="text-xs" style={{ color: "hsl(230,15%,55%)" }}>סה״כ הוצאות חודשיות</p>
              <p className="text-2xl font-extrabold mt-1" style={{ color: "hsl(250,40%,20%)" }}>
                ₪{expenseItems.reduce((s, i) => s + i.amount, 0).toLocaleString("he-IL")}
              </p>
            </div>
            <button className="w-10 h-10 rounded-xl flex items-center justify-center mr-3 flex-shrink-0 transition-all hover:scale-105 active:scale-95" style={{ background: "linear-gradient(135deg, hsl(285, 75%, 62%), hsl(310, 70%, 55%))", boxShadow: "0 4px 12px hsla(295, 70%, 50%, 0.38)" }}>
              <Plus className="h-5 w-5" style={{ color: "white" }} />
            </button>
          </div>
          <div className="space-y-2">
            {expenseItems.map((item, i) => (
              <div key={i} className="rounded-xl p-4 flex justify-between items-center" style={{ background: "white", boxShadow: "0 2px 8px rgba(100,80,180,0.05)" }}>
                <span className="text-sm" style={{ color: "hsl(250,40%,20%)" }}>{item.label}</span>
                <span className="text-sm font-bold" style={{ color: "hsl(0,60%,50%)" }}>₪{item.amount.toLocaleString("he-IL")}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "insurance" && (
        <div className="relative z-10 px-5 pb-32">
          <div className="flex items-center justify-end mb-4">
            <button className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all hover:scale-105 active:scale-95" style={{ background: "linear-gradient(135deg, hsl(285, 75%, 62%), hsl(310, 70%, 55%))", boxShadow: "0 4px 12px hsla(295, 70%, 50%, 0.38)" }}>
              <Plus className="h-5 w-5" style={{ color: "white" }} />
            </button>
          </div>
          <div className="space-y-2">
            {insuranceItems.map((item, i) => (
              <div key={i} className="rounded-xl p-4 flex justify-between items-center" style={{ background: "white", boxShadow: "0 2px 8px rgba(100,80,180,0.05)" }}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: item.status === "פעיל" ? "hsl(150,60%,45%)" : "hsl(30,80%,55%)" }} />
                  <span className="text-sm" style={{ color: "hsl(250,40%,20%)" }}>{item.label}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs" style={{ color: "hsl(230,15%,55%)" }}>{item.coverage}</span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: item.status === "פעיל" ? "hsl(150,50%,93%)" : "hsl(30,70%,93%)", color: item.status === "פעיל" ? "hsl(150,50%,35%)" : "hsl(30,60%,40%)" }}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Chat Bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-40 px-4 pb-4 pointer-events-none" dir="rtl">
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
          {/* Avatar — pinned to right (start in RTL), floating */}
          <span
            className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 relative"
            style={{
              boxShadow:
                "0 6px 20px hsla(295, 70%, 45%, 0.35), 0 0 0 2px white, 0 0 0 3px hsla(290, 70%, 55%, 0.4)",
              transform: "translateY(-2px)",
            }}
          >
            <img src={advisorImg} alt="Finansee AI" className="w-full h-full object-cover" />
          </span>

          {/* Placeholder text — right-aligned */}
          <span className="flex-1 text-start text-sm" style={{ color: "hsl(230, 15%, 55%)" }}>
            שאל את Finansee AI
          </span>

          {/* Mic button */}
          <span
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "hsl(230, 25%, 96%)", border: "1px solid hsl(230, 20%, 90%)" }}
          >
            <Mic className="h-4 w-4" style={{ color: "hsl(230, 15%, 45%)" }} />
          </span>

          {/* Send button — left edge */}
          <span
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, hsl(285, 75%, 62%), hsl(310, 70%, 55%))",
              boxShadow: "0 4px 12px hsla(295, 70%, 50%, 0.38)",
            }}
          >
            <Send className="h-4 w-4 -rotate-90" style={{ color: "white" }} />
          </span>
        </button>
      </div>

      {/* Insights Sheet */}
      <InsightsSheet open={chatOpen} onOpenChange={setChatOpen} />
      <MenuDrawer open={menuOpen} onOpenChange={setMenuOpen} />
    </div>
  );
};

export default IndexB;
