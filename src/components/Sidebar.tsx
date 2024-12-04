import { Link, useLocation } from "react-router-dom";
import { Home, Settings, type LucideIcon } from "lucide-react";
import { Sheet, SheetContent } from "./ui/sheet";

interface Route {
  name: string;
  path: string;
  icon: LucideIcon;
}

const routes: Route[] = [
  { name: "Home", path: "/", icon: Home },
  { name: "Settings", path: "/settings", icon: Settings },
];

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function Sidebar({ open, setOpen }: SidebarProps) {
  const location = useLocation();

  const SidebarContent = (
    <div className="flex flex-col h-full bg-card text-card-foreground">
      <div className="flex items-center justify-center h-16 border-b">
        {/* <span className="text-2xl font-semibold">Dashboard</span> */}
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="p-2 space-y-1">
          {routes.map((route) => (
            <li key={route.path}>
              <Link
                to={route.path}
                className={`flex items-center px-4 py-2 text-sm rounded-lg ${
                  location.pathname === route.path
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                }`}
                onClick={() => setOpen(false)}
              >
                <route.icon className="w-5 h-5 mr-3" />
                {route.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="p-0 w-64">
          {SidebarContent}
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        {SidebarContent}
      </div>
    </>
  );
}

export default Sidebar;
