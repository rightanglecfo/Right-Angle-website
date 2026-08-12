# Right Angle Finance & Accounting — Website

A static, dependency-free site (plain HTML/CSS/JS — no build step, no framework) so it's easy to preview now and port into Squarespace later.

## Preview locally

```
python3 -m http.server 8000
```
Then open `http://localhost:8000`.

## File structure

```
index.html            All page content/sections
css/style.css          Design tokens + all styling
js/main.js              Nav, scroll reveal, mobile menu, contact form
images/                  Logo files (plus -transparent versions used on dark backgrounds)
design-system/           Reference doc: exact color/type tokens used, for whoever configures Squarespace's Design panel
```

## Before this goes live

1. **LinkedIn URL** — two placeholder links (`#`) are marked `TODO` in `index.html`: one in the Contact section, one in the footer. Search for `linkedinLink` and swap in your profile URL once it exists.
2. **Contact form delivery** — the form validates and works in the browser now, but has no backend. It currently falls back to opening a pre-filled `mailto:` to info@rightanglecfo.com. To get real form submissions emailed to you without a backend, sign up at a service like Formspree (free tier), and paste the endpoint into `FORM_ENDPOINT` in `js/main.js`. **This step becomes unnecessary once you move to Squarespace** — see below.
3. **Founder headshot (optional)** — the About section currently uses the logo mark on a navy panel rather than a photo, since none was provided. Swap in a professional headshot if you'd like a more personal touch.

## Porting to Squarespace

Squarespace doesn't accept a raw multi-file static site as a direct upload — it's a block/section based editor. Two realistic paths:

- **Rebuild in the Squarespace editor** (recommended, no dev needed): use this site as the source of truth for copy, section order, and structure. Recreate each section using Squarespace's layout blocks, and match the design system in `design-system/right-angle-finance-accounting/MASTER.md` (colors, fonts, spacing) via Squarespace's Design panel (Site Styles → Colors/Fonts). Use Squarespace's native **Form Block** for Contact — it already emails submissions to any address you set, so the custom JS form logic here isn't needed.
- **Custom Code injection** (if you're on a Business/Commerce plan with Developer Mode, or just want closer visual parity): the CSS in `css/style.css` and structure in `index.html` can be adapted into a Squarespace Code Block per section, or injected via Settings → Advanced → Code Injection for site-wide CSS/fonts. This preserves the hover interactions and animations exactly as built here.

Either way, the fonts are loaded from Google Fonts by URL (see the `<link>` tags in `index.html` head), so they'll work identically inside Squarespace.
