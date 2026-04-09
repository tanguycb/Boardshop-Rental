import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActor } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Loader2,
  RefreshCw,
  Shield,
  Snowflake,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";
import { useAuth, useMijnRol, useRegistreerMedewerker } from "../hooks/useAuth";

type LoginStep = "auth" | "register";

const SNOWFLAKES = [
  { top: "10%", left: "8%", size: 24, opacity: 0.15, delay: 0 },
  { top: "25%", left: "80%", size: 16, opacity: 0.1, delay: 0.5 },
  { top: "55%", left: "15%", size: 32, opacity: 0.08, delay: 1 },
  { top: "70%", left: "70%", size: 20, opacity: 0.12, delay: 1.5 },
  { top: "85%", left: "40%", size: 14, opacity: 0.1, delay: 0.8 },
  { top: "40%", left: "55%", size: 28, opacity: 0.07, delay: 0.3 },
];

const BACKEND_TIMEOUT_MS = 8_000;

export default function InloggenPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isInitializing, isLoggingIn, login, logout } =
    useAuth();
  const {
    data: rol,
    isLoading: rolLoading,
    isFetching: rolFetching,
    refetch: refetchRol,
  } = useMijnRol();
  const registreer = useRegistreerMedewerker();
  const { actor } = useActor(createActor);

  const [isBackendReady, setIsBackendReady] = useState(false);
  const [backendTimedOut, setBackendTimedOut] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [step, setStep] = useState<LoginStep>("auth");
  const [naam, setNaam] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);

  useEffect(() => {
    if (actor) {
      setIsBackendReady(true);
      setBackendTimedOut(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [actor]);

  useEffect(() => {
    if (step === "register" && !isBackendReady && !backendTimedOut) {
      timeoutRef.current = setTimeout(() => {
        setBackendTimedOut((prev) => prev || !actor);
      }, BACKEND_TIMEOUT_MS);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [step, isBackendReady, backendTimedOut, actor]);

  const prevAuthRef = useRef(false);
  useEffect(() => {
    if (isAuthenticated && !prevAuthRef.current) {
      setBackendTimedOut(false);
      refetchRol();
    }
    prevAuthRef.current = isAuthenticated;
  }, [isAuthenticated, refetchRol]);

  // After login: navigate to medewerker dashboard or show staff registration
  useEffect(() => {
    if (!isAuthenticated) return;
    if (rolLoading || rolFetching) return;

    if (rol) {
      // Any valid role → go to medewerker dashboard
      navigate({ to: "/medewerker/dashboard" });
    } else {
      // Authenticated but not yet registered as staff → onboarding
      setStep("register");
      setRegisterError(null);
    }
  }, [isAuthenticated, rol, rolLoading, rolFetching, navigate]);

  const handleLogin = () => {
    setLoginError(null);
    login();
  };

  const handleRegistreer = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError(null);

    if (!naam.trim()) {
      toast.error("Vul je naam in");
      return;
    }

    try {
      await registreer.mutateAsync({
        naam: naam.trim(),
        contactInfo: contactInfo.trim(),
      });
      toast.success("Welkom bij West-Site Rental!");
      navigate({ to: "/medewerker/dashboard" });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Registratie mislukt. Probeer opnieuw.";
      setRegisterError(message);
      toast.error(message);
    }
  };

  const handleAnnuleer = () => {
    logout();
    setStep("auth");
    setNaam("");
    setContactInfo("");
    setRegisterError(null);
    setIsBackendReady(false);
    setBackendTimedOut(false);
  };

  const handleRetryBackend = () => {
    setBackendTimedOut(false);
    setRegisterError(null);
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Laden…</p>
        </div>
      </div>
    );
  }

  const showRoleLoader =
    isAuthenticated && (rolLoading || rolFetching) && step === "auth";
  const registerFormReady = isBackendReady || !!actor;

  return (
    <div className="min-h-screen flex">
      {/* LEFT — Hero panel */}
      <div
        className="hidden lg:flex lg:w-[58%] relative flex-col items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0F766E 0%, #0c5c56 40%, #0F172A 100%)",
        }}
      >
        <img
          src="/assets/generated/login-hero-panel.dim_900x1080.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
        />

        {SNOWFLAKES.map((sf, i) => (
          <motion.div
            key={`sf-${sf.top}-${sf.left}`}
            className="absolute pointer-events-none"
            style={{ top: sf.top, left: sf.left, opacity: sf.opacity }}
            animate={{ rotate: 360, y: [0, -8, 0] }}
            transition={{
              rotate: {
                duration: 20 + i * 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              },
              y: {
                duration: 3 + i * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: sf.delay,
              },
            }}
          >
            <Snowflake
              aria-hidden="true"
              style={{ width: sf.size, height: sf.size, color: "white" }}
            />
          </motion.div>
        ))}

        <motion.div
          className="relative z-10 flex flex-col items-center text-center px-12 max-w-md"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="mb-8">
            <svg
              aria-hidden="true"
              width="80"
              height="60"
              viewBox="0 0 80 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M40 4L72 56H8L40 4Z" fill="white" fillOpacity="0.9" />
              <path d="M28 24L40 4L52 24" fill="white" fillOpacity="0.5" />
              <path d="M20 40L32 20L44 40" fill="white" fillOpacity="0.3" />
            </svg>
          </div>

          <h1 className="font-display text-5xl font-bold text-white leading-tight mb-3 tracking-tight">
            WEST-SITE
            <br />
            RENTAL
          </h1>
          <p className="text-white/75 text-lg font-light leading-relaxed">
            Beheer & administratie
          </p>

          <div className="mt-10 flex flex-col gap-3 w-full max-w-xs">
            {[
              "Inventaris beheren",
              "Reserveringen opvolgen",
              "Verhuur starten & afsluiten",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2.5 text-white/70 text-sm"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>

          <p className="mt-12 text-white/40 text-xs">Seizoen 2025–2026</p>
        </motion.div>
      </div>

      {/* RIGHT — Form panel */}
      <div className="flex-1 lg:w-[42%] flex flex-col items-center justify-center px-6 py-12 bg-background min-h-screen">
        <motion.div
          className="w-full max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="flex items-center gap-2.5">
              <svg
                aria-hidden="true"
                width="32"
                height="24"
                viewBox="0 0 80 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M40 4L72 56H8L40 4Z"
                  fill="currentColor"
                  className="text-primary"
                  fillOpacity="0.9"
                />
              </svg>
              <span className="font-display text-xl font-bold text-primary">
                West-Site Rental
              </span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === "auth" ? (
              <motion.div
                key="auth"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="hidden lg:flex items-center gap-2.5 mb-8">
                  <svg
                    aria-hidden="true"
                    width="28"
                    height="22"
                    viewBox="0 0 80 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M40 4L72 56H8L40 4Z"
                      fill="currentColor"
                      className="text-primary"
                      fillOpacity="1"
                    />
                  </svg>
                  <span className="font-display text-lg font-bold text-primary">
                    West-Site Rental
                  </span>
                </div>

                <h2 className="text-3xl font-display font-bold text-foreground mb-1.5">
                  Medewerkers inloggen
                </h2>
                <p className="text-muted-foreground text-sm mb-8">
                  Inloggen via Internet Identity — enkel voor medewerkers en
                  admins
                </p>

                <div className="rounded-xl border border-border bg-card p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Shield
                        className="text-primary"
                        style={{ width: 18, height: 18 }}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-0.5">
                        Internet Identity
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Veilig inloggen zonder wachtwoord. Gebruik je passkey of
                        beveiligingssleutel.
                      </p>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {loginError && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm mb-4"
                      data-ocid="login-error"
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{loginError}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button
                  className="w-full gap-2 font-semibold"
                  style={{ height: 52, borderRadius: 10 }}
                  onClick={handleLogin}
                  disabled={isLoggingIn || showRoleLoader}
                  data-ocid="login-btn"
                >
                  {isLoggingIn || showRoleLoader ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Shield className="w-4 h-4" />
                  )}
                  {isLoggingIn
                    ? "Bezig met inloggen…"
                    : showRoleLoader
                      ? "Account ophalen…"
                      : "Inloggen met Internet Identity"}
                  {!isLoggingIn && !showRoleLoader && (
                    <ArrowRight className="w-4 h-4 ml-auto" />
                  )}
                </Button>

                <p className="text-center text-xs text-muted-foreground mt-6">
                  Ben je een klant?{" "}
                  <a
                    href="/home"
                    className="text-primary font-medium hover:underline"
                  >
                    Ga naar de verhuurtpagina
                  </a>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="hidden lg:flex items-center gap-2.5 mb-8">
                  <svg
                    aria-hidden="true"
                    width="28"
                    height="22"
                    viewBox="0 0 80 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M40 4L72 56H8L40 4Z"
                      fill="currentColor"
                      className="text-primary"
                      fillOpacity="1"
                    />
                  </svg>
                  <span className="font-display text-lg font-bold text-primary">
                    West-Site Rental
                  </span>
                </div>

                <h2 className="text-3xl font-display font-bold text-foreground mb-1.5">
                  Medewerker aanmaken
                </h2>
                <p className="text-muted-foreground text-sm mb-8">
                  Vul je gegevens in om door te gaan als medewerker
                </p>

                <AnimatePresence mode="wait">
                  {backendTimedOut ? (
                    <motion.div
                      key="timeout-error"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm mb-5"
                      data-ocid="backend-timeout-error"
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium mb-1">Verbinding mislukt</p>
                        <p className="text-xs text-destructive/80 mb-3">
                          De verbinding met de backend kon niet worden gelegd.
                          Controleer je verbinding en probeer opnieuw.
                        </p>
                        <button
                          type="button"
                          onClick={handleRetryBackend}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-destructive hover:text-destructive/80 transition-colors"
                          data-ocid="backend-retry-btn"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          Probeer opnieuw
                        </button>
                      </div>
                    </motion.div>
                  ) : !registerFormReady ? (
                    <motion.div
                      key="backend-loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2.5 p-3 rounded-lg bg-muted border border-border text-muted-foreground text-sm mb-5"
                      data-ocid="actor-loading"
                    >
                      <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
                      <span>Verbinding met backend wordt gelegd…</span>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                <form onSubmit={handleRegistreer} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="naam" className="text-sm font-medium">
                      Volledige naam <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="naam"
                      value={naam}
                      onChange={(e) => setNaam(e.target.value)}
                      placeholder="Jan de Vries"
                      required
                      disabled={
                        (!registerFormReady && !backendTimedOut) ||
                        registreer.isPending
                      }
                      style={{ height: 50, borderRadius: 10 }}
                      data-ocid="register-naam"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact" className="text-sm font-medium">
                      E-mail of telefoonnummer
                    </Label>
                    <Input
                      id="contact"
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      placeholder="jan@west-site.com"
                      disabled={
                        (!registerFormReady && !backendTimedOut) ||
                        registreer.isPending
                      }
                      style={{ height: 50, borderRadius: 10 }}
                      data-ocid="register-contact"
                    />
                  </div>

                  {/* Staff badge */}
                  <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary text-xs font-bold">M</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Medewerker account
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Beheer & administratie
                      </p>
                    </div>
                  </div>

                  <AnimatePresence>
                    {registerError && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm"
                        data-ocid="register-error"
                      >
                        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>{registerError}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button
                    type="submit"
                    className="w-full gap-2 font-semibold"
                    style={{ height: 52, borderRadius: 10 }}
                    disabled={
                      (!registerFormReady && !backendTimedOut) ||
                      backendTimedOut ||
                      registreer.isPending
                    }
                    data-ocid="register-submit"
                  >
                    {registreer.isPending ||
                    (!registerFormReady && !backendTimedOut) ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                    {registreer.isPending
                      ? "Bezig met registreren…"
                      : !registerFormReady && !backendTimedOut
                        ? "Verbinding maken…"
                        : "Account aanmaken"}
                  </Button>

                  <button
                    type="button"
                    onClick={handleAnnuleer}
                    disabled={registreer.isPending}
                    className="w-full flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors py-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    data-ocid="register-cancel"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Terug naar inloggen
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <p className="mt-auto pt-8 text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} West-Site Rental. Alle rechten
          voorbehouden.
        </p>
      </div>
    </div>
  );
}
