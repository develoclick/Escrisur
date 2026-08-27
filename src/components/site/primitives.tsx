"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import Image from "next/image";
import * as React from "react";
import { cn } from "@/lib/utils";

/* ==========================================================================
   Reveal — aparición al entrar en pantalla.
   El contenido es HTML real: si el usuario prefiere menos movimiento
   o JS no llega a ejecutarse, se muestra igualmente.
   ========================================================================== */
type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "article" | "figure";
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.62, delay, ease: [0.22, 0.8, 0.28, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/* ==========================================================================
   Media — hueco de imagen.
   Apunta a /public/img/<slot>.jpg. Para poner la fotografía definitiva
   basta con reemplazar ese archivo conservando el nombre.
   ========================================================================== */
type MediaProps = {
  slot: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  preload?: boolean;
  zoom?: boolean;
};

export function Media({
  slot,
  alt,
  className,
  imgClassName,
  sizes = "(max-width: 768px) 100vw, 50vw",
  preload = false,
  zoom = true,
}: MediaProps) {
  return (
    <div className={cn("relative overflow-hidden bg-primary-dark", className)}>
      <Image
        src={`/img/${slot}.jpg`}
        alt={alt}
        fill
        sizes={sizes}
        preload={preload}
        className={cn(
          "object-cover",
          zoom &&
            "transition-transform duration-[900ms] ease-[cubic-bezier(.22,.8,.28,1)] group-hover:scale-[1.06]",
          imgClassName,
        )}
      />
    </div>
  );
}

/* ==========================================================================
   Contador animado para la banda de cifras
   ========================================================================== */
export function Counter({ value, className }: { value: string; className?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const reduce = useReducedMotion();
  const numero = Number(value);
  const esNumero = !Number.isNaN(numero) && value.trim() !== "";
  // Sin animación cuando el valor no es numérico o se prefiere menos movimiento:
  // en esos casos se pinta el valor final directamente, sin estado.
  const anima = esNumero && !reduce;
  const [n, setN] = React.useState(0);

  React.useEffect(() => {
    if (!anima || !inView) return;
    let raf = 0;
    const t0 = performance.now();
    const dur = 1200;
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      setN(Math.round(numero * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [anima, inView, numero]);

  const texto = anima ? String(n).padStart(value.length, "0") : value;

  return (
    <span ref={ref} className={className}>
      {texto}
    </span>
  );
}
