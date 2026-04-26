import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  ChevronLeft,
  Heart,
  Activity,
  Car,
  Home,
  Briefcase,
  Plane,
  ShieldCheck,
  HeartPulse,
} from "lucide-react";
import { insuranceItems } from "@/lib/data";
import advisorImg from "@/assets/advisor-avatar.jpg";

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

const categoryTiles: {
  key: string;
  label: string;
  Icon: typeof Heart;
  bg: string;
  accent: string;
}[] = [
  { key: "life", label: "חיים", Icon: Heart, bg: "hsl(160, 60%, 92%)", accent: "hsl(160, 65%, 38%)" },
  { key: "car", label: "רכב", Icon: Car, bg: "hsl(45, 95%, 90%)", accent: "hsl(35, 90%, 45%)" },
  { key: "home", label: "דירה", Icon: Home, bg: "hsl(8, 80%, 92%)", accent: "hsl(8, 75%, 50%)" },
  { key: "health", label: "בריאות", Icon: Activity, bg: "hsl(195, 80%, 92%)", accent: "hsl(195, 75%, 42%)" },
];

const InsurancePage = () => {
  const navigate = useNavigate();

  const activePolicies = insuranceItems.filter((i) => i.status === "פעיל");
  const monthlyPolicies = activePolicies.filter((i) => i.billing === "monthly");
  const yearlyPolicies = activePolicies.filter((i) => i.billing === "yearly");

  const monthlyFromMonthly = monthlyPolicies.reduce((s, i) => s + i.cost, 0);
  const monthlyFromYearly = yearlyPolicies.reduce((s, i) => s + i.cost, 0) / 12;
  const totalMonthly = Math.round(monthlyFromMonthly + monthlyFromYearly);

  const headerGradient =
    "linear-gradient(160deg, hsl(270, 78%, 52%) 0%, hsl(278, 82%, 60%) 55%, hsl(288, 88%, 70%) 100%)";

  return (
    <div
      className="min-h-screen max-w-[430px] mx-auto relative"
      dir="rtl"
      style={{ background: "hsl(235, 30%, 97%)" }}
    >
      {/* === Purple gradient hero === */}
      <div
        className="relative px-5 pt-10 pb-7"
        style={{ background: headerGradient }}
      >
        {/* Decorative blobs */}
        <div
          className="absolute -top-10 -left-12 w-44 h-44 rounded-full pointer-events-none"
          style={{ background: "hsla(0, 0%, 100%, 0.10)" }}
          aria-hidden
        />
        <div
          className="absolute -bottom-20 -right-10 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: "hsla(0, 0%, 100%, 0.07)" }}
          aria-hidden
        />

        {/* Top bar: back + title */}
        <div className="relative flex items-center justify-between mb-6 text-white">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-[12px] font-medium opacity-90 hover:opacity-100 transition-opacity"
            aria-label="חזרה"
          >
            <ChevronRight className="h-4 w-4" />
            חזרה
          </button>
          <h2 className="text-base font-bold">ביטוח</h2>
          <span className="w-7" aria-hidden />
        </div>

        {/* Hero KPI */}
        <div className="relative flex flex-col items-center text-white text-center">
          <p className="text-[12px] font-medium opacity-85 mb-1.5">סה״כ עלות חודשית</p>
          <p className="text-[44px] font-extrabold tracking-tight leading-none mb-1">
            {formatNIS(totalMonthly)}
          </p>
          <p className="text-[11px] opacity-80 mb-4">
            {activePolicies.length} פוליסות פעילות
          </p>

          {/* Pill CTA — Dana invites you to chat */}
          <button
            className="inline-flex items-center gap-2 pr-1.5 pl-4 py-1.5 rounded-full text-[12px] font-semibold transition-all hover:scale-[1.03] active:scale-[0.98] shadow-lg"
            style={{
              background: "white",
              color: "hsl(280, 60%, 30%)",
              boxShadow: "0 8px 24px hsla(280, 60%, 25%, 0.35)",
            }}
            aria-label="שאל את דנה איך לחסוך בביטוחים"
          >
            <span className="tri-ring relative w-7 h-7 rounded-full flex-shrink-0">
              <span
                className="block w-full h-full rounded-full overflow-hidden"
                style={{ boxShadow: "0 2px 6px hsla(275, 65%, 25%, 0.35)" }}
              >
                <img
                  src={advisorImg}
                  alt="דנה"
                  className="w-full h-full object-cover"
                />
              </span>
            </span>
            <span>איך לחסוך בביטוחים שלי?</span>
          </button>
        </div>
      </div>

      {/* === Body === */}
      <div className="pb-32">
        {/* Category quick-tiles row */}
        <div className="px-4 pt-5 pb-4">
          <div className="grid grid-cols-4 gap-2.5">
            {categoryTiles.map((tile) => {
              const Icon = tile.Icon;
              return (
                <button
                  key={tile.key}
                  className="flex flex-col items-center gap-1.5 transition-transform hover:scale-[1.04] active:scale-[0.96]"
                >
                  <span
                    className="w-full aspect-square rounded-2xl flex items-center justify-center"
                    style={{
                      background: tile.bg,
                      boxShadow: "0 2px 8px hsla(250, 30%, 25%, 0.05)",
                    }}
                  >
                    <Icon
                      className="h-6 w-6"
                      style={{ color: tile.accent }}
                      strokeWidth={2}
                    />
                  </span>
                  <span
                    className="text-[11px] font-medium"
                    style={{ color: "hsl(250, 30%, 25%)" }}
                  >
                    {tile.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section header */}
        <div className="px-5 pt-2 pb-1 flex items-center justify-between">
          <span
            className="text-[11px] font-semibold tracking-wide"
            style={{ color: "hsl(230, 15%, 55%)" }}
          >
            {activePolicies.length} פוליסות
          </span>
          <span
            className="text-[11px] font-semibold tracking-wide"
            style={{ color: "hsl(250, 30%, 25%)" }}
          >
            כל הפוליסות שלי
          </span>
        </div>

        {/* Policy list */}
        <div
          className="mx-4 mt-2 rounded-2xl overflow-hidden"
          style={{
            background: "white",
            boxShadow: "0 3px 14px hsla(250, 30%, 25%, 0.05)",
            border: "1px solid hsl(230, 20%, 94%)",
          }}
        >
          {insuranceItems.map((item, i) => {
            const Icon = iconMap[item.icon] || ShieldCheck;
            const isActive = item.status === "פעיל";
            const showAlert = (item as { alert?: boolean }).alert;
            const monthlyCost =
              item.billing === "monthly"
                ? item.cost
                : Math.round(item.cost / 12);
            const isLast = i === insuranceItems.length - 1;

            return (
              <button
                key={i}
                className="w-full flex items-center gap-3 px-4 py-3.5 text-start transition-colors hover:bg-[hsl(230,25%,98%)] active:bg-[hsl(230,25%,96%)]"
                style={{
                  borderBottom: isLast ? "none" : "1px solid hsl(230, 20%, 94%)",
                }}
              >
                <ChevronLeft
                  className="h-4 w-4 flex-shrink-0"
                  style={{ color: "hsl(230, 15%, 60%)" }}
                />

                <span className="flex-shrink-0 min-w-[70px]">
                  {isActive && monthlyCost > 0 ? (
                    <span
                      className="text-[13px] font-bold tracking-tight"
                      style={{ color: "hsl(250, 50%, 12%)" }}
                    >
                      {formatNIS(monthlyCost)}
                      <span
                        className="text-[10px] font-medium mr-0.5"
                        style={{ color: "hsl(230, 15%, 55%)" }}
                      >
                        /חודש
                      </span>
                    </span>
                  ) : (
                    <span
                      className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        background: "hsl(0, 80%, 95%)",
                        color: "hsl(0, 65%, 45%)",
                      }}
                    >
                      חסר
                    </span>
                  )}
                </span>

                <div className="flex-1 min-w-0 text-end">
                  <p
                    className="text-[13.5px] font-bold tracking-tight"
                    style={{ color: "hsl(250, 50%, 12%)" }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="text-[10.5px] mt-0.5 truncate"
                    style={{ color: "hsl(230, 15%, 55%)" }}
                  >
                    {isActive ? item.coverage : "אין כיסוי פעיל"}
                  </p>
                </div>

                <span className="relative flex-shrink-0">
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: isActive
                        ? "hsl(280, 70%, 95%)"
                        : "hsl(0, 80%, 95%)",
                    }}
                  >
                    <Icon
                      style={{
                        color: isActive
                          ? "hsl(280, 75%, 50%)"
                          : "hsl(0, 65%, 50%)",
                        width: "18px",
                        height: "18px",
                      }}
                      strokeWidth={2}
                    />
                  </span>
                  {showAlert && (
                    <span
                      className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                      style={{
                        background: "hsl(0, 78%, 55%)",
                        border: "2px solid white",
                      }}
                    >
                      1
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <p
          className="text-[10.5px] text-center mt-3 px-6"
          style={{ color: "hsl(230, 15%, 55%)" }}
        >
          כל הפוליסות מתעדכנות אוטומטית מהחיבור לקופות
        </p>
      </div>
    </div>
  );
};

export default InsurancePage;
