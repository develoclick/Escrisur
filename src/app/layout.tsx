import type { Metadata } from "next";
import { Sora, DM_Sans } from "next/font/google";
import "./globals.css";
import { EMPRESA } from "@/lib/content";

const display = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://escrisur.pe"),
  title: {
    default: "ESCRISUR — Abastecimiento para empresas e instituciones",
    template: "%s · ESCRISUR",
  },
  description:
    "Comercialización de productos y prestación de servicios para empresas, instituciones y entidades públicas y privadas. Arequipa, Perú.",
  keywords: [
    "abastecimiento",
    "suministros de oficina",
    "útiles de escritorio",
    "limpieza integral",
    "licitaciones",
    "Arequipa",
    "Perú",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "/",
    siteName: EMPRESA.marca,
    title: "ESCRISUR — Abastecimiento para empresas e instituciones",
    description:
      "Productos y servicios para oficinas, instituciones y empresas, con atención orientada a las necesidades de cada organización.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ESCRISUR — Abastecimiento para empresas e instituciones",
    description:
      "Productos y servicios para oficinas, instituciones y empresas.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: EMPRESA.razonSocial,
  alternateName: EMPRESA.marca,
  description:
    "Empresa peruana dedicada a la comercialización de productos y prestación de servicios para empresas, instituciones y entidades públicas y privadas.",
  foundingDate: "2025",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cabanaconde",
    addressRegion: "Caylloma, Arequipa",
    addressCountry: "PE",
  },
  founder: {
    "@type": "Person",
    name: EMPRESA.titular,
    jobTitle: "Titular-Gerente",
  },
  identifier: {
    "@type": "PropertyValue",
    name: "Partida electrónica SUNARP",
    value: EMPRESA.partida,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-PE"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
