import welcomeMockup from "@/assets/welcome-mockup.png";

export const WelcomeSlideOne = () => {
  return (
    <div className="flex flex-col items-center h-full">
      {/* Image fills top edge-to-edge */}
      <div className="w-full flex-shrink-0">
        <img
          src={welcomeMockup}
          alt="תצוגת אפליקציה"
          className="w-full object-cover"
          style={{ maxHeight: 380 }}
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div className="w-full" style={{ height: 1, background: "hsl(230, 15%, 90%)" }} />

      {/* Text content */}
      <div className="px-5 pt-7 pb-4 flex flex-col items-center flex-1">
        <h1
          className="text-[28px] font-extrabold tracking-tight text-center mb-3 leading-[1.15]"
          style={{ color: "hsl(250, 50%, 10%)" }}
        >
          כל ההון שלך.
          <br />
          <span
            style={{
              background:
                "linear-gradient(110deg, hsl(262, 75%, 45%) 0%, hsl(220, 85%, 50%) 50%, hsl(178, 70%, 38%) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            תמונה אחת. בלי הפתעות.
          </span>
        </h1>
        <p
          className="text-[14px] text-center leading-relaxed px-3"
          style={{ color: "hsl(250, 22%, 42%)" }}
        >
          נכסים, התחייבויות וביטוחים — מתעדכנים אוטומטית, כל יום
        </p>
      </div>
    </div>
  );
};
