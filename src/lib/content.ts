/**
 * Datos y textos compartidos del sitio.
 *
 * Los datos registrales provienen de la Partida Electrónica N.º 11635257.
 * PENDIENTE marca información que la empresa aún no ha facilitado: no se inventa.
 * Si se completa `whatsapp`, el botón flotante de WhatsApp aparece solo.
 */

export const PENDIENTE = "[PENDIENTE DE COMPLETAR]";

export const EMPRESA = {
  razonSocial: "ESCRITORIO Y SUMINISTROS DEL SUR E.I.R.L.",
  marca: "ESCRISUR",
  descriptor: "Distribuidora",
  lineas: "Materiales de escritorio | Ferretería",
  tipo: "E.I.R.L.",
  partida: "11635257",
  zonaRegistral: "Zona Registral N.º XII — Sede Arequipa",
  titular: "Guadalupe Fiorela Cayani de la Cruz",
  cargo: "Titular-Gerente",
  distrito: "Arequipa",
  provincia: "Arequipa",
  region: "Arequipa",
  pais: "Perú",
  anio: "2025",
  actividades: 44,
  telefono: PENDIENTE,
  correo: PENDIENTE,
  /** Número en formato internacional sin signos, p. ej. "51987654321". */
  whatsapp: "",
  sitio: "https://escrisur.pe",
} as const;

export const NAV = [
  { label: "Nosotros", href: "/nosotros" },
  { label: "Escritorio", href: "/escritorio" },
  { label: "Ferretería", href: "/ferreteria" },
  { label: "Servicios", href: "/servicios" },
  { label: "Licitaciones", href: "/licitaciones" },
  { label: "Contacto", href: "/contacto" },
] as const;

/** Color que cada ruta aplica a la barra de desplazamiento y a la transición. */
export const TEMA_RUTA: Record<string, "primary" | "accent" | "dark"> = {
  "/": "accent",
  "/nosotros": "primary",
  "/escritorio": "primary",
  "/ferreteria": "accent",
  "/servicios": "primary",
  "/licitaciones": "dark",
  "/contacto": "accent",
};

/** Fotografías del cliente, ya optimizadas en /public/img/fotos. */
export const FOTOS = {
  suministrosEscritorio: "/img/fotos/suministros-escritorio.jpg",
  herramientas: "/img/fotos/herramientas.jpg",
  almacen: "/img/fotos/almacen-logistica.jpg",
  entrega: "/img/fotos/entrega-distribucion.jpg",
  atencion: "/img/fotos/atencion-cliente.jpg",
  oficina: "/img/fotos/oficina-corporativa.jpg",
  epp: "/img/fotos/epp.jpg",
  aliado: "/img/fotos/aliado-oficina-ferreteria.jpg",
  papeleria: "/img/fotos/estanteria-papeleria.jpg",
  exhibicionHerramientas: "/img/fotos/exhibicion-herramientas.jpg",
  asesoria: "/img/fotos/asesoria-comercial.jpg",
  papelToner: "/img/fotos/papel-tintas-toner.jpg",
  utiles: "/img/fotos/utiles-oficina.jpg",
  inventario: "/img/fotos/control-inventario.jpg",
  distribucion: "/img/fotos/centro-distribucion.jpg",
  limpieza: "/img/fotos/productos-limpieza.jpg",
  archivadores: "/img/fotos/archivadores.jpg",
  tornilleria: "/img/fotos/tornilleria.jpg",
  stock: "/img/fotos/stock-almacen.jpg",
  acuerdo: "/img/fotos/acuerdo-comercial.jpg",
} as const;

export type Foto = (typeof FOTOS)[keyof typeof FOTOS];

/** Opciones del formulario; `valor` viaja en la URL (?linea=) para prellenarlo. */
export const LINEAS_FORM = [
  { valor: "escritorio", label: "Materiales de escritorio" },
  { valor: "ferreteria", label: "Ferretería y materiales" },
  { valor: "epp", label: "Equipos de protección personal" },
  { valor: "limpieza", label: "Limpieza e insumos" },
  { valor: "licitacion", label: "Proceso de contratación pública" },
  { valor: "mixto", label: "Requerimiento mixto" },
] as const;

export const TIPOS_CLIENTE = [
  "Empresa privada",
  "Entidad pública",
  "Municipalidad",
  "Institución educativa",
  "Centro de salud",
  "Otro",
] as const;
