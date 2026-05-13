import { useState } from "react";
import { ShieldCheck, FileText, Camera } from "lucide-react";

interface IdentityStepProps {
  idNumber: string;
  issueDate: string;
  onChange: (v: { idNumber: string; issueDate: string }) => void;
}

export const IdentityStep = ({ idNumber, issueDate, onChange }: IdentityStepProps) => {
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    setScanning(true);
    // Simulate scan auto-fill
    setTimeout(() => {
      onChange({ idNumber: "123456789", issueDate: "15/03/2018" });
      setScanning(false);
    }, 900);
  };

  return (
    <div dir="rtl" className="px-5 pt-6 pb-4 flex flex-col h-full">
      {/* Title */}
      <h1
        className="text-[24px] font-extrabold tracking-tight leading-[1.2] mb-1.5"
        style={{ color: "hsl(250, 50%, 10%)" }}
      >
        אימות זהות ואישורי גישה
      </h1>
      <p className="text-[13px] leading-relaxed mb-5" style={{ color: "hsl(250, 22%, 42%)" }}>
        כדי לאסוף את המידע הפנסיוני והביטוחי שלך,
        נצטרך לאמת את זהותך ולקבל אישור גישה
      </p>

      {/* Two connections preview */}
      <div className="space-y-2.5 mb-5">
        <div
          className="rounded-2xl p-3.5 flex items-center gap-3"
          style={{
            background: "hsl(176, 55%, 96%)",
            border: "1px solid hsl(176, 55%, 90%)",
          }}
        >
          <span
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, hsl(178, 70%, 32%), hsl(174, 65%, 42%))" }}
          >
            <ShieldCheck className="h-5 w-5 text-white" />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-[13.5px] font-extrabold leading-tight" style={{ color: "hsl(250, 40%, 15%)" }}>
              הר הביטוח
            </p>
            <p className="text-[11px] leading-snug mt-0.5" style={{ color: "hsl(230, 15%, 45%)" }}>
              איסוף פרטי הביטוח שלך ממסד הנתונים המרכזי
            </p>
          </div>
        </div>

        <div
          className="rounded-2xl p-3.5 flex items-center gap-3"
          style={{
            background: "hsl(260, 75%, 96%)",
            border: "1px solid hsl(260, 50%, 92%)",
          }}
        >
          <span
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, hsl(262, 75%, 55%), hsl(265, 78%, 65%))" }}
          >
            <FileText className="h-5 w-5 text-white" />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-[13.5px] font-extrabold leading-tight" style={{ color: "hsl(250, 40%, 15%)" }}>
              מסלקת הפנסיה
            </p>
            <p className="text-[11px] leading-snug mt-0.5" style={{ color: "hsl(230, 15%, 45%)" }}>
              איסוף פרטי הפנסיה וקופות הגמל שלך
            </p>
          </div>
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-2.5">
        <FieldInput
          label="מספר תעודת זהות"
          placeholder="9 ספרות"
          value={idNumber}
          inputMode="numeric"
          onChange={(v) => onChange({ idNumber: v.replace(/\D/g, "").slice(0, 9), issueDate })}
        />
        <FieldInput
          label="תאריך הוצאת תעודה"
          placeholder="DD/MM/YYYY"
          value={issueDate}
          onChange={(v) => onChange({ idNumber, issueDate: v })}
        />
      </div>

      {/* Scan ID button */}
      <button
        onClick={handleScan}
        disabled={scanning}
        className="mt-3 self-start inline-flex items-center gap-1.5 text-[12px] font-semibold px-3 py-2 rounded-full transition-all active:scale-[0.97]"
        style={{
          background: "white",
          color: "hsl(220, 85%, 45%)",
          border: "1px solid hsl(220, 50%, 88%)",
        }}
      >
        <Camera className="h-3.5 w-3.5" />
        {scanning ? "סורק..." : "צילום תעודת זהות"}
      </button>
    </div>
  );
};

const FieldInput = ({
  label,
  value,
  onChange,
  placeholder,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  inputMode?: "text" | "numeric";
}) => (
  <div
    className="rounded-2xl bg-white"
    style={{
      border: value ? "1.5px solid hsl(262, 75%, 55%)" : "1px solid hsla(250, 30%, 88%, 0.9)",
      boxShadow: "0 8px 24px -16px hsla(262, 50%, 30%, 0.18)",
    }}
  >
    <label className="block text-[11px] font-semibold pt-2.5 px-4" style={{ color: "hsl(250, 25%, 50%)" }}>
      {label}
    </label>
    <input
      type="text"
      inputMode={inputMode}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 pb-3 pt-0.5 text-[16px] font-semibold bg-transparent outline-none"
      style={{ color: "hsl(250, 40%, 15%)" }}
    />
  </div>
);
