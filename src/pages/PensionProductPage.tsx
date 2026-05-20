import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ChevronRight,
  PiggyBank,
  Briefcase,
  Landmark,
  ShieldCheck,
  TrendingUp,
  Wallet,
  ArrowDownToLine,
  ArrowLeftRight,
  RefreshCw,
  UserCog,
  Mic,
  Send,
  X,
} from "lucide-react";
import advisorImg from "@/assets/advisor-avatar.jpg";
import { pensionProducts, type PensionProduct } from "@/lib/data";
import { InsightsSheetC } from "@/components/InsightsSheetC";

const formatNIS = (n: number) => "₪" + n.toLocaleString("he-IL");

const iconForType = (t: PensionProduct["type"]) => {
  switch (t) {
    case "pension":
      return PiggyBank;
    case "study":
      return Briefcase;
    case "gemel":
      return Landmark;
    case "managers":
      return ShieldCheck;
    default:
      return PiggyBank;
  }
};

const theme = {
  gradient:
    "linear-gradient(160deg, hsl(258, 72%, 48%) 0%, hsl(240, 75%, 55%) 55%, hsl(220, 85%, 60%) 100%)",
  accent: "hsl(258, 72%, 45%)",
  accentBg: "hsl(258, 70%, 94%)",
  accentText: "hsl(258, 72%, 28%)",
  sheetShadow: "hsla(250, 60%, 22%, 0.35)",
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div
    className="rounded-2xl p-4 text-right"
    style={{
      background: "white",
      boxShadow: "0 3px 14px hsla(250, 30%, 25%, 0.05)",
      border: "1px solid hsl(230, 20%, 94%)",
    }}
    dir="rtl"
  >
    <h3 className="text-[13px] font-bold mb-3" style={{ color: "hsl(250, 50%, 12%)" }}>
      {title}
    </h3>
    {children}
  </div>
);

const Row = ({ label, value, accent }: { label: string; value: React.ReactNode; accent?: boolean }) => (
  <div className="flex items-center justify-between py-1.5">
    <span className="text-[11.5px]" style={{ color: "hsl(230, 15%, 55%)" }}>
      {label}
    </span>
    <span
      className={`text-[12.5px] ${accent ? "font-extrabold" : "font-semibold"}`}
      style={{ color: accent ? theme.accent : "hsl(250, 50%, 12%)" }}
    >
      {value}
    </span>
  </div>
);

const Sparkline = ({ values, color }: { values: number[]; color: string }) => {
  const w = 280;
  const h = 60;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(1, max - min);
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 6) - 3;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const area = `0,${h} ${pts.join(" ")} ${w},${h}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[60px]" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#sparkFill)" />
      <polyline
        points={pts.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
};

const ActionButton = ({ Icon, label }: { Icon: any; label: string }) => (
  <button
    className="flex flex-col items-center justify-center gap-1.5 rounded-2xl py-3 px-2 transition-transform active:scale-[0.97]"
    style={{
      background: "white",
      border: "1px solid hsl(230, 20%, 92%)",
      boxShadow: "0 2px 8px hsla(250, 30%, 25%, 0.04)",
    }}
  >
    <span
      className="w-9 h-9 rounded-full flex items-center justify-center"
      style={{ background: theme.accentBg }}
    >
      <Icon className="h-4 w-4" style={{ color: theme.accent }} />
    </span>
    <span className="text-[11px] font-semibold" style={{ color: "hsl(250, 40%, 18%)" }}>
      {label}
    </span>
  </button>
);

const PensionProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const product = pensionProducts.find((p) => p.id === id);

  const [chatOpen, setChatOpen] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 180);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" dir="rtl">
        <button
          onClick={() => navigate("/assets/pension")}
          className="text-[13px] font-semibold underline"
          style={{ color: theme.accent }}
        >
          המוצר לא נמצא — חזרה לרשימה
        </button>
      </div>
    );
  }

  const Icon = iconForType(product.type);
  const isExpensive = product.managementFromBalance > product.marketAvgFromBalance;

  return (
    <div
      className="min-h-screen max-w-[430px] mx-auto relative"
      dir="rtl"
      style={{ background: theme.gradient }}
    >
      {/* Sticky compact header */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-30 transition-all duration-300"
        style={{
          background: theme.gradient,
          boxShadow: stickyVisible ? `0 4px 14px ${theme.sheetShadow}` : "none",
          transform: stickyVisible ? "translate(-50%, 0)" : "translate(-50%, -100%)",
          opacity: stickyVisible ? 1 : 0,
          pointerEvents: stickyVisible ? "auto" : "none",
        }}
        dir="rtl"
      >
        <div className="flex items-center justify-between px-4 py-3 text-white">
          <button
            onClick={() => navigate("/assets/pension")}
            className="flex items-center gap-1 text-[12px] font-medium opacity-90"
          >
            <ChevronRight className="h-4 w-4" />
            חזרה
          </button>
          <h2 className="text-[14px] font-bold truncate max-w-[55%]">{product.label}</h2>
          <span className="w-12" aria-hidden />
        </div>
      </div>

      {/* Hero */}
      <div className="sticky top-0 z-0 px-5 pt-10 pb-12" style={{ background: theme.gradient }}>
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 140 140"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          {[28, 56, 86, 118, 150, 184].map((r) => (
            <circle key={r} cx={125} cy={18} r={r} fill="none" stroke="hsla(0, 0%, 100%, 0.09)" strokeWidth="1" />
          ))}
        </svg>

        <div className="relative flex items-center justify-between mb-5 text-white">
          <button
            onClick={() => navigate("/assets/pension")}
            className="flex items-center gap-1 text-[12px] font-medium opacity-90"
          >
            <ChevronRight className="h-4 w-4" />
            חזרה
          </button>
          <h2 className="text-base font-bold">פנסיה</h2>
          <span className="w-7" aria-hidden />
        </div>

        <div className="relative flex flex-col items-center text-center text-white">
          <span
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3"
            style={{ background: "hsla(0, 0%, 100%, 0.95)" }}
          >
            <Icon className="h-7 w-7" style={{ color: theme.accent }} strokeWidth={2.2} />
          </span>
          <p className="text-[16px] font-extrabold tracking-tight">{product.label}</p>
          <p className="text-[12px] opacity-90 mb-3">
            {product.provider} · {product.typeLabel}
          </p>

          <p className="text-[12px] opacity-85 mb-1">צבירה כוללת</p>
          <p className="text-[40px] font-extrabold tracking-tight leading-none mb-2">
            {formatNIS(product.balance)}
          </p>

          {product.projectedPension ? (
            <span
              className="inline-flex items-center text-[11.5px] font-semibold px-2.5 py-1 rounded-full mb-4"
              style={{
                background: "hsla(0, 0%, 100%, 0.18)",
                backdropFilter: "blur(8px)",
                border: "1px solid hsla(0, 0%, 100%, 0.22)",
              }}
            >
              צפי קצבה {formatNIS(product.projectedPension)}/ח
            </span>
          ) : product.liquidFrom ? (
            <span
              className="inline-flex items-center text-[11.5px] font-semibold px-2.5 py-1 rounded-full mb-4"
              style={{
                background: "hsla(0, 0%, 100%, 0.18)",
                backdropFilter: "blur(8px)",
                border: "1px solid hsla(0, 0%, 100%, 0.22)",
              }}
            >
              נזיל החל מ-{product.liquidFrom}
            </span>
          ) : (
            <span className="h-4 mb-4" />
          )}

          <button
            onClick={() => setChatOpen(true)}
            className="inline-flex items-center gap-2 pr-2 pl-4 py-1.5 rounded-full text-[12px] font-semibold shadow-lg"
            style={{ background: "white", color: theme.accentText, boxShadow: `0 8px 24px ${theme.sheetShadow}` }}
          >
            <span
              className="tri-ring-c relative w-11 h-11 rounded-full flex-shrink-0"
              style={{ marginTop: "-10px", marginBottom: "-10px", marginRight: "-8px" }}
            >
              <span
                className="block w-full h-full rounded-full overflow-hidden"
                style={{ boxShadow: "0 4px 10px hsla(275, 65%, 25%, 0.4)" }}
              >
                <img src={advisorImg} alt="דנה" className="w-full h-full object-cover" />
              </span>
            </span>
            <span>שאלי את דנה על המוצר</span>
          </button>
        </div>
      </div>

      {/* White sheet */}
      <div
        className="relative -mt-6 rounded-t-3xl pb-32 z-10"
        style={{
          background: "hsl(235, 30%, 97%)",
          boxShadow: `0 -8px 28px ${theme.sheetShadow}`,
          minHeight: "calc(100vh - 24px)",
        }}
      >
        <div className="flex justify-center pt-2.5 pb-1">
          <div className="w-10 h-1.5 rounded-full" style={{ background: "hsl(230, 20%, 88%)" }} />
        </div>

        <div className="px-4 pt-3 flex flex-col gap-3">
          {/* Performance */}
          <Section title="ביצועים">
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                { l: "12 ח׳", v: product.return12m },
                { l: "3 שנים", v: product.return3y },
                { l: "5 שנים", v: product.return5y },
              ].map((r) => (
                <div
                  key={r.l}
                  className="rounded-xl py-2.5 text-center"
                  style={{ background: theme.accentBg }}
                >
                  <p className="text-[10px] mb-0.5" style={{ color: "hsl(230, 15%, 50%)" }}>
                    {r.l}
                  </p>
                  <p
                    className="text-[15px] font-extrabold leading-none"
                    style={{ color: r.v >= 0 ? "hsl(150, 55%, 32%)" : "hsl(0, 65%, 50%)" }}
                  >
                    {r.v >= 0 ? "+" : ""}
                    {r.v}%
                  </p>
                </div>
              ))}
            </div>
            <Sparkline values={product.history} color={theme.accent} />
            <p className="text-[10.5px] mt-2 text-center" style={{ color: "hsl(230, 15%, 55%)" }}>
              {product.track}
            </p>
          </Section>

          {/* Deposit details */}
          <Section title="פרטי החיסכון">
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
          </Section>

          {/* Management fees */}
          <Section title="דמי ניהול">
            <Row label="מצבירה" value={`${product.managementFromBalance}%`} accent />
            <Row label="מהפקדה" value={`${product.managementFromDeposit}%`} />
            <div className="mt-3 flex items-center justify-between rounded-xl px-3 py-2.5"
              style={{
                background: isExpensive ? "hsl(0, 80%, 96%)" : "hsl(150, 55%, 95%)",
                border: `1px solid ${isExpensive ? "hsl(0, 80%, 90%)" : "hsl(150, 55%, 85%)"}`,
              }}
            >
              <span className="text-[11px] font-medium" style={{ color: "hsl(230, 20%, 35%)" }}>
                ממוצע שוק: {product.marketAvgFromBalance}%
              </span>
              <span
                className="text-[11px] font-extrabold"
                style={{ color: isExpensive ? "hsl(0, 65%, 45%)" : "hsl(150, 55%, 32%)" }}
              >
                {isExpensive ? "יקר מהממוצע" : "תחת הממוצע"}
              </span>
            </div>
          </Section>

          {/* Coverage */}
          {product.coverage && (
            <Section title="כיסויים ביטוחיים">
              <Row label="שאירים" value={product.coverage.survivors} />
              <Row label="נכות" value={product.coverage.disability} />
              <Row label="מקרה מוות" value={product.coverage.death} />
            </Section>
          )}

          {/* Dana Insight Card */}
          <div
            className="rounded-2xl p-4 text-right"
            style={{
              background:
                "linear-gradient(135deg, hsl(258, 72%, 55%) 0%, hsl(220, 85%, 55%) 100%)",
              boxShadow: "0 8px 24px hsla(250, 60%, 30%, 0.28)",
            }}
            dir="rtl"
          >
            <div className="flex items-start gap-3 mb-3">
              <span
                className="tri-ring-c relative w-12 h-12 rounded-full flex-shrink-0"
              >
                <span
                  className="block w-full h-full rounded-full overflow-hidden"
                  style={{ boxShadow: "0 4px 10px hsla(0, 0%, 0%, 0.3)" }}
                >
                  <img src={advisorImg} alt="דנה" className="w-full h-full object-cover" />
                </span>
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-extrabold text-white mb-1">דנה — תובנה אישית</p>
                <p className="text-[11.5px] leading-relaxed text-white/90">
                  {isExpensive ? (
                    <>
                      דמי הניהול שלך ({product.managementFromBalance}%) גבוהים מממוצע השוק. מעבר למסלול דומה
                      בדמי ניהול 0.3% יחסוך לך כ-
                      <strong> {formatNIS(Math.round((product.managementFromBalance - 0.3) * product.balance / 100))}</strong> בשנה.
                    </>
                  ) : product.return12m > 7 ? (
                    <>
                      ביצועי המוצר טובים — תשואה של {product.return12m}% ב-12 החודשים האחרונים.
                      בוא נבדוק יחד אם המסלול מתאים לפרופיל הסיכון שלך.
                    </>
                  ) : (
                    <>
                      התשואה כאן נמוכה יחסית. שווה לבחון מסלול עם חשיפה גבוהה יותר למניות
                      בהתאם לטווח הפרישה שלך.
                    </>
                  )}
                </p>
              </div>
            </div>
            <button
              onClick={() => setChatOpen(true)}
              className="w-full rounded-xl py-2.5 text-[12.5px] font-bold flex items-center justify-center gap-1.5"
              style={{ background: "white", color: theme.accentText }}
            >
              פתחי שיחה איתי
              <Send className="h-3.5 w-3.5 -rotate-90" />
            </button>
          </div>

          {/* Actions */}
          <Section title="פעולות">
            <div className="grid grid-cols-4 gap-2">
              <ActionButton Icon={ArrowDownToLine} label="ייצא דוח" />
              <ActionButton Icon={RefreshCw} label="שנה מסלול" />
              <ActionButton Icon={ArrowLeftRight} label="ניוד" />
              <ActionButton Icon={UserCog} label="פנה לסוכן" />
            </div>
          </Section>

          <p className="text-[10.5px] text-center mt-1 px-6" style={{ color: "hsl(230, 15%, 55%)" }}>
            הנתונים מתעדכנים אוטומטית מהמסלקה הפנסיונית
          </p>
        </div>
      </div>

      {/* Bottom Chat Bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-40 px-4 pb-4 pointer-events-none" dir="rtl">
        <button
          onClick={() => setChatOpen(true)}
          dir="rtl"
          className="pointer-events-auto w-full flex items-center gap-2 rounded-full pr-2 pl-4 py-2 transition-all active:scale-[0.99]"
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
          <span className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "hsl(230, 25%, 96%)", border: "1px solid hsl(230, 20%, 90%)" }}>
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

export default PensionProductPage;
