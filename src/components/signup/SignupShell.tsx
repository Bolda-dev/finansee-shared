import { ReactNode } from "react";
import natureBg from "@/assets/nature-bg.jpg";

interface SignupShellProps {
  children: ReactNode;
  onSkip?: () => void;
  showSkip?: boolean;
  pagination?: { total: number; current: number; onDotClick?: (i: number) => void };
  bottom?: ReactNode;
}

export const SignupShell = ({ children, onSkip, showSkip = true, pagination, bottom }: SignupShellProps) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden" dir="rtl" style={{ background: "hsl(0, 0%, 99%)" }}>
      {/* Nature bg layer */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `url(${natureBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Soft purple gradient top */}
      <div
        className="absolute inset-x-0 top-0 h-[60%] pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, hsla(262, 75%, 70%, 0.18) 0%, transparent 60%)",
        }}
      />
      {/* Blur blobs */}
      <div
        className="absolute -top-20 -right-20 h-64 w-64 rounded-full blur-3xl pointer-events-none"
        style={{ background: "hsla(262, 75%, 60%, 0.18)" }}
      />
      <div
        className="absolute top-40 -left-24 h-72 w-72 rounded-full blur-3xl pointer-events-none"
        style={{ background: "hsla(178, 70%, 50%, 0.14)" }}
      />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-5 pt-5 h-12">
        <div className="w-12">
          {showSkip && (
            <button
              onClick={onSkip}
              className="text-sm font-medium"
              style={{ color: "hsl(230, 15%, 45%)" }}
            >
              דלג
            </button>
          )}
        </div>
        <div className="w-12" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col" style={{ minHeight: "calc(100vh - 3rem)" }}>
        <div className="flex-1 flex flex-col">{children}</div>

        {/* Pagination + bottom CTA */}
        <div className="relative z-10 px-5 pb-8 pt-4">
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
                        : "hsl(250, 30%, 85%)",
                  }}
                />
              ))}
            </div>
          )}
          {bottom}
        </div>
      </div>
    </div>
  );
};
