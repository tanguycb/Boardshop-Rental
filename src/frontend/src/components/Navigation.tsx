import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  AlertTriangle,
  CalendarCheck,
  Clock,
  ExternalLink,
  LayoutDashboard,
  Package,
  PlusCircle,
  QrCode,
  Settings,
  Users,
  X,
} from "lucide-react";
import { UserRole } from "../backend";
import { useVervallenVerhuringen } from "../hooks/useVerhuringen";
import { useAppStore } from "../store";

type NavLinkProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
  onClick?: () => void;
};

function NavLink({ href, icon, label, badge, onClick }: NavLinkProps) {
  const state = useRouterState();
  const isActive =
    state.location.pathname === href ||
    state.location.pathname.startsWith(`${href}/`);

  return (
    <Link
      to={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-smooth min-w-0",
        isActive
          ? "bg-primary text-primary-foreground shadow-xs"
          : "text-sidebar-foreground hover:bg-muted hover:text-foreground",
      )}
      data-ocid={`nav-${href.replace(/\//g, "-").replace(/^-/, "")}-link`}
    >
      <span className="shrink-0 w-4 h-4">{icon}</span>
      <span className="truncate">{label}</span>
      {badge !== undefined && badge > 0 && (
        <Badge
          variant="destructive"
          className="ml-auto shrink-0 text-xs px-1.5 py-0 h-5"
        >
          {badge}
        </Badge>
      )}
    </Link>
  );
}

type NavigationProps = {
  role: UserRole;
  onClose?: () => void;
};

export function Navigation({ role, onClose }: NavigationProps) {
  const { data: vervallenVerhuringen } = useVervallenVerhuringen();
  const overdueCount = vervallenVerhuringen?.length ?? 0;
  const setSidebarOpen = useAppStore((s) => s.setSidebarOpen);

  const handleClick = () => {
    setSidebarOpen(false);
    onClose?.();
  };

  return (
    <nav className="flex flex-col h-full bg-sidebar border-r border-sidebar-border">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-xs">
              WS
            </span>
          </div>
          <span className="font-display font-semibold text-foreground text-sm tracking-tight">
            West-Site Rental
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden h-7 w-7"
          onClick={handleClick}
          aria-label="Menu sluiten"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Role badge */}
      <div className="px-4 py-3">
        <Badge
          className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary border-primary/20"
          variant="outline"
        >
          {role === UserRole.Admin ? "Admin" : "Medewerker"}
        </Badge>
      </div>

      {/* Nav links */}
      <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-1">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 py-2">
          Beheer
        </p>
        <NavLink
          href="/medewerker/dashboard"
          icon={<LayoutDashboard className="w-4 h-4" />}
          label="Dashboard"
          onClick={handleClick}
        />
        <NavLink
          href="/medewerker/inventaris"
          icon={<Package className="w-4 h-4" />}
          label="Inventaris"
          onClick={handleClick}
        />
        <NavLink
          href="/medewerker/verhuur"
          icon={<Clock className="w-4 h-4" />}
          label="Actieve verhuur"
          badge={overdueCount}
          onClick={handleClick}
        />
        <NavLink
          href="/medewerker/nieuwe-verhuur"
          icon={<PlusCircle className="w-4 h-4" />}
          label="Nieuwe verhuur"
          onClick={handleClick}
        />
        <NavLink
          href="/medewerker/te-laat"
          icon={<AlertTriangle className="w-4 h-4" />}
          label="Te laat"
          badge={overdueCount}
          onClick={handleClick}
        />
        <NavLink
          href="/medewerker/reserveringen"
          icon={<CalendarCheck className="w-4 h-4" />}
          label="Reserveringen"
          onClick={handleClick}
        />
        <NavLink
          href="/medewerker/qr-codes"
          icon={<QrCode className="w-4 h-4" />}
          label="QR-codes afdrukken"
          onClick={handleClick}
        />
        <NavLink
          href="/medewerker/klanten"
          icon={<Users className="w-4 h-4" />}
          label="Klanten"
          onClick={handleClick}
        />

        <div className="pt-2 border-t border-sidebar-border mt-2">
          <NavLink
            href="/instellingen"
            icon={<Settings className="w-4 h-4" />}
            label="Instellingen"
            onClick={handleClick}
          />
        </div>

        {/* Back to public site */}
        <div className="pt-1">
          <Link
            to="/home"
            onClick={handleClick}
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-smooth min-w-0"
            data-ocid="nav-back-to-site"
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            <span className="truncate">Klantenpagina</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
