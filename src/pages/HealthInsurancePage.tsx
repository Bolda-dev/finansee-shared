import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Activity,
  Phone,
  FileText,
  Stethoscope,
  UserCog,
  ShieldCheck,
  
  Calendar,
} from "lucide-react";
import { ProviderLogo } from "@/lib/providerLogo";
import { StickyHeader } from "@/components/StickyHeader";
import advisorImg from "@/assets/advisor-avatar.jpg";

const formatNIS = (n: number) => "₪" + n.toLocaleString("he-IL");

// Darker purple palette (deeper than InsurancePageC gradient)
const C = {
  deep: "hsl(262, 80%, 14%)",
  core: "hsl(262, 75%, 26%)",
  fresh: "hsl(265, 78%, 48%)",
  bright: "hsl(275, 85%, 65%)",
  mint: "hsl(265, 60%, 96%)",
  soft: "hsl(260, 30%, 98%)",
  ink: "hsl(262, 35%, 12%)",
  muted: "hsl(262, 12%, 48%)",
  hairline: "hsl(260, 20%, 90%)",
};

// Hardcoded health policy
const policy = {
  provider: "הפניקס",
  label: "ביטוח בריאות — קו הזהב",
  typeLabel: "כיסוי פרטי מורחב",
  monthly: 350,
  yearly: 4200,
  joinedAt: "07/2019",
  nextPayment: "15/06/2026",
  policyNumber: "HX-4827193",
  insuredCount: 4,
  coverageLimit: 2500000,
  deductible: 1500,
  marketAvg: 290,
  claimsThisYear: 2,
  lastClaim: "03/2026",
  history: [320, 320, 330, 330, 335, 340, 340, 345, 345, 350, 350, 350],
  benefits: [
    { label: "ניתוחים פרטיים", value: "כיסוי מלא" },
    { label: "השתלות בחו״ל", value: "עד ₪2.5M" },
    { label: "תרופות מחוץ לסל", value: "כיסוי 80%" },
    { label: "ייעוץ רפואי", value: "ללא הגבלה" },
    { label: "אבחון מהיר", value: "עד 14 יום" },
    { label: "רפואה משלימה", value: "₪3,000/שנה" },
  ],
  duplications: [
    { with: "מכבי זהב", amount: 180 },
    { with: "ביטוח דרך מקום העבודה", amount: 140 },
  ],
};

const Sparkline = ({ values, color }: { values: number[]; color: string }) => {
  const w = 280, h = 64;
  const min = Math.min(...values), max = Math.max(...values);
  const range = Math.max(1, max - min);
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 6) - 3;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[64px]" preserveAspectRatio="none">
      <defs>
        <linearGradient id="hsFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${h} ${pts.join(" ")} ${w},${h}`} fill="url(#hsFill)" />
      <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
};

const Row = ({ label, value, accent }: { label: string; value: React.ReactNode; accent?: boolean }) => (
  <div className="flex items-center justify-between py-1.5">
    <span className="text-[11.5px]" style={{ color: C.muted }}>{label}</span>
    <span className={`text-[12.5px] ${accent ? "font-extrabold" : "font-semibold"}`} style={{ color: accent ? C.core : C.ink }}>
      {value}
    </span>
  </div>
);

const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div
    className="relative rounded-2xl bg-white p-4 text-right overflow-hidden"
    style={{ border: `1px solid ${C.hairline}`, boxShadow: "0 1px 2px hsla(262, 70%, 14%, 0.04)" }}
    dir="rtl"
  >
    <span
      className="absolute top-0 left-0 right-0 h-[3px]"
      style={{ background: C.core }}
      aria-hidden
    />
    <h3 className="text-[12px] font-bold mb-3" style={{ color: C.ink, letterSpacing: "-0.01em" }}>
      {title}
    </h3>
    <div>{children}</div>
  </div>
);

const ActionBtn = ({ Icon, label }: { Icon: any; label: string }) => (
  <button
    className="flex flex-col items-center justify-center gap-1.5 rounded-2xl py-3 px-2 transition-transform active:scale-[0.97] bg-white"
    style={{ border: `1px solid ${C.hairline}` }}
  >
    <span className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: C.mint }}>
      <Icon className="h-4 w-4" style={{ color: C.core }} />
    </span>
    <span className="text-[11px] font-semibold" style={{ color: C.ink }}>{label}</span>
  </button>
);

type TabKey = "overview" | "benefits" | "claims";

const HealthInsurancePage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabKey>("overview");

  const tabs: { key: TabKey; label: string }[] = [
    { key: "overview", label: "סקירה" },
    { key: "benefits", label: "כיסויים" },
    { key: "claims", label: "תביעות" },
  ];

  const overpay = policy.monthly - policy.marketAvg;
  const duplicationTotal = policy.duplications.reduce((s, d) => s + d.amount, 0);
  const isExpensive = overpay > 0;

  return (
    <div className="min-h-screen max-w-[430px] mx-auto relative" dir="rtl" style={{ background: C.soft }}>
      <StickyHeader
        title="ביטוח בריאות"
        backTo="/insurance"
        gradient={`linear-gradient(160deg, ${C.deep} 0%, ${C.core} 70%, ${C.fresh} 130%)`}
        shadowColor="hsla(262, 70%, 14%, 0.3)"
      />
      {/* Banner */}
      <div
        className="relative px-5 pt-8 pb-20 overflow-hidden hero-rise"
        style={{
          background: `linear-gradient(160deg, ${C.deep} 0%, ${C.core} 70%, ${C.fresh} 130%)`,
        }}
      >
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
          viewBox="0 0 200 120"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          {[40, 70, 100, 130, 160].map((r) => (
            <circle key={r} cx={0} cy={0} r={r} fill="none" stroke="hsla(0,0%,100%,0.08)" strokeWidth="1" />
          ))}
        </svg>

        {/* Top bar: back button + centered title */}
        <div className="relative flex items-center justify-center min-h-[40px]" dir="rtl">
          <button
            onClick={() => navigate("/insurance")}
            className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full text-white transition-all hover:scale-105 active:scale-95"
            style={{
              background: "hsla(0,0%,100%,0.18)",
              border: "1px solid hsla(0,0%,100%,0.25)",
              backdropFilter: "blur(8px)",
            }}
            aria-label="חזרה"
          >
            <ChevronLeft className="h-5 w-5 rotate-180" />
          </button>
          <h1 className="text-[15px] font-extrabold text-white truncate max-w-[230px]">ביטוח בריאות</h1>
        </div>
      </div>

      {/* Floating Summary Card */}
      <div className="px-5 -mt-12 relative z-10 float-card-in">
        <div
          className="w-full text-right rounded-2xl bg-white p-5"
          style={{
            border: `1px solid ${C.hairline}`,
            boxShadow: "0 14px 36px hsla(262, 70%, 12%, 0.20), 0 2px 6px hsla(262, 70%, 12%, 0.06)",
          }}
        >
          <div className="flex items-start gap-4 mb-4">
            <ProviderLogo provider={policy.provider} size={56} ring />
            <div className="flex-1 min-w-0">
              <p className="text-[20px] font-extrabold leading-tight tracking-tight truncate" style={{ color: C.ink }}>
                {policy.provider}
              </p>
              <p className="text-[12px] font-medium mt-0.5 truncate" style={{ color: C.muted }}>
                קו הזהב · {policy.insuredCount} מבוטחים
              </p>
              <p className="text-[20px] font-extrabold tracking-tight leading-none mt-3" style={{ color: C.ink }}>
                <span className="text-[12px] font-bold ml-1" style={{ color: C.core }}>₪</span>
                {policy.monthly.toLocaleString("he-IL")}
                <span className="text-[11px] font-medium opacity-60 mr-1">/חודש</span>
              </p>
              <p className="text-[10.5px] mt-1 font-medium" style={{ color: C.muted }}>פרמיה חודשית</p>
            </div>
          </div>

          {/* Comparison bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10.5px] font-medium" style={{ color: C.muted }}>
                ממוצע שוק: {formatNIS(policy.marketAvg)}
              </span>
              <span
                className="text-[10.5px] font-extrabold"
                style={{ color: isExpensive ? "hsl(0, 65%, 45%)" : C.core }}
              >
                {isExpensive ? `+${formatNIS(overpay)}` : `-${formatNIS(-overpay)}`}
              </span>
            </div>
            <div className="relative w-full h-1.5 rounded-full overflow-hidden" style={{ background: C.hairline }}>
              <div
                className="absolute inset-y-0 right-0 rounded-full"
                style={{
                  width: `${Math.min(100, (policy.monthly / (policy.marketAvg * 1.5)) * 100)}%`,
                  background: `linear-gradient(90deg, ${C.fresh}, ${C.bright})`,
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4" style={{ borderTop: `1px solid ${C.hairline}` }}>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: C.muted }}>תקרת כיסוי</p>
              <p className="text-[14px] font-extrabold" style={{ color: C.ink }}>
                {formatNIS(policy.coverageLimit / 1000000)}M
              </p>
            </div>
            <div className="pr-3" style={{ borderRight: `1px solid ${C.hairline}` }}>
              <p className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: C.muted }}>השתתפות עצמית</p>
              <p className="text-[14px] font-extrabold" style={{ color: C.ink }}>
                {formatNIS(policy.deductible)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dana banner — recommendation (matches Pension product) */}
      <div className="px-4 pt-5">
        <button
          onClick={() => {}}
          dir="rtl"
          className="w-full flex items-center gap-3 rounded-2xl bg-white p-4 text-right transition-transform hover:scale-[1.01] active:scale-[0.99]"
          style={{
            boxShadow: "0 8px 24px hsla(262, 30%, 25%, 0.08), 0 1px 3px hsla(262, 30%, 25%, 0.04)",
            border: "1px solid hsl(260, 20%, 92%)",
          }}
        >
          <span className="relative w-14 h-14 rounded-full flex-shrink-0">
            <span
              className="block w-full h-full rounded-full overflow-hidden"
              style={{ border: "2px solid hsl(265, 60%, 70%)" }}
            >
              <img src={advisorImg} alt="דנה" className="w-full h-full object-cover" />
            </span>
            <span
              className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 rounded-full flex items-center justify-center text-[12px] font-extrabold text-white"
              style={{ background: "hsl(0, 78%, 55%)", border: "2px solid white" }}
              aria-label="התראה"
            >
              !
            </span>
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-end gap-1.5">
              <span
                className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: "hsl(150, 65%, 45%)", boxShadow: "0 0 0 3px hsla(150, 65%, 45%, 0.18)" }}
                aria-hidden
              />
              <p className="text-[14px] font-extrabold tracking-tight leading-snug truncate" style={{ color: C.ink }}>
                זיהיתי כפל ביטוח שאפשר לחסוך!
              </p>
            </div>
            <p className="text-[11.5px] mt-1" style={{ color: "hsl(260, 15%, 50%)" }}>
              חיסכון אפשרי של עד {formatNIS(duplicationTotal * 12)} בשנה
            </p>
          </div>
          <ChevronLeft className="h-5 w-5 flex-shrink-0" style={{ color: "hsl(260, 15%, 60%)" }} />
        </button>
      </div>

      {/* Filter chips */}
      <div className="px-4 pt-5 pb-1">
        <div className="flex gap-1.5 overflow-x-auto overflow-y-visible px-2 py-4 -mx-2 -my-3" style={{ scrollbarWidth: "none" }}>
          {tabs.map((t) => {
            const isActive = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className="inline-flex items-center text-[11px] font-medium px-3 py-1.5 rounded-full transition-all hover:scale-[1.04] active:scale-[0.98] flex-shrink-0"
                style={{
                  background: isActive ? "hsl(262, 35%, 14%)" : "white",
                  border: isActive
                    ? "1px solid hsl(262, 35%, 14%)"
                    : "1px solid hsl(260, 20%, 90%)",
                  color: isActive ? "white" : "hsl(262, 20%, 35%)",
                  boxShadow: isActive
                    ? "0 4px 12px hsla(262, 35%, 15%, 0.25)"
                    : "0 1px 2px hsla(262, 20%, 40%, 0.04)",
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-4 pt-4 pb-24 flex flex-col gap-4">
        {tab === "overview" && (
          <SectionCard title="פרטי הפוליסה">
            <Row label="מספר פוליסה" value={policy.policyNumber} />
            <Row label="מבוטחים" value={`${policy.insuredCount} נפשות`} />
            <Row label="פרמיה חודשית" value={formatNIS(policy.monthly)} accent />
            <Row label="עלות שנתית" value={formatNIS(policy.yearly)} />
            <Row label="ממוצע שוק" value={formatNIS(policy.marketAvg)} />
            <Row label="תאריך הצטרפות" value={policy.joinedAt} />
            <Row label="חיוב הבא" value={policy.nextPayment} />
            <div
              className="mt-3 flex items-center justify-between rounded-xl px-3 py-2.5"
              style={{
                background: isExpensive ? "hsl(0, 80%, 96%)" : C.mint,
                border: `1px solid ${isExpensive ? "hsl(0, 80%, 90%)" : "hsl(265, 50%, 88%)"}`,
              }}
            >
              <span className="text-[11px] font-medium" style={{ color: C.ink }}>
                פער מהשוק: {formatNIS(Math.abs(overpay))}/חודש
              </span>
              <span
                className="text-[11px] font-extrabold"
                style={{ color: isExpensive ? "hsl(0, 65%, 45%)" : C.deep }}
              >
                {isExpensive ? "יקר מהממוצע" : "תחת הממוצע"}
              </span>
            </div>
          </SectionCard>
        )}

        {tab === "benefits" && (
          <SectionCard title="כיסויים עיקריים">
            <div className="flex flex-col gap-2">
              {policy.benefits.map((b, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-xl px-3 py-2.5"
                  style={{ background: C.mint, border: "1px solid hsl(265, 50%, 90%)" }}
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-3.5 w-3.5" style={{ color: C.core }} />
                    <span className="text-[12px] font-medium" style={{ color: C.ink }}>{b.label}</span>
                  </div>
                  <span className="text-[11.5px] font-extrabold" style={{ color: C.core }}>{b.value}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        )}

        {tab === "claims" && (
          <SectionCard title="היסטוריית פרמיה ותביעות">
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="rounded-xl py-2.5 text-center" style={{ background: C.mint }}>
                <p className="text-[10px] mb-0.5" style={{ color: C.muted }}>תביעות השנה</p>
                <p className="text-[14px] font-extrabold leading-none" style={{ color: C.deep }}>
                  {policy.claimsThisYear}
                </p>
              </div>
              <div className="rounded-xl py-2.5 text-center" style={{ background: C.mint }}>
                <p className="text-[10px] mb-0.5" style={{ color: C.muted }}>תביעה אחרונה</p>
                <p className="text-[12px] font-extrabold leading-none mt-1" style={{ color: C.deep }}>
                  {policy.lastClaim}
                </p>
              </div>
              <div className="rounded-xl py-2.5 text-center" style={{ background: C.mint }}>
                <p className="text-[10px] mb-0.5" style={{ color: C.muted }}>חיסכון אפשרי</p>
                <p className="text-[14px] font-extrabold leading-none" style={{ color: "hsl(150, 65%, 30%)" }}>
                  -{formatNIS(duplicationTotal)}
                </p>
              </div>
            </div>
            <Sparkline values={policy.history} color={C.core} />
            <div className="flex items-center justify-between mt-2">
              <p className="text-[10.5px]" style={{ color: C.muted }}>פרמיה חודשית — 12 חודשים</p>
              <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold" style={{ color: "hsl(0, 65%, 45%)" }}>
                <Activity className="h-3 w-3" /> עלייה הדרגתית
              </span>
            </div>
          </SectionCard>
        )}

        <SectionCard title="פעולות">
          <div className="grid grid-cols-4 gap-2">
            <ActionBtn Icon={Phone} label="התקשר" />
            <ActionBtn Icon={FileText} label="הגש תביעה" />
            <ActionBtn Icon={Stethoscope} label="מצא מומחה" />
            <ActionBtn Icon={UserCog} label="פנה ליועץ" />
          </div>
        </SectionCard>

        <p className="text-[10.5px] text-center mt-2 px-6" style={{ color: C.muted }}>
          הנתונים מתעדכנים אוטומטית מחברת הביטוח
        </p>
      </div>
    </div>
  );
};

export default HealthInsurancePage;
