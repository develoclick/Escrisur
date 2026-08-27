import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Counter, Media, Reveal } from "@/components/site/primitives";
import { AREAS, EMPRESA, ESTADISTICAS, SERVICIOS } from "@/lib/content";

/* ==========================================================================
   05 · SERVICIOS
   Banda oscura. Columna fija a la izquierda con imagen; a la derecha,
   lista numerada que se rellena de color al pasar el cursor.
   ========================================================================== */
export function Servicios() {
  return (
    <section id="servicios" className="band bg-primary-dark text-white">
      <div className="shell grid gap-14 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-20">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <span className="eyebrow eyebrow--on-dark">Servicios</span>
          <h2 className="mt-6 max-w-[15ch] font-heading text-[clamp(1.9rem,3.7vw,3rem)] font-extrabold text-white">
            Servicios que sostienen la operación diaria
          </h2>
          <p className="mt-6 max-w-[42ch] text-[0.99rem] leading-[1.85] text-on-dark-muted">
            Atendemos tanto el abastecimiento de bienes como los servicios que
            mantienen en funcionamiento oficinas e instalaciones.
          </p>

          <div className="group mt-10 hidden lg:block">
            <Media
              slot="servicios"
              alt="Personal de servicio realizando mantenimiento y limpieza de instalaciones"
              className="aspect-[4/3]"
              sizes="34vw"
            />
          </div>

          <Link
            href="#cotizacion"
            className="group mt-8 inline-flex items-center gap-3 bg-accent px-8 py-[17px] text-[0.82rem] font-bold uppercase tracking-[0.09em] text-white transition-colors hover:bg-accent-dark"
          >
            Solicitar un servicio
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </Reveal>

        <ul className="border-t border-white/12">
          {SERVICIOS.map((s, i) => (
            <Reveal as="li" key={s.numero} delay={0.05 * i}>
              <Link
                href="#cotizacion"
                className="group relative flex items-start gap-6 border-b border-white/12 py-9 transition-colors sm:gap-10"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 inset-y-0 -z-0 scale-y-0 bg-primary/60 transition-transform duration-500 ease-[cubic-bezier(.22,.8,.28,1)] group-hover:scale-y-100"
                />
                <span className="relative z-10 pl-0 font-heading text-[1.6rem] font-extrabold leading-none text-accent-vivid sm:text-[2.1rem]">
                  {s.numero}
                </span>
                <span className="relative z-10 flex-1">
                  <span className="block font-heading text-[1.2rem] font-bold text-white transition-colors group-hover:text-accent-vivid sm:text-[1.42rem]">
                    {s.titulo}
                  </span>
                  <span className="mt-2 block max-w-[52ch] text-[0.93rem] leading-relaxed text-on-dark-muted">
                    {s.texto}
                  </span>
                </span>
                <span className="relative z-10 mt-1 grid size-12 flex-none place-items-center rounded-full border border-white/25 text-white transition-colors group-hover:border-accent group-hover:bg-accent">
                  <ArrowUpRight className="size-5" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ==========================================================================
   06 · CIFRAS
   Logotipo a gran escala relleno con la fotografía, y píldoras de datos.
   Sólo se muestran datos verificables de la partida registral.
   ========================================================================== */
export function Estadisticas() {
  return (
    <section className="band bg-white text-center">
      <div className="shell">
        <Reveal>
          <p
            aria-hidden="true"
            className="mx-auto select-none bg-[url('/img/hero.jpg')] bg-cover bg-center bg-clip-text font-heading text-[clamp(3.4rem,13vw,10rem)] font-extrabold leading-[0.9] tracking-[-0.055em] text-transparent"
          >
            {EMPRESA.marca}
          </p>
          <h2 className="sr-only">Datos de la empresa</h2>
          <p className="mx-auto mt-6 max-w-[52ch] font-heading text-[1.05rem] font-bold text-text">
            {EMPRESA.razonSocial}
          </p>
        </Reveal>

        <ul className="mt-12 flex flex-wrap items-stretch justify-center gap-4 sm:gap-5">
          {ESTADISTICAS.map((e, i) => (
            <Reveal as="li" key={e.label} delay={0.06 * i} className="min-w-[168px] flex-1 sm:max-w-[248px]">
              <div className="flex h-full flex-col items-center rounded-full bg-surface-muted px-8 py-6 transition-colors duration-500 hover:bg-accent-soft">
                <span className="font-heading text-[clamp(1.5rem,2.6vw,2.05rem)] font-extrabold leading-none tracking-[-0.03em] text-text">
                  <Counter value={e.valor} />
                </span>
              </div>
              <p className="mt-4 px-2 text-[0.82rem] font-medium leading-snug text-text-light">
                {e.label}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ==========================================================================
   07 · ÁREAS DE ATENCIÓN
   Mosaico fotográfico: el tipo de cliente se lee de un vistazo.
   ========================================================================== */
export function Areas() {
  return (
    <section id="areas" className="band bg-surface-soft">
      <div className="shell">
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-[24ch]">
            <span className="eyebrow">Áreas de atención</span>
            <h2 className="mt-6 font-heading text-[clamp(1.9rem,3.7vw,3rem)] font-extrabold">
              Organizaciones a las que atendemos
            </h2>
          </div>
          <p className="max-w-[40ch] text-[0.99rem] leading-[1.85] text-text-light">
            Trabajamos con entidades públicas y privadas de distinto tamaño,
            adaptando la atención al procedimiento de compra de cada una.
          </p>
        </Reveal>

        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {AREAS.map((a, i) => (
            <Reveal as="li" key={a.titulo} delay={0.04 * (i % 4)}>
              <div className="group relative isolate overflow-hidden">
                <Media
                  slot={`area-${a.media}`}
                  alt={a.titulo}
                  className="aspect-square"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 z-10 bg-[linear-gradient(to_top,rgba(5,52,59,0.94)_8%,rgba(5,52,59,0.35)_52%,transparent_100%)] transition-opacity duration-500 group-hover:opacity-90"
                />
                <span className="absolute inset-x-0 bottom-0 z-20 p-5">
                  <span className="block font-heading text-[0.98rem] font-bold leading-snug text-white">
                    {a.titulo}
                  </span>
                  <span className="mt-2 block h-[2px] w-8 origin-left scale-x-100 bg-accent transition-transform duration-500 group-hover:scale-x-[2.6]" />
                </span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
