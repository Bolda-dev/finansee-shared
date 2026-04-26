import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Shield, Home, Plus, Calendar, BarChart3, Wallet, ShieldCheck, Menu, Info, Send, Mic, ChevronLeft, PiggyBank, Landmark, Briefcase, CreditCard, Building2, LineChart, Sparkles, MessageCircle } from "lucide-react";
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
            <stop offset="0%" stopColor="hsl(265, 60%, 35%)" />
            <stop offset="100%" stopColor="hsl(290, 70%, 60%)" />
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
  const [danaBubbleOpen, setDanaBubbleOpen] = useState(false);
  const progressPercent = (userData.currentPotential / userData.maxPotential) * 100;

  // Pop the proactive Dana bubble after 5 seconds on the screen
  useEffect(() => {
    if (activeTab !== "status") return;
    const t = setTimeout(() => setDanaBubbleOpen(true), 5000);
    return () => clearTimeout(t);
  }, [activeTab]);

  const navItems = [
    { key: "status" as const, label: "בית", icon: Home },
    { key: "income" as const, label: "הכנסות", icon: TrendingUp },
    { key: "expenses" as const, label: "הוצאות", icon: Wallet },
    { key: "insurance" as const, label: "ביטוחים", icon: ShieldCheck },
  ];

  const recIcons: Record<string, React.ReactNode> = {
    Home: <Home className="h-4 w-4" style={{ color: "hsl(275, 65%, 50%)" }} />,
    Plus: <Plus className="h-4 w-4" style={{ color: "hsl(275, 65%, 50%)" }} />,
    Calendar: <Calendar className="h-4 w-4" style={{ color: "hsl(275, 65%, 50%)" }} />,
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
                  color: "hsl(275, 65%, 45%)",
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
                gradient: "linear-gradient(135deg, hsl(195, 75%, 35%) 0%, hsl(195, 80%, 55%) 60%, hsl(190, 85%, 70%) 100%)",
                shadow: "0 8px 24px hsla(195, 70%, 35%, 0.4)",
                iconColor: "hsl(195, 80%, 40%)",
                ripple: { cx: 18, cy: 130, radii: [22, 44, 70, 98, 130] },
              },
              {
                label: "התחייבויות",
                value: "₪1.37M",
                Icon: TrendingDown,
                gradient: "linear-gradient(135deg, hsl(20, 80%, 38%) 0%, hsl(28, 90%, 55%) 60%, hsl(38, 95%, 65%) 100%)",
                shadow: "0 8px 24px hsla(28, 80%, 35%, 0.4)",
                iconColor: "hsl(25, 85%, 45%)",
                ripple: { cx: 130, cy: 20, radii: [18, 38, 62, 92, 124] },
              },
              {
                label: "ביטוח",
                value: "5 פוליסות",
                Icon: ShieldCheck,
                gradient: "linear-gradient(135deg, hsl(265, 55%, 30%) 0%, hsl(280, 65%, 50%) 60%, hsl(290, 75%, 65%) 100%)",
                shadow: "0 8px 24px hsla(280, 60%, 30%, 0.42)",
                iconColor: "hsl(280, 65%, 45%)",
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
                      stroke="hsla(0, 0%, 100%, 0.06)"
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

          {/* Dana — Active Insights Card */}
          <div className="relative mb-6">
            {/* Proactive bubble — pops out of the card after 5s */}
            {danaBubbleOpen && (
              <div
                className="absolute z-30"
                style={{
                  right: "60px",
                  bottom: "calc(100% - 26px)",
                  transform: "rotate(-1.2deg)",
                  transformOrigin: "bottom right",
                }}
              >
                <button
                  onClick={() => {
                    setDanaBubbleOpen(false);
                    setChatOpen(true);
                  }}
                  className="text-right rounded-2xl rounded-br-sm px-3.5 py-2.5 flex items-start gap-2"
                  style={{
                    background: "white",
                    border: "1px solid hsl(230, 20%, 92%)",
                    boxShadow: "0 10px 28px hsla(250, 30%, 25%, 0.18), 0 2px 6px hsla(250, 30%, 25%, 0.08)",
                    animation: "bubble-pop 0.55s cubic-bezier(0.22, 1.4, 0.36, 1) both",
                    transformOrigin: "bottom right",
                    whiteSpace: "nowrap",
                  }}
                  aria-label="פתח את דנה"
                >
                  <span className="text-xs leading-snug" style={{ color: "hsl(250, 35%, 20%)" }}>
                    יש לך 3 פעולות חדשות להעלות את השווי נטו שלך :)
                  </span>
                </button>
              </div>
            )}

            <button
              onClick={() => setChatOpen(true)}
              className="relative w-full rounded-2xl p-4 text-start flex items-center gap-3 overflow-hidden transition-transform hover:scale-[1.01] active:scale-[0.99]"
              style={{
                background: "white",
                boxShadow: "0 4px 18px hsla(250, 30%, 25%, 0.08)",
                border: "1px solid hsl(230, 20%, 93%)",
              }}
            >
              {/* Avatar with rotating tri-color ring + badge */}
              <span className="relative flex-shrink-0">
                <span className="tri-ring relative w-12 h-12 rounded-full block">
                  <span className="block w-full h-full rounded-full overflow-hidden">
                    <img src={advisorImg} alt="דנה" className="w-full h-full object-cover" />
                  </span>
                </span>
                {/* Badge: 3 unread insights */}
                <span
                  className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                  style={{
                    background: "hsl(0, 78%, 55%)",
                  }}
                >
                  3
                </span>
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-bold" style={{ color: "hsl(250, 40%, 18%)" }}>
                    דנה — Finansee AI
                  </p>
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "hsl(150, 65%, 48%)", boxShadow: "0 0 0 3px hsla(150, 65%, 48%, 0.18)" }}
                  />
                </div>
                <p className="text-[11px] mt-0.5" style={{ color: "hsl(230, 15%, 50%)" }}>
                  תובנות פעילות מחכות לך
                </p>
              </div>

              <ChevronLeft className="h-4 w-4 flex-shrink-0" style={{ color: "hsl(230, 15%, 55%)" }} />
            </button>
          </div>

          {/* Financial Center */}
          <h2 className="text-sm font-bold mb-3" style={{ color: "hsl(250, 40%, 20%)" }}>מרכז פיננסי</h2>
          <div className="grid grid-cols-2 gap-3 pb-32">
            {[
              {
                label: "ביטוח", Icon: ShieldCheck, value: "₪1,642",
                sub: "/חודש", subLabel: "עלות ביטוח",
                accent: "hsl(280, 65%, 50%)", accentBg: "hsl(280, 60%, 95%)",
                badge: 1,
              },
              {
                label: "פנסיה", Icon: PiggyBank, value: "₪1,233,500",
                sub: "סך החיסכון", extra: "₪9,069", extraSub: "צפי קצבה חודשית",
                accent: "hsl(250, 65%, 55%)", accentBg: "hsl(250, 55%, 95%)",
              },
              {
                label: "השקעות", Icon: LineChart, value: "₪2,095,000",
                sub: "", subLabel: "",
                accent: "hsl(195, 80%, 45%)", accentBg: "hsl(195, 70%, 94%)",
                badge: 1,
              },
              {
                label: "חשבון עו״ש", Icon: CreditCard, value: "₪24,500",
                sub: "", subLabel: "יתרה שוטפת",
                accent: "hsl(220, 60%, 50%)", accentBg: "hsl(220, 55%, 95%)",
              },
              {
                label: "הלוואות", Icon: Briefcase, value: "₪320,000",
                sub: "סה״כ הלוואות", extra: "₪8,200", extraSub: "תשלום כולל", extraSuffix: "/חודש",
                accent: "hsl(265, 55%, 50%)", accentBg: "hsl(265, 50%, 95%)",
              },
              {
                label: "משכנתא", Icon: Building2, value: "₪1,110,000",
                sub: "3 משכנתאות פעילות", extra: "₪8,500", extraSub: "תשלום חודשי כולל", extraSuffix: "/חודש",
                accent: "hsl(28, 85%, 50%)", accentBg: "hsl(28, 80%, 94%)",
                badge: 1,
              },
            ].map((card) => (
              <button
                key={card.label}
                className="relative rounded-2xl p-3.5 text-start flex flex-col gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: "white",
                  boxShadow: "0 3px 14px hsla(250, 30%, 25%, 0.07)",
                  border: "1px solid hsl(230, 20%, 94%)",
                  minHeight: "150px",
                }}
              >
                {/* Top row: label (right) + icon (left) */}
                <div className="flex items-start justify-between">
                  <span className="text-xs font-semibold" style={{ color: "hsl(250, 35%, 25%)" }}>
                    {card.label}
                  </span>
                  <span className="relative">
                    <span
                      className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ background: card.accentBg }}
                    >
                      <card.Icon className="h-4 w-4" style={{ color: card.accent }} />
                    </span>
                    {card.badge && (
                      <span
                        className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                        style={{ background: "hsl(0, 78%, 55%)", border: "2px solid white" }}
                      >
                        {card.badge}
                      </span>
                    )}
                  </span>
                </div>

                {/* Main value */}
                <div className="flex items-baseline gap-1 flex-wrap">
                  <p className="text-base font-extrabold" style={{ color: "hsl(250, 45%, 14%)" }}>
                    {card.value}
                  </p>
                  {card.sub && !card.extra && (
                    <span className="text-[10px]" style={{ color: "hsl(230, 15%, 55%)" }}>
                      {card.sub}
                    </span>
                  )}
                </div>
                {card.subLabel && (
                  <p className="text-[10px] -mt-1" style={{ color: "hsl(230, 15%, 55%)" }}>
                    {card.subLabel}
                  </p>
                )}
                {card.sub && card.extra && (
                  <p className="text-[10px]" style={{ color: "hsl(230, 15%, 55%)" }}>{card.sub}</p>
                )}

                {/* Optional secondary metric with separator */}
                {card.extra && (
                  <div className="mt-auto pt-2 border-t" style={{ borderColor: "hsl(230, 20%, 94%)" }}>
                    <div className="flex items-baseline gap-1">
                      <p className="text-sm font-bold" style={{ color: "hsl(250, 40%, 22%)" }}>
                        {card.extra}
                      </p>
                      {card.extraSuffix && (
                        <span className="text-[10px]" style={{ color: "hsl(230, 15%, 55%)" }}>
                          {card.extraSuffix}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px]" style={{ color: "hsl(230, 15%, 55%)" }}>
                      {card.extraSub}
                    </p>
                  </div>
                )}

                {/* Bottom-left chevron pointing into the card */}
                <ChevronLeft className="absolute bottom-3 left-3 h-3.5 w-3.5" style={{ color: card.accent }} />
              </button>
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
            <button className="cta-tri w-10 h-10 rounded-xl flex items-center justify-center mr-3 flex-shrink-0 transition-all hover:scale-105 active:scale-95">
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
            <button className="cta-tri w-10 h-10 rounded-xl flex items-center justify-center mr-3 flex-shrink-0 transition-all hover:scale-105 active:scale-95">
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
            <button className="cta-tri w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all hover:scale-105 active:scale-95">
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
          {/* Avatar — pinned to right (start in RTL), floating, with rotating tri-color ring */}
          <span
            className="tri-ring relative w-11 h-11 rounded-full flex-shrink-0"
            style={{ transform: "translateY(-2px)" }}
          >
            <span className="block w-full h-full rounded-full overflow-hidden" style={{ boxShadow: "0 6px 20px hsla(250, 30%, 20%, 0.35)" }}>
              <img src={advisorImg} alt="Finansee AI" className="w-full h-full object-cover" />
            </span>
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

          {/* Send button — left edge, with rotating tri-color ring */}
          <span className="tri-ring relative w-9 h-9 rounded-full flex-shrink-0">
            <span
              className="flex w-full h-full rounded-full items-center justify-center cta-tri"
            >
              <Send className="h-4 w-4 -rotate-90" style={{ color: "white" }} />
            </span>
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
