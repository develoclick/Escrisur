import type { Metadata, Viewport } from "next";
import { DM_Sans, Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { EMPRESA } from "@/lib/content";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Flotantes } from "@/components/site/interactive";
import { PageTransition, ScrollProgress } from "@/components/site/transition";

/* Montserrat reproduce el trazo pesado y geométrico del logotipo. */
const display = Montserrat({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const TITULO = "ESCRISUR Distribuidora — Materiales de escritorio y ferretería en Arequipa";
const DESCRIPCION =
  "Distribuidora de materiales de escritorio, ferretería y servicios para empresas, colegios y entidades públicas. Pedido completo, entrega en su almacén. Solicite su cotización.";

export const metadata: Metadata = {
  metadataBase: new URL(EMPRESA.sitio),
  title: { default: TITULO, template: "%s · ESCRISUR Distribuidora" },
  description: DESCRIPCION,
  applicationName: "ESCRISUR",
  keywords: [
    "distribuidora Arequipa",
    "materiales de escritorio",
    "útiles de oficina",
    "ferretería",
    "equipos de protección personal",
    "papel bond",
    "tóner",
    "proveedor del Estado",
    "licitaciones",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "/",
    siteName: "ESCRISUR Distribuidora",
    title: TITULO,
    description: DESCRIPCION,
    images: [{ url: "/img/fotos/centro-distribucion.jpg", width: 1200, height: 1000, alt: "Centro de distribución ESCRISUR" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRIPCION,
    images: ["/img/fotos/centro-distribucion.jpg"],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#038f82",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "ESCRISUR Distribuidora",
  legalName: EMPRESA.razonSocial,
  description: DESCRIPCION,
  url: EMPRESA.sitio,
  logo: `${EMPRESA.sitio}/brand/logo.png`,
  image: `${EMPRESA.sitio}/img/fotos/centro-distribucion.jpg`,
  foundingDate: EMPRESA.anio,
  address: {
    "@type": "PostalAddress",
    addressLocality: EMPRESA.distrito,
    addressRegion: `${EMPRESA.provincia}, ${EMPRESA.region}`,
    addressCountry: "PE",
  },
  areaServed: { "@type": "AdministrativeArea", name: "Arequipa, Perú" },
  founder: { "@type": "Person", name: EMPRESA.titular, jobTitle: EMPRESA.cargo },
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Product", name: "Materiales de escritorio" } },
    { "@type": "Offer", itemOffered: { "@type": "Product", name: "Artículos de ferretería" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Limpieza integral" } },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-PE"
      data-tema="accent"
      className={`${display.variable} ${body.variable} h-full antialiased`}
      // el script de abajo añade la clase `js` antes de hidratar
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        {/*
          Activa las animaciones de revelado solo si hay JavaScript.
          Si la aplicación no se hidrata en 5 s, retira la clase y muestra todo.
          beforeInteractive lo inyecta en <head> desde el servidor.
        */}
        <Script id="activar-animaciones" strategy="beforeInteractive">
          {"document.documentElement.classList.add('js');setTimeout(function(){if(!window.__escrisur)document.documentElement.classList.remove('js')},5000);"}
        </Script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-6 focus:py-3 focus:font-bold focus:text-accent-on"
        >
          Saltar al contenido
        </a>
        <ScrollProgress />
        <Header />
        {/* clip (no hidden): recorta las entradas laterales sin romper los sticky */}
        <main id="main" className="flex-1 overflow-x-clip">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <Flotantes />
      </body>
    </html>
  );
}
