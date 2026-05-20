import { useEffect, useState } from "react";
import { X } from "lucide-react";
import advisorImg from "@/assets/advisor-avatar.jpg";

const formatNIS = (n: number) => "₪" + n.toLocaleString("he-IL");

interface Props {
  productId: string;
  savings: number;
  onOpen: () => void;
  onClose: () => void;
}

export function DanaTeaserBubbles({ productId, savings, onOpen, onClose }: Props) {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [showCta, setShowCta] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShow1(true), 200);
    const t2 = setTimeout(() => setShow2(true), 1100);
    const t3 = setTimeout(() => setShowCta(true), 1700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(`dana-teaser-${productId}`, "1");
    onClose();
  };

  const open = () => {
    sessionStorage.setItem(`dana-teaser-${productId}`, "1");
    onOpen();
  };

  const bubbleStyle: React.CSSProperties = {
    background: "white",
    border: "1px solid hsl(230, 20%, 92%)",
    boxShadow: "0 8px 24px hsla(250, 30%, 15%, 0.12)",
    color: "hsl(250, 35%, 25%)",
  };

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 pointer-events-none px-4 pb-4"
      dir="rtl"
      style={{ animation: "danaTeaserSlideUp 0.4s ease-out both" }}
    >
      <div className="max-w-[430px] mx-auto pointer-events-auto relative">
        {/* Dismiss */}
        <button
          onClick={dismiss}
          className="absolute -top-2 left-0 w-7 h-7 rounded-full flex items-center justify-center z-10"
          style={{ background: "white", border: "1px solid hsl(230, 20%, 92%)", boxShadow: "0 2px 6px hsla(250, 30%, 15%, 0.12)" }}
          aria-label="סגור"
        >
          <X className="w-3.5 h-3.5" style={{ color: "hsl(230, 15%, 45%)" }} />
        </button>

        <div className="flex items-end gap-2">
          <img
            src={advisorImg}
            alt="דנה"
            className="w-9 h-9 rounded-full object-cover flex-shrink-0 relative"
            style={{ boxShadow: "0 2px 8px hsla(250, 30%, 15%, 0.18)" }}
          />
          <div className="flex-1 flex flex-col gap-1.5">
            {show1 && (
              <div
                className="self-start max-w-[88%] rounded-2xl rounded-br-md px-3.5 py-2 text-[13px] leading-relaxed"
                style={{ ...bubbleStyle, animation: "danaBubbleIn 0.35s ease-out both" }}
              >
                היי משה 👋
              </div>
            )}
            {show2 && (
              <div
                className="self-start max-w-[95%] rounded-2xl rounded-br-md px-3.5 py-2.5 text-[13px] leading-relaxed"
                style={{ ...bubbleStyle, animation: "danaBubbleIn 0.35s ease-out both" }}
              >
                מצאתי דרך להרוויח לך{" "}
                <strong style={{ color: "hsl(250, 50%, 12%)" }}>{formatNIS(savings)}</strong>{" "}
                עד הפרישה — רוצה לשמוע איך?
              </div>
            )}
          </div>
        </div>

        {showCta && (
          <button
            onClick={open}
            className="w-full mt-3 rounded-full py-3 text-[14px] font-extrabold text-white transition-transform active:scale-[0.97]"
            style={{
              background: "hsl(250, 30%, 8%)",
              boxShadow: "0 8px 24px hsla(250, 30%, 15%, 0.4)",
              animation: "danaBubbleIn 0.35s ease-out both",
            }}
          >
            ספרי לי איך ✨
          </button>
        )}
      </div>
    </div>
  );
}
