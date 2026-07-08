# WEBVICA

Premium marketing site for WEBVICA — a service that finds local businesses listed on
Google Maps, Yelp, or Facebook without a website, and builds and publishes one for them
for free.

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion,
React Three Fiber / Three.js, GSAP, and Lenis smooth scroll.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build for production

```bash
npm run build
npm run start
```

## Project structure

```
app/
  layout.tsx        Root layout: fonts, metadata, SEO/Open Graph, JSON-LD
  page.tsx           Assembles all page sections
  globals.css        Design tokens, glassmorphism, reduced-motion handling
  robots.ts          robots.txt
  sitemap.ts         sitemap.xml
components/
  Nav.tsx            Sticky glass navigation
  Hero.tsx           Hero section with 3D scene, headline, CTAs
  HeroScene.tsx       React Three Fiber scene (globe, network, pin, browser card)
  Stats.tsx          Animated count-up statistics (GSAP)
  HowItWorks.tsx     4-step animated timeline
  WhyChoose.tsx      Feature highlight cards
  MapSection.tsx      Stylized world map with glowing pins
  Features3D.tsx     Tilt-on-hover feature grid
  Showcase.tsx       Website showcase carousel
  Testimonials.tsx    Auto-scrolling testimonial marquee
  FAQ.tsx            Animated accordion
  Contact.tsx        Contact form (Name, Business Name, Maps link, Email, Phone, Message)
  Footer.tsx         Footer with newsletter signup
  SmoothScroll.tsx    Lenis smooth-scroll provider
  ScrollProgress.tsx  Top scroll progress bar
  CursorGlow.tsx      Mouse-follower glow (desktop only)
  StickyCTA.tsx       "Claim Your Free Website" floating button
  BackToTop.tsx       Back-to-top button
lib/
  data.ts            All section copy/content in one place — edit here to update text
```

## Notes

- Replace `public/og-image.png` with a real 1200×630 social preview image.
- Update the domain in `app/layout.tsx`, `app/robots.ts`, and `app/sitemap.ts` from
  `https://webvica.com` to your real domain.
- The contact form currently simulates a submission client-side. Wire `Contact.tsx`'s
  `handleSubmit` up to your backend, FormSubmit.co, or an API route to actually receive
  leads.
- Respects `prefers-reduced-motion` throughout (Lenis, GSAP, CSS animations).
- Fonts: Sora (display), Inter (body), Space Grotesk (stats/numbers) — loaded via
  `next/font/google`, no extra network requests beyond Google Fonts.
