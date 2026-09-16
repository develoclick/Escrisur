import Link from "next/link";
import { ArrowRight, ArrowUpRight, FileText, Mail, MapPin, Phone } from "lucide-react";
import { Marca } from "@/components/site/brand";
import { EMPRESA, NAV, PENDIENTE } from "@/lib/content";

const definido = (v: string) => v && v !== PENDIENTE;

const LINEAS = [
  { label: "Papel, tintas y tóner", href: "/escritorio#papel" },
  { label: "Archivo y organización", href: "/escritorio#archivo" },
  { label: "Herramientas", href: "/ferreteria#herramientas" },
  { label: "Tornillería y fijaciones", href: "/ferreteria#fijaciones" },
  { label: "Equipos de protección", href: "/ferreteria#epp" },
  { label: "Limpieza integral", href: "/servicios#limpieza" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-primary-deep text-on-dark-muted">
      <div aria-hidden="true" className="franja h-1.5 w-full" />

      {/* llamada previa al pie */}
      <div className="shell border-b border-white/10 py-14">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <div>
            <p className="font-heading text-[clamp(1.5rem,3vw,2.3rem)] font-black leading-tight text-white">
              ¿Listo para abastecer a su organización?
            </p>
            <p className="mt-2 text-[1rem]">Envíe su requerimiento y reciba una propuesta formal.</p>
          </div>
          <Link href="/contacto" className="btn btn-primary">
            Solicitar cotización
            <ArrowRight className="flecha size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.1fr_1.2fr]">
        <div>
          <Marca tono="oscuro" />
          <p className="mt-6 max-w-[34ch] text-[0.94rem] leading-relaxed">
            Distribuidora de materiales de escritorio y ferretería, con servicios de limpieza y
            abastecimiento para empresas e instituciones públicas y privadas.
          </p>
        </div>

        <nav aria-label="Páginas">
          <h2 className="font-heading text-[0.76rem] font-bold uppercase tracking-[0.18em] text-white">Empresa</h2>
          <ul className="mt-6 space-y-1">
            <li>
              <Link href="/" className="inline-block py-1.5 text-[0.94rem] transition-colors hover:text-accent">Inicio</Link>
            </li>
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="inline-block py-1.5 text-[0.94rem] transition-colors hover:text-accent">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Líneas y servicios">
          <h2 className="font-heading text-[0.76rem] font-bold uppercase tracking-[0.18em] text-white">Líneas</h2>
          <ul className="mt-6 space-y-1">
            {LINEAS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="group inline-flex items-center gap-1.5 py-1.5 text-[0.94rem] transition-colors hover:text-accent">
                  {l.label}
                  <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-heading text-[0.76rem] font-bold uppercase tracking-[0.18em] text-white">Contacto</h2>
          <ul className="mt-6 space-y-4 text-[0.94rem]">
            <li className="flex gap-3">
              <MapPin className="mt-1 size-4 flex-none text-accent" aria-hidden="true" />
              <span>
                {EMPRESA.distrito}, {EMPRESA.provincia}
                <br />
                {EMPRESA.region}, {EMPRESA.pais}
              </span>
            </li>
            {definido(EMPRESA.telefono) && (
              <li className="flex gap-3">
                <Phone className="mt-1 size-4 flex-none text-accent" aria-hidden="true" />
                <a href={`tel:${EMPRESA.telefono}`} className="hover:text-accent">{EMPRESA.telefono}</a>
              </li>
            )}
            {definido(EMPRESA.correo) && (
              <li className="flex gap-3">
                <Mail className="mt-1 size-4 flex-none text-accent" aria-hidden="true" />
                <a href={`mailto:${EMPRESA.correo}`} className="break-all hover:text-accent">{EMPRESA.correo}</a>
              </li>
            )}
            <li className="flex gap-3">
              <FileText className="mt-1 size-4 flex-none text-accent" aria-hidden="true" />
              <span>
                {EMPRESA.tipo} · Partida N.º {EMPRESA.partida}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="shell flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-7 text-[0.84rem]">
        <span>
          © {new Date().getFullYear()} {EMPRESA.razonSocial}
        </span>
        <span className="font-heading text-[0.72rem] font-bold uppercase tracking-[0.18em]">
          Materiales de escritorio <span className="text-accent">|</span> Ferretería
        </span>
      </div>
    </footer>
  );
}
