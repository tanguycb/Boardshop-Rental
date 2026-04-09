import { c as createLucideIcon, l as useNavigate, n as useAuth, o as useMijnRol, p as useRegistreerMedewerker, q as useActor, r as reactExports, j as jsxRuntimeExports, m as LoaderCircle, B as Button, s as ue, t as createActor } from "./index-DJrsHPCD.js";
import { I as Input } from "./input-CilnsQ6Q.js";
import { L as Label } from "./label-MKFleP4N.js";
import { m as motion } from "./proxy-gxodpJKO.js";
import { S as Snowflake } from "./snowflake-BpFEUXa1.js";
import { A as AnimatePresence } from "./index-COo9MCy4.js";
import { C as CircleAlert } from "./circle-alert-Ch1xRJNs.js";
import { A as ArrowRight } from "./arrow-right-IVBi2QYQ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode);
const SNOWFLAKES = [
  { top: "10%", left: "8%", size: 24, opacity: 0.15, delay: 0 },
  { top: "25%", left: "80%", size: 16, opacity: 0.1, delay: 0.5 },
  { top: "55%", left: "15%", size: 32, opacity: 0.08, delay: 1 },
  { top: "70%", left: "70%", size: 20, opacity: 0.12, delay: 1.5 },
  { top: "85%", left: "40%", size: 14, opacity: 0.1, delay: 0.8 },
  { top: "40%", left: "55%", size: 28, opacity: 0.07, delay: 0.3 }
];
const BACKEND_TIMEOUT_MS = 8e3;
function InloggenPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isInitializing, isLoggingIn, login, logout } = useAuth();
  const {
    data: rol,
    isLoading: rolLoading,
    isFetching: rolFetching,
    refetch: refetchRol
  } = useMijnRol();
  const registreer = useRegistreerMedewerker();
  const { actor } = useActor(createActor);
  const [isBackendReady, setIsBackendReady] = reactExports.useState(false);
  const [backendTimedOut, setBackendTimedOut] = reactExports.useState(false);
  const timeoutRef = reactExports.useRef(null);
  const [step, setStep] = reactExports.useState("auth");
  const [naam, setNaam] = reactExports.useState("");
  const [contactInfo, setContactInfo] = reactExports.useState("");
  const [loginError, setLoginError] = reactExports.useState(null);
  const [registerError, setRegisterError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (actor) {
      setIsBackendReady(true);
      setBackendTimedOut(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [actor]);
  reactExports.useEffect(() => {
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
  const prevAuthRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (isAuthenticated && !prevAuthRef.current) {
      setBackendTimedOut(false);
      refetchRol();
    }
    prevAuthRef.current = isAuthenticated;
  }, [isAuthenticated, refetchRol]);
  reactExports.useEffect(() => {
    if (!isAuthenticated) return;
    if (rolLoading || rolFetching) return;
    if (rol) {
      navigate({ to: "/medewerker/dashboard" });
    } else {
      setStep("register");
      setRegisterError(null);
    }
  }, [isAuthenticated, rol, rolLoading, rolFetching, navigate]);
  const handleLogin = () => {
    setLoginError(null);
    login();
  };
  const handleRegistreer = async (e) => {
    e.preventDefault();
    setRegisterError(null);
    if (!naam.trim()) {
      ue.error("Vul je naam in");
      return;
    }
    try {
      await registreer.mutateAsync({
        naam: naam.trim(),
        contactInfo: contactInfo.trim()
      });
      ue.success("Welkom bij West-Site Rental!");
      navigate({ to: "/medewerker/dashboard" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Registratie mislukt. Probeer opnieuw.";
      setRegisterError(message);
      ue.error(message);
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Laden…" })
    ] }) });
  }
  const showRoleLoader = isAuthenticated && (rolLoading || rolFetching) && step === "auth";
  const registerFormReady = isBackendReady || !!actor;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "hidden lg:flex lg:w-[58%] relative flex-col items-center justify-center overflow-hidden",
        style: {
          background: "linear-gradient(135deg, #0F766E 0%, #0c5c56 40%, #0F172A 100%)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/assets/generated/login-hero-panel.dim_900x1080.jpg",
              alt: "",
              "aria-hidden": "true",
              className: "absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
            }
          ),
          SNOWFLAKES.map((sf, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "absolute pointer-events-none",
              style: { top: sf.top, left: sf.left, opacity: sf.opacity },
              animate: { rotate: 360, y: [0, -8, 0] },
              transition: {
                rotate: {
                  duration: 20 + i * 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear"
                },
                y: {
                  duration: 3 + i * 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: sf.delay
                }
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Snowflake,
                {
                  "aria-hidden": "true",
                  style: { width: sf.size, height: sf.size, color: "white" }
                }
              )
            },
            `sf-${sf.top}-${sf.left}`
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "relative z-10 flex flex-col items-center text-center px-12 max-w-md",
              initial: { opacity: 0, y: 24 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.7, delay: 0.1 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "svg",
                  {
                    "aria-hidden": "true",
                    width: "80",
                    height: "60",
                    viewBox: "0 0 80 60",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M40 4L72 56H8L40 4Z", fill: "white", fillOpacity: "0.9" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M28 24L40 4L52 24", fill: "white", fillOpacity: "0.5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20 40L32 20L44 40", fill: "white", fillOpacity: "0.3" })
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl font-bold text-white leading-tight mb-3 tracking-tight", children: [
                  "WEST-SITE",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                  "RENTAL"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/75 text-lg font-light leading-relaxed", children: "Beheer & administratie" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 flex flex-col gap-3 w-full max-w-xs", children: [
                  "Inventaris beheren",
                  "Reserveringen opvolgen",
                  "Verhuur starten & afsluiten"
                ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-2.5 text-white/70 text-sm",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0" }),
                      item
                    ]
                  },
                  item
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-12 text-white/40 text-xs", children: "Seizoen 2025–2026" })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 lg:w-[42%] flex flex-col items-center justify-center px-6 py-12 bg-background min-h-screen", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "w-full max-w-sm",
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.15 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden flex justify-center mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "svg",
                {
                  "aria-hidden": "true",
                  width: "32",
                  height: "24",
                  viewBox: "0 0 80 60",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      d: "M40 4L72 56H8L40 4Z",
                      fill: "currentColor",
                      className: "text-primary",
                      fillOpacity: "0.9"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xl font-bold text-primary", children: "West-Site Rental" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: step === "auth" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: 20 },
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: -20 },
                transition: { duration: 0.3 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex items-center gap-2.5 mb-8", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "svg",
                      {
                        "aria-hidden": "true",
                        width: "28",
                        height: "22",
                        viewBox: "0 0 80 60",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "path",
                          {
                            d: "M40 4L72 56H8L40 4Z",
                            fill: "currentColor",
                            className: "text-primary",
                            fillOpacity: "1"
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-bold text-primary", children: "West-Site Rental" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-display font-bold text-foreground mb-1.5", children: "Medewerkers inloggen" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-8", children: "Inloggen via Internet Identity — enkel voor medewerkers en admins" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card p-4 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Shield,
                      {
                        className: "text-primary",
                        style: { width: 18, height: 18 }
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-0.5", children: "Internet Identity" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: "Veilig inloggen zonder wachtwoord. Gebruik je passkey of beveiligingssleutel." })
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: loginError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, y: -8 },
                      animate: { opacity: 1, y: 0 },
                      exit: { opacity: 0, y: -8 },
                      className: "flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm mb-4",
                      "data-ocid": "login-error",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 flex-shrink-0" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: loginError })
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      className: "w-full gap-2 font-semibold",
                      style: { height: 52, borderRadius: 10 },
                      onClick: handleLogin,
                      disabled: isLoggingIn || showRoleLoader,
                      "data-ocid": "login-btn",
                      children: [
                        isLoggingIn || showRoleLoader ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" }),
                        isLoggingIn ? "Bezig met inloggen…" : showRoleLoader ? "Account ophalen…" : "Inloggen met Internet Identity",
                        !isLoggingIn && !showRoleLoader && /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-auto" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground mt-6", children: [
                    "Ben je een klant?",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "a",
                      {
                        href: "/home",
                        className: "text-primary font-medium hover:underline",
                        children: "Ga naar de verhuurtpagina"
                      }
                    )
                  ] })
                ]
              },
              "auth"
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: 20 },
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: -20 },
                transition: { duration: 0.3 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex items-center gap-2.5 mb-8", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "svg",
                      {
                        "aria-hidden": "true",
                        width: "28",
                        height: "22",
                        viewBox: "0 0 80 60",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "path",
                          {
                            d: "M40 4L72 56H8L40 4Z",
                            fill: "currentColor",
                            className: "text-primary",
                            fillOpacity: "1"
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-bold text-primary", children: "West-Site Rental" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-display font-bold text-foreground mb-1.5", children: "Medewerker aanmaken" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-8", children: "Vul je gegevens in om door te gaan als medewerker" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: backendTimedOut ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, y: -8 },
                      animate: { opacity: 1, y: 0 },
                      exit: { opacity: 0, y: -8 },
                      className: "flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm mb-5",
                      "data-ocid": "backend-timeout-error",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 flex-shrink-0 mt-0.5" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium mb-1", children: "Verbinding mislukt" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive/80 mb-3", children: "De verbinding met de backend kon niet worden gelegd. Controleer je verbinding en probeer opnieuw." }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "button",
                            {
                              type: "button",
                              onClick: handleRetryBackend,
                              className: "inline-flex items-center gap-1.5 text-xs font-semibold text-destructive hover:text-destructive/80 transition-colors",
                              "data-ocid": "backend-retry-btn",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
                                "Probeer opnieuw"
                              ]
                            }
                          )
                        ] })
                      ]
                    },
                    "timeout-error"
                  ) : !registerFormReady ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0 },
                      animate: { opacity: 1 },
                      exit: { opacity: 0 },
                      className: "flex items-center gap-2.5 p-3 rounded-lg bg-muted border border-border text-muted-foreground text-sm mb-5",
                      "data-ocid": "actor-loading",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin flex-shrink-0" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Verbinding met backend wordt gelegd…" })
                      ]
                    },
                    "backend-loading"
                  ) : null }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleRegistreer, className: "space-y-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "naam", className: "text-sm font-medium", children: [
                        "Volledige naam ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "naam",
                          value: naam,
                          onChange: (e) => setNaam(e.target.value),
                          placeholder: "Jan de Vries",
                          required: true,
                          disabled: !registerFormReady && !backendTimedOut || registreer.isPending,
                          style: { height: 50, borderRadius: 10 },
                          "data-ocid": "register-naam"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "contact", className: "text-sm font-medium", children: "E-mail of telefoonnummer" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "contact",
                          value: contactInfo,
                          onChange: (e) => setContactInfo(e.target.value),
                          placeholder: "jan@west-site.com",
                          disabled: !registerFormReady && !backendTimedOut || registreer.isPending,
                          style: { height: 50, borderRadius: 10 },
                          "data-ocid": "register-contact"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 flex items-center gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-xs font-bold", children: "M" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Medewerker account" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Beheer & administratie" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: registerError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.div,
                      {
                        initial: { opacity: 0, y: -6 },
                        animate: { opacity: 1, y: 0 },
                        exit: { opacity: 0, y: -6 },
                        className: "flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm",
                        "data-ocid": "register-error",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 flex-shrink-0 mt-0.5" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: registerError })
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "submit",
                        className: "w-full gap-2 font-semibold",
                        style: { height: 52, borderRadius: 10 },
                        disabled: !registerFormReady && !backendTimedOut || backendTimedOut || registreer.isPending,
                        "data-ocid": "register-submit",
                        children: [
                          registreer.isPending || !registerFormReady && !backendTimedOut ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" }),
                          registreer.isPending ? "Bezig met registreren…" : !registerFormReady && !backendTimedOut ? "Verbinding maken…" : "Account aanmaken"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: handleAnnuleer,
                        disabled: registreer.isPending,
                        className: "w-full flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors py-1 disabled:opacity-50 disabled:cursor-not-allowed",
                        "data-ocid": "register-cancel",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3.5 h-3.5" }),
                          "Terug naar inloggen"
                        ]
                      }
                    )
                  ] })
                ]
              },
              "register"
            ) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-auto pt-8 text-xs text-muted-foreground text-center", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " West-Site Rental. Alle rechten voorbehouden."
      ] })
    ] })
  ] });
}
export {
  InloggenPage as default
};
