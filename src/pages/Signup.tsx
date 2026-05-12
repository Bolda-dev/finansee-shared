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
        <div className="flex justify-center">
          <button
            onClick={() => {
              if (index < total - 1) setIndex(index + 1);
              else console.log("Start signup flow");
            }}
            className="btn-black-drift rounded-full px-10 py-3 text-sm font-semibold text-white transition-transform active:scale-[0.97]"
            style={{
              boxShadow:
                "0 10px 24px -10px hsla(0, 0%, 0%, 0.55), 0 2px 6px hsla(0, 0%, 0%, 0.2), inset 0 1px 0 hsla(0, 0%, 100%, 0.12)",
            }}
          >
            <span className="relative z-10">
              {index < total - 1 ? "המשך" : "בוא נתחיל"}
            </span>
          </button>
        </div>
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
