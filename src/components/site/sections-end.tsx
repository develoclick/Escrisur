import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, MapPin } from "lucide-react";
import { Media, Reveal } from "@/components/site/primitives";
import { CTA_FINAL, EMPRESA, FOOTER, LICITACIONES, NAV, PROCESO } from "@/lib/content";

/* ==========================================================================
   09 · PROCESO
   Cuatro pasos con retrato circular y línea de conexión punteada.
   ========================================================================== */
export function Proceso() {
  return (
    <section id="proceso" className="band bg-white">
      <div className="shell">
        <Reveal className="mx-auto mb-16 max-w-[46ch] text-center">
          <span className="eyebrow">Proceso de atención</span>
          <h2 className="mt-6 font-heading text-[clamp(1.9rem,3.7vw,3rem)] font-extrabold">
            Cómo atendemos su requerimiento
          </h2>
        </Reveal>

        <div className="relative">
          {/* línea que une los pasos */}
          <div
            aria-hidden="true"
            className="absolute left-[12%] right-[12%] top-[84px] hidden border-t-2 border-dashed border-border-strong lg:block"
          />

          <ol className="relative grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {PROCESO.map((p, i) => (
              <Reveal as="li" key={p.paso} delay={0.08 * i} className="text-center">
                <div className="group relative mx-auto w-[168px]">
                  <Media
                    slot={p.media}
                    alt=""
                    className="aspect-square rounded-full ring-[6px] ring-white"
                    sizes="168px"
                  />
                  <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-support px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-white">
                    Paso {p.paso}
                  </span>
                </div>

                <h3 className="mt-10 font-heading text-[1.12rem] font-bold text-text">
                  {p.titulo}
                </h3>
                <p className="mx-auto mt-3 max-w-[30ch] text-[0.9rem] leading-relaxed text-text-light">
                  {p.texto}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   10 · LICITACIONES
   Composición 55/45: imagen grande con recuadro de datos y bloque de texto.
   ========================================================================== */
export function Licitaciones() {
  return (
    <section id="licitaciones" className="band bg-surface-soft">
      <div className="shell grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-20">
        <Reveal className="relative">
          <div className="group relative">
            <Media
              slot="licitaciones"
              alt="Preparación de documentación para procesos de contratación pública"
              className="aspect-[4/3] shadow-[0_30px_70px_-34px_rgba(4,37,43,0.55)]"
              sizes="(max-width: 1024px) 92vw, 46vw"
            />
          </div>
          <div className="relative -mt-14 ml-auto mr-6 w-fit bg-primary-dark px-9 py-7 text-white shadow-[0_24px_54px_-26px_rgba(4,37,43,0.7)] sm:-mt-16">
            <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.17em] text-on-dark-muted">
              Objeto social inscrito
            </span>
            <span className="mt-2 block font-heading text-[1.85rem] font-extrabold leading-none">
              44 actividades
            </span>
          </div>
          <div aria-hidden="true" className="dotgrid absolute -bottom-6 left-2 -z-10 hidden size-28 lg:block" />
        </Reveal>

        <Reveal delay={0.1}>
          <span className="eyebrow">{LICITACIONES.eyebrow}</span>
          <h2 className="mt-6 max-w-[16ch] font-heading text-[clamp(1.9rem,3.7vw,3rem)] font-extrabold">
            {LICITACIONES.titulo}
          </h2>
          <p className="mt-6 max-w-[48ch] text-[0.99rem] leading-[1.85] text-text-light">
            {LICITACIONES.texto}
          </p>

          <ul className="mt-9 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {LICITACIONES.items.map((it) => (
              <li key={it} className="flex items-center gap-3">
                <span className="grid size-6 flex-none place-items-center rounded-full bg-accent/12 text-accent">
                  <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                </span>
                <span className="text-[0.95rem] font-semibold text-text">{it}</span>
              </li>
            ))}
          </ul>

          <Link
            href={LICITACIONES.cta.href}
            className="group mt-11 inline-flex items-center gap-3 bg-primary-dark px-9 py-[18px] text-[0.82rem] font-bold uppercase tracking-[0.09em] text-white transition-colors hover:bg-primary"
          >
            {LICITACIONES.cta.label}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ==========================================================================
   11 · CTA FINAL
   ========================================================================== */
export function CtaFinal() {
  return (
    <section className="relative isolate overflow-hidden bg-primary-dark text-white">
      <Media
        slot="cta"
        alt=""
        className="absolute inset-0 opacity-30"
        sizes="100vw"
        zoom={false}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(94deg,var(--primary-dark)_16%,rgba(5,52,59,0.86)_58%,rgba(5,52,59,0.6)_100%)]"
      />

      <div className="shell relative grid items-center gap-10 py-[clamp(60px,7.5vw,104px)] lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
        <Reveal>
          <h2 className="max-w-[18ch] font-heading text-[clamp(1.9rem,3.9vw,3.15rem)] font-extrabold text-white">
            {CTA_FINAL.titulo}
          </h2>
          <p className="mt-5 max-w-[52ch] text-[1rem] leading-[1.85] text-on-dark-muted">
            {CTA_FINAL.texto}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <Link
            href={CTA_FINAL.cta.href}
            className="group inline-flex items-center gap-3 bg-accent px-10 py-[20px] text-[0.86rem] font-bold uppercase tracking-[0.09em] text-white transition-colors hover:bg-accent-dark"
          >
            {CTA_FINAL.cta.label}
            <span className="grid size-7 place-items-center rounded-full border border-white/45 transition-transform duration-300 group-hover:translate-x-1">
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </span>
          </Link>
        </Reveal>
      </div>

      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-accent" />
    </section>
  );
}

/* ==========================================================================
   12 · PIE
   ========================================================================== */
export function Footer() {
  return (
    <footer className="bg-primary-dark text-on-dark-muted">
      <div className="shell py-[clamp(52px,6vw,88px)]">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.15fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-10 flex-none place-items-center bg-accent font-heading text-[1rem] font-extrabold text-white">
                E
              </span>
              <span className="font-heading text-[1.5rem] font-extrabold tracking-[-0.03em] text-white">
                {EMPRESA.marca}
              </span>
            </div>
            <p className="mt-5 max-w-[38ch] text-[0.92rem] leading-relaxed">
              {EMPRESA.razonSocial}. Comercialización de productos y prestación
              de servicios para empresas, instituciones y entidades públicas y
              privadas.
            </p>
          </div>

          {FOOTER.columnas.map((col) => (
            <div key={col.titulo}>
              <h3 className="text-[0.72rem] font-bold uppercase tracking-[0.17em] text-white">
                {col.titulo}
              </h3>
              <ul className="mt-6 space-y-2">
                {col.items.map((it) => (
                  <li key={it.label}>
                    <Link
                      href={it.href}
                      className="inline-block py-1.5 text-[0.92rem] transition-colors hover:text-accent-vivid"
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-[0.72rem] font-bold uppercase tracking-[0.17em] text-white">
              Contacto
            </h3>
            <ul className="mt-6 space-y-3.5 text-[0.92rem]">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-1 size-4 flex-none text-accent-vivid" aria-hidden="true" />
                <span>
                  {EMPRESA.distrito}
                  <br />
                  {EMPRESA.provincia}
                  <br />
                  {EMPRESA.region}, {EMPRESA.pais}
                </span>
              </li>
            </ul>

            <h3 className="mt-8 text-[0.72rem] font-bold uppercase tracking-[0.17em] text-white">
              Información
            </h3>
            <ul className="mt-5 space-y-2 text-[0.92rem]">
              <li>{EMPRESA.tipo}</li>
              <li>Partida N.º {EMPRESA.partida}</li>
              <li>Tel. {EMPRESA.telefono}</li>
              <li className="break-words">Correo {EMPRESA.correo}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/12 pt-7 text-[0.82rem]">
          <span>© {new Date().getFullYear()} {EMPRESA.razonSocial}</span>
          <span className="hidden sm:inline">
            {EMPRESA.titular} — {EMPRESA.cargo}
          </span>
          <nav aria-label="Enlaces del pie" className="ml-auto flex flex-wrap gap-x-6 gap-y-2">
            {NAV.slice(1).map((n) => (
              <Link
                key={n.label}
                href={n.href}
                className="inline-block py-1.5 transition-colors hover:text-accent-vivid"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
