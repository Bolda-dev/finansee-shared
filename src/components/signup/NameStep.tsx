interface NameStepProps {
  firstName: string;
  lastName: string;
  onChange: (v: { firstName: string; lastName: string }) => void;
}

export const NameStep = ({ firstName, lastName, onChange }: NameStepProps) => {
  return (
    <div className="px-5 pt-6 pb-4 flex flex-col">
      <h1
        className="text-[26px] font-extrabold tracking-tight leading-[1.2] mb-2"
        style={{ color: "hsl(250, 50%, 10%)" }}
      >
        <span
          style={{
            background:
              "linear-gradient(110deg, hsl(262, 75%, 45%) 0%, hsl(220, 85%, 50%) 50%, hsl(178, 70%, 38%) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          איך נקרא לך?
        </span>
      </h1>
      <p className="text-[14px] leading-relaxed mb-8" style={{ color: "hsl(250, 22%, 42%)" }}>
        ככה דנה תוכל לפנות אליך באופן אישי
      </p>

      <div className="space-y-3">
        <FieldInput
          label="שם פרטי"
          value={firstName}
          autoFocus
          onChange={(v) => onChange({ firstName: v, lastName })}
        />
        <FieldInput
          label="שם משפחה"
          value={lastName}
          onChange={(v) => onChange({ firstName, lastName: v })}
        />
      </div>
    </div>
  );
};

const FieldInput = ({
  label,
  value,
  onChange,
  autoFocus,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  autoFocus?: boolean;
}) => (
  <div
    className="rounded-2xl bg-white"
    style={{
      border: value ? "1.5px solid hsl(262, 75%, 55%)" : "1px solid hsla(250, 30%, 88%, 0.9)",
      boxShadow: "0 8px 24px -16px hsla(262, 50%, 30%, 0.18)",
    }}
  >
    <label
      className="block text-[11px] font-semibold pt-2.5 px-4"
      style={{ color: "hsl(250, 25%, 50%)" }}
    >
      {label}
    </label>
    <input
      type="text"
      value={value}
      autoFocus={autoFocus}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 pb-3 pt-0.5 text-[17px] font-semibold bg-transparent outline-none"
      style={{ color: "hsl(250, 40%, 15%)" }}
    />
  </div>
);
