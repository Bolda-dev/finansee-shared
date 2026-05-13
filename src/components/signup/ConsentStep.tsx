import { ReactNode } from "react";
import { ConsentAnnex } from "@/components/aha/ConsentAnnex";
import { SocialProofCallout } from "./SocialProofCallout";

interface ConsentStepProps {
  icon: ReactNode;
  iconBg: string;
  title: string;
  subtitle: string;
  bullets: string[];
  consentText: string;
  socialProof: string;
  checked: boolean;
  onToggle: () => void;
  onConfirm: () => void;
  onSkip: () => void;
}

export const ConsentStep = ({
  icon,
  iconBg,
  title,
  subtitle,
  bullets,
  consentText,
  socialProof,
  checked,
  onToggle,
  onConfirm,
  onSkip,
}: ConsentStepProps) => {
  return (
    <div dir="rtl" className="px-5 pt-6 pb-4 flex flex-col h-full">
      <div className="flex-1 space-y-4">
        <ConsentAnnex
          icon={icon}
          iconBg={iconBg}
          title={title}
          subtitle={subtitle}
          bullets={bullets}
          consentText={consentText}
          checked={checked}
          onToggle={onToggle}
        />
        <SocialProofCallout text={socialProof} />
      </div>

      <div className="space-y-3 pt-4">
        <button
          onClick={onConfirm}
          disabled={!checked}
          className="w-full rounded-full py-3.5 text-[15px] font-extrabold text-white transition-all active:scale-[0.98] disabled:opacity-40"
          style={{
            background: checked ? "hsl(0, 0%, 8%)" : "hsl(230, 18%, 80%)",
            boxShadow: checked ? "0 10px 24px -10px hsla(0, 0%, 0%, 0.5)" : "none",
          }}
        >
          אשר וחתום
        </button>
        <button
          onClick={onSkip}
          className="w-full text-center text-[13px] font-medium py-1"
          style={{ color: "hsl(230, 15%, 50%)" }}
        >
          דלג בינתיים
        </button>
      </div>
    </div>
  );
};
