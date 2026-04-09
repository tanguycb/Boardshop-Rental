# Design Brief: West-Site Rental

## Purpose & Tone
Modern snowboard rental platform login and dashboard experience. Premium, trustworthy, hospitality-forward — inspired by luxury accommodation and rental brands. Split-screen login (left: teal gradient brand, right: clean form). Dark mode for dashboard. Guest-ready aesthetic with technical precision for inventory.

## Differentiation
Split-screen login with teal-to-dark gradient left half, clean white card right half. Warm teal primary (#14B8A6) with vibrant golden accent. Refined General Sans typography throughout. Dark dashboard with elevated cards and subtle borders. Real-time availability badges with orange urgency indicators. QR scanning for instant product lookup.

## Color Palette (OKLCH)
| Role | Light Mode | Dark Mode | Usage |
|------|-----------|-----------|-------|
| Primary | `60 0.18 183` | `65 0.16 183` | CTAs, active states, navigation — warm teal |
| Accent | `63 0.25 32` | `68 0.23 32` | Urgency, highlights, overdue — golden orange |
| Success | `54 0.18 140` | `59 0.16 140` | Availability, confirmation — fresh green |
| Destructive | `56 0.22 25` | `61 0.19 25` | Overdue alerts, errors — urgent red |
| Muted | `0.88 0.02 240` | `0.18 0.01 183` | Disabled, secondary — cool grey / dark blue-grey |
| Background | `0.98 0 0` | `0.08 0 0` | Main surface — near-white / near-black |
| Card | `0.99 0 0` | `0.15 0.01 183` | Inventory, rental cards — slight elevation |
| Foreground | `0.1 0 0` | `0.98 0 0` | Text, primary content — maximum contrast |

## Typography
- **Display & Body**: General Sans (modern, clean sans-serif for all text — login form, dashboards, headings)
- **Mono**: Geist Mono (technical clarity for codes, barcodes, QR data, timestamps)
- **Accent headings**: Fraunces (serif, sparingly for login tagline or premium moments)
- **Scale**: 12px, 14px, 16px, 18px, 20px, 24px, 32px, 48px

## Shape & Spacing
- **Radius**: `0.625rem` (modern, rounded — friendly yet professional for rental platform)
- **Density**: Spacious on login (breathing room), compact in employee dashboard (info density)
- **Padding**: 8px, 12px, 16px, 24px, 32px — incremental scale

## Elevation & Depth
- **Surfaces**: Card (`bg-card` + `border-border`), sidebar (`bg-sidebar`), popover (`bg-popover`)
- **Shadow hierarchy**: `shadow-xs` (subtle, default); `shadow-soft` (layered popovers); `shadow-elevated` (modal, high-priority)
- **No gradients on UI** — gradients reserved for login left-half background only

## Structural Zones
| Zone | Light | Dark | Treatment |
|------|-------|------|-----------|
| Login left | Teal gradient `#14B8A6` → `#0F766E` + overlay | N/A | Brand immersion, logo + tagline |
| Login right | `bg-card` centered card | N/A | Form focal point, 420px max width |
| Header/Nav | `bg-card` + `border-b-border` | `bg-card` + `border-b-border` | Elevated, clean separation |
| Dashboard main | `bg-background` | `bg-background` | Primary reading area |
| Content secondary | `bg-muted/20` | `bg-muted/20` | Rhythm, subsection background |
| Sidebar | `bg-sidebar` + `border-r-border` | `bg-sidebar` + `border-r-border` | Navigation, slightly raised |
| Inventory cards | `bg-card` + `shadow-xs` | `bg-card` + `shadow-xs` | Physical hierarchy, hover lift |
| Alerts | `bg-accent/10` + `border-accent` | `bg-accent/10` + `border-accent` | Urgency visibility |

## Component Patterns
- **Login card**: Max 420px, centered, light background, teal button full-width 48px height
- **Input fields**: Full-width, 48px height, 10px radius, focus ring on primary color
- **Primary button**: Teal (`--primary`), white text, hover darkens + lifts (shadow)
- **Secondary link**: Password recovery, register link — subtle text color, no background
- **Availability badge**: `.badge-availability` (green for available, orange for limited, red unavailable)
- **Rental card**: `.card-rental` (teal border on hover, orange accent for urgency)

## Motion
- **Transitions**: `.transition-smooth` (all, 300ms, cubic-bezier) for state changes
- **Button hover**: Slight shadow lift + color darkening (not scale)
- **Form interaction**: Input focus ring appears smoothly, no bounce
- **Dashboard refresh**: Subtle fade-in for updated availability

## Constraints & Guardrails
- ✓ Teal/orange/grey + green/red only — no extraneous colors
- ✓ OKLCH color system throughout (no hex, no rgb)
- ✓ General Sans typography for clarity and modernity
- ✗ No gloss, no gradients on UI components
- ✗ No animation delight — every motion serves usability
- ✗ No full-screen gradient overlays (login left half only)

## Signature Detail
Split-screen login experience with teal gradient left immersion (logo + "Jouw perfecte verblijf" tagline), clean white form card right (centered, elevated). Dark dashboard with premium feel. Real-time QR scanning card with orange urgency badges for overdue items.

