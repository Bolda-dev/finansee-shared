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
}: ConsentStepProps) => {
  return (
    <div dir="rtl" className="px-5 pt-6 pb-4 flex flex-col h-full">
      <div className="flex-1 space-y-4">
        <SocialProofCallout text={socialProof} />
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
      </div>
    </div>
  );
}
