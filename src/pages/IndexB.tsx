import { useState } from "react";
import { TrendingUp, TrendingDown, Shield, Home, Plus, Calendar, BarChart3, Wallet, ShieldCheck } from "lucide-react";
import { userData, recommendations, incomeItems, expenseItems, insuranceItems, criticalityConfig } from "@/lib/data";
import { ChatBot } from "@/components/ChatBot";
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
        <text x="100" y="88" textAnchor="middle" className="text-[11px]" fill="hsl(230, 20%, 55%)" fontFamily="inherit">הפוטנציאל שלך</text>
        <text x="100" y="115" textAnchor="middle" fill="hsl(250, 40%, 25%)" fontFamily="inherit" fontSize="18" fontWeight="800">{formatCurrency(current)}</text>
        <text x="100" y="138" textAnchor="middle" className="text-[10px]" fill="hsl(230, 20%, 65%)" fontFamily="inherit" fontSize="10">מתוך {formatCurrency(max)}</text>
      </svg>
    </div>
  );
};

const IndexB = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"status" | "income" | "expenses" | "insurance">("status");
  const progressPercent = (userData.currentPotential / userData.maxPotential) * 100;

  const navItems = [
    { key: "status" as const, label: "סטטוס", icon: BarChart3 },
    { key: "income" as const, label: "הכנסות", icon: TrendingUp },
    { key: "expenses" as const, label: "הוצאות", icon: Wallet },
    { key: "insurance" as const, label: "ביטוחים", icon: ShieldCheck },
  ];

  const recIcons: Record<string, React.ReactNode> = {
    Home: <Home className="h-4 w-4" style={{ color: "hsl(250, 60%, 55%)" }} />,
    Plus: <Plus className="h-4 w-4" style={{ color: "hsl(250, 60%, 55%)" }} />,
    Calendar: <Calendar className="h-4 w-4" style={{ color: "hsl(250, 60%, 55%)" }} />,
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
      {/* Nature background - screen level */}
      <div className="absolute inset-x-0 top-0 h-[420px] z-0 overflow-hidden">
        <img src={natureBg} alt="" className="w-full h-full object-cover scale-110" />
        {/* Gradient fade overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, transparent 30%, hsl(235, 30%, 97%) 100%)",
          }}
        />
      </div>

      {/* Header */}
      <div className="relative z-10 px-5 pt-12 pb-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-xs" style={{ color: "hsla(0, 0%, 100%, 0.75)" }}>שלום,</p>
            <h1 className="text-xl font-bold" style={{ color: "white" }}>{userData.name} 👋</h1>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "status" && (
        <div className="relative z-10 px-5">
          {/* Glass card */}
          <div
            className="rounded-2xl p-5 mb-5"
            style={{
              background: "hsla(250, 40%, 99%, 0.55)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              border: "1px solid hsla(250, 50%, 92%, 0.5)",
              boxShadow: "0 4px 24px rgba(100, 80, 180, 0.1)",
            }}
          >
            <RadialGauge percent={progressPercent} current={userData.currentPotential} max={userData.maxPotential} />
            <div
              className="text-center py-3.5 px-5 rounded-xl mt-2"
              style={{
                background: "hsla(250, 50%, 96%, 0.45)",
                border: "1px solid hsla(250, 50%, 90%, 0.3)",
              }}
            >
              <p className="text-sm font-bold mb-1" style={{ color: "hsl(250, 50%, 35%)" }}>
                💡 ניתן לשפר ב-{formatCurrency(userData.improvementAmount)} נוספים
              </p>
              <p className="text-[11px] leading-relaxed" style={{ color: "hsl(250, 30%, 45%)" }}>
                על בסיס ניתוח ההכנסות, ההוצאות והביטוחים שלך — זיהינו הזדמנויות לחיסכון ולהגדלת התשואה. לחץ על ההמלצות למטה כדי להתחיל 🚀
              </p>
            </div>
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
                    {rec.saving && <span className="font-bold" style={{ color: "hsl(250, 60%, 55%)" }}> • {rec.saving}</span>}
                  </p>
                </div>
                <button className="text-xs font-medium py-2 rounded-lg flex-shrink-0 transition-all w-20 text-center" style={{ background: "linear-gradient(135deg, hsl(250, 65%, 55%), hsl(220, 70%, 55%))", color: "white", boxShadow: "0 4px 12px hsla(250, 60%, 50%, 0.3)" }}>
                  {rec.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "income" && (
        <div className="px-5 pb-32">
          <div className="rounded-2xl p-4 mb-4" style={{ background: "white", boxShadow: "0 4px 24px rgba(100,80,180,0.08)" }}>
            <p className="text-xs" style={{ color: "hsl(230,15%,55%)" }}>סה״כ הכנסות חודשיות</p>
            <p className="text-2xl font-extrabold mt-1" style={{ color: "hsl(250,40%,20%)" }}>
              ₪{incomeItems.reduce((s, i) => s + i.amount, 0).toLocaleString("he-IL")}
            </p>
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
        <div className="px-5 pb-32">
          <div className="rounded-2xl p-4 mb-4" style={{ background: "white", boxShadow: "0 4px 24px rgba(100,80,180,0.08)" }}>
            <p className="text-xs" style={{ color: "hsl(230,15%,55%)" }}>סה״כ הוצאות חודשיות</p>
            <p className="text-2xl font-extrabold mt-1" style={{ color: "hsl(250,40%,20%)" }}>
              ₪{expenseItems.reduce((s, i) => s + i.amount, 0).toLocaleString("he-IL")}
            </p>
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
        <div className="px-5 pb-32">
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

      {/* Bottom Navigation - Glass Capsule with Center Notch */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-40 px-4 pb-4">
        <div
          className="relative flex items-end justify-center"
        >
          {/* Center Chat Button - raised above the bar with bounce */}
          <button
            onClick={() => setChatOpen(true)}
            className="absolute -top-5 left-1/2 -translate-x-1/2 z-10 transition-transform hover:scale-105 active:scale-95 animate-bounce"
            style={{ animationDuration: "3s", animationIterationCount: "infinite" }}
          >
            <div
              className="w-[60px] h-[60px] rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, hsl(250, 65%, 55%), hsl(220, 70%, 55%))",
                boxShadow: "0 6px 24px hsla(250, 60%, 45%, 0.4), 0 0 0 4px hsla(235, 30%, 97%, 0.8)",
              }}
            >
              <img
                src={advisorImg}
                alt="יועצת"
                className="w-[48px] h-[48px] rounded-full object-cover border-2"
                style={{ borderColor: "hsla(0, 0%, 100%, 0.5)" }}
              />
            </div>
          </button>

          {/* Glass Capsule Bar */}
          <div
            className="w-full rounded-2xl flex items-center justify-between px-2 py-2"
            style={{
              background: "hsla(0, 0%, 100%, 0.65)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              border: "1px solid hsla(0, 0%, 100%, 0.5)",
              boxShadow: "0 8px 32px hsla(250, 30%, 30%, 0.12), 0 2px 8px hsla(250, 30%, 30%, 0.06)",
            }}
          >
            {/* Right side tabs (RTL: appear on right) */}
            <div className="flex items-center gap-1 flex-1 justify-around">
              {leftNav.map((item) => {
                const isActive = activeTab === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => setActiveTab(item.key)}
                    className="flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all"
                    style={{
                      background: isActive ? "hsla(250, 60%, 55%, 0.12)" : "transparent",
                    }}
                  >
                    <item.icon
                      className="h-5 w-5 transition-colors"
                      style={{
                        color: isActive ? "hsl(250, 60%, 55%)" : "hsl(230, 15%, 55%)",
                      }}
                    />
                    <span
                      className="text-[10px] font-medium transition-colors"
                      style={{
                        color: isActive ? "hsl(250, 60%, 55%)" : "hsl(230, 15%, 55%)",
                      }}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Spacer for center notch */}
            <div className="w-[72px] flex-shrink-0" />

            {/* Left side tabs (RTL: appear on left) */}
            <div className="flex items-center gap-1 flex-1 justify-around">
              {rightNav.map((item) => {
                const isActive = activeTab === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => setActiveTab(item.key)}
                    className="flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all"
                    style={{
                      background: isActive ? "hsla(250, 60%, 55%, 0.12)" : "transparent",
                    }}
                  >
                    <item.icon
                      className="h-5 w-5 transition-colors"
                      style={{
                        color: isActive ? "hsl(250, 60%, 55%)" : "hsl(230, 15%, 55%)",
                      }}
                    />
                    <span
                      className="text-[10px] font-medium transition-colors"
                      style={{
                        color: isActive ? "hsl(250, 60%, 55%)" : "hsl(230, 15%, 55%)",
                      }}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot - no FAB, opened from nav */}
      <ChatBot open={chatOpen} onOpenChange={setChatOpen} variant="no-fab" />
    </div>
  );
};

export default IndexB;
