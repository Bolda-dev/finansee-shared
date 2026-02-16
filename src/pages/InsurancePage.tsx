import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle, AlertCircle, Plus } from "lucide-react";
import { insuranceItems } from "@/lib/data";

const InsurancePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto" dir="rtl">
      <div
        className="px-5 pt-12 pb-6 text-white"
        style={{ background: "linear-gradient(135deg, hsl(220, 70%, 40%), hsl(200, 60%, 35%))" }}
      >
        <button onClick={() => navigate("/")} className="flex items-center gap-1 text-sm opacity-80 mb-4">
          <ArrowRight className="h-4 w-4" /> חזרה
        </button>
        <h1 className="text-2xl font-bold">ביטוחים</h1>
        <p className="text-sm opacity-80 mt-1">{insuranceItems.filter(i => i.status === "פעיל").length} פוליסות פעילות</p>
      </div>
      <div className="px-5 py-4 space-y-3">
        {insuranceItems.map((item, i) => (
          <div key={i} className="bg-card rounded-xl p-4 border border-border">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                {item.status === "פעיל" ? (
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                )}
                <span className="text-sm font-medium text-card-foreground">{item.label}</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                item.status === "פעיל" ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700"
              }`}>
                {item.status}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">כיסוי: {item.coverage}</p>
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

export default InsurancePage;
