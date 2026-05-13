import { useEffect, useRef, useState } from "react";

interface SmsCodeStepProps {
  phone: string;
  onComplete: (code: string) => void;
}

export const SmsCodeStep = ({ phone, onComplete }: SmsCodeStepProps) => {
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const [resentAt, setResentAt] = useState<number | null>(null);

  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (digits.every((d) => d !== "")) {
      onComplete(digits.join(""));
    }
  }, [digits, onComplete]);

  const setDigit = (i: number, v: string) => {
    const d = v.replace(/\D/g, "").slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[i] = d;
      return next;
    });
    if (d && i < 5) refs.current[i + 1]?.focus();
  };

  const onKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  };

  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const txt = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!txt) return;
    e.preventDefault();
    const next = ["", "", "", "", "", ""];
    for (let i = 0; i < txt.length; i++) next[i] = txt[i];
    setDigits(next);
    refs.current[Math.min(txt.length, 5)]?.focus();
  };

  const masked = phone ? `+972 ${phone.slice(0, -4).replace(/(\d{2,3})/g, "$1 ")}••${phone.slice(-2)}` : "";

  return (
    <div className="px-5 pt-6 pb-4 flex flex-col">
      <h1
        className="text-[26px] font-extrabold tracking-tight leading-[1.2] mb-2"
        style={{ color: "hsl(250, 50%, 10%)" }}
      >
        הקוד נשלח אליך
      </h1>
      <p className="text-[14px] leading-relaxed mb-8" style={{ color: "hsl(250, 22%, 42%)" }}>
        הזן את 6 הספרות שקיבלת ב-SMS
        {masked && <span className="block text-[12px] mt-1 font-medium" style={{ color: "hsl(250, 30%, 30%)" }}>{masked}</span>}
      </p>

      <div className="flex items-center justify-between gap-2" dir="ltr">
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => (refs.current[i] = el)}
            type="tel"
            inputMode="numeric"
            maxLength={1}
            value={d}
            onChange={(e) => setDigit(i, e.target.value)}
            onKeyDown={(e) => onKeyDown(i, e)}
            onPaste={onPaste}
            className="w-[46px] h-[56px] text-center text-[22px] font-extrabold rounded-xl bg-white outline-none transition-all"
            style={{
              border: d ? "1.5px solid hsl(262, 75%, 55%)" : "1px solid hsla(250, 30%, 88%, 0.9)",
              color: "hsl(250, 40%, 15%)",
              boxShadow: d
                ? "0 6px 16px -8px hsla(262, 75%, 45%, 0.35)"
                : "0 4px 12px -8px hsla(262, 50%, 30%, 0.12)",
            }}
          />
        ))}
      </div>

      <button
        onClick={() => setResentAt(Date.now())}
        className="mt-7 mx-auto text-[14px] font-semibold"
        style={{ color: "hsl(262, 75%, 45%)" }}
      >
        לא קיבלת? שלח שוב
      </button>
      {resentAt && (
        <p className="text-[12px] mt-2 text-center" style={{ color: "hsl(150, 60%, 35%)" }}>
          קוד חדש נשלח ✓
        </p>
      )}
    </div>
  );
};
