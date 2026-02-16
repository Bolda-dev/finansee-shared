import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { expenseItems } from "@/lib/data";

const ExpensesPage = () => {
  const navigate = useNavigate();
  const total = expenseItems.reduce((s, i) => s + i.amount, 0);

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto" dir="rtl">
      <div
        className="px-5 pt-12 pb-6 text-white"
        style={{ background: "linear-gradient(135deg, hsl(25, 80%, 45%), hsl(15, 70%, 40%))" }}
      >
        <button onClick={() => navigate("/")} className="flex items-center gap-1 text-sm opacity-80 mb-4">
          <ArrowRight className="h-4 w-4" /> חזרה
        </button>
        <h1 className="text-2xl font-bold">הוצאות</h1>
        <p className="text-3xl font-extrabold mt-2">₪{total.toLocaleString("he-IL")}<span className="text-sm font-normal opacity-80"> /חודש</span></p>
      </div>
      <div className="px-5 py-4 space-y-3">
        {expenseItems.map((item, i) => (
          <div key={i} className="bg-card rounded-xl p-4 border border-border flex justify-between items-center">
            <span className="text-sm text-card-foreground">{item.label}</span>
            <span className="text-sm font-bold text-card-foreground">₪{item.amount.toLocaleString("he-IL")}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpensesPage;
