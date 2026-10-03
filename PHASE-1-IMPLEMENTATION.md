# Phase 1 implementation — Zypher Imports

Completed locally on 3 October 2026, following `SEO-AUDIT.md` and the approved Phase 1 scope. No deployment, commit, dependency upgrade, new public route, external parts-application change, or real email enquiry was made. The audit is unchanged.

## Changes and audit coverage

| Issue | Result | Implementation and files |
|---|---|---|
| **SEO-05 — P1** | Resolved in code; real provider configuration still needs owner verification | `src/app/api/contact/route.ts` inspects Resend's returned `data` and `error`. Only an error-free response with a message ID returns `{ ok: true }`. Returned rejection/missing acceptance ID returns 502; thrown failures return 500. Public responses and logs use controlled messages without raw provider diagnostics. |
| **SEO-16 — P2, safe portion** | Implemented | `src/app/Contact-Us/ui/Contact-form.tsx` retains values on failure, requires both HTTP success and `ok: true`, blocks pending duplicate submits, gives a clickable WhatsApp fallback, and resets only after acceptance. Success explicitly says “accepted for sending,” without promising inbox delivery. Added linked field errors, `aria-invalid`, `aria-describedby`, autocomplete, pending/success announcements, an error alert, and focus on the first invalid field. Native fallback uses POST rather than putting customer data in a GET URL; a no-JavaScript notice directs users to WhatsApp. Privacy/retention explanations remain deferred. |
| **SEO-02 — P1** | Resolved | Replaced `src/assets/subaru.svg` with `src/assets/subaru.webp`, updated `LogoSection.tsx`, and removed the unused oversized SVG. The replacement was rendered from the existing supplied mark, with transparency and full artwork retained; no redesigned/unofficial mark was introduced. Source size: **1,618,135 → 16,608 bytes** (about 99% smaller), dimensions 480×290. Visually checked against the original. |
| **SEO-03 — P1** | Image scheduling implemented; further performance work remains | `Hero.tsx` keeps the mobile LCP image discoverable in initial HTML with `loading="eager"` and `fetchPriority="high"`. Removed competing `priority` hints from navbar/footer/features/process/gallery. Navbar logo remains normally eager; lower content is lazy. Next.js 16's supported eager/fetch-priority approach is used without an additional hero preload. Median lab LCP is improved but remains above the audit's 2.5-second development target. |
| **SEO-11 — P2, safe portion** | Implemented | Corrected real intrinsic dimensions and responsive `sizes` in `Hero.tsx`, `Navbar.tsx`, `Footer.tsx`, `Popup-Modal.tsx`, `FeaturesSection.tsx`, `How-it-works.tsx`, `LogoSection.tsx`, and `Showcase-grid.tsx`. Hero 423×636, primary brand logo 1757×990, popup logo 138×49, feature icons 60×61, process illustration 458×443. Intentional contain/crop containers remain; gallery fixed heights and card layout are preserved. Hero sizes account for its constrained grid column rather than blindly advertising the nominal 600px class. Higher-resolution gallery originals and further compression remain deferred. |
| **SEO-04 — P1** | Resolved | Removed homepage `hasOfferCatalog`, nested Offer entities and Product entities for past deliveries in `src/app/page.tsx`. Kept Service/provider/Sri Lanka information and the visible delivered examples. Removed the existing unsupported `priceRange` from `src/lib/seo.ts`; added no stock, prices, SKUs, GTINs, reviews, ratings or new offers. |
| **SEO-08 — P2** | Resolved | Updated all three page titles and descriptions to section F's recommendations. `src/lib/seo.ts` uses absolute titles to avoid repeating the brand through the layout template. Browser and server-rendered HTML checks confirm the final titles below. OG/Twitter titles and descriptions match. |
| **SEO-09 — P2** | Resolved for the approved pages | Added an accessible H2 above feature H3s, a “How to order parts from Japan” H2 while keeping the visible vertical “How it works” styling, H3 process steps, and a team H2 in About. The `#products` section now includes both showcase heading and cards (`page.tsx`, `PartsHeader.tsx`, `Showcase-grid.tsx`). Each public page has one H1; the closed dialog is absent from the accessibility tree. |
| **SEO-10 — P2** | Implemented; broader browser/assistive-technology verification remains | Closed mobile menu is `inert` and `aria-hidden`; Escape from menu links closes it and restores trigger focus (`Navbar.tsx`). Popup uses native modal `<dialog>` with matching trigger `aria-controls`/dialog ID, a labeled heading, close-button focus, Escape handling, native background inertness/focus containment, scrolling protection and trigger-focus restoration (`Popup-Modal.tsx`, `Hero.tsx`). Added a skip-to-content link and matching main targets. `globals.css` respects reduced motion for smooth scrolling, marquee and transitions. Logo marquee retains normal animation, pauses on hover/focus, and has an accessible persistent pause checkbox (`LogoSection.tsx`). |
| **SEO-15 — P2** | Resolved for identified white-on-green controls | Changed green CTA/badge surfaces from green-600 to green-700, with green-800 hover states, in `TopBar.tsx`, `PartsRequestSection.tsx`, and Contact. Preserved the WhatsApp identity and floating shortcut. All three final homepage Lighthouse runs pass automated contrast checks (accessibility 100). |
| **SEO-14 — P2, safe portion** | Implemented | Local Hotline uses `tel:+94728000516` in Contact. Navbar request links and footer quote link now go directly to `https://parts.zypherimports.lk/request-form`. Existing “Request a Part Online” already uses that destination; “Visit Parts Platform” retains the portal homepage. Hero now says “Request a Quote on WhatsApp” for its existing WhatsApp destination. Existing telephone/WhatsApp numbers and floating shortcut are retained. Broader CTA placement/copy decisions remain deferred. |
| **SEO-12 — P2** | Resolved locally; live share-cache refresh requires deployment | `public/og.jpg` is now an actual **1200×630 JPEG**, **34,715 bytes**. Deliberately contained the existing branded artwork on a black 1200×630 canvas so its text, vehicle illustrations and logo stay intact without cropping or new claims. Existing metadata declares the matching dimensions. Local response is 200 with `image/jpeg`; OG and Twitter reference the production `/og.jpg` URL. |
| **SEO-18 — P2, safe portion** | Resolved | `src/app/sitemap.ts` omits `lastModified` because reliable maintained content dates are unavailable. Sitemap still contains only `/`, `/About-Us`, and `/Contact-Us`. Robots remains unchanged and points to the production sitemap. |

“Resolved” describes the selected repository changes, not a claim that all 24 audit findings or production SEO/indexing are resolved.

## Final rendered page metadata

| Route | Browser title | Description |
|---|---|---|
| `/` | Japanese Vehicle Parts Sri Lanka \| Zypher Imports | Source genuine Japanese car and bike parts with Zypher Imports. Send your vehicle details for a quotation and delivery across Sri Lanka. |
| `/About-Us` | About Our Japan Parts Sourcing \| Zypher Imports | Meet Zypher Imports (Pvt) Ltd and learn how our Japan and Sri Lanka teams source, verify and deliver genuine vehicle parts for local customers. |
| `/Contact-Us` | Contact & Parts Quotations Sri Lanka \| Zypher Imports | Request a quotation for Japanese car or bike parts. Contact Zypher Imports on WhatsApp, call our Sri Lanka team, or send your vehicle and part details. |

Each page returns 200 locally, has one title/H1, and keeps its corresponding production-www canonical. Next serializes the root canonical as `https://www.zypherimports.lk` (equivalent to the root URL with `/`); child canonicals retain their established route spelling. No URL migration was made. All rendered JSON-LD parses; the existing business/WebSite graph and page entities remain. There are no Product/Offer/priceRange/rating entities in the inspected output.

## Lighthouse before and after

Final runs used **Lighthouse 13.5.0**, **headless Chrome 154 on Windows**, default mobile simulation **412×823, DPR 1.75**, **4× CPU slowdown**, **150 ms RTT**, and **1,638.4 Kbps throughput**. These match the audit profile. URL tested: `http://127.0.0.1:3100/`, served by `next start` after the final production build. Fresh Lighthouse browser/storage state was used for each run; local server image cache was not purged between runs. All reports have no run warnings.

| Measurement | Audit: production single run | Final run 1 | Final run 2 | Final run 3 | Final median |
|---|---:|---:|---:|---:|---:|
| Performance | 73 | 92 | 93 | 93 | **93** |
| Accessibility | 94 | 100 | 100 | 100 | **100** |
| Best practices | 100 | 96 | 96 | 96 | **96** |
| SEO | 100 | 100 | 100 | 100 | **100** |
| FCP | 1.8 s | 1.069 s | 1.061 s | 1.059 s | **1.061 s** |
| LCP | 6.7 s | 3.273 s | 3.177 s | 3.173 s | **3.177 s** |
| TBT | 30 ms | 29 ms | 33 ms | 27.5 ms | **29 ms** |
| CLS | 0 | 0 | 0 | 0 | **0** |
| Total transfer | ~1,830 KiB | 360.881 KiB | 360.878 KiB | 360.878 KiB | **~361 KiB** |

Final run timestamps: 2026-10-03 15:46:54, 15:47:10, 15:47:24 UTC (21:16:54, 21:17:10, 21:17:24 Sri Lanka time). Median transfer is 369,539 bytes. Against the supplied rounded baseline, this is +20 performance points, about 53% lower LCP and about 80% lower initial transfer.

**Comparison limits:** The baseline was one deployed-production sample, whereas these three runs use localhost. Hosting/CDN latency, runtime resources, compression and third-party behavior differ; this is not a controlled production-before/after experiment. Lazy loading reduces initial navigation transfer; gallery and other lower images still load when approached/scrolled, so this figure is not the full page's eventual transfer. The asset-size reduction itself is directly attributable to the replacement.

The local best-practices score of 96 is caused by the existing Vercel Analytics request to `/_vercel/insights/script.js` returning 404 outside Vercel. Analytics was preserved. This should be checked on the actual deployed host before treating it as a production regression.

**Remaining performance work:** Lab LCP is still above 2.5 seconds. The reports retain render-blocking CSS/unused-JavaScript opportunities. Further investigation of hydration boundaries, fonts/runtime resources and hosting delivery belongs to a later measured phase. These Lighthouse results do **not** establish a field Core Web Vitals improvement; field LCP/INP/CLS remain unverified. TBT is not INP.

Raw final reports are retained outside the repository at:

- `C:\Users\Binxth\AppData\Local\Temp\zypher-phase1-final-1.json`
- `C:\Users\Binxth\AppData\Local\Temp\zypher-phase1-final-2.json`
- `C:\Users\Binxth\AppData\Local\Temp\zypher-phase1-final-3.json`

Three exploratory runs preceded the last desktop/icon size refinement; the table uses only the three final-build runs.

## Tests performed

| Check | Outcome / coverage |
|---|---|
| `npm run lint` | Pass, including the added test files. |
| `npm run build` | Pass: production compilation, TypeScript, and prerendering of existing pages/robots/sitemap. Initial sandboxed attempt could not fetch the existing Google Fonts; rerunning with network access passed. Existing Baseline-data age and Node deprecation warnings remain; no dependency changes were made. |
| `node --test --test-isolation=none tests/contact.test.mjs tests/rendered-seo.test.mjs` | **15/15 pass** with the local production server running. Isolation disabled because this environment blocks the test runner's child-process spawning. |
| Provider/route mock tests | Accepted ID, returned rejection, missing ID, thrown/network error, invalid fields/unsupported file rejected before send, controlled statuses, private diagnostics withheld, message HTML escaped. SDK is replaced by a fake provider and only dummy environment values are supplied. No real Resend call occurs. |
| Client-handler mock tests | Actual form handlers exercised with deterministic hook/form/fetch adapters: acceptance resets and announces; returned rejection/network exception/false-success response preserve input and show fallback; invalid input focuses first field; pending duplicate submission is blocked. These are handler tests, not a full React DOM/screen-reader simulation. |
| Browser page checks | Loaded Home, About and Contact in the built site. Final titles visible; closed menu/dialog absent from accessibility navigation. Home inspected at 320/390/768/1440 widths; no horizontal overflow observed. Desktop and mobile showcase inspected; cards retain fixed reserved areas and loaded artwork. |
| Mobile menu keyboard | Opened by trigger, Tab moved into Home link; Escape from that link closed menu and returned focus to trigger. Closed menu is inert/hidden. |
| Modal keyboard | Click opened native dialog; Close gained focus and background content disappeared from accessibility tree. Tab did not enter background page links. Escape closed it and returned focus to the banner. Close button also tested successfully. |
| Contact DOM validation | Submitted an empty local form: no network send, Name gained focus; name/phone/message are marked invalid and reference their error text. |
| Marquee | Checkbox successfully pauses animation; duplicate logo row remains hidden from accessibility navigation. Reduced-motion behavior is implemented in CSS; OS-preference and broader browser checks are listed below. |
| Rendered SEO/schema | Asserted exact titles/descriptions/OG/Twitter values, one title/H1, production canonicals, JSON-LD parsing and absence of invented offer/product/price/rating data on all three routes. |
| CTA destinations | Rendered direct request-form links checked on all pages; Contact hotline checked as `tel:`. Browser trees also confirm labeled WhatsApp destinations, portal-home link, footer phone/email links and preserved floating mobile WhatsApp. External flow was not submitted. |
| Robots/sitemap | Both return 200; robots allows crawling and specifies the production sitemap. Sitemap returns XML with exactly three page locations and no `lastmod`. |
| Images/social image | Every unique server-rendered image `src` on each route fetched successfully with an image content type; alt/dimension presence checked. Browser inspection found no completed broken images. Hero is eager/high-priority with corrected ratio; gallery is lazy with responsive hints. `og.jpg` returns 200/JPEG and Sharp confirms 1200×630. Original/replacement Subaru and social artwork visually checked. |
| Lighthouse | Three final mobile runs; median reported above, CLS 0 in every run. Automated accessibility 100 is not a substitute for assistive-technology testing. |
| Diff hygiene | `git diff --check` passes; only routine Git LF/CRLF notices. |

To reproduce the rendered tests, build and start the site on port 3100 in one terminal, then run the test command above in another. `SEO_TEST_ORIGIN` can override the test origin. Contact tests always mock sending; the rendered tests use GET only.

## Files modified or added

| Files | Purpose |
|---|---|
| `src/app/api/contact/route.ts`; `src/app/Contact-Us/ui/Contact-form.tsx` | Provider acceptance/failure handling and accessible form feedback/fallback. |
| `src/app/page.tsx`; `src/app/About-Us/page.tsx`; `src/app/Contact-Us/page.tsx` | Page metadata, truthful home schema, heading/anchor/main targets, call link and contact contrast. |
| `src/lib/seo.ts`; `src/app/sitemap.ts` | Absolute page titles, unsupported price-range removal, honest sitemap dates. |
| `src/app/layout.tsx`; `src/app/globals.css` | Skip link, pause styling and reduced-motion behavior. |
| `src/components/Hero.tsx`; `src/components/Popup-Modal.tsx` | LCP loading/sizes, clear WhatsApp label, native accessible modal and trigger relationship. |
| `src/components/Navbar.tsx`; `src/components/Footer.tsx` | Logo ratios/loading/sizes, menu inertness/keyboard handling and direct request links. |
| `src/components/FeaturesSection.tsx`; `src/components/How-it-works.tsx` | Heading hierarchy, lazy loading, real dimensions and responsive sizes. |
| `src/components/PartsHeader.tsx`; `src/components/Showcase-grid.tsx` | Unified showcase anchor and heading, stable lazy gallery with responsive sizes. |
| `src/components/LogoSection.tsx`; `src/assets/subaru.webp` (added); `src/assets/subaru.svg` (removed) | Small faithful logo replacement, lazy/sized marquee images and pause control. |
| `src/components/TopBar.tsx`; `src/components/PartsRequestSection.tsx` | Readable green CTA surfaces/hover states; floating shortcut retained. |
| `public/og.jpg` | Correct 1200×630 branded social image. |
| `tests/contact.test.mjs`; `tests/rendered-seo.test.mjs` (added) | Repeatable mock contact and local production-rendered regression checks using existing TypeScript/Node dependencies. |
| `PHASE-1-IMPLEMENTATION.md` (added) | This implementation and verification record. |

No package manifest/lockfile, framework version, robots configuration, public page URL or external repository was changed. `SEO-AUDIT.md` remains the existing untracked audit artifact.

## Manual verification and deployment follow-up

1. Review the diff and deploy through the normal workflow. Repeat the rendered SEO/image checks and three mobile Lighthouse measurements on the real production origin; verify Vercel Analytics there.
2. In an owner-controlled staging/test inbox, verify configured sender/domain/recipient, actual email receipt, attachment delivery and provider/webhook diagnostics. Provider acceptance is intentionally distinct from inbox delivery. No live enquiry was sent during this work.
3. Test native dialog/menu/form behavior with Safari/iOS, Android, VoiceOver/NVDA, keyboard-only navigation and 200% zoom. Check the OS reduced-motion preference removes marquee/smooth-scroll/large-transition motion. Test backdrop click on those browsers as well.
4. Preview the new OG image through actual social sharing/debuggers after deployment; clear stale share caches when necessary.
5. Verify the request-form flow in the external app and telephone/WhatsApp handling on real devices without submitting unintended enquiries. This phase corrects main-site destinations only.
6. Continue assessing real-user LCP/INP/CLS through authorized field data after deployment; no field improvement is claimed here.

## Intentionally deferred

- SEO-01 external parts-platform corrections: its repository is absent.
- SEO-06 new car-parts, bike-parts and motorcycle-import landing pages; Zypher Bikes; `/parts`; `/how-to-order`; import case studies. No new routes or sitemap entries.
- Broader SEO-13/local identity work, unverified Business Profile details, opening hours, coordinates/maps, reviews integration and any priceRange.
- Broader SEO-14 placement/copy changes and SEO-16 privacy, data-use and retention explanations requiring business decisions.
- SEO-11 higher-quality source photography, deeper compression tuning, generic-alt editorial changes; SEO-03/20 hydration/hosting/field-performance investigation.
- Other audit recommendations outside the selected scope, arbitrary route normalization/migrations, redesigns and dependency/framework upgrades.

Suggested commit subject: `fix: implement phase 1 SEO, contact reliability and accessibility improvements`
