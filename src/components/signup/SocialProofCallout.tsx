import { Sparkles } from "lucide-react";

export const SocialProofCallout = ({ text }: { text: string }) => (
  <div
    dir="rtl"
    className="flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5"
    style={{
      background: "linear-gradient(135deg, hsl(262, 75%, 97%) 0%, hsl(220, 85%, 97%) 100%)",
      border: "1px solid hsl(262, 50%, 92%)",
    }}
  >
    <span
      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
      style={{
        background: "linear-gradient(135deg, hsl(262, 75%, 55%), hsl(220, 85%, 55%))",
      }}
    >
      <Sparkles className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
    </span>
    <p
      className="text-[11.5px] font-semibold leading-snug flex-1 text-right"
      style={{ color: "hsl(250, 40%, 25%)" }}
    >
      {text}
    </p>
  </div>
);
