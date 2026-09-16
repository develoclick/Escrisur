"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ClipboardList,
  Copy,
  HardHat,
  Landmark,
  Layers,
  Loader2,
  PenLine,
  SprayCan,
  Wrench,
} from "lucide-react";
import { EMPRESA, LINEAS_FORM, PENDIENTE, TIPOS_CLIENTE } from "@/lib/content";
import { cn } from "@/lib/utils";

const ICONOS: Record<string, typeof PenLine> = {
  escritorio: PenLine,
  ferreteria: Wrench,
  epp: HardHat,
  limpieza: SprayCan,
  licitacion: Landmark,
  mixto: Layers,
};

type Datos = {
  linea: string;
  tipo: string;
  detalle: string;
  nombre: string;
  organizacion: string;
  correo: string;
  telefono: string;
  web: string;
};

const CORREO_OK = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const EASE = [0.22, 0.8, 0.28, 1] as const;

function Formulario({ compacto }: { compacto: boolean }) {
  const params = useSearchParams();
  const reduce = useReducedMotion();
  const lineaUrl = params.get("linea");
  const lineaInicial = LINEAS_FORM.some((l) => l.valor === lineaUrl) ? (lineaUrl as string) : "";

  const [paso, setPaso] = React.useState<1 | 2 | 3>(1);
  const [d, setD] = React.useState<Datos>({
    linea: lineaInicial,
    tipo: TIPOS_CLIENTE[0],
    detalle: "",
    nombre: "",
    organizacion: "",
    correo: "",
    telefono: "",
    web: "",
  });
  const [errores, setErrores] = React.useState<Partial<Record<keyof Datos, string>>>({});
  const [estado, setEstado] = React.useState<"idle" | "enviando" | "enviado" | "manual">("idle");
  const [copiado, setCopiado] = React.useState(false);

  const set = <K extends keyof Datos>(k: K, v: Datos[K]) => {
    setD((x) => ({ ...x, [k]: v }));
    if (errores[k]) setErrores((e) => ({ ...e, [k]: undefined }));
  };

  const etiquetaLinea = LINEAS_FORM.find((l) => l.valor === d.linea)?.label ?? "Sin especificar";

  const validarPaso1 = () => {
    const e: typeof errores = {};
    if (!d.linea) e.linea = "Elija qué necesita cotizar.";
    if (d.detalle.trim().length < 10) e.detalle = "Describa brevemente productos y cantidades.";
    setErrores(e);
    return Object.keys(e).length === 0;
  };
  const validarPaso2 = () => {
    const e: typeof errores = {};
    if (!d.nombre.trim()) e.nombre = "Indique su nombre.";
    if (!d.organizacion.trim()) e.organizacion = "Indique su empresa o institución.";
    if (!CORREO_OK.test(d.correo.trim())) e.correo = "Escriba un correo válido.";
    setErrores(e);
    return Object.keys(e).length === 0;
  };

  const resumen = [
    `SOLICITUD DE COTIZACIÓN — ${EMPRESA.marca}`,
    "",
    `Línea: ${etiquetaLinea}`,
    `Tipo de cliente: ${d.tipo}`,
    `Nombre: ${d.nombre}`,
    `Organización: ${d.organizacion}`,
    `Correo: ${d.correo}`,
    `Teléfono: ${d.telefono || "—"}`,
    "",
    "Requerimiento:",
    d.detalle,
  ].join("\n");

  async function enviar() {
    if (!validarPaso2()) return;
    setEstado("enviando");
    try {
      const r = await fetch("/api/cotizacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...d, linea: etiquetaLinea }),
      });
      setEstado(r.ok ? "enviado" : "manual");
    } catch {
      setEstado("manual");
    }
    setPaso(3);
  }

  async function copiar() {
    try {
      await navigator.clipboard.writeText(resumen);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      setCopiado(false);
    }
  }

  const whatsapp = EMPRESA.whatsapp.replace(/\D/g, "");
  const correoDefinido = EMPRESA.correo && EMPRESA.correo !== PENDIENTE;

  const campo =
    "h-13 w-full rounded-xl border border-border-strong bg-white px-4 text-[0.97rem] text-text outline-none transition-[border-color,box-shadow] placeholder:text-text-light/70 focus:border-primary-bright focus:ring-4 focus:ring-primary-bright/15";

  const anim = {
    initial: reduce ? false : { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: reduce ? undefined : { opacity: 0, x: -30 },
    transition: { duration: 0.4, ease: EASE },
  };

  return (
    <div className="rounded-3xl bg-white p-[clamp(22px,3.4vw,44px)] text-text shadow-[0_40px_90px_-40px_rgba(4,32,29,0.55)]">
      {/* progreso */}
      {paso < 3 && (
        <div className="mb-8">
          <div className="flex items-center justify-between font-heading text-[0.74rem] font-bold uppercase tracking-[0.14em]">
            <span className="text-primary">Paso {paso} de 2</span>
            <span className="text-text-light">{paso === 1 ? "Su requerimiento" : "Sus datos"}</span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-muted">
            <motion.div
              className="h-full rounded-full bg-accent"
              animate={{ width: paso === 1 ? "50%" : "100%" }}
              transition={{ duration: 0.5, ease: EASE }}
            />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait" initial={false}>
        {paso === 1 && (
          <motion.div key="p1" {...anim}>
            <fieldset>
              <legend className="font-heading text-[1.3rem] font-extrabold text-text">¿Qué necesita cotizar?</legend>
              <div className={cn("mt-5 grid gap-3", compacto ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3")}>
                {LINEAS_FORM.map((l) => {
                  const Icono = ICONOS[l.valor];
                  const on = d.linea === l.valor;
                  return (
                    <label
                      key={l.valor}
                      className={cn(
                        "group relative flex cursor-pointer flex-col gap-3 rounded-2xl border-2 p-4 transition-all duration-300 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-primary-bright/25",
                        on ? "border-primary-bright bg-surface-muted" : "border-border hover:border-border-strong",
                      )}
                    >
                      <input
                        type="radio"
                        name="linea"
                        value={l.valor}
                        checked={on}
                        onChange={() => set("linea", l.valor)}
                        className="sr-only"
                      />
                      <span className={cn("grid size-10 place-items-center rounded-xl transition-colors", on ? "bg-primary-bright text-white" : "bg-surface-muted text-primary")}>
                        <Icono className="size-5" aria-hidden="true" />
                      </span>
                      <span className="text-[0.88rem] font-bold leading-snug">{l.label}</span>
                      {on && (
                        <Check className="absolute right-3 top-3 size-4 text-primary-bright" strokeWidth={3} aria-hidden="true" />
                      )}
                    </label>
                  );
                })}
              </div>
              {errores.linea && <Error texto={errores.linea} />}
            </fieldset>

            <fieldset className="mt-7">
              <legend className="text-[0.8rem] font-bold uppercase tracking-[0.1em] text-text-light">Tipo de cliente</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {TIPOS_CLIENTE.map((t) => (
                  <label
                    key={t}
                    className={cn(
                      "cursor-pointer rounded-full border px-4 py-2 text-[0.86rem] font-semibold transition-colors has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-primary-bright/25",
                      d.tipo === t ? "border-primary bg-primary text-white" : "border-border-strong text-text hover:border-primary",
                    )}
                  >
                    <input type="radio" name="tipo" value={t} checked={d.tipo === t} onChange={() => set("tipo", t)} className="sr-only" />
                    {t}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-7">
              <label htmlFor="c-detalle" className="text-[0.8rem] font-bold uppercase tracking-[0.1em] text-text-light">
                Detalle del requerimiento
              </label>
              <textarea
                id="c-detalle"
                rows={4}
                value={d.detalle}
                onChange={(e) => set("detalle", e.target.value)}
                aria-invalid={!!errores.detalle}
                aria-describedby={errores.detalle ? "c-detalle-err" : undefined}
                placeholder="Ej.: 50 millares de papel bond A4, 30 archivadores lomo ancho y 10 cajas de tóner."
                className={cn(campo, "mt-3 h-auto py-3 leading-relaxed", errores.detalle && "border-destructive")}
              />
              {errores.detalle && <Error id="c-detalle-err" texto={errores.detalle} />}
            </div>

            <button
              type="button"
              onClick={() => validarPaso1() && setPaso(2)}
              className="btn btn-primary mt-8 w-full"
            >
              Continuar
              <ArrowRight className="flecha size-4" aria-hidden="true" />
            </button>
          </motion.div>
        )}

        {paso === 2 && (
          <motion.form
            key="p2"
            {...anim}
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              enviar();
            }}
          >
            <p className="font-heading text-[1.3rem] font-extrabold text-text">¿A quién enviamos la propuesta?</p>
            <p className="mt-2 flex items-center gap-2 text-[0.9rem] text-text-light">
              <ClipboardList className="size-4 text-primary" aria-hidden="true" />
              {etiquetaLinea} · {d.tipo}
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {(
                [
                  ["nombre", "Nombre y apellidos", "text", "name"],
                  ["organizacion", "Empresa o institución", "text", "organization"],
                  ["correo", "Correo electrónico", "email", "email"],
                  ["telefono", "Teléfono (opcional)", "tel", "tel"],
                ] as const
              ).map(([k, label, type, ac]) => (
                <div key={k}>
                  <label htmlFor={`c-${k}`} className="text-[0.8rem] font-bold uppercase tracking-[0.1em] text-text-light">
                    {label}
                  </label>
                  <input
                    id={`c-${k}`}
                    type={type}
                    autoComplete={ac}
                    value={d[k]}
                    onChange={(e) => set(k, e.target.value)}
                    aria-invalid={!!errores[k]}
                    aria-describedby={errores[k] ? `c-${k}-err` : undefined}
                    className={cn(campo, "mt-2", errores[k] && "border-destructive")}
                  />
                  {errores[k] && <Error id={`c-${k}-err`} texto={errores[k] as string} />}
                </div>
              ))}
            </div>

            {/* trampa para bots, invisible para personas */}
            <input
              type="text"
              name="web"
              tabIndex={-1}
              autoComplete="off"
              value={d.web}
              onChange={(e) => set("web", e.target.value)}
              className="absolute -left-[9999px] size-px opacity-0"
              aria-hidden="true"
            />

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row">
              <button type="button" onClick={() => setPaso(1)} className="btn btn-ghost">
                <ArrowLeft className="size-4" aria-hidden="true" />
                Atrás
              </button>
              <button type="submit" disabled={estado === "enviando"} className="btn btn-primary flex-1">
                {estado === "enviando" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                    Enviando…
                  </>
                ) : (
                  <>
                    Enviar solicitud
                    <ArrowRight className="flecha size-4" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
            <p className="mt-4 text-center text-[0.8rem] text-text-light">
              Usamos sus datos solo para responder a esta solicitud.
            </p>
          </motion.form>
        )}

        {paso === 3 && (
          <motion.div key="p3" {...anim} aria-live="polite">
            {estado === "enviado" ? (
              <div className="py-6 text-center">
                <motion.span
                  initial={reduce ? false : { scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="mx-auto grid size-20 place-items-center rounded-full bg-surface-muted text-primary-bright"
                >
                  <CheckCircle2 className="size-10" aria-hidden="true" />
                </motion.span>
                <p className="mt-6 font-heading text-[1.5rem] font-extrabold">Solicitud recibida</p>
                <p className="mx-auto mt-3 max-w-[34ch] text-text-light">
                  Gracias, {d.nombre.split(" ")[0]}. Revisaremos su requerimiento y le responderemos a{" "}
                  <strong className="text-text">{d.correo}</strong>.
                </p>
                <Link href="/" className="btn btn-ghost mt-8">Volver al inicio</Link>
              </div>
            ) : (
              <div>
                <p className="font-heading text-[1.3rem] font-extrabold">Su solicitud está lista</p>
                <p className="mt-2 text-[0.95rem] text-text-light">
                  Envíenosla por el canal que prefiera; ya está redactada con todos los datos.
                </p>
                <pre className="mt-5 max-h-56 overflow-auto whitespace-pre-wrap rounded-xl border border-border bg-surface-muted p-4 text-[0.82rem] leading-relaxed text-text-light">
                  {resumen}
                </pre>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {whatsapp && (
                    <a
                      className="btn btn-secondary"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(resumen)}`}
                    >
                      Enviar por WhatsApp
                    </a>
                  )}
                  {correoDefinido && (
                    <a
                      className="btn btn-secondary"
                      href={`mailto:${EMPRESA.correo}?subject=${encodeURIComponent("Solicitud de cotización")}&body=${encodeURIComponent(resumen)}`}
                    >
                      Enviar por correo
                    </a>
                  )}
                  <button type="button" onClick={copiar} className={cn("btn btn-ghost", !whatsapp && !correoDefinido && "sm:col-span-2")}>
                    {copiado ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
                    {copiado ? "Copiada" : "Copiar solicitud"}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Error({ texto, id }: { texto: string; id?: string }) {
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-[0.84rem] font-semibold text-destructive">
      <AlertCircle className="size-4" aria-hidden="true" />
      {texto}
    </p>
  );
}

/**
 * useSearchParams exige un límite de Suspense para que la página siga
 * prerenderizándose como estática; el respaldo es el mismo formulario vacío.
 */
export function Cotizador({ compacto = false }: { compacto?: boolean }) {
  return (
    <React.Suspense fallback={<div className="min-h-[560px] rounded-3xl bg-white" aria-hidden="true" />}>
      <Formulario compacto={compacto} />
    </React.Suspense>
  );
}
