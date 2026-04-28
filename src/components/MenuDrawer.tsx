import { Settings, User, LogOut, FileText, Bell } from "lucide-react";
import { useLocation } from "react-router-dom";
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
  const isVersionC = pathname === "/c" || pathname.startsWith("/c/");
  const { boldCards, centerBar, setBoldCards, setCenterBar } = useVersionCSettings();

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
                <Switch checked={boldCards} onCheckedChange={setBoldCards} />
              </div>
              <div className="px-4 py-2.5 flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-foreground">מרכז פיננסי — פס צבעוני</span>
                <Switch checked={centerBar} onCheckedChange={setCenterBar} />
              </div>
            </div>
          )}

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
