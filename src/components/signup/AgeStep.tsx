import { ChoiceCard } from "./ChoiceCard";
import { StepHeader } from "./StepHeader";

const OPTIONS = [
  { id: "u30", label: "מתחת ל-30", emoji: "👶" },
  { id: "30-45", label: "30-45", emoji: "🎯" },
  { id: "45-60", label: "45-60", emoji: "💼" },
  { id: "60p", label: "60+", emoji: "🌿" },
];

export const AgeStep = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="px-5 pt-6 pb-4 flex flex-col">
    <StepHeader title="בן/בת כמה את/ה?" subtitle="נתאים את ההמלצות לשלב החיים שלך" />
    <div className="grid grid-cols-2 gap-3 mt-2">
      {OPTIONS.map((o) => (
        <ChoiceCard
          key={o.id}
          label={o.label}
          emoji={o.emoji}
          selected={value === o.id}
          onClick={() => onChange(o.id)}
          variant="grid"
        />
      ))}
    </div>
  </div>
);
