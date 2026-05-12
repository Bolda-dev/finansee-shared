import { ChoiceCard } from "./ChoiceCard";
import { StepHeader } from "./StepHeader";

const OPTIONS = [
  { id: "income", label: "הגדלת הכנסה", emoji: "📈" },
  { id: "pension", label: "הגדלת הפנסיה", emoji: "🏖" },
  { id: "tax", label: "הטבות מס", emoji: "🧾" },
  { id: "insurance", label: "הגנה ביטוחית", emoji: "🛡" },
  { id: "investments", label: "תיק השקעות", emoji: "📊" },
];

export const GoalsStep = ({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) => {
  const toggle = (id: string) => {
    if (value.includes(id)) onChange(value.filter((x) => x !== id));
    else onChange([...value, id]);
  };

  return (
    <div className="px-5 pt-6 pb-4 flex flex-col">
      <StepHeader title="מה המטרות שלך?" subtitle="אפשר לבחור כמה — נתאים תוכנית בהתאם" />
      <div className="grid grid-cols-2 gap-3 mt-2">
        {OPTIONS.map((o) => (
          <ChoiceCard
            key={o.id}
            label={o.label}
            emoji={o.emoji}
            selected={value.includes(o.id)}
            onClick={() => toggle(o.id)}
            variant="grid"
          />
        ))}
      </div>
    </div>
  );
};
