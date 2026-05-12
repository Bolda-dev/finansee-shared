export const StepHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <>
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
        {title}
      </span>
    </h1>
    {subtitle && (
      <p className="text-[14px] leading-relaxed mb-6" style={{ color: "hsl(250, 22%, 42%)" }}>
        {subtitle}
      </p>
    )}
  </>
);
