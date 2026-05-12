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
      {/* Soft gradient top + drifting blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-x-0 top-0 h-[620px]"
          style={{
            background:
              "linear-gradient(to bottom, hsl(0, 0%, 100%) 0%, hsl(230, 20%, 96%) 60%, hsl(235, 30%, 97%) 100%)",
          }}
        />
        <div
          className="signup-blob-1 absolute"
          style={{
            top: "-80px",
            right: "-60px",
            width: "320px",
            height: "320px",
            background:
              "radial-gradient(circle, hsla(262, 75%, 65%, 0.22) 0%, hsla(262, 75%, 65%, 0) 70%)",
            willChange: "transform",
          }}
        />
        <div
          className="signup-blob-2 absolute"
          style={{
            top: "120px",
            left: "-80px",
            width: "300px",
            height: "300px",
            background:
              "radial-gradient(circle, hsla(220, 85%, 65%, 0.20) 0%, hsla(220, 85%, 65%, 0) 70%)",
            willChange: "transform",
          }}
        />
        <div
          className="signup-blob-3 absolute"
          style={{
            top: "320px",
            right: "-50px",
            width: "260px",
            height: "260px",
            background:
              "radial-gradient(circle, hsla(178, 70%, 55%, 0.18) 0%, hsla(178, 70%, 55%, 0) 70%)",
            willChange: "transform",
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
