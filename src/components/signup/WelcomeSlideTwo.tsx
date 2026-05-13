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
const Sparkle = (p: IconProps) => <SvgIcon {...p}><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></SvgIcon>;
const Link2 = (p: IconProps) => <SvgIcon {...p}><path d="M9 17H7A5 5 0 0 1 7 7h2" /><path d="M15 7h2a5 5 0 1 1 0 10h-2" /><line x1="8" y1="12" x2="16" y2="12" /></SvgIcon>;
const Wand = (p: IconProps) => <SvgIcon {...p}><path d="M15 4V2M15 16v-2M8 9h2M20 9h2M17.8 11.8 19 13M15 9h0M17.8 6.2 19 5M3 21l9-9M12.2 6.2 11 5" /></SvgIcon>;
const Eye = (p: IconProps) => <SvgIcon {...p}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></SvgIcon>;

export const WelcomeSlideTwo = () => {
  return (
    <div className="px-5 pt-2 pb-4 flex flex-col items-center" dir="rtl">
      <style>{`
        @keyframes ws2-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        @keyframes ws2-twinkle { 0%,100% { opacity: 0.3; transform: scale(0.85); } 50% { opacity: 1; transform: scale(1.1); } }
        @keyframes ws2-halo { 0%,100% { opacity: 0.85; transform: translateX(-50%) scale(1); } 50% { opacity: 1; transform: translateX(-50%) scale(1.06); } }
        @keyframes ws2-slide-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ws2-shimmer {
          0% { background-position: 200% 50%; }
          100% { background-position: -200% 50%; }
        }
        .ws2-float { animation: ws2-float 4s ease-in-out infinite; }
        .ws2-twinkle { animation: ws2-twinkle 2.4s ease-in-out infinite; }
        .ws2-halo { animation: ws2-halo 4.5s ease-in-out infinite; }
        .ws2-row { animation: ws2-slide-in 0.5s ease-out both; }
        .ws2-shimmer-text {
          background: linear-gradient(90deg,
            hsl(262, 75%, 45%) 0%,
            hsl(220, 85%, 50%) 25%,
            hsl(178, 70%, 40%) 50%,
            hsl(220, 85%, 50%) 75%,
            hsl(262, 75%, 45%) 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: ws2-shimmer 4s linear infinite;
        }
      `}</style>

      {/* Hero */}
      <DanaHero />

      <h1
        className="text-[27px] font-extrabold tracking-tight text-center mt-5 mb-2 leading-[1.15]"
        style={{ color: "hsl(250, 50%, 10%)" }}
      >
        השווי האמיתי שלך
        <br />
        <span className="ws2-shimmer-text">חשוף תוך דקה</span>
      </h1>
      <p
        className="text-[13.5px] text-center leading-relaxed px-2 mb-5"
        style={{ color: "hsl(250, 22%, 42%)" }}
      >
        בלי טפסים. בלי שאלונים. דנה מתחברת למקורות הרשמיים ומציגה לך תמונה פיננסית מלאה — שלא ראית אף פעם.
      </p>

      {/* How it works — 3 step timeline */}
      <div className="w-full mb-5">
        <div className="relative">
          {/* connecting line */}
          <div
            className="absolute top-5 right-5 left-5 h-[2px]"
            style={{
              background:
                "linear-gradient(90deg, hsl(178, 70%, 50%) 0%, hsl(220, 85%, 60%) 50%, hsl(262, 75%, 60%) 100%)",
              opacity: 0.35,
            }}
          />
          <div className="relative grid grid-cols-3 gap-2">
            {[
              { n: 1, label: "מתחברים", sub: "פעם אחת", Icon: Link2, color: "hsl(178, 70%, 38%)", grad: "linear-gradient(135deg, hsl(178, 70%, 38%), hsl(174, 70%, 50%))" },
              { n: 2, label: "דנה אוספת", sub: "אוטומטית", Icon: Wand, color: "hsl(220, 85%, 50%)", grad: "linear-gradient(135deg, hsl(220, 85%, 50%), hsl(225, 90%, 62%))" },
              { n: 3, label: "רואים הכול", sub: "במקום אחד", Icon: Eye, color: "hsl(262, 75%, 52%)", grad: "linear-gradient(135deg, hsl(262, 75%, 52%), hsl(270, 78%, 65%))" },
            ].map((s, i) => (
              <div
                key={s.n}
                className="ws2-row flex flex-col items-center text-center"
                style={{ animationDelay: `${0.1 + i * 0.1}s` }}
              >
                <div
                  className="relative w-10 h-10 rounded-full flex items-center justify-center mb-1.5"
                  style={{
                    background: s.grad,
                    boxShadow: `0 6px 14px -4px ${s.color}66`,
                  }}
                >
                  <s.Icon className="h-4 w-4" style={{ color: "white" }} strokeWidth={2.4} />
                  <span
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white flex items-center justify-center text-[9px] font-extrabold"
                    style={{ color: s.color, boxShadow: "0 1px 3px hsla(250, 40%, 25%, 0.18)" }}
                  >
                    {s.n}
                  </span>
                </div>
                <p className="text-[11.5px] font-bold leading-tight" style={{ color: "hsl(250, 40%, 18%)" }}>
                  {s.label}
                </p>
                <p className="text-[10px] leading-tight mt-0.5" style={{ color: "hsl(250, 18%, 50%)" }}>
                  {s.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust pills */}
      <div className="w-full space-y-2">
        {[
          {
            text: "מאובטח ברמה בנקאית",
            sub: "הצפנה מקצה לקצה",
            Icon: ShieldCheck,
            gradient:
              "linear-gradient(135deg, hsl(178, 70%, 32%) 0%, hsl(174, 65%, 42%) 55%, hsl(170, 70%, 56%) 100%)",
          },
          {
            text: "בלי לחשוף סיסמאות",
            sub: "החיבור מבוצע מולך, ישירות מול המוסד",
            Icon: EyeOff,
            gradient:
              "linear-gradient(135deg, hsl(220, 85%, 48%) 0%, hsl(225, 90%, 60%) 55%, hsl(215, 95%, 75%) 100%)",
          },
          {
            text: "אפשר לעצור בכל שלב",
            sub: "שליטה מלאה. ללא התחייבות",
            Icon: Pause,
            gradient:
              "linear-gradient(135deg, hsl(258, 72%, 55%) 0%, hsl(265, 78%, 65%) 55%, hsl(275, 85%, 78%) 100%)",
          },
        ].map((row, i) => (
          <div
            key={row.text}
            className="ws2-row flex items-center gap-3 px-3 py-2 rounded-2xl bg-white"
            style={{
              border: "1px solid hsla(250, 30%, 92%, 0.9)",
              boxShadow: "0 2px 10px -4px hsla(250, 40%, 30%, 0.06)",
              animationDelay: `${0.4 + i * 0.08}s`,
            }}
          >
            <div
              className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: row.gradient }}
            >
              <row.Icon className="h-4 w-4" style={{ color: "white" }} strokeWidth={2.4} />
            </div>
            <div className="flex-1 min-w-0 text-right">
              <p className="text-[13px] font-bold leading-tight" style={{ color: "hsl(250, 40%, 18%)" }}>
                {row.text}
              </p>
              <p className="text-[10.5px] leading-tight mt-0.5" style={{ color: "hsl(250, 18%, 50%)" }}>
                {row.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-center mt-3 leading-relaxed" style={{ color: "hsl(250, 18%, 55%)" }}>
        מפוקח ע״י רשות שוק ההון · נתונים מוצפנים ולעולם לא נמכרים
      </p>
    </div>
  );
};

const DanaHero = () => {
  return (
    <div className="relative w-full" style={{ height: 200 }}>
      {/* Ambient halo */}
      <div
        className="absolute pointer-events-none ws2-halo"
        style={{
          left: "50%",
          top: 6,
          width: 340,
          height: 220,
          background:
            "radial-gradient(closest-side, hsla(262, 75%, 55%, 0.3), hsla(220, 85%, 55%, 0.14) 55%, hsla(178, 70%, 45%, 0) 80%)",
          filter: "blur(10px)",
        }}
      />

      {/* Sparkles */}
      <Sparkle className="absolute h-4 w-4 ws2-twinkle" style={{ top: 12, left: "22%", color: "hsl(262, 75%, 55%)", animationDelay: "0s" }} />
      <Sparkle className="absolute h-3 w-3 ws2-twinkle" style={{ top: 32, right: "18%", color: "hsl(178, 70%, 45%)", animationDelay: "0.6s" }} />
      <Sparkle className="absolute h-3.5 w-3.5 ws2-twinkle" style={{ top: 110, right: "14%", color: "hsl(220, 85%, 55%)", animationDelay: "1.2s" }} />
      <Sparkle className="absolute h-3 w-3 ws2-twinkle" style={{ top: 96, left: "16%", color: "hsl(262, 75%, 55%)", animationDelay: "0.3s" }} />

      {/* Avatar + floating preview card */}
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
            className="h-[88px] w-[88px] rounded-full object-cover"
            style={{ border: "3px solid white" }}
          />
          <span
            className="absolute -bottom-1 -left-1 h-5 w-5 rounded-full"
            style={{ background: "hsl(150, 70%, 45%)", border: "3px solid white" }}
          />
        </div>

        {/* Floating preview card — shows what they'll see */}
        <div
          className="relative mt-3 px-4 py-2.5 rounded-2xl bg-white"
          style={{
            border: "1px solid hsl(250, 30%, 92%)",
            boxShadow: "0 14px 32px -14px hsla(262, 50%, 30%, 0.28)",
            minWidth: 220,
          }}
        >
          <p className="text-[10px] font-medium text-center mb-0.5" style={{ color: "hsl(250, 22%, 50%)" }}>
            השווי האמיתי שלך
          </p>
          <p
            className="text-[20px] font-extrabold text-center leading-none"
            style={{
              background:
                "linear-gradient(110deg, hsl(262, 75%, 45%) 0%, hsl(220, 85%, 50%) 50%, hsl(178, 70%, 38%) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ₪450K – ₪1.2M
          </p>
          {/* tail */}
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
