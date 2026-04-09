import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  CalendarCheck,
  Clock,
  LayoutDashboard,
  Package,
  QrCode,
  Users,
} from "lucide-react";
import { VerhuurStatus } from "../../backend";
import { useProducten } from "../../hooks/useProducten";
import { useAlleReserveringen } from "../../hooks/useReserveringen";
import {
  useActieveVerhuringen,
  useVervallenVerhuringen,
} from "../../hooks/useVerhuringen";
import { formatDate } from "../../lib/utils";

// ── StatCard ──────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  icon,
  isLoading,
  accent,
  href,
}: {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  isLoading?: boolean;
  accent?: "primary" | "accent" | "destructive" | "warning";
  href?: string;
}) {
  const colorMap = {
    primary: "text-primary bg-primary/10",
    accent: "text-accent bg-accent/10",
    destructive: "text-destructive bg-destructive/10",
    warning: "text-orange-500 bg-orange-500/10",
  };

  const content = (
    <Card className="card-rental hover:shadow-md transition-smooth group cursor-pointer">
      <CardContent className="p-4 flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${colorMap[accent ?? "primary"]}`}
        >
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-muted-foreground">{label}</p>
          {isLoading ? (
            <Skeleton className="h-6 w-12 mt-0.5" />
          ) : (
            <p className="text-2xl font-display font-bold text-foreground">
              {value}
            </p>
          )}
        </div>
        {href && (
          <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-smooth shrink-0" />
        )}
      </CardContent>
    </Card>
  );

  if (href) return <Link to={href}>{content}</Link>;
  return content;
}

// ── QuickActionCard ────────────────────────────────────────────────────────────

type QuickAction = {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  urgent?: boolean;
};

function QuickActionCard({ href, label, icon, badge, urgent }: QuickAction) {
  return (
    <Link to={href}>
      <Button
        variant="outline"
        className={`w-full h-auto py-3 px-4 flex items-center gap-3 justify-start transition-smooth hover:border-primary/40 ${urgent ? "border-destructive/40 hover:border-destructive" : ""}`}
        data-ocid={`dashboard-quick-${href.split("/").pop()}`}
      >
        <span className={urgent ? "text-destructive" : "text-primary"}>
          {icon}
        </span>
        <span className="text-sm font-medium flex-1 text-left">{label}</span>
        {badge !== undefined && badge > 0 && (
          <Badge
            variant={urgent ? "destructive" : "secondary"}
            className="text-xs ml-auto"
          >
            {badge}
          </Badge>
        )}
      </Button>
    </Link>
  );
}

// ── hoofd-component ────────────────────────────────────────────────────────────

export default function MedewerkerDashboard() {
  const { data: producten, isLoading: pLoading } = useProducten();
  const { data: actief, isLoading: aLoading } = useActieveVerhuringen();
  const { data: vervallen, isLoading: vLoading } = useVervallenVerhuringen();
  const { data: reserveringen, isLoading: rLoading } = useAlleReserveringen();

  const totalProducten = producten?.length ?? 0;
  const beschikbaar = producten?.filter((p) => p.beschikbaar).length ?? 0;
  const inVerhuur =
    actief?.filter((v) => v.status === VerhuurStatus.Actief).length ?? 0;
  const teLaat = vervallen?.length ?? 0;
  const inAfwachting =
    reserveringen?.filter((r) => r.status === "InAfwachting").length ?? 0;

  // Recent activities: latest active + overdue rentals
  const recenteActiviteit = [
    ...(actief?.slice(0, 3) ?? []).map((v) => ({
      ...v,
      type: "actief" as const,
    })),
    ...(vervallen?.slice(0, 2) ?? []).map((v) => ({
      ...v,
      type: "telaat" as const,
    })),
  ].slice(0, 5);

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-primary" />
            Medewerkers Dashboard
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Overzicht van inventaris, verhuur en reserveringen
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          {new Date().toLocaleDateString("nl-NL", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          label="In afwachting"
          value={inAfwachting}
          icon={<CalendarCheck className="w-5 h-5" />}
          isLoading={rLoading}
          accent="warning"
          href="/medewerker/reserveringen"
        />
        <StatCard
          label="Actief verhuurd"
          value={inVerhuur}
          icon={<Clock className="w-5 h-5" />}
          isLoading={aLoading}
          accent="accent"
          href="/medewerker/verhuur"
        />
        <StatCard
          label="Te laat"
          value={teLaat}
          icon={<AlertTriangle className="w-5 h-5" />}
          isLoading={vLoading}
          accent="destructive"
          href="/medewerker/te-laat"
        />
        <StatCard
          label="Totaal producten"
          value={totalProducten}
          icon={<Package className="w-5 h-5" />}
          isLoading={pLoading}
          accent="primary"
          href="/medewerker/inventaris"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Quick actions */}
        <div className="lg:col-span-1 space-y-3">
          <h2 className="font-display font-semibold text-sm text-foreground">
            Snelkoppelingen
          </h2>
          <div className="space-y-2">
            <QuickActionCard
              href="/medewerker/reserveringen"
              label="Reserveringen"
              icon={<CalendarCheck className="w-4 h-4" />}
              badge={inAfwachting}
              urgent={inAfwachting > 0}
            />
            <QuickActionCard
              href="/medewerker/verhuur"
              label="Actieve verhuur"
              icon={<Clock className="w-4 h-4" />}
              badge={inVerhuur}
            />
            <QuickActionCard
              href="/medewerker/te-laat"
              label="Te laat ingeleverd"
              icon={<AlertTriangle className="w-4 h-4" />}
              badge={teLaat}
              urgent={teLaat > 0}
            />
            <QuickActionCard
              href="/medewerker/inventaris"
              label="Inventaris beheren"
              icon={<Package className="w-4 h-4" />}
            />
            <QuickActionCard
              href="/medewerker/qr-codes"
              label="QR-codes afdrukken"
              icon={<QrCode className="w-4 h-4" />}
            />
            <QuickActionCard
              href="/medewerker/klanten"
              label="Klantenoverzicht"
              icon={<Users className="w-4 h-4" />}
            />
          </div>
        </div>

        {/* Right column: alerts + activity */}
        <div className="lg:col-span-2 space-y-4">
          {/* Overdue alert */}
          {teLaat > 0 && (
            <Card className="border-destructive/30 bg-destructive/5">
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="text-sm font-semibold text-destructive flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  {teLaat} verhur{teLaat > 1 ? "ingen" : "ing"} over de
                  retourdatum
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-2">
                {vervallen?.slice(0, 3).map((v) => (
                  <div
                    key={v.id.toString()}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="font-medium text-foreground">
                      {v.klantNaam}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      Retour: {formatDate(v.eindDatum)}
                    </span>
                  </div>
                ))}
                {teLaat > 3 && (
                  <Link
                    to="/medewerker/te-laat"
                    className="text-xs text-destructive underline block"
                  >
                    +{teLaat - 3} meer bekijken
                  </Link>
                )}
                <div className="pt-1">
                  <Link to="/medewerker/te-laat">
                    <Button
                      size="sm"
                      variant="destructive"
                      className="gap-1.5 text-xs h-7"
                    >
                      Alle te late verhuringen
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Pending reservations alert */}
          {inAfwachting > 0 && (
            <Card className="border-orange-400/30 bg-orange-500/5">
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="text-sm font-semibold text-orange-600 dark:text-orange-400 flex items-center gap-2">
                  <CalendarCheck className="w-4 h-4" />
                  {inAfwachting} reservering
                  {inAfwachting > 1 ? "en" : ""} wacht
                  {inAfwachting > 1 ? "en" : ""} op bevestiging
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <Link to="/medewerker/reserveringen">
                  <Button
                    size="sm"
                    className="gap-1.5 text-xs h-7 bg-orange-500 hover:bg-orange-600 text-white border-0"
                  >
                    Reserveringen bekijken
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Recent activity */}
          <Card className="card-rental">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-sm font-semibold text-foreground">
                Recente verhuuractiviteit
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              {aLoading || vLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                  ))}
                </div>
              ) : recenteActiviteit.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Geen recente activiteit
                </p>
              ) : (
                <div className="space-y-0">
                  {recenteActiviteit.map((v, idx) => (
                    <div key={v.id.toString()}>
                      <div className="flex items-center justify-between py-2.5">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {v.klantNaam}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(v.startDatum)} →{" "}
                            {formatDate(v.eindDatum)}
                          </p>
                        </div>
                        <Badge
                          variant={
                            v.type === "telaat" ? "destructive" : "secondary"
                          }
                          className="text-xs shrink-0 ml-2"
                        >
                          {v.type === "telaat" ? "Te laat" : "Actief"}
                        </Badge>
                      </div>
                      {idx < recenteActiviteit.length - 1 && (
                        <Separator className="bg-border/50" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Inventory summary */}
          <Card className="card-rental bg-muted/30">
            <CardContent className="p-4 flex items-center justify-between gap-4 flex-wrap">
              <div className="text-center">
                <p className="text-2xl font-display font-bold text-foreground">
                  {pLoading ? (
                    <Skeleton className="h-7 w-10 mx-auto" />
                  ) : (
                    beschikbaar
                  )}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Beschikbaar
                </p>
              </div>
              <Separator orientation="vertical" className="h-10" />
              <div className="text-center">
                <p className="text-2xl font-display font-bold text-foreground">
                  {pLoading ? (
                    <Skeleton className="h-7 w-10 mx-auto" />
                  ) : (
                    totalProducten - beschikbaar
                  )}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">Verhuurd</p>
              </div>
              <Separator orientation="vertical" className="h-10" />
              <div className="text-center">
                <p className="text-2xl font-display font-bold text-foreground">
                  {pLoading ? (
                    <Skeleton className="h-7 w-10 mx-auto" />
                  ) : (
                    totalProducten
                  )}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">Totaal</p>
              </div>
              <Link to="/medewerker/inventaris" className="ml-auto shrink-0">
                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                  Inventaris
                  <ArrowRight className="w-3 h-3" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
