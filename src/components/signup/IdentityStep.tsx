import { useState } from "react";
import { ShieldCheck, FileText, Camera, UserSquare2, Check, ChevronDown } from "lucide-react";

interface IdentityStepProps {
  idNumber: string;
  issueDate: string;
  onChange: (v: { idNumber: string; issueDate: string }) => void;
}

export const IdentityStep = ({ idNumber, issueDate, onChange }: IdentityStepProps) => {
  const [scanningId, setScanningId] = useState(false);
  const [scanningSelfie, setScanningSelfie] = useState(false);
  const [idDone, setIdDone] = useState(false);
  const [selfieDone, setSelfieDone] = useState(false);
  const [manualOpen, setManualOpen] = useState(false);

  const handleScanId = () => {
    setScanningId(true);
    setTimeout(() => {
      onChange({ idNumber: "123456789", issueDate: "15/03/2018" });
      setScanningId(false);
      setIdDone(true);
    }, 900);
  };

  const handleScanSelfie = () => {
    setScanningSelfie(true);
    setTimeout(() => {
      setScanningSelfie(false);
      setSelfieDone(true);
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

      {/* Capture buttons — above ID inputs */}
      <div className="grid grid-cols-2 gap-2.5 mb-3">
        <CaptureButton
          label="צילום ת.ז"
          icon={<Camera className="h-4 w-4" />}
          loading={scanningId}
          done={idDone}
          onClick={handleScanId}
        />
        <CaptureButton
          label="צילום סלפי לאימות"
          icon={<UserSquare2 className="h-4 w-4" />}
          loading={scanningSelfie}
          done={selfieDone}
          onClick={handleScanSelfie}
        />
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
    </div>
  );
};

const CaptureButton = ({
  label,
  icon,
  loading,
  done,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  loading: boolean;
  done: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    disabled={loading}
    className="rounded-2xl px-3 py-3 flex flex-col items-center justify-center gap-1.5 text-center transition-all active:scale-[0.97]"
    style={{
      background: done ? "hsl(150, 60%, 96%)" : "white",
      border: done
        ? "1.5px solid hsl(150, 55%, 55%)"
        : "1.5px dashed hsl(250, 30%, 80%)",
      boxShadow: done
        ? "0 6px 16px -10px hsla(150, 55%, 30%, 0.35)"
        : "0 4px 14px -10px hsla(250, 40%, 20%, 0.18)",
      color: done ? "hsl(150, 60%, 26%)" : "hsl(250, 40%, 25%)",
    }}
  >
    <span
      className="w-8 h-8 rounded-full flex items-center justify-center"
      style={{
        background: done ? "hsl(150, 55%, 88%)" : "hsl(250, 30%, 96%)",
        color: done ? "hsl(150, 60%, 26%)" : "hsl(262, 75%, 55%)",
      }}
    >
      {done ? <Check className="h-4 w-4" /> : icon}
    </span>
    <span className="text-[11.5px] font-bold leading-tight">
      {loading ? "סורק..." : done ? "צולם בהצלחה" : label}
    </span>
  </button>
);

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
