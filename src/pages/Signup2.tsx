import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { PiggyBank, ShieldCheck, CreditCard } from "lucide-react";
import { SignupShell } from "@/components/signup/SignupShell";
import { PhoneStep } from "@/components/signup/PhoneStep";
import { SmsCodeStep } from "@/components/signup/SmsCodeStep";
import { NameStep } from "@/components/signup/NameStep";
import { AgeStep } from "@/components/signup/AgeStep";
import { FamilyStep } from "@/components/signup/FamilyStep";
import { EmploymentStep } from "@/components/signup/EmploymentStep";
import { GoalsStep } from "@/components/signup/GoalsStep";
import { LoadingStep } from "@/components/signup/LoadingStep";
import { ConsentStep } from "@/components/signup/ConsentStep";
import advisorImg from "@/assets/advisor-avatar.jpg";

// Steps:
// 0 phone | 1 sms | 2 name |
// 3 ✱ pension consent | 4 age | 5 family |
// 6 ✱ insurance consent | 7 employment | 8 goals |
// 9 ✱ credit consent | 10 loading
const TOTAL = 11;
const LOADING_INDEX = 10;

const showDanaToast = (msg: string) => {
  toast(msg, {
    duration: 2400,
    position: "bottom-center",
    style: {
      direction: "rtl",
      textAlign: "right",
      marginBottom: "72px",
    },
    icon: (
      <img
        src={advisorImg}
        alt="דנה"
        className="w-7 h-7 rounded-full object-cover"
        style={{ border: "1.5px solid hsl(262, 75%, 55%)" }}
      />
    ),
  });
};

const Signup2 = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState({ firstName: "", lastName: "" });
  const [age, setAge] = useState("");
  const [family, setFamily] = useState("");
  const [employment, setEmployment] = useState("");
  const [goals, setGoals] = useState<string[]>([]);
  const [consents, setConsents] = useState({
    pension: false,
    insurance: false,
    credit: false,
  });
  const [connected, setConnected] = useState({
    pension: false,
    insurance: false,
    credit: false,
  });

  const inLoading = index === LOADING_INDEX;
  const isConsentStep = index === 3 || index === 6 || index === 9;

  const next = () => setIndex((i) => Math.min(i + 1, TOTAL - 1));
  const back = () => setIndex((i) => Math.max(i - 1, 0));

  const autoAdvance = (setter: (v: string) => void, after?: () => void) => (v: string) => {
    setter(v);
    setTimeout(() => {
      after?.();
      next();
    }, 380);
  };

  // Dana toasts on entering certain steps
  useEffect(() => {
    if (index === 4 && name.firstName) {
      showDanaToast(`נעים להכיר, ${name.firstName} 👋`);
    } else if (index === 5) {
      showDanaToast("מתאימים לך המלצות לשלב הזה ✨");
    } else if (index === 8) {
      showDanaToast("יש זכויות שכדאי שתכיר/י 💡");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const finishToAha = () => {
    navigate("/aha2", {
      state: {
        firstName: name.firstName,
        connected,
      },
    });
  };

  const canContinue =
    (index === 0 && phone.length >= 9) ||
    (index === 2 && !!name.firstName.trim() && !!name.lastName.trim()) ||
    (index === 4 && !!age) ||
    (index === 5 && !!family) ||
    (index === 7 && !!employment) ||
    (index === 8 && goals.length > 0);

  const ctaLabel = index === 8 ? "סיום" : "המשך";

  const renderStep = () => {
    switch (index) {
      case 0:
        return <PhoneStep value={phone} onChange={setPhone} />;
      case 1:
        return (
          <SmsCodeStep
            phone={phone}
            onComplete={() => setTimeout(() => setIndex(2), 250)}
          />
        );
      case 2:
        return (
          <NameStep
            firstName={name.firstName}
            lastName={name.lastName}
            onChange={setName}
          />
        );
      case 3:
        return (
          <ConsentStep
            icon={<PiggyBank className="h-5 w-5" style={{ color: "hsl(262, 75%, 55%)" }} />}
            iconBg="hsl(260, 75%, 96%)"
            title="חיבור למסלקה הפנסיונית"
            subtitle="קופות גמל, פנסיה, השתלמות"
            bullets={[
              "איסוף נתוני פנסיה וקופות מכל הגופים",
              "בדיקת דמי ניהול וחיסכון פוטנציאלי",
              "הצלבה מול ביטוחים קיימים",
            ]}
            socialProof="43% מהמשתמשים גילו כפל ביטוחים אחרי החיבור"
          />
        );
      case 4:
        return <AgeStep value={age} onChange={autoAdvance(setAge)} />;
      case 5:
        return <FamilyStep value={family} onChange={autoAdvance(setFamily)} />;
      case 6:
        return (
          <ConsentStep
            icon={<ShieldCheck className="h-5 w-5" style={{ color: "hsl(178, 70%, 35%)" }} />}
            iconBg="hsl(176, 55%, 95%)"
            title="קציר נתוני ביטוח"
            subtitle="פוליסות ביטוח חיים, בריאות, רכוש"
            bullets={[
              "ניתוח כל הפוליסות הקיימות",
              "איתור כפילויות וחוסרים בכיסויים",
              "המלצות לחיסכון ושיפור כיסוי",
            ]}
            socialProof="86% מהמשתמשים חסכו מעל ₪104,500 בשנה הראשונה"
          />
        );
      case 7:
        return <EmploymentStep value={employment} onChange={autoAdvance(setEmployment)} />;
      case 8:
        return <GoalsStep value={goals} onChange={setGoals} />;
      case 9:
        return (
          <ConsentStep
            icon={<CreditCard className="h-5 w-5" style={{ color: "hsl(220, 85%, 50%)" }} />}
            iconBg="hsl(220, 85%, 96%)"
            title="חיבור לנתוני אשראי"
            subtitle="חשבון בנק, כרטיסי אשראי ומשכנתא"
            bullets={[
              "איסוף נתוני בנק וכרטיסי אשראי",
              "ניתוח מצב המשכנתא והלוואות",
              "איתור הזדמנויות לחיסכון חודשי",
            ]}
            socialProof="המשתמשים שלנו חסכו בממוצע ₪780 בחודש על המשכנתא"
          />
        );
      case 10:
        return <LoadingStep onDone={finishToAha} />;
      default:
        return null;
    }
  };

  // Continuous progress 1..10 (loading hidden)
  const progress = !inLoading ? { current: index + 1, total: TOTAL } : undefined;

  // SMS step + loading manage their own bottom CTA; all others use unified CTA
  const showCta = index !== 1 && !inLoading;

  const onMainCta = () => {
    if (index === 8) {
      showDanaToast("מצוין, בונים תוכנית 🎯");
      setTimeout(() => next(), 200);
      return;
    }
    if (index < TOTAL - 1) next();
  };

  const consentChecked =
    (index === 3 && consents.pension) ||
    (index === 6 && consents.insurance) ||
    (index === 9 && consents.credit);

  const onConsentToggle = () => {
    if (index === 3) setConsents((c) => ({ ...c, pension: !c.pension }));
    else if (index === 6) setConsents((c) => ({ ...c, insurance: !c.insurance }));
    else if (index === 9) setConsents((c) => ({ ...c, credit: !c.credit }));
  };

  const onConsentConfirm = () => {
    if (index === 3) {
      if (consents.pension) setConnected((c) => ({ ...c, pension: true }));
      next();
    } else if (index === 6) {
      if (consents.insurance) setConnected((c) => ({ ...c, insurance: true }));
      next();
    } else if (index === 9) {
      if (consents.credit) setConnected((c) => ({ ...c, credit: true }));
      next();
    }
  };

  return (
    <SignupShell
      onSkip={isConsentStep ? next : undefined}
      showSkip={isConsentStep}
      onBack={!inLoading && index > 0 ? back : undefined}
      progress={progress}
      bottom={
        showCta ? (
          <div className="space-y-3">
            {isConsentStep && (
              <button
                onClick={onConsentToggle}
                className="w-full rounded-2xl p-3.5 flex items-center gap-3 transition-all active:scale-[0.99]"
                style={{
                  background: "white",
                  border: `2px solid ${consentChecked ? "hsl(262, 75%, 55%)" : "hsl(230, 20%, 88%)"}`,
                  boxShadow: consentChecked
                    ? "0 6px 18px -8px hsla(262, 75%, 55%, 0.45)"
                    : "0 4px 14px -10px hsla(250, 40%, 20%, 0.18)",
                }}
              >
                <span
                  className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{
                    background: consentChecked ? "hsl(262, 75%, 55%)" : "white",
                    border: `1.5px solid ${consentChecked ? "hsl(262, 75%, 55%)" : "hsl(230, 20%, 75%)"}`,
                  }}
                >
                  {consentChecked && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  )}
                </span>
                <div className="flex-1 min-w-0 text-right">
                  <p className="text-[13.5px] font-extrabold leading-tight" style={{ color: "hsl(250, 40%, 15%)" }}>
                    אני מאשר/ת
                  </p>
                  <p className="text-[10.5px] leading-snug mt-0.5" style={{ color: "hsl(230, 15%, 50%)" }}>
                    המידע מוצפן ומאובטח
                  </p>
                </div>
              </button>
            )}
            <button
              onClick={isConsentStep ? onConsentConfirm : onMainCta}
              disabled={isConsentStep ? !consentChecked : !canContinue}
              className="w-full rounded-full py-3.5 text-[15px] font-extrabold text-white transition-all active:scale-[0.98] disabled:opacity-40"
              style={{
                background: isConsentStep
                  ? consentChecked
                    ? "hsl(0, 0%, 8%)"
                    : "hsl(230, 18%, 80%)"
                  : "hsl(0, 0%, 8%)",
                boxShadow:
                  isConsentStep && consentChecked
                    ? "0 10px 24px -10px hsla(0, 0%, 0%, 0.5)"
                    : "0 10px 24px -10px hsla(0, 0%, 0%, 0.5)",
              }}
            >
              {isConsentStep ? "אשר וחתום" : ctaLabel}
            </button>
          </div>
        ) : null
      }
    >
      <div className="flex-1 overflow-hidden">
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

export default Signup2;
