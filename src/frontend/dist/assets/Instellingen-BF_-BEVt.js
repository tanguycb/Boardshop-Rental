import { ag as useMijnProfiel, n as useAuth, j as jsxRuntimeExports, ah as Layout, ai as Settings, aa as User, S as Skeleton, a as Badge, aj as UserRole, B as Button, ak as LogOut, s as ue } from "./index-DJrsHPCD.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-DC_4A9uF.js";
function Instellingen() {
  const { data: profiel, isLoading } = useMijnProfiel();
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    ue.success("Je bent uitgelogd");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { role: profiel == null ? void 0 : profiel.role, showSidebar: !!profiel, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-5 max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-2xl font-bold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-6 h-6 text-primary" }),
        "Instellingen"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Jouw account en profiel" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-rental", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-semibold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-primary" }),
        "Profielinformatie"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-60" })
      ] }) : profiel ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-primary text-lg", children: profiel.naam.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: profiel.naam }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: profiel.contactInfo || "Geen contactinfo" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Rol:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: profiel.role === UserRole.Medewerker ? "border-primary/30 text-primary" : "border-accent/30 text-accent",
              children: profiel.role === UserRole.Medewerker ? "Medewerker" : "Klant"
            }
          )
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Profiel niet beschikbaar" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "card-rental border-destructive/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-foreground", children: "Uitloggen" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Beëindig je huidige sessie" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          className: "gap-2 text-destructive border-destructive/40 hover:bg-destructive/10",
          onClick: handleLogout,
          "data-ocid": "instellingen-logout",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
            "Uitloggen"
          ]
        }
      )
    ] }) })
  ] }) });
}
export {
  Instellingen as default
};
