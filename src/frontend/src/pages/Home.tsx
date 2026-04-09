import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Package2,
  ShoppingBag,
  Snowflake,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { PublicLayout } from "../components/Layout";

const FEATURES = [
  {
    icon: Snowflake,
    title: "Snowboards & sets",
    desc: "Kies uit Epic, VIP of complete sets voor elk niveau — van beginner tot expert.",
  },
  {
    icon: Package2,
    title: "Boots & bindingen",
    desc: "Passende schoenen en bindingen uit ons kwalitatief assortiment.",
  },
  {
    icon: ShoppingBag,
    title: "Skate & surf",
    desc: "Skateboard, surfskate, surfboard, SUP en skimboard voor elk seizoen.",
  },
  {
    icon: Calendar,
    title: "Flexibele periodes",
    desc: "Dag, weekend, shortski, week of twee weken — kies wat past.",
  },
];

const PRICE_HIGHLIGHTS = [
  { label: "Kids set", from: "€15 / dag", badge: "Populair" },
  { label: "Epic set", from: "€20 / dag", badge: null },
  { label: "VIP set", from: "€30 / dag", badge: "Premium" },
  { label: "Splitboard set", from: "€180 / shortski", badge: null },
];

const STEPS = [
  {
    nr: "01",
    title: "Kies je materiaal",
    desc: "Surf door ons aanbod en selecteer je snowboard, boots, bindingen of complete set.",
  },
  {
    nr: "02",
    title: "Vul het formulier in",
    desc: "Geef je maten, niveau en gewenste ophaaldag op — alles in 2 minuten.",
  },
  {
    nr: "03",
    title: "Ontvang bevestiging",
    desc: "We nemen contact op en zorgen dat alles klaarstaat op jouw ophaaldag.",
  },
];

export default function HomePage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center min-h-[80vh] px-4 text-center overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #0F766E 0%, #0c5c56 45%, #0F172A 100%)",
        }}
      >
        <img
          src="/assets/generated/login-hero-panel.dim_900x1080.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay pointer-events-none"
        />

        <motion.div
          className="relative z-10 max-w-3xl mx-auto space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg
              aria-hidden="true"
              width="44"
              height="34"
              viewBox="0 0 80 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M40 4L72 56H8L40 4Z" fill="white" fillOpacity="0.9" />
              <path d="M28 24L40 4L52 24" fill="white" fillOpacity="0.5" />
            </svg>
            <span className="text-white/80 font-display font-semibold text-lg">
              West-Site Rental
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight">
            Jouw perfecte setup
            <br />
            <span style={{ color: "#F59E0B" }}>op de piste</span>
          </h1>

          <p className="text-white/70 text-xl max-w-xl mx-auto leading-relaxed">
            Huur snowboards, boots, bindingen en meer. Snelle reservering,
            professioneel advies, klaar bij ophalen.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button
              asChild
              size="lg"
              className="gap-2 font-semibold text-base"
              style={{ background: "#F59E0B", color: "#0F172A" }}
              data-ocid="hero-reserveer-btn"
            >
              <Link to="/reserveren">
                Reserveer nu
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 font-semibold text-base border-white/30 text-white hover:bg-white/10"
              data-ocid="hero-prijslijst-btn"
            >
              <Link to="/prijslijst">Bekijk prijzen</Link>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 pt-4">
            {["Gratis advies", "Maten op maat", "Snel afhalen"].map((item) => (
              <div
                key={item}
                className="flex items-center gap-1.5 text-white/60 text-sm"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-white/40" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="bg-background py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">
              Alles voor je avontuur
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Van snowboardsets voor beginners tot splitboards voor de
              gevorderde rider — West-Site heeft het allemaal.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full hover:border-primary/40 transition-smooth">
                  <CardContent className="p-5 space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <f.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {f.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Price highlights */}
      <section className="bg-muted/30 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">
              Onze populairste formules
            </h2>
            <p className="text-muted-foreground">
              Transparante prijzen, geen verrassingen. Vanaf:
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {PRICE_HIGHLIGHTS.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="text-center hover:border-primary/40 transition-smooth">
                  <CardContent className="p-5 space-y-2">
                    {p.badge && (
                      <Badge
                        className="text-xs bg-primary/10 text-primary border-primary/20"
                        variant="outline"
                      >
                        {p.badge}
                      </Badge>
                    )}
                    <p className="font-display font-bold text-foreground text-lg">
                      {p.label}
                    </p>
                    <p className="text-2xl font-display font-bold text-primary">
                      {p.from}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="gap-2 font-semibold"
              data-ocid="pricing-cta-btn"
            >
              <Link to="/reserveren">
                <Star className="w-4 h-4" />
                Alle prijzen & reserveren
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-background py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">
              Zo werkt het
            </h2>
            <p className="text-muted-foreground">
              Reserveer in 3 eenvoudige stappen
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.nr}
                className="text-center space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
                  <span className="font-display font-bold text-primary text-lg">
                    {step.nr}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-foreground text-lg">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="gap-2 font-semibold"
              data-ocid="steps-cta-btn"
            >
              <Link to="/reserveren">
                Begin met reserveren
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
