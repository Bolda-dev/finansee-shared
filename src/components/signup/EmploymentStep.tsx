import { ChoiceCard } from "./ChoiceCard";
import { StepHeader } from "./StepHeader";

const OPTIONS = [
  { id: "private", label: "מגזר פרטי", emoji: "🏢" },
  { id: "public", label: "מגזר ציבורי", emoji: "🏛" },
  { id: "self", label: "עצמאי", emoji: "💡" },
  { id: "retired", label: "פנסיונר", emoji: "🌅" },
];

export const EmploymentStep = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="px-5 pt-6 pb-4 flex flex-col">
    <StepHeader title="במה את/ה עוסק/ת?" subtitle="לכל סוג העסקה יש זכויות שונות" />
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
