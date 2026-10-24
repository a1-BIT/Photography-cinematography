# MyView — photography & cinematography

Photography-cinematography — Sawan (Photography & cinematography).

A responsive, editorial portfolio built with Next.js App Router, TypeScript, and Tailwind CSS 4. Three runtime packages only: Next.js, React, and React DOM. No database, UI kit, animation library, gallery package, or media SDK.

## Run locally

Requires Node.js 20.9+ (Node.js 22 recommended).

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For a production check, run `npm run build` then `npm start`. `npm run typecheck` checks TypeScript; `npm run test:smoke` tests a running local server (set `TEST_BASE_URL` for another port).

The scripts use Next.js’s bundled Webpack compiler for compatibility with this Windows environment, where the Turbopack CSS worker fails to start. This adds no package dependency and works on Vercel too.

## Update the content

The header includes Ivory, Sage, and Midnight theme swatches. A choice updates the site palette immediately and is saved in browser local storage. Saved preferences are restored after hydration, so the initial server and client markup agree. Storage is optional: the controls still work when it is blocked. Palette values live in `src/app/globals.css`; no theme library is needed.

Edit `src/lib/content.ts`. It contains branding, biography, optional social links, hero/profile images, and all portfolio entries. Any category accepts both photos and videos. Add entries to the `works` array; counts and filters update automatically. There is intentionally no CMS or admin dashboard.

The site currently uses **illustrative copy and stock demo imagery from Unsplash**, plus Cloudinary’s public sample sea-turtle clip to demonstrate video playback. Film posters and titles are illustrative; the lightbox labels the sample footage. Replace these with your own licensed work and biography before launch, then set `site.demo` to `false`. The demo footer is intentionally visible. No actual photographer credentials, client claims, or social accounts are implied.

### Cloudinary

1. Upload your photos and videos in the Cloudinary dashboard.
2. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`.
3. Replace each image source with `{ provider: "cloudinary", id: "portfolio/your-image-public-id" }`. Set `hero` and `portrait` the same way.
4. For a film, set `kind: "video"` and `video: { id: "portfolio/your-video-public-id" }`; use a separate image as the poster. Omit the video extension from the public ID. Remove `cloud: "demo"` from demo videos when replacing them.

Example work entry:

```ts
{
  id: "wedding-film", title: "A day to remember", category: "Weddings",
  kind: "video", year: "2026", shape: "landscape",
  image: { provider: "cloudinary", id: "portfolio/wedding-poster" },
  alt: "A couple celebrating their wedding outdoors",
  video: { id: "portfolio/wedding-film" }
}
```

`src/lib/media.ts` generates responsive image URLs with automatic format/quality and width limits. Images use native `srcset` and lazy loading; only the hero is high priority. Cloudinary is the image optimizer, avoiding a second Next.js image proxy. Native video controls load only inside the opened viewer, with metadata-only preload and no background autoplay. Videos use widely supported MP4 with automatic quality. See [Cloudinary image optimization](https://cloudinary.com/documentation/image_optimization).

## Contact delivery

The form posts to `/api/contact`. Set these **server-only** Vercel environment variables to enable actual email delivery:

- `RESEND_API_KEY`: your Resend API key.
- `CONTACT_FROM`: a sender on a domain you have verified with Resend.
- `CONTACT_TO`: the inbox that receives enquiries.

It uses the Resend REST API through built-in `fetch`, so there is no mail SDK. Requests have server-side field validation, a 16 KB streamed body limit, same-origin checks, a honeypot, and a delivery timeout. Email enquiries use Reply-To; phone enquiries include the number in the message. Input is sent as plain text. Nothing is stored in a database or logged by this application.

Without those variables, the endpoint returns an honest unavailable status. It never pretends to deliver a message. To verify delivery, configure the variables and send a real test enquiry. Configure Vercel Firewall rate limiting on `/api/contact` before public launch; an in-memory counter would not reliably limit traffic across serverless instances. Set an appropriate data handling notice for your use of submitted contact information.

## Deploy to Vercel

1. Push this project to a Git repository and import it into Vercel. If it is in a monorepo, set this folder as the Root Directory.
2. Keep the detected **Next.js** preset, default build command, and default output directory.
3. Set `NEXT_PUBLIC_SITE_URL` to your actual production origin, e.g. `https://myview.example`, and add the Cloudinary and contact variables above.
4. Deploy. Add your domain under **Project → Settings → Domains**, and apply the DNS records Vercel provides.
5. Redeploy after changing public environment variables or content. Confirm the contact message reaches your inbox.

Next.js prerenders the portfolio. Only the contact endpoint requires a serverless function; do not use static export, which would remove that endpoint. Canonical URLs, sitemap, robots, generated social preview image, and favicon are included. Public preview URLs may need deployment protection or noindex until real content is ready.

## Accessibility and performance

Semantic headings, a skip link, visible keyboard focus, reduced-motion support, filter state announcements, a native modal dialog with focus restoration, keyboard photo navigation, and native video controls are included. Add a WebVTT caption track if your real films have speech. System fonts avoid font downloads. CSS handles layout and hover effects; React state is limited to navigation, gallery, and contact interactions. Run mobile Lighthouse against your real production content to measure actual Core Web Vitals; placeholder network conditions are not a performance guarantee.

This repository is ready to import into Vercel; no hosting account, Cloudinary credentials, or contact-delivery credentials are included.
