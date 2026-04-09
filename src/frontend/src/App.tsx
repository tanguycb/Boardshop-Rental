import {
  Navigate,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { Suspense, lazy } from "react";
import { UserRole } from "./backend";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useMijnRol } from "./hooks/useAuth";
import { useAuth } from "./hooks/useAuth";

// Public pages
const HomePage = lazy(() => import("./pages/Home"));
const ReserverenPage = lazy(() => import("./pages/Reserveren"));
const BevestigingPage = lazy(() => import("./pages/Bevestiging"));
const PrijslijstPage = lazy(() => import("./pages/Prijslijst"));

// Staff login
const InloggenPage = lazy(() => import("./pages/Inloggen"));

// Medewerker pages
const MedewerkerDashboard = lazy(() => import("./pages/medewerker/Dashboard"));

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="w-6 h-6 animate-spin text-primary" />
    </div>
  );
}

// Root redirect: medewerker → /medewerker/dashboard; public → / (homepage)
function RootRedirect() {
  const { isAuthenticated, isInitializing } = useAuth();
  const { data: rol, isLoading } = useMijnRol();

  if (isInitializing || isLoading) return <PageLoader />;

  if (isAuthenticated && rol === UserRole.Medewerker) {
    return <Navigate to="/medewerker/dashboard" />;
  }

  // Not authenticated or no role → show public homepage
  return <Navigate to="/home" />;
}

// Route definitions
const rootRoute = createRootRoute({ component: Outlet });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: RootRedirect,
});

// Public routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/home",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <HomePage />
    </Suspense>
  ),
});

const reserverenRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reserveren",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ReserverenPage />
    </Suspense>
  ),
});

const bevestigingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/bevestiging",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <BevestigingPage />
    </Suspense>
  ),
});

const prijslijstRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/prijslijst",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <PrijslijstPage />
    </Suspense>
  ),
});

// Staff login route
const inloggenRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/inloggen",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <InloggenPage />
    </Suspense>
  ),
});

// Medewerker routes (protected)
const medewerkerLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/medewerker",
  component: () => (
    <ProtectedRoute requiredRole={UserRole.Medewerker}>
      <MedewerkerLayout />
    </ProtectedRoute>
  ),
});

function MedewerkerLayout() {
  return (
    <Layout role={UserRole.Medewerker} showSidebar>
      <Outlet />
    </Layout>
  );
}

const medewerkerIndexRoute = createRoute({
  getParentRoute: () => medewerkerLayoutRoute,
  path: "/",
  component: () => <Navigate to="/medewerker/dashboard" />,
});

const medewerkerDashboardRoute = createRoute({
  getParentRoute: () => medewerkerLayoutRoute,
  path: "/dashboard",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <MedewerkerDashboard />
    </Suspense>
  ),
});

const medewerkerInventarisRoute = createRoute({
  getParentRoute: () => medewerkerLayoutRoute,
  path: "/inventaris",
  component: lazy(() => import("./pages/medewerker/Inventaris")),
});

const medewerkerVerhuurRoute = createRoute({
  getParentRoute: () => medewerkerLayoutRoute,
  path: "/verhuur",
  component: lazy(() => import("./pages/medewerker/ActieveVerhuur")),
});

const medewerkerTeLaatRoute = createRoute({
  getParentRoute: () => medewerkerLayoutRoute,
  path: "/te-laat",
  component: lazy(() => import("./pages/medewerker/TeLaat")),
});

const medewerkerNieuweVerhuurRoute = createRoute({
  getParentRoute: () => medewerkerLayoutRoute,
  path: "/nieuwe-verhuur",
  component: () => {
    const NieuweVerhuur = lazy(
      () => import("./pages/medewerker/NieuweVerhuur"),
    );
    return (
      <Suspense fallback={<PageLoader />}>
        <NieuweVerhuur />
      </Suspense>
    );
  },
});

const medewerkerReserveringenRoute = createRoute({
  getParentRoute: () => medewerkerLayoutRoute,
  path: "/reserveringen",
  component: lazy(() => import("./pages/medewerker/Reserveringen")),
});

const medewerkerQrCodesRoute = createRoute({
  getParentRoute: () => medewerkerLayoutRoute,
  path: "/qr-codes",
  component: lazy(() => import("./pages/medewerker/QrCodes")),
});

const medewerkerKlantenRoute = createRoute({
  getParentRoute: () => medewerkerLayoutRoute,
  path: "/klanten",
  component: lazy(() => import("./pages/medewerker/Klanten")),
});

const instellingenRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/instellingen",
  component: lazy(() => import("./pages/Instellingen")),
});

// Route tree — no /klant/* routes
const routeTree = rootRoute.addChildren([
  indexRoute,
  homeRoute,
  reserverenRoute,
  bevestigingRoute,
  prijslijstRoute,
  inloggenRoute,
  medewerkerLayoutRoute.addChildren([
    medewerkerIndexRoute,
    medewerkerDashboardRoute,
    medewerkerInventarisRoute,
    medewerkerVerhuurRoute,
    medewerkerTeLaatRoute,
    medewerkerNieuweVerhuurRoute,
    medewerkerReserveringenRoute,
    medewerkerQrCodesRoute,
    medewerkerKlantenRoute,
  ]),
  instellingenRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
