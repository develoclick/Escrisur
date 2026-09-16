import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Handshake,
  PackageCheck,
  RefreshCcw,
  Truck,
} from "lucide-react";
import {
  Carrusel,
  Galeria,
  HeroCarrusel,
  Marquesina,
  ProcesoInteractivo,
  SelectorLineas,
} from "@/components/site/interactive";
import { Counter, Parallax, Reveal, SeccionTitulo } from "@/components/site/primitives";
import { BandaCta } from "@/components/site/blocks";
import { Cotizador } from "@/components/site/cotizacion";
import { EMPRESA, FOTOS } from "@/lib/content";
import {
  ESCRITORIO,
  FERRETERIA,
  GALERIA,
  INICIO,
  LICITACIONES,
  PROCESO,
  SERVICIOS,
} from "@/lib/paginas";

const ICONOS_PORQUE = [Boxes, Truck, RefreshCcw, Handshake];

export default function Inicio() {
  return (
    <>
      <HeroCarrusel slides={INICIO.slides} />
      <Marquesina items={INICIO.marquesina} />

      {/* ───────────── NOSOTROS (resumen) ───────────── */}
      <section className="band overflow-hidden bg-white">
        <div className="shell grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <Reveal x={-40} y={0} className="relative pb-20 pr-10 sm:pr-24">
            <Parallax src={FOTOS.almacen} alt="Almacén de ESCRISUR con estanterías de productos" sizes="(max-width:1024px) 90vw, 42vw" intensidad={10} className="aspect-[4/5] rounded-3xl shadow-[0_40px_80px_-40px_rgba(7,47,43,0.6)]" />
            <div className="absolute bottom-0 right-0 w-[52%] overflow-hidden rounded-3xl border-[8px] border-white shadow-2xl">
              <div className="relative aspect-square">
                <Image src={FOTOS.atencion} alt="Atención personalizada a clientes" fill sizes="25vw" className="object-cover" />
              </div>
            </div>
            <div aria-hidden="true" className="dotgrid absolute -left-6 top-10 -z-10 size-32" />
            <div className="absolute left-6 top-6 grid size-32 place-content-center rounded-full border-[6px] border-white bg-accent text-center text-accent-on shadow-xl">
              <span className="font-heading text-[1.9rem] font-black leading-none">{EMPRESA.anio}</span>
              <span className="mt-1 font-heading text-[0.58rem] font-bold uppercase tracking-[0.14em]">Constituida</span>
            </div>
          </Reveal>

          <div>
            <SeccionTitulo
              eyebrow="Quiénes somos"
              titulo="Tu aliado en"
              destacado="oficina y ferretería"
              texto="ESCRISUR reúne en una sola distribuidora dos líneas que normalmente exigen proveedores distintos, y suma servicios de limpieza y abastecimiento programado."
              className="!mb-8"
            />
            <Reveal delay={0.1}>
              <dl className="grid grid-cols-2 gap-4">
                {INICIO.confianza.map((c) => (
                  <div key={c.etiqueta} className="rounded-2xl border border-border bg-surface-muted/60 p-5 transition-colors hover:border-primary-bright">
                    <dt className="sr-only">{c.etiqueta}</dt>
                    <dd>
                      <Counter value={c.valor} className="block font-heading text-[2.2rem] font-black leading-none text-primary" />
                      <span className="mt-2 block text-[0.88rem] leading-snug text-text-light">{c.etiqueta}</span>
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-9 flex flex-wrap items-center gap-6">
                <Link href="/nosotros" className="btn btn-secondary">
                  Conocer la empresa
                  <ArrowRight className="flecha size-4" aria-hidden="true" />
                </Link>
                <p className="text-[0.9rem] text-text-light">
                  <strong className="font-heading text-text">{EMPRESA.titular}</strong>
                  <br />
                  {EMPRESA.cargo}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────── LÍNEAS ───────────── */}
      <section className="band bg-surface-muted">
        <div className="shell">
          <SeccionTitulo
            eyebrow="Nuestras líneas"
            titulo="Escritorio y ferretería,"
            destacado="un solo proveedor"
            texto="Elija una línea para ver lo que abastecemos. Cada categoría enlaza a su detalle."
          />
          <Reveal>
            <SelectorLineas
              lineas={[
                {
                  id: "escritorio",
                  nombre: "Escritorio",
                  titulo: "Materiales de escritorio",
                  texto: ESCRITORIO.hero.texto,
                  href: "/escritorio",
                  foto: FOTOS.suministrosEscritorio,
                  categorias: ESCRITORIO.categorias,
                },
                {
                  id: "ferreteria",
                  nombre: "Ferretería",
                  titulo: "Ferretería y seguridad",
                  texto: FERRETERIA.hero.texto,
                  href: "/ferreteria",
                  foto: FOTOS.herramientas,
                  categorias: FERRETERIA.categorias,
                },
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* ───────────── POR QUÉ ───────────── */}
      <section className="band bg-white">
        <div className="shell grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-20">
          <div>
            <SeccionTitulo
              eyebrow="Por qué ESCRISUR"
              titulo="Cómo trabajamos"
              destacado="con cada pedido"
              className="!mb-10"
            />
            <ul className="grid gap-5 sm:grid-cols-2">
              {INICIO.porque.map((p, n) => {
                const Icono = ICONOS_PORQUE[n];
                return (
                  <Reveal as="li" key={p.titulo} delay={0.08 * n} className="group rounded-2xl border border-border p-6 transition-all duration-500 hover:-translate-y-1 hover:border-transparent hover:bg-primary-dark hover:shadow-[0_30px_60px_-30px_rgba(7,47,43,0.7)]">
                    <span className="grid size-13 place-items-center rounded-2xl bg-surface-soft text-accent-ink transition-colors duration-500 group-hover:bg-accent group-hover:text-accent-on">
                      <Icono className="size-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-[1.12rem] transition-colors duration-500 group-hover:text-white">{p.titulo}</h3>
                    <p className="mt-2 text-[0.94rem] leading-relaxed text-text-light transition-colors duration-500 group-hover:text-on-dark-muted">{p.texto}</p>
                  </Reveal>
                );
              })}
            </ul>
          </div>

          <Reveal x={40} y={0} className="relative">
            <Parallax src={FOTOS.aliado} alt="Recepción con el mensaje: tu aliado en oficina y ferretería" sizes="(max-width:1024px) 90vw, 42vw" intensidad={9} className="aspect-[4/5] rounded-3xl" />
            <div className="absolute -bottom-8 left-6 right-6 flex items-center gap-4 rounded-2xl bg-white p-5 shadow-[0_30px_60px_-30px_rgba(7,47,43,0.55)] sm:left-auto sm:w-80">
              <span className="grid size-12 flex-none place-items-center rounded-full bg-primary-bright text-white">
                <PackageCheck className="size-6" aria-hidden="true" />
              </span>
              <p className="text-[0.92rem] leading-snug">
                <strong className="block font-heading text-text">Verificación antes del despacho</strong>
                <span className="text-text-light">Cada ítem contra lo solicitado.</span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────── SERVICIOS (carrusel) ───────────── */}
      <section className="band overflow-hidden bg-primary-dark text-white">
        <div className="shell">
          <SeccionTitulo
            eyebrow="Servicios"
            titulo="Más que productos:"
            destacado="servicios que sostienen su operación"
            oscuro
          >
            <Link href="/servicios" className="btn btn-ghost-dark">
              Ver servicios
              <ArrowRight className="flecha size-4" aria-hidden="true" />
            </Link>
          </SeccionTitulo>

          <Carrusel etiqueta="Servicios de ESCRISUR" oscuro>
            {SERVICIOS.lista.map((s) => (
              <li key={s.id} className="w-[82%] flex-none snap-start sm:w-[46%] lg:w-[31%]">
                <Link href={`/servicios#${s.id}`} className="group block h-full overflow-hidden rounded-3xl bg-white/[0.05] ring-1 ring-white/10 transition-colors hover:bg-white/[0.09]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={s.foto} alt={s.titulo} fill sizes="(max-width:640px) 82vw, 31vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <span className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-accent text-accent-on transition-transform duration-500 group-hover:rotate-45">
                      <ArrowUpRight className="size-5" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="p-7">
                    <h3 className="text-[1.25rem] text-white">{s.titulo}</h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-on-dark-muted">{s.resumen}</p>
                  </div>
                </Link>
              </li>
            ))}
          </Carrusel>
        </div>
      </section>

      {/* ───────────── PROCESO ───────────── */}
      <section className="band relative overflow-hidden bg-primary-deep text-white">
        <div className="shell">
          <SeccionTitulo eyebrow="Proceso" titulo="De su requerimiento" destacado="a su almacén" oscuro centrado />
          <ProcesoInteractivo pasos={PROCESO} />
        </div>
      </section>

      {/* ───────────── GALERÍA ───────────── */}
      <section className="band bg-white">
        <div className="shell">
          <SeccionTitulo eyebrow="Galería" titulo="Stock, orden" destacado="y entregas">
            <p className="max-w-[26rem] text-text-light">Haga clic en cualquier imagen para ampliarla.</p>
          </SeccionTitulo>
          <Galeria fotos={GALERIA} />
        </div>
      </section>

      {/* ───────────── SECTOR PÚBLICO ───────────── */}
      <section className="band bg-surface-soft">
        <div className="shell grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="group relative">
            <div className="relative aspect-[5/4] overflow-hidden rounded-3xl">
              <Image src={FOTOS.acuerdo} alt="Firma de acuerdo comercial" fill sizes="(max-width:1024px) 90vw, 45vw" className="object-cover transition-transform duration-[1100ms] group-hover:scale-105" />
            </div>
            <div className="absolute -right-3 -top-6 rounded-2xl bg-primary-dark px-7 py-5 text-white shadow-xl sm:-right-6">
              <span className="block font-heading text-[2.4rem] font-black leading-none text-accent">
                <Counter value="44" />
              </span>
              <span className="mt-1 block text-[0.82rem] text-on-dark-muted">actividades inscritas</span>
            </div>
          </Reveal>
          <div>
            <SeccionTitulo
              eyebrow="Sector público"
              titulo="Preparados para"
              destacado="contratar con el Estado"
              texto={LICITACIONES.hero.texto}
              className="!mb-8"
            />
            <Reveal delay={0.1}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {LICITACIONES.procesos.map((p) => (
                  <li key={p.titulo} className="flex items-center gap-3 rounded-xl bg-white px-4 py-3.5 font-semibold shadow-sm">
                    <span className="size-2.5 flex-none rotate-45 bg-accent" />
                    {p.titulo}
                  </li>
                ))}
              </ul>
              <Link href="/licitaciones" className="btn btn-secondary mt-9">
                Ver cómo participamos
                <ArrowRight className="flecha size-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────── COTIZACIÓN ───────────── */}
      <section id="cotizar" className="band relative overflow-hidden bg-primary-dark text-white">
        <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[42%] lg:block">
          <Image src={FOTOS.oficina} alt="" fill sizes="42vw" className="object-cover opacity-25" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--primary-dark),transparent)]" />
        </div>
        <div className="shell relative grid items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div>
            <SeccionTitulo
              eyebrow="Cotización"
              titulo="Reciba su propuesta"
              destacado="en dos pasos"
              texto="Cuéntenos qué necesita y a quién enviar la propuesta. Sin registros ni llamadas previas."
              oscuro
              className="!mb-8"
            />
            <Reveal delay={0.1}>
              <ul className="space-y-4">
                {["Una sola propuesta para escritorio y ferretería", "La revisa directamente la gerencia", "Sin compromiso de compra"].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-[1rem] text-on-dark-muted">
                    <span className="grid size-7 place-items-center rounded-full bg-accent text-accent-on">
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <Cotizador />
          </Reveal>
        </div>
      </section>

      <BandaCta
        titulo="Grandes proyectos comienzan"
        destacado="con buenos suministros"
        texto="Abastezca oficinas, obras y equipos con un proveedor formal que entrega el pedido completo en su almacén."
        foto={FOTOS.distribucion}
      />
    </>
  );
}
