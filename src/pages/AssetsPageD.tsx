import { CategoryPageD, formatNIS, formatCompact, type CategoryItem } from "./CategoryPageD";
import { assetItems } from "@/lib/data";

const AssetsPageD = () => {
  const items: CategoryItem[] = assetItems.map((a) => ({ ...a }));
  const totalValue = items.reduce((s, i) => s + (i.amount ?? 0), 0);
  const monthlyIncome = items.reduce((s, i) => s + (i.monthly ?? 0), 0);

  return (
    <CategoryPageD
      title="נכסים"
      theme={{
        gradient:
          "radial-gradient(ellipse 90% 70% at 50% 0%, hsl(174, 95%, 40%) 0%, hsl(180, 80%, 16%) 50%, hsl(222, 45%, 7%) 100%)",
        accent: "hsl(170, 95%, 65%)",
        accentBg: "hsla(174, 80%, 28%, 0.35)",
        accentText: "hsl(170, 95%, 75%)",
        sheetShadow: "hsla(174, 95%, 40%, 0.5)",
      }}
      items={items}
      filters={[
        { key: "all", label: "הכל", test: () => true },
        { key: "liquid", label: "נזיל", test: (i) => ["חשבון עו״ש", "פיקדון בנקאי", "קרן השתלמות", "מטבע דיגיטלי"].includes(i.label) },
        { key: "long", label: "טווח ארוך", test: (i) => ["פנסיה", "קופת גמל", "השקעות"].includes(i.label) },
        { key: "income", label: "מניב הכנסה", test: (i) => (i.monthly ?? 0) > 0 },
        { key: "realestate", label: "נדל״ן", test: (i) => i.label.includes("נדל") },
        { key: "investments", label: "השקעות", test: (i) => ["השקעות", "מטבע דיגיטלי"].includes(i.label) },
      ]}
      primaryKpiLabel="סך כל הנכסים"
      primaryKpiValue={formatCompact(totalValue)}
      secondaryLeft={`${items.length} נכסים פעילים`}
      secondaryRight={`${formatNIS(monthlyIncome)} מניב/חודש`}
      sectionTitle="כל הנכסים שלי"
      itemNoun="נכסים"
      footerNote="כל הנכסים מתעדכנים אוטומטית מהחיבור לחשבונות"
      danaCtaText="איך להגדיל את הנכסים שלי?"
      danaBubbleText={
        <>
          היי משה 👋 ניתחתי את התיק שלך — יש פוטנציאל לתשואה נוספת של{" "}
          <strong>כ-3.2% בשנה</strong> דרך פיזור חכם יותר. רוצה לראות איך?
        </>
      }
      danaBubbleCta="בוא/י נגדיל יחד"
      emptyText="אין נכסים בקטגוריה זו"
      renderItemSubtitle={(item) => item.subLabel ?? ""}
      renderItemTrailing={(item) => (
        <span className="text-end leading-tight">
          <span
            className="block text-[13px] font-bold tracking-tight"
            style={{ color: "hsl(0, 0%, 100%)" }}
          >
            {formatNIS(item.amount ?? 0)}
          </span>
          {item.monthly ? (
            <span
              className="block text-[10px] font-medium"
              style={{ color: "hsl(150, 80%, 65%)" }}
            >
              +{formatNIS(item.monthly)}/חודש
            </span>
          ) : (
            <span className="block text-[10px] font-medium" style={{ color: "hsl(215, 20%, 65%)" }}>
              סך הצבירה
            </span>
          )}
        </span>
      )}
    />
  );
};

export default AssetsPageD;
