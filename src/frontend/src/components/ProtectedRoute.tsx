import { Skeleton } from "@/components/ui/skeleton";
import { Navigate } from "@tanstack/react-router";
import type { UserRole } from "../backend";
import { useAuth, useMijnRol } from "../hooks/useAuth";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRole?: UserRole;
  redirectTo?: string;
};

export function ProtectedRoute({
  children,
  requiredRole,
  redirectTo = "/inloggen",
}: ProtectedRouteProps) {
  const { isAuthenticated, isInitializing } = useAuth();
  const { data: rol, isLoading: rolLoading } = useMijnRol();

  if (isInitializing || rolLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="space-y-3 w-64">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} />;
  }

  // If no role registered yet, redirect to /inloggen for staff onboarding
  if (!rol) {
    return <Navigate to="/inloggen" />;
  }

  if (requiredRole && rol !== requiredRole) {
    // Only Medewerker/Admin roles exist — redirect to medewerker dashboard
    return <Navigate to="/medewerker/dashboard" />;
  }

  return <>{children}</>;
}
