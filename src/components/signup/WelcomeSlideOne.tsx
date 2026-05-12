import { TrendingUp, TrendingDown, ShieldCheck, Wallet, Info } from "lucide-react";

export const WelcomeSlideOne = () => {
  return (
    <div className="px-5 pt-4 pb-6 flex flex-col">
      {/* Mock hero card — clean, no glow */}
      <div className="mt-4 mb-10 flex justify-center">
        <div
          className="w-[290px] rounded-3xl px-5 py-5 bg-white"
          style={{
            border: "1px solid hsl(250, 30%, 92%)",
            boxShadow:
              "0 12px 32px -16px hsla(250, 40%, 30%, 0.18), 0 2px 6px hsla(250, 30%, 40%, 0.05)",
          }}
        >
          <div className="flex items-center gap-1.5 mb-2">
            <p className="text-sm font-medium" style={{ color: "hsl(250, 35%, 30%)" }}>
              שווי נטו
            </p>
            <Info className="h-3.5 w-3.5" style={{ color: "hsl(250, 30%, 55%)" }} />
          </div>
          <div className="flex items-center gap-2 mb-1">
            <p
              className="font-extrabold tracking-tight text-3xl"
              style={{ color: "hsl(250, 50%, 12%)" }}
            >
              ₪10,200,000
            </p>
            <span
              className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{
                background: "hsl(250, 50%, 99%)",
                border: "1px solid hsl(250, 30%, 90%)",
                color: "hsl(262, 75%, 48%)",
              }}
            >
              <TrendingUp className="h-2.5 w-2.5" />
              1.8%+
            </span>
          </div>
          <p className="text-[10px]" style={{ color: "hsl(230, 15%, 55%)" }}>
            עודכן היום בשעה 09:41
          </p>
        </div>
      </div>

      {/* Headline */}
      <h1
        className="text-3xl font-extrabold tracking-tight text-center mb-3 leading-tight"
        style={{ color: "hsl(250, 40%, 15%)" }}
      >
        דע בדיוק כמה אתה שווה
      </h1>
      <p
        className="text-[15px] text-center leading-relaxed mb-10 px-2"
        style={{ color: "hsl(250, 25%, 38%)" }}
      >
        Finansee אוסף את כל הנכסים, ההתחייבויות והביטוחים שלך למקום אחד —
        ומראה לך את שווי הנטו האמיתי, מתעדכן כל יום
      </p>

      {/* Icon equation row */}
      <div className="flex items-center justify-center gap-2 px-2">
        <IconChip Icon={TrendingUp} label="נכסים" color="hsl(178, 70%, 32%)" bg="hsl(178, 60%, 95%)" />
        <Plus />
        <IconChip Icon={TrendingDown} label="התחייבויות" color="hsl(220, 75%, 45%)" bg="hsl(220, 60%, 96%)" />
        <Plus />
        <IconChip Icon={ShieldCheck} label="ביטוחים" color="hsl(262, 75%, 52%)" bg="hsl(262, 60%, 96%)" />
        <Equals />
        <IconChip Icon={Wallet} label="שווי נטו" color="hsl(250, 50%, 20%)" bg="hsl(250, 30%, 95%)" />
      </div>
    </div>
  );
};

const IconChip = ({
  Icon,
  label,
  color,
  bg,
}: {
  Icon: typeof TrendingUp;
  label: string;
  color: string;
  bg: string;
}) => (
  <div className="flex flex-col items-center gap-1.5 flex-1">
    <div
      className="h-10 w-10 rounded-2xl flex items-center justify-center"
      style={{ background: bg }}
    >
      <Icon className="h-5 w-5" style={{ color }} />
    </div>
    <span className="text-[10px] font-medium text-center leading-tight" style={{ color: "hsl(250, 30%, 35%)" }}>
      {label}
    </span>
  </div>
);

const Plus = () => (
  <span className="text-base font-bold mt-[-14px]" style={{ color: "hsl(250, 25%, 60%)" }}>
    +
  </span>
);
const Equals = () => (
  <span className="text-base font-bold mt-[-14px]" style={{ color: "hsl(250, 25%, 60%)" }}>
    =
  </span>
);
