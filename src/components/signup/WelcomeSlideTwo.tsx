import { Check } from "lucide-react";
import advisorImg from "@/assets/advisor-avatar.jpg";

export const WelcomeSlideTwo = () => {
  return (
    <div className="px-6 pt-6 pb-6 flex flex-col">
      <h1
        className="text-3xl font-extrabold tracking-tight text-center mb-3 leading-tight"
        style={{ color: "hsl(250, 40%, 15%)" }}
      >
        60 שניות. בלי טפסים.
      </h1>
      <p
        className="text-[15px] text-center leading-relaxed mb-8 px-2"
        style={{ color: "hsl(250, 25%, 38%)" }}
      >
        מתחברים פעם אחת להר הביטוח ומסלקת הפנסיה — ואנחנו מושכים את הנתונים בעצמנו.
        דנה, היועצת ה-AI שלך, מנחה אותך צעד-צעד
      </p>

      {/* Checks */}
      <div className="space-y-3 mb-8">
        {["מאובטח ברמה בנקאית", "אנחנו לא רואים סיסמאות", "אפשר לעצור בכל שלב"].map((text) => (
          <div
            key={text}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl"
            style={{
              background: "hsla(0, 0%, 100%, 0.7)",
              border: "1px solid hsla(250, 30%, 88%, 0.6)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div
              className="h-8 w-8 rounded-full flex items-center justify-center shrink-0"
              style={{ background: "hsla(150, 60%, 45%, 0.15)" }}
            >
              <Check className="h-4 w-4" style={{ color: "hsl(150, 60%, 35%)" }} strokeWidth={3} />
            </div>
            <span className="text-sm font-medium" style={{ color: "hsl(250, 35%, 22%)" }}>
              {text}
            </span>
          </div>
        ))}
      </div>

      {/* Dana card */}
      <div
        className="flex items-center gap-3 px-4 py-4 rounded-3xl"
        style={{
          background:
            "linear-gradient(135deg, hsla(262, 75%, 60%, 0.1) 0%, hsla(178, 70%, 50%, 0.08) 100%)",
          border: "1px solid hsla(262, 50%, 80%, 0.4)",
        }}
      >
        <img
          src={advisorImg}
          alt="דנה"
          className="h-12 w-12 rounded-full object-cover shrink-0"
          style={{ border: "2px solid hsla(0, 0%, 100%, 0.9)", boxShadow: "0 4px 12px hsla(262, 50%, 30%, 0.2)" }}
        />
        <div className="flex-1">
          <p className="text-[11px] font-semibold mb-0.5" style={{ color: "hsl(262, 75%, 45%)" }}>
            דנה · יועצת AI
          </p>
          <p className="text-sm leading-snug" style={{ color: "hsl(250, 35%, 22%)" }}>
            היי, אני דנה 👋 מוכן/ה להתחיל?
          </p>
        </div>
      </div>
    </div>
  );
};
