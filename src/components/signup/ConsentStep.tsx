import { ReactNode, useState } from "react";
import { ConsentAnnex } from "@/components/aha/ConsentAnnex";
import { SocialProofCallout } from "./SocialProofCallout";
import { PenLine, RotateCcw, Check } from "lucide-react";

interface ConsentStepProps {
  icon: ReactNode;
  iconBg: string;
  title: string;
  subtitle: string;
  bullets: string[];
  socialProof: string;
  showSignature?: boolean;
}

export const ConsentStep = ({
  icon,
  iconBg,
  title,
  subtitle,
  bullets,
  socialProof,
  showSignature = false,
}: ConsentStepProps) => {
  const [signed, setSigned] = useState(false);

  return (
    <div dir="rtl" className="px-5 pt-6 pb-4 flex flex-col h-full">
      <div className="flex-1 space-y-4">
        <ConsentAnnex
          icon={icon}
          iconBg={iconBg}
          title={title}
          subtitle={subtitle}
          bullets={bullets}
        />
        <SocialProofCallout text={socialProof} />

        {/* Digital signature mock — only when explicitly enabled */}
        {showSignature && (
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <p className="text-[12px] font-bold" style={{ color: "hsl(250, 40%, 20%)" }}>
              חתימה דיגיטלית
            </p>
            {signed && (
              <button
                type="button"
                onClick={() => setSigned(false)}
                className="inline-flex items-center gap-1 text-[10.5px] font-semibold"
                style={{ color: "hsl(230, 15%, 50%)" }}
              >
                <RotateCcw className="h-3 w-3" />
                נקה
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => setSigned(true)}
            className="w-full h-[110px] rounded-2xl flex items-center justify-center transition-all active:scale-[0.99] relative overflow-hidden"
            style={{
              background: signed ? "hsl(150, 60%, 97%)" : "white",
              border: signed
                ? "1.5px solid hsl(150, 55%, 55%)"
                : "1.5px dashed hsl(250, 30%, 80%)",
              boxShadow: signed
                ? "0 6px 16px -10px hsla(150, 55%, 30%, 0.35)"
                : "0 4px 14px -10px hsla(250, 40%, 20%, 0.12)",
            }}
            aria-label="חתום כאן"
          >
            {signed ? (
              <div className="flex flex-col items-center gap-1">
                {/* Faux signature stroke */}
                <svg width="160" height="48" viewBox="0 0 160 48" fill="none" aria-hidden>
                  <path
                    d="M6 32 Q 18 6, 30 28 T 58 26 Q 70 8, 84 30 T 114 22 Q 128 6, 142 30 L 152 24"
                    stroke="hsl(250, 50%, 20%)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
                <span
                  className="inline-flex items-center gap-1 text-[11px] font-bold"
                  style={{ color: "hsl(150, 60%, 26%)" }}
                >
                  <Check className="h-3.5 w-3.5" />
                  נחתם
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1.5">
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: "hsl(250, 30%, 96%)", color: "hsl(262, 75%, 55%)" }}
                >
                  <PenLine className="h-4 w-4" />
                </span>
                <span className="text-[12px] font-bold" style={{ color: "hsl(250, 40%, 25%)" }}>
                  חתמו כאן
                </span>
                <span className="text-[10.5px]" style={{ color: "hsl(230, 15%, 55%)" }}>
                  השאירו טביעה לאישור הגישה
                </span>
              </div>
            )}
          </button>
        </div>
        )}
      </div>
    </div>
  );
};
