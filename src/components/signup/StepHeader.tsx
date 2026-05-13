export const StepHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <>
    <h1
      className="text-[26px] font-extrabold tracking-tight leading-[1.2] mb-2"
      style={{ color: "hsl(250, 50%, 10%)" }}
    >
      {title}
    </h1>
    {subtitle && (
      <p className="text-[14px] leading-relaxed mb-6" style={{ color: "hsl(250, 22%, 42%)" }}>
        {subtitle}
      </p>
    )}
  </>
);
