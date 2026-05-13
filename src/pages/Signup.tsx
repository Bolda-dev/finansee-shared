import { useState, useRef, TouchEvent } from "react";
import { useNavigate } from "react-router-dom";
import { SignupShell } from "@/components/signup/SignupShell";
import { WelcomeSlideOne } from "@/components/signup/WelcomeSlideOne";
import { WelcomeSlideTwo } from "@/components/signup/WelcomeSlideTwo";
import { PhoneStep } from "@/components/signup/PhoneStep";
import { SmsCodeStep } from "@/components/signup/SmsCodeStep";
import { NameStep } from "@/components/signup/NameStep";
import { AgeStep } from "@/components/signup/AgeStep";
import { FamilyStep } from "@/components/signup/FamilyStep";
import { EmploymentStep } from "@/components/signup/EmploymentStep";
import { GoalsStep } from "@/components/signup/GoalsStep";
import { LoadingStep } from "@/components/signup/LoadingStep";

// Steps: 0,1 welcome | 2 phone | 3 sms | 4 name | 5 age | 6 family | 7 employment | 8 goals | 9 loading
const TOTAL = 10;
const WELCOME_COUNT = 2;
const LOADING_INDEX = 9;

const Signup = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState({ firstName: "", lastName: "" });
  const [age, setAge] = useState("");
  const [family, setFamily] = useState("");
  const [employment, setEmployment] = useState("");
  const [goals, setGoals] = useState<string[]>([]);

  const startX = useRef<number | null>(null);
  const deltaX = useRef(0);

  const inWelcome = index < WELCOME_COUNT;
  const inLoading = index === LOADING_INDEX;

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
    inWelcome ||
    (index === 2 && phone.length >= 9) ||
    (index === 4 && !!name.firstName.trim() && !!name.lastName.trim()) ||
    (index === 5 && !!age) ||
    (index === 6 && !!family) ||
    (index === 7 && !!employment) ||
    (index === 8 && goals.length > 0);

  const ctaLabel = inWelcome
    ? index < WELCOME_COUNT - 1
      ? "המשך"
      : "בוא נתחיל"
    : index === 8
    ? "סיום"
    : "המשך";

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
              setTimeout(() => setIndex(4), 250);
            }}
          />
        );
      case 4:
        return <NameStep firstName={name.firstName} lastName={name.lastName} onChange={setName} />;
      case 5:
        return <AgeStep value={age} onChange={setAge} />;
      case 6:
        return <FamilyStep value={family} onChange={setFamily} />;
      case 7:
        return <EmploymentStep value={employment} onChange={setEmployment} />;
      case 8:
        return <GoalsStep value={goals} onChange={setGoals} />;
      case 9:
        return (
          <LoadingStep
            onDone={() => navigate("/aha", { state: { firstName: name.firstName } })}
          />
        );
      default:
        return null;
    }
  };

  // Continuous progress bar across steps 2..8 (total 7); hidden on welcome and loading
  const progress = !inWelcome && !inLoading ? { current: index - 1, total: 7 } : undefined;

  const showCta = index !== 3 && !inLoading;

  return (
    <SignupShell
      onSkip={inWelcome ? () => setIndex(WELCOME_COUNT - 1) : undefined}
      showSkip={inWelcome && index < WELCOME_COUNT - 1}
      onBack={!inWelcome && !inLoading ? back : undefined}
      pagination={inWelcome ? { total: WELCOME_COUNT, current: index, onDotClick: setIndex } : undefined}
      progress={progress}
      bottom={
        showCta ? (
          <button
            onClick={() => {
              if (index < TOTAL - 1) next();
            }}
            disabled={!canContinue}
            className="w-full rounded-2xl py-3.5 text-[15px] font-extrabold text-white transition-all active:scale-[0.98] disabled:opacity-40"
            style={{
              background: "hsl(0, 0%, 8%)",
              boxShadow:
                "0 10px 24px -10px hsla(0, 0%, 0%, 0.5)",
            }}
          >
            {ctaLabel}
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
          className="h-full animate-in fade-in slide-in-from-bottom-2 duration-300 flex flex-col"
        >
          {renderStep()}
        </div>
      </div>
    </SignupShell>
  );
};

export default Signup;
