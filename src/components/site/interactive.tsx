"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Check,
  ChevronLeft,
  ChevronRight,
  Expand,
  MessageCircle,
  X,
} from "lucide-react";
import { EMPRESA } from "@/lib/content";
import type { Categoria, Paso } from "@/lib/paginas";
import { cn } from "@/lib/utils";

const EASE = [0.22, 0.8, 0.28, 1] as const;

/* ==========================================================================
   HERO — carrusel a sangre con Ken Burns, parallax y controles accesibles
   ========================================================================== */
type Slide = {
  eyebrow: string;
  titulo: string;
  destacado: string;
  texto: string;
  foto: string;
};

export function HeroCarrusel({ slides }: { slides: Slide[] }) {
  const reduce = useReducedMotion();
  const [i, setI] = React.useState(0);
  const [pausa, setPausa] = React.useState(false);
  const ref = React.useRef<HTMLElement>(null);
  const toque = React.useRef<number | null>(null);
  const DURACION = 7000;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yTexto = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const opTexto = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const ir = React.useCallback(
    (n: number) => setI((n + slides.length) % slides.length),
    [slides.length],
  );

  React.useEffect(() => {
    if (reduce || pausa) return;
    const t = setTimeout(() => ir(i + 1), DURACION);
    return () => clearTimeout(t);
  }, [i, pausa, reduce, ir]);

  const s = slides[i];

  return (
    <section
      ref={ref}
      aria-roledescription="carrusel"
      aria-label="Presentación de ESCRISUR"
      className="relative isolate flex min-h-[min(92vh,880px)] items-center overflow-hidden bg-primary-dark text-white"
      onMouseEnter={() => setPausa(true)}
      onMouseLeave={() => setPausa(false)}
      onFocusCapture={() => setPausa(true)}
      onBlurCapture={() => setPausa(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") ir(i + 1);
        if (e.key === "ArrowLeft") ir(i - 1);
      }}
      onTouchStart={(e) => (toque.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (toque.current === null) return;
        const dx = e.changedTouches[0].clientX - toque.current;
        if (Math.abs(dx) > 50) ir(dx < 0 ? i + 1 : i - 1);
        toque.current = null;
      }}
    >
      {/* fotografías */}
      <AnimatePresence initial={false}>
        <motion.div
          key={s.foto}
          className="absolute inset-0 -z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 1.1, ease: "easeInOut" }}
        >
          <Image
            src={s.foto}
            alt=""
            fill
            sizes="100vw"
            preload={i === 0}
            className={cn("object-cover", !reduce && "animate-kenburns")}
          />
        </motion.div>
      </AnimatePresence>

      {/* velo: oscuro a la izquierda para el texto */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(7,47,43,0.96)_0%,rgba(7,47,43,0.86)_38%,rgba(7,47,43,0.35)_75%,rgba(7,47,43,0.55)_100%)]"
      />
      <div aria-hidden="true" className="franja absolute bottom-0 left-0 -z-10 h-1.5 w-full opacity-90" />

      <motion.div style={reduce ? undefined : { y: yTexto, opacity: opTexto }} className="shell py-28">
        {/* initial={false}: el primer slide llega visible desde el servidor */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={i}
            className="max-w-[46rem]"
            initial={reduce ? false : { opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -16 }}
            transition={{ duration: 0.6, ease: EASE }}
            aria-live="polite"
          >
            <span className="eyebrow eyebrow--on-dark">{s.eyebrow}</span>
            {i === 0 ? (
              <h1 className="mt-6 text-[clamp(2.35rem,5.6vw,4.6rem)] font-black leading-[1.04] text-white">
                {s.titulo} <span className="hl--on-dark">{s.destacado}</span>
              </h1>
            ) : (
              <p className="mt-6 font-heading text-[clamp(2.35rem,5.6vw,4.6rem)] font-black leading-[1.04] tracking-[-0.02em] text-white">
                {s.titulo} <span className="hl--on-dark">{s.destacado}</span>
              </p>
            )}
            <p className="mt-6 max-w-[36rem] text-[1.08rem] leading-[1.8] text-on-dark-muted">{s.texto}</p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link href="/contacto" className="btn btn-primary">
            Solicitar cotización
            <ArrowRight className="flecha size-4" aria-hidden="true" />
          </Link>
          <Link href="/escritorio" className="btn btn-ghost-dark">
            Ver catálogo
          </Link>
        </div>

        <ul className="mt-12 flex flex-wrap gap-x-7 gap-y-3 text-[0.9rem] text-on-dark-muted">
          {["Pedido completo en un despacho", "Entrega en su almacén", "Reemplazo sin costo"].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <Check className="size-4 text-accent" strokeWidth={3} aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* controles */}
      <div className="absolute bottom-10 right-0 left-0">
        <div className="shell flex items-center justify-end gap-5">
          <ol className="hidden items-center gap-3 sm:flex" aria-label="Diapositivas">
            {slides.map((sl, n) => (
              <li key={sl.foto}>
                <button
                  type="button"
                  onClick={() => ir(n)}
                  aria-label={`Ir a la diapositiva ${n + 1}: ${sl.eyebrow}`}
                  aria-current={n === i}
                  className="group relative block h-1 w-14 overflow-hidden rounded-full bg-white/25"
                >
                  {n === i && (
                    <motion.span
                      key={`${i}-${pausa}`}
                      className="absolute inset-y-0 left-0 bg-accent"
                      initial={{ width: reduce || pausa ? "100%" : "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: reduce || pausa ? 0 : DURACION / 1000, ease: "linear" }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ol>
          <div className="flex gap-2">
            <button type="button" onClick={() => ir(i - 1)} aria-label="Diapositiva anterior" className="grid size-12 place-items-center rounded-full border border-white/30 text-white transition-colors hover:border-accent hover:bg-accent hover:text-accent-on">
              <ArrowLeft className="size-5" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => ir(i + 1)} aria-label="Diapositiva siguiente" className="grid size-12 place-items-center rounded-full border border-white/30 text-white transition-colors hover:border-accent hover:bg-accent hover:text-accent-on">
              <ArrowRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   MARQUESINA — franja de líneas en movimiento continuo
   ========================================================================== */
export function Marquesina({ items, oscuro = false }: { items: string[]; oscuro?: boolean }) {
  const fila = (
    <ul className="flex shrink-0 items-center" aria-hidden="true">
      {items.map((t) => (
        <li key={t} className="flex items-center gap-8 px-8 font-heading text-[clamp(1.1rem,2vw,1.6rem)] font-extrabold uppercase tracking-[-0.01em] whitespace-nowrap">
          {t}
          <span className="size-2.5 rotate-45 bg-accent" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className={cn("group overflow-hidden py-6", oscuro ? "bg-primary-dark text-white" : "bg-primary-bright text-white")}>
      <p className="sr-only">{items.join(", ")}</p>
      <div className="flex w-max animate-marquesina group-hover:[animation-play-state:paused]">
        {fila}
        {fila}
      </div>
    </div>
  );
}

/* ==========================================================================
   CARRUSEL — pista con scroll-snap, arrastre táctil nativo y botones
   ========================================================================== */
export function Carrusel({
  children,
  etiqueta,
  oscuro = false,
}: {
  children: React.ReactNode;
  etiqueta: string;
  oscuro?: boolean;
}) {
  const pista = React.useRef<HTMLUListElement>(null);
  const [bordes, setBordes] = React.useState({ inicio: true, fin: false });
  const [progreso, setProgreso] = React.useState(0);

  const medir = React.useCallback(() => {
    const el = pista.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setBordes({ inicio: el.scrollLeft < 8, fin: el.scrollLeft > max - 8 });
    setProgreso(max > 0 ? el.scrollLeft / max : 1);
  }, []);

  React.useEffect(() => {
    const el = pista.current;
    if (!el) return;
    const raf = requestAnimationFrame(medir);
    el.addEventListener("scroll", medir, { passive: true });
    window.addEventListener("resize", medir);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", medir);
      window.removeEventListener("resize", medir);
    };
  }, [medir]);

  const mover = (dir: 1 | -1) => {
    const el = pista.current;
    if (!el) return;
    const tarjeta = el.querySelector("li");
    const paso = tarjeta ? tarjeta.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * paso, behavior: "smooth" });
  };

  const boton = cn(
    "grid size-12 place-items-center rounded-full border transition-colors disabled:opacity-35",
    oscuro
      ? "border-white/30 text-white hover:border-accent hover:bg-accent hover:text-accent-on"
      : "border-border-strong text-text hover:border-primary hover:bg-primary hover:text-white",
  );

  return (
    <div role="region" aria-roledescription="carrusel" aria-label={etiqueta}>
      <ul
        ref={pista}
        tabIndex={0}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-5 px-5 pb-2 lg:-mx-10 lg:scroll-px-10 lg:px-10"
      >
        {children}
      </ul>
      <div className="mt-8 flex items-center gap-6">
        <div className={cn("h-1 flex-1 overflow-hidden rounded-full", oscuro ? "bg-white/15" : "bg-border")}>
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-300"
            style={{ width: `${Math.max(12, progreso * 100)}%` }}
          />
        </div>
        <div className="flex gap-2">
          <button type="button" className={boton} onClick={() => mover(-1)} disabled={bordes.inicio} aria-label="Anterior">
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button type="button" className={boton} onClick={() => mover(1)} disabled={bordes.fin} aria-label="Siguiente">
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SELECTOR DE LÍNEAS — pestañas Escritorio / Ferretería
   ========================================================================== */
type Linea = {
  id: string;
  nombre: string;
  titulo: string;
  texto: string;
  href: string;
  foto: string;
  categorias: Categoria[];
};

export function SelectorLineas({ lineas }: { lineas: Linea[] }) {
  const [activa, setActiva] = React.useState(0);
  const reduce = useReducedMotion();
  const l = lineas[activa];

  return (
    <div>
      <div role="tablist" aria-label="Líneas de producto" className="inline-flex rounded-full border border-border bg-white p-1.5 shadow-sm">
        {lineas.map((ln, n) => (
          <button
            key={ln.id}
            role="tab"
            type="button"
            id={`tab-${ln.id}`}
            aria-selected={n === activa}
            aria-controls={`panel-${ln.id}`}
            onClick={() => setActiva(n)}
            className={cn(
              "relative rounded-full px-6 py-3 font-heading text-[0.86rem] font-bold uppercase tracking-[0.08em] transition-colors sm:px-9",
              n === activa ? "text-white" : "text-text-light hover:text-text",
            )}
          >
            {n === activa && (
              <motion.span
                layoutId="pestana-activa"
                className={cn("absolute inset-0 rounded-full", ln.id === "ferreteria" ? "bg-accent" : "bg-primary")}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className={cn("relative", n === activa && ln.id === "ferreteria" && "text-accent-on")}>{ln.nombre}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={l.id}
          role="tabpanel"
          id={`panel-${l.id}`}
          aria-labelledby={`tab-${l.id}`}
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14"
        >
          <div className="group relative min-h-[380px] overflow-hidden rounded-3xl">
            <Image src={l.foto} alt={l.titulo} fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover transition-transform duration-[1100ms] group-hover:scale-105" />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(7,47,43,0.92)_10%,rgba(7,47,43,0.2)_65%)]" />
            <div className="absolute inset-x-0 bottom-0 p-8 text-white">
              <h3 className="text-[1.7rem] text-white">{l.titulo}</h3>
              <p className="mt-3 max-w-[30rem] text-[0.97rem] leading-relaxed text-on-dark-muted">{l.texto}</p>
              <Link href={l.href} className="btn btn-primary mt-6">
                Explorar la línea
                <ArrowRight className="flecha size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {l.categorias.map((c, n) => (
              <motion.li
                key={c.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.08 * n, ease: EASE }}
              >
                <Link
                  href={`${l.href}#${c.id}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition-[box-shadow,transform,border-color] duration-500 hover:-translate-y-1 hover:border-transparent hover:shadow-[0_24px_50px_-26px_rgba(7,47,43,0.45)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={c.foto} alt="" fill sizes="(max-width:640px) 100vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <h4 className="font-heading text-[1.02rem] font-bold text-text transition-colors group-hover:text-primary">{c.titulo}</h4>
                    <p className="text-[0.88rem] leading-relaxed text-text-light">{c.resumen}</p>
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ==========================================================================
   PROCESO INTERACTIVO — pasos que cambian la fotografía
   ========================================================================== */
export function ProcesoInteractivo({ pasos }: { pasos: Paso[] }) {
  const [activo, setActivo] = React.useState(0);
  const [interactuado, setInteractuado] = React.useState(false);
  const reduce = useReducedMotion();

  React.useEffect(() => {
    if (reduce || interactuado) return;
    const t = setTimeout(() => setActivo((a) => (a + 1) % pasos.length), 4200);
    return () => clearTimeout(t);
  }, [activo, interactuado, reduce, pasos.length]);

  const elegir = (n: number) => {
    setInteractuado(true);
    setActivo(n);
  };

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <ol className="order-2 space-y-3 lg:order-1">
        {pasos.map((p, n) => (
          <li key={p.titulo}>
            <button
              type="button"
              onClick={() => elegir(n)}
              onMouseEnter={() => elegir(n)}
              aria-pressed={n === activo}
              className={cn(
                "group flex w-full items-start gap-5 rounded-2xl border p-6 text-left transition-all duration-500",
                n === activo
                  ? "border-white/20 bg-white/[0.08]"
                  : "border-transparent hover:bg-white/[0.04]",
              )}
            >
              <span
                className={cn(
                  "grid size-12 flex-none place-items-center rounded-full font-heading text-[1rem] font-black transition-colors duration-500",
                  n === activo ? "bg-accent text-accent-on" : "bg-white/10 text-white",
                )}
              >
                {String(n + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="block font-heading text-[1.15rem] font-bold text-white">{p.titulo}</span>
                <span className="mt-1.5 block text-[0.95rem] leading-relaxed text-on-dark-muted">{p.texto}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>

      <div className="relative order-1 aspect-[5/4] overflow-hidden rounded-3xl lg:order-2">
        <AnimatePresence initial={false}>
          <motion.div
            key={pasos[activo].foto}
            className="absolute inset-0"
            initial={reduce ? false : { opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <Image src={pasos[activo].foto} alt={pasos[activo].titulo} fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
          </motion.div>
        </AnimatePresence>
        <div className="absolute left-5 top-5 rounded-full bg-primary-dark/85 px-4 py-2 font-heading text-[0.78rem] font-bold uppercase tracking-[0.12em] text-white backdrop-blur">
          Paso {activo + 1} de {pasos.length}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   GALERÍA con visor ampliado (teclado: ← → Esc)
   ========================================================================== */
export function Galeria({ fotos }: { fotos: { foto: string; alt: string }[] }) {
  const [abierta, setAbierta] = React.useState<number | null>(null);
  const cerrarRef = React.useRef<HTMLButtonElement>(null);
  const origen = React.useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  const cerrar = React.useCallback(() => {
    setAbierta(null);
    origen.current?.focus();
  }, []);

  React.useEffect(() => {
    if (abierta === null) return;
    document.body.style.overflow = "hidden";
    cerrarRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrar();
      if (e.key === "ArrowRight") setAbierta((a) => (a === null ? a : (a + 1) % fotos.length));
      if (e.key === "ArrowLeft") setAbierta((a) => (a === null ? a : (a - 1 + fotos.length) % fotos.length));
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [abierta, cerrar, fotos.length]);

  // mosaico: piezas altas y anchas alternadas
  const forma = ["row-span-2", "", "col-span-2", "", "row-span-2", "", "", "col-span-2"];

  return (
    <>
      <ul className="grid auto-rows-[190px] grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:auto-rows-[210px]">
        {fotos.map((f, n) => (
          <li key={f.foto} className={cn(forma[n % forma.length])}>
            <button
              type="button"
              onClick={(e) => {
                origen.current = e.currentTarget;
                setAbierta(n);
              }}
              className="group relative block size-full overflow-hidden rounded-2xl"
              aria-label={`Ampliar imagen: ${f.alt}`}
            >
              <Image src={f.foto} alt={f.alt} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <span className="absolute inset-0 bg-primary-dark/0 transition-colors duration-500 group-hover:bg-primary-dark/45" />
              <span className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="grid size-14 scale-75 place-items-center rounded-full bg-accent text-accent-on transition-transform duration-500 group-hover:scale-100">
                  <Expand className="size-5" aria-hidden="true" />
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {abierta !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={fotos[abierta].alt}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-primary-deep/95 p-4 backdrop-blur-sm sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3 }}
            onClick={cerrar}
          >
            <motion.div
              key={abierta}
              className="relative aspect-[6/5] w-full max-w-5xl overflow-hidden rounded-2xl"
              initial={reduce ? false : { scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={fotos[abierta].foto} alt={fotos[abierta].alt} fill sizes="100vw" className="object-contain" />
            </motion.div>
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-[0.9rem] text-on-dark-muted">
              {fotos[abierta].alt} · {abierta + 1}/{fotos.length}
            </p>
            <button ref={cerrarRef} type="button" onClick={cerrar} aria-label="Cerrar" className="absolute right-5 top-5 grid size-12 place-items-center rounded-full bg-white/10 text-white hover:bg-accent hover:text-accent-on">
              <X className="size-6" aria-hidden="true" />
            </button>
            <button type="button" aria-label="Anterior" onClick={(e) => { e.stopPropagation(); setAbierta((abierta - 1 + fotos.length) % fotos.length); }} className="absolute left-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-accent hover:text-accent-on sm:left-6">
              <ChevronLeft className="size-6" aria-hidden="true" />
            </button>
            <button type="button" aria-label="Siguiente" onClick={(e) => { e.stopPropagation(); setAbierta((abierta + 1) % fotos.length); }} className="absolute right-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-accent hover:text-accent-on sm:right-6">
              <ChevronRight className="size-6" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ==========================================================================
   CONVERSIÓN — barra fija en móvil, WhatsApp y volver arriba
   ========================================================================== */
export function Flotantes() {
  const [visible, setVisible] = React.useState(false);
  const [progreso, setProgreso] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(window.scrollY > 640);
      setProgreso(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const numero = EMPRESA.whatsapp.replace(/\D/g, "");
  const radio = 21;
  const circ = 2 * Math.PI * radio;

  return (
    <>
      {/* barra de acción en móvil */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 p-3 backdrop-blur transition-transform duration-500 md:hidden",
          visible ? "translate-y-0" : "translate-y-full",
        )}
      >
        <Link href="/contacto" className="btn btn-primary w-full">
          Solicitar cotización
          <ArrowRight className="flecha size-4" aria-hidden="true" />
        </Link>
      </div>

      <div className={cn("fixed right-4 z-40 flex flex-col items-end gap-3 transition-all duration-500 md:bottom-6 md:right-6", visible ? "bottom-24 opacity-100" : "pointer-events-none bottom-20 opacity-0")}>
        {numero && (
          <a
            href={`https://wa.me/${numero}?text=${encodeURIComponent("Hola, quisiera solicitar una cotización.")}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escribir por WhatsApp"
            className="grid size-14 place-items-center rounded-full bg-[#1f8f4e] text-white shadow-lg transition-transform hover:scale-110"
          >
            <MessageCircle className="size-6" aria-hidden="true" />
          </a>
        )}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Volver arriba"
          className="relative hidden size-14 place-items-center rounded-full bg-primary-dark text-white shadow-lg transition-transform hover:scale-110 md:grid"
        >
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 56 56" aria-hidden="true">
            <circle cx="28" cy="28" r={radio} fill="none" stroke="rgb(255 255 255 / 0.18)" strokeWidth="3" />
            <circle cx="28" cy="28" r={radio} fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ * (1 - progreso)} />
          </svg>
          <ArrowUp className="relative size-5" aria-hidden="true" />
        </button>
      </div>
    </>
  );
}
