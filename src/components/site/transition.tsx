"use client";

import * as React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { TEMA_RUTA } from "@/lib/content";

/** Hilo de progreso de lectura en el borde superior, del color de la ruta. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const x = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: reduce ? scrollYProgress : x }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-[var(--tema)]"
    />
  );
}

/**
 * Transición entre páginas: una cortina del color de la ruta cruza la pantalla
 * con el icono del logo, y el contenido nuevo entra con un desplazamiento corto.
 * El contenido nunca depende de la animación para mostrarse.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [cortina, setCortina] = React.useState(false);
  const primera = React.useRef(true);
  // La primera página llega del servidor ya visible: solo se animan las
  // navegaciones posteriores. Evita un HTML con opacity:0 que retrasaría el LCP.
  const [haNavegado, setHaNavegado] = React.useState(false);
  const [rutaInicial] = React.useState(pathname);
  const animarEntrada = haNavegado || pathname !== rutaInicial;

  React.useEffect(() => {
    // señal para el script de <head>: la aplicación se hidrató
    (window as Window & { __escrisur?: boolean }).__escrisur = true;
  }, []);

  React.useEffect(() => {
    const base = "/" + (pathname.split("/")[1] ?? "");
    document.documentElement.dataset.tema = TEMA_RUTA[base] ?? "primary";
  }, [pathname]);

  React.useEffect(() => {
    if (primera.current) {
      primera.current = false;
      return;
    }
    if (reduce) return;
    const raf = requestAnimationFrame(() => {
      setHaNavegado(true);
      setCortina(true);
    });
    const t = setTimeout(() => setCortina(false), 700);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [pathname, reduce]);

  if (reduce) return <>{children}</>;

  return (
    <>
      <AnimatePresence>
        {cortina && (
          <motion.div
            key="cortina"
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[70] grid place-items-center bg-[var(--tema)]"
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
          >
            <motion.span
              initial={{ scale: 0.6, opacity: 0, rotate: -12 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="grid size-24 place-items-center rounded-3xl bg-white p-4 shadow-2xl"
            >
              <Image src="/brand/logo-icono.png" alt="" width={241} height={251} className="size-full object-contain" />
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key={pathname}
        initial={animarEntrada ? { opacity: 0, y: 14 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 0.8, 0.28, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
