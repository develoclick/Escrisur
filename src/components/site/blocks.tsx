import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { Parallax, Reveal } from "@/components/site/primitives";
import type { Categoria } from "@/lib/paginas";
import { cn } from "@/lib/utils";

/* ==========================================================================
   Cabecera de página interior con parallax y miga de pan
   ========================================================================== */
export function PageHero({
  eyebrow,
  titulo,
  texto,
  foto,
  ruta,
  cta = { label: "Solicitar cotización", href: "/contacto" },
}: {
  eyebrow: string;
  titulo: string;
  texto: string;
  foto: string;
  ruta: string;
  cta?: { label: string; href: string };
}) {
  return (
    <Parallax src={foto} alt="" preload intensidad={12} className="isolate bg-primary-dark text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(100deg,rgba(7,47,43,0.95)_0%,rgba(7,47,43,0.84)_45%,rgba(7,47,43,0.45)_100%)]"
      />
      <div className="shell relative py-[clamp(72px,10vw,150px)]">
        {/* entrada por CSS: visible aunque JavaScript no cargue (es el LCP) */}
        <div className="entrada">
          <nav aria-label="Ruta de navegación">
            <ol className="flex flex-wrap items-center gap-2 text-[0.84rem] text-on-dark-muted">
              <li>
                <Link href="/" className="inline-block py-1.5 pr-1 transition-colors hover:text-accent">Inicio</Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="size-3.5" />
              </li>
              <li aria-current="page" className="font-semibold text-white">{ruta}</li>
            </ol>
          </nav>
          <span className="eyebrow eyebrow--on-dark mt-8">{eyebrow}</span>
          <h1 className="mt-5 max-w-[20ch] text-[clamp(2.2rem,5vw,4rem)] font-black leading-[1.05] text-white">
            {titulo}
          </h1>
          <p className="mt-6 max-w-[40rem] text-[1.08rem] leading-[1.8] text-on-dark-muted">{texto}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href={cta.href} className="btn btn-primary">
              {cta.label}
              <ArrowRight className="flecha size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="franja absolute inset-x-0 bottom-0 h-1.5" />
    </Parallax>
  );
}

/* ==========================================================================
   Índice fijo + fichas de categoría alternadas
   ========================================================================== */
export function Catalogo({
  categorias,
  lineaForm,
  etiquetaItems = "Incluye",
}: {
  categorias: Categoria[];
  lineaForm: string;
  etiquetaItems?: string;
}) {
  return (
    <section className="band bg-white">
      <div className="shell grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
        <nav aria-label="Categorías" className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-heading text-[0.74rem] font-bold uppercase tracking-[0.18em] text-text-light">
            En esta página
          </p>
          <ol className="no-scrollbar mt-4 flex gap-2 overflow-x-auto lg:flex-col lg:gap-1">
            {categorias.map((c, n) => (
              <li key={c.id} className="flex-none">
                <a
                  href={`#${c.id}`}
                  className="group flex items-center gap-3 rounded-full border border-border px-4 py-2.5 text-[0.9rem] font-semibold text-text transition-colors hover:border-primary hover:text-primary lg:rounded-xl lg:border-transparent lg:hover:border-border lg:hover:bg-surface-muted"
                >
                  <span className="font-heading text-[0.78rem] font-black text-accent-ink">
                    {String(n + 1).padStart(2, "0")}
                  </span>
                  {c.titulo}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="space-y-20 lg:space-y-28">
          {categorias.map((c, n) => (
            <article key={c.id} id={c.id} className="scroll-mt-28">
              <div className={cn("grid items-center gap-8 md:grid-cols-2 md:gap-12", n % 2 === 1 && "md:[&>*:first-child]:order-2")}>
                <Reveal x={n % 2 === 1 ? 40 : -40} y={0} className="group relative">
                  <div className="relative aspect-[6/5] overflow-hidden rounded-3xl">
                    <Image
                      src={c.foto}
                      alt={c.titulo}
                      fill
                      sizes="(max-width:768px) 100vw, 40vw"
                      className="object-cover transition-transform duration-[1100ms] group-hover:scale-[1.07]"
                    />
                  </div>
                  <span className="absolute -top-4 left-6 rounded-full bg-accent px-5 py-2 font-heading text-[0.9rem] font-black text-accent-on shadow-lg">
                    {String(n + 1).padStart(2, "0")}
                  </span>
                </Reveal>

                <Reveal delay={0.1}>
                  <h2 className="text-[clamp(1.6rem,2.8vw,2.2rem)]">{c.titulo}</h2>
                  <p className="mt-4 text-[1.02rem] leading-[1.85] text-text-light">{c.resumen}</p>
                  <p className="mt-7 font-heading text-[0.74rem] font-bold uppercase tracking-[0.18em] text-primary">
                    {etiquetaItems}
                  </p>
                  <ul className="mt-4 space-y-3">
                    {c.items.map((it) => (
                      <li key={it} className="flex items-start gap-3">
                        <span className="mt-0.5 grid size-6 flex-none place-items-center rounded-full bg-surface-muted text-primary">
                          <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                        </span>
                        <span className="text-[0.98rem]">{it}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/contacto?linea=${lineaForm}`} className="btn btn-secondary mt-8">
                    Cotizar {c.titulo.split(" ")[0].toLowerCase()}
                    <ArrowRight className="flecha size-4" aria-hidden="true" />
                  </Link>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   Tarjetas numeradas
   ========================================================================== */
export function Tarjetas({
  items,
  oscuro = false,
  columnas = 3,
}: {
  items: { titulo: string; texto: string }[];
  oscuro?: boolean;
  columnas?: 3 | 4;
}) {
  return (
    <ul className={cn("grid gap-5 sm:grid-cols-2", columnas === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3")}>
      {items.map((it, n) => (
        <Reveal
          as="li"
          key={it.titulo}
          delay={0.07 * n}
          className={cn(
            "group relative overflow-hidden rounded-2xl border p-8 transition-all duration-500 hover:-translate-y-1",
            oscuro
              ? "border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.08]"
              : "border-border bg-white hover:border-transparent hover:shadow-[0_26px_54px_-30px_rgba(7,47,43,0.45)]",
          )}
        >
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
          {/* número de marca de agua: decorativo, fuera del árbol de accesibilidad */}
          <span aria-hidden="true" className={cn("block font-heading text-[2.4rem] font-black leading-none", oscuro ? "text-white/15" : "text-primary-bright/20")}>
            {String(n + 1).padStart(2, "0")}
          </span>
          <h3 className={cn("mt-4 text-[1.15rem]", oscuro && "text-white")}>{it.titulo}</h3>
          <p className={cn("mt-3 text-[0.95rem] leading-relaxed", oscuro ? "text-on-dark-muted" : "text-text-light")}>
            {it.texto}
          </p>
        </Reveal>
      ))}
    </ul>
  );
}

/* ==========================================================================
   Banda final de conversión con parallax
   ========================================================================== */
export function BandaCta({
  titulo,
  destacado,
  texto,
  foto,
  href = "/contacto",
  label = "Solicitar cotización",
}: {
  titulo: string;
  destacado?: string;
  texto: string;
  foto: string;
  href?: string;
  label?: string;
}) {
  return (
    <Parallax src={foto} alt="" intensidad={16} className="isolate bg-primary-dark text-white">
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(95deg,rgba(7,47,43,0.95)_20%,rgba(7,47,43,0.72)_100%)]" />
      <div className="shell relative grid items-center gap-10 py-[clamp(70px,9vw,128px)] lg:grid-cols-[minmax(0,1fr)_auto]">
        <Reveal>
          <h2 className="max-w-[20ch] text-[clamp(1.9rem,4vw,3.2rem)] text-white">
            {titulo} {destacado && <span className="hl--on-dark">{destacado}</span>}
          </h2>
          <p className="mt-5 max-w-[42rem] text-[1.05rem] leading-[1.8] text-on-dark-muted">{texto}</p>
        </Reveal>
        <Reveal delay={0.12}>
          <Link href={href} className="btn btn-primary !px-10 !py-5 text-[0.9rem]">
            {label}
            <ArrowRight className="flecha size-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </Parallax>
  );
}
