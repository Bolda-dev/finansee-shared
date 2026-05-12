import { useState, useRef, TouchEvent } from "react";
import { SignupShell } from "@/components/signup/SignupShell";
import { WelcomeSlideOne } from "@/components/signup/WelcomeSlideOne";
import { WelcomeSlideTwo } from "@/components/signup/WelcomeSlideTwo";
import { PhoneStep } from "@/components/signup/PhoneStep";
import { SmsCodeStep } from "@/components/signup/SmsCodeStep";
import { NameStep } from "@/components/signup/NameStep";

// Steps: 0,1 = welcome slides | 2 = phone | 3 = sms | 4 = name
const TOTAL = 5;
const WELCOME_COUNT = 2;

const Signup = () => {
  const [index, setIndex] = useState(0);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState({ firstName: "", lastName: "" });

  const startX = useRef<number | null>(null);
  const deltaX = useRef(0);

  const inWelcome = index < WELCOME_COUNT;

  const onTouchStart = (e: TouchEvent) => {
    if (!inWelcome) return;
    startX.current = e.touches[0].clientX;
    deltaX.current = 0;
  };
  const onTouchMove = (e: TouchEvent) => {
    if (startX.current == null) return;
    deltaX.current = e.touches[0].clientX - startX.current;
  };
  const onTouchEnd = () => {
    if (!inWelcome) return;
    const threshold = 50;
    if (deltaX.current < -threshold && index < WELCOME_COUNT - 1) setIndex(index + 1);
    else if (deltaX.current > threshold && index > 0) setIndex(index - 1);
    startX.current = null;
    deltaX.current = 0;
  };

  const next = () => setIndex((i) => Math.min(i + 1, TOTAL - 1));
  const back = () => setIndex((i) => Math.max(i - 1, 0));

  const canContinue =
    (index === 2 && phone.length >= 9) ||
    (index === 4 && name.firstName.trim() && name.lastName.trim()) ||
    inWelcome;

  const ctaLabel = inWelcome ? (index < WELCOME_COUNT - 1 ? "המשך" : "בוא נתחיל") : "המשך";

  const renderStep = () => {
    switch (index) {
      case 0:
        return <WelcomeSlideOne />;
      case 1:
        return <WelcomeSlideTwo />;
      case 2:
        return <PhoneStep value={phone} onChange={setPhone} />;
      case 3:
        return (
          <SmsCodeStep
            phone={phone}
            onComplete={() => {
              // auto-advance after 6 digits
              setTimeout(() => setIndex(4), 250);
            }}
          />
        );
      case 4:
        return <NameStep firstName={name.firstName} lastName={name.lastName} onChange={setName} />;
      default:
        return null;
    }
  };

  // Stage-2 progress (1..3 across steps 2,3,4)
  const progress = !inWelcome ? { current: index - 1, total: 3 } : undefined;

  return (
    <SignupShell
      onSkip={inWelcome ? () => setIndex(WELCOME_COUNT - 1) : undefined}
      showSkip={inWelcome && index < WELCOME_COUNT - 1}
      onBack={!inWelcome ? back : undefined}
      pagination={inWelcome ? { total: WELCOME_COUNT, current: index, onDotClick: setIndex } : undefined}
      progress={progress}
      bottom={
        index === 3 ? null : (
          <div className="flex justify-center">
            <button
              onClick={() => {
                if (index < TOTAL - 1) next();
                else console.log("Signup complete", { phone, ...name });
              }}
              disabled={!canContinue}
              className="btn-black-deep rounded-full px-10 py-3 text-sm font-semibold text-white transition-all active:scale-[0.97] disabled:opacity-40"
              style={{
                boxShadow:
                  "0 10px 24px -10px hsla(0, 0%, 0%, 0.55), 0 2px 6px hsla(0, 0%, 0%, 0.2), inset 0 1px 0 hsla(0, 0%, 100%, 0.12)",
              }}
            >
              <span className="relative z-10">{index === TOTAL - 1 ? "סיום" : ctaLabel}</span>
            </button>
          </div>
        )
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
          {renderStep()}
        </div>
      </div>
    </SignupShell>
  );
};

export default Signup;
