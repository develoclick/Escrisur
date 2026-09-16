import type { Metadata } from "next";
import Image from "next/image";
import { Quote } from "lucide-react";
import { BandaCta, PageHero, Tarjetas } from "@/components/site/blocks";
import { Logo } from "@/components/site/brand";
import { Galeria, Marquesina } from "@/components/site/interactive";
import { Parallax, Reveal, SeccionTitulo } from "@/components/site/primitives";
import { FOTOS } from "@/lib/content";
import { GALERIA, INICIO, NOSOTROS } from "@/lib/paginas";

export const metadata: Metadata = {
  title: NOSOTROS.meta.titulo,
  description: NOSOTROS.meta.descripcion,
  alternates: { canonical: "/nosotros" },
  openGraph: { title: "Nosotros · ESCRISUR Distribuidora", description: NOSOTROS.meta.descripcion, url: "/nosotros", images: [FOTOS.aliado] },
};

export default function Nosotros() {
  const n = NOSOTROS;
  return (
    <>
      <PageHero {...n.hero} ruta="Nosotros" />

      {/* historia */}
      <section className="band overflow-hidden bg-white">
        <div className="shell grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal x={-40} y={0} className="relative">
            <Parallax src={FOTOS.inventario} alt="Control de inventario en el almacén" sizes="(max-width:1024px) 90vw, 45vw" intensidad={10} className="aspect-[5/6] rounded-3xl" />
            <div className="absolute -bottom-10 -right-2 w-[72%] rounded-2xl bg-white p-6 shadow-[0_30px_70px_-30px_rgba(7,47,43,0.5)] sm:-right-8">
              <Logo className="w-full" />
            </div>
          </Reveal>
          <div className="pt-10 lg:pt-0">
            <SeccionTitulo eyebrow="Nuestra historia" titulo={n.historia.titulo} className="!mb-6" />
            {n.historia.parrafos.map((p, i) => (
              <Reveal key={i} delay={0.08 * i}>
                <p className="mt-5 text-[1.03rem] leading-[1.9] text-text-light">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Marquesina items={INICIO.marquesina} oscuro />

      {/* misión y visión */}
      <section className="band bg-surface-muted">
        <div className="shell grid gap-6 lg:grid-cols-2">
          {[
            { etiqueta: "Misión", texto: n.mision, foto: FOTOS.entrega },
            { etiqueta: "Visión", texto: n.vision, foto: FOTOS.distribucion },
          ].map((b, i) => (
            <Reveal key={b.etiqueta} delay={0.1 * i} className="group relative isolate overflow-hidden rounded-3xl p-10 text-white sm:p-12">
              <Image src={b.foto} alt="" fill sizes="(max-width:1024px) 100vw, 50vw" className="-z-20 object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
              <div className="absolute inset-0 -z-10 bg-primary-dark/88 transition-colors duration-700 group-hover:bg-primary-dark/80" />
              <Quote className="size-10 text-accent" aria-hidden="true" />
              <h2 className="mt-6 text-[0.8rem] font-bold uppercase tracking-[0.22em] text-on-dark-teal">{b.etiqueta}</h2>
              <p className="mt-4 font-heading text-[clamp(1.25rem,2vw,1.6rem)] font-bold leading-[1.45] text-white">{b.texto}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* valores */}
      <section className="band bg-white">
        <div className="shell">
          <SeccionTitulo eyebrow="Valores" titulo="Lo que ordena" destacado="cada atención" centrado />
          <Tarjetas items={n.valores} columnas={4} />
        </div>
      </section>

      {/* compromisos con imagen */}
      <section className="band bg-primary-dark text-white">
        <div className="shell">
          <SeccionTitulo eyebrow="Compromisos" titulo="Cómo cuidamos" destacado="su pedido" oscuro />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {n.compromisos.map((c, i) => (
              <Reveal as="li" key={c.titulo} delay={0.08 * i} className="group relative aspect-[3/4] overflow-hidden rounded-3xl">
                <Image src={c.foto} alt="" fill sizes="(max-width:640px) 100vw, 25vw" className="object-cover transition-transform duration-[1100ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(4,32,29,0.95)_15%,rgba(4,32,29,0.1)_70%)]" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="font-heading text-[0.8rem] font-black text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 text-[1.15rem] text-white">{c.titulo}</h3>
                  <span className="mt-4 block h-1 w-10 rounded-full bg-accent transition-all duration-500 group-hover:w-24" />
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ficha registral */}
      <section className="band bg-surface-soft">
        <div className="shell grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <SeccionTitulo
            eyebrow="Datos registrales"
            titulo="Todo lo que una entidad"
            destacado="necesita verificar"
            texto="Información inscrita en el Registro de Personas Jurídicas de SUNARP."
          />
          <Reveal delay={0.1}>
            <dl className="overflow-hidden rounded-3xl border border-border bg-white">
              {n.registro.map((r) => (
                <div key={r.etiqueta} className="grid gap-1 border-b border-border px-7 py-5 transition-colors last:border-0 hover:bg-surface-muted sm:grid-cols-[0.8fr_1.2fr] sm:gap-6">
                  <dt className="font-heading text-[0.76rem] font-bold uppercase tracking-[0.12em] text-text-light">{r.etiqueta}</dt>
                  <dd className="font-semibold text-text">{r.valor}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* galería */}
      <section className="band bg-white">
        <div className="shell">
          <SeccionTitulo eyebrow="Galería" titulo="Nuestro" destacado="día a día" />
          <Galeria fotos={GALERIA} />
        </div>
      </section>

      <BandaCta titulo="Trabajemos" destacado="juntos" texto="Envíenos su requerimiento y preparamos una propuesta a la medida de su organización." foto={FOTOS.acuerdo} />
    </>
  );
}
