import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Phone } from "lucide-react";
import { Media, Reveal } from "@/components/site/primitives";
import { ABOUT, EMPRESA, HERO, PRODUCTOS } from "@/lib/content";

/* ==========================================================================
   02 · HERO
   Fotografía a sangre, velo desde la izquierda, titular a gran escala,
   par de acciones y bloque de contacto. Tarjeta de registro descolgada
   en la esquina inferior derecha.
   ========================================================================== */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-primary-dark text-white">
      <Media
        slot="hero"
        alt="Almacén de suministros y material de oficina preparado para despacho"
        className="absolute inset-0"
        sizes="100vw"
        preload
        zoom={false}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(96deg,var(--primary-dark)_6%,rgba(5,52,59,0.94)_34%,rgba(5,52,59,0.55)_66%,rgba(5,52,59,0.78)_100%)]"
      />

      {/* muesca blanca bajo la cabecera, recurso de la referencia */}
      <div
        aria-hidden="true"
        className="notch absolute left-0 top-0 hidden h-8 w-[46%] bg-white lg:block"
      />

      <div className="shell relative flex min-h-[min(86vh,830px)] flex-col justify-center py-24 lg:py-32">
        <div className="max-w-[760px]">
          <Reveal>
            <span className="eyebrow eyebrow--on-dark">{HERO.eyebrow}</span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-6 font-heading text-[clamp(2.4rem,5.6vw,4.6rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-white">
              {HERO.titulo}
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-7 max-w-[560px] text-[1.05rem] leading-[1.85] text-on-dark-muted">
              {HERO.texto}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-4">
              <Link
                href={HERO.ctaPrimario.href}
                className="group inline-flex items-center gap-3 bg-accent px-9 py-[18px] text-[0.86rem] font-bold uppercase tracking-[0.09em] text-white transition-colors hover:bg-accent-dark"
              >
                {HERO.ctaPrimario.label}
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>

              <Link
                href={HERO.ctaSecundario.href}
                className="inline-flex items-center gap-3 border border-white/35 px-9 py-[18px] text-[0.86rem] font-bold uppercase tracking-[0.09em] text-white transition-colors hover:border-white hover:bg-white/10"
              >
                {HERO.ctaSecundario.label}
              </Link>

              <span className="flex items-center gap-3 sm:ml-4">
                <span className="grid size-12 flex-none place-items-center rounded-full bg-support text-white">
                  <Phone className="size-5" aria-hidden="true" />
                </span>
                <span className="leading-tight">
                  <span className="block text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-on-dark-muted">
                    Atención directa
                  </span>
                  <span className="block text-[1rem] font-bold text-white">
                    {EMPRESA.telefono}
                  </span>
                </span>
              </span>
            </div>
          </Reveal>
        </div>
      </div>

      {/* tarjeta de registro descolgada */}
      <div className="relative z-10 hidden lg:block">
        <div className="shell">
          <div className="ml-auto flex w-fit -translate-y-px">
            <div className="bg-primary-dark px-10 py-7 ring-1 ring-white/12">
              <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-on-dark-muted">
                Empresa registrada
              </span>
              <span className="mt-2 block font-heading text-[1.02rem] font-bold text-white">
                Partida electrónica N.º {EMPRESA.partida}
              </span>
            </div>
            <Link
              href="#licitaciones"
              className="group grid w-[92px] place-items-center bg-accent text-white transition-colors hover:bg-accent-dark"
              aria-label="Ir a soluciones para el sector público"
            >
              <ArrowUpRight
                className="size-7 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   03 · NOSOTROS
   Collage asimétrico con insignia circular y lista de verificación.
   ========================================================================== */
export function About() {
  return (
    <section id="nosotros" className="band bg-white">
      <div className="shell grid items-center gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
        {/* collage */}
        <Reveal className="relative">
          <div className="relative pb-16 pr-14 sm:pb-20 sm:pr-20">
            <div className="group relative">
              <Media
                slot="about-a"
                alt="Bodega con productos de oficina clasificados para su distribución"
                className="aspect-[4/5] w-[82%] shadow-[0_28px_70px_-30px_rgba(4,37,43,0.55)]"
                sizes="(max-width: 1024px) 82vw, 34vw"
              />
            </div>

            <div className="group absolute bottom-0 right-0 hidden w-[52%] border-[10px] border-white shadow-[0_28px_70px_-30px_rgba(4,37,43,0.55)] sm:block">
              <Media
                slot="about-b"
                alt="Entrega de suministros en la sede de una institución"
                className="aspect-square"
                sizes="30vw"
              />
            </div>

            <div
              aria-hidden="true"
              className="dotgrid absolute -left-4 bottom-8 -z-10 hidden size-28 sm:block"
            />

            {/* insignia circular */}
            <div className="absolute bottom-6 left-[6%] grid size-32 place-content-center rounded-full border-[7px] border-white bg-support text-center text-white shadow-[0_20px_50px_-18px_rgba(4,37,43,0.6)] sm:bottom-10">
              <span className="font-heading text-[2rem] font-extrabold leading-none">
                {EMPRESA.anio}
              </span>
              <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] opacity-95">
                Constituida
              </span>
            </div>
          </div>
        </Reveal>

        {/* texto */}
        <Reveal delay={0.1}>
          <span className="eyebrow">{ABOUT.eyebrow}</span>
          <h2 className="mt-6 max-w-[16ch] font-heading text-[clamp(1.9rem,3.7vw,3rem)] font-extrabold">
            {ABOUT.titulo}
          </h2>

          <blockquote className="mt-7 border-l-[3px] border-accent pl-6 text-[1.02rem] leading-[1.85] text-text-light">
            {ABOUT.cita}
          </blockquote>

          <p className="mt-7 font-heading text-[1.08rem] font-bold text-text">
            {ABOUT.claim}
          </p>

          <ul className="mt-7 space-y-4">
            {ABOUT.puntos.map((p) => (
              <li key={p} className="flex items-start gap-3.5">
                <span className="mt-0.5 grid size-[22px] flex-none place-items-center rounded-full bg-support/12 text-support">
                  <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                </span>
                <span className="text-[0.97rem] text-text-light">{p}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-border pt-8">
            <span className="flex items-center gap-4">
              <span className="grid size-14 flex-none place-items-center rounded-full bg-primary-dark font-heading text-[0.95rem] font-bold text-white">
                GC
              </span>
              <span className="leading-tight">
                <span className="block font-heading text-[0.95rem] font-bold text-text">
                  {EMPRESA.titular}
                </span>
                <span className="mt-1 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-text-light">
                  {EMPRESA.cargo}
                </span>
              </span>
            </span>

            <Link
              href={ABOUT.cta.href}
              className="group ml-auto inline-flex items-center gap-3 bg-primary-dark px-8 py-[17px] text-[0.82rem] font-bold uppercase tracking-[0.09em] text-white transition-colors hover:bg-primary"
            >
              {ABOUT.cta.label}
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ==========================================================================
   04 · PRODUCTOS
   Encabezado partido y retícula editorial de anchos desiguales.
   ========================================================================== */
const TRAMOS = [
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-4",
  "lg:col-span-5",
];

export function Productos() {
  return (
    <section id="productos" className="band bg-surface-soft">
      <div className="shell">
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-[22ch]">
            <span className="eyebrow">Líneas de comercialización</span>
            <h2 className="mt-6 font-heading text-[clamp(1.9rem,3.7vw,3rem)] font-extrabold">
              Productos para oficinas, instituciones y obra
            </h2>
          </div>
          <Link
            href="#cotizacion"
            className="group inline-flex items-center gap-3 bg-accent px-8 py-[17px] text-[0.82rem] font-bold uppercase tracking-[0.09em] text-white transition-colors hover:bg-accent-dark"
          >
            Consultar productos
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </Reveal>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-12">
          {PRODUCTOS.map((p, i) => (
            <Reveal
              as="li"
              key={p.numero}
              delay={0.06 * (i % 3)}
              className={TRAMOS[i]}
            >
              <Link
                href="#cotizacion"
                className="group flex h-full flex-col bg-white ring-1 ring-border transition-[box-shadow,transform] duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-32px_rgba(4,37,43,0.45)]"
              >
                <div className="relative overflow-hidden">
                  <Media
                    slot={`prod-${p.media}`}
                    alt={p.titulo}
                    className="aspect-[4/3]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span className="absolute left-0 top-0 bg-accent px-4 py-2 font-heading text-[0.82rem] font-bold text-white">
                    {p.numero}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-7">
                  <h3 className="font-heading text-[1.14rem] font-bold leading-snug text-text transition-colors group-hover:text-accent">
                    {p.titulo}
                  </h3>
                  <p className="text-[0.9rem] leading-relaxed text-text-light">{p.texto}</p>
                  <span className="mt-auto inline-flex size-11 items-center justify-center rounded-full border border-border-strong text-text transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                    <ArrowUpRight className="size-[18px]" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
