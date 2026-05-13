interface ChoiceCardProps {
  label: string;
  emoji?: string;
  selected?: boolean;
  onClick?: () => void;
  variant?: "grid" | "row";
}

export const ChoiceCard = ({
  label,
  emoji,
  selected,
  onClick,
  variant = "grid",
}: ChoiceCardProps) => {
  const isGrid = variant === "grid";

  const baseStyle: React.CSSProperties = selected
    ? {
        background:
          "linear-gradient(white, white) padding-box, linear-gradient(110deg, hsl(262, 75%, 45%) 0%, hsl(220, 85%, 50%) 50%, hsl(178, 70%, 38%) 100%) border-box",
        border: "2px solid transparent",
        boxShadow: "0 6px 18px -10px hsla(220, 60%, 30%, 0.25)",
      }
    : {
        background: "white",
        border: "1.5px solid hsla(250, 30%, 88%, 0.9)",
      };

  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "rounded-2xl transition-all active:scale-[0.97] flex " +
        (isGrid
          ? "flex-col items-center justify-center gap-2 aspect-[1.15/1] p-3"
          : "flex-row items-center gap-3 w-full px-5 py-4")
      }
      style={{
        ...baseStyle,
        animation: selected ? "choice-pulse 0.45s ease-out" : undefined,
      }}
    >
      <style>{`@keyframes choice-pulse { 0% { transform: scale(1); } 40% { transform: scale(1.04); box-shadow: 0 8px 22px -8px hsla(262, 75%, 45%, 0.45); } 100% { transform: scale(1); } }`}</style>
      {emoji && (
        <span className={isGrid ? "text-3xl" : "text-2xl"} aria-hidden>
          {emoji}
        </span>
      )}
      <span
        className={
          (isGrid ? "text-sm text-center" : "text-base text-start flex-1") +
          " " +
          (selected ? "font-semibold" : "font-medium")
        }
        style={{ color: "hsl(250, 40%, 18%)" }}
      >
        {label}
      </span>
      {!isGrid && (
        <span
          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
          style={
            selected
              ? {
                  background:
                    "linear-gradient(110deg, hsl(262, 75%, 45%) 0%, hsl(220, 85%, 50%) 50%, hsl(178, 70%, 38%) 100%)",
                }
              : { border: "1.5px solid hsla(250, 30%, 80%, 0.9)" }
          }
        >
          {selected && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          )}
        </span>
      )}
    </button>
  );
};
