import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, CheckCircle2, Phone, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useMarkeerIngeleverd,
  useVervallenVerhuringen,
} from "../../hooks/useVerhuringen";
import { dagsBetween, formatDate } from "../../lib/utils";

function DaysLateBadge({ days }: { days: number }) {
  const severity =
    days >= 7
      ? "bg-destructive text-destructive-foreground"
      : days >= 3
        ? "bg-destructive/80 text-destructive-foreground"
        : "bg-destructive/60 text-destructive-foreground";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${severity}`}
    >
      {days} dag{days !== 1 ? "en" : ""} te laat
    </span>
  );
}

export default function TeLaat() {
  const { data: verhuringen, isLoading } = useVervallenVerhuringen();
  const markeerIngeleverd = useMarkeerIngeleverd();
  const [zoekterm, setZoekterm] = useState("");

  const gefilterd =
    verhuringen?.filter((v) =>
      v.klantNaam.toLowerCase().includes(zoekterm.toLowerCase()),
    ) ?? [];

  // Sort by most overdue first
  const gesorteerd = [...gefilterd].sort((a, b) => {
    const now = BigInt(Date.now() * 1_000_000);
    const daysA = dagsBetween(a.eindDatum, now);
    const daysB = dagsBetween(b.eindDatum, now);
    return daysB - daysA;
  });

  const handleMarkeer = async (id: bigint, naam: string) => {
    try {
      await markeerIngeleverd.mutateAsync(id);
      toast.success(`Verhuur van ${naam} gemarkeerd als ingeleverd`);
    } catch {
      toast.error("Markeren mislukt");
    }
  };

  const totalDaysLate = gesorteerd.reduce((sum, v) => {
    return sum + dagsBetween(v.eindDatum, BigInt(Date.now() * 1_000_000));
  }, 0);

  return (
    <div className="p-6 space-y-5 max-w-4xl mx-auto">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-destructive" />
          Te laat ingeleverd
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          {verhuringen?.length ?? 0} verhur
          {verhuringen?.length === 1 ? "ing" : "ingen"} over de retourdatum
        </p>
      </div>

      {/* Alert banner */}
      {(verhuringen?.length ?? 0) > 0 && (
        <Card className="border-destructive/30 bg-destructive/5">
          <CardHeader className="pb-2 pt-3 px-4">
            <CardTitle className="text-sm font-semibold text-destructive flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Actie vereist — neem contact op met klanten
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-3">
            <div className="flex flex-wrap gap-4 text-sm">
              <div>
                <span className="font-bold text-destructive">
                  {verhuringen?.length ?? 0}
                </span>
                <span className="text-muted-foreground ml-1">
                  open verhuring{(verhuringen?.length ?? 0) !== 1 ? "en" : ""}
                </span>
              </div>
              <div>
                <span className="font-bold text-destructive">
                  {totalDaysLate}
                </span>
                <span className="text-muted-foreground ml-1">
                  totaal dagen te laat
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Zoeken op klantnaam…"
          value={zoekterm}
          onChange={(e) => setZoekterm(e.target.value)}
          className="pl-8"
          data-ocid="telaat-zoek"
        />
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 w-full rounded-lg" />
          ))}
        </div>
      ) : gesorteerd.length === 0 ? (
        <div className="text-center py-16" data-ocid="telaat-empty">
          <CheckCircle2 className="w-12 h-12 text-[oklch(var(--success))] mx-auto mb-3 opacity-60" />
          <p className="font-semibold text-foreground">
            Alles op tijd ingeleverd!
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            Geen te late verhuringen gevonden.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {gesorteerd.map((v) => {
            const daysLate = dagsBetween(
              v.eindDatum,
              BigInt(Date.now() * 1_000_000),
            );
            return (
              <Card
                key={v.id.toString()}
                className="border-destructive/30 bg-destructive/5 transition-smooth"
                data-ocid={`telaat-row-${v.id}`}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-sm text-foreground">
                        {v.klantNaam}
                      </p>
                      <DaysLateBadge days={daysLate} />
                      {v.isSet && (
                        <Badge variant="outline" className="text-xs">
                          Set
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <p className="text-xs text-muted-foreground">
                        Retour verwacht: {formatDate(v.eindDatum)}
                      </p>
                      {v.klantContact && (
                        <a
                          href={`tel:${v.klantContact}`}
                          className="flex items-center gap-1 text-xs text-primary hover:underline"
                          aria-label={`Bel ${v.klantNaam}`}
                        >
                          <Phone className="w-3 h-3" />
                          {v.klantContact}
                        </a>
                      )}
                    </div>
                    {v.productIds.length > 0 && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {v.productIds.length} product
                        {v.productIds.length !== 1 ? "en" : ""} uitstaand
                      </p>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1.5 shrink-0 text-[oklch(var(--success))] border-[oklch(var(--success)/0.4)] hover:bg-[oklch(var(--success)/0.1)]"
                    onClick={() => handleMarkeer(v.id, v.klantNaam)}
                    disabled={markeerIngeleverd.isPending}
                    data-ocid={`telaat-inleveren-${v.id}`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Markeer ingeleverd
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
