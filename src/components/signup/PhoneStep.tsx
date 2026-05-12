import { useRef } from "react";

interface PhoneStepProps {
  value: string;
  onChange: (v: string) => void;
}

export const PhoneStep = ({ value, onChange }: PhoneStepProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="px-5 pt-6 pb-4 flex flex-col">
      <h1
        className="text-[26px] font-extrabold tracking-tight leading-[1.2] mb-2"
        style={{ color: "hsl(250, 50%, 10%)" }}
      >
        הזן את{" "}
        <span
          style={{
            background:
              "linear-gradient(110deg, hsl(262, 75%, 45%) 0%, hsl(220, 85%, 50%) 50%, hsl(178, 70%, 38%) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          מספר הטלפון שלך
        </span>
      </h1>
      <p className="text-[14px] leading-relaxed mb-8" style={{ color: "hsl(250, 22%, 42%)" }}>
        נשלח לך קוד בן 6 ספרות לאימות
      </p>

      {/* Input row */}
      <div
        className="flex items-stretch rounded-2xl overflow-hidden bg-white"
        style={{
          border: "1px solid hsla(250, 30%, 88%, 0.9)",
          boxShadow: "0 8px 24px -16px hsla(262, 50%, 30%, 0.18)",
        }}
        dir="ltr"
      >
        <input
          ref={inputRef}
          type="tel"
          inputMode="numeric"
          autoFocus
          value={value}
          onChange={(e) => {
            const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
            onChange(digits);
          }}
          placeholder="50 123 4567"
          className="flex-1 px-4 py-4 text-[18px] font-semibold bg-transparent outline-none tracking-wide"
          style={{ color: "hsl(250, 40%, 15%)" }}
        />
        <div
          className="flex items-center px-4 text-[16px] font-bold select-none"
          style={{
            color: "hsl(250, 40%, 20%)",
            background: "hsl(235, 30%, 97%)",
            borderLeft: "1px solid hsla(250, 30%, 88%, 0.9)",
          }}
        >
          <span className="text-[13px] me-1.5" style={{ color: "hsl(250, 25%, 50%)" }}>🇮🇱</span>
          +972
        </div>
      </div>

      <p className="text-[12px] mt-3 px-1" style={{ color: "hsl(250, 22%, 50%)" }}>
        אנו לא נשתף את המספר שלך עם אף אחד
      </p>
    </div>
  );
};
