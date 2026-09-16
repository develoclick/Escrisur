import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BandaCta, Catalogo, PageHero, Tarjetas } from "@/components/site/blocks";
import { Carrusel, Marquesina } from "@/components/site/interactive";
import { SeccionTitulo } from "@/components/site/primitives";
import { FOTOS } from "@/lib/content";
import { ESCRITORIO } from "@/lib/paginas";

export const metadata: Metadata = {
  title: ESCRITORIO.meta.titulo,
  description: ESCRITORIO.meta.descripcion,
  alternates: { canonical: "/escritorio" },
  openGraph: { title: "Materiales de escritorio · ESCRISUR", description: ESCRITORIO.meta.descripcion, url: "/escritorio", images: [FOTOS.suministrosEscritorio] },
};

const DESTACADOS = [
  { foto: FOTOS.papelToner, titulo: "Papel A4 y tóner", id: "papel" },
  { foto: FOTOS.archivadores, titulo: "Archivadores", id: "archivo" },
  { foto: FOTOS.utiles, titulo: "Útiles de oficina", id: "utiles" },
  { foto: FOTOS.papeleria, titulo: "Papelería institucional", id: "papeleria" },
  { foto: FOTOS.suministrosEscritorio, titulo: "Suministros de escritorio", id: "utiles" },
];

export default function Escritorio() {
  return (
    <>
      <PageHero
        {...ESCRITORIO.hero}
        ruta="Escritorio"
        cta={{ label: "Cotizar escritorio", href: "/contacto?linea=escritorio" }}
      />

      <Marquesina items={["Papel bond A4", "Archivadores", "Tintas", "Tóner", "Lapiceros", "Folders", "Engrapadores", "Cuadernos"]} />

      {/* para quién */}
      <section className="band bg-surface-muted">
        <div className="shell">
          <SeccionTitulo eyebrow="Para quién" titulo="Abastecemos a" destacado="quien más consume" />
          <Tarjetas items={ESCRITORIO.clientes} />
        </div>
      </section>

      {/* carrusel de destacados */}
      <section className="band overflow-hidden bg-white">
        <div className="shell">
          <SeccionTitulo eyebrow="Destacados" titulo="Lo más" destacado="solicitado" texto="Deslice para recorrer la línea y toque una tarjeta para ver el detalle." />
          <Carrusel etiqueta="Productos destacados de escritorio">
            {DESTACADOS.map((d, i) => (
              <li key={`${d.titulo}-${i}`} className="w-[78%] flex-none snap-start sm:w-[44%] lg:w-[30%]">
                <a href={`#${d.id}`} className="group relative block aspect-[4/5] overflow-hidden rounded-3xl">
                  <Image src={d.foto} alt={d.titulo} fill sizes="(max-width:640px) 78vw, 30vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(7,47,43,0.92)_10%,transparent_60%)]" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                    <h3 className="text-[1.25rem] text-white">{d.titulo}</h3>
                    <span className="grid size-11 flex-none place-items-center rounded-full bg-primary-bright text-white transition-transform duration-500 group-hover:-rotate-45">
                      <ArrowRight className="size-5" aria-hidden="true" />
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </Carrusel>
        </div>
      </section>

      <Catalogo categorias={ESCRITORIO.categorias} lineaForm="escritorio" etiquetaItems="Comprende" />

      {/* puente hacia ferretería */}
      <section className="bg-surface-soft py-14">
        <div className="shell flex flex-wrap items-center justify-between gap-6">
          <p className="font-heading text-[clamp(1.2rem,2.2vw,1.6rem)] font-extrabold">
            ¿También necesita herramientas o EPP? <span className="hl">Inclúyalo en la misma orden.</span>
          </p>
          <Link href="/ferreteria" className="btn btn-ghost">
            Ver ferretería
            <ArrowRight className="flecha size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <BandaCta
        titulo="Todo el consumo de su oficina"
        destacado="en una sola orden"
        texto="Envíenos la lista de productos y cantidades; le devolvemos una propuesta formal."
        foto={FOTOS.papeleria}
        href="/contacto?linea=escritorio"
        label="Cotizar escritorio"
      />
    </>
  );
}
