import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  ListChecks,
  Mail,
  Settings,
  Shield,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";

const menuItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/regulations", label: "Regulations", icon: FileText },
  { to: "/actions", label: "Actions", icon: ListChecks },
  { to: "/digests", label: "Digests", icon: Mail },
];

const generalItems = [{ to: "/settings", label: "Settings", icon: Settings }];

const Sidebar = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();

  const renderNavItem = (item: {
    to: string;
    label: string;
    icon: React.ElementType;
  }) => {
    const isActive = location.pathname.startsWith(item.to);
    return (
      <li key={item.to}>
        <NavLink
          to={item.to}
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
            isActive
              ? "bg-sidebar-active text-primary-foreground"
              : "text-sidebar-muted hover:bg-sidebar-hover hover:text-sidebar-fg"
          }`}
        >
          <item.icon size={18} />
          <span>{item.label}</span>
        </NavLink>
      </li>
    );
  };

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-[240px] flex-col bg-sidebar-bg text-sidebar-fg">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 py-7">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-active">
          <Shield size={18} className="text-primary-foreground" />
        </div>
        <span className="text-lg font-bold tracking-tight text-sidebar-fg">
          Regulix
        </span>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-sidebar-muted">
          Menu
        </p>
        <ul className="space-y-1">{menuItems.map(renderNavItem)}</ul>

        <p className="mb-2 mt-8 px-3 text-[10px] font-semibold uppercase tracking-widest text-sidebar-muted">
          General
        </p>
        <ul className="space-y-1">{generalItems.map(renderNavItem)}</ul>
      </nav>

      {/* User */}
      <div className="border-t border-sidebar-hover px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-hover text-sm font-semibold text-sidebar-fg">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-sidebar-fg">
              {user?.name || "User"}
            </p>
            <p className="truncate text-[11px] text-sidebar-muted">
              {user?.email || "user@email.com"}
            </p>
          </div>
          <button
            onClick={logout}
            className="rounded-lg p-1.5 text-sidebar-muted transition-colors hover:bg-sidebar-hover hover:text-sidebar-fg"
            title="Sign out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
