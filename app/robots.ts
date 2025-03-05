import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/_next/"],
      },
    ],
    sitemap: `https://resumeai.simicdev.com/sitemap.xml`,
  };
}
