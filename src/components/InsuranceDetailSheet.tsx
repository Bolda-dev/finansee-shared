import { useEffect } from "react";
import { X, ChevronLeft, Heart, Activity, Car, Home, Briefcase, Plane, ShieldCheck, HeartPulse, AlertCircle } from "lucide-react";
import { insuranceItems } from "@/lib/data";

interface InsuranceDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const iconMap: Record<string, typeof Heart> = {
  Heart,
  Activity,
  Car,
  Home,
  Briefcase,
  Plane,
  ShieldCheck,
  HeartPulse,
};

const formatNIS = (n: number) => "₪" + n.toLocaleString("he-IL");

export const InsuranceDetailSheet = ({ open, onOpenChange }: InsuranceDetailSheetProps) => {
  // Esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  if (!open) return null;

  const activePolicies = insuranceItems.filter((i) => i.status === "פעיל");
  const monthlyPolicies = activePolicies.filter((i) => i.billing === "monthly");
  const yearlyPolicies = activePolicies.filter((i) => i.billing === "yearly");

  // Total monthly cost = sum of monthly + (yearly / 12)
  const monthlyFromMonthly = monthlyPolicies.reduce((s, i) => s + i.cost, 0);
  const monthlyFromYearly = yearlyPolicies.reduce((s, i) => s + i.cost, 0) / 12;
  const totalMonthly = Math.round(monthlyFromMonthly + monthlyFromYearly);
  const totalYearly = Math.round(totalMonthly * 12);

  // Insurance gradient (purple) — matches the dashboard insurance category
  const headerGradient =
    "linear-gradient(135deg, hsl(270, 75%, 55%) 0%, hsl(282, 80%, 65%) 55%, hsl(295, 90%, 78%) 100%)";

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center" dir="rtl">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30"
        style={{ animation: "backdrop-in 0.45s ease-out 0.05s both" }}
        onClick={() => onOpenChange(false)}
      />

      {/* Sheet */}
      <div
        className="relative w-full max-w-[430px] bg-white rounded-t-3xl shadow-2xl flex flex-col"
        style={{
          height: "calc(100vh - 24px)",
          maxHeight: "calc(100vh - 24px)",
          marginTop: "24px",
          animation: "sheet-slide-up 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.05s both",
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-2.5 pb-1.5 flex-shrink-0">
          <div className="w-10 h-1.5 rounded-full" style={{ background: "hsl(0, 0%, 100%)", opacity: 0.7 }} />
        </div>

        {/* Scrollable content */}
        <div
          className="overflow-y-auto flex-1"
          style={{ paddingBottom: "100px" /* leave room for fixed bottom chat bar */ }}
        >
          {/* === Header card (purple gradient) === */}
          <div className="px-4 pt-2">
            <div
              className="relative rounded-3xl p-5 text-white overflow-hidden"
              style={{
                background: headerGradient,
                boxShadow: "0 10px 30px hsla(280, 60%, 35%, 0.35)",
              }}
            >
              {/* Decorative blobs */}
              <div
                className="absolute -top-12 -left-10 w-36 h-36 rounded-full pointer-events-none"
                style={{ background: "hsla(0, 0%, 100%, 0.08)" }}
              />
              <div
                className="absolute -bottom-16 -right-8 w-48 h-48 rounded-full pointer-events-none"
                style={{ background: "hsla(0, 0%, 100%, 0.06)" }}
              />

              {/* Top row: back + title + close */}
              <div className="relative flex items-center justify-between mb-4">
                <button
                  onClick={() => onOpenChange(false)}
                  className="flex items-center gap-1 text-[12px] font-medium opacity-90 hover:opacity-100 transition-opacity"
                  aria-label="חזרה"
                >
                  <ChevronLeft className="h-4 w-4" />
                  חזרה
                </button>
                <h2 className="text-base font-bold">ביטוח</h2>
                <button
                  onClick={() => onOpenChange(false)}
                  className="w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:bg-white/15"
                  aria-label="סגור"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Hero KPI: total monthly cost */}
              <div className="relative text-right mb-4">
                <p className="text-[11px] opacity-80 mb-1">סה״כ עלות חודשית</p>
                <div className="flex items-baseline justify-end gap-1">
                  <span className="text-[12px] opacity-80">/חודש</span>
                  <span className="text-[40px] font-extrabold tracking-tight leading-none">
                    {formatNIS(totalMonthly)}
                  </span>
                </div>
              </div>

              {/* Divider with active count */}
              <div className="relative flex items-center gap-2 mb-3">
                <div className="flex-1 h-px" style={{ background: "hsla(0, 0%, 100%, 0.25)" }} />
                <p className="text-[11px] font-medium opacity-90">
                  {activePolicies.length} פוליסות פעילות
                </p>
                <div className="flex-1 h-px" style={{ background: "hsla(0, 0%, 100%, 0.25)" }} />
              </div>

              {/* Inner stats panel */}
              <div
                className="relative rounded-2xl p-3.5 space-y-2.5"
                style={{ background: "hsla(0, 0%, 100%, 0.12)", backdropFilter: "blur(6px)" }}
              >
                <div className="flex items-center justify-between text-[12px]">
                  <span className="font-bold">{monthlyPolicies.length}</span>
                  <span className="opacity-90">פוליסות חודשיות</span>
                </div>
                <div className="h-px" style={{ background: "hsla(0, 0%, 100%, 0.18)" }} />
                <div className="flex items-center justify-between text-[12px]">
                  <span className="font-bold">{yearlyPolicies.length}</span>
                  <span className="opacity-90">פוליסות שנתיות</span>
                </div>
                <div className="h-px" style={{ background: "hsla(0, 0%, 100%, 0.18)" }} />
                <div className="flex items-center justify-between text-[12px]">
                  <span className="font-bold">{formatNIS(totalYearly)}</span>
                  <span className="opacity-90">עלות שנתית כוללת</span>
                </div>
              </div>
            </div>
          </div>

          {/* === Policies list === */}
          <div className="px-4 pt-5">
            <p
              className="text-[11px] font-semibold tracking-wide mb-2.5 text-end px-1"
              style={{ color: "hsl(230, 15%, 55%)" }}
            >
              פוליסות
            </p>

            <div className="space-y-2.5">
              {insuranceItems.map((item, i) => {
                const Icon = iconMap[item.icon] || ShieldCheck;
                const isActive = item.status === "פעיל";
                const showAlert = (item as { alert?: boolean }).alert;
                const monthlyCost =
                  item.billing === "monthly"
                    ? item.cost
                    : Math.round(item.cost / 12);

                return (
                  <button
                    key={i}
                    className="w-full relative rounded-2xl p-3.5 text-start flex items-center gap-3 transition-transform hover:scale-[1.01] active:scale-[0.99]"
                    style={{
                      background: "white",
                      boxShadow: "0 3px 14px hsla(250, 30%, 25%, 0.06)",
                      border: "1px solid hsl(230, 20%, 94%)",
                    }}
                  >
                    {/* Chevron (RTL = on the start/right visual = left side in DOM) */}
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "hsl(230, 25%, 96%)" }}
                      aria-hidden
                    >
                      <ChevronLeft className="h-3.5 w-3.5" style={{ color: "hsl(230, 15%, 50%)" }} />
                    </span>

                    {/* Middle: title + coverage + cost pill */}
                    <div className="flex-1 min-w-0 text-end">
                      <p
                        className="text-[14px] font-bold tracking-tight"
                        style={{ color: "hsl(250, 50%, 12%)" }}
                      >
                        {item.label}
                      </p>
                      <p
                        className="text-[11px] mt-0.5 truncate"
                        style={{ color: "hsl(230, 15%, 55%)" }}
                      >
                        {isActive ? `כיסוי: ${item.coverage}` : "אין כיסוי פעיל"}
                      </p>

                      {isActive && item.cost > 0 && (
                        <span
                          className="inline-flex items-center mt-2 px-2.5 py-1 rounded-full text-[11px] font-semibold"
                          style={{
                            background: "hsl(230, 25%, 96%)",
                            color: "hsl(250, 35%, 25%)",
                          }}
                        >
                          {formatNIS(monthlyCost)}/חודש
                        </span>
                      )}
                    </div>

                    {/* Icon with optional alert badge */}
                    <span className="relative flex-shrink-0">
                      <span
                        className="w-11 h-11 rounded-2xl flex items-center justify-center"
                        style={{
                          background: isActive ? "hsl(280, 70%, 95%)" : "hsl(230, 25%, 96%)",
                        }}
                      >
                        {isActive ? (
                          <Icon
                            className="h-5 w-5"
                            style={{ color: "hsl(280, 75%, 50%)" }}
                            strokeWidth={2}
                          />
                        ) : (
                          <AlertCircle
                            className="h-5 w-5"
                            style={{ color: "hsl(0, 70%, 55%)" }}
                            strokeWidth={2}
                          />
                        )}
                      </span>
                      {showAlert && (
                        <span
                          className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                          style={{ background: "hsl(0, 78%, 55%)", border: "2px solid white" }}
                        >
                          1
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
