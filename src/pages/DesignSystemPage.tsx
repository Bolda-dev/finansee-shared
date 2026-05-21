import { useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft, Mic, Send, Phone, FileText, Stethoscope, UserCog, Layers, Heart } from "lucide-react";
import advisorImg from "@/assets/advisor-avatar.jpg";

/**
 * Internal design system reference — not linked from the app.
 * Shows every visual element used in the financial flows, as-is from production code.
 */
const Section = ({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) => (
  <section className="px-5 py-6 border-t" style={{ borderColor: "hsl(230, 20%, 92%)" }}>
    <div className="mb-4">
      <h2 className="text-[14px] font-extrabold" style={{ color: "hsl(250, 50%, 12%)" }}>{title}</h2>
      {sub && <p className="text-[11px] mt-1" style={{ color: "hsl(230, 15%, 55%)" }}>{sub}</p>}
    </div>
    <div className="space-y-4">{children}</div>
  </section>
);

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-2">
    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "hsl(230, 15%, 55%)" }}>{label}</span>
    <div>{children}</div>
  </div>
);

const DesignSystemPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen max-w-[430px] mx-auto bg-white" dir="rtl">
      {/* Header */}
      <div className="px-5 pt-8 pb-5 sticky top-0 z-10 bg-white" style={{ borderBottom: "1px solid hsl(230, 20%, 92%)" }}>
        <div className="relative flex items-center justify-center min-h-[40px]">
          <button
            onClick={() => navigate("/")}
            className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full transition-all hover:scale-105 active:scale-95"
            style={{ background: "hsl(230, 25%, 96%)", border: "1px solid hsl(230, 20%, 90%)" }}
            aria-label="חזרה"
          >
            <ChevronRight className="h-5 w-5" style={{ color: "hsl(250, 50%, 12%)" }} />
          </button>
          <h1 className="text-[15px] font-extrabold" style={{ color: "hsl(250, 50%, 12%)" }}>Design System</h1>
        </div>
        <p className="text-[11px] text-center mt-2" style={{ color: "hsl(230, 15%, 55%)" }}>
          מקור אחד לכל אלמנט בזרימה הפיננסית
        </p>
      </div>

      {/* 1 — Typography */}
      <Section title="Typography" sub="הסקאלה בשימוש בפועל לאורך הזרימה">
        {[
          { size: 36, weight: 800, text: "₪1.2M", label: "Hero KPI" },
          { size: 20, weight: 700, text: "כותרת ראשית", label: "Page H1" },
          { size: 15, weight: 800, text: "ביטוח בריאות", label: "Header title" },
          { size: 14, weight: 700, text: "כותרת כרטיסיה", label: "Card title" },
          { size: 13, weight: 700, text: "₪842,300", label: "Trailing amount" },
          { size: 12, weight: 500, text: "טקסט סטנדרטי", label: "Body" },
          { size: 11, weight: 500, text: "תיאור משני", label: "Subtitle / chip" },
          { size: 10, weight: 700, text: "TAG / LABEL", label: "Micro label (uppercase)" },
        ].map((t) => (
          <div key={t.size + t.label} className="flex items-baseline justify-between gap-4">
            <span style={{ fontSize: t.size, fontWeight: t.weight, color: "hsl(250, 50%, 12%)" }}>{t.text}</span>
            <span className="text-[10px]" style={{ color: "hsl(230, 15%, 55%)" }}>
              {t.size}px · {t.weight} · {t.label}
            </span>
          </div>
        ))}
      </Section>

      {/* 2 — Colors */}
      <Section title="Colors" sub="גוונים שמשמשים inline בכל הקומפוננטות">
        <div className="grid grid-cols-4 gap-2">
          {[
            { name: "Ink", val: "hsl(250, 50%, 12%)" },
            { name: "Muted", val: "hsl(230, 15%, 55%)" },
            { name: "Hairline", val: "hsl(230, 20%, 92%)" },
            { name: "Surface", val: "hsl(230, 25%, 96%)" },
            { name: "Purple Deep", val: "hsl(258, 72%, 38%)" },
            { name: "Purple Core", val: "hsl(262, 75%, 52%)" },
            { name: "Purple Fresh", val: "hsl(275, 85%, 75%)" },
            { name: "Purple Tint", val: "hsl(260, 75%, 95%)" },
            { name: "Teal Mint", val: "hsl(176, 55%, 91%)" },
            { name: "Teal Ink", val: "hsl(178, 70%, 22%)" },
            { name: "Alert Red", val: "hsl(0, 78%, 55%)" },
            { name: "Alert Tint", val: "hsl(0, 80%, 95%)" },
          ].map((c) => (
            <div key={c.name} className="flex flex-col gap-1">
              <div className="w-full aspect-square rounded-xl" style={{ background: c.val, border: "1px solid hsl(230, 20%, 92%)" }} />
              <span className="text-[9px] font-bold" style={{ color: "hsl(250, 50%, 12%)" }}>{c.name}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* 3 — Radii & Shadows */}
      <Section title="Radii & Shadows">
        <Row label="Radii">
          <div className="flex items-center gap-3">
            {[
              { r: "rounded-xl", label: "xl" },
              { r: "rounded-2xl", label: "2xl" },
              { r: "rounded-full", label: "full" },
            ].map((x) => (
              <div key={x.label} className="flex flex-col items-center gap-1">
                <div className={`w-14 h-14 ${x.r}`} style={{ background: "hsl(260, 75%, 95%)", border: "1px solid hsl(260, 65%, 88%)" }} />
                <span className="text-[10px]" style={{ color: "hsl(230, 15%, 55%)" }}>{x.label}</span>
              </div>
            ))}
          </div>
        </Row>
        <Row label="Shadows">
          <div className="flex items-center gap-3">
            {[
              { s: "0 3px 14px hsla(250, 30%, 25%, 0.05)", label: "card" },
              { s: "0 4px 18px hsla(250, 30%, 25%, 0.08)", label: "raised" },
              { s: "0 8px 32px hsla(250, 30%, 30%, 0.14), 0 2px 8px hsla(250, 30%, 30%, 0.06)", label: "float" },
            ].map((x) => (
              <div key={x.label} className="flex flex-col items-center gap-1">
                <div className="w-16 h-16 rounded-2xl bg-white" style={{ boxShadow: x.s, border: "1px solid hsl(230, 20%, 94%)" }} />
                <span className="text-[10px]" style={{ color: "hsl(230, 15%, 55%)" }}>{x.label}</span>
              </div>
            ))}
          </div>
        </Row>
      </Section>

      {/* 4 — Buttons */}
      <Section title="Buttons">
        <Row label="Back circle">
          <button className="flex items-center justify-center w-9 h-9 rounded-full" style={{ background: "hsla(0,0%,100%,0.18)", border: "1px solid hsla(0,0%,100%,0.25)" }}>
            <ChevronRight className="h-5 w-5" style={{ color: "hsl(250, 50%, 12%)" }} />
          </button>
        </Row>
        <Row label="Filter chips">
          <div className="flex gap-1.5">
            <span className="inline-flex items-center text-[11px] font-medium px-3 py-1.5 rounded-full" style={{ background: "hsl(250, 30%, 12%)", color: "white", boxShadow: "0 4px 12px hsla(250, 30%, 15%, 0.25)" }}>active</span>
            <span className="inline-flex items-center text-[11px] font-medium px-3 py-1.5 rounded-full" style={{ background: "white", border: "1px solid hsl(230, 20%, 90%)", color: "hsl(230, 20%, 35%)" }}>inactive</span>
          </div>
        </Row>
        <Row label="Action grid (×4)">
          <div className="grid grid-cols-4 gap-2">
            {[
              { Icon: Phone, label: "התקשר" },
              { Icon: FileText, label: "הגש תביעה" },
              { Icon: Stethoscope, label: "מצא מומחה" },
              { Icon: UserCog, label: "פנה ליועץ" },
            ].map(({ Icon, label }) => (
              <button key={label} className="flex flex-col items-center gap-1.5 py-3 rounded-xl" style={{ background: "hsl(260, 75%, 95%)", border: "1px solid hsl(260, 65%, 88%)" }}>
                <Icon className="h-4 w-4" style={{ color: "hsl(262, 75%, 52%)" }} />
                <span className="text-[10px] font-semibold" style={{ color: "hsl(262, 65%, 28%)" }}>{label}</span>
              </button>
            ))}
          </div>
        </Row>
      </Section>

      {/* 5 — Pills & Badges */}
      <Section title="Pills & Badges">
        <Row label="Amount pill (teal)">
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "hsl(176, 55%, 91%)", color: "hsl(178, 70%, 22%)", border: "1px solid hsl(176, 50%, 82%)" }}>
            +₪3,200/ח
          </span>
        </Row>
        <Row label="Counter pill">
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "hsl(176, 55%, 91%)", color: "hsl(178, 70%, 22%)", border: "1px solid hsl(176, 50%, 82%)" }}>
            <Layers className="h-2.5 w-2.5" strokeWidth={2.5} />4 מוצרים
          </span>
        </Row>
        <Row label="Status missing">
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "hsl(0, 80%, 95%)", color: "hsl(0, 65%, 45%)" }}>חסר</span>
        </Row>
        <Row label="Alert dot (! badge)">
          <span className="relative inline-block w-10 h-10 rounded-xl" style={{ background: "hsl(260, 75%, 95%)" }}>
            <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 rounded-full flex items-center justify-center text-[9px] font-bold text-white" style={{ background: "hsl(0, 78%, 55%)", border: "2px solid white" }}>!</span>
          </span>
        </Row>
      </Section>

      {/* 6 — Cards */}
      <Section title="Cards">
        <Row label="Category list card">
          <div className="flex items-start gap-3 px-4 py-4 rounded-2xl" style={{ background: "white", boxShadow: "0 3px 14px hsla(250, 30%, 25%, 0.05)", border: "1px solid hsl(230, 20%, 94%)" }}>
            <span className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: "hsl(260, 75%, 95%)" }}>
              <Heart className="h-5 w-5" style={{ color: "hsl(262, 75%, 52%)" }} />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-bold" style={{ color: "hsl(250, 50%, 12%)" }}>ביטוח חיים</p>
              <p className="text-[11px] mt-0.5" style={{ color: "hsl(230, 15%, 55%)" }}>מגדל · ₪2,000,000</p>
            </div>
            <div className="text-left">
              <p className="text-[13px] font-bold" style={{ color: "hsl(250, 50%, 12%)" }}>₪650<span className="text-[10px] font-medium opacity-60"> /חודש</span></p>
            </div>
          </div>
        </Row>
        <Row label="Section card (top border accent)">
          <div className="relative rounded-2xl p-4 bg-white overflow-hidden" style={{ border: "1px solid hsl(230, 20%, 94%)" }}>
            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "hsl(262, 75%, 52%)" }} />
            <p className="text-[12px] font-bold mb-2" style={{ color: "hsl(250, 50%, 12%)" }}>כותרת סקציה</p>
            <p className="text-[11px]" style={{ color: "hsl(230, 15%, 55%)" }}>תוכן הכרטיסיה — קומפקטי וקריא.</p>
          </div>
        </Row>
        <Row label="Floating summary (over hero)">
          <div className="rounded-2xl bg-white p-5" style={{ border: "1px solid hsl(260, 30%, 90%)", boxShadow: "0 14px 36px hsla(262, 70%, 12%, 0.20)" }}>
            <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: "hsl(230, 15%, 55%)" }}>סך החיסכון</p>
            <p className="text-[20px] font-extrabold mt-1" style={{ color: "hsl(250, 50%, 12%)" }}>₪1,233,500</p>
          </div>
        </Row>
      </Section>

      {/* 7 — Hero */}
      <Section title="Hero blocks">
        <Row label="Main hero (gradient + KPI)">
          <div className="relative px-5 pt-8 pb-10 rounded-2xl overflow-hidden text-white text-center" style={{ background: "linear-gradient(160deg, hsl(258, 72%, 38%) 0%, hsl(262, 75%, 52%) 70%, hsl(275, 85%, 75%) 130%)" }}>
            <p className="text-[12px] opacity-85">סך כל הנכסים</p>
            <p className="text-[36px] font-extrabold leading-none mt-1">₪7.4M</p>
          </div>
        </Row>
        <Row label="Compact inner header">
          <div className="rounded-2xl px-5 py-4 text-white" style={{ background: "linear-gradient(160deg, hsl(258, 72%, 38%) 0%, hsl(262, 75%, 52%) 100%)" }}>
            <div className="relative flex items-center justify-center min-h-[40px]">
              <span className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full" style={{ background: "hsla(0,0%,100%,0.18)", border: "1px solid hsla(0,0%,100%,0.25)" }}>
                <ChevronLeft className="h-5 w-5 rotate-180" />
              </span>
              <h3 className="text-[15px] font-extrabold">ביטוח בריאות</h3>
            </div>
          </div>
        </Row>
      </Section>

      {/* 8 — Chat */}
      <Section title="Chat elements">
        <Row label="Bottom chat bar (FAB)">
          <div className="rounded-full pr-2 pl-4 py-2 flex items-center gap-2" style={{ background: "white", boxShadow: "0 8px 32px hsla(250, 30%, 30%, 0.14), 0 2px 8px hsla(250, 30%, 30%, 0.06)", border: "1px solid hsl(230, 20%, 92%)" }}>
            <span className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
              <img src={advisorImg} alt="" className="w-full h-full object-cover" />
            </span>
            <span className="flex-1 text-start text-sm" style={{ color: "hsl(230, 15%, 55%)" }}>שאל את Finansee AI</span>
            <span className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "hsl(230, 25%, 96%)", border: "1px solid hsl(230, 20%, 90%)" }}>
              <Mic className="h-4 w-4" style={{ color: "hsl(230, 15%, 45%)" }} />
            </span>
            <span className="w-9 h-9 rounded-full flex items-center justify-center cta-tri-c">
              <Send className="h-4 w-4 -rotate-90" style={{ color: "white" }} />
            </span>
          </div>
        </Row>
        <Row label="Dana insights row (in-page)">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white" style={{ border: "1px solid hsl(230, 20%, 94%)", boxShadow: "0 3px 14px hsla(250, 30%, 25%, 0.05)" }}>
            <span className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <img src={advisorImg} alt="" className="w-full h-full object-cover" />
              <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 rounded-full flex items-center justify-center text-[12px] font-extrabold text-white" style={{ background: "hsl(0, 78%, 55%)", border: "2px solid white" }}>!</span>
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-extrabold leading-snug" style={{ color: "hsl(250, 50%, 12%)" }}>מצאתי לך הזדמנות לשפר!</p>
              <p className="text-[11px] mt-1" style={{ color: "hsl(230, 15%, 50%)" }}>בלחיצה כאן אפשר להרוויח מעל ₪48,000</p>
            </div>
            <ChevronLeft className="h-5 w-5" style={{ color: "hsl(230, 15%, 60%)" }} />
          </div>
        </Row>
        <Row label="Insights card (bold tab)">
          <div className="rounded-2xl p-4 text-white" style={{ background: "linear-gradient(160deg, hsl(258, 72%, 38%) 0%, hsl(275, 85%, 60%) 130%)", boxShadow: "0 10px 30px hsla(262, 70%, 25%, 0.35)" }}>
            <div className="flex gap-1.5 mb-3">
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ background: "hsla(0,0%,100%,0.95)", color: "hsl(262, 65%, 28%)" }}>חיסכון</span>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ background: "hsla(0,0%,100%,0.18)", color: "hsla(0,0%,100%,0.92)" }}>השקעות</span>
            </div>
            <p className="text-[13px] leading-relaxed" style={{ color: "hsla(0,0%,100%,0.92)" }}>3 הזדמנויות לחיסכון חודשי של ₪1,200</p>
          </div>
        </Row>
      </Section>

      <div className="h-12" />
    </div>
  );
};

export default DesignSystemPage;
