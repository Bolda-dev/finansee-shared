import { CategoryPageC, formatNIS, type CategoryItem } from "./CategoryPageC";
import { insuranceItems } from "@/lib/data";

const InsurancePageLife = () => {
  const items: CategoryItem[] = insuranceItems.map((i) => {
    const next: CategoryItem = { ...i };
    if (i.label.includes("רכב")) {
      next.expanded = true;
      next.details = [
        { label: "סוג רכב", value: "טויוטה קורולה היברידית 2022" },
        { label: "מס׳ לוחית רישוי", value: "742-91-302" },
      ];
    } else if (i.label.includes("דירה")) {
      next.expanded = true;
      next.details = [
        { label: "כתובת", value: "רח׳ הרצל 14, רמת גן" },
        { label: "תכולה", value: "₪250,000" },
      ];
    }
    return next;
  });

  const activePolicies = items.filter((i) => i.status === "פעיל");
  const monthlyFromMonthly = activePolicies
    .filter((i) => i.billing === "monthly")
    .reduce((s, i) => s + (i.cost ?? 0), 0);
  const yearlyFromYearly = activePolicies
    .filter((i) => i.billing === "yearly")
    .reduce((s, i) => s + (i.cost ?? 0), 0);
  const monthlyFromYearly = yearlyFromYearly / 12;
  const totalMonthly = Math.round(monthlyFromMonthly + monthlyFromYearly);
  const totalYearly = Math.round(monthlyFromMonthly * 12 + yearlyFromYearly);

  return (
    <CategoryPageC
      title="ביטוח"
      insightsVariant="life"
      theme={{
        gradient:
          "linear-gradient(160deg, hsl(245, 70%, 45%) 0%, hsl(245, 76%, 59%) 55%, hsl(248, 90%, 78%) 100%)",
        accent: "hsl(245, 76%, 50%)",
        accentBg: "hsl(245, 90%, 95%)",
        accentText: "hsl(245, 76%, 30%)",
        sheetShadow: "hsla(245, 70%, 35%, 0.40)",
        ctaClass: "cta-tri-life",
        ringClass: "tri-ring-life",
        sendIconColor: "hsl(0, 0%, 8%)",
      }}
      items={items}
      filters={[
        { key: "all", label: "הכל", test: () => true },
        { key: "monthly", label: "חודשי", test: (i) => i.status === "פעיל" && i.billing === "monthly" },
        { key: "yearly", label: "שנתי", test: (i) => i.status === "פעיל" && i.billing === "yearly" },
        { key: "missing", label: "חסר", test: (i) => i.status === "חסר" },
        {
          key: "life",
          label: "חיים",
          test: (i) =>
            i.label.includes("חיים") ||
            i.label.includes("מנהלים") ||
            i.label.includes("סיעודי") ||
            i.label.includes("כושר"),
        },
        { key: "health", label: "בריאות", test: (i) => i.label.includes("בריאות") },
        { key: "car", label: "רכב", test: (i) => i.label.includes("רכב") },
        { key: "home", label: "דירה", test: (i) => i.label.includes("דירה") },
      ]}
      primaryKpiLabel="סה״כ עלות חודשית"
      primaryKpiValue={formatNIS(totalMonthly)}
      secondaryLeft={`${activePolicies.length} פוליסות פעילות`}
      secondaryRight={`${formatNIS(totalYearly)} בשנה`}
      sectionTitle="כל הפוליסות שלי"
      itemNoun="פוליסות"
      footerNote="כל הפוליסות מתעדכנות אוטומטית מהחיבור לקופות"
      danaCtaText="איך לחסוך בביטוחים שלי?"
      danaBubbleText={
        <>
          היי משה 👋 ראיתי שיש לך {activePolicies.length} פוליסות פעילות —
          <br />
          אני יכולה לעזור לך לחסוך עד <strong>₪450 בחודש</strong>. רוצה שנבדוק יחד?
        </>
      }
      danaBubbleCta="בוא/י נחסוך ביחד"
      emptyText="אין פוליסות בקטגוריה זו"
      renderItemSubtitle={(item) =>
        item.status === "פעיל" ? item.coverage ?? "" : "אין כיסוי פעיל"
      }
      renderItemTrailing={(item) => {
        const isActive = item.status === "פעיל";
        const monthlyCost =
          item.billing === "monthly"
            ? item.cost ?? 0
            : Math.round((item.cost ?? 0) / 12);

        if (isActive && monthlyCost > 0) {
          return (
            <span className="text-end leading-tight">
              <span
                className="block text-[13px] font-bold text-primary tracking-tight"
                style={{ color: "hsl(250, 50%, 12%)" }}
              >
                {formatNIS(monthlyCost)}
              </span>
              <span
                className="block text-[10px] font-medium"
                style={{ color: "hsl(230, 15%, 55%)" }}
              >
                /חודש
              </span>
            </span>
          );
        }
        return (
          <span
            className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
            style={{
              background: "hsl(0, 80%, 95%)",
              color: "hsl(0, 65%, 45%)",
            }}
          >
            חסר
          </span>
        );
      }}
    />
  );
};

export default InsurancePageLife;
