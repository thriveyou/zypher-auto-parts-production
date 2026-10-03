# Zypher Imports — SEO and technical SEO audit

**Audit date:** 3 October 2026, Asia/Colombo. Production observations and Lighthouse runs: approximately 20:20–20:30 Sri Lanka time.  
**Website:** https://www.zypherimports.lk/  
**Repository commit inspected:** `5feb1120df1fc8b78f6bfbb1d831bdaf321ea3dd`  
**Status:** Audit only. No application code, configuration, assets, dependencies, or production settings changed. Recommendations below require review before implementation.

## A. Executive summary

The main website has a sound basic crawl setup: all three public pages return HTTP 200, their content and metadata arrive in the initial HTML, canonical URLs exist, robots.txt permits crawling, and the sitemap lists the three real pages. HTTPS works, trailing slashes redirect, and nonexistent pages return genuine 404s. No broken main-site navigation links were found.

The largest opportunities are **correcting the parts platform's domain configuration, improving mobile loading, making structured data accurate, and creating distinct service pages**. The website currently has no standalone Parts page, car-parts page, bike-parts page, or motorcycle-import page. “PRODUCTS” links to a homepage showcase of three past deliveries.

Key findings:

1. **P0, external platform:** `parts.zypherimports.lk` publishes canonical URLs, sitemap URLs, and social-image URLs on `zypherimports.lk`. Several targets redirect to nonexistent main-site pages. This is a material indexing configuration error across the publicly discoverable platform pages, although the platform itself loads.
2. **P1, mobile performance:** Homepage Lighthouse performance is **73/100**, with simulated mobile LCP **6.7 seconds**. One Subaru logo transfers approximately **1.17 MB**, around 63% of the measured mobile page transfer. Desktop performance is substantially better.
3. **P1, schema accuracy:** Homepage JSON-LD describes delivered showcase examples as a current `OfferCatalog` containing `Offer` and `Product` entities, all using the generic social image. The visible content does not establish current sale listings.
4. **P1, lead reliability:** The contact endpoint ignores the email provider's returned error object and can report success when the provider rejects a message. This is a source-confirmed failure path, not proof that production emails are currently failing.
5. **P1, search intent:** There is no dedicated destination for Japanese car parts, Japanese motorcycle parts, or complete motorcycle imports into Sri Lanka. These need distinct, useful service explanations and quotation paths.
6. **P2:** Fix repeated branding in titles, heading hierarchy, hidden-but-focusable interface elements, low-contrast green buttons, incomplete local-business information, and social-image dimensions.

### Scope, stack, and evidence

| Area | Inspected / established |
|---|---|
| Framework | Next.js App Router; lockfile resolves Next.js **16.0.7**, React / React DOM **19.1.0**; TypeScript; Tailwind CSS 4. |
| Rendering | Server-rendered public pages with client components for navigation, hero interaction, popup, and contact form. Initial production HTML contains the substantive text, headings, links, metadata, and JSON-LD. |
| Hosting | Live response headers identify Vercel. `.github/workflows/main.yml` mirrors `main` and `develop` to a production repository. The exact deployed commit was not available; live behavior takes precedence over assumptions from source. |
| Integrations | `next/image`, locally served `next/font` Poppins/Saira, React Icons, Vercel Analytics, Resend contact email endpoint. No CMS/database/catalog routes found in this repository. |
| Repository coverage | All authored files under `src/app`, all 12 components under `src/components`, `src/lib/seo.ts`, font definitions, all asset filenames/sizes/dimensions, public assets, package manifest/lockfile, build/style/lint configuration, README, and deployment workflow. Dependency and generated build internals were not treated as application routes. Environment secrets were not read. |
| Public main-site routes | `/`, `/About-Us`, `/Contact-Us`. Supporting routes: `/robots.txt`, `/sitemap.xml`, favicon/assets; `/api/contact` is a POST handler, not a public content page. No authored custom 404 page, redirects, middleware/proxy, dynamic listing routes, or separate Parts page. |
| External dependency | Live public inspection of parts-platform home, request form, About, Contact, Privacy, Terms, Track, robots, and sitemap. **Its source repository is not present here.** File names for external fixes must be located in that project; they are not asserted as inspected files. |
| Live checks | GET responses, redirect targets, metadata, JSON-LD, heading/image/link inventories, all unique HTTP(S) outbound destinations from the main pages, image responses, browser rendering and mobile menu/popup interactions. No quotation requests or messages submitted. |
| Performance | Lighthouse 13.5.0, Chrome 154 on Windows: homepage mobile + desktop; About and Contact mobile. Single run per configuration, not a median or real-user measurement. |
| Mobile inspection | Homepage and Contact at a requested 390×844 viewport; About at 320×740; menu opens and popup opens/closes. Layout is readable in these samples. This is not a complete device/zoom/screen-reader certification. |
| Unavailable evidence | Search Console indexing/canonical decisions, search queries, real-user CWV/INP, analytics conversions, authenticated Google Business Profile settings, verified business hours/storefront eligibility, and email delivery. PageSpeed Insights API returned HTTP 429, so field data could not be retrieved. |

**Priority definitions:** P0 = urgent indexing/configuration defect; P1 = substantial visibility, performance, or lead risk; P2 = meaningful quality/consistency improvement; P3 = maintenance or incremental improvement. Priorities describe action order, not a claim of a Google penalty.

## B. Critical issues

### SEO-01 — Parts-platform canonical, sitemap, and image URLs use the wrong host — P0

- **What is wrong:** Live platform pages use `https://zypherimports.lk` as their canonical base instead of the platform host. `/request-form` points to `https://zypherimports.lk/request-form`, which redirects to `https://www.zypherimports.lk/request-form` and returns **404**. The same problem affects the platform's lowercase About/Contact, Privacy, and Terms canonical targets. Platform robots.txt advertises the main site's sitemap; the platform sitemap itself lists six URLs on the wrong host. Its OG/Twitter image and schema logo/image URLs also resolve to main-site 404s.
- **Why it matters:** Discovery and canonical signals point away from the actual content, several to invalid destinations. Link previews can lose their image. This is a confirmed configuration defect; Google's actual indexing response requires Search Console verification.
- **Files involved:** **External parts-platform repository/deployment:** locate site-origin/environment configuration, metadata helper/root layout, robots and sitemap generators, and JSON-LD URL generation. In this repository, `src/components/Navbar.tsx`, `Footer.tsx`, and `PartsRequestSection.tsx` are the referring entry points; their existing platform URLs are correct.
- **Recommended fix:** For platform-specific indexable pages, use absolute self-canonicals on `https://parts.zypherimports.lk`, matching OG URLs, working image URLs, and a platform sitemap advertised by its own robots.txt. Remove redirecting/404/noindex URLs from that sitemap. Decide separately whether duplicate About/Contact pages should consolidate to the equivalent existing main-site pages; do not blanket-canonicalize the entire platform to the main homepage. Keep the business identity consistent across hosts without confusing business identity URLs with page canonicals.
- **Acceptance:** Every intended platform canonical resolves directly to a relevant 200 page; all social/schema image URLs return actual image content; platform robots points to the intended platform sitemap; Search Console inspections confirm the deployed declarations.

## C. High-priority issues

### SEO-02 — Oversized Subaru logo dominates homepage transfer — P1

- **What is wrong:** `subaru.svg` is **1,618,135 bytes**, includes 13 embedded `data:image` occurrences, and is served as SVG rather than being resized by Next's raster optimizer. Lighthouse recorded **1,173,105 transferred bytes** for it on mobile. It is displayed as a small logo in the marquee.
- **Why it matters:** This unnecessary download competes with meaningful content on mobile connections. The repeated marquee row reuses the same URL, so this should not be described as two full network downloads.
- **Files involved:** `src/assets/subaru.svg`, `src/components/LogoSection.tsx`.
- **Recommended fix:** Replace with an accurate, optimized vector logo or appropriately sized transparent WebP. Strip unnecessary embedded raster data while preserving the brand artwork. An initial budget of under 20 KB is reasonable for this small decorative brand asset, subject to visual QA.
- **Acceptance:** Production response size falls materially; appearance remains correct; rerun mobile Lighthouse and inspect the resource waterfall.

### SEO-03 — Homepage mobile LCP is slow and too many images are eager — P1

- **What is wrong:** Mobile LCP is **6.7 s**, with the hero-parts image identified as LCP. The first feature icon, how-it-works illustration, all three below-fold showcase images, and footer logo use `priority`, alongside the navbar logo and hero. Lighthouse also flags a missing high fetch-priority hint for the LCP request.
- **Why it matters:** Below-fold work competes with the hero and useful text. The logo in SEO-02 is a major transfer problem, but the evidence does not prove it is the sole cause of LCP; rendering delay and script/CSS work also need investigation.
- **Files involved:** `src/components/Hero.tsx`, `FeaturesSection.tsx`, `How-it-works.tsx`, `Showcase-grid.tsx`, `Footer.tsx`, `Navbar.tsx`; `src/app/layout.tsx`, `src/styles/fonts.ts`; deployment-injected resources if applicable.
- **Recommended fix:** Keep the true hero/LCP image discoverable and eager; use the supported Next.js 16 preload/fetch-priority strategy deliberately, without redundant competing hints. Remove high-priority behavior from below-fold images and use default lazy loading. Correct `sizes` and aspect ratios as in SEO-11. Investigate render-blocking resources before attributing them to a particular integration. Preserve CTAs and readable text.
- **Acceptance:** Repeat three mobile lab runs after changes and compare medians; target lab LCP ≤2.5 s under the same profile as a development goal. Field success must be assessed separately at the 75th percentile.

### SEO-04 — Past deliveries are represented as current product offers — P1

- **What is wrong:** `homeJsonLd.hasOfferCatalog` contains three `Offer` → `Product` entries. The corresponding cards say “Delivered to Colombo” and are introduced as past imports, not current sale listings. Every product uses `/og.jpg`, not its actual photo. There are no listing URLs, prices, or availability details.
- **Why it matters:** Structured data should describe what users can actually see and obtain. Missing product-rich-result fields should not be filled with invented commercial facts.
- **Files involved:** `src/app/page.tsx:35`, `src/components/Showcase-grid.tsx`, `PartsHeader.tsx`.
- **Recommended fix:** Retain the accurate importing `Service`, provider, and service area, but remove `hasOfferCatalog`/`Offer`/`Product` for these past examples. Present them as fulfilled-request evidence. Add Product markup later only to actual maintained product/listing pages with truthful, visible details and their own images.
- **Acceptance:** JSON-LD matches visible content; no fabricated price, stock, rating, review, or availability. See [Google's structured-data quality rules](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).

### SEO-05 — Contact form can acknowledge a rejected email as successful — P1

- **What is wrong:** The API awaits `resend.emails.send(...)` but ignores its result, then returns `{ ok: true }`. The installed SDK and provider documentation return errors in a `{ data, error }` result for failure cases. The client resets the form after an HTTP success.
- **Why it matters:** An organic visitor may believe a quotation request was received when it was not. This affects conversions rather than being a direct ranking factor.
- **Files involved:** `src/app/api/contact/route.ts:67`, `src/app/Contact-Us/ui/Contact-form.tsx`.
- **Recommended fix:** Inspect the provider response, return a controlled failure status when `error` is present, preserve form values, and show a clickable WhatsApp fallback. Record delivery identifiers and handle delivery/bounce reporting where appropriate. Keep operational errors out of public responses.
- **Acceptance:** Mock success, returned provider error, and thrown network error in local/staging tests. Success appears only after provider acceptance; acceptance is not proof of inbox delivery. A real delivery test should be deliberately arranged, not sent by this audit. [Resend's Next.js example](https://resend.com/docs/send-with-nextjs) demonstrates checking the returned error.

### SEO-06 — Important services have no dedicated search landing pages — P1

- **What is wrong:** All service intent is concentrated on one homepage. “PRODUCTS” is an anchor to three car-part deliveries. There is no substantive motorcycle-import content or standalone car/bike service explanation.
- **Why it matters:** A person searching for Japanese motorcycle parts needs different information from someone importing a complete motorcycle. A gallery fragment cannot have its own independent title, description, canonical, or search intent.
- **Files involved:** New App Router pages proposed in section G; `src/app/page.tsx`, `src/components/Navbar.tsx`, `Footer.tsx`, `PartsRequestSection.tsx`, `PartsHeader.tsx`, `Showcase-grid.tsx`, `src/app/sitemap.ts`.
- **Recommended fix:** Build the three distinct service pages in G after confirming the business offering. Introduce them with concise homepage links. Use the existing request platform for part requests and a suitable motorcycle quotation path. Do not create every keyword permutation, model, or Sri Lankan city as a near-duplicate page.
- **Acceptance:** Each page answers a distinct buying task, has its own metadata/H1, useful evidence, a clear CTA, internal links, a 200 self-canonical URL, and sitemap inclusion.

## D. Medium-priority issues

### SEO-07 — Permanent preferred domain is implemented with a temporary redirect — P2

- **What is wrong:** `https://zypherimports.lk/` returns **307** to www; HTTP apex needs two hops: 308 to HTTPS apex, then 307 to HTTPS www. A deep-path test preserved the path and query correctly.
- **Why it matters:** Permanent redirects provide a clearer canonicalization signal for a permanent host choice; unnecessary hops add latency. This is not a redirect loop or evidence of duplicate indexed pages.
- **Files involved:** Vercel domain/redirect configuration outside the repository; `next.config.ts` only if an application rule is needed; `src/lib/seo.ts` defines the intended www origin.
- **Recommended fix:** Configure a permanent 308 or 301 apex → HTTPS www redirect, preserving path and query. Reduce HTTP apex hops where the hosting layer supports it. Exclude `parts.zypherimports.lk` from main-domain normalization.
- **Acceptance:** All tested host/protocol variants converge to the intended page with permanent redirects and no loop. [Google redirect guidance](https://developers.google.com/search/docs/crawling-indexing/301-redirects).

### SEO-08 — Titles repeat the brand; homepage title lacks it — P2

- **What is wrong:** About is “About Zypher Imports | Zypher Imports”; Contact repeats the brand similarly. The live homepage title is “Genuine Japanese Vehicle Parts in Sri Lanka”, without the brand. The layout template should not be assumed to apply to a page at the same route segment; the observed root output confirms it does not here.
- **Why it matters:** Repeated branding wastes search-result space; clear service/location/brand wording better describes the destination. Titles and descriptions are suggestions to search engines, not guaranteed snippets or ranking promises.
- **Files involved:** `src/app/layout.tsx`, `src/lib/seo.ts`, `src/app/page.tsx`, `src/app/About-Us/page.tsx`, `src/app/Contact-Us/page.tsx`.
- **Recommended fix:** Use section F's final rendered titles. Choose either short child titles plus the template or explicit absolute titles, and test rendered output to avoid appending the brand twice. Keep page descriptions unique and natural.

### SEO-09 — Homepage heading hierarchy does not reflect the sections — P2

- **What is wrong:** Feature cards begin at H3 with no section H2; “How it works” is a styled `span`, while its steps are H4. The closed modal contributes an H3 before the main H1 in the accessibility tree. Lighthouse flags heading order. The `products` anchor sits on the grid below its separately rendered section heading, so navigation can skip that introduction.
- **Why it matters:** Semantic structure helps readers and assistive technology navigate. Skipped levels are an accessibility/clarity issue, not evidence of a standalone ranking penalty.
- **Files involved:** `src/components/FeaturesSection.tsx`, `How-it-works.tsx`, `Popup-Modal.tsx`, `Hero.tsx`, `PartsHeader.tsx`, `Showcase-grid.tsx`, `src/app/page.tsx`; `src/app/About-Us/page.tsx` for a useful team-section heading.
- **Recommended fix:** Add a descriptive feature-section H2 with H3 cards; make “How to order parts from Japan” an H2 with H3 steps. Give the team cards an H2 parent. Move the products anchor to a wrapper containing its heading and grid. Remove the closed modal from the accessibility tree. Preserve one descriptive main H1 per page.

### SEO-10 — Hidden navigation and popup remain accessible/focusable — P2

- **What is wrong:** Mobile navigation collapses using height/opacity only; its links remain in the accessibility tree. The closed popup uses pointer-events/opacity only; its Close button and text remain exposed. Opening does not move focus into a semantic dialog, closing leaves focus on the now-hidden Close button, and the trigger's `aria-controls="direct-import-modal"` has no matching element ID. Focus trap/restore, modal labeling, and reduced-motion behavior are absent.
- **Why it matters:** Keyboard/screen-reader users can encounter invisible controls or navigate behind an apparent modal. This obstructs conversion and usability. The popup is **click-opened**, not an automatically displayed full-screen interstitial.
- **Files involved:** `src/components/Navbar.tsx`, `Hero.tsx`, `Popup-Modal.tsx`, `LogoSection.tsx`, `src/app/globals.css`, `src/app/layout.tsx`.
- **Recommended fix:** Make closed content hidden/inert or unmounted; use an accessible dialog with label, correct ID, focus entry/trap/return, Escape close, and inert background. Add a skip-to-content link. Respect `prefers-reduced-motion` for the infinite logo marquee and smooth scrolling, and provide a pause mechanism for continuous motion where required.
- **Acceptance:** Keyboard traversal never lands on closed content; focus returns to the trigger; mobile menu remains usable; zoom/reduced-motion checks pass. Automated accessibility scores alone do not cover this.

### SEO-11 — Image sizing and aspect-ratio declarations need correction — P2

- **What is wrong:** Hero source is **423×636**, but HTML declares **600×600**. The popup logo is **138×49**, declared **120×120**. The car illustration is **458×443**, declared **320×320**, and displayed up to 500 CSS pixels. Hero `sizes` says 90vw on mobile although it displays at 260px below `sm`; the gallery uses viewport percentages despite a capped/padded container. Logos use 260px intrinsic sizing but render substantially smaller. The desktop run records CLS **0.049** in the hero text container; the precise cause is not isolated.
- **Why it matters:** Incorrect intrinsic ratios can alter reserved space; oversized candidates waste bandwidth; small originals can look soft. `fill` images lacking HTML width/height are not inherently defective when their parent reserves dimensions—the gallery does reserve height.
- **Files involved:** `src/components/Hero.tsx`, `Navbar.tsx`, `Footer.tsx`, `Popup-Modal.tsx`, `How-it-works.tsx`, `Showcase-grid.tsx`, `LogoSection.tsx`.
- **Recommended fix:** Preserve real aspect ratios or explicit intentional crop boxes. Match `sizes` to actual breakpoints/container widths, including navbar/footer logos. Use a suitable higher-resolution original only where needed. Investigate hero sizing and font timing when addressing the observed shift; do not claim the ratio alone caused it.

### SEO-12 — Main-site social-image dimensions are incorrect — P2

- **What is wrong:** `public/og.jpg` is **2048×758**, 54,195 bytes, but metadata declares **1200×630**. All three pages share it. The file loads successfully.
- **Why it matters:** Incorrect dimensions and a very wide crop can produce inconsistent previews. Reusing an accurate branded image across pages is acceptable; unique images are optional.
- **Files involved:** `public/og.jpg`, `src/lib/seo.ts:24`, page metadata exports.
- **Recommended fix:** Export a deliberate 1200×630 share graphic or report the real dimensions; keep text/logo inside a safe crop. Check previews on actual sharing tools. Keep OG and Twitter image URLs absolute and reachable. The external platform has the separate broken-image issue in SEO-01.

### SEO-13 — Local business identity is only partly centralized and structured — P2

- **What is wrong:** Visible footer contains a registered legal name, registration number, Padukka address, two phone numbers and two emails. Main-site JSON-LD omits postal address, legal name, registration identifier, and logo, uses only Gmail, and includes unexplained `priceRange: "$$"`. Main-body Contact lacks address, hours, and map/directions information. “Pickup in Colombo” is not explained relative to the Padukka address. No verified Maps/profile/review link is present in the source.
- **Why it matters:** Customers need a consistent business identity and clear collection/support details. `AutoPartsStore` is a LocalBusiness subtype, for which address is relevant to Google's local-business eligibility. A missing site link does **not** establish that no Business Profile exists.
- **Files involved:** `src/lib/seo.ts`, `src/components/Footer.tsx`, `TopBar.tsx`, `How-it-works.tsx`, `OrderCta.tsx`, `src/app/Contact-Us/page.tsx`, `src/app/About-Us/page.tsx`; external Google Business Profile and platform settings.
- **Recommended fix:** Confirm the business facts, put them in one source of truth, and reuse them in visible content and schema. Add the real postal address only if appropriate for the business's public location; otherwise use an honest Organization/service-area representation. Remove unsubstantiated price range. Add verified hours, directions/profile links, and labeled Sri Lanka/Japan contacts. Clarify collection location and appointment requirements. Explain that 24/7 message receipt does not necessarily mean 24/7 staffed support.
- **Local SEO action:** Check ownership/verification of the existing Business Profile, accurate real-world name/category, actual location or service area, public phone, website, and hours. Avoid a duplicate listing or keyword additions to the business name. Link to genuine Maps directions and a neutral review invitation once the profile is verified; no incentives, review gating, or invented testimonials. [Business Profile eligibility and representation rules](https://support.google.com/business/answer/3038177).

### SEO-14 — Conversion wording and destinations are inconsistent — P2

- **What is wrong:** “Local Hotline” says “Call us” but links to `wa.me`, not `tel:`. “REQUEST A PART” in navigation and “Request a Quote” in the footer open the portal homepage, whereas the home section already links directly to `/request-form`. “ORDER NOW” starts a quote conversation. About has no contextual CTA in its main content, and the Contact body does not link directly to the request form.
- **Why it matters:** Visitors should know whether a click starts a chat, places a call, requests a quote, or opens a platform. Extra steps and ambiguous action labels create avoidable friction.
- **Files involved:** `src/app/Contact-Us/page.tsx`, `src/app/About-Us/page.tsx`, `src/components/Navbar.tsx`, `Footer.tsx`, `Hero.tsx`, `OrderCta.tsx`, `PartsRequestSection.tsx`.
- **Recommended fix:** Use `tel:+94728000516` for a call action and a separately labeled WhatsApp action if both are useful. Point request-specific CTAs directly to the working request form; keep a clearly labeled platform-overview link. Prefer “Request a quotation on WhatsApp” for the hero action. Add a compact CTA after About's trust information and a direct form option on Contact. Preserve the floating mobile WhatsApp shortcut.

### SEO-15 — Green CTA text fails contrast checks — P2

- **What is wrong:** Lighthouse reports white text on `bg-green-600` at **3.21:1**, below the required 4.5:1 for the tested small text. Failing elements include “Request a Part Online,” desktop utility-bar “WhatsApp,” Contact's “Main number,” and “Message Us on WhatsApp.”
- **Why it matters:** Reduced readability affects people with low vision and users outdoors on mobile. This is an accessibility/conversion issue rather than a claim of a direct color-contrast ranking factor.
- **Files involved:** `src/components/TopBar.tsx`, `PartsRequestSection.tsx`, `src/app/Contact-Us/page.tsx`.
- **Recommended fix:** Select a darker green or another tested foreground/background pairing that meets contrast while retaining recognizable WhatsApp styling. Test default, hover, focus, and disabled states.

### SEO-16 — Form errors, fallback behavior, and data-use explanation are incomplete — P2

- **What is wrong:** Labels exist, but errors are not associated with fields using `aria-describedby`/`aria-invalid`; success/failure lacks an explicit live announcement. The form has `noValidate`, JS-only submission, and no `method`/`action`. Without hydration, native default GET submission can serialize entered name/phone/message into the current page URL. No main-site privacy link explains the contact form's data use.
- **Why it matters:** Failed scripts can undermine submission and expose contact content in URLs/history; inaccessible feedback makes correction difficult. This is a source-derived fallback risk, not a performed live submission.
- **Files involved:** `src/app/Contact-Us/ui/Contact-form.tsx`, `src/app/api/contact/route.ts`, `src/app/Contact-Us/page.tsx`, `src/components/Footer.tsx`; a business-approved privacy document or appropriate existing policy.
- **Recommended fix:** Supply an intentional safe POST/server-action fallback or prevent unusable native submission with a clear no-JS contact alternative. Associate errors, focus the first error, announce status, add appropriate autocomplete, and retain data on failure. Link an accurate policy covering this form; review whether the platform policy actually covers it before reusing that link.
- **Acceptance:** Test hydration failure without sending production messages; no personal fields enter URLs; valid labels and error associations survive keyboard/screen-reader checks.

### SEO-17 — Useful trust and service detail is thin, with overlapping process copy — P2

- **What is wrong:** Homepage repeats request/quote/delivery in two sections. About explains teams generically but has no named accountable contacts, real team/facility evidence, or linked documented examples. The gallery has three titles and identical delivery captions. Shipping “as little as 10–14 days,” “genuine only,” and OEM verification are not explained. Main-site direct-Japan language overlaps with platform text mentioning local sourcing and stock.
- **Why it matters:** Buyers need fitment, condition, authenticity, quote inclusions, shipping expectations, and after-sales details before trusting an importer. “Thin” here means unanswered customer questions, not failure to hit an arbitrary word count.
- **Files involved:** `src/components/FeaturesSection.tsx`, `How-it-works.tsx`, `PartsRequestSection.tsx`, `PartsHeader.tsx`, `Showcase-grid.tsx`, `OrderCta.tsx`, `src/app/About-Us/page.tsx`, `src/app/Contact-Us/page.tsx`.
- **Recommended fix:** Explain chassis/model/year/part-number requirements; new/used condition where relevant; what verification actually checks; how quotes account for sourcing, freight, and other charges; expected timing and exceptions; damage/warranty/cancellation procedures confirmed by the business. Describe past examples with permission and accurate compatibility/condition/context. Explain that sourcing channel is confirmed in the quote. Keep concise proof beside CTAs; place longer service detail on the new pages.

### SEO-18 — Sitemap timestamps are build timestamps, not content-change dates — P2

- **What is wrong:** `sitemap.ts` assigns `new Date()` to every URL. The live sitemap gives all three pages `2026-06-18T18:57:40.595Z`, consistent with generation/build time. Every image entry points to the same social graphic.
- **Why it matters:** Unrelated deployments can misrepresent substantive content updates. The sitemap currently covers all actual main-site content routes, so this is not a missing-page problem.
- **Files involved:** `src/app/sitemap.ts`.
- **Recommended fix:** Use genuine page-content modification dates from maintained content metadata, or omit `lastModified`. Add new canonical service pages when published. Include representative content images only where useful; an image sitemap is optional for this small site. Do not spend effort tuning `priority`/`changeFrequency` for Google, which ignores those values. [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

### SEO-19 — Cross-host duplicate content has no deliberate ownership strategy — P2

- **What is wrong:** Platform About/Contact substantially duplicate main-site pages; platform home targets broad Japanese-parts intent overlapping the marketing homepage. Current canonicals do not provide a valid consolidation strategy (SEO-01).
- **Why it matters:** Search engines and users receive competing versions of the business narrative, and independent copies can drift. Duplicate content is not automatically a penalty.
- **Files involved:** Main `src/app/About-Us/page.tsx`, `Contact-Us/page.tsx`, `src/lib/seo.ts`; external platform About/Contact/home metadata and navigation.
- **Recommended fix:** Keep the main domain as the service and company-information hub. Give platform home a clear request-tool purpose. For genuinely equivalent About/Contact pages, prefer permanent redirects to the existing main URLs if the platform UX permits; otherwise use an explicit canonical to the matching main page, or make the pages materially platform-specific and self-canonical. Never canonicalize dissimilar content merely to consolidate domains.

### SEO-20 — Performance/conversion measurement and injected-resource ownership need follow-up — P2

- **What is wrong:** Vercel Analytics is mounted, but no custom request/WhatsApp/call/form-success events or real-user CWV reporting are evident in source. Lighthouse sees an opaque same-origin script, approximately 120–126 KiB, with no effective cache lifetime and substantial unused bytes; it is not identifiable in the inspected application source/ordinary HTML script list. A third-party/hosting/browser-mediated injection is possible; ownership is unverified.
- **Why it matters:** Lab scores cannot establish actual Sri Lankan user experience or lead value. Removing an unidentified script could damage required functionality.
- **Files involved:** `src/app/layout.tsx`, relevant CTA/form components, a future measurement module; hosting/integration configuration outside this checkout for the opaque script.
- **Recommended fix:** Verify Search Console domain coverage, submitted sitemaps, URL Inspection, and CWV reports. Add minimal privacy-conscious CTA/form-result events with no names, phone numbers, chassis numbers, message text, or images. Measure referral/attribution across the portal transition. Identify the extra script in a clean browser/network capture and hosting settings before deciding on defer/cache/removal changes.

## E. Low-priority improvements

### SEO-21 — Case-sensitive URLs and generic 404 metadata need cleanup — P3

- **What is wrong:** `/About-Us` and `/Contact-Us` work; lowercase alternatives return 404. The default 404 correctly returns 404 and `noindex`, but also inherits root `index, follow`, homepage canonical, and homepage social metadata. There is no custom recovery content beyond the site shell.
- **Why it matters:** Mixed case is not itself an SEO penalty, and no main-site internal links use the broken lowercase variants. The conflicting error-page metadata is confusing to maintain; it does not override the fact that this is a real 404, not a soft 404.
- **Files involved:** `src/app/layout.tsx`, `next.config.ts`, proposed `src/app/not-found.tsx`; existing About/Contact routes; `src/lib/seo.ts`.
- **Recommended fix:** Retain existing indexed route names initially; add intentional aliases only where useful and choose lowercase slugs for new pages. If migrating existing slugs, redirect every old URL permanently and update links/canonicals/sitemap together. Make canonical metadata page-specific, keep error pages unambiguously nonindexable, and add helpful home/request/contact links. Do not redirect arbitrary missing URLs to the homepage.

### SEO-22 — A few image alternatives are generic or unnecessarily repetitive — P3

- **What is wrong:** Hero alt is “Auto parts box”; modal alt is “Logo”; car illustration is “Top view car.” Feature icons repeat adjacent headings. All main-site `<img>` elements have alt attributes, and genuine gallery photos have useful part-name alternatives. Brand-logo duplicate row already has `aria-hidden`.
- **Why it matters:** Useful alt text describes informative images for people who cannot see them; decorative images should not add noise. Keyword stuffing in alt text is unnecessary.
- **Files involved:** `src/components/Hero.tsx`, `Popup-Modal.tsx`, `How-it-works.tsx`, `FeaturesSection.tsx`, `LogoSection.tsx`, `Showcase-grid.tsx`.
- **Recommended fix:** Use a concise accurate description for the hero illustration; use the actual brand name for a meaningful logo; set decorative icons/illustrations to empty alt where their content adds nothing beyond nearby text. Keep accurate part names, adding meaningful distinguishing detail only when visible/verified.

### SEO-23 — Stable social identity URLs, metadata housekeeping, and breadcrumbs — P3

- **What is wrong:** Facebook uses a share/tracking URL; it resolves to `/zypherimports/`. Main pages omit OG locale. A long sitewide meta-keywords list is maintained even though it is not useful for Google ranking. No visible breadcrumbs or BreadcrumbList exist.
- **Why it matters:** Stable profile URLs aid identity consistency. Breadcrumbs become more useful with a service/detail hierarchy. Neither missing Twitter handles nor missing locale alone is a critical SEO defect.
- **Files involved:** `src/lib/seo.ts`, `src/components/Footer.tsx`, `src/app/layout.tsx`, proposed service/detail page components.
- **Recommended fix:** After confirming ownership, use the stable Facebook profile URL without tracking in both footer and `sameAs`. Optionally set truthful `en_LK`; add a Twitter/X handle only if a real official account exists. Remove unnecessary meta-keywords maintenance. Add visible breadcrumbs and matching BreadcrumbList to suitable inner pages; avoid fake hierarchy.

### SEO-24 — Unused assets and project documentation add maintenance noise — P3

- **What is wrong:** Unused/commented assets include `aqua-battery.png`, `yamaha-headlight.png`, `Logo.png`, `zypher-2.png`, six unused manufacturer PNG logos, and the five Next/Vercel starter SVGs in `public`. README still describes the starter/Geist setup, although the site uses Poppins/Saira. `eslint-config-next` resolves to 15.4.6 while Next is 16.0.7.
- **Why it matters:** This makes maintenance less clear. Unreferenced source assets do not necessarily ship to the client; deleting them should not be advertised as an automatic page-speed gain. Tooling/version review is maintenance, not proof of a production vulnerability.
- **Files involved:** `src/assets/*`, `public/{file,globe,next,vercel,window}.svg`, `README.md`, `package.json`, `package-lock.json`, `eslint.config.mjs`.
- **Recommended fix:** Remove only confirmed unused assets after approval, document actual routes/deployment/SEO conventions, and review compatible supported framework/lint versions together in a separate maintenance change. No dependency installation or lockfile change is part of this audit.

## F. Page-by-page SEO table

### F1. Every public content page in this repository

These are **observed final production titles**, not merely the strings passed to a metadata helper. Recommended titles below are final browser-title values, with the brand included once.

| URL / status | Current title | Recommended title | Current meta description | Recommended meta description | Priority / files |
|---|---|---|---|---|---|
| `https://www.zypherimports.lk/` — 200 | Genuine Japanese Vehicle Parts in Sri Lanka | Japanese Vehicle Parts Sri Lanka \| Zypher Imports | Order OEM verified Japanese car and bike parts in Sri Lanka. Zypher Imports sources genuine parts from Japan and delivers islandwide. | Source genuine Japanese car and bike parts with Zypher Imports. Send your vehicle details for a quotation and delivery across Sri Lanka. | P2 SEO-08; `src/app/page.tsx`, `src/lib/seo.ts`, `src/app/layout.tsx` |
| `https://www.zypherimports.lk/About-Us` — 200 | About Zypher Imports \| Zypher Imports | About Our Japan Parts Sourcing \| Zypher Imports | Learn how Zypher Imports sources genuine Japanese car and bike parts through teams in Japan and Sri Lanka, with OEM verification and reliable delivery. | Meet Zypher Imports (Pvt) Ltd and learn how our Japan and Sri Lanka teams source, verify and deliver genuine vehicle parts for local customers. | P2 SEO-08/17; `src/app/About-Us/page.tsx` |
| `https://www.zypherimports.lk/Contact-Us` — 200 | Contact Zypher Imports \| Zypher Imports | Contact & Parts Quotations Sri Lanka \| Zypher Imports | Contact Zypher Imports in Sri Lanka for genuine vehicle parts, Japan imports, part availability, and request support. | Request a quotation for Japanese car or bike parts. Contact Zypher Imports on WhatsApp, call our Sri Lanka team, or send your vehicle and part details. | P2 SEO-08/14; `src/app/Contact-Us/page.tsx` |

The proposed Contact description assumes SEO-14's call action is implemented. Existing descriptions are present and unique; these are refinements, not fixes for missing descriptions. Snippet display length varies with device and query; there is no mandatory character-count target.

| Page | Current H1 / recommended H1 | Current H2/H3 structure and issues | Canonical / social metadata | Image alt / internal-linking opportunities |
|---|---|---|---|---|
| Home | Current: **Order Genuine Vehicle Parts Directly from Japan.** Suggested: **Genuine Japanese car and bike parts in Sri Lanka**. Keep a short, prominent quotation CTA. | H2: Ready to Order Your Part?; Visit Our AI Parts Platform - Request Vehicle Parts Online; Our Genuine Parts Showcase. H3: modal Direct Deals, Maximum Savings.; Genuine Japanese Parts; Fast Shipping; Affordable Pricing; Submit Request; AI Quick Scan; Get Quote; Receive Your Part; Honda Vezel Gearbox; Genuine EXEDY Clutch Parts; Toyota Prius Suspension Kit. Four process steps are H4 and their heading is a span. One H1, no missing H1; fix hierarchy and hidden modal, SEO-09/10. | Canonical: `https://www.zypherimports.lk` (root slash equivalence is harmless). OG title = current title; OG description = current meta description; OG URL = canonical; type `website`; site_name `Zypher Imports`. Twitter `summary_large_image`, same title/description. Image on both: `https://www.zypherimports.lk/og.jpg`; declared 1200×630, actual 2048×758. | 29 img elements, including repeated logos; none missing alt. Improve generic/decorative alternatives per SEO-22. Link service cards to car parts, bike parts, motorcycle imports; showcase to real future case studies; direct request CTA to portal form. |
| About | Current: **Your trusted link to genuine vehicle parts from Japan**. Suggested: **About Zypher Imports: Japan-to-Sri Lanka parts sourcing**. | H2: We make importing vehicle parts simpler; Parts you can trust, with support you can reach. H3: Source; Verify; Deliver; Japan Team; Sri Lanka Team. Add an H2 for the team section to clarify ownership of those H3s. One H1; no repeated page-body headings found. | Canonical: `https://www.zypherimports.lk/About-Us`. OG/Twitter title `About Zypher Imports`; description = current meta description; OG URL = canonical, type `website`, site_name present; Twitter large-image card. Shared image/dimension issue above. | Only navbar/footer images, alt `Zypher Imports`; no missing alt found. Add contextual links to sourcing services, verified delivery examples, Contact and Request a Part; real team photos only if available and approved. |
| Contact | Current: **Contact Us**. Suggested: **Contact Zypher Imports for parts quotations**. | H2: WhatsApp Zypher Imports. H3: WhatsApp; Local Hotline. One H1; no duplicate body headings. Add “Send an enquiry” and “Sri Lanka contact and collection details” H2s if those sections are developed. | Canonical: `https://www.zypherimports.lk/Contact-Us`. OG/Twitter title `Contact Zypher Imports`; description = current meta description; OG URL = canonical, type `website`, site_name present; Twitter large-image card. Shared image/dimension issue above. | Only navbar/footer logos, useful alt present. Link directly to portal request form, relevant service help, approved privacy information and verified Maps directions. Label call vs WhatsApp accurately. |

Shared footer H2s are **Quick Links** and **Contact** on all three pages. Repeated navigation/footer headings are normal and are not duplicate main content. Main metadata has no `twitter:site`/`creator`; do not invent accounts to fill optional fields.

### F2. “Parts” / “Products” is currently a section, not a page

`https://www.zypherimports.lk/#products` loads the homepage and scrolls to the grid. It shares the homepage title, description, H1, canonical and social tags. The anchor exists, but it is on the grid below the separate showcase-heading section, so navigation can skip the introduction. Move the anchor to a wrapper including the heading when editing the showcase. There is no standalone `/parts` or `/products`; both returned 404. Do not add a URL fragment to the sitemap as if it were a separate page.

### F3. Publicly discovered parts-platform pages — live evidence only

The seven pages below were reachable without authentication and returned 200. This is an external dependency review, not a claim to have inspected its source or every private/system route. SEO-01 applies to the six indexable pages; Track deliberately has `noindex, nofollow` and is absent from the sitemap.

| URL | Current title → recommended title | Current description → recommended description | H1; H2/H3 findings | Current canonical → recommendation |
|---|---|---|---|---|
| `https://parts.zypherimports.lk/` | Zypher Imports \| Japanese Vehicle Parts in Sri Lanka → Request Vehicle Parts Online \| Zypher Imports | Request genuine car and motorcycle parts in Sri Lanka. Zypher Imports sources verified parts from Japan, local suppliers, and available stock. → Request car or motorcycle parts online with Zypher Imports. Add vehicle details and photos to get help with Japan sourcing, local supply and quotations. | H1: Find Any Vehicle Part - We Handle the Search from Japan. H2 “How it works” appears twice; other H2s: Smart Part Detection in Seconds, Why Choose Zypher Imports, Ready to Order Your Part?, Recently Fulfilled Requests, Ready to Request Your Part? H3 groups cover four benefits, four steps, sample Honda Civic Brake Rotor, three AI features, six reasons, three fulfilled examples. Consolidate duplicate process heading/copy. | `https://zypherimports.lk` → platform self-canonical, with distinct tool intent. |
| `https://parts.zypherimports.lk/request-form` | Request Japanese Vehicle Parts Online \| Zypher Imports → keep | Submit a vehicle part request to Zypher Imports. Get quotes for genuine car and motorcycle parts from Japan, local sourcing, or available stock in Sri Lanka. → keep | H1: Request Genuine Vehicle Parts from Japan. H2: Vehicle Information, Part Information, Contact Information, Tips for Better Results. H3: Zypher AI Quick Scan. Clear form structure; preserve it. | `https://zypherimports.lk/request-form` → platform self-canonical. Current target ends in 404. |
| `https://parts.zypherimports.lk/about-us` | About Zypher Imports \| Zypher Imports → About Our Japan Parts Sourcing \| Zypher Imports if retained | Learn how Zypher Imports sources genuine Japanese car and motorcycle parts through teams in Japan and Sri Lanka, with verification and reliable delivery. → use main About recommendation if retained as equivalent content | H1 and body H2/H3 effectively match main About. Duplicate-copy ownership needs SEO-19, not extra keywords. | `https://zypherimports.lk/about-us` → consolidate to main `/About-Us`, or make platform-specific and self-canonical. Current target ends in 404. |
| `https://parts.zypherimports.lk/contact-us` | Contact Zypher Imports \| Zypher Imports → Contact & Parts Quotations Sri Lanka \| Zypher Imports if retained | Contact Zypher Imports in Sri Lanka for genuine vehicle parts, Japan imports, part availability, and request support. → use main Contact recommendation if retained as equivalent content | H1 Contact Us; H2 WhatsApp Zypher Imports; H3 WhatsApp, Local Hotline. Main Contact overlap. | `https://zypherimports.lk/contact-us` → consolidate to main `/Contact-Us`, or make platform-support-specific and self-canonical. Current target ends in 404. |
| `https://parts.zypherimports.lk/privacy` | Privacy Policy \| Zypher Imports → keep | Read how Zypher Imports collects, uses, and protects customer information for vehicle part requests, quotes, and order support. → keep, provided policy accurately covers the actual practices | H1 Privacy Policy. H2: Information We Collect; How We Use Your Information; Sharing Information; Data Storage and Security; Your Choices; Contact Us. No body H3 needed. | `https://zypherimports.lk/privacy` → platform self-canonical unless deliberately moved to an equivalent published main-site policy. Current target ends in 404. |
| `https://parts.zypherimports.lk/terms` | Terms of Service \| Zypher Imports → keep | Read the terms for using Zypher Imports to request, quote, source, import, and receive vehicle parts in Sri Lanka. → keep, subject to business review | H1 Terms of Service. H2: Use of Our Website; Part Requests and Quotes; Part Identification; Orders, Payments, and Cancellations; Shipping and Delivery; Used, Genuine, and Imported Parts; Website Content; Limitation of Liability; Contact. | `https://zypherimports.lk/terms` → platform self-canonical unless deliberately moved. Current target ends in 404. |
| `https://parts.zypherimports.lk/track` | Track Your Part Request \| Zypher Imports → keep | Track the status of a Zypher Imports vehicle part request using your request ID. → keep | H1 Track Your Request; no body H2/H3 needed for this short utility. Keep private results protected; no request ID was entered. | `https://zypherimports.lk/track`; for a noindex utility omit the unnecessary canonical or make it self-referential. Preserve intentional exclusion from search. |

**Platform social and image findings by page:** Home OG/Twitter titles match its full title. Request uses `Request Japanese Vehicle Parts Online`; About `About Zypher Imports`; Contact `Contact Zypher Imports`; Privacy `Privacy Policy`; Terms `Terms of Service`. Their OG/Twitter descriptions match the corresponding current descriptions above. The six pages use `website`, site name Zypher Imports, locale `en_LK`, a large-image Twitter card, and OG URLs on the wrong apex host. All six use `https://zypherimports.lk/images/hero-parts.png`, which redirects to a 404. Track is a noindex utility; no social optimization is needed. Its metadata should not encourage sharing private request results.

Track also emits OG/Twitter title `Track Your Part Request`, its current description from the table, OG URL `https://zypherimports.lk/track`, and the same broken image/large-card configuration. Correct the shared base configuration while retaining noindex; no acquisition copy is needed for this utility.

Platform About/Contact/Privacy/Terms/Track have header/footer logos with nonempty alt (`Zypher Imports Logo` / `Zypher Imports`); the footer logo uses `sizes="100vw"` despite being a small logo. Home's 51 and request-form's 15 image elements all have alt attributes in the fetched HTML, but visual/semantic accuracy of every platform illustration was not fully audited. The main-site generic-alt recommendations should not be automatically applied to unseen platform component code. Apply SEO-11's small-logo sizing principle in the external project after locating its actual footer component.

**Platform internal links:** Keep Home → Request a Part and request instructions prominent, with clear links back to main service explanations. If About/Contact consolidate, update platform navigation to the final destinations. Keep privacy/terms accessible beside request submission. Tracking is for existing customers and should not compete with the acquisition CTA. Platform footer H3s “Quick Links” and “Contact” are shared chrome, not a reason to add more headings to short utility pages.

### F4. Technical URL and link evidence

| Tested URL / class | Observed result | Assessment |
|---|---|---|
| HTTPS www `/`, `/About-Us`, `/Contact-Us` | 200, one canonical each; `index, follow`; no X-Robots-Tag blocking indexing | Pass for technical eligibility, not proof of indexing. |
| Main `/robots.txt` | 200 text/plain; `User-Agent: *`, `Allow: /`; Host and Sitemap use HTTPS www | Crawlable; do not block `/_next/` assets. Host directive does not replace canonical/redirect signals. |
| Main `/sitemap.xml` | 200 XML; the three working content URLs | Coverage passes; improve timestamps, SEO-18. |
| `http://www.zypherimports.lk/` | 308 → HTTPS www | Pass. |
| `http://zypherimports.lk/` | 308 → HTTPS apex → 307 → HTTPS www | Works; permanent consolidation/hop improvement, SEO-07. |
| `https://zypherimports.lk/About-Us?audit=1` | 307 → same path/query on www | Path/query preserved; temporary status should become permanent. |
| `/About-Us/`, `/Contact-Us/` | 308 → corresponding slashless path | Pass; do not introduce a competing slash convention. |
| `//About-Us` | 308 → `/About-Us` | Normalized. |
| `/about-us`, `/ABOUT-US`, `/contact-us` | 404 | Case-sensitive; optional intentional aliases, SEO-21. |
| `/?utm_source=seo-audit` | 200; canonical remains clean homepage | Appropriate parameter canonicalization; preserve attribution where useful. |
| `/seo-audit-nonexistent-20261003`, `/parts`, `/products` | 404, default error content and noindex | Genuine missing pages, not soft 404s; inherited metadata cleanup, SEO-21. |
| Internal unique navigation hrefs | `/`, `/About-Us`, `/Contact-Us`, `/#products`; all pages/anchor exist | No broken main-site internal navigation found. |
| All 10 unique main-site HTTP(S) outbound destinations | Final 200: platform home/form, four WhatsApp URL variants, Facebook, Instagram, TikTok, Thrive | No confirmed broken HTTP destination. 200 is not proof of account ownership, WhatsApp delivery, or unrestricted social content. |
| Facebook share URL | Redirected to `https://www.facebook.com/zypherimports/` with tracking | Replace with verified stable profile, SEO-23. |
| Main-site displayed image URLs | All 19 unique image URLs fetched successfully; raster optimizer returned WebP; SVGs returned SVG | No broken image response found. Large source/file issues remain. |
| Main `/og.jpg` | 200 JPEG, 2048×758 | Dimensions disagree with metadata. |
| Platform canonical targets for request/privacy/terms and social/schema images | Redirect to main www, then 404 | Confirmed cross-host metadata defect, SEO-01. |

`tel:` and `mailto:` links are syntactically suitable; calls/emails were not initiated. No production contact POST was made. Private admin/login/result routes were not crawled. Robots disallow is not authentication and can prevent a crawler seeing `noindex`; keep private request data protected independently and verify the platform's utility-page exclusion strategy in its own project.

## G. Recommended new pages / landing pages

The following paths are proposals, not existing URLs. Use lowercase for new paths. Prioritize genuine service breadth over page count. These implement SEO-06/17; do not publish empty shells solely to get more URLs indexed.

| Proposed page / priority | Primary search intent | Proposed final title / H1 | Useful content and conversion path | Proposed source |
|---|---|---|---|---|
| `/car-parts-from-japan` — P1 | Japanese auto parts Sri Lanka; genuine car parts Sri Lanka; car parts from Japan to Sri Lanka | Title: Car Parts from Japan to Sri Lanka \| Zypher Imports. H1: Genuine Japanese car parts for Sri Lanka | Describe supported sourcing categories, actual makes/models, chassis and OEM number matching, new/used condition, rare/replacement sourcing, verification, quote inclusions and realistic delivery process. Link relevant documented imports. Request a Part → portal form; WhatsApp alternative. | `src/app/car-parts-from-japan/page.tsx` |
| `/japanese-bike-parts` — P1 | Japanese bike parts Sri Lanka; motorcycle parts from Japan | Title: Japanese Bike Parts Sri Lanka \| Zypher Imports. H1: Japanese motorcycle parts sourced for Sri Lanka | Distinguish motorcycle parts from complete bikes. Include model/year/frame/engine-code requirements where applicable, actual component categories, condition/fitment checks, realistic sourcing limits and helpful photo examples. Request a bike part → portal form. | `src/app/japanese-bike-parts/page.tsx` |
| `/motorcycle-imports-from-japan` — P1, subject to service readiness | Motorcycle imports from Japan to Sri Lanka | Title: Motorcycle Imports Japan to Sri Lanka \| Zypher Imports. H1: Motorcycle imports from Japan to Sri Lanka | Explain the actual sourcing/quotation service, new vs used scope, inspection evidence, documents, freight and handover responsibilities, and costs confirmed case by case. Publish actual examples/listings only with evidence. Use a motorcycle-specific quotation enquiry; do not send complete-bike buyers into an incompatible parts-only form. | `src/app/motorcycle-imports-from-japan/page.tsx` |
| `/parts` — P2, optional service hub | Broad parts categories / browse sourcing services | Title: Japanese Car & Bike Parts \| Zypher Imports. H1: Find the Japanese vehicle parts you need | Useful only if it helps visitors choose car parts, bike parts or rare-part sourcing. Link the two service pages, request form and evidence. Label past imports as examples. Avoid another generic homepage clone. Can replace the Products nav anchor once genuinely useful. | `src/app/parts/page.tsx` |
| `/how-to-order` — P2, only when enough unique help exists | How to order vehicle parts from Japan | Title: How to Order Parts from Japan \| Zypher Imports. H1: How to request and order your vehicle part | Request checklist, photo guidance, compatibility confirmation, quote stages, actual payments/delivery/support process. Explain how to identify a part number, not just repeat four short homepage steps. | `src/app/how-to-order/page.tsx` |
| `/imports/[slug]` or equivalent — P2, evidence-dependent | Specific fulfilled sourcing stories | Unique descriptive part/model title; H1 describing the real request | Real photos, actual problem, verified fitment/condition, sourcing checks and delivery context with consent. Link back to relevant service and “Request a similar part.” Use honest editorial content, not current Product/Offer claims. | Future case-study route/content model; do not generate empty model pages. |

Suggested service descriptions:

- **Car:** “Source genuine Japanese car parts for Sri Lanka. Send your chassis number, part details and photos to Zypher Imports for sourcing help and a quotation.”
- **Bike parts:** “Request genuine Japanese motorcycle parts for Sri Lanka. Share your bike model, year and part details for sourcing support from Zypher Imports.”
- **Motorcycle imports:** “Ask Zypher Imports about sourcing and importing a motorcycle from Japan to Sri Lanka. Discuss your requirements, inspection, shipping and a tailored quotation.” Publish only when the offered service matches this wording.

Do not state that every motorcycle is importable or give fixed duty/eligibility promises without checking current official Sri Lankan rules at implementation time. This audit does not establish legal import eligibility. If the service is still preparatory, say so clearly and collect appropriate enquiries without presenting nonexistent inventory.

Keep broad “genuine Japanese vehicle parts Sri Lanka” and “Japan vehicle parts importer Sri Lanka” intent on the homepage/About narrative. Use car and bike pages for their respective transactional intent. No need for separate pages for every phrasing of the same search.

Sinhala/Tamil content may help when customer demand and human review support it. Start with useful translated service/contact information, not automatic copies or city doorway pages. Add reciprocal hreflang only when real equivalent translated URLs exist; language alternatives are not currently required for this English-only site.

## H. Structured-data recommendations

### Existing implementation

| Location | Existing JSON-LD | Assessment / action |
|---|---|---|
| Every main page via `src/app/layout.tsx` / `src/lib/seo.ts` | Graph with `AutomotiveBusiness` + `AutoPartsStore` entity `/#business`, and `WebSite` `/#website` | JSON parses; consistent entity references are a good foundation. `AutoPartsStore` is already a local-business/organization subtype; do not create a second disconnected Organization merely to add more schema. Complete truthful identity/location data per SEO-13. |
| Homepage `src/app/page.tsx` | `Service` with provider reference and Sri Lanka area; nested `OfferCatalog` with three products | Keep Service; remove unsupported current-offer representation, SEO-04. |
| About | `AboutPage`, `isPartOf` WebSite, `about` business | Appropriate. Keep URLs aligned if paths change. |
| Contact | `ContactPage`, business references | Appropriate. Add matching visible business/contact details. |
| Portal home/request, live sampled | `AutoPartsStore` and `Service`; more address/legal detail than main site | Fix URLs/images and harmonize verified entity facts. Portal includes Sinhala and Japan service-area assertions absent/different on main schema; verify they describe actual support/delivery, not merely procurement location. Source not available. |

### Truthful target model

1. **Business entity:** Keep one stable ID such as `https://www.zypherimports.lk/#business`. Use `AutoPartsStore` if it accurately represents the actual local business; otherwise use Organization with an honest sourcing service. Add verified `legalName`, registration `identifier`, working logo, preferred contact email, clearly labeled phone contact points, and Sri Lanka service area. A procurement team in Japan does not automatically establish a Japanese retail branch.
2. **Local details:** Add a structured PostalAddress matching the public address only after confirming its use. Add `openingHoursSpecification`, `hasMap`, or coordinates only when verified. Do not infer 24/7 staffed hours from the ability to receive messages at any time. Omit `priceRange` unless it has a meaningful factual basis. [Google LocalBusiness requirements](https://developers.google.com/search/docs/appearance/structured-data/local-business).
3. **WebSite:** Retain main WebSite. If describing the parts tool as a separate website, give it a distinct platform `@id`/URL and the same verified publisher entity. Do not add a fictional site search or `SearchAction`.
4. **BreadcrumbList:** Add only with a real page hierarchy and visible corresponding navigation, e.g. Home → Car Parts, or Home → Import Stories → a real story. Two/three meaningful items are sufficient. No need to add breadcrumbs to the homepage. [Google's relevant ecommerce schema overview](https://developers.google.com/search/docs/specialty/ecommerce/include-structured-data-relevant-to-ecommerce).
5. **Service:** Separate genuine car-parts, bike-parts and motorcycle-import services can have accurate Service entities referencing the same business. This is descriptive markup, not a promise of a dedicated Google rich result.
6. **Product:** Only on an actual specific product/motorcycle listing with visible photos and facts. Do not invent price, currency, availability, SKU, GTIN, condition, reviews or stock merely to satisfy a validator. If no current listing exists, omit Product/Offer rather than manufacturing one.
7. **Reviews:** No fake `AggregateRating`, self-serving local-business star markup, or copied third-party reviews presented as independently collected ratings. Verified testimonials can be displayed with permission and appropriate attribution without promising review stars.

After implementation, use Schema.org Validator for vocabulary/graph correctness and Google's Rich Results Test for supported Google features. Absence of a recognized rich-result type for Service is not itself a schema error. Check the rendered production HTML as well as source.

## I. Core Web Vitals / performance recommendations

### Measured Lighthouse baseline

Local CLI runs used Lighthouse **13.5.0**, headless Chrome **154**, with default simulated throttling. Mobile emulation: **412×823**, DPR **1.75**, 4× CPU slowdown, 150 ms target RTT and 1,638.4 Kbps target throughput. Homepage desktop used Lighthouse's desktop preset. All four reports returned no run warnings. These are one-time lab samples collected on 3 October 2026, not historical field data or an all-device guarantee.

| Page / mode | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS | Total transfer |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Home mobile, 20:26 LK | 73 | 94 | 100 | 100 | 1.8 s | 6.7 s | 30 ms | 0 | 1,830 KiB |
| Home desktop, 20:27 LK | 96 | 94 | 100 | 100 | 0.9 s | 1.2 s | 0 ms | 0.049 | 1,792 KiB |
| About mobile, 20:27 LK | 93 | 100 | 100 | 100 | 1.6 s | 3.0 s | 20 ms | 0 | 435 KiB |
| Contact mobile, 20:28 LK | 93 | 96 | 100 | 100 | 1.7 s | 3.0 s | 110 ms | 0 | 430 KiB |

**Interpretation:** Lighthouse SEO 100 does not evaluate content strategy, real indexing, business truth, the external portal's canonicals, or all structured-data quality. Accessibility 100 on About does not negate the shared hidden-menu issue found manually. Homepage mobile's LCP is poor in this sample; About/Contact's 3.0 s is above the good threshold. Small mobile TBT is encouraging but is **not INP**.

**Field CWV status: unverified.** PageSpeed Insights' API returned HTTP 429, and no Search Console/CrUX account data was available. Do not label the site as passing or failing real-user CWV based on these runs. Good field targets are LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1 at the 75th percentile, segmented appropriately by device. [Core Web Vitals thresholds](https://web.dev/articles/defining-core-web-vitals-thresholds).

### Image evidence and actions

Source bytes below are file sizes, not necessarily browser transfer. The site already serves optimized WebP for raster images. A request to the largest `src` fallback is not proof that a browser selects that candidate; Lighthouse's observed selected URL is the better delivery evidence.

| Asset | Source dimensions / bytes | Observed delivery / problem | Action |
|---|---|---|---|
| `src/assets/subaru.svg` | 1021×617 / 1,618,135 | 1,173,105-byte mobile transfer; embedded raster content | SEO-02: replace/optimize first. |
| `src/assets/prius-suspension-kit.jpg` | 1200×900 / 495,794 | Lighthouse mobile selected `w=750` WebP, 117,716 resource bytes; estimated ~69,701-byte saving for this image | SEO-03/11: lazy load, improve compression/candidate sizing; preserve readable details. |
| `src/assets/hero-parts.png` | 423×636 / 356,138 | Raster delivered as WebP; hero is LCP; wrong square HTML ratio | SEO-03/11: correct ratio and sizes; keep high-priority strategy limited to actual LCP need. |
| `src/assets/vezel-gearbox.png` | 334×300 / 217,244 | WebP response ~27,188 bytes in tested image requests; low-resolution original displayed in a large card | SEO-11: avoid needless upscale; use a better original if available, not fabricated detail. |
| `src/assets/logo-no-bg-cropped.png` | 1757×990 / 162,642 | `w=640` WebP 27,124 bytes; Lighthouse estimates ~22,561 bytes unnecessary for footer display | SEO-11: accurate responsive sizes and small logo candidate. |
| `src/assets/How-it-works-banner.png` | 458×443 / 130,253 | ~10,126-byte WebP in tested request; eager though below fold, mismatched declared ratio | SEO-03/11: lazy load and intentional dimensions. |
| `src/assets/exedy-clutch-parts.jpg` | 720×576 / 107,251 | WebP response ~44,380 bytes in tested fallback request; eager gallery image | SEO-03: lazy load; tune after measuring actual candidate. |
| `public/og.jpg` | 2048×758 / 54,195 | Public JPEG works; metadata says 1200×630 | SEO-12: correct social crop/dimensions. |

Other brand SVGs are around 1.2–5.8 KB and are not comparable to the Subaru problem. Feature icons are small; removing eager priority is more useful than spending time shaving a few bytes. Image filenames such as `vezel-gearbox` and `prius-suspension-kit` are descriptive; generic `icon1` names are low importance for decorative assets. Public starter assets are unused, not measured load bottlenecks.

### Ordered performance work

1. **P1 SEO-02/03:** Replace the Subaru asset, remove unnecessary preloads/eager loading, and verify the hero remains directly discoverable. Mobile homepage measured 47 requests and ~1.87 MB transfer, of which images were ~1.45 MB.
2. **P2 SEO-11:** Correct image ratios and `sizes`, compress the gallery, and inspect the desktop hero shift. Existing fixed-height gallery containers already reserve space; do not remove this protection.
3. **P2 SEO-20:** Identify the opaque blocking script before changing it. Lighthouse estimated roughly 660 ms render-blocking savings on mobile home and 700–880 ms on inner pages. These are modeled opportunities, not additive guaranteed speedups. The app's two measured CSS files totaled only about 9 KB on home; blindly removing CSS is not the first intervention.
4. **P2 SEO-03/20:** Inspect hydration boundaries: keep static hero content server-rendered where practical and isolate only interactive banner/modal behavior. Defer optional interaction code carefully. Maintain mobile navigation responsiveness and accessible form feedback. Homepage scripts transferred about 274 KB in the run, including the unidentified runtime resource.
5. **P3 SEO-24:** Review font weights and unnecessary client dependencies after larger fixes. `next/font` already self-hosts fonts; no need to recommend an external Google Fonts preconnect. Four measured font requests totaled about 58 KB. Do not remove brand typography without a measured reason.
6. **P2 SEO-20:** Track real-user LCP/INP/CLS without personal data, compare lab medians, and use Search Console's field report after sufficient traffic/time. Do not promise an immediate field-score change.

AVIF can be evaluated for photographic images if supported by the chosen Next/image configuration, but WebP is already active and should not be described as missing. Compare quality, first-transform latency and cache behavior before enabling another format. Keep explicit image sizing/lazy-loading improvements regardless of output format. [Next.js image guidance](https://nextjs.org/docs/app/api-reference/components/image).

## J. Exact implementation plan

**No implementation has been performed.** This sequence is ready for review. Do not combine a content expansion, URL migration and dependency upgrade into an unreviewable change.

| Step | Change / issue IDs | Exact files or owner | Verification / exit condition |
|---|---|---|---|
| 1 | Agree main-domain vs platform ownership; inventory deployed environment origins. SEO-01/19. | Main `src/lib/seo.ts`; external platform owner/repository; Vercel domain configuration. | Confirm marketing site stays HTTPS www; distinct request tool stays HTTPS parts; record which About/Contact copy owns indexing. |
| 2 | Correct platform metadata, sitemap, robots, OG/schema images. SEO-01. | Locate actual external site config/metadata/robots/sitemap files; do not change correct main-site CTA hosts as a workaround. | GET all six sitemap pages and canonical targets; zero canonical-to-404/image-to-404 paths; noindex utilities excluded; URL Inspection checks after deployment. |
| 3 | Handle email-provider failures and safe form fallback. SEO-05/16. | `src/app/api/contact/route.ts`; `src/app/Contact-Us/ui/Contact-form.tsx`. | Local/staging mocked provider error/success/network cases; correct status, preserved input, accessible errors; no production email during automated verification. |
| 4 | Replace the large SVG and fix image scheduling/sizing. SEO-02/03/11. | `src/assets/subaru.svg` or replacement; `LogoSection.tsx`, `Hero.tsx`, `FeaturesSection.tsx`, `How-it-works.tsx`, `Showcase-grid.tsx`, `Navbar.tsx`, `Footer.tsx`, `Popup-Modal.tsx`. | Verify visual appearance, actual dimensions/srcset selection and lazy loading at 320/390/768/1440 widths; Lighthouse before/after medians; no new CLS or broken images. |
| 5 | Remove inaccurate offer catalog; complete verified business schema. SEO-04/13/23. | `src/app/page.tsx`, `src/lib/seo.ts`, `src/app/layout.tsx`, About/Contact JSON-LD; external platform entity alignment. | Schema parses and validates; visible facts match; no fake offers/reviews/hours/prices; all referenced URLs load. |
| 6 | Fix titles, headings, social image and sitemap dates. SEO-08/09/12/18. | `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/sitemap.ts`, `src/lib/seo.ts`; About/Contact pages; `FeaturesSection.tsx`, `How-it-works.tsx`, `PartsHeader.tsx`, `Showcase-grid.tsx`, `public/og.jpg`. | Rendered page table matches approved values; exactly one intended canonical/title/description; proper heading nesting; real image dimensions; lastmod reflects content changes or is omitted. |
| 7 | Repair accessible interactions, contrast and CTA labels. SEO-10/14/15/16. | `Navbar.tsx`, `Popup-Modal.tsx`, `Hero.tsx`, `TopBar.tsx`, `PartsRequestSection.tsx`, `Footer.tsx`, `src/app/globals.css`, `src/app/layout.tsx`, About/Contact pages/form. | Keyboard, focus restoration, hidden states, 200% zoom, reduced motion, readable contrast, direct request-form link and correctly labeled tel/WhatsApp destinations. |
| 8 | Expand truthful local/trust information. SEO-13/17. | `src/lib/seo.ts`, About/Contact pages, `Footer.tsx`, `FeaturesSection.tsx`, `OrderCta.tsx`, `How-it-works.tsx`; Business Profile owner. | Confirm public address/collection arrangement, names, numbers, preferred email, actual response hours, verification/condition/returns facts and profile ownership before publishing. |
| 9 | Publish car parts, bike parts, then motorcycle imports service page when ready. SEO-06/17. | New files in G; `Navbar.tsx`, `Footer.tsx`, home sections, `src/app/sitemap.ts`; optional shared breadcrumb component. | Distinct useful content, unique metadata/H1, self-canonical 200, internal links, appropriate quotation flow, accurate schema. No unsupported inventory or legal promises. |
| 10 | Make preferred-host redirect permanent; clean up error metadata/intentional aliases. SEO-07/21. | Vercel domain settings; `next.config.ts` if needed; `src/app/layout.tsx`; proposed `src/app/not-found.tsx`. | Test HTTP/HTTPS, www/apex, deep links/query strings, slash/case variants and random 404; no portal host capture, loops or homepage redirects for missing content. |
| 11 | Add lean measurement and identify runtime overhead. SEO-20. | `src/app/layout.tsx`, CTA/form components, future measurement helper; Search Console/analytics/hosting owner. | Events distinguish CTA clicks from provider-accepted requests; no personal information in events; verify platform transition attribution; investigate unidentified script in a clean environment. |
| 12 | Optional housekeeping, stable profiles and evidence content. SEO-22/23/24. | Image components, `src/lib/seo.ts`, `Footer.tsx`, unused assets, README, separately reviewed dependency/tooling files. | No broken references; meaningful alt text; real social profiles; compatible toolchain; remove unused files only when confirmed. |

### Release acceptance checklist

- Run the project's lint and production build after approved changes; do not infer that a clean source audit substitutes for a build. Build/lint were not needed to create this audit and were not run here.
- Re-fetch every main page, new page, portal canonical target, robots and sitemap with redirects visible. Assert HTTP status, canonical host/path, robots policy, unique metadata, and correct social image content type/dimensions.
- Recheck all internal links and anchors, plus primary quotation/WhatsApp/telephone destinations. Do not send real customer requests as a crawler side effect.
- Validate JSON-LD and compare it with visible facts. Keep genuine 404s and protect/noindex private results appropriately.
- Repeat Lighthouse mobile three times on each changed template and compare medians; sample desktop. Inspect actual network/image choices, not just score changes. Recheck keyboard and mobile layout manually.
- After deployment, submit the correct host-specific sitemaps, inspect representative URLs in Search Console, and monitor indexing/selected canonicals, organic landing pages and meaningful enquiries. Baseline and compare performance over a suitable field-data window; avoid promising rankings or lead counts.

### Evidence retention and limits

Raw HTML/crawl extracts and the four Lighthouse JSON reports were kept in the local temporary folder under `zypher-seo-*` names, outside the repository. Core measurements and observations are reproduced in this document so it remains useful if temporary files are cleared. No code, assets, settings, contacts, Business Profile data or production content were changed. This audit does not certify email delivery, legal import eligibility, real stock, actual reviews, account ownership, or Google indexing; the specific follow-up checks above address those limits.
