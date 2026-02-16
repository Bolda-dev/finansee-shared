import { useState } from "react";
import { MessageCircle, X, Send, Home, PiggyBank, Shield, TrendingUp } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { chatCategories } from "@/lib/data";
import advisorImg from "@/assets/advisor-avatar.jpg";

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="h-4 w-4" />,
  PiggyBank: <PiggyBank className="h-4 w-4" />,
  Shield: <Shield className="h-4 w-4" />,
  TrendingUp: <TrendingUp className="h-4 w-4" />,
};

interface ChatBotProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant?: "default" | "centered";
}

interface Message {
  role: "user" | "bot";
  text: string;
}

export function ChatBot({ open, onOpenChange, variant = "default" }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [inputText, setInputText] = useState("");

  const handleQuestionClick = (q: string, a: string) => {
    setMessages((prev) => [...prev, { role: "user", text: q }, { role: "bot", text: a }]);
  };

  const handleFreeText = () => {
    if (!inputText.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", text: inputText },
      { role: "bot", text: "תודה על השאלה! פיצ'ר זה יהיה זמין בקרוב 🚀" },
    ]);
    setInputText("");
  };

  const activeCategory = chatCategories.find((c) => c.name === selectedCategory);

  return (
    <>
      {/* FAB */}
      {variant === "centered" ? (
        <button
          onClick={() => onOpenChange(true)}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-transform hover:scale-105"
        >
          <img
            src={advisorImg}
            alt="יועצת"
            className="w-16 h-16 rounded-full border-4 object-cover animate-bounce"
            style={{
              borderColor: "hsl(250, 60%, 55%)",
              boxShadow: "0 6px 24px hsla(250, 60%, 45%, 0.4)",
              animationDuration: "3s",
              animationIterationCount: "infinite",
            }}
          />
        </button>
      ) : (
        <button
          onClick={() => onOpenChange(true)}
          className="fixed bottom-6 left-6 z-40 flex items-center gap-2 rounded-full shadow-lg px-4 py-3 transition-transform hover:scale-105"
          style={{
            background: "linear-gradient(135deg, hsl(262, 60%, 45%), hsl(220, 70%, 40%))",
          }}
        >
          <img src={advisorImg} alt="יועצת" className="w-8 h-8 rounded-full border-2 border-white/50 object-cover" />
          <span className="text-white text-sm font-medium">אני כאן לעזור!</span>
        </button>
      )}

      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl p-0" dir="rtl">
          <SheetHeader className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <img src={advisorImg} alt="יועצת" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <SheetTitle className="text-base">היועצת שלך</SheetTitle>
                <p className="text-xs text-muted-foreground">מוכנה לענות על כל שאלה</p>
              </div>
            </div>
          </SheetHeader>

          <ScrollArea className="flex-1 h-[calc(80vh-140px)]">
            <div className="p-4 space-y-4">
              {/* Messages */}
              {messages.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground">בחר/י קטגוריה כדי להתחיל 👇</p>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.role === "user"
                        ? "bg-secondary text-secondary-foreground"
                        : "text-white"
                    }`}
                    style={msg.role === "bot" ? { background: "linear-gradient(135deg, hsl(262, 60%, 45%), hsl(220, 70%, 40%))" } : undefined}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Categories */}
              {!selectedCategory && (
                <div className="grid grid-cols-2 gap-2">
                  {chatCategories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className="flex items-center gap-2 bg-secondary rounded-xl p-3 text-sm font-medium text-secondary-foreground hover:bg-accent transition-colors"
                    >
                      {iconMap[cat.icon]}
                      {cat.name}
                    </button>
                  ))}
                </div>
              )}

              {/* Questions */}
              {activeCategory && (
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="text-xs text-muted-foreground underline mb-2"
                  >
                    ← חזרה לקטגוריות
                  </button>
                  {activeCategory.questions.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuestionClick(item.q, item.a)}
                      className="w-full text-right bg-secondary rounded-xl p-3 text-sm text-secondary-foreground hover:bg-accent transition-colors"
                    >
                      {item.q}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-3 border-t border-border flex gap-2">
            <input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleFreeText()}
              placeholder="כתוב/י שאלה..."
              className="flex-1 rounded-full bg-secondary px-4 py-2 text-sm text-secondary-foreground placeholder:text-muted-foreground outline-none"
              dir="rtl"
            />
            <button
              onClick={handleFreeText}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white"
              style={{ background: "linear-gradient(135deg, hsl(262, 60%, 45%), hsl(220, 70%, 40%))" }}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
