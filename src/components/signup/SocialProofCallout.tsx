import { Sparkles } from "lucide-react";

export const SocialProofCallout = ({ text }: { text: string }) => (
  <div
    dir="rtl"
    className="flex items-center gap-3 rounded-2xl px-4 py-3"
    style={{
      background: "linear-gradient(135deg, hsl(262, 75%, 97%) 0%, hsl(220, 85%, 97%) 100%)",
      border: "1px solid hsl(262, 50%, 92%)",
    }}
  >
    <span
      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
      style={{
        background: "linear-gradient(135deg, hsl(262, 75%, 55%), hsl(220, 85%, 55%))",
      }}
    >
      <Sparkles className="h-4 w-4 text-white" strokeWidth={2.5} />
    </span>
    <p
      className="text-[13px] font-bold leading-snug flex-1 text-right"
      style={{ color: "hsl(250, 40%, 25%)" }}
    >
      {text}
    </p>
  </div>
);
