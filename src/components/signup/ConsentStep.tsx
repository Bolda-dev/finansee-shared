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
                {/* Animated signature with pen following the stroke */}
                <svg width="180" height="56" viewBox="0 0 180 56" fill="none" aria-hidden>
                  <defs>
                    <path
                      id="sig-path"
                      d="M8 36 Q 22 6, 36 32 T 66 28 Q 80 6, 96 34 T 128 22 Q 144 6, 158 32 L 172 26"
                      fill="none"
                    />
                  </defs>
                  <use
                    href="#sig-path"
                    stroke="hsl(250, 50%, 20%)"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      strokeDasharray: 360,
                      strokeDashoffset: 360,
                      animation: "sig-draw 1.1s ease-out forwards",
                    }}
                  />
                  {/* Pen nib following the stroke */}
                  <g style={{ animation: "sig-pen 1.1s ease-out forwards", offsetPath: "path('M8 36 Q 22 6, 36 32 T 66 28 Q 80 6, 96 34 T 128 22 Q 144 6, 158 32 L 172 26')" } as React.CSSProperties}>
                    <path
                      d="M-10 -14 L 0 0 L -4 4 Z"
                      fill="hsl(262, 75%, 55%)"
                    />
                    <rect x="-14" y="-22" width="6" height="10" rx="1.5" fill="hsl(250, 45%, 25%)" transform="rotate(35)" />
                  </g>
                </svg>
                <span
                  className="inline-flex items-center gap-1 text-[11px] font-bold"
                  style={{ color: "hsl(150, 60%, 26%)" }}
                >
                  <Check className="h-3.5 w-3.5" />
                  נחתם בהצלחה
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1.5">
                {/* Hand + pen illustration hint */}
                <span
                  className="relative w-11 h-11 rounded-full flex items-center justify-center"
                  style={{ background: "hsl(250, 30%, 96%)", color: "hsl(262, 75%, 55%)" }}
                >
                  <PenLine className="h-5 w-5" style={{ animation: "sig-hint 1.8s ease-in-out infinite" }} />
                </span>
                <span className="text-[12px] font-bold" style={{ color: "hsl(250, 40%, 25%)" }}>
                  חתמו כאן באצבע
                </span>
                {/* Dotted signature line */}
                <svg width="140" height="14" viewBox="0 0 140 14" fill="none" aria-hidden className="mt-0.5">
                  <line x1="6" y1="10" x2="134" y2="10" stroke="hsl(250, 30%, 80%)" strokeWidth="1.5" strokeDasharray="3 4" strokeLinecap="round" />
                  <text x="70" y="6" textAnchor="middle" fontSize="7" fill="hsl(230, 15%, 55%)">X</text>
                </svg>
              </div>
            )}
          </button>
        </div>
        )}
      </div>
    </div>
  );
};
