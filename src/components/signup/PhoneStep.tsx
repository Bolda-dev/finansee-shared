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
        <span style={{ color: "hsl(250, 50%, 10%)" }}>
          מספר הטלפון שלך
        </span>
      </h1>
      <p className="text-[14px] leading-relaxed mb-8" style={{ color: "hsl(250, 22%, 42%)" }}>
        נשלח לך קוד בן 6 ספרות לאימות
      </p>

      {/* Input row — RTL: country code on right, input on left */}
      <div
        className="flex items-stretch rounded-2xl overflow-hidden bg-white"
        style={{
          border: "1.5px solid hsl(230, 20%, 88%)",
          boxShadow: "0 8px 24px -16px hsla(262, 50%, 30%, 0.18)",
        }}
      >
        <div
          className="flex items-center gap-1.5 px-4 text-[14px] font-bold select-none flex-shrink-0"
          style={{
            color: "hsl(250, 40%, 20%)",
            background: "hsl(235, 30%, 97%)",
            borderRight: "1px solid hsl(230, 20%, 88%)",
          }}
        >
          <span style={{ color: "hsl(250, 25%, 50%)" }}>🇮🇱</span>
          +972
        </div>
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
          className="flex-1 px-4 py-3.5 text-[15px] font-semibold bg-transparent outline-none tracking-wide"
          style={{ color: "hsl(250, 40%, 15%)" }}
        />
      </div>

      <p className="text-[12px] mt-3 px-1" style={{ color: "hsl(250, 22%, 50%)" }}>
        אנו לא נשתף את המספר שלך עם אף אחד
      </p>
    </div>
  );
};
