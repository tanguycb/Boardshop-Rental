import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOut, Settings, User } from "lucide-react";
import { toast } from "sonner";
import { UserRole } from "../backend";
import { Layout } from "../components/Layout";
import { useAuth, useMijnProfiel } from "../hooks/useAuth";

export default function Instellingen() {
  const { data: profiel, isLoading } = useMijnProfiel();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Je bent uitgelogd");
  };

  return (
    <Layout role={profiel?.role} showSidebar={!!profiel}>
      <div className="p-6 space-y-5 max-w-2xl mx-auto">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <Settings className="w-6 h-6 text-primary" />
            Instellingen
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Jouw account en profiel
          </p>
        </div>

        <Card className="card-rental">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              Profielinformatie
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-60" />
              </div>
            ) : profiel ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-display font-bold text-primary text-lg">
                      {profiel.naam
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {profiel.naam}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {profiel.contactInfo || "Geen contactinfo"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Rol:</span>
                  <Badge
                    variant="outline"
                    className={
                      profiel.role === UserRole.Medewerker
                        ? "border-primary/30 text-primary"
                        : "border-accent/30 text-accent"
                    }
                  >
                    {profiel.role === UserRole.Medewerker
                      ? "Medewerker"
                      : "Klant"}
                  </Badge>
                </div>
              </>
            ) : (
              <p className="text-muted-foreground text-sm">
                Profiel niet beschikbaar
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="card-rental border-destructive/20">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-sm text-foreground">Uitloggen</p>
              <p className="text-xs text-muted-foreground">
                Beëindig je huidige sessie
              </p>
            </div>
            <Button
              variant="outline"
              className="gap-2 text-destructive border-destructive/40 hover:bg-destructive/10"
              onClick={handleLogout}
              data-ocid="instellingen-logout"
            >
              <LogOut className="w-4 h-4" />
              Uitloggen
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
