import type { Metadata } from "next";

const sriLankaPhone = "+94713205555";
const japanPhone = "+817091117384";

export const siteConfig = {
  name: "Zypher Imports",
  url: "https://www.zypherimports.lk",
  description:
    "Zypher Imports supplies genuine Japanese car and bike parts in Sri Lanka. OEM verified, sourced directly from Japan, and delivered islandwide.",
  email: "zypherimports@gmail.com",
  phones: [sriLankaPhone, japanPhone],
  sriLankaPhone,
  japanPhone,
  phoneDisplay: "071 320 5555",
  japanPhoneDisplay: "+81 70-9111-7384",
  sriLankaWhatsappUrl: `https://wa.me/${sriLankaPhone.slice(1)}`,
  japanWhatsappUrl: `https://wa.me/${japanPhone.slice(1)}`,
  socialLinks: [
    "https://www.facebook.com/share/12HyqbrRiZu/?mibextid=wwXIfr",
    "https://www.tiktok.com/@zypherauto",
    "https://www.instagram.com/zypherauto",
  ],
};

export const defaultOgImage = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: "Zypher Imports - Genuine Japanese vehicle parts in Sri Lanka",
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type,
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultOgImage.url],
    },
  };
}

export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["AutomotiveBusiness", "AutoPartsStore"],
      "@id": `${siteConfig.url}/#business`,
      name: siteConfig.name,
      url: siteConfig.url,
      image: absoluteUrl(defaultOgImage.url),
      email: siteConfig.email,
      telephone: siteConfig.phones,
      areaServed: {
        "@type": "Country",
        name: "Sri Lanka",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: siteConfig.sriLankaPhone,
          contactType: "customer service",
          areaServed: "LK",
          availableLanguage: ["en"],
        },
        {
          "@type": "ContactPoint",
          telephone: siteConfig.japanPhone,
          contactType: "parts sourcing",
          availableLanguage: ["en"],
        },
      ],
      sameAs: siteConfig.socialLinks,
      description: siteConfig.description,
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      publisher: {
        "@id": `${siteConfig.url}/#business`,
      },
      inLanguage: "en",
    },
  ],
};
