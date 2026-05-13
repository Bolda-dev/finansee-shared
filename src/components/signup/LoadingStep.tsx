import { useEffect, useState } from "react";

const MESSAGES = [
  "בונה את התמונה הפיננסית שלך…",
  "מנתחת נתונים ומוצאת הזדמנויות…",
  "מעט ומסיימת לחבר את הכול…",
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
    <div className="flex-1 flex flex-col items-center px-4 pt-4" dir="rtl">
      {/* Changing message */}
      <p
        key={i}
        className="text-[13px] font-semibold text-center mb-5 animate-in fade-in duration-500"
        style={{ color: "hsl(250, 35%, 28%)" }}
      >
        {MESSAGES[i]}
      </p>

      {/* Skeleton of AhaDashboard */}
      <div className="w-full max-w-[360px]">
        {/* Header skeleton */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-10 h-10 rounded-xl shimmer-bg" />
          <div className="w-28 h-5 rounded-lg shimmer-bg" />
        </div>

        {/* Hero value skeleton */}
        <div className="w-full h-14 rounded-xl shimmer-bg mb-1" />
        <div className="w-20 h-4 rounded-md shimmer-bg mb-6" />

        {/* Dana callout skeleton */}
        <div className="flex items-start gap-3 rounded-2xl p-3 mb-5 shimmer-bg" style={{ height: 72 }}>
          <div className="w-12 h-12 rounded-full shrink-0 shimmer-pulse" />
          <div className="flex-1 space-y-2 pt-1">
            <div className="w-full h-3.5 rounded-md shimmer-pulse" />
            <div className="w-2/3 h-3 rounded-md shimmer-pulse" />
          </div>
        </div>

        {/* 3 hero cards skeleton */}
        <div className="grid grid-cols-3 gap-2.5 mb-5">
          {[0, 1, 2].map((idx) => (
            <div key={idx} className="rounded-2xl p-2.5 shimmer-bg" style={{ height: 120 }}>
              <div className="w-6 h-6 rounded-full mb-2 shimmer-pulse" />
              <div className="w-full h-3 rounded-md mb-1.5 shimmer-pulse" />
              <div className="w-3/4 h-3 rounded-md mb-3 shimmer-pulse" />
              <div className="w-full h-6 rounded-full mt-auto shimmer-pulse" />
            </div>
          ))}
        </div>

        {/* 2 center cards skeleton */}
        <div className="grid grid-cols-2 gap-2.5 mb-5">
          {[0, 1].map((idx) => (
            <div key={idx} className="rounded-2xl p-2.5 shimmer-bg" style={{ height: 100 }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full shimmer-pulse" />
                <div className="w-12 h-3 rounded-md shimmer-pulse" />
              </div>
              <div className="w-10 h-4 rounded-md mb-1.5 shimmer-pulse" />
              <div className="w-full h-5 rounded-full shimmer-pulse" />
            </div>
          ))}
        </div>

        {/* Bottom chat bar skeleton */}
        <div className="flex items-center gap-2 rounded-full p-2 shimmer-bg">
          <div className="w-10 h-10 rounded-full shimmer-pulse" />
          <div className="flex-1 h-4 rounded-md shimmer-pulse" />
          <div className="w-8 h-8 rounded-full shimmer-pulse" />
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmer-bg {
          background: linear-gradient(90deg,
            hsl(230, 25%, 94%) 0%,
            hsl(230, 20%, 98%) 50%,
            hsl(230, 25%, 94%) 100%);
          background-size: 200% 100%;
          animation: shimmer 1.8s ease-in-out infinite;
        }
        .shimmer-pulse {
          background: hsl(230, 25%, 90%);
          animation: shimmer-pulse 1.4s ease-in-out infinite;
        }
        @keyframes shimmer-pulse {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};
