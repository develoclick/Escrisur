"use client";

import * as React from "react";
import { AlertCircle, ArrowRight, Check, Copy } from "lucide-react";
import { Media, Reveal } from "@/components/site/primitives";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { EMPRESA, TIPOS_CLIENTE } from "@/lib/content";
import { cn } from "@/lib/utils";

type Campos = {
  nombre: string;
  organizacion: string;
  correo: string;
  telefono: string;
  tipo: string;
  requerimiento: string;
  mensaje: string;
};

const VACIO: Campos = {
  nombre: "",
  organizacion: "",
  correo: "",
  telefono: "",
  tipo: TIPOS_CLIENTE[0],
  requerimiento: "",
  mensaje: "",
};

const OBLIGATORIOS: { campo: keyof Campos; etiqueta: string }[] = [
  { campo: "nombre", etiqueta: "nombre" },
  { campo: "organizacion", etiqueta: "empresa o institución" },
  { campo: "correo", etiqueta: "correo" },
  { campo: "requerimiento", etiqueta: "producto o servicio requerido" },
];

/**
 * El envío queda preparado para conectarse con un servicio de correo:
 * basta con sustituir `enviar` por un fetch a /api/cotizacion (o a Resend,
 * Formspree, etc.). Mientras tanto, compone la solicitud para copiarla.
 */
async function enviar(datos: Campos): Promise<{ ok: boolean; texto: string }> {
  const fecha = new Date().toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const texto = [
    `SOLICITUD DE COTIZACIÓN — ${EMPRESA.marca}`,
    `Fecha: ${fecha}`,
    "",
    `Nombre              : ${datos.nombre}`,
    `Empresa/institución : ${datos.organizacion}`,
    `Tipo de cliente     : ${datos.tipo}`,
    `Correo              : ${datos.correo}`,
    `Teléfono            : ${datos.telefono || "—"}`,
    "",
    "PRODUCTO O SERVICIO REQUERIDO",
    datos.requerimiento,
    ...(datos.mensaje ? ["", "MENSAJE", datos.mensaje] : []),
  ].join("\n");

  return { ok: true, texto };
}

export function Cotizacion() {
  const [datos, setDatos] = React.useState<Campos>(VACIO);
  const [faltan, setFaltan] = React.useState<string[]>([]);
  const [salida, setSalida] = React.useState<string | null>(null);
  const [copiado, setCopiado] = React.useState(false);

  const set = (k: keyof Campos) => (v: string) =>
    setDatos((d) => ({ ...d, [k]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const vacios = OBLIGATORIOS.filter((o) => !datos[o.campo].trim());
    if (vacios.length) {
      setFaltan(vacios.map((o) => o.etiqueta));
      setSalida(null);
      return;
    }
    setFaltan([]);
    const r = await enviar(datos);
    setSalida(r.ok ? r.texto : null);
  }

  async function copiar() {
    if (!salida) return;
    try {
      await navigator.clipboard.writeText(salida);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 1900);
    } catch {
      setCopiado(false);
    }
  }

  const invalido = (k: keyof Campos) =>
    faltan.length > 0 && !datos[k].trim() && OBLIGATORIOS.some((o) => o.campo === k);

  return (
    <section id="cotizacion" className="relative isolate">
      {/* dos tonos a página completa, como la banda de la referencia */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 lg:grid lg:grid-cols-2">
        <div className="h-full bg-primary-dark" />
        <div className="hidden h-full bg-surface-muted lg:block" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-primary-dark lg:hidden" />

      <div className="shell grid items-center gap-14 py-[clamp(64px,8vw,120px)] lg:grid-cols-2 lg:gap-16">
        {/* texto */}
        <Reveal className="text-white">
          <span className="eyebrow eyebrow--on-dark">Cotizaciones</span>
          <h2 className="mt-6 max-w-[15ch] font-heading text-[clamp(1.9rem,3.7vw,3rem)] font-extrabold text-white">
            Solicite una cotización
          </h2>
          <p className="mt-6 max-w-[44ch] text-[0.99rem] leading-[1.85] text-on-dark-muted">
            Indíquenos qué productos o servicios necesita y prepararemos una
            propuesta ajustada al procedimiento de compra de su organización.
          </p>

          <dl className="mt-10 grid max-w-[440px] gap-px overflow-hidden bg-white/12 sm:grid-cols-2">
            <div className="bg-primary-dark p-5">
              <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-on-dark-muted">
                Domicilio
              </dt>
              <dd className="mt-2 text-[0.92rem] font-semibold text-white">
                {EMPRESA.distrito}, {EMPRESA.provincia}
                <br />
                {EMPRESA.region}, {EMPRESA.pais}
              </dd>
            </div>
            <div className="bg-primary-dark p-5">
              <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-on-dark-muted">
                Registro
              </dt>
              <dd className="mt-2 text-[0.92rem] font-semibold text-white">
                {EMPRESA.tipo}
                <br />
                Partida N.º {EMPRESA.partida}
              </dd>
            </div>
          </dl>

          <div className="group mt-10 hidden max-w-[440px] lg:block">
            <Media
              slot="cotizacion"
              alt="Atención a clientes institucionales y preparación de propuestas"
              className="aspect-[4/3]"
              sizes="40vw"
            />
          </div>
        </Reveal>

        {/* formulario */}
        <Reveal delay={0.1}>
          <div className="bg-accent p-[clamp(24px,3.4vw,44px)] text-white shadow-[0_36px_80px_-40px_rgba(4,37,43,0.7)]">
            <h3 className="font-heading text-[1.45rem] font-extrabold text-white">
              Formulario de solicitud
            </h3>
            <p className="mt-2 text-[0.88rem] leading-relaxed text-white">
              Los campos marcados son necesarios para preparar la propuesta.
            </p>

            <form onSubmit={onSubmit} noValidate className="mt-7 grid gap-4 sm:grid-cols-2">
              <Campo
                id="c-nombre" label="Nombre *" value={datos.nombre}
                onChange={set("nombre")} invalid={invalido("nombre")}
                placeholder="Nombres y apellidos" autoComplete="name"
              />
              <Campo
                id="c-org" label="Empresa / institución *" value={datos.organizacion}
                onChange={set("organizacion")} invalid={invalido("organizacion")}
                placeholder="Nombre de la organización" autoComplete="organization"
              />
              <Campo
                id="c-correo" label="Correo *" type="email" value={datos.correo}
                onChange={set("correo")} invalid={invalido("correo")}
                placeholder="correo@organizacion.pe" autoComplete="email"
              />
              <Campo
                id="c-tel" label="Teléfono" type="tel" value={datos.telefono}
                onChange={set("telefono")} placeholder="9xx xxx xxx" autoComplete="tel"
              />

              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="c-tipo" className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white">
                  Tipo de cliente
                </Label>
                <select
                  id="c-tipo"
                  value={datos.tipo}
                  onChange={(e) => set("tipo")(e.target.value)}
                  className="h-12 w-full rounded-none border border-white/45 bg-white px-4 text-[0.94rem] text-text outline-none focus-visible:border-primary-dark focus-visible:ring-2 focus-visible:ring-primary-dark/40"
                >
                  {TIPOS_CLIENTE.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <Campo
                id="c-req" label="Producto o servicio requerido *" value={datos.requerimiento}
                onChange={set("requerimiento")} invalid={invalido("requerimiento")}
                placeholder="Ej. papel bond A4, servicio de limpieza mensual" className="sm:col-span-2"
              />

              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="c-msg" className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white">
                  Mensaje
                </Label>
                <Textarea
                  id="c-msg"
                  value={datos.mensaje}
                  onChange={(e) => set("mensaje")(e.target.value)}
                  placeholder="Cantidades, plazos o cualquier detalle adicional."
                  className="min-h-[112px] rounded-none border-white/45 bg-white text-[0.94rem] text-text placeholder:text-text-light/70 focus-visible:border-primary-dark focus-visible:ring-primary-dark/40"
                />
              </div>

              <button
                type="submit"
                className="group mt-2 inline-flex h-[54px] items-center justify-center gap-3 bg-primary-dark px-8 text-[0.84rem] font-bold uppercase tracking-[0.09em] text-white transition-colors hover:bg-primary sm:col-span-2"
              >
                Enviar solicitud
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
            </form>

            <div aria-live="polite" className="mt-5 empty:mt-0">
              {faltan.length > 0 && (
                <p className="flex items-start gap-2.5 border border-white/45 bg-white/15 p-4 text-[0.88rem] font-medium text-white">
                  <AlertCircle className="mt-0.5 size-4 flex-none" aria-hidden="true" />
                  <span>Falta completar: {faltan.join(", ")}.</span>
                </p>
              )}

              {salida && (
                <div className="border border-white/45 bg-white p-5 text-text">
                  <div className="flex items-center justify-between gap-4">
                    <p className="flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.13em] text-support-dark">
                      <Check className="size-4" aria-hidden="true" />
                      Solicitud preparada
                    </p>
                    <button
                      type="button"
                      onClick={copiar}
                      className="inline-flex items-center gap-2 border border-border-strong px-3 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.08em] text-text transition-colors hover:border-accent hover:text-accent"
                    >
                      <Copy className="size-3.5" aria-hidden="true" />
                      {copiado ? "Copiado" : "Copiar"}
                    </button>
                  </div>
                  <pre className="mt-3 max-h-64 overflow-auto whitespace-pre-wrap break-words border border-border bg-surface-muted p-4 text-[0.78rem] leading-relaxed text-text-light">
                    {salida}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Campo({
  id, label, value, onChange, placeholder, type = "text",
  invalid = false, className, autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  invalid?: boolean;
  className?: string;
  autoComplete?: string;
}) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Label htmlFor={id} className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        aria-invalid={invalid || undefined}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "h-12 rounded-none border-white/45 bg-white text-[0.94rem] text-text placeholder:text-text-light/70",
          "focus-visible:border-primary-dark focus-visible:ring-primary-dark/40",
          invalid && "border-primary-dark ring-2 ring-primary-dark/50",
        )}
      />
    </div>
  );
}
