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
        style={{ background: "white" }}
      >
        {/* Floating avatar with rotating tri-color ring */}
        <div className="tri-ring-c absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full" style={{ top: "-32px" }}>
          <div className="w-full h-full rounded-full overflow-hidden" style={{ boxShadow: "0 8px 24px hsla(250, 30%, 20%, 0.3)" }}>
            <img src={advisorImg} alt="דנה" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1.5 rounded-full" style={{ background: "hsl(230, 15%, 88%)" }} />
        </div>

        {/* Header */}
        <div className="relative flex flex-col items-center px-5 pt-7 pb-3">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-2 left-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-black/5"
            aria-label="סגור"
          >
            <X className="h-4 w-4" style={{ color: "hsl(230, 15%, 45%)" }} />
          </button>
          <p className="text-sm font-bold" style={{ color: "hsl(250, 45%, 15%)" }}>
            דנה — Finansee AI
          </p>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1">
          <div ref={scrollRef} className="px-4 py-5 space-y-3">
            {messages.map((m) => {
              if (m.role === "user") {
                return (
                  <div key={m.id} className="flex justify-start">
                    <div
                      className="max-w-[80%] rounded-2xl rounded-bl-md px-3.5 py-2.5 text-[13px] font-medium text-right"
                      style={{
                        background: "hsl(250, 30%, 8%)",
                        color: "white",
                        boxShadow: "0 4px 14px hsla(250, 30%, 15%, 0.35)",
                      }}
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
                      className="max-w-[82%] rounded-2xl rounded-br-md px-3.5 py-2.5 text-[13px] leading-relaxed text-right"
                      style={{
                        background: "white",
                        color: "hsl(250, 35%, 25%)",
                        border: "1px solid hsl(230, 20%, 92%)",
                        boxShadow: "0 2px 10px hsla(230, 30%, 50%, 0.06)",
                      }}
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
                  className="rounded-2xl rounded-br-md px-4 py-3 flex items-center gap-1"
                  style={{
                    background: "white",
                    border: "1px solid hsl(230, 20%, 92%)",
                    boxShadow: "0 2px 10px hsla(230, 30%, 50%, 0.06)",
                  }}
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
              style={{ background: "hsl(250, 30%, 8%)", boxShadow: "0 4px 12px hsla(250, 30%, 15%, 0.35)" }}
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
    className="w-1.5 h-1.5 rounded-full"
    style={{
      background: "hsl(230, 15%, 65%)",
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
  const currMgmtW = Math.min(95, (product.managementFromBalance / 1.5) * 100);
  const altMgmtW = Math.min(95, (alternative.mgmt / 1.5) * 100);
  const maxRet = Math.max(product.return3y, alternative.return3y, 1);
  const currRetW = (product.return3y / maxRet) * 100;
  const altRetW = (alternative.return3y / maxRet) * 100;
  const mgmtDelta = Math.round(
    ((product.managementFromBalance - alternative.mgmt) / product.managementFromBalance) * 100,
  );

  return (
    <div className="w-full">
      <div
        className="w-full rounded-3xl bg-white overflow-hidden"
        style={{
          border: `1px solid ${C.hairline}`,
          boxShadow: "0 20px 50px hsla(178, 70%, 14%, 0.08)",
        }}
      >
        {/* Header */}
        <div className="pt-5 px-5 pb-1 flex justify-between items-end">
          <div className="text-right">
            <h3 className="text-[17px] font-extrabold tracking-tight" style={{ color: C.deep }}>
              השוואת קרנות מורחבת
            </h3>
            <p className="text-[10.5px] font-medium" style={{ color: C.muted }}>
              מבוססת על נתוני שוק עדכניים
            </p>
          </div>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: C.mint, border: "2px solid white" }}
          >
            <ArrowLeftRight className="h-4 w-4" style={{ color: C.core }} />
          </div>
        </div>

        {/* Comparison */}
        <div className="p-3 grid grid-cols-2 gap-2.5 relative">
          <div
            className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center z-10"
            style={{
              background: "white",
              border: `4px solid hsl(180, 25%, 98%)`,
              boxShadow: "0 2px 6px hsla(178, 70%, 14%, 0.08)",
            }}
          >
            <span className="text-[9px] font-extrabold" style={{ color: C.muted }}>VS</span>
          </div>

          {/* Current */}
          <div
            className="flex flex-col gap-4 p-3.5 rounded-2xl"
            style={{ background: "hsl(180, 12%, 97%)", border: `1px solid ${C.hairline}` }}
          >
            <div className="flex flex-col items-center gap-2">
              <div className="p-1.5 rounded-xl bg-white" style={{ boxShadow: "0 1px 3px hsla(178, 70%, 14%, 0.06)" }}>
                <ProviderLogo provider={product.provider} size={36} />
              </div>
              <div className="text-center">
                <p className="text-[9.5px] font-extrabold tracking-wider" style={{ color: "hsl(0, 60%, 55%)" }}>
                  הנוכחית
                </p>
                <p className="text-[12px] font-bold leading-tight" style={{ color: C.ink }}>
                  {product.provider}
                </p>
              </div>
            </div>

            <div className="space-y-3.5">
              <div className="text-right">
                <p className="text-[9px] font-bold mb-1 tracking-wider" style={{ color: C.muted }}>דמי ניהול</p>
                <p className="text-[18px] font-extrabold leading-none tracking-tight" style={{ color: C.ink }}>
                  {product.managementFromBalance}%
                </p>
                <div className="h-1.5 w-full rounded-full mt-2 overflow-hidden" style={{ background: "hsl(0, 30%, 92%)" }}>
                  <div className="h-full rounded-full" style={{ background: "hsl(0, 60%, 60%)", width: `${currMgmtW}%` }} />
                </div>
              </div>

              <div className="text-right">
                <p className="text-[9px] font-bold mb-1 tracking-wider" style={{ color: C.muted }}>תשואה (3ש׳)</p>
                <p className="text-[18px] font-extrabold leading-none tracking-tight" style={{ color: C.ink }}>
                  {product.return3y}%
                </p>
                <div className="h-1.5 w-full rounded-full mt-2 overflow-hidden" style={{ background: "hsl(180, 15%, 90%)" }}>
                  <div className="h-full rounded-full" style={{ background: "hsl(200, 10%, 55%)", width: `${currRetW}%` }} />
                </div>
              </div>

              <div className="pt-2.5" style={{ borderTop: `1px solid ${C.hairline}` }}>
                <p className="text-[9px] font-bold mb-0.5 tracking-wider" style={{ color: C.muted }}>צבירה</p>
                <p className="text-[13px] font-extrabold tabular-nums" style={{ color: C.ink }}>
                  {formatNIS(product.balance)}
                </p>
              </div>
            </div>
          </div>

          {/* Recommended */}
          <div
            className="relative flex flex-col gap-4 p-3.5 rounded-2xl"
            style={{
              background: "hsla(176, 55%, 91%, 0.45)",
              border: `2px solid ${C.fresh}`,
              boxShadow: `0 10px 30px -10px hsla(174, 65%, 30%, 0.25)`,
            }}
          >
            <span
              className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[9.5px] font-extrabold px-3 py-1 rounded-full text-white whitespace-nowrap"
              style={{ background: C.fresh, boxShadow: "0 4px 10px hsla(174, 65%, 30%, 0.3)" }}
            >
              ✨ המלצה חכמה
            </span>

            <div className="flex flex-col items-center gap-2 mt-1">
              <div className="p-1.5 rounded-xl bg-white" style={{ boxShadow: "0 1px 3px hsla(178, 70%, 14%, 0.08)" }}>
                <ProviderLogo provider={alternative.provider} size={36} />
              </div>
              <div className="text-center">
                <p className="text-[9.5px] font-extrabold tracking-wider" style={{ color: C.fresh }}>מומלצת</p>
                <p className="text-[12px] font-bold leading-tight" style={{ color: C.deep }}>
                  {alternative.provider}
                </p>
              </div>
            </div>

            <div className="space-y-3.5">
              <div className="text-right">
                <p className="text-[9px] font-bold mb-1 tracking-wider" style={{ color: C.core, opacity: 0.7 }}>דמי ניהול</p>
                <div className="flex items-center gap-1.5">
                  <p className="text-[18px] font-extrabold leading-none tracking-tight" style={{ color: C.fresh }}>
                    {alternative.mgmt}%
                  </p>
                  <span
                    className="text-[9px] font-extrabold px-1.5 py-0.5 rounded"
                    style={{ background: "white", color: "hsl(150, 60%, 30%)", border: "1px solid hsl(150, 50%, 85%)" }}
                  >
                    −{mgmtDelta}%
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full mt-2 overflow-hidden" style={{ background: "hsla(178, 70%, 26%, 0.1)" }}>
                  <div className="h-full rounded-full" style={{ background: C.fresh, width: `${altMgmtW}%` }} />
                </div>
              </div>

              <div className="text-right">
                <p className="text-[9px] font-bold mb-1 tracking-wider" style={{ color: C.core, opacity: 0.7 }}>תשואה (3ש׳)</p>
                <div className="flex items-end gap-1">
                  <p className="text-[18px] font-extrabold leading-none tracking-tight" style={{ color: C.deep }}>
                    {alternative.return3y}%
                  </p>
                  <span className="text-[12px] mb-0.5" style={{ color: C.fresh }}>↑</span>
                </div>
                <div className="h-1.5 w-full rounded-full mt-2 overflow-hidden" style={{ background: "white" }}>
                  <div className="h-full rounded-full" style={{ background: C.fresh, width: `${altRetW}%` }} />
                </div>
              </div>

              <div className="pt-2.5" style={{ borderTop: `1px solid hsla(174, 65%, 42%, 0.2)` }}>
                <p className="text-[9px] font-bold mb-0.5 tracking-wider" style={{ color: C.core, opacity: 0.7 }}>פוטנציאל</p>
                <p className="text-[13px] font-extrabold tabular-nums" style={{ color: C.deep }}>
                  {formatNIS(savings)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Market Benchmark */}
        <div
          className="mx-4 mb-4 px-3.5 py-2 rounded-2xl flex items-center justify-between"
          style={{ background: "hsl(180, 12%, 97%)", border: `1px solid ${C.hairline}` }}
        >
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(220, 70%, 55%)" }} />
            <span className="text-[10.5px] font-bold" style={{ color: C.muted }}>ממוצע השוק</span>
          </div>
          <div className="text-[10px] font-medium" style={{ color: C.muted }}>
            <span className="font-extrabold" style={{ color: C.ink }}>
              {product.marketAvgFromBalance}%
            </span>{" "}
            דמי ניהול
          </div>
        </div>

        {/* Bottom Power Banner */}
        <div
          className="m-4 mt-0 rounded-3xl p-5 flex flex-col items-center text-center overflow-hidden relative"
          style={{ background: `linear-gradient(135deg, ${C.deep} 0%, ${C.core} 100%)` }}
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden>
            <svg width="100%" height="100%" fill="none" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 C 20 0 50 0 100 100" stroke="white" strokeWidth="0.5" fill="none" />
              <path d="M0 80 C 30 20 60 20 100 80" stroke="white" strokeWidth="0.5" fill="none" />
            </svg>
          </div>

          <p
            className="text-[10px] font-extrabold uppercase mb-1 relative z-10"
            style={{ color: "hsla(176, 55%, 91%, 0.7)", letterSpacing: "0.18em" }}
          >
            רווח מצטבר צפוי לפרישה
          </p>
          <h2 className="text-[32px] font-extrabold text-white tabular-nums leading-none tracking-tight relative z-10">
            +{formatNIS(savings)}
          </h2>
          <div
            className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full relative z-10"
            style={{ background: C.fresh }}
          >
            <span className="text-white text-[10.5px] font-bold">החיסכון המקסימלי האפשרי עבורך</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CtaBlock({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex justify-end mr-9">
      <div className="w-full max-w-[82%] flex flex-col gap-2">
        <button
          onClick={onClose}
          className="w-full rounded-xl py-3 text-[13px] font-extrabold text-white flex items-center justify-center gap-1.5 transition-transform active:scale-[0.97]"
          style={{
            background: "hsl(250, 30%, 8%)",
            boxShadow: "0 6px 18px hsla(250, 30%, 15%, 0.40)",
          }}
        >
          ⚡ עברו לקרן המומלצת
        </button>
        <button
          className="w-full rounded-xl py-2.5 text-[12.5px] font-bold flex items-center justify-center gap-1.5"
          style={{
            background: "white",
            color: "hsl(250, 45%, 15%)",
            border: "1px solid hsl(230, 20%, 88%)",
          }}
        >
          <MessageCircle className="h-3.5 w-3.5" />
          דברו עם דנה
        </button>
        <button
          className="w-full text-[11.5px] font-semibold py-1.5"
          style={{ color: "hsl(230, 15%, 55%)" }}
        >
          השוואה מפורטת ›
        </button>
      </div>
    </div>
  );
}
