import { useEffect, useRef, useState } from "react";
import { X, Send, Sparkles, MessageCircle, ArrowLeftRight } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import advisorImg from "@/assets/advisor-avatar.jpg";
import { ProviderLogo } from "@/lib/providerLogo";
import type { PensionProduct } from "@/lib/data";

const C = {
  deep: "hsl(178, 80%, 14%)",
  core: "hsl(178, 70%, 26%)",
  fresh: "hsl(174, 65%, 42%)",
  mint: "hsl(176, 55%, 91%)",
  ink: "hsl(200, 30%, 10%)",
  muted: "hsl(200, 12%, 48%)",
  hairline: "hsl(180, 18%, 90%)",
};

const formatNIS = (n: number) => "₪" + n.toLocaleString("he-IL");

type Step = "intro" | "details" | "compare" | "ctas" | "declined";

type Msg =
  | { id: string; role: "dana"; kind: "text"; text: React.ReactNode }
  | { id: string; role: "user"; kind: "text"; text: string }
  | { id: string; role: "dana"; kind: "compare" }
  | { id: string; role: "dana"; kind: "ctas" };

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: PensionProduct;
  alternative: { provider: string; label: string; mgmt: number; return3y: number };
  savings: number;
}

export function DanaPensionChat({ open, onOpenChange, product, alternative, savings }: Props) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [step, setStep] = useState<Step>("intro");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset & boot conversation on open
  useEffect(() => {
    if (!open) return;
    setMessages([]);
    setStep("intro");
    setTyping(true);
    const t1 = setTimeout(() => {
      setTyping(false);
      setMessages([
        {
          id: "m1",
          role: "dana",
          kind: "text",
          text: (
            <>
              היי משה 👋 הסתכלתי על <strong>{product.label}</strong> ב{product.provider} —
              <br />
              מצאתי דרך שיכולה להרוויח לך{" "}
              <span
                className="inline-block font-extrabold px-1.5 py-0.5 rounded-md"
                style={{ background: "hsl(45, 95%, 88%)", color: "hsl(28, 80%, 25%)" }}
              >
                {formatNIS(savings)}
              </span>{" "}
              עד הפרישה 💰
              <br />
              רוצה לשמוע איך?
            </>
          ),
        },
      ]);
    }, 900);
    return () => clearTimeout(t1);
  }, [open, product, savings]);

  // Auto-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  const push = (m: Msg) => setMessages((p) => [...p, m]);

  const sayDana = (text: React.ReactNode, delay = 700) => {
    setTyping(true);
    return new Promise<void>((res) => {
      setTimeout(() => {
        setTyping(false);
        push({ id: crypto.randomUUID(), role: "dana", kind: "text", text });
        res();
      }, delay);
    });
  };

  const handleYes = async () => {
    push({ id: crypto.randomUUID(), role: "user", kind: "text", text: "כן, ספרי לי" });
    setStep("details");
    await sayDana(
      <>
        הקרן הנוכחית גובה <strong>{product.managementFromBalance}%</strong> דמי ניהול.
        <br />
        ממוצע השוק הוא רק <strong>{product.marketAvgFromBalance}%</strong> 📊
        <br />
        מצאתי לך קרן עם דמי ניהול של <strong>{alternative.mgmt}%</strong> ותשואה חזקה יותר ✨
      </>,
      900,
    );
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      push({ id: crypto.randomUUID(), role: "dana", kind: "compare" });
      setStep("compare");
      setTimeout(() => {
        push({ id: crypto.randomUUID(), role: "dana", kind: "ctas" });
        setStep("ctas");
      }, 600);
    }, 1100);
  };

  const handleNo = async () => {
    push({ id: crypto.randomUUID(), role: "user", kind: "text", text: "לא תודה" });
    setStep("declined");
    await sayDana("אין בעיה 🙏 אני כאן אם תשנה דעתך — תמיד אפשר ללחוץ על הצ׳יפ למעלה.", 700);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[90vh] rounded-t-3xl p-0 border-0 flex flex-col [&>button]:hidden"
        dir="rtl"
        style={{ background: "hsl(180, 25%, 98%)" }}
      >
        {/* Header */}
        <div
          className="relative px-5 pt-5 pb-4 flex items-center gap-3"
          style={{
            background: `linear-gradient(135deg, ${C.deep} 0%, ${C.core} 100%)`,
          }}
        >
          <span className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0" style={{ border: "2px solid hsla(0,0%,100%,0.25)" }}>
            <img src={advisorImg} alt="דנה" className="w-full h-full object-cover" />
            <span className="absolute bottom-0 left-0 w-3 h-3 rounded-full" style={{ background: "hsl(140, 70%, 50%)", border: "2px solid white" }} />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-extrabold text-white flex items-center gap-1.5">
              דנה
              <Sparkles className="h-3.5 w-3.5" style={{ color: "hsl(45, 95%, 70%)" }} />
            </p>
            <p className="text-[11px] text-white/75">היועצת הפיננסית שלך · מקוונת</p>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "hsla(0,0%,100%,0.15)" }}
            aria-label="סגור"
          >
            <X className="h-4 w-4 text-white" />
          </button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1">
          <div ref={scrollRef} className="px-4 py-5 space-y-3">
            {messages.map((m) => {
              if (m.role === "user") {
                return (
                  <div key={m.id} className="flex justify-start">
                    <div
                      className="max-w-[80%] rounded-2xl rounded-tr-md px-4 py-2.5 text-[13px] font-medium"
                      style={{ background: "white", color: C.ink, border: `1px solid ${C.hairline}` }}
                    >
                      {m.text}
                    </div>
                  </div>
                );
              }
              if (m.kind === "text") {
                return (
                  <div key={m.id} className="flex justify-end gap-2 items-end">
                    <div
                      className="max-w-[82%] rounded-2xl rounded-tl-md px-4 py-3 text-[13px] leading-relaxed text-white"
                      style={{ background: `linear-gradient(135deg, ${C.core} 0%, ${C.deep} 100%)` }}
                    >
                      {m.text}
                    </div>
                    <img src={advisorImg} alt="" className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
                  </div>
                );
              }
              if (m.kind === "compare") {
                return <CompareCard key={m.id} product={product} alternative={alternative} savings={savings} />;
              }
              if (m.kind === "ctas") {
                return <CtaBlock key={m.id} onClose={() => onOpenChange(false)} />;
              }
              return null;
            })}

            {typing && (
              <div className="flex justify-end gap-2 items-end">
                <div
                  className="rounded-2xl rounded-tl-md px-4 py-3 flex items-center gap-1"
                  style={{ background: `linear-gradient(135deg, ${C.core} 0%, ${C.deep} 100%)` }}
                >
                  <Dot delay={0} />
                  <Dot delay={150} />
                  <Dot delay={300} />
                </div>
                <img src={advisorImg} alt="" className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Quick replies (intro stage) */}
        {step === "intro" && !typing && (
          <div className="px-4 pb-4 pt-2 flex gap-2 border-t" style={{ borderColor: C.hairline, background: "white" }}>
            <button
              onClick={handleYes}
              className="flex-1 rounded-full py-3 text-[13px] font-bold text-white transition-transform active:scale-[0.97]"
              style={{ background: `linear-gradient(135deg, ${C.fresh} 0%, ${C.core} 100%)`, boxShadow: `0 4px 12px hsla(178, 70%, 20%, 0.25)` }}
            >
              כן, ספרי לי ✨
            </button>
            <button
              onClick={handleNo}
              className="px-5 rounded-full py-3 text-[13px] font-semibold"
              style={{ background: "white", color: C.muted, border: `1px solid ${C.hairline}` }}
            >
              לא תודה
            </button>
          </div>
        )}

        {(step === "declined" || step === "ctas") && (
          <div className="px-4 pb-4 pt-3 border-t" style={{ borderColor: C.hairline, background: "white" }}>
            <button
              onClick={() => onOpenChange(false)}
              className="w-full rounded-full py-2.5 text-[12px] font-semibold"
              style={{ color: C.muted }}
            >
              סגור שיחה
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

const Dot = ({ delay }: { delay: number }) => (
  <span
    className="w-1.5 h-1.5 rounded-full bg-white/80"
    style={{
      animation: "danaDot 1.2s ease-in-out infinite",
      animationDelay: `${delay}ms`,
    }}
  />
);

function CompareCard({
  product,
  alternative,
  savings,
}: {
  product: PensionProduct;
  alternative: { provider: string; label: string; mgmt: number; return3y: number };
  savings: number;
}) {
  return (
    <div className="flex justify-end mr-9">
      <div
        className="w-full max-w-[82%] rounded-2xl p-3 bg-white"
        style={{ border: `1px solid ${C.hairline}`, boxShadow: "0 4px 14px hsla(178, 70%, 14%, 0.08)" }}
      >
        <p className="text-[10.5px] font-bold uppercase tracking-wide mb-2.5 flex items-center gap-1" style={{ color: C.muted }}>
          <ArrowLeftRight className="h-3 w-3" /> השוואת קרנות
        </p>

        <div className="grid grid-cols-2 gap-2">
          {/* Current */}
          <div
            className="rounded-xl p-2.5 text-right"
            style={{ background: "hsl(0, 60%, 97%)", border: "1px solid hsl(0, 50%, 90%)" }}
          >
            <p className="text-[9px] font-bold uppercase mb-1.5" style={{ color: "hsl(0, 55%, 45%)" }}>הנוכחית</p>
            <div className="flex items-center gap-1.5 mb-2">
              <ProviderLogo provider={product.provider} size={24} />
              <span className="text-[11px] font-bold truncate" style={{ color: C.ink }}>{product.provider}</span>
            </div>
            <MetricRow label="דמי ניהול" value={`${product.managementFromBalance}%`} bad />
            <MetricRow label="תשואה 3ש׳" value={`${product.return3y}%`} />
            <MetricRow label="צבירה" value={formatNIS(product.balance)} />
          </div>

          {/* Recommended */}
          <div
            className="relative rounded-xl p-2.5 text-right"
            style={{
              background: C.mint,
              border: `1.5px solid ${C.fresh}`,
              boxShadow: `0 4px 12px hsla(178, 70%, 30%, 0.15)`,
            }}
          >
            <span
              className="absolute -top-2 right-2 text-[8.5px] font-extrabold px-2 py-0.5 rounded-full text-white"
              style={{ background: C.fresh }}
            >
              ✨ מומלצת
            </span>
            <p className="text-[9px] font-bold uppercase mb-1.5" style={{ color: C.core }}>מומלצת</p>
            <div className="flex items-center gap-1.5 mb-2">
              <ProviderLogo provider={alternative.provider} size={24} />
              <span className="text-[11px] font-bold truncate" style={{ color: C.ink }}>{alternative.provider}</span>
            </div>
            <MetricRow label="דמי ניהול" value={`${alternative.mgmt}%`} good />
            <MetricRow label="תשואה 3ש׳" value={`${alternative.return3y}%`} good />
            <MetricRow label="חיסכון" value={formatNIS(savings)} good bold />
          </div>
        </div>

        <div
          className="mt-3 rounded-xl py-2.5 px-3 text-center"
          style={{ background: `linear-gradient(135deg, ${C.deep}, ${C.core})` }}
        >
          <p className="text-[9.5px] text-white/75 mb-0.5">פער מצטבר עד גיל הפרישה</p>
          <p className="text-[18px] font-extrabold text-white tracking-tight">
            +{formatNIS(savings)}
          </p>
        </div>
      </div>
    </div>
  );
}

const MetricRow = ({ label, value, good, bad, bold }: { label: string; value: string; good?: boolean; bad?: boolean; bold?: boolean }) => (
  <div className="flex items-center justify-between py-0.5">
    <span className="text-[9.5px]" style={{ color: C.muted }}>{label}</span>
    <span
      className={`text-[11px] ${bold ? "font-extrabold" : "font-bold"} flex items-center gap-0.5`}
      style={{ color: good ? "hsl(150, 60%, 30%)" : bad ? "hsl(0, 60%, 45%)" : C.ink }}
    >
      {good && <span>●</span>}
      {bad && <span>●</span>}
      {value}
    </span>
  </div>
);

function CtaBlock({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex justify-end mr-9">
      <div className="w-full max-w-[82%] flex flex-col gap-2">
        <button
          onClick={onClose}
          className="w-full rounded-xl py-3 text-[13px] font-extrabold text-white flex items-center justify-center gap-1.5 transition-transform active:scale-[0.97]"
          style={{
            background: `linear-gradient(135deg, ${C.deep} 0%, ${C.core} 100%)`,
            boxShadow: `0 6px 18px hsla(178, 70%, 14%, 0.30)`,
          }}
        >
          ⚡ עברו לקרן המומלצת
        </button>
        <button
          className="w-full rounded-xl py-2.5 text-[12.5px] font-bold flex items-center justify-center gap-1.5"
          style={{ background: "white", color: C.deep, border: `1.5px solid ${C.core}` }}
        >
          <MessageCircle className="h-3.5 w-3.5" />
          דברו עם דנה
        </button>
        <button
          className="w-full text-[11.5px] font-semibold py-1.5"
          style={{ color: C.muted }}
        >
          השוואה מפורטת ›
        </button>
      </div>
    </div>
  );
}
