# J Store UI Redesign — Clinical Luxury

**Date**: 2026-03-22
**Status**: Approved

## Direction

- **Aesthetic**: Clinical luxury (Aesop / Grown Alchemist)
- **Palette**: Warm neutrals (#faf8f5 / #1a1a1a) + petrol blue accent
- **Admin**: Scoped dark mode, visually separated from storefront
- **Typography**: Cormorant Garamond (display) + DM Sans (body, replaces Instrument Sans)
- **Animations**: Expressive — scroll-triggered fade-ins, parallax, hover elevations, count-up metrics
- **Approach**: Incremental by layers — tokens → globals → components → shell → store pages → admin → animations
- **Constraint**: Mobile-first. Every layout must be excellent on phones.

---

## 1. Design Tokens

### Storefront (light)

| Token | Value | Use |
|-------|-------|-----|
| `--background` | `#faf8f5` | General background |
| `--foreground` | `#1a1a1a` | Primary text |
| `--card` | `#ffffff` | Card surfaces |
| `--card-foreground` | `#1a1a1a` | Card text |
| `--primary` | `#1b4d5a` | CTAs, links, brand accent |
| `--primary-foreground` | `#faf8f5` | Text on primary |
| `--secondary` | `#f0ece7` | Secondary backgrounds, badges |
| `--secondary-foreground` | `#3d3d3d` | Text on secondary |
| `--muted` | `#e8e4de` | Soft borders, disabled backgrounds |
| `--muted-foreground` | `#6b6560` | Secondary text, descriptions |
| `--accent` | `#e6dfd6` | Hover states, highlights |
| `--border` | `#ddd8d0` | General borders |
| `--destructive` | `#c4403a` | Errors, destructive actions |
| `--ring` | `#1b4d5a` | Focus rings |
| `--radius` | `0.75rem` | Border radius (down from 1.35rem) |

### Admin (dark, scoped to `.dark`)

| Token | Value | Use |
|-------|-------|-----|
| `--background` | `#111113` | Panel background |
| `--foreground` | `#e8e4de` | Primary text |
| `--card` | `#1a1a1d` | Card surfaces |
| `--card-foreground` | `#e8e4de` | Card text |
| `--primary` | `#3d8fa0` | CTAs, highlighted metrics |
| `--primary-foreground` | `#111113` | Text on primary |
| `--secondary` | `#222226` | Secondary backgrounds |
| `--muted` | `#2a2a2e` | Borders, disabled backgrounds |
| `--muted-foreground` | `#8a8680` | Secondary text |
| `--border` | `#2e2e32` | Borders |

### Typography

- **Display**: Cormorant Garamond (stays)
- **Body**: DM Sans (replaces Instrument Sans)
- Body background: flat `#faf8f5` + subtle CSS grain texture. Remove current green radial gradients.

---

## 2. UI Components

### Button
- `rounded-lg` (from `rounded-full`). No heavy box-shadow.
- Primary: petrol blue bg. Outline: transparent bg + border. Ghost: no border/bg.
- Mobile: `lg` buttons become `w-full`. Button groups stack vertically below `md`.

### Card
- `rounded-lg` (from `1.8rem`). Subtle `shadow-sm` or border only.
- CardFooter: no background, just `border-top`.
- Mobile: padding `px-4`, full-width.

### Badge
- `rounded-md`. Smaller: `text-[0.7rem]` uppercase + wide tracking.

### Input
- `rounded-lg`, border `--border`, bg `--card`. Focus ring `--ring`.
- Mobile: always `w-full`, min font-size `16px` (iOS zoom prevention).

### Table (admin)
- Hover `--secondary` dark. Compact padding.
- Mobile: transform to card-list (stacked label:value), no horizontal scroll.

### MediaFrame
- `rounded-lg`. Gradient overlay: subtle black bottom only (`from-black/20`).
- Label pill: `--card` semi-transparent bg, no white border.
- Mobile: compact aspect ratios (hero `4/4.6` → `4/3`).

### SectionTitle
- `editorial-kicker` color changes to `--muted-foreground`.
- Mobile: action button stacks below description.

---

## 3. Images & Mock Data

### Image strategy

Replace all generic Unsplash photos with care-supply-coherent images:

| Location | New image direction |
|----------|-------------------|
| Hero home | Flat-lay of care products on cream/linen background |
| Category: Pañales | Premium diaper pack on clean surface |
| Category: Higiene | Wet wipes + liquid soap editorial composition |
| Category: Protección | Creams + gloves in elegant clinical display |
| Category: Movilidad | Support accessories in soft lifestyle context |
| Product cards | Product centered on neutral background, Aesop catalog style |
| Bundles | Assembled kits with visible products, premium wrapping |
| Login | Close-up hands with care product |
| Account | Delivery package at door, editorial style |
| Bundles interstitial | Top-down view of organized kit |

### Extended mock data

**Products**: 4 → 8

| Product | Category | Price | Subscription | Stock |
|---------|----------|-------|-------------|-------|
| Pañal RespiraFlex M | Pañales | $18 | $16 | 42 |
| Pañal RespiraFlex G | Pañales | $20 | $18 | 35 |
| Pañal Nocturno Ultra M | Pañales | $22 | $19 | 28 |
| Toallas Húmedas Suaves | Higiene | $7 | $6 | 65 |
| Jabón Líquido Neutro 500ml | Higiene | $9 | $8 | 48 |
| Crema Barrera Protectora | Protección | $14 | $13 | 24 |
| Guantes Nitrilo Cuidado | Protección | $11 | — | 31 |
| Cojín Postural Ergonómico | Movilidad | $45 | — | 12 |

**Bundles**: 2 → 4

| Bundle | Price | Subscription | Includes |
|--------|-------|-------------|----------|
| Kit Cuidado Esencial | $36 | $33 | Pañales M, Toallas, Crema barrera |
| Kit Nocturno Confort | $42 | $39 | Pañales nocturnos, Protectores, Toallas |
| Kit Higiene Completa | $28 | $25 | Toallas húmedas, Jabón líquido, Crema barrera |
| Kit Institucional Básico | $85 | $78 | Pañales G x2, Guantes, Toallas, Jabón |

**Admin snapshot**: 4 customers, 4 stock items, updated metrics.
**Account snapshot**: 2 subscriptions, 4 historical orders.

---

## 4. Shell (Header, Footer, Navigation)

### Header

**Desktop**: Remove announcement bar. Logo (circle "JS" + "J Store"). Nav links: uppercase DM Sans, wide tracking, underline hover. Right: cart icon with counter + AuthControls. Sticky + backdrop-blur.

**Mobile**: Compact logo (circle + "J Store" no subtitle). Hamburger → full-screen drawer from right with display-size links. Cart icon always visible.

### Footer

**Desktop**: Two columns — logo + tagline + moved announcement text | two text blocks (Atención, Cobertura). Copyright line below.

**Mobile**: Stack vertical, centered.

### Page shell
- `max-w-7xl`, `px-5` mobile (up from `px-4`), `px-6` desktop.

---

## 5. Storefront Pages

### Home
- Hero: 2-col desktop (text | image), stack mobile (image first, `aspect-4/3`). No hairline-grid, clean background. CTAs stack `w-full` on mobile.
- Highlights: icon + text row, no card wrappers.
- Categories: images + text below (no card wrapper), 4-col → 2-col → 1-col.
- Featured products: 2-col ProductCards.
- Bundles interstitial: edge-to-edge `--secondary` background. Stack on mobile.
- Bundles grid: 2-col → 1-col.

### Product detail
- Desktop: 2-col (image + metrics | info + purchase options).
- Subscription block: left border `--primary` accent.
- Mobile: stack — image `4/3` → badges/title → metrics 3-col grid → purchase modes → CTAs `w-full`.

### Products listing
- Category filter: horizontal badge row. Mobile: horizontal scroll bleeding to edges.
- Grid: 2-col → 1-col.

### Cart
- Desktop: 2-col (items | summary in `--card`, not `--primary`).
- Mobile: items stacked → sticky bottom bar with total + CTA.

### Checkout
- Desktop: 2-col (form | order summary).
- Mobile: collapsible summary top → form → CTA `w-full`.

### Login
- Desktop: 2-col (image | centered form).
- Mobile: no image, form only. Demo credentials as subtle badge below form.

### Account
- Header: name + email + badge, no side image.
- Sections: Addresses, Orders, Subscriptions as independent cards.
- Subscriptions: left border `--primary`.
- Mobile: all stacked full-width.

---

## 6. Admin Panel (Dark Mode)

### Dark mode scoping
Admin layout wraps content in `.dark` div. Dark tokens defined under `.dark` in globals.css. No global toggle.

### Layout
- **Desktop (xl+)**: Fixed sidebar `w-64`, bg `--card` dark. Logo + nav with Lucide icons. Active: `--secondary` bg + left `--primary` bar. User info + logout at bottom. Content area: bg `--background` dark.
- **Tablet (lg)**: Collapsed sidebar (icons only, `w-16`). Tooltip labels.
- **Mobile**: No sidebar. Top bar with hamburger → left drawer.

### Pages
- **Overview**: Title + date. 4-col metric grid (2 tablet, 1 mobile) with count-up animation. Two-col lists (customers, inventory).
- **Products, Orders, Categories, Bundles, Customers, Subscriptions, Inventory**: Table desktop → card-list mobile. Consistent header + action button pattern.
- **Inventory**: Rows where `available < minimum` get left border `--destructive` or alert badge.
- **Order status badges**: Paid → `--primary`, Pending → amber, Cancelled → `--destructive`.

### Removals
- Remove descriptive `surface-soft` blocks from overview.
- Remove large editorial headline card from overview.
- Replace current sidebar (Card + Card) with proper fixed sidebar.

---

## 7. Animations

### Dependency
Add `framer-motion`.

### Scroll-triggered reveals
Reusable `<Reveal>` component: fade-in + translateY (20px → 0), 0.6s ease-out, threshold 0.15. Stagger 0.08s for lists. Used on: home sections, card grids, admin metrics.

### Parallax
Hero image + bundles interstitial: 0.85x scroll speed via `useScroll` + `useTransform`. Desktop only (disabled on mobile).

### Card hover
Cards: `translateY(-4px)` + `shadow-md` on hover (0.3s). Image inside: `scale(1.03)` on card hover (0.5s) with overflow-hidden. No hover effects on mobile.

### Button transitions
Primary: lighter bg on hover, `scale(0.98)` on click. Outline: border → `--primary` + `--secondary` bg fade.

### Admin count-up
MetricCard values animate from 0 to final value (1s, eased) on viewport entry.

### Drawers (mobile menu, admin sidebar)
Slide-in from respective side + backdrop fade (0.3s). Menu items: stagger fade-in (0.05s delay). Close: reverse, faster (0.2s).

### Not animated
- Table rows (only full table fades in).
- Forms (checkout, login) — immediate.
- Header nav — static.
- No page transitions (App Router + server components limitation).
