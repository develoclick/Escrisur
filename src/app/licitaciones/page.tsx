import type { Metadata } from "next";
import { FileCheck2, Scale, ShieldCheck } from "lucide-react";
import { BandaCta, PageHero, Tarjetas } from "@/components/site/blocks";
import { Parallax, Reveal, SeccionTitulo } from "@/components/site/primitives";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FOTOS } from "@/lib/content";
import { LICITACIONES } from "@/lib/paginas";

export const metadata: Metadata = {
  title: LICITACIONES.meta.titulo,
  description: LICITACIONES.meta.descripcion,
  alternates: { canonical: "/licitaciones" },
  openGraph: { title: "Licitaciones · ESCRISUR", description: LICITACIONES.meta.descripcion, url: "/licitaciones", images: [FOTOS.acuerdo] },
};

export default function Licitaciones() {
  const l = LICITACIONES;
  return (
    <>
      <PageHero
        {...l.hero}
        ruta="Licitaciones"
        cta={{ label: "Consultar un proceso", href: "/contacto?linea=licitacion" }}
      />

      <section className="band bg-white">
        <div className="shell">
          <SeccionTitulo eyebrow="Procedimientos" titulo="En qué procesos" destacado="participamos" />
          <Tarjetas items={l.procesos} columnas={4} />
        </div>
      </section>

      {/* garantías con parallax */}
      <section className="band overflow-hidden bg-surface-soft">
        <div className="shell grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal x={-40} y={0}>
            <Parallax src={FOTOS.asesoria} alt="Revisión de documentación comercial" sizes="(max-width:1024px) 90vw, 45vw" intensidad={10} className="aspect-[4/5] rounded-3xl" />
          </Reveal>
          <div>
            <SeccionTitulo eyebrow="Respaldo" titulo="Lo que acredita" destacado="nuestra participación" className="!mb-8" />
            <ul className="space-y-4">
              {l.garantias.map((g, i) => {
                const Icono = [FileCheck2, ShieldCheck, Scale][i];
                return (
                  <Reveal as="li" key={g.titulo} delay={0.08 * i} className="flex gap-5 rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-[0_24px_50px_-28px_rgba(7,47,43,0.4)]">
                    <span className="grid size-12 flex-none place-items-center rounded-xl bg-primary-bright text-white">
                      <Icono className="size-6" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-heading text-[1.05rem] font-bold">{g.titulo}</span>
                      <span className="mt-1.5 block text-[0.94rem] leading-relaxed text-text-light">{g.texto}</span>
                    </span>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* anexos y marco */}
      <section className="band bg-primary-dark text-white">
        <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SeccionTitulo eyebrow="Documentación" titulo="Anexos que" destacado="suscribimos" oscuro className="!mb-8" />
            <ol className="space-y-3">
              {l.anexos.map((a, i) => (
                <Reveal as="li" key={a} delay={0.05 * i} className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:border-accent/60 hover:bg-white/[0.08]">
                  <span className="grid size-10 flex-none place-items-center rounded-full bg-white/10 font-heading text-[0.82rem] font-black text-accent transition-colors group-hover:bg-accent group-hover:text-accent-on">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-on-dark-muted group-hover:text-white">{a}</span>
                </Reveal>
              ))}
            </ol>
          </div>

          <div>
            <SeccionTitulo eyebrow="Marco normativo" titulo="Normas que" destacado="nos rigen" oscuro className="!mb-8" />
            <Reveal>
              <Accordion multiple={false} className="border-t border-white/10">
                {l.marco.map((m) => (
                  <AccordionItem key={m.norma} value={m.norma} className="border-b border-white/10">
                    <AccordionTrigger className="py-5 font-heading text-[1.05rem] font-bold text-white hover:no-underline">
                      {m.norma}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-[0.96rem] leading-relaxed text-on-dark-muted">
                      {m.detalle}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </div>
      </section>

      <BandaCta
        titulo="¿Convoca un proceso"
        destacado="en el que podamos participar?"
        texto="Envíenos las bases o la especificación técnica y le remitimos la oferta con el expediente completo."
        foto={FOTOS.acuerdo}
        href="/contacto?linea=licitacion"
        label="Consultar un proceso"
      />
    </>
  );
}
