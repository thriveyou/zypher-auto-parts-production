import type { MetadataRoute } from "next";
import { absoluteUrl, defaultOgImage, siteConfig } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const image = absoluteUrl(defaultOgImage.url);

  return [
    {
      url: `${siteConfig.url}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: [image],
    },
    {
      url: `${siteConfig.url}/About-Us`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      images: [image],
    },
    {
      url: `${siteConfig.url}/Contact-Us`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      images: [image],
    },
  ];
}
