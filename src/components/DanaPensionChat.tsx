import { useEffect, useRef, useState } from "react";
import { X, Mic, Send, ArrowLeftRight } from "lucide-react";
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

type Step = "intro" | "details" | "compare" | "ctas" | "declined" | "free";

type Msg =
  | { id: string; role: "dana"; kind: "text"; text: React.ReactNode }
  | { id: string; role: "user"; kind: "text"; text: string }
  | { id: string; role: "dana"; kind: "compare" }
  | { id: string; role: "dana"; kind: "ctas" }
  | { id: string; role: "dana"; kind: "leaks" };

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: PensionProduct;
  alternative: { provider: string; label: string; mgmt: number; return3y: number };
  savings: number;
}

// Build a second alternative based on the recommended one for side-by-side comparison
function buildSecondAlternative(primary: { provider: string; label: string; mgmt: number; return3y: number }) {
  const secondaryProviderMap: Record<string, string> = {
    "מנורה מבטחים": "אלטשולר שחם",
    "כלל": "הפניקס",
    "הראל": "מגדל",
    "מגדל": "כלל",
    "הפניקס": "מנורה מבטחים",
  };
  const provider = secondaryProviderMap[primary.provider] ?? "אלטשולר שחם";
  return {
    provider,
    label: "מסלול כללי",
    mgmt: Math.round((primary.mgmt + 0.08) * 100) / 100,
    return3y: Math.round(Math.max(0, primary.return3y - 2.4) * 10) / 10,
  };
}

export function DanaPensionChat({ open, onOpenChange, product, alternative, savings }: Props) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [step, setStep] = useState<Step>("intro");
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const secondAlt = buildSecondAlternative(alternative);

  useEffect(() => {
    if (!open) return;
    setMessages([]);
    setStep("intro");
    setInput("");
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
              מצאתי שתי קרנות שיכולות להרוויח לך{" "}
              <span
                className="inline-block font-extrabold px-1.5 py-0.5 rounded-md"
                style={{ background: "hsl(45, 95%, 88%)", color: "hsl(28, 80%, 25%)" }}
              >
                {formatNIS(savings)}
              </span>{" "}
              עד הפרישה 💰
              <br />
              הנה ההשוואה ביניהן 👇
            </>
          ),
        },
      ]);
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMessages((p) => [
          ...p,
          { id: "m2", role: "dana", kind: "compare" },
          { id: "m3", role: "dana", kind: "ctas" },
        ]);
        setStep("free");
      }, 900);
    }, 700);
    return () => clearTimeout(t1);
  }, [open, product, savings]);


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
        מצאתי לך שתי קרנות עם דמי ניהול נמוכים ותשואה חזקה יותר ✨
        <br />
        הנה השוואה ביניהן — הדגשתי את המומלצת ביותר עבורך 👇
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
        setStep("free");
      }, 600);
    }, 1100);
  };

  const handleNo = async () => {
    push({ id: crypto.randomUUID(), role: "user", kind: "text", text: "לא תודה" });
    setStep("free");
    await sayDana("אין בעיה 🙏 אני כאן אם תרצה לשאול אותי משהו נוסף — פשוט כתוב לי למטה.", 700);
  };

  const handleSend = () => {
    const txt = input.trim();
    if (!txt) return;
    push({ id: crypto.randomUUID(), role: "user", kind: "text", text: txt });
    setInput("");
    setStep("free");
    sayDana("שאלה מצוינת! אני בודקת את הנתונים שלך ואחזור אליך עם המלצה מותאמת אישית בעוד רגע 💡", 900);
  };

  const freeInputEnabled = step === "free" || step === "ctas" || step === "declined";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[90vh] rounded-t-3xl p-0 border-0 flex flex-col [&>button]:hidden"
        dir="rtl"
        style={{ background: "white" }}
      >
        <div className="tri-ring-c absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full" style={{ top: "-32px" }}>
          <div className="w-full h-full rounded-full overflow-hidden" style={{ boxShadow: "0 8px 24px hsla(250, 30%, 20%, 0.3)" }}>
            <img src={advisorImg} alt="דנה" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1.5 rounded-full" style={{ background: "hsl(230, 15%, 88%)" }} />
        </div>

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

        <ScrollArea className="flex-1">
          <div ref={scrollRef} className="px-4 py-5 space-y-3">
            {messages.map((m) => {
              if (m.role === "user") {
                return (
                  <div key={m.id} className="flex justify-start" dir="rtl">
                    <div
                      className="max-w-[80%] rounded-2xl rounded-bl-md px-3.5 py-2.5 text-[13px] font-medium text-right"
                      style={{
                        background: "hsl(250, 30%, 8%)",
                        color: "white",
                        boxShadow: "0 4px 14px hsla(250, 30%, 15%, 0.35)",
                      }}
                      dir="rtl"
                    >
                      {m.text}
                    </div>
                  </div>
                );
              }
              if (m.kind === "text") {
                return (
                  <div key={m.id} className="flex justify-end gap-2 items-end" dir="rtl">
                    <div
                      className="max-w-[82%] rounded-2xl rounded-br-md px-3.5 py-2.5 text-[13px] leading-relaxed text-right"
                      style={{
                        background: "white",
                        color: "hsl(250, 35%, 25%)",
                        border: "1px solid hsl(230, 20%, 92%)",
                        boxShadow: "0 2px 10px hsla(230, 30%, 50%, 0.06)",
                      }}
                      dir="rtl"
                    >
                      {m.text}
                    </div>
                    <img src={advisorImg} alt="" className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
                  </div>
                );
              }
              if (m.kind === "compare") {
                return <CompareCard key={m.id} recommended={alternative} other={secondAlt} savings={savings} onShowLeaks={handleShowLeaks} />;
              }
              if (m.kind === "ctas") {
                return <CtaBlock key={m.id} />;
              }
              if (m.kind === "leaks") {
                return <LeaksCard key={m.id} />;
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

        {/* Quick replies (intro stage only) — keep above input */}
        {step === "intro" && !typing && (
          <div className="px-4 pb-2 pt-2 flex gap-2" style={{ background: "white" }} dir="rtl">
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

        {/* Persistent free chat input — always visible, disabled during scripted flow */}
        <div className="px-5 py-3 border-t" style={{ borderColor: "hsl(230, 20%, 93%)", background: "white" }} dir="rtl">
          <div
            className="flex items-center gap-2 rounded-full px-4 py-2 transition-all"
            style={{
              background: !freeInputEnabled ? "hsl(230, 20%, 95%)" : input ? "white" : "hsl(230, 25%, 96%)",
              border: input ? "1px solid hsla(280, 60%, 38%, 0.55)" : "1px solid hsl(230, 20%, 90%)",
              boxShadow: input ? "0 0 0 3px hsla(280, 60%, 38%, 0.14)" : "none",
              opacity: freeInputEnabled ? 1 : 0.6,
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={!freeInputEnabled}
              placeholder={freeInputEnabled ? "שאל את Finansee AI..." : "דנה עונה..."}
              className="flex-1 bg-transparent text-sm outline-none text-right placeholder:text-xs disabled:cursor-not-allowed"
              style={{ color: "hsl(250, 40%, 20%)" }}
              dir="rtl"
            />
            {!input && (
              <button
                disabled={!freeInputEnabled}
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
                style={{ background: "white", border: "1px solid hsl(230, 20%, 90%)" }}
              >
                <Mic className="h-3.5 w-3.5" style={{ color: "hsl(230, 15%, 45%)" }} />
              </button>
            )}
            <button
              onClick={handleSend}
              disabled={!input.trim() || !freeInputEnabled}
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${input ? "cta-tri-c" : ""}`}
              style={{
                background: input ? undefined : "hsl(230, 20%, 88%)",
                boxShadow: input ? "0 4px 12px hsla(250, 30%, 15%, 0.4)" : "none",
              }}
            >
              <Send className="h-3.5 w-3.5 rotate-180" style={{ color: "white" }} />
            </button>
          </div>
        </div>
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

type AltOption = { provider: string; label: string; mgmt: number; return3y: number };

function CompareCard({
  recommended,
  other,
  savings,
}: {
  recommended: AltOption;
  other: AltOption;
  savings: number;
}) {
  const maxMgmt = Math.max(recommended.mgmt, other.mgmt, 0.5);
  const recMgmtW = (recommended.mgmt / maxMgmt) * 100;
  const otherMgmtW = (other.mgmt / maxMgmt) * 100;
  const maxRet = Math.max(recommended.return3y, other.return3y, 1);
  const recRetW = (recommended.return3y / maxRet) * 100;
  const otherRetW = (other.return3y / maxRet) * 100;
  const mgmtDelta = Math.round(((other.mgmt - recommended.mgmt) / other.mgmt) * 100);

  return (
    <div className="w-full" dir="rtl">
      <div
        className="w-full rounded-3xl bg-white overflow-hidden"
        style={{
          border: `1px solid ${C.hairline}`,
          boxShadow: "0 20px 50px hsla(178, 70%, 14%, 0.08)",
        }}
        dir="rtl"
      >
        {/* Header */}
        <div className="pt-5 px-5 pb-1 flex justify-between items-end" dir="rtl">
          <div className="text-right">
            <h3 className="text-[17px] font-extrabold tracking-tight" style={{ color: C.deep }}>
              השוואת קרנות מומלצות
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

        {/* Comparison — RTL: first child renders on the RIGHT */}
        <div className="p-3 grid grid-cols-2 gap-2.5 relative" dir="rtl">
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

          {/* Recommended — appears on RIGHT in RTL (first child) */}
          <div
            className="relative flex flex-col gap-4 p-3.5 rounded-2xl"
            style={{
              background: "hsla(176, 55%, 91%, 0.45)",
              border: `2px solid ${C.fresh}`,
              boxShadow: `0 10px 30px -10px hsla(174, 65%, 30%, 0.25)`,
            }}
            dir="rtl"
          >
            <span
              className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[9.5px] font-extrabold px-3 py-1 rounded-full text-white whitespace-nowrap"
              style={{ background: C.fresh, boxShadow: "0 4px 10px hsla(174, 65%, 30%, 0.3)" }}
            >
              ✨ המלצה חכמה
            </span>

            <div className="flex flex-col items-center gap-2 mt-1">
              <div className="p-1.5 rounded-xl bg-white" style={{ boxShadow: "0 1px 3px hsla(178, 70%, 14%, 0.08)" }}>
                <ProviderLogo provider={recommended.provider} size={36} />
              </div>
              <div className="text-center">
                <p className="text-[9.5px] font-extrabold tracking-wider" style={{ color: C.fresh }}>מומלצת</p>
                <p className="text-[12px] font-bold leading-tight" style={{ color: C.deep }}>
                  {recommended.provider}
                </p>
              </div>
            </div>

            <div className="space-y-3.5">
              <div className="text-right">
                <p className="text-[9px] font-bold mb-1 tracking-wider" style={{ color: C.core, opacity: 0.7 }}>דמי ניהול</p>
                <div className="flex items-center gap-1.5 flex-row-reverse justify-end">
                  <p className="text-[18px] font-extrabold leading-none tracking-tight" style={{ color: C.fresh }}>
                    {recommended.mgmt}%
                  </p>
                  <span
                    className="text-[9px] font-extrabold px-1.5 py-0.5 rounded"
                    style={{ background: "white", color: "hsl(150, 60%, 30%)", border: "1px solid hsl(150, 50%, 85%)" }}
                  >
                    −{mgmtDelta}%
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full mt-2 overflow-hidden" style={{ background: "hsla(178, 70%, 26%, 0.1)" }}>
                  <div className="h-full rounded-full" style={{ background: C.fresh, width: `${recMgmtW}%`, marginRight: 0, marginLeft: "auto" }} />
                </div>
              </div>

              <div className="text-right">
                <p className="text-[9px] font-bold mb-1 tracking-wider" style={{ color: C.core, opacity: 0.7 }}>תשואה (3ש׳)</p>
                <div className="flex items-end gap-1 flex-row-reverse justify-end">
                  <p className="text-[18px] font-extrabold leading-none tracking-tight" style={{ color: C.deep }}>
                    {recommended.return3y}%
                  </p>
                  <span className="text-[12px] mb-0.5" style={{ color: C.fresh }}>↑</span>
                </div>
                <div className="h-1.5 w-full rounded-full mt-2 overflow-hidden" style={{ background: "white" }}>
                  <div className="h-full rounded-full" style={{ background: C.fresh, width: `${recRetW}%`, marginRight: 0, marginLeft: "auto" }} />
                </div>
              </div>

              <div className="pt-2.5" style={{ borderTop: `1px solid hsla(174, 65%, 42%, 0.2)` }}>
                <p className="text-[9px] font-bold mb-0.5 tracking-wider" style={{ color: C.core, opacity: 0.7 }}>פוטנציאל</p>
                <p className="text-[13px] font-extrabold tabular-nums" style={{ color: C.deep }}>
                  {formatNIS(savings)}
                </p>
              </div>
            </div>

            <button
              className="w-full rounded-full py-2 text-[11px] font-bold text-white transition-transform active:scale-[0.97]"
              style={{ background: C.fresh, boxShadow: "0 4px 12px hsla(174, 65%, 30%, 0.25)" }}
            >
              בחינת הקרן ›
            </button>
          </div>


          {/* Other alternative — appears on LEFT in RTL (second child) */}
          <div
            className="flex flex-col gap-4 p-3.5 rounded-2xl"
            style={{ background: "hsl(180, 12%, 97%)", border: `1px solid ${C.hairline}` }}
            dir="rtl"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="p-1.5 rounded-xl bg-white" style={{ boxShadow: "0 1px 3px hsla(178, 70%, 14%, 0.06)" }}>
                <ProviderLogo provider={other.provider} size={36} />
              </div>
              <div className="text-center">
                <p className="text-[9.5px] font-extrabold tracking-wider" style={{ color: C.muted }}>
                  חלופה
                </p>
                <p className="text-[12px] font-bold leading-tight" style={{ color: C.ink }}>
                  {other.provider}
                </p>
              </div>
            </div>

            <div className="space-y-3.5">
              <div className="text-right">
                <p className="text-[9px] font-bold mb-1 tracking-wider" style={{ color: C.muted }}>דמי ניהול</p>
                <p className="text-[18px] font-extrabold leading-none tracking-tight" style={{ color: C.ink }}>
                  {other.mgmt}%
                </p>
                <div className="h-1.5 w-full rounded-full mt-2 overflow-hidden" style={{ background: "hsl(180, 15%, 92%)" }}>
                  <div className="h-full rounded-full" style={{ background: "hsl(200, 10%, 55%)", width: `${otherMgmtW}%`, marginRight: 0, marginLeft: "auto" }} />
                </div>
              </div>

              <div className="text-right">
                <p className="text-[9px] font-bold mb-1 tracking-wider" style={{ color: C.muted }}>תשואה (3ש׳)</p>
                <p className="text-[18px] font-extrabold leading-none tracking-tight" style={{ color: C.ink }}>
                  {other.return3y}%
                </p>
                <div className="h-1.5 w-full rounded-full mt-2 overflow-hidden" style={{ background: "hsl(180, 15%, 90%)" }}>
                  <div className="h-full rounded-full" style={{ background: "hsl(200, 10%, 55%)", width: `${otherRetW}%`, marginRight: 0, marginLeft: "auto" }} />
                </div>
              </div>

              <div className="pt-2.5" style={{ borderTop: `1px solid ${C.hairline}` }}>
                <p className="text-[9px] font-bold mb-0.5 tracking-wider" style={{ color: C.muted }}>מסלול</p>
                <p className="text-[13px] font-extrabold" style={{ color: C.ink }}>
                  {other.label}
                </p>
              </div>
            </div>

            <button
              className="w-full rounded-full py-2 text-[11px] font-bold transition-transform active:scale-[0.97]"
              style={{ background: "white", color: C.ink, border: `1px solid ${C.hairline}` }}
            >
              בחינת הקרן ›
            </button>
          </div>

        </div>

        {/* Bottom Power Banner */}
        <div
          className="m-4 mt-0 rounded-3xl p-5 flex flex-col items-center text-center overflow-hidden relative"
          style={{ background: `linear-gradient(135deg, ${C.deep} 0%, ${C.core} 100%)` }}
          dir="rtl"
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
          <h2 className="text-[32px] font-extrabold text-white tabular-nums leading-none tracking-tight relative z-10" dir="rtl">
            +{formatNIS(savings)}
          </h2>
          <div
            className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full relative z-10"
            style={{ background: C.fresh }}
          >
            <span className="text-white text-[10.5px] font-bold">החיסכון המקסימלי האפשרי עבורך</span>
          </div>
        </div>

        {/* CTAs inside card, centered, below the power banner */}
        <div className="px-4 pb-5 flex flex-col items-center gap-2" dir="rtl">
          <button
            className="w-full max-w-[280px] rounded-full py-3 text-[13px] font-extrabold text-white flex items-center justify-center gap-1.5 transition-transform active:scale-[0.97]"
            style={{
              background: "hsl(250, 30%, 8%)",
              boxShadow: "0 6px 18px hsla(250, 30%, 15%, 0.40)",
            }}
          >
            ⚡ עברו לקרן המומלצת
          </button>
          <button
            className="w-full max-w-[280px] rounded-full py-2.5 text-[11.5px] font-semibold"
            style={{ color: "hsl(230, 15%, 55%)", background: "transparent" }}
          >
            השוואה מפורטת ›
          </button>
        </div>
      </div>
    </div>
  );
}

function CtaBlock() {
  return null;
}

