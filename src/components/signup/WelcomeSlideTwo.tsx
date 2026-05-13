import advisorImg from "@/assets/advisor-avatar.jpg";
import type { CSSProperties, ReactNode } from "react";

type IconProps = { className?: string; style?: CSSProperties; strokeWidth?: number };
const SvgIcon = ({ className, style, children, strokeWidth = 2 }: IconProps & { children: ReactNode }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const ShieldCheck = (p: IconProps) => <SvgIcon {...p}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.25-2.4a1.4 1.4 0 0 1 1.5 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></SvgIcon>;
const EyeOff = (p: IconProps) => <SvgIcon {...p}><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><path d="m2 2 20 20" /></SvgIcon>;
const Pause = (p: IconProps) => <SvgIcon {...p}><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></SvgIcon>;
const Check = (p: IconProps) => <SvgIcon {...p} strokeWidth={3}><path d="M20 6 9 17l-5-5" /></SvgIcon>;
const Sparkle = (p: IconProps) => <SvgIcon {...p}><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></SvgIcon>;

export const WelcomeSlideTwo = () => {
  return (
    <div className="px-5 pt-2 pb-4 flex flex-col items-center" dir="rtl">
      <style>{`
        @keyframes ws2-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        @keyframes ws2-twinkle { 0%,100% { opacity: 0.3; transform: scale(0.85); } 50% { opacity: 1; transform: scale(1.1); } }
        @keyframes ws2-halo { 0%,100% { opacity: 0.85; transform: translateX(-50%) scale(1); } 50% { opacity: 1; transform: translateX(-50%) scale(1.06); } }
        @keyframes ws2-row-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .ws2-float { animation: ws2-float 4s ease-in-out infinite; }
        .ws2-twinkle { animation: ws2-twinkle 2.4s ease-in-out infinite; }
        .ws2-halo { animation: ws2-halo 4.5s ease-in-out infinite; }
        .ws2-row { animation: ws2-row-in 0.6s ease-out both; }
      `}</style>

      {/* Hero — Dana with ambient gradient halo and sparkles */}
      <DanaHero />

      <h1
        className="text-[28px] font-extrabold tracking-tight text-center mt-6 mb-3 leading-[1.15]"
        style={{ color: "hsl(250, 50%, 10%)" }}
      >
        תמונת מצב מלאה
        <br />
        <span
          style={{
            background:
              "linear-gradient(110deg, hsl(262, 75%, 45%) 0%, hsl(220, 85%, 50%) 50%, hsl(178, 70%, 38%) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          תוך 60 שניות בלבד
        </span>
      </h1>
      <p
        className="text-[14px] text-center leading-relaxed px-2 mb-5"
        style={{ color: "hsl(250, 22%, 42%)" }}
      >
        בלי טפסים. בלי שאלונים. מתחברים פעם אחת — ודנה תאסוף בעצמה את כל הנתונים מהמקורות הרשמיים.
      </p>

      {/* Stat strip — adds delight & credibility */}
      <div
        className="w-full flex items-stretch justify-around rounded-2xl py-3 px-2 mb-5"
        style={{
          background:
            "linear-gradient(135deg, hsla(262, 75%, 55%, 0.06) 0%, hsla(220, 85%, 55%, 0.06) 50%, hsla(178, 70%, 45%, 0.06) 100%)",
          border: "1px solid hsla(250, 40%, 88%, 0.7)",
        }}
      >
        {[
          { value: "60", label: "שניות" },
          { value: "100%", label: "אוטומטי" },
          { value: "0", label: "טפסים" },
        ].map((s, i) => (
          <div key={s.label} className="flex-1 flex flex-col items-center text-center">
            <span
              className="text-[18px] font-extrabold leading-none mb-1"
              style={{
                background:
                  "linear-gradient(135deg, hsl(262, 75%, 50%), hsl(220, 85%, 50%), hsl(178, 70%, 42%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {s.value}
            </span>
            <span className="text-[10.5px] font-medium" style={{ color: "hsl(250, 25%, 45%)" }}>
              {s.label}
            </span>
            {i < 2 && (
              <span
                className="absolute"
                aria-hidden
              />
            )}
          </div>
        ))}
      </div>

      {/* Trust pills */}
      <div className="w-full space-y-2.5">
        {[
          {
            text: "מאובטח ברמה בנקאית",
            sub: "הצפנה מלאה והרשאת משרד האוצר",
            Icon: ShieldCheck,
            gradient:
              "linear-gradient(135deg, hsl(178, 70%, 32%) 0%, hsl(174, 65%, 42%) 55%, hsl(170, 70%, 56%) 100%)",
            tint: "hsla(176, 70%, 90%, 0.5)",
          },
          {
            text: "אנחנו לא רואים סיסמאות",
            sub: "החיבור מתבצע מולך, ישירות מול המוסד",
            Icon: EyeOff,
            gradient:
              "linear-gradient(135deg, hsl(220, 85%, 48%) 0%, hsl(225, 90%, 60%) 55%, hsl(215, 95%, 75%) 100%)",
            tint: "hsla(220, 85%, 92%, 0.5)",
          },
          {
            text: "אפשר לעצור בכל שלב",
            sub: "בשליטה מלאה, ללא התחייבות",
            Icon: Pause,
            gradient:
              "linear-gradient(135deg, hsl(258, 72%, 55%) 0%, hsl(265, 78%, 65%) 55%, hsl(275, 85%, 78%) 100%)",
            tint: "hsla(262, 75%, 92%, 0.5)",
          },
        ].map((row, i) => (
          <div
            key={row.text}
            className="ws2-row flex items-center gap-3 px-3 py-2.5 rounded-2xl bg-white"
            style={{
              border: "1px solid hsla(250, 30%, 92%, 0.9)",
              boxShadow: "0 2px 10px -4px hsla(250, 40%, 30%, 0.06)",
              animationDelay: `${i * 0.1}s`,
            }}
          >
            <div
              className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 relative"
              style={{ background: row.gradient }}
            >
              <row.Icon className="h-4 w-4" style={{ color: "white" }} strokeWidth={2.4} />
              <span
                className="absolute -top-1 -left-1 h-4 w-4 rounded-full bg-white flex items-center justify-center"
                style={{ boxShadow: "0 1px 3px hsla(250, 40%, 25%, 0.2)" }}
              >
                <Check className="h-2.5 w-2.5" style={{ color: "hsl(150, 70%, 40%)" }} />
              </span>
            </div>
            <div className="flex-1 min-w-0 text-right">
              <p className="text-[13.5px] font-bold leading-tight" style={{ color: "hsl(250, 40%, 18%)" }}>
                {row.text}
              </p>
              <p className="text-[11px] leading-tight mt-0.5" style={{ color: "hsl(250, 18%, 50%)" }}>
                {row.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <p className="text-[10.5px] text-center mt-4 leading-relaxed" style={{ color: "hsl(250, 18%, 55%)" }}>
        מפוקח ע״י רשות שוק ההון · נתונים נשמרים מוצפנים
      </p>
    </div>
  );
};

const DanaHero = () => {
  return (
    <div className="relative w-full" style={{ height: 190 }}>
      {/* Ambient gradient halo */}
      <div
        className="absolute pointer-events-none ws2-halo"
        style={{
          left: "50%",
          top: 6,
          width: 340,
          height: 210,
          background:
            "radial-gradient(closest-side, hsla(262, 75%, 55%, 0.28), hsla(220, 85%, 55%, 0.14) 55%, hsla(178, 70%, 45%, 0) 80%)",
          filter: "blur(10px)",
        }}
      />

      {/* Sparkles */}
      <Sparkle
        className="absolute h-4 w-4 ws2-twinkle"
        style={{ top: 8, left: "26%", color: "hsl(262, 75%, 55%)", animationDelay: "0s" }}
      />
      <Sparkle
        className="absolute h-3 w-3 ws2-twinkle"
        style={{ top: 28, right: "22%", color: "hsl(178, 70%, 45%)", animationDelay: "0.6s" }}
      />
      <Sparkle
        className="absolute h-3.5 w-3.5 ws2-twinkle"
        style={{ top: 90, right: "18%", color: "hsl(220, 85%, 55%)", animationDelay: "1.2s" }}
      />
      <Sparkle
        className="absolute h-3 w-3 ws2-twinkle"
        style={{ top: 78, left: "20%", color: "hsl(262, 75%, 55%)", animationDelay: "0.3s" }}
      />

      {/* Avatar + speech bubble */}
      <div className="absolute inset-x-0 top-0 flex flex-col items-center ws2-float">
        <div
          className="relative rounded-full"
          style={{
            padding: 3,
            background:
              "linear-gradient(135deg, hsl(262, 75%, 55%), hsl(220, 85%, 55%), hsl(178, 70%, 45%))",
            boxShadow: "0 22px 44px -18px hsla(262, 60%, 30%, 0.55)",
          }}
        >
          <img
            src={advisorImg}
            alt="דנה"
            className="h-[92px] w-[92px] rounded-full object-cover"
            style={{ border: "3px solid white" }}
          />
          <span
            className="absolute -bottom-1 -left-1 h-5 w-5 rounded-full flex items-center justify-center"
            style={{
              background: "hsl(150, 70%, 45%)",
              border: "3px solid white",
            }}
          />
        </div>
        <div className="relative mt-3">
          <div
            className="px-4 py-2 rounded-2xl bg-white"
            style={{
              border: "1px solid hsl(250, 30%, 92%)",
              boxShadow: "0 10px 28px -12px hsla(262, 50%, 30%, 0.22)",
            }}
          >
            <p className="text-[11px] font-bold" style={{ color: "hsl(262, 75%, 45%)" }}>
              דנה · יועצת AI
            </p>
            <p className="text-[13px] leading-snug" style={{ color: "hsl(250, 35%, 22%)" }}>
              נצא לדרך? זה ייקח רק רגע 👋
            </p>
          </div>
          {/* tail pointing up to avatar */}
          <span
            className="absolute -top-1.5 right-1/2 translate-x-1/2 w-3 h-3 rotate-45"
            style={{
              background: "white",
              borderTop: "1px solid hsl(250, 30%, 92%)",
              borderLeft: "1px solid hsl(250, 30%, 92%)",
            }}
          />
        </div>
      </div>
    </div>
  );
};
