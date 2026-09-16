"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, MapPin, Menu, ShieldCheck, X } from "lucide-react";
import { Logo, Marca } from "@/components/site/brand";
import { EMPRESA, NAV, PENDIENTE } from "@/lib/content";
import { cn } from "@/lib/utils";

const definido = (v: string) => v && v !== PENDIENTE;

export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [fijo, setFijo] = React.useState(false);
  const [abierto, setAbierto] = React.useState(false);
  const botonRef = React.useRef<HTMLButtonElement>(null);

  const activo = (href: string) => pathname === href || pathname.startsWith(href + "/");

  React.useEffect(() => {
    const onScroll = () => setFijo(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = abierto ? "hidden" : "";
    if (!abierto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAbierto(false);
        botonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [abierto]);

  // cerrar el menú al cambiar de ruta
  const [rutaPrevia, setRutaPrevia] = React.useState(pathname);
  if (rutaPrevia !== pathname) {
    setRutaPrevia(pathname);
    setAbierto(false);
  }

  return (
    <>
      {/* barra de utilidades */}
      <div className="hidden bg-primary-dark text-[0.8rem] text-on-dark-muted lg:block">
        <div className="shell flex h-10 items-center gap-8">
          <span className="inline-flex items-center gap-2">
            <MapPin className="size-3.5 text-accent" aria-hidden="true" />
            {EMPRESA.distrito}, {EMPRESA.provincia} — {EMPRESA.region}
          </span>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="size-3.5 text-accent" aria-hidden="true" />
            Empresa registrada · Partida N.º {EMPRESA.partida}
          </span>
          {definido(EMPRESA.telefono) && (
            <a href={`tel:${EMPRESA.telefono}`} className="ml-auto transition-colors hover:text-white">
              {EMPRESA.telefono}
            </a>
          )}
          <span className={cn("font-heading text-[0.72rem] font-bold uppercase tracking-[0.18em] text-white", !definido(EMPRESA.telefono) && "ml-auto")}>
            Escritorio <span className="text-accent">|</span> Ferretería
          </span>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-500",
          fijo
            ? "border-border bg-white/92 shadow-[0_10px_30px_-18px_rgba(7,47,43,0.35)] backdrop-blur-md"
            : "border-transparent bg-white",
        )}
      >
        <div className={cn("shell flex items-center gap-6 transition-[height] duration-500", fijo ? "h-[70px]" : "h-[88px]")}>
          <Link href="/" aria-label={`${EMPRESA.marca}, ir al inicio`} className="flex-none">
            <Logo preload className={cn("transition-[height] duration-500", fijo ? "h-10" : "h-12 sm:h-[52px]")} />
          </Link>

          <nav aria-label="Navegación principal" className="ml-auto hidden xl:block">
            <ul className="flex items-center gap-1">
              {NAV.map((it) => {
                const on = activo(it.href);
                return (
                  <li key={it.href}>
                    <Link
                      href={it.href}
                      aria-current={on ? "page" : undefined}
                      className={cn(
                        "group relative block rounded-full px-4 py-2.5 font-heading text-[0.9rem] font-bold transition-colors",
                        on ? "text-primary" : "text-text hover:text-primary",
                      )}
                    >
                      {on && (
                        <motion.span
                          layoutId="nav-activo"
                          className="absolute inset-0 rounded-full bg-surface-muted"
                          transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        />
                      )}
                      <span className="relative">{it.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <Link href="/contacto" className="btn btn-primary ml-auto hidden !px-6 !py-3 md:inline-flex xl:ml-2">
            Cotizar
            <ArrowRight className="flecha size-4" aria-hidden="true" />
          </Link>

          <button
            ref={botonRef}
            type="button"
            onClick={() => setAbierto(true)}
            aria-label="Abrir menú"
            aria-expanded={abierto}
            aria-controls="menu-movil"
            className="ml-auto grid size-12 flex-none place-items-center rounded-full border border-border-strong text-text transition-colors hover:border-primary hover:text-primary md:ml-0 xl:hidden"
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* menú móvil */}
      <AnimatePresence>
        {abierto && (
          <motion.div
            id="menu-movil"
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            className="fixed inset-0 z-[80] flex flex-col bg-primary-dark text-white xl:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "circle(150% at calc(100% - 44px) 44px)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          >
            <div className="shell flex h-[88px] items-center">
              <Marca tono="oscuro" />
              <button
                type="button"
                onClick={() => setAbierto(false)}
                aria-label="Cerrar menú"
                autoFocus
                className="ml-auto grid size-12 place-items-center rounded-full border border-white/25 text-white"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Navegación móvil" className="shell mt-4 flex-1 overflow-y-auto">
              <ul>
                <li>
                  <Link href="/" className="flex items-center justify-between border-b border-white/10 py-4 font-heading text-[1.5rem] font-black">
                    Inicio
                    <span className="text-[0.75rem] font-bold text-on-dark-muted">00</span>
                  </Link>
                </li>
                {NAV.map((it, n) => (
                  <motion.li
                    key={it.href}
                    initial={reduce ? false : { opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.18 + n * 0.05, duration: 0.45 }}
                  >
                    <Link
                      href={it.href}
                      aria-current={activo(it.href) ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between border-b border-white/10 py-4 font-heading text-[1.5rem] font-black",
                        activo(it.href) && "text-accent",
                      )}
                    >
                      {it.label}
                      <span className="text-[0.75rem] font-bold text-on-dark-muted">{String(n + 1).padStart(2, "0")}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <Link href="/contacto" className="btn btn-primary mt-8 w-full">
                Solicitar cotización
                <ArrowRight className="flecha size-4" aria-hidden="true" />
              </Link>
              <p className="mt-8 pb-10 text-[0.9rem] text-on-dark-muted">
                {EMPRESA.razonSocial}
                <br />
                Partida N.º {EMPRESA.partida}
              </p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
