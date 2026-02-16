import { useState } from "react";
import { TrendingUp, TrendingDown, Shield, Home, Plus, Calendar } from "lucide-react";
import { userData, recommendations, incomeItems, expenseItems, insuranceItems } from "@/lib/data";
import { ChatBot } from "@/components/ChatBot";

const formatCurrency = (n: number) =>
  "₪" + n.toLocaleString("he-IL");

const RadialGauge = ({ percent, current, max }: { percent: number; current: number; max: number }) => {
  const radius = 80;
  const stroke = 16;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * 0.75; // 270 degrees
  const offset = arcLength - (arcLength * percent) / 100;

  return (
    <div className="flex flex-col items-center">
      <svg width="200" height="180" viewBox="0 0 200 200">
        {/* Background arc */}
        <circle
          cx="100" cy="100" r={radius}
          fill="none"
          stroke="hsl(230, 30%, 92%)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeDashoffset={0}
          transform="rotate(135 100 100)"
        />
        {/* Foreground arc */}
        <circle
          cx="100" cy="100" r={radius}
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeDashoffset={offset}
          transform="rotate(135 100 100)"
          style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
        />
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(250, 70%, 60%)" />
            <stop offset="100%" stopColor="hsl(200, 80%, 55%)" />
          </linearGradient>
        </defs>
        {/* Center text */}
        <text x="100" y="88" textAnchor="middle" className="text-[11px]" fill="hsl(230, 20%, 55%)" fontFamily="inherit">
          הפוטנציאל שלך
        </text>
        <text x="100" y="115" textAnchor="middle" fill="hsl(250, 40%, 25%)" fontFamily="inherit" fontSize="18" fontWeight="800">
          {formatCurrency(current)}
        </text>
        <text x="100" y="138" textAnchor="middle" className="text-[10px]" fill="hsl(230, 20%, 65%)" fontFamily="inherit" fontSize="10">
          מתוך {formatCurrency(max)}
        </text>
      </svg>
    </div>
  );
};

const IndexB = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"status" | "income" | "expenses" | "insurance">("status");
  const progressPercent = (userData.currentPotential / userData.maxPotential) * 100;

  const tabs = [
    { key: "status" as const, label: "סטטוס" },
    { key: "income" as const, label: "הכנסות" },
    { key: "expenses" as const, label: "הוצאות" },
    { key: "insurance" as const, label: "ביטוחים" },
  ];

  const recIcons: Record<string, React.ReactNode> = {
    Home: <Home className="h-4 w-4" style={{ color: "hsl(250, 60%, 55%)" }} />,
    Plus: <Plus className="h-4 w-4" style={{ color: "hsl(250, 60%, 55%)" }} />,
    Calendar: <Calendar className="h-4 w-4" style={{ color: "hsl(250, 60%, 55%)" }} />,
  };

  const extendedRecs = [
    ...recommendations,
    { id: 4, title: "אופטימיזציה של ביטוחים", description: "ניתן לחסוך על ביטוחים קיימים", saving: "₪1,800/שנה", action: "בדוק עכשיו", icon: "Home" },
    { id: 5, title: "הגדלת הפקדות לפנסיה", description: "ניצול מלא של הטבות מס", saving: "₪5,000/שנה", action: "פרטים", icon: "Plus" },
  ];

  return (
    <div className="min-h-screen max-w-[430px] mx-auto relative" dir="rtl" style={{ background: "hsl(235, 30%, 97%)" }}>
      {/* Header */}
      <div className="px-5 pt-12 pb-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-xs" style={{ color: "hsl(230, 20%, 60%)" }}>שלום,</p>
            <h1 className="text-xl font-bold" style={{ color: "hsl(250, 40%, 20%)" }}>{userData.name} 👋</h1>
          </div>
        </div>

        {/* Subtle tabs */}
        <div className="flex gap-1 mt-4 p-1 rounded-xl" style={{ background: "hsl(230, 25%, 93%)" }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="flex-1 py-2 text-xs font-medium rounded-lg transition-all"
              style={{
                background: activeTab === tab.key ? "white" : "transparent",
                color: activeTab === tab.key ? "hsl(250, 50%, 40%)" : "hsl(230, 15%, 55%)",
                boxShadow: activeTab === tab.key ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "status" && (
        <div className="px-5">
          {/* Radial Gauge Card */}
          <div
            className="rounded-2xl p-5 mb-5"
            style={{
              background: "white",
              boxShadow: "0 4px 24px rgba(100, 80, 180, 0.08)",
            }}
          >
            <RadialGauge percent={progressPercent} current={userData.currentPotential} max={userData.maxPotential} />
            <div
              className="text-center py-2.5 px-4 rounded-xl mt-2"
              style={{ background: "hsl(250, 50%, 97%)" }}
            >
              <p className="text-xs" style={{ color: "hsl(250, 40%, 50%)" }}>
                ניתן לשפר ב-<span className="font-bold">{formatCurrency(userData.improvementAmount)}</span> נוספים 🚀
              </p>
            </div>
          </div>

          {/* Recommendations */}
          <h2 className="text-sm font-bold mb-3" style={{ color: "hsl(250, 40%, 20%)" }}>המלצות לשיפור</h2>
          <div className="space-y-3 pb-28">
            {extendedRecs.map((rec) => (
              <div
                key={rec.id}
                className="rounded-xl p-4 flex items-center gap-4"
                style={{
                  background: "white",
                  boxShadow: "0 2px 12px rgba(100, 80, 180, 0.06)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "hsl(250, 50%, 95%)" }}
                >
                  {recIcons[rec.icon]}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold" style={{ color: "hsl(250, 40%, 20%)" }}>{rec.title}</h3>
                  <p className="text-[11px]" style={{ color: "hsl(230, 15%, 55%)" }}>
                    {rec.description}
                    {rec.saving && <span className="font-bold" style={{ color: "hsl(250, 60%, 55%)" }}> • {rec.saving}</span>}
                  </p>
                </div>
                <button
                  className="text-xs font-medium py-2 px-4 rounded-lg flex-shrink-0 transition-all"
                  style={{
                    background: "linear-gradient(135deg, hsl(250, 65%, 55%), hsl(220, 70%, 55%))",
                    color: "white",
                    boxShadow: "0 4px 12px hsla(250, 60%, 50%, 0.3)",
                  }}
                >
                  {rec.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "income" && (
        <div className="px-5 pb-28">
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
        <div className="px-5 pb-28">
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
        <div className="px-5 pb-28">
          <div className="space-y-2">
            {insuranceItems.map((item, i) => (
              <div key={i} className="rounded-xl p-4 flex justify-between items-center" style={{ background: "white", boxShadow: "0 2px 8px rgba(100,80,180,0.05)" }}>
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: item.status === "פעיל" ? "hsl(150,60%,45%)" : "hsl(30,80%,55%)" }}
                  />
                  <span className="text-sm" style={{ color: "hsl(250,40%,20%)" }}>{item.label}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs" style={{ color: "hsl(230,15%,55%)" }}>{item.coverage}</span>
                  <span
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                    style={{
                      background: item.status === "פעיל" ? "hsl(150,50%,93%)" : "hsl(30,70%,93%)",
                      color: item.status === "פעיל" ? "hsl(150,50%,35%)" : "hsl(30,60%,40%)",
                    }}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chatbot - centered bottom */}
      <ChatBot open={chatOpen} onOpenChange={setChatOpen} variant="centered" />
    </div>
  );
};

export default IndexB;
