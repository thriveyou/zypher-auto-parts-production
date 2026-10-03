import assert from "node:assert/strict";
import test from "node:test";

const origin = process.env.SEO_TEST_ORIGIN || "http://127.0.0.1:3100";
const decode = (value) => value.replaceAll("&amp;", "&").replaceAll("&quot;", '"');
const pages = [
  ["/", "Japanese Vehicle Parts Sri Lanka | Zypher Imports", "Source genuine Japanese car and bike parts with Zypher Imports. Send your vehicle details for a quotation and delivery across Sri Lanka."],
  ["/About-Us", "About Our Japan Parts Sourcing | Zypher Imports", "Meet Zypher Imports (Pvt) Ltd and learn how our Japan and Sri Lanka teams source, verify and deliver genuine vehicle parts for local customers."],
  ["/Contact-Us", "Contact & Parts Quotations Sri Lanka | Zypher Imports", "Request a quotation for Japanese car or bike parts. Contact Zypher Imports on WhatsApp, call our Sri Lanka team, or send your vehicle and part details."],
];

for (const [path, title, description] of pages) test(`rendered metadata, schema, links and images: ${path}`, async () => {
  const response = await fetch(origin + path);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.equal(decode(html.match(/<title>(.*?)<\/title>/)[1]), title);
  assert.equal((html.match(/<title>/g) || []).length, 1);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  const meta = (name) => decode(html.match(new RegExp(`<meta (?:name|property)="${name}" content="([^"]*)"`))[1]);
  assert.equal(meta("description"), description);
  assert.equal(meta("og:title"), title);
  assert.equal(meta("twitter:title"), title);
  assert.equal(meta("og:description"), description);
  assert.equal(meta("twitter:description"), description);
  assert.equal(meta("og:image"), "https://www.zypherimports.lk/og.jpg");
  assert.equal(meta("twitter:image"), "https://www.zypherimports.lk/og.jpg");
  assert.equal(meta("og:image:width"), "1200");
  assert.equal(meta("og:image:height"), "630");
  assert.equal(new URL(decode(html.match(/<link rel="canonical" href="([^"]*)"/)[1])).href, "https://www.zypherimports.lk" + path);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  assert.ok(schemas.length >= 2);
  assert.doesNotMatch(JSON.stringify(schemas), /hasOfferCatalog|"Offer"|"Product"|priceRange|aggregateRating|reviewRating/);
  if (path === "/") assert.match(JSON.stringify(schemas), /"Service"/);
  assert.match(html, /href="https:\/\/parts.zypherimports.lk\/request-form"/);
  if (path === "/Contact-Us") assert.match(html, /href="tel:\+94728000516"/);
  const images = [...html.matchAll(/<img\b[^>]*>/g)].map((match) => match[0]);
  assert.ok(images.length);
  const urls = new Set();
  for (const image of images) {
    assert.match(image, /alt="[^"]*"/);
    urls.add(new URL(decode(image.match(/src="([^"]*)"/)[1]), origin).href);
    if (!image.includes('data-nimg="fill"')) assert.match(image, /width="\d+" height="\d+"/);
  }
  for (const url of urls) {
    const image = await fetch(url);
    assert.equal(image.status, 200, url);
    assert.match(image.headers.get("content-type"), /^image\//);
  }
});

test("robots, sitemap and actual social image", async () => {
  const robots = await fetch(origin + "/robots.txt");
  assert.equal(robots.status, 200);
  const rules = await robots.text();
  assert.match(rules, /Allow: \/\n/);
  assert.match(rules, /Sitemap: https:\/\/www.zypherimports.lk\/sitemap.xml/);
  const sitemap = await fetch(origin + "/sitemap.xml");
  assert.equal(sitemap.status, 200);
  assert.match(sitemap.headers.get("content-type"), /xml/);
  const xml = await sitemap.text();
  assert.doesNotMatch(xml, /lastmod/);
  assert.equal((xml.match(/<loc>/g) || []).length, 3);
  for (const [path] of pages) assert.ok(xml.includes("https://www.zypherimports.lk" + path));
  const image = await fetch(origin + "/og.jpg");
  assert.equal(image.status, 200);
  assert.equal(image.headers.get("content-type"), "image/jpeg");
});
