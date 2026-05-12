import advisorImg from "@/assets/advisor-avatar.jpg";
import type { CSSProperties, ReactNode } from "react";

type IconProps = { className?: string; style?: CSSProperties };
const SvgIcon = ({ className, style, children, strokeWidth = 2 }: IconProps & { children: ReactNode; strokeWidth?: number }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const ShieldCheck = (p: IconProps) => <SvgIcon {...p}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.25-2.4a1.4 1.4 0 0 1 1.5 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></SvgIcon>;
const EyeOff = (p: IconProps) => <SvgIcon {...p}><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><path d="m2 2 20 20" /></SvgIcon>;
const Pause = (p: IconProps) => <SvgIcon {...p}><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></SvgIcon>;

export const WelcomeSlideTwo = () => {
  return (
    <div className="px-5 pt-2 pb-4 flex flex-col items-center">
      {/* Hero — Dana with ambient gradient halo (same principle as slide 1) */}
      <DanaHero />

      <h1
        className="text-[28px] font-extrabold tracking-tight text-center mt-7 mb-3 leading-[1.15]"
        style={{ color: "hsl(250, 50%, 10%)" }}
      >
        60 שניות.
        <br />
        <span
          style={{
            background:
              "linear-gradient(110deg, hsl(262, 75%, 45%) 0%, hsl(220, 85%, 50%) 50%, hsl(178, 70%, 38%) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          בלי טפסים. בלי שאלונים.
        </span>
      </h1>
      <p
        className="text-[14px] text-center leading-relaxed px-3 mb-6"
        style={{ color: "hsl(250, 22%, 42%)" }}
      >
        מתחברים פעם אחת, ודנה — היועצת ה-AI שלך — מושכת את כל הנתונים בעצמה
      </p>

      {/* Trust pills — clean, with semantic gradient chips */}
      <div className="w-full space-y-2.5">
        {[
          {
            text: "מאובטח ברמה בנקאית",
            Icon: ShieldCheck,
            gradient:
              "linear-gradient(135deg, hsl(178, 70%, 32%) 0%, hsl(174, 65%, 42%) 55%, hsl(170, 70%, 56%) 100%)",
            iconColor: "hsl(178, 70%, 30%)",
          },
          {
            text: "אנחנו לא רואים סיסמאות",
            Icon: EyeOff,
            gradient:
              "linear-gradient(135deg, hsl(220, 85%, 48%) 0%, hsl(225, 90%, 60%) 55%, hsl(215, 95%, 75%) 100%)",
            iconColor: "hsl(222, 85%, 45%)",
          },
          {
            text: "אפשר לעצור בכל שלב",
            Icon: Pause,
            gradient:
              "linear-gradient(135deg, hsl(258, 72%, 55%) 0%, hsl(265, 78%, 65%) 55%, hsl(275, 85%, 78%) 100%)",
            iconColor: "hsl(262, 75%, 52%)",
          },
        ].map((row) => (
          <div
            key={row.text}
            className="flex items-center gap-3 px-3 py-2.5 rounded-2xl bg-white"
            style={{ border: "1px solid hsla(250, 30%, 92%, 0.9)" }}
          >
            <div
              className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: row.gradient }}
            >
              <row.Icon className="h-4 w-4" style={{ color: "white" }} strokeWidth={2.4} />
            </div>
            <span className="text-sm font-semibold" style={{ color: "hsl(250, 40%, 18%)" }}>
              {row.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const DanaHero = () => {
  return (
    <div className="relative w-full" style={{ height: 180 }}>
      {/* Ambient gradient halo — sits in the background */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "50%",
          top: 10,
          transform: "translateX(-50%)",
          width: 320,
          height: 200,
          background:
            "radial-gradient(closest-side, hsla(262, 75%, 55%, 0.22), hsla(220, 85%, 55%, 0.12) 55%, hsla(178, 70%, 45%, 0) 80%)",
          filter: "blur(8px)",
        }}
      />
      {/* Avatar + speech bubble */}
      <div className="absolute inset-x-0 top-0 flex flex-col items-center">
        <div
          className="relative rounded-full"
          style={{
            padding: 3,
            background:
              "linear-gradient(135deg, hsl(262, 75%, 55%), hsl(220, 85%, 55%), hsl(178, 70%, 45%))",
            boxShadow: "0 18px 40px -16px hsla(262, 60%, 30%, 0.45)",
          }}
        >
          <img
            src={advisorImg}
            alt="דנה"
            className="h-[88px] w-[88px] rounded-full object-cover"
            style={{ border: "3px solid white" }}
          />
          <span
            className="absolute -bottom-1 -left-1 h-5 w-5 rounded-full"
            style={{
              background: "hsl(150, 70%, 45%)",
              border: "3px solid white",
            }}
          />
        </div>
        <div
          className="mt-3 px-4 py-2 rounded-2xl bg-white"
          style={{
            border: "1px solid hsl(250, 30%, 92%)",
            boxShadow: "0 8px 24px -12px hsla(262, 50%, 30%, 0.18)",
          }}
        >
          <p className="text-[11px] font-bold" style={{ color: "hsl(262, 75%, 45%)" }}>
            דנה · יועצת AI
          </p>
          <p className="text-[13px] leading-snug" style={{ color: "hsl(250, 35%, 22%)" }}>
            היי, אני אדריך אותך 60 שניות 👋
          </p>
        </div>
      </div>
    </div>
  );
};
