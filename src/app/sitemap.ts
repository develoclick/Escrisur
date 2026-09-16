import type { MetadataRoute } from "next";
import { EMPRESA, NAV } from "@/lib/content";

const PRIORIDAD: Record<string, number> = {
  "/escritorio": 0.9,
  "/ferreteria": 0.9,
  "/contacto": 0.9,
  "/servicios": 0.8,
  "/licitaciones": 0.8,
  "/nosotros": 0.7,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();
  return [
    { url: EMPRESA.sitio, lastModified: ahora, changeFrequency: "monthly", priority: 1 },
    ...NAV.map((n) => ({
      url: `${EMPRESA.sitio}${n.href}`,
      lastModified: ahora,
      changeFrequency: "monthly" as const,
      priority: PRIORIDAD[n.href] ?? 0.7,
    })),
  ];
}
