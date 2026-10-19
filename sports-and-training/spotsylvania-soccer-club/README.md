# Spotsylvania Soccer Club — Website Template

A plug-and-play, dependency-free website template for travel soccer clubs. Ships
with real club defaults (Spotsylvania SC, Eagles, VA) but is fully rebrandable
from a single CSS file.

Built as static HTML + CSS + vanilla JS. No framework, no build step, no npm
install. Open `index.html` in a browser and it works.

## What's inside

```
travel-soccer-club/
├── index.html          Home — hero, programs, coaches, schedule, CTAs
├── about.html          Philosophy, three pillars, history timeline
├── teams.html          All 14 rosters by age bracket
├── coaches.html        Staff directory
├── schedule.html       Fixtures, tournaments, filters
├── tryouts.html        Dates, fees, registration form, FAQ
├── contact.html        Phone, email, map, contact form
├── css/
│   ├── tokens.css      >>> EDIT ME to rebrand <<<
│   ├── base.css        Reset, typography, layout
│   └── components.css  Nav, buttons, forms, cards, footer
├── js/
│   └── main.js         Nav toggle, scroll reveals, form stub
└── assets/
    └── logo.svg        Placeholder crest
```

## Quick customization

All the knobs are in **`css/tokens.css`**. You usually don't need to touch
anything else.

### 1. Rebrand colors

The palette is expressed in OKLCH (perceptually uniform). To retune, change the
hue number (third value) on `--pitch-*`. Stay in the same lightness/chroma
range for a balanced look.

```css
--pitch-800: oklch(0.24 0.07 155);  /* 155 = green. Try 250 for navy, 25 for crimson */
--gold-600:  oklch(0.72 0.16 75);   /* 75 = amber. Try 30 for orange, 110 for chartreuse */
```

If you prefer hex, replace the OKLCH values directly — modern browsers accept
either.

### 2. Change the club name

Global find-and-replace across the HTML files:

| Find | Replace with |
|------|--------------|
| `Spotsylvania Soccer Club` | Your full club name |
| `Spotsylvania SC` | Nav abbreviation |
| `SSC` | Crest initials (2–3 letters) |
| `Spotsylvania, VA` | Your city, state |
| `Est. 1998` | Your founding year |
| `Go Eagles` | Your mascot line |
| `1998` | Founding year in timelines |

### 3. Update contact info

Replace these in every HTML file (they're in each footer):

| Find | Replace with |
|------|--------------|
| `571-866-0596` | Your phone |
| `5718660596` | Your phone (digits only, for `tel:` link) |
| `SPVEAGLES@GMAIL.COM` | Your email |

### 4. Swap the logo

Replace `assets/logo.svg` with your real crest. The template also uses an
inline SVG fallback in the nav/footer — search for `SSC` inside the `<text>`
element and replace with your initials. Size is preserved automatically.

### 5. Swap the fonts

Edit the `@import` URL at the top of `css/tokens.css` and the two font-family
variables:

```css
--font-display: "Big Shoulders Display", ...;
--font-body: "Archivo", ...;
```

Good sports-forward alternatives: **Anton**, **Khand**, **Staatliches**,
**Syncopate**, **Bowlby One SC**. Pair with something clean and humanist for
body: **Archivo**, **Lexend**, **Manrope**, or your system stack.

## Wiring the forms to a real backend

Forms currently show a fake success message (see `js/main.js`). To accept real
submissions, pick one:

- **Formspree**: add `action="https://formspree.io/f/YOUR_ID" method="POST"` to the `<form>` and remove the JS handler.
- **Netlify Forms**: add `netlify` as a form attribute, deploy to Netlify.
- **Your own endpoint**: replace the `fetch` stub in `js/main.js`.

## Deploy

Drop the folder onto any static host:

- **Netlify / Vercel**: drag-and-drop the folder, done.
- **GitHub Pages**: push to a repo, enable Pages on the root.
- **Cloudflare Pages**: connect repo, build command empty, output directory `/`.
- **Any shared host**: FTP upload the folder.

No build step required.

## Accessibility notes

- All interactive elements have visible focus rings (`:focus-visible`).
- Skip link is provided at the top of every page.
- Every nav link has `aria-current="page"` on the active page.
- Forms use `<label for>` with matching `id` on inputs.
- `prefers-reduced-motion` disables marquee and reveal animations.
- Color contrast meets WCAG AA at all text/background pairings.

## Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari 15+). Uses CSS
`oklch()`, `clamp()`, `:has()` (none required), container queries optional.
Graceful degradation on older browsers — layouts still work, colors fall back.

## License

This template is for your use however you like. Fonts are loaded from Google
Fonts (free). The crest SVG is generic — replace with your club's real mark.

---

**Built with care.** If you extend or rebuild from this template, no attribution
required — just make something good.
