import type { Metadata } from "next";
import { BandaCta, Catalogo, PageHero, Tarjetas } from "@/components/site/blocks";
import { ProcesoInteractivo } from "@/components/site/interactive";
import { SeccionTitulo } from "@/components/site/primitives";
import { FOTOS } from "@/lib/content";
import { PROCESO, SERVICIOS } from "@/lib/paginas";

export const metadata: Metadata = {
  title: SERVICIOS.meta.titulo,
  description: SERVICIOS.meta.descripcion,
  alternates: { canonical: "/servicios" },
  openGraph: { title: "Servicios · ESCRISUR", description: SERVICIOS.meta.descripcion, url: "/servicios", images: [FOTOS.oficina] },
};

export default function Servicios() {
  return (
    <>
      <PageHero
        {...SERVICIOS.hero}
        ruta="Servicios"
        cta={{ label: "Solicitar un servicio", href: "/contacto?linea=limpieza" }}
      />

      <section className="band bg-surface-muted">
        <div className="shell">
          <SeccionTitulo
            eyebrow="Modalidades"
            titulo="Tres formas de"
            destacado="contratarnos"
            texto="Defina la modalidad según cómo compra su organización y con qué frecuencia necesita la atención."
          />
          <Tarjetas items={SERVICIOS.modalidades} />
        </div>
      </section>

      <Catalogo categorias={SERVICIOS.lista} lineaForm="mixto" etiquetaItems="Alcance" />

      <section className="band bg-primary-deep text-white">
        <div className="shell">
          <SeccionTitulo eyebrow="Proceso" titulo="Así atendemos" destacado="cada servicio" oscuro centrado />
          <ProcesoInteractivo pasos={PROCESO} />
        </div>
      </section>

      <BandaCta
        titulo="¿Necesita un servicio"
        destacado="recurrente?"
        texto="Indíquenos el alcance y la periodicidad, y le enviamos una propuesta con el detalle de la atención."
        foto={FOTOS.limpieza}
        href="/contacto?linea=limpieza"
        label="Solicitar un servicio"
      />
    </>
  );
}
