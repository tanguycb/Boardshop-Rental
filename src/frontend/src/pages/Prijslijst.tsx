import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Euro } from "lucide-react";
import { motion } from "motion/react";
import { PublicLayout } from "../components/Layout";

// ─── Pricing data ─────────────────────────────────────────────────────────────
const SECTIES = [
  {
    title: "Snowboard pakketten",
    kleur: "primary",
    rows: [
      {
        product: "Kids set",
        dag: "€15",
        weekend: "€40",
        shortski: "€70",
        week: "€95",
        twoWeeks: "€150",
      },
      {
        product: "Epic snowboard + bindingen",
        dag: "€15",
        weekend: "€45",
        shortski: "€75",
        week: "€110",
        twoWeeks: "€165",
      },
      {
        product: "Epic set",
        dag: "€20",
        weekend: "€60",
        shortski: "€85",
        week: "€130",
        twoWeeks: "€185",
      },
      {
        product: "VIP snowboard + bindingen",
        dag: "€25",
        weekend: "€90",
        shortski: "€120",
        week: "€180",
        twoWeeks: "€250",
      },
      {
        product: "VIP set",
        dag: "€30",
        weekend: "€100",
        shortski: "€150",
        week: "€180",
        twoWeeks: "€250",
      },
      {
        product: "Send Before You Spend set",
        dag: "–",
        weekend: "–",
        shortski: "–",
        week: "30% aankoopprijs",
        twoWeeks: "30% aankoopprijs",
      },
    ],
  },
  {
    title: "Schoenen & bindingen",
    kleur: "accent",
    rows: [
      {
        product: "EPIC schoenen",
        dag: "€30",
        weekend: "€40",
        shortski: "€50",
        week: "€60",
        twoWeeks: "€90",
      },
      {
        product: "VIP schoenen & bindingen",
        dag: "€40",
        weekend: "€55",
        shortski: "€70",
        week: "€90",
        twoWeeks: "€150",
      },
      {
        product: "VIP STEP ON schoenen",
        dag: "€40",
        weekend: "€55",
        shortski: "€70",
        week: "€90",
        twoWeeks: "€150",
      },
      {
        product: "EPIC Classic Straps bindingen",
        dag: "–",
        weekend: "–",
        shortski: "–",
        week: "€35",
        twoWeeks: "€65",
      },
      {
        product: "VIP Step ON bindingen",
        dag: "–",
        weekend: "–",
        shortski: "–",
        week: "€90",
        twoWeeks: "€150",
      },
      {
        product: "VIP Supermatic bindingen",
        dag: "–",
        weekend: "–",
        shortski: "–",
        week: "€90",
        twoWeeks: "€150",
      },
    ],
  },
  {
    title: "Splitboard & avontuur",
    kleur: "primary",
    rows: [
      {
        product: "Splitboard 3/4 set",
        dag: "–",
        weekend: "–",
        shortski: "€180",
        week: "€200",
        twoWeeks: "€280",
      },
      {
        product: "Splitboard volledige set",
        dag: "–",
        weekend: "–",
        shortski: "€190",
        week: "€220",
        twoWeeks: "€350",
      },
      {
        product: "Avalanche set",
        dag: "–",
        weekend: "–",
        shortski: "€40",
        week: "€75",
        twoWeeks: "€100",
      },
      {
        product: "Rover set",
        dag: "–",
        weekend: "–",
        shortski: "€85",
        week: "€130",
        twoWeeks: "€185",
      },
      {
        product: "Kids harnas",
        dag: "€10",
        weekend: "€15",
        shortski: "€20",
        week: "€25",
        twoWeeks: "€40",
      },
    ],
  },
  {
    title: "Skate & surf",
    kleur: "accent",
    rows: [
      {
        product: "Surfboard",
        dag: "€30",
        weekend: "€60",
        shortski: "€100",
        week: "€190",
        twoWeeks: "–",
      },
      {
        product: "SUP",
        dag: "€25",
        weekend: "€35",
        shortski: "€65",
        week: "€120",
        twoWeeks: "–",
      },
      {
        product: "Skimboard",
        dag: "€15",
        weekend: "€20",
        shortski: "€35",
        week: "€60",
        twoWeeks: "–",
      },
      {
        product: "Skateboard",
        dag: "€15",
        weekend: "€25",
        shortski: "–",
        week: "€45",
        twoWeeks: "–",
      },
      {
        product: "Surfskate",
        dag: "€20",
        weekend: "€35",
        shortski: "–",
        week: "€60",
        twoWeeks: "–",
      },
    ],
  },
];

const HEADERS = ["Dag", "Weekend", "Shortski", "Week", "2 weken"];

export default function PrijslijstPage() {
  return (
    <PublicLayout>
      {/* Hero band */}
      <section
        className="relative px-4 py-14 text-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0F766E 0%, #0c5c56 60%, #0F172A 100%)",
        }}
      >
        <motion.div
          className="relative z-10 max-w-2xl mx-auto space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge
            className="bg-white/10 text-white border-white/20 mb-2"
            variant="outline"
          >
            Volledige prijslijst
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
            Huurprijzen <span style={{ color: "#F59E0B" }}>West-Site</span>
          </h1>
          <p className="text-white/70 text-lg max-w-lg mx-auto">
            Transparante tarieven per periode — geen verborgen kosten.
          </p>
          <Button
            asChild
            size="lg"
            className="gap-2 font-semibold mt-2"
            style={{ background: "#F59E0B", color: "#0F172A" }}
            data-ocid="prijslijst-reserveer-btn"
          >
            <Link to="/reserveren">
              Nu reserveren
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </section>

      {/* Pricing tables */}
      <section className="bg-background py-14 px-4">
        <div className="max-w-5xl mx-auto space-y-10">
          {SECTIES.map((sectie, si) => (
            <motion.div
              key={sectie.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: si * 0.08 }}
            >
              <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Euro className="w-5 h-5 text-primary" />
                {sectie.title}
              </h2>

              <div className="rounded-2xl border border-border overflow-hidden shadow-subtle">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-primary/5 border-b border-border">
                        <th className="text-left px-5 py-3 font-semibold text-foreground">
                          Formule
                        </th>
                        {HEADERS.map((h) => (
                          <th
                            key={h}
                            className="text-right px-5 py-3 font-semibold text-foreground whitespace-nowrap"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sectie.rows.map((row, ri) => {
                        const cells = [
                          row.dag,
                          row.weekend,
                          row.shortski,
                          row.week,
                          row.twoWeeks,
                        ];
                        return (
                          <tr
                            key={row.product}
                            className={
                              ri % 2 === 0 ? "bg-background" : "bg-muted/20"
                            }
                          >
                            <td className="px-5 py-3 font-medium text-foreground whitespace-nowrap">
                              {row.product}
                            </td>
                            {cells.map((v, ci) => (
                              <td
                                key={HEADERS[ci]}
                                className={`px-5 py-3 text-right tabular-nums whitespace-nowrap ${
                                  v === "–"
                                    ? "text-muted-foreground"
                                    : "text-foreground font-semibold"
                                }`}
                              >
                                {v}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Footer note */}
          <div className="rounded-xl bg-muted/30 border border-border p-5 text-sm text-muted-foreground space-y-1">
            <p>* Volledige huurprijs vereist bij bevestiging.</p>
            <p>* Reservatie minimum 1 week voor de ophaaldag.</p>
            <p>
              Vragen?{" "}
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
      </section>

      {/* CTA band */}
      <section
        className="px-4 py-14 text-center"
        style={{
          background: "linear-gradient(135deg, #0F172A 0%, #0c5c56 100%)",
        }}
      >
        <motion.div
          className="max-w-xl mx-auto space-y-5"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl font-bold text-white">
            Klaar om te reserveren?
          </h2>
          <p className="text-white/60 text-base">
            Vul het formulier in — we zorgen dat alles klaarstaat op jouw
            ophaaldag.
          </p>
          <Button
            asChild
            size="lg"
            className="gap-2 font-semibold"
            style={{ background: "#F59E0B", color: "#0F172A" }}
            data-ocid="prijslijst-cta-reserveer-btn"
          >
            <Link to="/reserveren">
              Reserveer nu
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </section>
    </PublicLayout>
  );
}
