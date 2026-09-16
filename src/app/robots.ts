import type { MetadataRoute } from "next";
import { EMPRESA } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/img/escrisur imagenes/"] },
    sitemap: `${EMPRESA.sitio}/sitemap.xml`,
  };
}
