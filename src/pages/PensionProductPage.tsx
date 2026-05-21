import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Mic,
  Send,
  ChevronLeft,
  TrendingUp,
  ArrowDownToLine,
  ArrowLeftRight,
  RefreshCw,
  UserCog,
  Zap,
} from "lucide-react";
import advisorImg from "@/assets/advisor-avatar.jpg";
import { pensionProducts, type PensionProduct } from "@/lib/data";
import { InsightsSheetC } from "@/components/InsightsSheetC";
import { DanaPensionChat } from "@/components/DanaPensionChat";
import { DanaTeaserBubbles } from "@/components/DanaTeaserBubbles";
import { ProviderLogo } from "@/lib/providerLogo";

const formatNIS = (n: number) => "₪" + n.toLocaleString("he-IL");

// Same palette as Pension Category — strict consistency
const C = {
  deep: "hsl(178, 80%, 14%)",
  core: "hsl(178, 70%, 26%)",
  fresh: "hsl(174, 65%, 42%)",
  bright: "hsl(170, 70%, 52%)",
  mint: "hsl(176, 55%, 91%)",
  soft: "hsl(180, 25%, 97%)",
  ink: "hsl(200, 30%, 10%)",
  muted: "hsl(200, 12%, 48%)",
  hairline: "hsl(180, 18%, 90%)",
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
        <linearGradient id="psFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${h} ${pts.join(" ")} ${w},${h}`} fill="url(#psFill)" />
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
    style={{ border: `1px solid ${C.hairline}`, boxShadow: "0 1px 2px hsla(178, 70%, 14%, 0.04)" }}
    dir="rtl"
  >
    <span
      className="absolute top-3 bottom-3 right-0 w-[3px] rounded-full"
      style={{ background: `linear-gradient(180deg, ${C.fresh}, ${C.core})` }}
      aria-hidden
    />
    <h3 className="text-[12px] font-bold mb-3 pr-2" style={{ color: C.ink, letterSpacing: "-0.01em" }}>
      {title}
    </h3>
    <div className="pr-2">{children}</div>
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

type TabKey = "overview" | "performance" | "fees" | "coverage";

const PensionProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const product = pensionProducts.find((p) => p.id === id);

  const [chatOpen, setChatOpen] = useState(false);
  const [danaOpen, setDanaOpen] = useState(false);
  const [teaserVisible, setTeaserVisible] = useState(false);
  const [tab, setTab] = useState<TabKey>("overview");

  // Detect opportunity: alert OR fees significantly above market
  const hasOpportunity = product
    ? Boolean(product.alert) ||
      product.managementFromBalance - product.marketAvgFromBalance >= 0.3
    : false;

  // Build alternative + savings (hardcoded mapping per product)
  const buildAlternative = (p: PensionProduct) => {
    const map: Record<string, { provider: string; label: string; mgmt: number; return3y: number; savings: number }> = {
      "migdal-managers": { provider: "מנורה מבטחים", label: "פנסיה מקיפה", mgmt: 0.22, return3y: 24.6, savings: 487000 },
      "harel-gemel": { provider: "כלל", label: "קופת גמל מנייתית", mgmt: 0.18, return3y: 28.3, savings: 312000 },
    };
    return (
      map[p.id] ?? {
        provider: "מנורה מבטחים",
        label: "מסלול מומלץ",
        mgmt: Math.max(0.2, p.marketAvgFromBalance - 0.2),
        return3y: p.return3y + 6,
        savings: Math.round((p.managementFromBalance - 0.25) * p.balance * 20),
      }
    );
  };

  // Show teaser bubbles for problematic products (once per session)
  useEffect(() => {
    if (!product || !hasOpportunity) return;
    if (sessionStorage.getItem(`dana-teaser-${product.id}`)) return;
    const t = setTimeout(() => setTeaserVisible(true), 1500);
    return () => clearTimeout(t);
  }, [product, hasOpportunity]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" dir="rtl" style={{ background: C.soft }}>
        <button onClick={() => navigate("/assets/pension")} className="text-[13px] font-semibold underline" style={{ color: C.core }}>
          המוצר לא נמצא — חזרה לרשימה
        </button>
      </div>
    );
  }

  const alt = buildAlternative(product);
  const isExpensive = product.managementFromBalance > product.marketAvgFromBalance;

  const tabs: { key: TabKey; label: string }[] = [
    { key: "overview", label: "סקירה" },
    { key: "performance", label: "ביצועים" },
    { key: "fees", label: "דמי ניהול" },
    ...(product.coverage ? [{ key: "coverage" as TabKey, label: "כיסויים" }] : []),
  ];

  return (
    <div className="min-h-screen max-w-[430px] mx-auto relative" dir="rtl" style={{ background: C.soft }}>
      {/* Banner — IDENTICAL to PensionCategoryPage */}
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

        {/* Breadcrumb */}
        <nav
          className="relative inline-flex items-center text-[12px] font-semibold text-white/85"
          aria-label="breadcrumb"
        >
          <button onClick={() => navigate("/assets")} className="inline-flex items-center gap-0.5 opacity-75 hover:opacity-100 transition-opacity">
            <ChevronLeft className="h-3.5 w-3.5 rotate-180" />
            <span>נכסים</span>
          </button>
          <span className="mx-1.5 opacity-50">/</span>
          <button onClick={() => navigate("/assets/pension")} className="opacity-75 hover:opacity-100 transition-opacity">
            פנסיה
          </button>
          <span className="mx-1.5 opacity-50">/</span>
          <span className="font-extrabold text-white truncate max-w-[140px]">{product.label}</span>
        </nav>

        <div className="relative flex items-center justify-between mt-4">
          <h2 className="text-[14px] font-medium text-white/75">{product.typeLabel}</h2>
          <span
            className="inline-flex items-center text-[10px] font-bold px-2.5 py-1 rounded-full text-white"
            style={{
              background: "hsla(0,0%,100%,0.16)",
              border: "1px solid hsla(0,0%,100%,0.18)",
              backdropFilter: "blur(6px)",
            }}
          >
            {product.status === "active" ? "פעיל" : "לא פעיל"}
          </span>
        </div>

      </div>

      {/* Floating Summary Card — IDENTICAL pattern to Category, but LOGO at top of hierarchy */}
      <div className="px-5 -mt-12 relative z-10 float-card-in">
        <div
          className="w-full text-right rounded-2xl bg-white p-5"
          style={{
            border: `1px solid ${C.hairline}`,
            boxShadow: "0 14px 36px hsla(178, 70%, 12%, 0.18), 0 2px 6px hsla(178, 70%, 12%, 0.06)",
          }}
        >
          <div className="flex items-start gap-4 mb-4">
            {/* Provider logo — RIGHT side in RTL */}
            <ProviderLogo provider={product.provider} size={56} ring />
            <div className="flex-1 min-w-0">
              <p className="text-[20px] font-extrabold leading-tight tracking-tight truncate" style={{ color: C.ink }}>
                {product.provider}
              </p>
              <p className="text-[12px] font-medium mt-0.5 truncate" style={{ color: C.muted }}>
                {product.label} · {product.typeLabel}
              </p>
              <p className="text-[20px] font-extrabold tracking-tight leading-none mt-3" style={{ color: C.ink }}>
                <span className="text-[12px] font-bold ml-1" style={{ color: C.core }}>₪</span>
                {product.balance.toLocaleString("he-IL")}
              </p>
              <p className="text-[10.5px] mt-1 font-medium" style={{ color: C.muted }}>צבירה כוללת</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4" style={{ borderTop: `1px solid ${C.hairline}` }}>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: C.muted }}>
                {product.projectedPension ? "צפי קצבה" : product.liquidFrom ? "נזיל מ-" : "הפקדה"}
              </p>
              <p className="text-[14px] font-extrabold" style={{ color: C.ink }}>
                {product.projectedPension
                  ? <>{formatNIS(product.projectedPension)}<span className="text-[10px] font-medium opacity-70">/חודש</span></>
                  : product.liquidFrom
                  ? product.liquidFrom
                  : product.monthlyDeposit
                  ? <>{formatNIS(product.monthlyDeposit)}<span className="text-[10px] font-medium opacity-70">/חודש</span></>
                  : "—"}
              </p>
            </div>
            <div className="pr-3" style={{ borderRight: `1px solid ${C.hairline}` }}>
              <p className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: C.muted }}>הפקדה חודשית</p>
              <p className="text-[14px] font-extrabold" style={{ color: C.ink }}>
                {product.monthlyDeposit ? formatNIS(product.monthlyDeposit) : "—"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dana opportunity card — at top, above chips */}
      {hasOpportunity && (
        <div className="px-4 pt-5">
          <div
            className="rounded-2xl p-4 text-right relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsl(0, 0%, 6%) 0%, hsl(0, 0%, 12%) 100%)",
              boxShadow: "0 10px 28px hsla(0, 0%, 0%, 0.28)",
              border: "1px solid hsl(0, 0%, 18%)",
            }}
            dir="rtl"
          >
            <div className="flex items-start gap-3 mb-3">
              <span className="relative w-12 h-12 rounded-full flex-shrink-0">
                <span className="block w-full h-full rounded-full overflow-hidden" style={{ boxShadow: "0 4px 10px hsla(0, 0%, 0%, 0.4)", border: "2px solid hsl(0, 0%, 18%)" }}>
                  <img src={advisorImg} alt="דנה" className="w-full h-full object-cover" />
                </span>
                <span
                  className="absolute -top-1 -left-1 min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center text-[11px] font-extrabold text-white"
                  style={{ background: "hsl(0, 78%, 55%)", border: "2px solid hsl(0, 0%, 6%)" }}
                  aria-label="התראה"
                >
                  !
                </span>
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: "hsl(0, 0%, 65%)" }}>
                  דנה — מה לשפר
                </p>
                <p className="text-[13px] font-extrabold text-white leading-snug mb-1.5">
                  {isExpensive
                    ? <>זוהתה בעיה: דמי ניהול גבוהים ({product.managementFromBalance}%)</>
                    : product.return12m < 5
                    ? <>זוהתה בעיה: תשואה נמוכה במסלול הנוכחי</>
                    : <>זוהתה בעיה: המסלול לא ממוצה</>}
                </p>
                <p className="text-[12px] leading-relaxed" style={{ color: "hsl(0, 0%, 80%)" }}>
                  יש לי פתרון בשבילך — מעבר חכם יחסוך לך
                  <strong className="text-white"> {formatNIS(alt.savings)}</strong> לאורך השנים.
                </p>
              </div>
            </div>
            <button
              onClick={() => setDanaOpen(true)}
              className="w-full rounded-xl py-3 text-[13px] font-extrabold flex items-center justify-center gap-1.5 bg-white transition-transform hover:scale-[1.01] active:scale-[0.98]"
              style={{ color: "hsl(0, 0%, 8%)" }}
            >
              <Zap className="h-4 w-4" fill="hsl(45, 100%, 55%)" strokeWidth={2} style={{ color: "hsl(45, 100%, 45%)" }} />
              בואו נשפר את הפוליסה!
            </button>
          </div>
        </div>
      )}

      {/* Filter chips — identical to Assets / Pension category */}
      <div className="px-4 pt-5 pb-1">

        <div className="flex gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {tabs.map((t) => {
            const isActive = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className="inline-flex items-center text-[11px] font-medium px-3 py-1.5 rounded-full transition-all hover:scale-[1.04] active:scale-[0.98] flex-shrink-0"
                style={{
                  background: isActive ? "hsl(250, 30%, 12%)" : "white",
                  border: isActive
                    ? "1px solid hsl(250, 30%, 12%)"
                    : "1px solid hsl(230, 20%, 90%)",
                  color: isActive ? "white" : "hsl(230, 20%, 35%)",
                  boxShadow: isActive
                    ? "0 4px 12px hsla(250, 30%, 15%, 0.25)"
                    : "0 1px 2px hsla(230, 20%, 40%, 0.04)",
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-4 pt-4 pb-40 flex flex-col gap-4">
        {tab === "overview" && (
          <SectionCard title="פרטי החיסכון">
            <Row label="הפקדה חודשית" value={product.monthlyDeposit ? `${formatNIS(product.monthlyDeposit)}/ח` : "לא פעיל"} accent />
            {product.employer && (
              <>
                <Row label="חלק מעסיק" value={`${product.employer.employer}%`} />
                <Row label="חלק עובד" value={`${product.employer.employee}%`} />
                <Row label="פיצויים" value={`${product.employer.severance}%`} />
              </>
            )}
            <Row label="תאריך הצטרפות" value={product.joinedAt} />
            <Row label="מסלול" value={product.track} />
          </SectionCard>
        )}

        {tab === "performance" && (
          <SectionCard title="ביצועים">
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                { l: "12 ח׳", v: product.return12m },
                { l: "3 שנים", v: product.return3y },
                { l: "5 שנים", v: product.return5y },
              ].map((r) => (
                <div key={r.l} className="rounded-xl py-2.5 text-center" style={{ background: C.mint }}>
                  <p className="text-[10px] mb-0.5" style={{ color: C.muted }}>{r.l}</p>
                  <p
                    className="text-[15px] font-extrabold leading-none"
                    style={{ color: r.v >= 0 ? C.deep : "hsl(0, 65%, 50%)" }}
                  >
                    {r.v >= 0 ? "+" : ""}{r.v}%
                  </p>
                </div>
              ))}
            </div>
            <Sparkline values={product.history} color={C.core} />
            <div className="flex items-center justify-between mt-2">
              <p className="text-[10.5px]" style={{ color: C.muted }}>{product.track}</p>
              <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold" style={{ color: C.core }}>
                <TrendingUp className="h-3 w-3" /> תשואה מצטברת
              </span>
            </div>
          </SectionCard>
        )}

        {tab === "fees" && (
          <SectionCard title="דמי ניהול">
            <Row label="מצבירה" value={`${product.managementFromBalance}%`} accent />
            <Row label="מהפקדה" value={`${product.managementFromDeposit}%`} />
            <div
              className="mt-3 flex items-center justify-between rounded-xl px-3 py-2.5"
              style={{
                background: isExpensive ? "hsl(0, 80%, 96%)" : C.mint,
                border: `1px solid ${isExpensive ? "hsl(0, 80%, 90%)" : "hsl(150, 50%, 82%)"}`,
              }}
            >
              <span className="text-[11px] font-medium" style={{ color: C.ink }}>
                ממוצע שוק: {product.marketAvgFromBalance}%
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

        {tab === "coverage" && product.coverage && (
          <SectionCard title="כיסויים ביטוחיים">
            <Row label="שאירים" value={product.coverage.survivors} />
            <Row label="נכות" value={product.coverage.disability} />
            <Row label="מקרה מוות" value={product.coverage.death} />
          </SectionCard>
        )}

        <SectionCard title="פעולות">
          <div className="grid grid-cols-4 gap-2">
            <ActionBtn Icon={ArrowDownToLine} label="ייצא דוח" />
            <ActionBtn Icon={RefreshCw} label="שנה מסלול" />
            <ActionBtn Icon={ArrowLeftRight} label="ניוד" />
            <ActionBtn Icon={UserCog} label="פנה לסוכן" />
          </div>
        </SectionCard>


        <p className="text-[10.5px] text-center mt-2 px-6" style={{ color: C.muted }}>
          הנתונים מתעדכנים אוטומטית מהמסלקה הפנסיונית
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
      <DanaPensionChat
        open={danaOpen}
        onOpenChange={setDanaOpen}
        product={product}
        alternative={{ provider: alt.provider, label: alt.label, mgmt: alt.mgmt, return3y: alt.return3y }}
        savings={alt.savings}
      />
      {hasOpportunity && teaserVisible && !danaOpen && (
        <DanaTeaserBubbles
          productId={product.id}
          savings={alt.savings}
          onOpen={() => {
            setDanaOpen(true);
            setTeaserVisible(false);
          }}
          onClose={() => setTeaserVisible(false)}
        />
      )}
    </div>
  );
};

export default PensionProductPage;
