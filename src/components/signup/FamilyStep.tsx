import { ChoiceCard } from "./ChoiceCard";
import { StepHeader } from "./StepHeader";

const OPTIONS = [
  { id: "single", label: "רווק/ה", emoji: "🙋" },
  { id: "married", label: "נשוי/אה", emoji: "💍" },
  { id: "married_kids", label: "נשוי/אה + ילדים", emoji: "👨‍👩‍👧" },
  { id: "single_parent", label: "הורה יחידני", emoji: "👨‍👧" },
];

export const FamilyStep = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="px-5 pt-6 pb-4 flex flex-col">
    <StepHeader title="מה המצב המשפחתי שלך?" subtitle="הצרכים הפיננסיים שונים בכל שלב" />
    <div className="space-y-2.5 mt-2">
      {OPTIONS.map((o) => (
        <ChoiceCard
          key={o.id}
          label={o.label}
          emoji={o.emoji}
          selected={value === o.id}
          onClick={() => onChange(o.id)}
          variant="row"
        />
      ))}
    </div>
  </div>
);
