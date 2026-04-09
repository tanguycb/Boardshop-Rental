import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Package,
  Plus,
  Search,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { VerhuurStatus } from "../../backend";
import {
  useActieveVerhuringen,
  useMarkeerIngeleverd,
} from "../../hooks/useVerhuringen";
import { formatDate } from "../../lib/utils";

type StatusFilter = "alle" | "actief" | "telaat";

const statusFilterLabel: Record<StatusFilter, string> = {
  alle: "Alle statussen",
  actief: "Actief",
  telaat: "Te laat",
};

export default function ActieveVerhuur() {
  const { data: verhuringen, isLoading } = useActieveVerhuringen();
  const markeerIngeleverd = useMarkeerIngeleverd();
  const navigate = useNavigate();

  const [zoekterm, setZoekterm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("alle");

  const teLaatCount =
    verhuringen?.filter((v) => v.status === VerhuurStatus.TeLaat).length ?? 0;

  const gefilterd =
    verhuringen?.filter((v) => {
      const matchNaam = v.klantNaam
        .toLowerCase()
        .includes(zoekterm.toLowerCase());
      const matchStatus =
        statusFilter === "alle" ||
        (statusFilter === "actief" && v.status === VerhuurStatus.Actief) ||
        (statusFilter === "telaat" && v.status === VerhuurStatus.TeLaat);
      return matchNaam && matchStatus;
    }) ?? [];

  const handleMarkeer = async (id: bigint, naam: string) => {
    try {
      await markeerIngeleverd.mutateAsync(id);
      toast.success(`Verhuur van ${naam} gemarkeerd als ingeleverd`);
    } catch {
      toast.error("Markeren mislukt");
    }
  };

  return (
    <div className="p-6 space-y-5 max-w-4xl mx-auto">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <Clock className="w-6 h-6 text-primary" />
            Actieve verhuur
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {verhuringen?.length ?? 0} actieve verhur
            {verhuringen?.length !== 1 ? "ingen" : "ing"}
            {teLaatCount > 0 && (
              <span className="text-destructive font-medium">
                {" "}
                · {teLaatCount} te laat
              </span>
            )}
          </p>
        </div>
        <Button
          className="gap-2 shrink-0"
          onClick={() => navigate({ to: "/medewerker/nieuwe-verhuur" })}
          data-ocid="verhuur-nieuw-btn"
        >
          <Plus className="w-4 h-4" />
          Verhuur starten
        </Button>
      </div>

      {/* Alert for overdue */}
      {teLaatCount > 0 && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>
            <strong>{teLaatCount}</strong> verhur
            {teLaatCount !== 1 ? "ingen zijn" : "ing is"} over de retourdatum —
            neem contact op met de klant
          </span>
        </div>
      )}

      {/* Search + filters */}
      <div className="flex gap-2 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Zoeken op klantnaam…"
            value={zoekterm}
            onChange={(e) => setZoekterm(e.target.value)}
            className="pl-8"
            data-ocid="verhuur-zoek"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as StatusFilter)}
        >
          <SelectTrigger className="w-44" data-ocid="verhuur-filter-status">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(["alle", "actief", "telaat"] as StatusFilter[]).map((s) => (
              <SelectItem key={s} value={s}>
                {statusFilterLabel[s]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 w-full rounded-lg" />
          ))}
        </div>
      ) : gefilterd.length === 0 ? (
        <div className="text-center py-16" data-ocid="verhuur-empty">
          <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
          <p className="text-muted-foreground">Geen actieve verhuringen</p>
        </div>
      ) : (
        <div className="space-y-2">
          {gefilterd.map((v) => {
            const isTeLaat = v.status === VerhuurStatus.TeLaat;
            return (
              <Card
                key={v.id.toString()}
                className={`card-rental transition-smooth ${isTeLaat ? "border-destructive/30 bg-destructive/5" : ""}`}
                data-ocid={`verhuur-row-${v.id}`}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-sm text-foreground">
                        {v.klantNaam}
                      </p>
                      <Badge
                        variant={isTeLaat ? "destructive" : "secondary"}
                        className="text-xs"
                        data-ocid={`verhuur-status-${v.id}`}
                      >
                        {isTeLaat ? (
                          <span className="flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            Te laat
                          </span>
                        ) : (
                          "Actief"
                        )}
                      </Badge>
                      {v.isSet && (
                        <Badge variant="outline" className="text-xs">
                          <Package className="w-3 h-3 mr-1" />
                          Set
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {v.klantContact && (
                        <span className="mr-2">{v.klantContact} ·</span>
                      )}
                      {formatDate(v.startDatum)} – {formatDate(v.eindDatum)}
                      {v.productIds.length > 0 && (
                        <span className="ml-2">
                          · {v.productIds.length} product
                          {v.productIds.length !== 1 ? "en" : ""}
                        </span>
                      )}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1.5 shrink-0 text-[oklch(var(--success))] border-[oklch(var(--success)/0.4)] hover:bg-[oklch(var(--success)/0.1)]"
                    onClick={() => handleMarkeer(v.id, v.klantNaam)}
                    disabled={markeerIngeleverd.isPending}
                    data-ocid={`verhuur-inleveren-${v.id}`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Ingeleverd
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
