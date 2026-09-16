import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HardHat, Hammer, Nut, Paintbrush } from "lucide-react";
import { BandaCta, Catalogo, PageHero, Tarjetas } from "@/components/site/blocks";
import { Marquesina } from "@/components/site/interactive";
import { Parallax, Reveal, SeccionTitulo } from "@/components/site/primitives";
import { FOTOS } from "@/lib/content";
import { FERRETERIA } from "@/lib/paginas";

export const metadata: Metadata = {
  title: FERRETERIA.meta.titulo,
  description: FERRETERIA.meta.descripcion,
  alternates: { canonical: "/ferreteria" },
  openGraph: { title: "Ferretería · ESCRISUR", description: FERRETERIA.meta.descripcion, url: "/ferreteria", images: [FOTOS.herramientas] },
};

const ICONOS = [Hammer, Nut, HardHat, Paintbrush];

export default function Ferreteria() {
  return (
    <>
      <PageHero
        {...FERRETERIA.hero}
        ruta="Ferretería"
        cta={{ label: "Cotizar ferretería", href: "/contacto?linea=ferreteria" }}
      />

      <Marquesina items={["Taladros", "Amoladoras", "Tornillería", "Anclajes", "Cascos", "Guantes", "Pinturas", "Material eléctrico"]} oscuro />

      {/* mosaico de categorías con parallax */}
      <section className="band overflow-hidden bg-white">
        <div className="shell grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SeccionTitulo
              eyebrow="Cuatro frentes"
              titulo="Ferretería para"
              destacado="quien construye y mantiene"
              texto="Herramientas, fijaciones, protección y materiales. Toque una categoría para ir directo a su detalle."
              className="!mb-10"
            />
            <ul className="grid gap-4 sm:grid-cols-2">
              {FERRETERIA.categorias.map((c, i) => {
                const Icono = ICONOS[i];
                return (
                  <Reveal as="li" key={c.id} delay={0.07 * i}>
                    <a href={`#${c.id}`} className="group flex h-full items-start gap-4 rounded-2xl border border-border p-5 transition-all duration-500 hover:-translate-y-1 hover:border-accent hover:bg-surface-soft">
                      <span className="grid size-12 flex-none place-items-center rounded-xl bg-accent text-accent-on transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                        <Icono className="size-6" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block font-heading text-[1rem] font-bold">{c.titulo}</span>
                        <span className="mt-1 block text-[0.88rem] leading-snug text-text-light">{c.resumen}</span>
                      </span>
                    </a>
                  </Reveal>
                );
              })}
            </ul>
          </div>

          <Reveal x={40} y={0} className="relative grid grid-cols-2 gap-4">
            <Parallax src={FOTOS.exhibicionHerramientas} alt="Exhibición de herramientas" sizes="25vw" intensidad={14} className="row-span-2 aspect-[1/2] rounded-3xl" />
            <div className="group relative aspect-square overflow-hidden rounded-3xl">
              <Image src={FOTOS.tornilleria} alt="Tornillería y fijaciones" fill sizes="25vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="group relative aspect-square overflow-hidden rounded-3xl">
              <Image src={FOTOS.epp} alt="Equipos de protección personal" fill sizes="25vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* para quién */}
      <section className="band bg-primary-dark text-white">
        <div className="shell">
          <SeccionTitulo eyebrow="Para quién" titulo="Abastecemos" destacado="obra y mantenimiento" oscuro />
          <Tarjetas items={FERRETERIA.clientes} oscuro />
        </div>
      </section>

      <Catalogo categorias={FERRETERIA.categorias} lineaForm="ferreteria" etiquetaItems="Comprende" />

      <section className="bg-surface-muted py-14">
        <div className="shell flex flex-wrap items-center justify-between gap-6">
          <p className="font-heading text-[clamp(1.2rem,2.2vw,1.6rem)] font-extrabold">
            ¿Su obra también necesita útiles de oficina? <span className="hl">Una sola propuesta.</span>
          </p>
          <Link href="/escritorio" className="btn btn-ghost">
            Ver escritorio
            <ArrowRight className="flecha size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <BandaCta
        titulo="Herramientas y materiales"
        destacado="donde los necesita"
        texto="Indíquenos la lista y el lugar de entrega. Consolidamos el pedido y lo llevamos completo."
        foto={FOTOS.herramientas}
        href="/contacto?linea=ferreteria"
        label="Cotizar ferretería"
      />
    </>
  );
}
