import type { Metadata } from "next";
import Image from "next/image";
import { Clock, FileText, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/site/blocks";
import { Logo } from "@/components/site/brand";
import { Cotizador } from "@/components/site/cotizacion";
import { Reveal, SeccionTitulo } from "@/components/site/primitives";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EMPRESA, FOTOS, PENDIENTE } from "@/lib/content";
import { CONTACTO } from "@/lib/paginas";

export const metadata: Metadata = {
  title: CONTACTO.meta.titulo,
  description: CONTACTO.meta.descripcion,
  alternates: { canonical: "/contacto" },
  openGraph: { title: "Contacto · ESCRISUR", description: CONTACTO.meta.descripcion, url: "/contacto", images: [FOTOS.atencion] },
};

const definido = (v: string) => v && v !== PENDIENTE;

export default function Contacto() {
  const canales = [
    { icono: MapPin, etiqueta: "Domicilio", valor: `${EMPRESA.distrito}, ${EMPRESA.provincia} — ${EMPRESA.region}` },
    definido(EMPRESA.telefono) && { icono: Phone, etiqueta: "Teléfono", valor: EMPRESA.telefono, href: `tel:${EMPRESA.telefono}` },
    definido(EMPRESA.correo) && { icono: Mail, etiqueta: "Correo", valor: EMPRESA.correo, href: `mailto:${EMPRESA.correo}` },
    { icono: FileText, etiqueta: "Registro", valor: `${EMPRESA.tipo} · Partida N.º ${EMPRESA.partida}` },
    { icono: Clock, etiqueta: "Respuesta", valor: "Su solicitud la revisa directamente la gerencia" },
  ].filter(Boolean) as { icono: typeof MapPin; etiqueta: string; valor: string; href?: string }[];

  return (
    <>
      <PageHero {...CONTACTO.hero} ruta="Contacto" cta={{ label: "Ir al formulario", href: "#formulario" }} />

      <section id="formulario" className="band scroll-mt-24 bg-surface-muted">
        <div className="shell grid items-start gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <SeccionTitulo
              eyebrow="Cotización"
              titulo="Solicite su propuesta"
              destacado="en dos pasos"
              texto="Primero lo que necesita, después a quién enviar la propuesta."
              className="!mb-8"
            />
            <Reveal delay={0.1}>
              <ul className="space-y-3">
                {canales.map((c) => {
                  const Icono = c.icono;
                  const cuerpo = (
                    <>
                      <span className="grid size-12 flex-none place-items-center rounded-xl bg-primary-bright text-white transition-transform group-hover:scale-110">
                        <Icono className="size-5" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block font-heading text-[0.72rem] font-bold uppercase tracking-[0.14em] text-text-light">{c.etiqueta}</span>
                        <span className="mt-0.5 block font-semibold">{c.valor}</span>
                      </span>
                    </>
                  );
                  return (
                    <li key={c.etiqueta}>
                      {c.href ? (
                        <a href={c.href} className="group flex items-center gap-4 rounded-2xl bg-white p-4 transition-shadow hover:shadow-md">{cuerpo}</a>
                      ) : (
                        <div className="group flex items-center gap-4 rounded-2xl bg-white p-4">{cuerpo}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
              <div className="mt-8 hidden rounded-2xl bg-white p-6 lg:block">
                <Logo className="w-full" />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <Cotizador />
          </Reveal>
        </div>
      </section>

      <section className="band bg-white">
        <div className="shell grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <div>
            <SeccionTitulo eyebrow="Preguntas frecuentes" titulo="Antes de" destacado="solicitar" className="!mb-8" />
            <Reveal className="group relative hidden aspect-[4/3] overflow-hidden rounded-3xl lg:block">
              <Image src={FOTOS.atencion} alt="Atención personalizada" fill sizes="40vw" className="object-cover transition-transform duration-[1100ms] group-hover:scale-105" />
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Accordion multiple={false} className="border-t border-border">
              {CONTACTO.faq.map((f, i) => (
                <AccordionItem key={f.pregunta} value={`faq-${i}`} className="border-b border-border">
                  <AccordionTrigger className="py-6 text-left font-heading text-[1.06rem] font-bold text-text hover:no-underline hover:text-primary">
                    {f.pregunta}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-[0.98rem] leading-[1.8] text-text-light">
                    {f.respuesta}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>
    </>
  );
}
