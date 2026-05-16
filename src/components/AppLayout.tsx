import { useState } from "react";
import { Link, useRouterState, useNavigate, Navigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Building2,
  Users,
  FileText,
  Wrench,
  CreditCard,
  Settings,
  LogOut,
  Search,
  Bell,
  Receipt,
  ShieldCheck,
  Home,
  LucideIcon,
  BarChart3,
  Menu,
  Wallet,
  AlertTriangle,
} from "lucide-react";
import { setToken } from "@/lib/api";
import { setSession, ROLE_LABEL, type Role } from "@/lib/session";
import { useSession } from "@/hooks/useSession";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User as UserIcon } from "lucide-react";

type NavItem = { to: string; label: string; icon: LucideIcon };

const NAV: Record<Role, NavItem[]> = {
  super_admin: [
    { to: "/admin", label: "Overview", icon: LayoutDashboard },
    { to: "/admin/landlords", label: "Landlords", icon: ShieldCheck },
    { to: "/admin/properties", label: "Properties", icon: Building2 },
    { to: "/admin/users", label: "Users", icon: Users },
    { to: "/admin/reports", label: "Reports", icon: BarChart3 },
    { to: "/settings", label: "Settings", icon: Settings },
  ],
  landlord: [
    { to: "/landlord", label: "Dashboard", icon: LayoutDashboard },
    { to: "/properties", label: "Properties", icon: Building2 },
    { to: "/units", label: "Units", icon: Home },
    { to: "/tenants", label: "Tenants", icon: Users },
    { to: "/invoices", label: "Invoices", icon: FileText },
    { to: "/payments", label: "Payments", icon: CreditCard },
    { to: "/expenses", label: "Expenses", icon: Wallet },
    { to: "/arrears", label: "Arrears", icon: AlertTriangle },
    { to: "/maintenance", label: "Maintenance", icon: Wrench },
    { to: "/documents", label: "Documents", icon: FileText },
    { to: "/notifications", label: "Notifications", icon: Bell },
    { to: "/settings", label: "Settings", icon: Settings },
  ],
  tenant: [
    { to: "/tenant", label: "My Home", icon: Home },
    { to: "/tenant/maintenance", label: "Maintenance", icon: Wrench },
    { to: "/tenant/documents", label: "Documents", icon: FileText },
    { to: "/tenant/receipts", label: "Receipts", icon: Receipt },
    { to: "/settings", label: "Settings", icon: Settings },
  ],
  staff: [
    { to: "/staff", label: "Tasks", icon: Wrench },
    { to: "/maintenance", label: "Maintenance", icon: Wrench },
    { to: "/documents", label: "Documents", icon: FileText },
    { to: "/settings", label: "Settings", icon: Settings },
  ],
};

function SidebarNav({
  items,
  path,
  onNavigate,
  role,
}: {
  items: NavItem[];
  path: string;
  onNavigate?: () => void;
  role: Role;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="h-16 flex items-center gap-2 px-6 border-b border-border">
        <div className="h-8 w-8 rounded-lg bg-[image:var(--gradient-primary)]" />
        <div className="min-w-0">
          <div className="text-sm font-semibold">Zenvik</div>
          <div className="text-xs text-muted-foreground truncate">
            {ROLE_LABEL[role]}
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const active =
            path === item.to ||
            (item.to !== "/" && path.startsWith(item.to + "/"));
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                active
                  ? "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export function AppLayout({
  children,
  allow,
}: {
  children: React.ReactNode;
  allow?: Role[];
}) {
  const session = useSession();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!session) return <Navigate to="/login" />;
  if (allow && !allow.includes(session.role)) {
    return <Navigate to="/login" />;
  }

  const items = NAV[session.role];

  const logout = () => {
    setToken(null);
    setSession(null);
    navigate({ to: "/login" });
  };

  const initials = (session.name || session.email || session.user_id || "U")
    .split(/\s|@/)
    .filter(Boolean)
    .map((s) => s[0]?.toUpperCase())
    .slice(0, 2)
    .join("");

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 border-r border-border bg-card flex-col">
        <SidebarNav items={items} path={path} role={session.role} />
        <div className="p-3 border-t border-border">
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 sticky top-0 z-30 border-b border-border bg-card/80 backdrop-blur flex items-center px-4 sm:px-6 gap-2 sm:gap-4">
          {/* Mobile sidebar trigger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="flex h-full flex-col">
                <SidebarNav
                  items={items}
                  path={path}
                  role={session.role}
                  onNavigate={() => setMobileOpen(false)}
                />
                <div className="p-3 border-t border-border">
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      logout();
                    }}
                    className="flex w-full items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search…"
              className="pl-9 bg-secondary border-0"
            />
          </div>

          <Badge variant="secondary" className="hidden sm:inline-flex">
            {ROLE_LABEL[session.role]}
          </Badge>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0">
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <div className="text-sm font-semibold">Notifications</div>
                <Link
                  to="/notifications"
                  className="text-xs text-primary hover:underline"
                >
                  View all
                </Link>
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-border">
                {[
                  "New tenant application received",
                  "Invoice #1042 marked as paid",
                  "Maintenance task assigned",
                ].map((n, i) => (
                  <div key={i} className="px-4 py-3 text-sm hover:bg-secondary/60">
                    <div className="font-medium text-foreground">{n}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      Just now
                    </div>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="rounded-full outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Account menu"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {initials || "ZV"}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="text-sm font-medium truncate">
                    {session.name || "Account"}
                  </span>
                  <span className="text-xs text-muted-foreground truncate">
                    {session.email || ROLE_LABEL[session.role]}
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/settings" className="cursor-pointer">
                  <UserIcon className="h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="cursor-pointer">
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={logout}
                className="cursor-pointer text-destructive focus:text-destructive"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
