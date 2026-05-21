import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  TrendingUp,
  ArrowDownToLine,
  RefreshCw,
  Calculator,
  UserCog,
  Home,
  MapPin,
  Mic,
  Send,
} from "lucide-react";
import { ProviderLogo } from "@/lib/providerLogo";
import { StickyHeader } from "@/components/StickyHeader";
import { InsightsSheetC } from "@/components/InsightsSheetC";
import advisorImg from "@/assets/advisor-avatar.jpg";

const formatNIS = (n: number) => "₪" + n.toLocaleString("he-IL");

// Darker blue palette (slightly deeper than LiabilitiesPageC gradient)
const C = {
  deep: "hsl(222, 90%, 14%)",
  core: "hsl(222, 85%, 24%)",
  fresh: "hsl(220, 80%, 42%)",
  bright: "hsl(215, 90%, 60%)",
  mint: "hsl(220, 70%, 95%)",
  soft: "hsl(220, 30%, 97%)",
  ink: "hsl(222, 35%, 10%)",
  muted: "hsl(222, 12%, 48%)",
  hairline: "hsl(220, 20%, 90%)",
};

// Hardcoded mortgage product (prototype data)
const mortgage = {
  provider: "בנק לאומי",
  label: "משכנתא — דירה להשקעה",
  typeLabel: "מסלול פריים",
  balance: 390000,
  monthly: 2300,
  originalAmount: 520000,
  rate: 5.85,
  marketRate: 4.75,
  yearsLeft: 18,
  totalYears: 25,
  joinedAt: "03/2018",
  nextPayment: "01/06/2026",
  propertyValue: 1850000,
  propertyAddress: "רחוב בן יהודה 42, רמת גן",
  rentalIncome: 5500,
  history: [4200, 4150, 4080, 3920, 3850, 3720, 3580, 3410, 3220, 3050, 2880, 2700, 2540, 2410, 2300],
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
        <linearGradient id="msFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${h} ${pts.join(" ")} ${w},${h}`} fill="url(#msFill)" />
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
    style={{ border: `1px solid ${C.hairline}`, boxShadow: "0 1px 2px hsla(222, 70%, 14%, 0.04)" }}
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

type TabKey = "overview" | "payments" | "property";

const MortgageInvestmentPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabKey>("overview");
  const [chatOpen, setChatOpen] = useState(false);

  const paidSoFar = mortgage.originalAmount - mortgage.balance;
  const paidPct = Math.round((paidSoFar / mortgage.originalAmount) * 100);
  const monthlySavingsIfRefi = Math.round(mortgage.monthly * (mortgage.rate - mortgage.marketRate) / mortgage.rate);
  const totalSavings = monthlySavingsIfRefi * 12 * mortgage.yearsLeft;
  const isExpensive = mortgage.rate > mortgage.marketRate;

  const tabs: { key: TabKey; label: string }[] = [
    { key: "overview", label: "סקירה" },
    { key: "payments", label: "החזרים" },
    { key: "property", label: "נכס" },
  ];

  return (
    <div className="min-h-screen max-w-[430px] mx-auto relative" dir="rtl" style={{ background: C.soft }}>
      <StickyHeader
        title="דירה להשקעה"
        backTo="/liabilities"
        gradient={`linear-gradient(160deg, ${C.deep} 0%, ${C.core} 70%, ${C.fresh} 130%)`}
        shadowColor="hsla(222, 70%, 14%, 0.3)"
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
            onClick={() => navigate("/liabilities")}
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
          <h1 className="text-[15px] font-extrabold text-white truncate max-w-[230px]">דירה להשקעה</h1>
        </div>
      </div>

      {/* Floating Summary Card */}
      <div className="px-5 -mt-12 relative z-10 float-card-in">
        <div
          className="w-full text-right rounded-2xl bg-white p-5"
          style={{
            border: `1px solid ${C.hairline}`,
            boxShadow: "0 14px 36px hsla(222, 70%, 12%, 0.20), 0 2px 6px hsla(222, 70%, 12%, 0.06)",
          }}
        >
          <div className="flex items-start gap-4 mb-4">
            <ProviderLogo provider={mortgage.provider} size={56} ring />
            <div className="flex-1 min-w-0">
              <p className="text-[20px] font-extrabold leading-tight tracking-tight truncate" style={{ color: C.ink }}>
                {mortgage.provider}
              </p>
              <p className="text-[12px] font-medium mt-0.5 truncate" style={{ color: C.muted }}>
                דירה להשקעה · {mortgage.typeLabel}
              </p>
              <p className="text-[20px] font-extrabold tracking-tight leading-none mt-3" style={{ color: C.ink }}>
                <span className="text-[12px] font-bold ml-1" style={{ color: C.core }}>₪</span>
                {mortgage.balance.toLocaleString("he-IL")}
              </p>
              <p className="text-[10.5px] mt-1 font-medium" style={{ color: C.muted }}>יתרה לתשלום</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10.5px] font-medium" style={{ color: C.muted }}>
                שולמו {formatNIS(paidSoFar)}
              </span>
              <span className="text-[10.5px] font-extrabold" style={{ color: C.core }}>{paidPct}%</span>
            </div>
            <div className="relative w-full h-1.5 rounded-full overflow-hidden" style={{ background: C.hairline }}>
              <div
                className="absolute inset-y-0 right-0 rounded-full"
                style={{ width: `${paidPct}%`, background: `linear-gradient(90deg, ${C.fresh}, ${C.bright})` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4" style={{ borderTop: `1px solid ${C.hairline}` }}>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: C.muted }}>החזר חודשי</p>
              <p className="text-[14px] font-extrabold" style={{ color: C.ink }}>
                {formatNIS(mortgage.monthly)}<span className="text-[10px] font-medium opacity-70">/חודש</span>
              </p>
            </div>
            <div className="pr-3" style={{ borderRight: `1px solid ${C.hairline}` }}>
              <p className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: C.muted }}>שנים נותרו</p>
              <p className="text-[14px] font-extrabold" style={{ color: C.ink }}>
                {mortgage.yearsLeft} <span className="text-[10px] font-medium opacity-70">/ {mortgage.totalYears}</span>
              </p>
            </div>
          </div>
        </div>
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
                  background: isActive ? "hsl(222, 35%, 12%)" : "white",
                  border: isActive
                    ? "1px solid hsl(222, 35%, 12%)"
                    : "1px solid hsl(220, 20%, 90%)",
                  color: isActive ? "white" : "hsl(222, 20%, 35%)",
                  boxShadow: isActive
                    ? "0 4px 12px hsla(222, 35%, 15%, 0.25)"
                    : "0 1px 2px hsla(222, 20%, 40%, 0.04)",
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
          <SectionCard title="פרטי המשכנתא">
            <Row label="סכום מקורי" value={formatNIS(mortgage.originalAmount)} />
            <Row label="יתרה לתשלום" value={formatNIS(mortgage.balance)} accent />
            <Row label="ריבית נוכחית" value={`${mortgage.rate}%`} accent />
            <Row label="ממוצע שוק" value={`${mortgage.marketRate}%`} />
            <Row label="תאריך פתיחה" value={mortgage.joinedAt} />
            <Row label="תשלום הבא" value={mortgage.nextPayment} />
            <div
              className="mt-3 flex items-center justify-between rounded-xl px-3 py-2.5"
              style={{
                background: isExpensive ? "hsl(0, 80%, 96%)" : C.mint,
                border: `1px solid ${isExpensive ? "hsl(0, 80%, 90%)" : "hsl(220, 50%, 82%)"}`,
              }}
            >
              <span className="text-[11px] font-medium" style={{ color: C.ink }}>
                פער מהשוק: {(mortgage.rate - mortgage.marketRate).toFixed(2)}%
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

        {tab === "payments" && (
          <SectionCard title="מסלול ההחזרים">
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="rounded-xl py-2.5 text-center" style={{ background: C.mint }}>
                <p className="text-[10px] mb-0.5" style={{ color: C.muted }}>החזר נוכחי</p>
                <p className="text-[14px] font-extrabold leading-none" style={{ color: C.deep }}>
                  {formatNIS(mortgage.monthly)}
                </p>
              </div>
              <div className="rounded-xl py-2.5 text-center" style={{ background: C.mint }}>
                <p className="text-[10px] mb-0.5" style={{ color: C.muted }}>חיסכון אפשרי</p>
                <p className="text-[14px] font-extrabold leading-none" style={{ color: "hsl(150, 65%, 30%)" }}>
                  -{formatNIS(monthlySavingsIfRefi)}
                </p>
              </div>
              <div className="rounded-xl py-2.5 text-center" style={{ background: C.mint }}>
                <p className="text-[10px] mb-0.5" style={{ color: C.muted }}>סה״כ בשנים</p>
                <p className="text-[14px] font-extrabold leading-none" style={{ color: C.deep }}>
                  {formatNIS(totalSavings)}
                </p>
              </div>
            </div>
            <Sparkline values={mortgage.history} color={C.core} />
            <div className="flex items-center justify-between mt-2">
              <p className="text-[10.5px]" style={{ color: C.muted }}>יתרה לאורך זמן</p>
              <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold" style={{ color: C.core }}>
                <TrendingUp className="h-3 w-3 rotate-180" /> ירידה הדרגתית
              </span>
            </div>
          </SectionCard>
        )}

        {tab === "property" && (
          <SectionCard title="פרטי הנכס">
            <div className="flex items-center gap-3 mb-3 pb-3" style={{ borderBottom: `1px solid ${C.hairline}` }}>
              <span className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: C.mint }}>
                <Home className="h-5 w-5" style={{ color: C.core }} />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-extrabold truncate" style={{ color: C.ink }}>דירת 4 חדרים</p>
                <p className="inline-flex items-center gap-1 text-[10.5px] font-medium mt-0.5" style={{ color: C.muted }}>
                  <MapPin className="h-3 w-3" /> {mortgage.propertyAddress}
                </p>
              </div>
            </div>
            <Row label="שווי משוערך" value={formatNIS(mortgage.propertyValue)} accent />
            <Row label="הון עצמי" value={formatNIS(mortgage.propertyValue - mortgage.balance)} />
            <Row label="הכנסה משכירות" value={`${formatNIS(mortgage.rentalIncome)}/ח`} />
            <Row
              label="תשואת שכירות"
              value={`${((mortgage.rentalIncome * 12) / mortgage.propertyValue * 100).toFixed(2)}%`}
            />
          </SectionCard>
        )}

        <SectionCard title="פעולות">
          <div className="grid grid-cols-4 gap-2">
            <ActionBtn Icon={Calculator} label="סימולציה" />
            <ActionBtn Icon={RefreshCw} label="מחזור" />
            <ActionBtn Icon={ArrowDownToLine} label="ייצא דוח" />
            <ActionBtn Icon={UserCog} label="פנה ליועץ" />
          </div>
        </SectionCard>

        <p className="text-[10.5px] text-center mt-2 px-6 pb-24" style={{ color: C.muted }}>
          הנתונים מתעדכנים אוטומטית מהבנק
        </p>
      </div>

      {/* Bottom Chat Bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-40 px-4 pb-4 pointer-events-none before:content-[''] before:absolute before:inset-x-0 before:bottom-0 before:h-[160px] before:bg-gradient-to-t before:from-white before:via-white/85 before:to-transparent before:-z-10 before:pointer-events-none" dir="rtl">
        <button
          onClick={() => setChatOpen(true)}
          dir="rtl"
          className="pointer-events-auto w-full flex items-center gap-2 rounded-full pr-2 pl-4 py-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
          style={{
            background: "white",
            boxShadow: "0 8px 32px hsla(250, 30%, 30%, 0.14), 0 2px 8px hsla(250, 30%, 30%, 0.06)",
            border: "1px solid hsl(230, 20%, 92%)",
          }}
          aria-label="פתח צ׳אט עם Finansee AI"
        >
          <span className="tri-ring-c relative w-11 h-11 rounded-full flex-shrink-0" style={{ transform: "translateY(-2px)" }}>
            <span className="block w-full h-full rounded-full overflow-hidden" style={{ boxShadow: "0 6px 20px hsla(250, 30%, 20%, 0.35)" }}>
              <img src={advisorImg} alt="Finansee AI" className="w-full h-full object-cover" />
            </span>
          </span>
          <span className="flex-1 text-start text-sm" style={{ color: "hsl(230, 15%, 55%)" }}>
            שאל את Finansee AI
          </span>
          <span
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "hsl(230, 25%, 96%)", border: "1px solid hsl(230, 20%, 90%)" }}
          >
            <Mic className="h-4 w-4" style={{ color: "hsl(230, 15%, 45%)" }} />
          </span>
          <span className="tri-ring-c relative w-9 h-9 rounded-full flex-shrink-0">
            <span className="flex w-full h-full rounded-full items-center justify-center cta-tri-c">
              <Send className="h-4 w-4 -rotate-90" style={{ color: "white" }} />
            </span>
          </span>
        </button>
      </div>

      <InsightsSheetC open={chatOpen} onOpenChange={setChatOpen} mode="context" />
    </div>
  );
};

export default MortgageInvestmentPage;
