import type { CSSProperties, ReactNode } from "react";

type IconProps = { className?: string; style?: CSSProperties };

const SvgIcon = ({ className, style, children }: IconProps & { children: ReactNode }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const Menu = (props: IconProps) => <SvgIcon {...props}><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></SvgIcon>;
const Info = (props: IconProps) => <SvgIcon {...props}><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></SvgIcon>;
const TrendingUp = (props: IconProps) => <SvgIcon {...props}><path d="m3 17 6-6 4 4 8-8" /><path d="M14 7h7v7" /></SvgIcon>;
const TrendingDown = (props: IconProps) => <SvgIcon {...props}><path d="m3 7 6 6 4-4 8 8" /><path d="M14 17h7v-7" /></SvgIcon>;
const ShieldCheck = (props: IconProps) => <SvgIcon {...props}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.25-2.4a1.4 1.4 0 0 1 1.5 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></SvgIcon>;

export const WelcomeSlideOne = () => {
  return (
    <div className="px-5 pt-2 pb-4 flex flex-col items-center">
      {/* Phone mockup with the actual dashboard top */}
      <PhoneMockup />

      {/* Marketing headline */}
      <h1
        className="text-[28px] font-extrabold tracking-tight text-center mt-7 mb-3 leading-[1.15]"
        style={{ color: "hsl(250, 50%, 10%)" }}
      >
        כל ההון שלך.
        <br />
        <span
          style={{
            background:
              "linear-gradient(110deg, hsl(262, 75%, 45%) 0%, hsl(220, 85%, 50%) 50%, hsl(178, 70%, 38%) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          תמונה אחת. בלי הפתעות.
        </span>
      </h1>
      <p
        className="text-[14px] text-center leading-relaxed px-3"
        style={{ color: "hsl(250, 22%, 42%)" }}
      >
        נכסים, התחייבויות וביטוחים — מתעדכנים אוטומטית, כל יום
      </p>
    </div>
  );
};

const PhoneMockup = () => {
  return (
    <div
      className="relative"
      style={{ width: 320, height: 320, overflow: "hidden" }}
    >
      {/* Tilted phone — only top half visible */}
      <div
        className="absolute top-5"
        style={{
          left: 20,
          transform: "rotate(-2deg)",
          transformOrigin: "center top",
          width: 280,
          height: 520,
        }}
      >
        <div
          className="rounded-[42px] p-3 w-full h-full"
          style={{
            background:
              "linear-gradient(155deg, hsl(250, 25%, 18%) 0%, hsl(240, 20%, 8%) 100%)",
            boxShadow:
              "0 40px 80px -20px hsla(250, 50%, 20%, 0.5), 0 18px 30px -14px hsla(250, 40%, 25%, 0.3), inset 0 1px 0 hsla(0, 0%, 100%, 0.08)",
          }}
        >
          {/* Notch */}
          <div
            className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 rounded-b-2xl z-10"
            style={{ background: "hsl(240, 20%, 5%)" }}
          />
          {/* Screen */}
          <div
            className="rounded-[32px] overflow-hidden relative w-full h-full"
            style={{ background: "hsl(235, 30%, 97%)" }}
            dir="rtl"
          >
            <div
              className="absolute inset-x-0 top-0 h-[60%] pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, hsl(0, 0%, 100%) 0%, hsl(230, 20%, 96%) 60%, hsl(235, 30%, 97%) 100%)",
              }}
            />
            <div className="relative px-3 pt-7 pb-2">
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{
                    background: "hsla(250, 40%, 99%, 0.7)",
                    border: "1px solid hsla(250, 50%, 92%, 0.6)",
                  }}
                >
                  <Menu className="h-3.5 w-3.5" style={{ color: "hsl(250, 40%, 20%)" }} />
                </div>
                <div className="text-[8px] font-medium" style={{ color: "hsl(250, 40%, 20%)" }}>
                  09:41
                </div>
              </div>
              <p className="text-[10px] font-bold mb-2" style={{ color: "hsl(250, 40%, 15%)" }}>
                בוקר טוב, יוסי
              </p>

              <div className="flex items-center gap-1 mb-1">
                <p className="text-[9px] font-medium" style={{ color: "hsl(250, 35%, 30%)" }}>
                  שווי נטו
                </p>
                <Info className="h-2 w-2" style={{ color: "hsl(250, 30%, 55%)" }} />
              </div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <p
                  className="font-extrabold tracking-tight text-[20px] leading-none"
                  style={{ color: "hsl(250, 50%, 12%)" }}
                >
                  ₪10,200,000
                </p>
                <span
                  className="inline-flex items-center gap-0.5 text-[7px] font-semibold px-1.5 py-0.5 rounded-full"
                  style={{
                    background: "hsla(250, 50%, 99%, 0.7)",
                    border: "1px solid hsla(250, 50%, 88%, 0.6)",
                    color: "hsl(262, 75%, 48%)",
                  }}
                >
                  <TrendingUp className="h-2 w-2" />
                  1.8%
                </span>
              </div>
              <p className="text-[7px] mb-3" style={{ color: "hsl(230, 15%, 55%)" }}>
                עודכן היום בשעה 09:41
              </p>

              <div className="grid grid-cols-3 gap-1.5">
                {[
                  {
                    label: "נכסים",
                    value: "₪8.4M",
                    Icon: TrendingUp,
                    gradient:
                      "linear-gradient(135deg, hsl(178, 70%, 32%) 0%, hsl(174, 65%, 42%) 55%, hsl(170, 70%, 56%) 100%)",
                    glow: "hsla(176, 70%, 28%, 0.4)",
                    iconColor: "hsl(178, 70%, 30%)",
                  },
                  {
                    label: "התחייבויות",
                    value: "₪1.37M",
                    Icon: TrendingDown,
                    gradient:
                      "linear-gradient(135deg, hsl(220, 85%, 48%) 0%, hsl(225, 90%, 60%) 55%, hsl(215, 95%, 75%) 100%)",
                    glow: "hsla(222, 80%, 45%, 0.4)",
                    iconColor: "hsl(222, 85%, 45%)",
                  },
                  {
                    label: "ביטוח",
                    value: "5 פוליסות",
                    Icon: ShieldCheck,
                    gradient:
                      "linear-gradient(135deg, hsl(258, 72%, 55%) 0%, hsl(265, 78%, 65%) 55%, hsl(275, 85%, 78%) 100%)",
                    glow: "hsla(262, 72%, 50%, 0.4)",
                    iconColor: "hsl(262, 75%, 52%)",
                  },
                ].map((c) => (
                  <div
                    key={c.label}
                    className="rounded-xl px-1.5 py-2 text-start"
                    style={{
                      background: c.gradient,
                      boxShadow: `0 4px 10px ${c.glow}`,
                      minHeight: 70,
                    }}
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center mb-2"
                      style={{
                        background: "hsla(0, 0%, 100%, 0.95)",
                        boxShadow: "0 1px 3px hsla(0, 0%, 0%, 0.1)",
                      }}
                    >
                      <c.Icon className="h-2.5 w-2.5" style={{ color: c.iconColor }} />
                    </div>
                    <p
                      className="text-[6.5px] font-medium leading-tight"
                      style={{ color: "hsla(0, 0%, 100%, 0.9)" }}
                    >
                      {c.label}
                    </p>
                    <p
                      className="font-extrabold text-[9px] leading-tight"
                      style={{ color: "white" }}
                    >
                      {c.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom fade overlay — replaces mask-image for perf */}
      <div
        className="absolute inset-x-0 bottom-0 h-[140px] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, hsla(235, 30%, 97%, 0) 0%, hsl(235, 30%, 97%) 75%)",
        }}
      />
    </div>
  );
};
