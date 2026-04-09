import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Home } from "lucide-react";
import { useMemo } from "react";
import { PublicLayout } from "../components/Layout";

export default function BevestigingPage() {
  // Read reservation data stored by the reservation form
  const reserveringId = useMemo(() => {
    if (typeof sessionStorage === "undefined") return null;
    const id = sessionStorage.getItem("reservering_id");
    return id ? id : null;
  }, []);

  const naam =
    typeof sessionStorage !== "undefined"
      ? (sessionStorage.getItem("reservering_naam") ?? undefined)
      : undefined;
  const email =
    typeof sessionStorage !== "undefined"
      ? (sessionStorage.getItem("reservering_email") ?? undefined)
      : undefined;
  const materiaal =
    typeof sessionStorage !== "undefined"
      ? (sessionStorage.getItem("reservering_materiaal") ?? undefined)
      : undefined;
  const duur =
    typeof sessionStorage !== "undefined"
      ? (sessionStorage.getItem("reservering_duur") ?? undefined)
      : undefined;
  const ophaaldag =
    typeof sessionStorage !== "undefined"
      ? (sessionStorage.getItem("reservering_ophaaldag") ?? undefined)
      : undefined;

  // Format display reference: WSR-<id> if from backend, else fallback
  const referentie = reserveringId
    ? `WSR-${reserveringId}`
    : `WSR-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${String(Math.floor(1000 + Math.random() * 9000))}`;

  return (
    <PublicLayout>
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div
          className="max-w-md w-full text-center space-y-6"
          data-ocid="bevestiging-container"
        >
          {/* Success icon */}
          <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="font-display text-3xl font-bold text-foreground">
              Reservering ontvangen!
            </h1>
            {naam && (
              <p className="text-muted-foreground">
                Bedankt,{" "}
                <span className="font-medium text-foreground">{naam}</span>!
              </p>
            )}
          </div>

          {/* Message */}
          <p className="text-muted-foreground leading-relaxed">
            Je reservering is ontvangen. We nemen zo snel mogelijk contact op
            {email ? (
              <>
                {" "}
                via <span className="font-medium text-foreground">{email}</span>
              </>
            ) : (
              " via e-mail of GSM"
            )}{" "}
            om je reservering te bevestigen.
          </p>

          {/* Reservation summary */}
          {(materiaal || duur || ophaaldag) && (
            <div className="rounded-xl border border-border bg-muted/20 p-4 text-left space-y-2 text-sm">
              <p className="font-semibold text-foreground mb-1">
                Jouw aanvraag
              </p>
              {materiaal && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Materiaal</span>
                  <span className="text-foreground font-medium">
                    {materiaal}
                  </span>
                </div>
              )}
              {duur && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Periode</span>
                  <span className="text-foreground font-medium">{duur}</span>
                </div>
              )}
              {ophaaldag && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ophaaldag</span>
                  <span className="text-foreground font-medium">
                    {ophaaldag}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Reference */}
          <div
            className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-muted border border-border mx-auto"
            data-ocid="bevestiging-referentie"
          >
            <div className="text-left">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                Referentienummer
              </p>
              <p className="font-mono font-bold text-foreground text-lg">
                {referentie}
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Noteer dit referentienummer voor je eigen administratie.
          </p>

          {/* Steps */}
          <div className="rounded-xl border border-border bg-card p-5 text-left space-y-3">
            <p className="text-sm font-semibold text-foreground mb-3">
              Wat nu?
            </p>
            {[
              "We controleren je aanvraag en de beschikbaarheid.",
              "Je ontvangt een bevestiging via e-mail of telefoon.",
              "Op je ophaaldag ligt alles klaar bij West-Site Boardshop.",
            ].map((step, i) => (
              <div
                key={step}
                className="flex items-start gap-3 text-sm text-muted-foreground"
              >
                <div className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <span>{step}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              asChild
              variant="outline"
              className="gap-2"
              data-ocid="bevestiging-home-btn"
            >
              <Link to="/home">
                <Home className="w-4 h-4" />
                Terug naar home
              </Link>
            </Button>
            <Button asChild className="gap-2" data-ocid="bevestiging-nieuw-btn">
              <Link to="/reserveren">Nieuwe reservering</Link>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground pt-2">
            Vragen? Bezoek{" "}
            <a
              href="https://www.west-site.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              west-site.com
            </a>
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
