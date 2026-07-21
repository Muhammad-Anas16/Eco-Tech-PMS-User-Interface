import { useState } from "react";
import { NavLink, Outlet } from "react-router";
import generalModules from "@/data/generalModules";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

// Sidebar content — dono desktop aur mobile (Sheet ke andar) me reuse hoga
const SidebarNav = ({ onNavigate }) => (
  <div className="space-y-1">
    <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">
      General
    </p>
    {generalModules.map((mod) => (
      <NavLink
        key={mod.id}
        to={mod.path}
        onClick={onNavigate}
        className={({ isActive }) =>
          cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            isActive
              ? `${mod.bg} ${mod.color} font-semibold`
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )
        }
      >
        <mod.icon className="h-4 w-4" />
        {mod.title}
      </NavLink>
    ))}
  </div>
);

const GeneralLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Mobile: top bar with hamburger trigger */}
      <div className="flex items-center justify-between md:hidden">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase">
          General
        </h2>
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-4">
            <SidebarNav onNavigate={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop: persistent sidebar */}
      <aside className="hidden md:block w-56 shrink-0">
        <div className="rounded-xl border bg-card p-2 sticky top-4">
          <SidebarNav />
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  );
};

export default GeneralLayout;
