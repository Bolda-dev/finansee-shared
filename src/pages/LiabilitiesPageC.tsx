import { CategoryPageC, formatNIS, formatCompact, type CategoryItem } from "./CategoryPageC";
import { liabilityItems } from "@/lib/data";

const LiabilitiesPageC = () => {
  const items: CategoryItem[] = liabilityItems.map((a) => ({ ...a }));

  const totalBalance = items.reduce((s, i) => s + (i.balance ?? 0), 0);
  const monthlyPayment = items.reduce((s, i) => s + (i.monthly ?? 0), 0);

  return (
    <CategoryPageC
      title="התחייבויות"
      theme={{
        gradient:
          "linear-gradient(160deg, hsl(170, 80%, 35%) 0%, hsl(176, 80%, 34%) 55%, hsl(180, 75%, 50%) 100%)",
        accent: "hsl(174, 85%, 24%)",
        accentBg: "hsl(172, 60%, 90%)",
        accentText: "hsl(174, 80%, 16%)",
        sheetShadow: "hsla(174, 85%, 18%, 0.4)",
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
          היי משה 👋 בדקתי את ההתחייבויות שלך — מיחזור משכנתא יכול לחסוך לך עד
          {" "}
          <strong>₪780 בחודש</strong>. רוצה שנבדוק יחד?
        </>
      }
      danaBubbleCta="בוא/י נחסוך ביחד"
      emptyText="אין התחייבויות בקטגוריה זו"
      renderItemSubtitle={(item) => item.subLabel ?? ""}
      renderItemTrailing={(item) => (
        <span className="text-end leading-tight">
          <span
            className="block text-[13px] font-bold text-primary tracking-tight"
            style={{ color: "hsl(250, 50%, 12%)" }}
          >
            {formatNIS(item.balance ?? 0)}
          </span>
          {item.monthly ? (
            <span
              className="block text-[10px] font-medium"
              style={{ color: "hsl(174, 80%, 22%)" }}
            >
              -{formatNIS(item.monthly)}/חודש
            </span>
          ) : null}
        </span>
      )}
    />
  );
};

export default LiabilitiesPageC;
