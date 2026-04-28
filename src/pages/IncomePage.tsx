import { useNavigate } from "react-router-dom";
import { ArrowRight, Plus } from "lucide-react";
import { incomeItems } from "@/lib/data";

const IncomePage = () => {
  const navigate = useNavigate();
  const total = incomeItems.reduce((s, i) => s + i.amount, 0);

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto" dir="rtl">
      <div
        className="px-5 pt-12 pb-6 text-white"
        style={{ background: "linear-gradient(135deg, hsl(160, 60%, 35%), hsl(140, 50%, 30%))" }}
      >
        <button onClick={() => navigate("/")} className="flex items-center gap-1 text-sm opacity-80 mb-4">
          <ArrowRight className="h-4 w-4" /> חזרה
        </button>
        <h1 className="text-2xl font-bold text-primary">הכנסות</h1>
        <p className="text-3xl font-extrabold mt-2">₪{total.toLocaleString("he-IL")}<span className="text-sm font-normal opacity-80"> /חודש</span></p>
      </div>
      <div className="px-5 py-4 space-y-3">
        {incomeItems.map((item, i) => (
          <div key={i} className="bg-card rounded-xl p-4 border border-border flex justify-between items-center">
            <span className="text-sm text-card-foreground">{item.label}</span>
            <span className="text-sm font-bold text-card-foreground">₪{item.amount.toLocaleString("he-IL")}</span>
          </div>
        ))}
        <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-border text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors">
          <Plus className="h-4 w-4" />
          הוספה ידנית / חיבור למסד נתונים
        </button>
      </div>
    </div>
  );
};

export default IncomePage;
