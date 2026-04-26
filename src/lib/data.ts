// Hardcoded financial data

export const userData = {
  name: "משה",
  currentPotential: 10200000,
  maxPotential: 15300000,
  improvementAmount: 5100000,
};

export const incomeItems = [
  { label: "משכורת נטו", amount: 28000 },
  { label: "הכנסה מנכס להשכרה", amount: 5500 },
  { label: "הכנסה מפרילנס", amount: 3500 },
  { label: "דיבידנדים", amount: 1000 },
];

export const expenseItems = [
  { label: "משכנתא", amount: 5200 },
  { label: "חינוך ילדים", amount: 3800 },
  { label: "מזון וסופר", amount: 3000 },
  { label: "רכב + דלק", amount: 2500 },
  { label: "ארנונה + ועד בית", amount: 1200 },
  { label: "חשמל + מים + גז", amount: 800 },
  { label: "בילויים ומסעדות", amount: 1500 },
];

export const insuranceItems = [
  { label: "ביטוח חיים", status: "פעיל", coverage: "₪2,000,000", cost: 650, billing: "monthly" as const, icon: "Heart", provider: "מגדל" },
  { label: "ביטוח בריאות", status: "פעיל", coverage: "קו הזהב הפניקס", cost: 350, billing: "monthly" as const, icon: "Activity", provider: "הפניקס", alert: true },
  { label: "ביטוח רכב", status: "פעיל", coverage: "מקיף", cost: 420, billing: "monthly" as const, icon: "Car", provider: "כלל" },
  { label: "ביטוח דירה", status: "פעיל", coverage: "₪1,800,000", cost: 180, billing: "monthly" as const, icon: "Home", provider: "מנורה מבטחים" },
  { label: "אובדן כושר עבודה", status: "פעיל", coverage: "₪15,000/חודש", cost: 4800, billing: "yearly" as const, icon: "Briefcase", provider: "הראל" },
  { label: "ביטוח נסיעות לחו״ל", status: "פעיל", coverage: "כיסוי שנתי מלא", cost: 1200, billing: "yearly" as const, icon: "Plane", provider: "PassportCard" },
  { label: "ביטוח מנהלים", status: "פעיל", coverage: "פנסיוני משלים", cost: 18800, billing: "yearly" as const, icon: "ShieldCheck", provider: "מנורה" },
  { label: "ביטוח סיעודי", status: "חסר", coverage: "—", cost: 0, billing: "monthly" as const, icon: "HeartPulse", provider: "—" },
];

export const assetItems = [
  { label: "פנסיה", subLabel: "סך החיסכון", amount: 1233500, monthly: 9069, monthlyLabel: "צפי קצבה חודשית", icon: "PiggyBank", provider: "מנורה מבטחים" },
  { label: "השקעות", subLabel: "תיק השקעות", amount: 2095000, icon: "LineChart", provider: "אלטשולר שחם", alert: true },
  { label: "חשבון עו״ש", subLabel: "יתרה שוטפת", amount: 24500, icon: "CreditCard", provider: "בנק הפועלים" },
  { label: "קרן השתלמות", subLabel: "נזילה", amount: 412000, icon: "Briefcase", provider: "כלל" },
  { label: "נדל״ן להשקעה", subLabel: "דירה ברמת גן", amount: 2800000, monthly: 5500, monthlyLabel: "הכנסה חודשית", icon: "Home", provider: "פרטי" },
  { label: "מטבע דיגיטלי", subLabel: "תיק קריפטו", amount: 87000, icon: "TrendingUp", provider: "Bits of Gold" },
  { label: "פיקדון בנקאי", subLabel: "פיקדון לשנתיים", amount: 250000, icon: "Landmark", provider: "בנק לאומי" },
  { label: "קופת גמל", subLabel: "השקעה לטווח ארוך", amount: 498000, icon: "PiggyBank", provider: "הראל" },
];

export const liabilityItems = [
  { label: "משכנתא — דירה ראשית", subLabel: "מסלול משולב", balance: 720000, monthly: 5200, icon: "Home", provider: "בנק מזרחי" },
  { label: "משכנתא — דירה להשקעה", subLabel: "פריים", balance: 390000, monthly: 2300, icon: "Home", provider: "בנק לאומי", alert: true },
  { label: "הלוואת רכב", subLabel: "36 חודשים נותרו", balance: 65000, monthly: 1850, icon: "Car", provider: "ישראכרט" },
  { label: "הלוואת חינוך", subLabel: "אוניברסיטה", balance: 42000, monthly: 1200, icon: "Briefcase", provider: "בנק הפועלים" },
  { label: "כרטיס אשראי", subLabel: "תשלומים פרוסים", balance: 18500, monthly: 950, icon: "CreditCard", provider: "מקס" },
  { label: "מסגרת אשראי", subLabel: "ניצול שוטף", balance: 12000, monthly: 700, icon: "Landmark", provider: "בנק דיסקונט" },
  { label: "הלוואה משפחתית", subLabel: "ללא ריבית", balance: 80000, monthly: 1000, icon: "Wallet", provider: "פרטי" },
];


export const recommendations = [
  {
    id: 1,
    title: "מחזור משכנתא",
    description: "הריבית שלך גבוהה מהממוצע בשוק — מחזור יכול לחסוך משמעותית",
    saving: "₪32,000/שנה",
    action: "טפל עכשיו",
    icon: "Home",
    criticality: "high" as const,
  },
  {
    id: 2,
    title: "ביטוח סיעודי חסר",
    description: "אין לך כיסוי סיעודי — מומלץ להוסיף פוליסה בסיסית",
    saving: "₪250/חודש",
    action: "השווה הצעות",
    icon: "Shield",
    criticality: "high" as const,
  },
  {
    id: 3,
    title: "קביעת תור עם יועץ",
    description: "ייעוץ אישי מותאם לפרופיל הפיננסי שלך",
    saving: "",
    action: "קבע תור",
    icon: "Calendar",
    criticality: "medium" as const,
  },
  {
    id: 4,
    title: "אופטימיזציית ביטוחים",
    description: "בדיקת הצעות מתחרות לביטוח חיים יכולה לחסוך",
    saving: "₪1,800/שנה",
    action: "בדוק עכשיו",
    icon: "Shield",
    criticality: "medium" as const,
  },
  {
    id: 5,
    title: "הוספת נכס ידני",
    description: "תעד את הנכסים שלך כדי לקבל תמונה מדויקת יותר",
    saving: "",
    action: "הוסף נכס",
    icon: "Plus",
    criticality: "low" as const,
  },
  {
    id: 6,
    title: "פיזור תיק השקעות",
    description: "התיק שלך מרוכז מדי — מומלץ לפזר בין אפיקים",
    saving: "₪8,000/שנה",
    action: "ראה פירוט",
    icon: "TrendingUp",
    criticality: "medium" as const,
  },
];

export const criticalityConfig = {
  high: { label: "קריטי", bg: "hsl(0, 70%, 95%)", color: "hsl(0, 65%, 45%)" },
  medium: { label: "בינוני", bg: "hsl(45, 80%, 92%)", color: "hsl(35, 70%, 40%)" },
  low: { label: "נמוך", bg: "hsl(130, 50%, 92%)", color: "hsl(130, 45%, 35%)" },
};

export const chatCategories = [
  {
    name: "משכנתא",
    icon: "Home",
    questions: [
      { q: "האם כדאי לי לעשות מחזור?", a: "בהתבסס על הנתונים שלך, מחזור משכנתא יכול לחסוך לך כ-₪32,000 בשנה. הריבית הנוכחית שלך גבוהה מהממוצע בשוק." },
      { q: "מה המסלול הכי טוב בשבילי?", a: "מומלץ לשקול שילוב של 60% פריים ו-40% קבועה לא צמודה. זה נותן גמישות עם יציבות." },
    ],
  },
  {
    name: "חיסכון",
    icon: "PiggyBank",
    questions: [
      { q: "איך אני יכול לחסוך יותר?", a: "ניתוח ההוצאות שלך מראה שאפשר לחסוך כ-₪2,000 בחודש על ידי אופטימיזציה של הוצאות קבועות כמו ביטוחים וחבילות תקשורת." },
      { q: "כמה כדאי לשים בצד כל חודש?", a: "המלצתי היא לשים 20% מההכנסה נטו, כלומר כ-₪7,600 בחודש, מחולק בין קרן חירום וחיסכון לטווח ארוך." },
    ],
  },
  {
    name: "ביטוח",
    icon: "Shield",
    questions: [
      { q: "האם הביטוחים שלי מספיקים?", a: "חסר לך ביטוח סיעודי. בגילך מומלץ להוסיף כיסוי סיעודי בסיסי. שאר הביטוחים שלך נראים תקינים." },
      { q: "האם אני משלם יותר מדי?", a: "הביטוחים שלך בטווח הסביר, אבל ניתן לבדוק הצעות מתחרות לביטוח חיים ולחסוך כ-₪150/חודש." },
    ],
  },
  {
    name: "השקעות",
    icon: "TrendingUp",
    questions: [
      { q: "איפה כדאי להשקיע עכשיו?", a: "בהתחשב בפרופיל הסיכון שלך ובגיל, מומלץ לפזר: 50% מניות, 30% אג\"ח, 20% אלטרנטיבי." },
      { q: "מה לגבי קרנות השתלמות?", a: "קרן ההשתלמות שלך נזילה. מומלץ להשאיר אותה ולנצל את הטבת המס. החיסכון השנתי במס: כ-₪5,000." },
    ],
  },
];
