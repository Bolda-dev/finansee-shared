import { Settings, User, LogOut, FileText, Bell, Sparkles } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { userData } from "@/lib/data";
import { useVersionCSettings } from "@/contexts/VersionCSettings";

interface MenuDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const menuItems = [
  { label: "פרופיל", icon: User },
  { label: "התראות", icon: Bell },
  { label: "מסמכים", icon: FileText },
  { label: "הגדרות", icon: Settings },
];

export const MenuDrawer = ({ open, onOpenChange }: MenuDrawerProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isVersionB = pathname === "/b" || pathname.startsWith("/b/");
  const isVersionC = pathname === "/c" || pathname.startsWith("/c/");
  const isVersionD = pathname === "/d" || pathname.startsWith("/d/");
  const { boldCards, centerBar, innerGrid, logoLeft, setBoldCards, setCenterBar, setInnerGrid, setLogoLeft } = useVersionCSettings();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[300px] p-0" dir="rtl">
        <SheetHeader className="p-6 pb-4">
          <SheetTitle className="text-right text-lg">שלום, {userData.name}</SheetTitle>
        </SheetHeader>

        <div className="px-4 pb-6">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-accent transition-colors"
              >
                <item.icon className="h-5 w-5 text-muted-foreground" />
                {item.label}
              </button>
            ))}
          </div>

          {isVersionC && (
            <div className="border-t border-border mt-4 pt-4">
              <p className="px-4 text-xs font-bold text-muted-foreground mb-2">גרסה C</p>
              <div className="px-4 py-2.5 flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-foreground">כרטיסיות — צבעוני נועז</span>
                <Switch dir="ltr" checked={boldCards} onCheckedChange={setBoldCards} />
              </div>
              <div className="px-4 py-2.5 flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-foreground">מרכז פיננסי — פס צבעוני</span>
                <Switch dir="ltr" checked={centerBar} onCheckedChange={setCenterBar} />
              </div>
              <div className="px-4 py-2.5 flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-foreground">עמודים פנימיים — תצוגת גריד</span>
                <Switch dir="ltr" checked={innerGrid} onCheckedChange={setInnerGrid} />
              </div>
              <div className="px-4 py-2.5 flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-foreground">לוגו — צמוד לשמאל</span>
                <Switch dir="ltr" checked={logoLeft} onCheckedChange={setLogoLeft} />
              </div>
            </div>
          )}

          {isVersionD && (
            <div className="border-t border-border mt-4 pt-4">
              <p className="px-4 text-xs font-bold text-muted-foreground mb-2">גרסה D</p>
              <div className="px-4 py-2.5 flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-foreground">עמודים פנימיים — תצוגת גריד</span>
                <Switch dir="ltr" checked={innerGrid} onCheckedChange={setInnerGrid} />
              </div>
              <div className="px-4 py-2.5 flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-foreground">לוגו — צמוד לשמאל</span>
                <Switch dir="ltr" checked={logoLeft} onCheckedChange={setLogoLeft} />
              </div>
            </div>
          )}

          {isVersionB && (
            <div className="border-t border-border mt-4 pt-4">
              <p className="px-4 text-xs font-bold text-muted-foreground mb-2">גרסה B</p>
              <div className="px-4 py-2.5 flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-foreground">לוגו — צמוד לשמאל</span>
                <Switch dir="ltr" checked={logoLeft} onCheckedChange={setLogoLeft} />
              </div>
            </div>
          )}

          <div className="border-t border-border mt-4 pt-4">
            <p className="px-4 text-xs font-bold text-muted-foreground mb-2">גרסאות</p>
            <button onClick={() => { onOpenChange(false); navigate("/"); }} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-accent transition-colors">
              <Sparkles className="h-4 w-4 text-muted-foreground" />
              גרסה A
            </button>
            <button onClick={() => { onOpenChange(false); navigate("/b"); }} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-accent transition-colors">
              <Sparkles className="h-4 w-4 text-muted-foreground" />
              גרסה B
            </button>
            <button onClick={() => { onOpenChange(false); navigate("/c"); }} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-accent transition-colors">
              <Sparkles className="h-4 w-4 text-muted-foreground" />
              גרסה C
            </button>
            <button onClick={() => { onOpenChange(false); navigate("/d"); }} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-accent transition-colors">
              <Sparkles className="h-4 w-4 text-muted-foreground" />
              גרסה D — Dark Metallic
            </button>
          </div>

          <div className="border-t border-border mt-4 pt-4">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-destructive/10 transition-colors" style={{ color: "hsl(0, 60%, 50%)" }}>
              <LogOut className="h-5 w-5" />
              יציאה
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
