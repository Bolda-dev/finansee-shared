import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TrendingUp, TrendingDown, Shield, Home, Plus, Calendar, HelpCircle, Menu } from "lucide-react";
import { userData, recommendations, criticalityConfig } from "@/lib/data";
import { ChatBot } from "@/components/ChatBot";
import { MenuDrawer } from "@/components/MenuDrawer";

const formatCurrency = (n: number) =>
  "₪" + n.toLocaleString("he-IL");

const Index = () => {
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [autoTooltip, setAutoTooltip] = useState(false);
  const [waveIndex, setWaveIndex] = useState(-1);
  const progressPercent = (userData.currentPotential / userData.maxPotential) * 100;

  // Auto tooltip on mount — show for 4 seconds
  useEffect(() => {
    const showTimer = setTimeout(() => setAutoTooltip(true), 500);
    const hideTimer = setTimeout(() => setAutoTooltip(false), 4500);
    return () => { clearTimeout(showTimer); clearTimeout(hideTimer); };
  }, []);

  // Wave animation every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Animate cards 0, 1, 2 sequentially with 200ms delay
      [0, 1, 2].forEach((i) => {
        setTimeout(() => setWaveIndex(i), i * 200);
      });
      setTimeout(() => setWaveIndex(-1), 800);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const summaryCards = [
    { label: "הכנסות", amount: "₪38,000", sub: "לחודש", icon: TrendingUp, color: "from-emerald-500 to-emerald-600", route: "/income" },
    { label: "הוצאות", amount: "₪18,000", sub: "לחודש", icon: TrendingDown, color: "from-orange-500 to-orange-600", route: "/expenses" },
    { label: "ביטוחים", amount: "5 פוליסות", sub: "סטטוס כללי", icon: Shield, color: "from-blue-500 to-blue-600", route: "/insurance", badge: 1 },
  ];

  const recIcons: Record<string, React.ReactNode> = {
    Home: <Home className="h-5 w-5" />,
    Plus: <Plus className="h-5 w-5" />,
    Calendar: <Calendar className="h-5 w-5" />,
    Shield: <Shield className="h-5 w-5" />,
    TrendingUp: <TrendingUp className="h-5 w-5" />,
  };

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto relative" dir="rtl">
      {/* Header - Purple-Blue Gradient */}
      <div
        className="px-5 pt-12 pb-8 text-white"
        style={{
          background: "linear-gradient(135deg, hsl(240, 15%, 10%) 0%, hsl(265, 30%, 18%) 35%, hsl(255, 25%, 15%) 55%, hsl(250, 20%, 12%) 75%, hsl(230, 15%, 8%) 100%)",
        }}
      >
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setMenuOpen(true)} className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/15 hover:bg-white/25 transition-all hover:scale-105 active:scale-95 flex-shrink-0">
            <Menu className="h-5 w-5 text-white" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">היי {userData.name}! 👋</h1>
            <p className="text-sm opacity-80 mt-1">
              {new Date().toLocaleDateString("he-IL", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
        </div>

        <div className="mb-2 relative">
          <p className="text-4xl font-extrabold tracking-tight animate-fade-in">
            {formatCurrency(userData.currentPotential)}
          </p>
        </div>

        <div className="mt-5">
          <div className="flex justify-between text-xs opacity-80 mb-2">
            <div className="flex items-center gap-1.5">
              <span>הפוטנציאל הכספי שלך</span>
              <div className="relative">
                <button
                  onClick={() => setShowTooltip((v) => !v)}
                  className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <HelpCircle className="h-3 w-3 text-white/90" />
                </button>
                <div
                  className={`absolute top-full right-0 mt-2 w-56 bg-white text-foreground text-xs rounded-xl p-3 shadow-lg z-50 transition-all duration-500 ${
                    showTooltip || autoTooltip
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-1 pointer-events-none"
                  }`}
                >
                  הפוטנציאל הכספי שלך מחושב על בסיס הנכסים, ההכנסות וההשקעות שלך — ומראה כמה אתה יכול להרוויח עם ניהול פיננסי מיטבי 🚀
                </div>
              </div>
            </div>
            <span>{formatCurrency(userData.maxPotential)}</span>
          </div>
          <div className="h-3 rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${progressPercent}%`,
                background: "linear-gradient(90deg, hsl(160, 70%, 50%), hsl(120, 60%, 55%))",
              }}
            />
          </div>
          <p className="text-xs opacity-80 mt-2 text-center">
            ניתן לשפר ב-{formatCurrency(userData.improvementAmount)} נוספים 🚀
          </p>
        </div>
      </div>

      {/* Floating Summary Cards - overlapping header */}
      <div className="px-5 -mt-6 relative z-10">
        <div className="bg-card rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-4 border border-border/50">
          <div className="grid grid-cols-3 gap-3">
            {summaryCards.map((card, idx) => (
              <button
                key={card.label}
                onClick={() => navigate(card.route)}
                className="text-center transition-transform relative"
                style={{
                  transform: waveIndex === idx ? "translateY(-4px) scale(1.05)" : "translateY(0) scale(1)",
                  transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                {(card as any).badge && (
                  <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center shadow-sm z-10">
                    {(card as any).badge}
                  </span>
                )}
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mx-auto mb-2 shadow-lg`}
                >
                  <card.icon className="h-5 w-5 text-white" />
                </div>
                <p className="text-[11px] text-muted-foreground">{card.label}</p>
                <p className="text-sm font-bold text-card-foreground">{card.amount}</p>
                <p className="text-[10px] text-muted-foreground">{card.sub}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="px-5 mt-6">
        {/* Recommendations */}
        <h2 className="text-base font-bold text-foreground mb-3">המלצות לשיפור</h2>
        <div className="flex gap-3 overflow-x-auto pb-6 -mx-5 px-5 scrollbar-hide">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="min-w-[70%] max-w-[70%] h-[220px] bg-card rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-border/50 flex-shrink-0 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                  {recIcons[rec.icon]}
                </div>
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    background: criticalityConfig[rec.criticality].bg,
                    color: criticalityConfig[rec.criticality].color,
                  }}
                >
                  {criticalityConfig[rec.criticality].label}
                </span>
              </div>
              <h3 className="text-sm font-bold text-card-foreground">{rec.title}</h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{rec.description}</p>
              {rec.saving && (
                <p className="text-sm font-bold mt-1" style={{ color: "hsl(152, 60%, 40%)" }}>{rec.saving}</p>
              )}
              <div className="mt-auto pt-3">
                <button
                  className="w-full text-sm font-medium py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, hsl(152, 60%, 40%), hsl(140, 55%, 35%))",
                    color: "white",
                  }}
                >
                  {rec.action}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chatbot FAB */}
      <ChatBot open={chatOpen} onOpenChange={setChatOpen} />
      <MenuDrawer open={menuOpen} onOpenChange={setMenuOpen} />
    </div>
  );
};

export default Index;
