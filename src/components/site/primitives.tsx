"use client";

import * as React from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

/* ==========================================================================
   Reveal — aparición al entrar en pantalla.

   El HTML del servidor sale VISIBLE. Solo cuando el script de <head> marca
   <html class="js"> el CSS oculta el bloque, y un IntersectionObserver
   compartido lo revela. Sin JavaScript, o si algo falla, todo se ve
   (hay además una red de seguridad en CSS a los 4 s).
   ========================================================================== */
let observador: IntersectionObserver | null = null;

function observar(el: Element) {
  if (typeof IntersectionObserver === "undefined") {
    el.classList.add("is-in");
    return () => {};
  }
  observador ??= new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          observador?.unobserve(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
  );
  observador.observe(el);
  return () => observador?.unobserve(el);
}

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  as?: "div" | "li" | "article" | "section";
};

export function Reveal({ children, className, delay = 0, y = 32, x = 0, as = "div" }: RevealProps) {
  const ref = React.useRef<HTMLElement>(null);
  React.useEffect(() => (ref.current ? observar(ref.current) : undefined), []);
  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={className}
      style={{ "--rx": `${x}px`, "--ry": `${y}px`, "--rd": `${delay}s` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}

/* ==========================================================================
   Foto — imagen optimizada con zoom al pasar el cursor sobre el `group`.
   ========================================================================== */
type FotoProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  preload?: boolean;
  zoom?: boolean;
};

export function Foto({
  src,
  alt,
  className,
  imgClassName,
  sizes = "(max-width: 768px) 100vw, 50vw",
  preload = false,
  zoom = true,
}: FotoProps) {
  return (
    <div className={cn("relative overflow-hidden bg-primary-dark", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        preload={preload}
        className={cn(
          "object-cover",
          zoom && "transition-transform duration-[1100ms] ease-[cubic-bezier(.22,.8,.28,1)] group-hover:scale-[1.07]",
          imgClassName,
        )}
      />
    </div>
  );
}

/* ==========================================================================
   Parallax — la imagen se desplaza más despacio que el scroll.
   La caja se sobredimensiona para que nunca se vea el borde.
   ========================================================================== */
export function Parallax({
  src,
  alt,
  className,
  sizes = "100vw",
  intensidad = 14,
  preload = false,
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  intensidad?: number;
  preload?: boolean;
  children?: React.ReactNode;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${intensidad}%`, `${intensidad}%`]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        style={reduce ? undefined : { y }}
        className="absolute inset-x-0 -inset-y-[16%]"
      >
        <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className="object-cover" />
      </motion.div>
      {children}
    </div>
  );
}

/* ==========================================================================
   Counter — cuenta hasta el valor al entrar en pantalla.
   ========================================================================== */
export function Counter({ value, className }: { value: string; className?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const numero = Number(value);
  const esNumero = !Number.isNaN(numero) && value.trim() !== "";
  // El servidor y el primer render muestran el valor real (buscadores, sin JS).
  const [n, setN] = React.useState<number | null>(null);

  // Si el contador arranca fuera de pantalla, se pone a cero sin que se vea.
  React.useEffect(() => {
    if (!esNumero || reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    if (r.top > window.innerHeight) {
      const raf = requestAnimationFrame(() => setN((v) => (v === null ? 0 : v)));
      return () => cancelAnimationFrame(raf);
    }
  }, [esNumero, reduce]);

  React.useEffect(() => {
    if (!esNumero || reduce || !inView || n === null) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (ahora: number) => {
      const p = Math.min((ahora - t0) / 1300, 1);
      setN(Math.round(numero * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // n se excluye a propósito: la animación arranca una sola vez
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [esNumero, reduce, inView, numero]);

  return (
    <span ref={ref} className={className}>
      {n === null ? value : String(n)}
    </span>
  );
}

/* ==========================================================================
   Encabezado de sección
   ========================================================================== */
export function SeccionTitulo({
  eyebrow,
  titulo,
  destacado,
  texto,
  oscuro = false,
  centrado = false,
  className,
  children,
}: {
  eyebrow: string;
  titulo: string;
  destacado?: string;
  texto?: string;
  oscuro?: boolean;
  centrado?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Reveal
      className={cn(
        "mb-12 flex flex-wrap items-end justify-between gap-8 lg:mb-16",
        centrado && "flex-col items-center text-center",
        className,
      )}
    >
      <div className={cn("max-w-[34rem]", centrado && "mx-auto")}>
        <span className={cn("eyebrow", oscuro && "eyebrow--on-dark", centrado && "justify-center")}>
          {eyebrow}
        </span>
        <h2
          className={cn(
            "mt-5 text-[clamp(1.85rem,3.6vw,2.9rem)]",
            oscuro ? "text-white" : "text-text",
          )}
        >
          {titulo}
          {destacado && (
            <>
              {" "}
              <span className={oscuro ? "hl--on-dark" : "hl"}>{destacado}</span>
            </>
          )}
        </h2>
        {texto && (
          <p
            className={cn(
              "mt-5 text-[1.02rem] leading-[1.85]",
              oscuro ? "text-on-dark-muted" : "text-text-light",
            )}
          >
            {texto}
          </p>
        )}
      </div>
      {children}
    </Reveal>
  );
}
