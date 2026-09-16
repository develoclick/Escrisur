import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FOTOS, NAV } from "@/lib/content";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "La página solicitada no existe en el sitio de ESCRISUR Distribuidora.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden bg-primary-dark text-white">
      <Image src={FOTOS.stock} alt="" fill sizes="100vw" className="-z-20 object-cover opacity-20" />
      <div className="shell py-[clamp(90px,14vw,180px)]">
        <p className="font-heading text-[clamp(5rem,16vw,11rem)] font-black leading-none text-accent">404</p>
        <h1 className="mt-4 text-[clamp(2rem,4.5vw,3.4rem)] text-white">Esta página no está en stock</h1>
        <p className="mt-5 max-w-[38rem] text-[1.05rem] leading-[1.8] text-on-dark-muted">
          Puede que el enlace haya cambiado. Vuelva al inicio o vaya directo a la sección que buscaba.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Link href="/" className="btn btn-primary">
            Volver al inicio
            <ArrowRight className="flecha size-4" aria-hidden="true" />
          </Link>
          <Link href="/contacto" className="btn btn-ghost-dark">Solicitar cotización</Link>
        </div>
        <nav aria-label="Secciones" className="mt-14 border-t border-white/10 pt-8">
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="inline-block py-1.5 font-semibold text-on-dark-muted transition-colors hover:text-accent">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
