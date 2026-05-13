import { ArrowLeft } from "lucide-react";

export const ConsentAnnex = ({
  icon,
  iconBg,
  title,
  subtitle,
  bullets,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  subtitle: string;
  bullets: string[];
}) => {
  return (
    <div dir="rtl" className="space-y-3">
      <div className="flex items-center gap-3 px-1">
        <span
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: iconBg }}
        >
          {icon}
        </span>
        <div className="flex-1 min-w-0 text-right">
          <p className="text-[14.5px] font-extrabold leading-tight" style={{ color: "hsl(250, 40%, 15%)" }}>
            {title}
          </p>
          <p className="text-[11px] leading-tight mt-0.5" style={{ color: "hsl(230, 15%, 50%)" }}>
            {subtitle}
          </p>
        </div>
      </div>

      <div className="rounded-2xl p-3.5" style={{ background: "hsl(230, 30%, 98%)" }}>
        <p className="text-[12px] font-bold mb-2" style={{ color: "hsl(250, 40%, 20%)" }}>
          מה כולל הנספח
        </p>
        <ul className="space-y-1 mb-2.5">
          {bullets.map((b, i) => (
            <li
              key={i}
              className="text-[11.5px] leading-snug flex gap-1.5 text-right"
              style={{ color: "hsl(250, 25%, 35%)" }}
            >
              <span style={{ color: "hsl(262, 75%, 55%)" }}>•</span>
              <span className="flex-1">{b}</span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="text-[11px] font-semibold inline-flex items-center gap-1 underline-offset-2 hover:underline"
          style={{ color: "hsl(220, 85%, 50%)" }}
        >
          קרא את המסמך המלא
          <ArrowLeft className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};
