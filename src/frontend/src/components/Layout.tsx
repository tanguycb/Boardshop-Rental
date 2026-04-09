import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Bell, ChevronDown, LogOut, Menu, User } from "lucide-react";
import { useState } from "react";
import { UserRole } from "../backend";
import { useAuth, useMijnProfiel } from "../hooks/useAuth";
import { useVervallenVerhuringen } from "../hooks/useVerhuringen";
import { useAppStore } from "../store";
import { Navigation } from "./Navigation";

type LayoutProps = {
  children: React.ReactNode;
  role?: UserRole;
  showSidebar?: boolean;
};

export function Layout({ children, role, showSidebar = true }: LayoutProps) {
  const { logout } = useAuth();
  const { data: profiel } = useMijnProfiel();
  const { data: vervallenVerhuringen } = useVervallenVerhuringen();
  const overdueCount = vervallenVerhuringen?.length ?? 0;
  const { sidebarOpen, setSidebarOpen } = useAppStore();

  const initials = profiel?.naam
    ? profiel.naam
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "??";

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar – desktop */}
      {showSidebar && role && (
        <aside className="hidden lg:flex flex-col w-60 shrink-0">
          <Navigation role={role} />
        </aside>
      )}

      {/* Sidebar overlay – mobile */}
      {showSidebar && role && sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-foreground/20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setSidebarOpen(false)}
            role="button"
            tabIndex={-1}
            aria-label="Menu sluiten"
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-64 flex flex-col lg:hidden shadow-elevated">
            <Navigation role={role} onClose={() => setSidebarOpen(false)} />
          </aside>
        </>
      )}

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top header */}
        <header className="bg-card border-b border-border shadow-xs shrink-0 z-10">
          <div className="flex items-center justify-between px-4 h-14">
            <div className="flex items-center gap-3 min-w-0">
              {showSidebar && role && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden h-8 w-8 shrink-0"
                  onClick={() => setSidebarOpen(true)}
                  aria-label="Menu openen"
                  data-ocid="header-menu-toggle"
                >
                  <Menu className="w-4 h-4" />
                </Button>
              )}

              {!showSidebar && (
                <Link to="/home" className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-display font-bold text-xs">
                      WS
                    </span>
                  </div>
                  <span className="font-display font-semibold text-foreground text-sm tracking-tight hidden sm:block">
                    West-Site Rental
                  </span>
                </Link>
              )}

              {role && (
                <Badge
                  variant="outline"
                  className={cn(
                    "hidden sm:inline-flex text-xs",
                    "border-primary/30 text-primary",
                  )}
                >
                  {role === UserRole.Admin ? "Admin" : "Medewerker"}
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Notifications — medewerker only */}
              {role === UserRole.Medewerker && overdueCount > 0 && (
                <Link to="/medewerker/te-laat">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-8 w-8"
                    data-ocid="header-notifications"
                    aria-label={`${overdueCount} verhuringen te laat`}
                  >
                    <Bell className="w-4 h-4" />
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center font-bold leading-none">
                      {overdueCount > 9 ? "9+" : overdueCount}
                    </span>
                  </Button>
                </Link>
              )}

              {/* User menu — only for authenticated staff */}
              {profiel && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 h-8 px-2"
                      data-ocid="header-user-menu"
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden sm:block text-sm font-medium max-w-[120px] truncate">
                        {profiel.naam}
                      </span>
                      <ChevronDown className="w-3 h-3 text-muted-foreground shrink-0" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem className="gap-2" asChild>
                      <Link to="/instellingen">
                        <User className="w-3.5 h-3.5" />
                        Profiel
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="gap-2 text-destructive focus:text-destructive"
                      onClick={logout}
                      data-ocid="header-logout"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Uitloggen
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-background">{children}</main>
      </div>

      <Toaster richColors position="top-right" />
    </div>
  );
}

/**
 * Public layout — used for /, /reserveren, /bevestiging.
 * No auth required. Shows logo + link to /inloggen for staff.
 */
export function PublicLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-card border-b border-border shadow-xs sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/home" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-xs">
              <span className="text-primary-foreground font-display font-bold text-sm">
                WS
              </span>
            </div>
            <div>
              <p className="font-display font-semibold text-foreground text-sm leading-tight">
                West-Site Rental
              </p>
              <p className="text-muted-foreground text-xs">Boardshop</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/home"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              data-ocid="public-nav-home"
            >
              Verhuur
            </Link>
            <Link
              to="/prijslijst"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              data-ocid="public-nav-prijslijst"
            >
              Prijslijst
            </Link>
            <Link
              to="/reserveren"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              data-ocid="public-nav-reserveren"
            >
              Reserveren
            </Link>
            <Link
              to="/inloggen"
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors border border-border rounded-md px-3 py-1.5"
              data-ocid="public-nav-staff-login"
            >
              Medewerkers inloggen
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-8 w-8"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu openen"
          >
            <Menu className="w-4 h-4" />
          </Button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card px-4 py-3 space-y-2">
            <Link
              to="/home"
              className="block text-sm font-medium text-foreground py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Verhuur
            </Link>
            <Link
              to="/prijslijst"
              className="block text-sm font-medium text-foreground py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Prijslijst
            </Link>
            <Link
              to="/reserveren"
              className="block text-sm font-medium text-foreground py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Reserveren
            </Link>
            <Link
              to="/inloggen"
              className="block text-sm font-medium text-muted-foreground py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Medewerkers inloggen
            </Link>
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col">{children}</main>

      <footer className="bg-card border-t border-border py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">
                WS
              </span>
            </div>
            <span className="text-sm font-medium text-foreground">
              West-Site Rental
            </span>
          </div>
          <p className="text-center text-muted-foreground text-xs">
            © {new Date().getFullYear()}. Gebouwd met ❤️ via{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
          <Link
            to="/inloggen"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Medewerkers inloggen →
          </Link>
        </div>
      </footer>
      <Toaster richColors position="top-right" />
    </div>
  );
}
