import { useNavigate } from "react-router-dom";
import { CategoryPageC, formatNIS, formatCompact, type CategoryItem } from "./CategoryPageC";
import { pensionProducts } from "@/lib/data";

const iconForType = (t: string) => {
  switch (t) {
    case "pension":
      return "PiggyBank";
    case "study":
      return "Briefcase";
    case "gemel":
      return "Landmark";
    case "managers":
      return "ShieldCheck";
    default:
      return "PiggyBank";
  }
};

const PensionCategoryPage = () => {
  const navigate = useNavigate();

  const items: (CategoryItem & { __id: string; __type: string })[] = pensionProducts.map((p) => ({
    label: p.label,
    subLabel: `${p.provider} · ${p.typeLabel}`,
    amount: p.balance,
    monthly: p.monthlyDeposit || undefined,
    icon: iconForType(p.type),
    provider: p.provider,
    alert: !!p.alert,
    __id: p.id,
    __type: p.type,
  }));

  const totalBalance = pensionProducts.reduce((s, p) => s + p.balance, 0);
  const monthlyPension = pensionProducts.reduce((s, p) => s + (p.projectedPension ?? 0), 0);
  const activeCount = pensionProducts.filter((p) => p.status === "active").length;

  return (
    <CategoryPageC
      title="פנסיה"
      theme={{
        gradient:
          "linear-gradient(160deg, hsl(155, 60%, 22%) 0%, hsl(150, 60%, 32%) 55%, hsl(145, 65%, 42%) 100%)",
        accent: "hsl(150, 60%, 32%)",
        accentBg: "hsl(150, 55%, 92%)",
        accentText: "hsl(155, 60%, 18%)",
        sheetShadow: "hsla(155, 50%, 18%, 0.35)",
      }}
      items={items}
      filters={[
        { key: "all", label: "הכל", test: () => true },
        { key: "pension", label: "קרנות פנסיה", test: (i) => (i as any).__type === "pension" },
        { key: "study_gemel", label: "קופ״ג והשתלמות", test: (i) => ["study", "gemel"].includes((i as any).__type) },
        { key: "managers", label: "ביטוחי מנהלים", test: (i) => (i as any).__type === "managers" },
        { key: "alert", label: "יש התראה", test: (i) => !!i.alert },
      ]}
      primaryKpiLabel="סך החיסכון הפנסיוני"
      primaryKpiValue={formatCompact(totalBalance)}
      secondaryLeft={`${activeCount} מוצרים פעילים`}
      secondaryRight={`צפי קצבה ${formatNIS(monthlyPension)}/ח`}
      sectionTitle="כל מוצרי הפנסיה שלי"
      itemNoun="מוצרים"
      footerNote="הנתונים מתעדכנים אוטומטית מהמסלקה הפנסיונית"
      danaCtaText="איך לשפר את הפנסיה שלי?"
      danaBubbleText={
        <>
          ראיתי שיש לך <strong>2 מוצרים</strong> עם דמי ניהול מעל הממוצע — אופטימיזציה יכולה לחסוך
          {" "}
          <strong>~₪1,800/שנה</strong>.
        </>
      }
      danaBubbleCta="בואי נראה איפה"
      emptyText="אין מוצרים בקטגוריה זו"
      onItemClick={(item) => {
        const id = (item as any).__id as string;
        if (id) navigate(`/assets/pension/${id}`);
      }}
      renderItemSubtitle={(item) => item.subLabel ?? ""}
      renderItemTrailing={(item) => (
        <span className="text-end leading-tight">
          <span
            className="block text-[13px] font-bold tracking-tight"
            style={{ color: "hsl(250, 50%, 12%)" }}
          >
            {formatNIS(item.amount ?? 0)}
          </span>
          {item.monthly ? (
            <span
              className="block text-[10px] font-medium"
              style={{ color: "hsl(258, 60%, 45%)" }}
            >
              +{formatNIS(item.monthly)}/חודש
            </span>
          ) : (
            <span
              className="block text-[10px] font-medium"
              style={{ color: "hsl(230, 15%, 55%)" }}
            >
              ללא הפקדה
            </span>
          )}
        </span>
      )}
    />
  );
};

export default PensionCategoryPage;
