import type { MetadataRoute } from "next";
import { absoluteUrl, defaultOgImage, siteConfig } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const image = absoluteUrl(defaultOgImage.url);

  return [
    {
      url: `${siteConfig.url}/`,
      changeFrequency: "weekly",
      priority: 1,
      images: [image],
    },
    {
      url: `${siteConfig.url}/About-Us`,
      changeFrequency: "monthly",
      priority: 0.7,
      images: [image],
    },
    {
      url: `${siteConfig.url}/Contact-Us`,
      changeFrequency: "monthly",
      priority: 0.7,
      images: [image],
    },
  ];
}
