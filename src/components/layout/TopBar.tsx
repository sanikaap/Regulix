import { Search, Bell, Mail } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

interface TopBarProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

const TopBar = ({ title, subtitle, action }: TopBarProps) => {
  const user = useAuthStore((s) => s.user);

  return (
    <header className="flex items-center justify-between bg-background px-8 py-5">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        {subtitle && (
          <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search…"
            className="h-9 w-56 rounded-lg border border-rule bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-rule bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            ⌘F
          </span>
        </div>
        {action}
        {/* Icons */}
        <button className="relative rounded-lg border border-rule bg-card p-2 text-muted-foreground transition-colors hover:text-foreground">
          <Mail size={16} />
        </button>
        <button className="relative rounded-lg border border-rule bg-card p-2 text-muted-foreground transition-colors hover:text-foreground">
          <Bell size={16} />
        </button>
        {/* User avatar */}
        <div className="flex items-center gap-3 rounded-lg border border-rule bg-card px-3 py-1.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              {user?.name || "User"}
            </p>
            <p className="text-[11px] text-muted-foreground">
              {user?.email || "user@email.com"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
