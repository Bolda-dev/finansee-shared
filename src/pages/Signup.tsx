import { useState, useRef, TouchEvent } from "react";
import { SignupShell } from "@/components/signup/SignupShell";
import { WelcomeSlideOne } from "@/components/signup/WelcomeSlideOne";
import { WelcomeSlideTwo } from "@/components/signup/WelcomeSlideTwo";

const Signup = () => {
  const [index, setIndex] = useState(0);
  const total = 2;
  const startX = useRef<number | null>(null);
  const deltaX = useRef(0);

  const onTouchStart = (e: TouchEvent) => {
    startX.current = e.touches[0].clientX;
    deltaX.current = 0;
  };
  const onTouchMove = (e: TouchEvent) => {
    if (startX.current == null) return;
    deltaX.current = e.touches[0].clientX - startX.current;
  };
  const onTouchEnd = () => {
    const threshold = 50;
    // RTL: swipe left (negative deltaX) = next slide
    if (deltaX.current < -threshold && index < total - 1) setIndex(index + 1);
    else if (deltaX.current > threshold && index > 0) setIndex(index - 1);
    startX.current = null;
    deltaX.current = 0;
  };

  return (
    <SignupShell
      onSkip={() => setIndex(total - 1)}
      showSkip={index < total - 1}
      pagination={{ total, current: index, onDotClick: setIndex }}
      bottom={
        index === total - 1 ? (
          <button
            onClick={() => {
              // Stage 2 not built yet
              console.log("Start signup flow");
            }}
            className="w-full rounded-2xl py-4 text-base font-bold text-white transition-transform active:scale-[0.98]"
            style={{
              background:
                "linear-gradient(135deg, hsl(262, 75%, 52%) 0%, hsl(290, 70%, 60%) 100%)",
              boxShadow: "0 12px 32px -8px hsla(262, 75%, 45%, 0.55)",
            }}
          >
            בוא נתחיל
          </button>
        ) : null
      }
    >
      <div
        className="flex-1 overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          key={index}
          className="h-full animate-in fade-in slide-in-from-bottom-2 duration-300"
        >
          {index === 0 ? <WelcomeSlideOne /> : <WelcomeSlideTwo />}
        </div>
      </div>
    </SignupShell>
  );
};

export default Signup;
