import welcomeMockup from "@/assets/welcome-mockup.png";

export const WelcomeSlideOne = () => {
  return (
    <div className="px-5 pt-2 pb-4 flex flex-col items-center">
      <div className="w-full flex justify-center" style={{ height: 380 }}>
        <img
          src={welcomeMockup}
          alt="תצוגת אפליקציה"
          className="h-full w-auto object-contain"
          draggable={false}
        />
      </div>

      <h1
        className="text-[28px] font-extrabold tracking-tight text-center mt-7 mb-3 leading-[1.15]"
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
  );
};
