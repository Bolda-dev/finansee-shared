import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TrendingUp, TrendingDown, Shield, Home, Plus, Calendar, MessageCircle } from "lucide-react";
import { userData, recommendations } from "@/lib/data";
import { Progress } from "@/components/ui/progress";
import { ChatBot } from "@/components/ChatBot";

const formatCurrency = (n: number) =>
  "₪" + n.toLocaleString("he-IL");

const Index = () => {
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  const progressPercent = (userData.currentPotential / userData.maxPotential) * 100;

  const summaryCards = [
    { label: "הכנסות", amount: "₪38,000", sub: "לחודש", icon: TrendingUp, color: "from-emerald-500 to-emerald-600", route: "/income" },
    { label: "הוצאות", amount: "₪18,000", sub: "לחודש", icon: TrendingDown, color: "from-orange-500 to-orange-600", route: "/expenses" },
    { label: "ביטוחים", amount: "5 פוליסות", sub: "סטטוס כללי", icon: Shield, color: "from-blue-500 to-blue-600", route: "/insurance" },
  ];

  const recIcons: Record<string, React.ReactNode> = {
    Home: <Home className="h-5 w-5" />,
    Plus: <Plus className="h-5 w-5" />,
    Calendar: <Calendar className="h-5 w-5" />,
  };

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto relative" dir="rtl">
      {/* Header - Purple-Blue Gradient */}
      <div
        className="px-5 pt-12 pb-8 text-white"
        style={{
          background: "linear-gradient(135deg, hsl(262, 60%, 35%) 0%, hsl(220, 70%, 30%) 50%, hsl(210, 80%, 25%) 100%)",
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">היי {userData.name}! 👋</h1>
            <p className="text-sm opacity-80 mt-1">
              {new Date().toLocaleDateString("he-IL", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
        </div>

        <div className="mb-2">
          <p className="text-sm opacity-80 mb-1">הפוטנציאל הכספי שלך</p>
          <p className="text-4xl font-extrabold tracking-tight animate-fade-in">
            {formatCurrency(userData.currentPotential)}
          </p>
        </div>

        <div className="mt-5">
          <div className="flex justify-between text-xs opacity-80 mb-2">
            <span>מצב נוכחי</span>
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

      {/* Bottom Section */}
      <div className="px-5 -mt-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {summaryCards.map((card) => (
            <button
              key={card.label}
              onClick={() => navigate(card.route)}
              className="bg-card rounded-xl p-3 shadow-md border border-border text-center hover:shadow-lg transition-shadow"
            >
              <div
                className={`w-10 h-10 rounded-full bg-gradient-to-br ${card.color} flex items-center justify-center mx-auto mb-2`}
              >
                <card.icon className="h-5 w-5 text-white" />
              </div>
              <p className="text-xs text-muted-foreground">{card.label}</p>
              <p className="text-sm font-bold text-card-foreground">{card.amount}</p>
              <p className="text-[10px] text-muted-foreground">{card.sub}</p>
            </button>
          ))}
        </div>

        {/* Recommendations */}
        <h2 className="text-base font-bold text-foreground mb-3">המלצות לשיפור</h2>
        <div className="flex gap-3 overflow-x-auto pb-4 -mx-5 px-5 scrollbar-hide">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="min-w-[200px] bg-card rounded-xl p-4 shadow-md border border-border flex-shrink-0"
            >
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mb-3">
                {recIcons[rec.icon]}
              </div>
              <h3 className="text-sm font-bold text-card-foreground">{rec.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{rec.description}</p>
              {rec.saving && (
                <p className="text-sm font-bold text-emerald-600 mt-1">{rec.saving}</p>
              )}
              <button
                className="mt-3 w-full text-sm font-medium py-2 rounded-lg transition-colors"
                style={{
                  background: "linear-gradient(135deg, hsl(262, 60%, 45%), hsl(220, 70%, 40%))",
                  color: "white",
                }}
              >
                {rec.action}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Chatbot FAB */}
      <ChatBot open={chatOpen} onOpenChange={setChatOpen} />
    </div>
  );
};

export default Index;
