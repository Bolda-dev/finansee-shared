import { CategoryPageD, formatNIS, formatCompact, type CategoryItem } from "./CategoryPageD";
import { liabilityItems } from "@/lib/data";

const LiabilitiesPageD = () => {
  const items: CategoryItem[] = liabilityItems.map((a) => ({ ...a }));
  const totalBalance = items.reduce((s, i) => s + (i.balance ?? 0), 0);
  const monthlyPayment = items.reduce((s, i) => s + (i.monthly ?? 0), 0);

  return (
    <CategoryPageD
      title="התחייבויות"
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
        { key: "mortgage", label: "משכנתא", test: (i) => i.label.includes("משכנתא") },
        { key: "loans", label: "הלוואות", test: (i) => i.label.includes("הלוואה") || i.label.includes("הלוואת") },
        { key: "credit", label: "אשראי", test: (i) => i.label.includes("אשראי") },
        { key: "high", label: "סכום גבוה", test: (i) => (i.balance ?? 0) > 100000 },
      ]}
      primaryKpiLabel="סך כל ההתחייבויות"
      primaryKpiValue={formatCompact(totalBalance)}
      secondaryLeft={`${items.length} התחייבויות פעילות`}
      secondaryRight={`${formatNIS(monthlyPayment)}/חודש החזר`}
      sectionTitle="כל ההתחייבויות שלי"
      itemNoun="התחייבויות"
      footerNote="כל ההתחייבויות מתעדכנות אוטומטית מהחיבור לבנקים"
      danaCtaText="איך להוריד את ההחזרים?"
      danaBubbleText={
        <>
          היי משה 👋 בדקתי את ההתחייבויות שלך — מיחזור משכנתא יכול לחסוך לך עד{" "}
          <strong>₪780 בחודש</strong>. רוצה שנבדוק יחד?
        </>
      }
      danaBubbleCta="בוא/י נחסוך ביחד"
      emptyText="אין התחייבויות בקטגוריה זו"
      renderItemSubtitle={(item) => item.subLabel ?? ""}
      renderItemTrailing={(item) => (
        <span className="text-end leading-tight">
          <span
            className="block text-[13px] font-bold tracking-tight"
            style={{ color: "hsl(0, 0%, 100%)" }}
          >
            {formatNIS(item.balance ?? 0)}
          </span>
          {item.monthly ? (
            <span
              className="block text-[10px] font-medium"
              style={{ color: "hsl(170, 95%, 70%)" }}
            >
              -{formatNIS(item.monthly)}/חודש
            </span>
          ) : null}
        </span>
      )}
    />
  );
};

export default LiabilitiesPageD;
