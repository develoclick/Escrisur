"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, Phone, Mail, MapPin, ArrowRight, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { EMPRESA, NAV } from "@/lib/content";

/* Marca: monograma en cuadro naranja + nombre, como el bloque de la referencia. */
function Marca({ tono = "dark" }: { tono?: "dark" | "light" }) {
  return (
    <Link href="/" className="flex flex-none items-center gap-3" aria-label={`${EMPRESA.marca}, inicio`}>
      <span className="grid size-10 flex-none place-items-center bg-accent text-white">
        <FileText className="size-5" strokeWidth={2.2} aria-hidden="true" />
      </span>
      <span className="leading-none">
        <span
          className={cn(
            "block font-heading text-[1.55rem] font-extrabold tracking-[-0.03em]",
            tono === "dark" ? "text-text" : "text-white",
          )}
        >
          {EMPRESA.marca}
        </span>
        <span
          className={cn(
            "mt-1 block text-[0.6rem] font-semibold uppercase tracking-[0.22em]",
            tono === "dark" ? "text-text-light" : "text-on-dark-muted",
          )}
        >
          Suministros del Sur
        </span>
      </span>
    </Link>
  );
}

export function Topbar() {
  return (
    <div className="hidden bg-surface-muted text-[0.8rem] text-text-light lg:block">
      <div className="shell flex h-11 items-center gap-7">
        <span className="inline-flex items-center gap-2">
          <Mail className="size-3.5 text-accent" aria-hidden="true" />
          {EMPRESA.correo}
        </span>
        <span className="inline-flex items-center gap-2">
          <Phone className="size-3.5 text-accent" aria-hidden="true" />
          {EMPRESA.telefono}
        </span>
        <span className="ml-auto inline-flex items-center gap-2">
          <MapPin className="size-3.5 text-accent" aria-hidden="true" />
          {EMPRESA.distrito}, {EMPRESA.provincia} — {EMPRESA.region}, {EMPRESA.pais}
        </span>
        <span className="border-l border-border-strong pl-7">
          Partida N.º {EMPRESA.partida}
        </span>
      </div>
    </div>
  );
}

export function Header() {
  const [fijo, setFijo] = React.useState(false);
  const [abierto, setAbierto] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setFijo(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = abierto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [abierto]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-white transition-shadow duration-300",
        fijo && "shadow-[0_2px_18px_-8px_rgba(4,37,43,0.28)]",
      )}
    >
      <div className="shell flex items-center gap-6 2xl:gap-8">
        <div className={cn("flex items-center transition-all duration-300", fijo ? "h-[74px]" : "h-[92px]")}>
          <Marca />
        </div>

        {/* navegación de escritorio, centrada como en la referencia */}
        <nav className="ml-auto hidden items-center gap-6 xl:flex 2xl:gap-9" aria-label="Navegación principal">
          {NAV.map((it) => (
            <Link
              key={it.label}
              href={it.href}
              className="group relative py-2 text-[0.94rem] font-semibold text-text transition-colors hover:text-accent"
            >
              {it.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        {/* bloque de teléfono */}
        <div className="ml-auto hidden items-center gap-3 2xl:ml-0 2xl:flex">
          <span className="grid size-11 flex-none place-items-center rounded-full bg-accent-soft text-accent">
            <Phone className="size-[18px]" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block text-[0.66rem] font-bold uppercase tracking-[0.16em] text-text-light">
              Teléfono
            </span>
            <span className="block text-[0.9rem] font-bold text-accent">{EMPRESA.telefono}</span>
          </span>
        </div>

        {/* CTA a sangre derecha, como el bloque verde de la referencia */}
        <Link
          href="#cotizacion"
          className="group ml-auto hidden h-[92px] flex-none items-center gap-3 whitespace-nowrap bg-primary px-7 text-[0.92rem] font-bold text-white transition-colors hover:bg-primary-light lg:flex xl:ml-0 2xl:px-9 2xl:text-[0.94rem]"
        >
          Solicitar cotización
          <span className="grid size-7 place-items-center rounded-full border border-white/40 transition-transform duration-300 group-hover:translate-x-1">
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setAbierto(true)}
          aria-label="Abrir menú"
          aria-expanded={abierto}
          aria-controls="menu-movil"
          className="ml-auto grid size-11 flex-none place-items-center border border-border-strong text-text xl:hidden"
        >
          <Menu className="size-5" aria-hidden="true" />
        </button>
      </div>

      {/* menú móvil */}
      <div
        id="menu-movil"
        aria-hidden={!abierto}
        className={cn(
          "fixed inset-0 z-50 bg-primary-dark text-white transition-transform duration-400 ease-[cubic-bezier(.22,.8,.28,1)] xl:hidden",
          abierto ? "translate-x-0" : "pointer-events-none translate-x-full",
        )}
      >
        <div className="shell flex h-[92px] items-center">
          <Marca tono="light" />
          <button
            type="button"
            onClick={() => setAbierto(false)}
            aria-label="Cerrar menú"
            className="ml-auto grid size-11 place-items-center border border-white/25 text-white"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <nav className="shell mt-6 flex flex-col" aria-label="Navegación móvil">
          {NAV.map((it, i) => (
            <Link
              key={it.label}
              href={it.href}
              onClick={() => setAbierto(false)}
              className="flex items-center justify-between border-b border-white/12 py-5 font-heading text-[1.35rem] font-bold tracking-[-0.02em]"
            >
              {it.label}
              <span className="font-body text-[0.72rem] font-semibold text-on-dark-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
            </Link>
          ))}
          <Link
            href="#cotizacion"
            onClick={() => setAbierto(false)}
            className="mt-8 flex items-center justify-center gap-3 bg-accent px-8 py-4 font-bold text-white"
          >
            Solicitar cotización
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <div className="mt-8 space-y-2 text-[0.9rem] text-on-dark-muted">
            <p>{EMPRESA.distrito}, {EMPRESA.provincia} — {EMPRESA.region}</p>
            <p>Partida N.º {EMPRESA.partida}</p>
          </div>
        </nav>
      </div>
    </header>
  );
}
