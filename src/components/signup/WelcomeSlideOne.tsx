import { TrendingUp, TrendingDown, ShieldCheck, Wallet, Info } from "lucide-react";

export const WelcomeSlideOne = () => {
  return (
    <div className="px-6 pt-2 pb-6 flex flex-col">
      {/* Mock hero card */}
      <div className="relative mt-2 mb-10 flex justify-center">
        {/* Glow */}
        <div
          className="absolute inset-0 blur-3xl"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 50%, hsla(262, 75%, 60%, 0.35) 0%, transparent 70%)",
          }}
        />
        <div
          className="relative w-[290px] rounded-3xl px-5 py-5"
          style={{
            background: "hsla(0, 0%, 100%, 0.85)",
            backdropFilter: "blur(12px)",
            border: "1px solid hsla(250, 50%, 88%, 0.7)",
            boxShadow:
              "0 20px 50px -20px hsla(262, 60%, 30%, 0.35), 0 4px 12px hsla(262, 30%, 40%, 0.08)",
            transform: "rotate(-3deg)",
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
                background: "hsla(250, 50%, 99%, 0.7)",
                border: "1px solid hsla(250, 50%, 88%, 0.6)",
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
        className="text-[15px] text-center leading-relaxed mb-8 px-2"
        style={{ color: "hsl(250, 25%, 38%)" }}
      >
        Finansee אוסף את כל הנכסים, ההתחייבויות והביטוחים שלך למקום אחד —
        ומראה לך את שווי הנטו האמיתי שלך, מתעדכן כל יום
      </p>

      {/* Icon equation row */}
      <div className="flex items-center justify-center gap-2 px-2">
        <IconChip Icon={TrendingUp} label="נכסים" color="hsl(178, 70%, 32%)" bg="hsla(178, 70%, 32%, 0.1)" />
        <Plus />
        <IconChip Icon={TrendingDown} label="התחייבויות" color="hsl(220, 75%, 45%)" bg="hsla(220, 75%, 45%, 0.1)" />
        <Plus />
        <IconChip Icon={ShieldCheck} label="ביטוחים" color="hsl(262, 75%, 52%)" bg="hsla(262, 75%, 52%, 0.1)" />
        <Equals />
        <IconChip Icon={Wallet} label="שווי נטו" color="hsl(250, 50%, 20%)" bg="hsla(250, 50%, 20%, 0.08)" />
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
