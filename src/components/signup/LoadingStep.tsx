import { useEffect, useState } from "react";

const MESSAGES = [
  "מחשבים את הפרופיל שלך…",
  "משווים לאנשים בגילך…",
  "מכינים את ההערכה הראשונית…",
];

export const LoadingStep = ({ onDone }: { onDone: () => void }) => {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setI(1), 900);
    const t2 = setTimeout(() => setI(2), 1800);
    const t3 = setTimeout(onDone, 2700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 -mt-10">
      <div className="relative w-20 h-20 mb-8">
        <svg width="80" height="80" viewBox="0 0 80 80" className="animate-spin" style={{ animationDuration: "1.1s" }}>
          <defs>
            <linearGradient id="loaderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(262, 75%, 45%)" />
              <stop offset="50%" stopColor="hsl(220, 85%, 50%)" />
              <stop offset="100%" stopColor="hsl(178, 70%, 38%)" />
            </linearGradient>
          </defs>
          <circle cx="40" cy="40" r="32" fill="none" stroke="hsl(250, 20%, 90%)" strokeWidth="6" />
          <circle
            cx="40"
            cy="40"
            r="32"
            fill="none"
            stroke="url(#loaderGrad)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="60 200"
          />
        </svg>
      </div>
      <p
        key={i}
        className="text-base font-semibold text-center animate-in fade-in duration-500"
        style={{ color: "hsl(250, 40%, 22%)" }}
      >
        {MESSAGES[i]}
      </p>
    </div>
  );
};
