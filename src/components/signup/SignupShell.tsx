import { ReactNode } from "react";

interface SignupShellProps {
  children: ReactNode;
  onSkip?: () => void;
  showSkip?: boolean;
  onBack?: () => void;
  pagination?: { total: number; current: number; onDotClick?: (i: number) => void };
  progress?: { current: number; total: number }; // 1-indexed step bar
  bottom?: ReactNode;
}

export const SignupShell = ({
  children,
  onSkip,
  showSkip = true,
  onBack,
  pagination,
  progress,
  bottom,
}: SignupShellProps) => {
  return (
    <div
      className="min-h-screen max-w-[430px] mx-auto relative flex flex-col"
      dir="rtl"
      style={{ background: "hsl(235, 30%, 97%)" }}
    >
      {/* Soft static gradient top */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-x-0 top-0 h-[620px]"
          style={{
            background:
              "linear-gradient(to bottom, hsl(0, 0%, 100%) 0%, hsl(230, 20%, 96%) 60%, hsl(235, 30%, 97%) 100%)",
          }}
        />
      </div>

      {/* Floating top bar — no background */}
      <div className="absolute z-20 flex items-center justify-between px-5 pt-5 inset-x-0 top-0">
        <div className="w-12">
          {onBack && (
            <button
              onClick={onBack}
              aria-label="חזור"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-white"
              style={{ border: "1px solid hsla(250, 30%, 88%, 0.9)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ color: "hsl(250, 40%, 20%)" }}>
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          )}
        </div>
        {progress && (
          <div className="flex-1 mx-4 h-1.5 rounded-full overflow-hidden" style={{ background: "hsl(250, 20%, 90%)" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(progress.current / progress.total) * 100}%`,
                background:
                  "linear-gradient(110deg, hsl(262, 75%, 45%) 0%, hsl(220, 85%, 50%) 50%, hsl(178, 70%, 38%) 100%)",
              }}
            />
          </div>
        )}
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
      <div className="relative z-10 flex-1 flex flex-col pt-14">{children}</div>

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
                      ? "hsl(240, 20%, 8%)"
                      : "hsl(250, 20%, 85%)",
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
