import { ReactNode } from "react";

interface SignupShellProps {
  children: ReactNode;
  onSkip?: () => void;
  showSkip?: boolean;
  pagination?: { total: number; current: number; onDotClick?: (i: number) => void };
  bottom?: ReactNode;
}

export const SignupShell = ({ children, onSkip, showSkip = true, pagination, bottom }: SignupShellProps) => {
  return (
    <div
      className="min-h-screen max-w-[430px] mx-auto relative flex flex-col"
      dir="rtl"
      style={{ background: "hsl(235, 30%, 97%)" }}
    >
      {/* Soft gradient top — matches Version C */}
      <div className="absolute inset-x-0 top-0 h-[520px] z-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, hsl(0, 0%, 100%) 0%, hsl(230, 20%, 96%) 60%, hsl(235, 30%, 97%) 100%)",
          }}
        />
      </div>

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-5 pt-5 h-12 shrink-0">
        <div className="w-12" />
        <div className="w-12 text-end">
          {showSkip && (
            <button
              onClick={onSkip}
              className="text-sm font-medium"
              style={{ color: "hsl(230, 15%, 50%)" }}
            >
              דלג
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col">{children}</div>

      {/* Pagination + bottom CTA */}
      <div className="relative z-10 px-5 pb-8 pt-4 shrink-0">
        {pagination && (
          <div className="flex items-center justify-center gap-2 mb-5">
            {Array.from({ length: pagination.total }).map((_, i) => (
              <button
                key={i}
                onClick={() => pagination.onDotClick?.(i)}
                aria-label={`עבור למסך ${i + 1}`}
                className="rounded-full transition-all"
                style={{
                  width: i === pagination.current ? 24 : 8,
                  height: 8,
                  background:
                    i === pagination.current
                      ? "hsl(262, 75%, 52%)"
                      : "hsl(250, 20%, 88%)",
                }}
              />
            ))}
          </div>
        )}
        {bottom}
      </div>
    </div>
  );
};
