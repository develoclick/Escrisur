/**
 * Contenido único del sitio. Todo el texto vive aquí para que las secciones
 * queden como composición pura y el copy se pueda revisar en un solo lugar.
 *
 * PENDIENTE marca los datos que la empresa aún no ha facilitado. No se inventan.
 */

export const PENDIENTE = "[PENDIENTE DE COMPLETAR]";

export const EMPRESA = {
  razonSocial: "ESCRITORIO Y SUMINISTROS DEL SUR E.I.R.L.",
  marca: "ESCRISUR",
  tipo: "E.I.R.L.",
  partida: "11635257",
  titular: "GUADALUPE FIORELA CAYANI DE LA CRUZ",
  cargo: "Titular-Gerente",
  distrito: "Cabanaconde",
  provincia: "Caylloma",
  region: "Arequipa",
  pais: "Perú",
  anio: "2025",
  telefono: PENDIENTE,
  correo: PENDIENTE,
} as const;

export const NAV = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Productos", href: "#productos" },
  { label: "Servicios", href: "#servicios" },
  { label: "Licitaciones", href: "#licitaciones" },
  { label: "Contacto", href: "#cotizacion" },
] as const;

export const HERO = {
  eyebrow: "Abastecimiento institucional",
  titulo: "Soluciones de abastecimiento para empresas e instituciones",
  texto:
    "Productos y servicios para oficinas, instituciones y empresas, con atención orientada a las necesidades de cada organización.",
  ctaPrimario: { label: "Solicitar cotización", href: "#cotizacion" },
  ctaSecundario: { label: "Conocer más", href: "#nosotros" },
} as const;

export const ABOUT = {
  eyebrow: "Empresa peruana registrada",
  titulo: "Abastecimiento confiable para cada necesidad",
  cita:
    "ESCRITORIO Y SUMINISTROS DEL SUR E.I.R.L. es una empresa peruana orientada a la comercialización de productos y prestación de servicios para empresas, instituciones y entidades públicas y privadas.",
  claim:
    "Atendemos organizaciones de distinto tamaño en la región Arequipa y a nivel nacional.",
  puntos: [
    "Comercialización de productos para oficinas e instituciones",
    "Prestación de servicios de limpieza y abastecimiento",
    "Participación en procesos de contratación pública y privada",
  ],
  cta: { label: "Conocer nuestra empresa", href: "#licitaciones" },
} as const;

export type Producto = {
  numero: string;
  titulo: string;
  texto: string;
  media: string;
  icono: "papeleria" | "oficina" | "informatica" | "ferreteria" | "epp" | "limpieza";
};

export const PRODUCTOS: Producto[] = [
  {
    numero: "01",
    titulo: "Útiles escolares y papelería",
    texto:
      "Cuadernos, papel bond, carpetas, material de escritura y todo el consumible de aula y oficina.",
    media: "papeleria",
    icono: "papeleria",
  },
  {
    numero: "02",
    titulo: "Artículos de oficina",
    texto:
      "Archivadores, organizadores, mobiliario menor y suministros para el funcionamiento diario.",
    media: "oficina",
    icono: "oficina",
  },
  {
    numero: "03",
    titulo: "Equipamiento informático",
    texto:
      "Computadoras, impresoras, consumibles de impresión y accesorios para puestos de trabajo.",
    media: "informatica",
    icono: "informatica",
  },
  {
    numero: "04",
    titulo: "Ferretería y materiales",
    texto:
      "Cemento, fierro, pinturas, herramientas y materiales para obra y mantenimiento.",
    media: "ferreteria",
    icono: "ferreteria",
  },
  {
    numero: "05",
    titulo: "Equipos de protección personal",
    texto:
      "Cascos, guantes, chalecos, mascarillas, botas y gafas conforme a la normativa de seguridad.",
    media: "epp",
    icono: "epp",
  },
  {
    numero: "06",
    titulo: "Productos de limpieza",
    texto:
      "Insumos, desinfectantes y productos sanitarios para el mantenimiento de instalaciones.",
    media: "limpieza",
    icono: "limpieza",
  },
];

export type Servicio = {
  numero: string;
  titulo: string;
  texto: string;
  icono: "limpieza" | "insumos" | "abastecimiento" | "institucional" | "licitaciones";
};

export const SERVICIOS: Servicio[] = [
  {
    numero: "01",
    titulo: "Limpieza integral",
    texto:
      "Servicio de limpieza para oficinas, centros comerciales, establecimientos e instalaciones industriales.",
    icono: "limpieza",
  },
  {
    numero: "02",
    titulo: "Suministro de insumos de limpieza",
    texto:
      "Abastecimiento continuo de insumos y productos sanitarios para el mantenimiento de las instalaciones.",
    icono: "insumos",
  },
  {
    numero: "03",
    titulo: "Abastecimiento empresarial",
    texto:
      "Provisión programada de productos de oficina y consumibles según el consumo de cada organización.",
    icono: "abastecimiento",
  },
  {
    numero: "04",
    titulo: "Atención institucional",
    texto:
      "Gestión de requerimientos de entidades públicas y privadas con la documentación que cada proceso exige.",
    icono: "institucional",
  },
  {
    numero: "05",
    titulo: "Participación en licitaciones y concursos",
    texto:
      "Presentación como oferente en procesos de contratación pública y privada, de ámbito nacional.",
    icono: "licitaciones",
  },
];

export const ESTADISTICAS = [
  { valor: "44", sufijo: "", label: "Actividades comprendidas en el objeto social" },
  { valor: "01", sufijo: "", label: "Empresa constituida en Perú" },
  { valor: "E.I.R.L.", sufijo: "", label: "Tipo de empresa" },
  { valor: "2025", sufijo: "", label: "Año de constitución" },
] as const;

export const AREAS = [
  { titulo: "Empresas privadas", media: "empresas" },
  { titulo: "Entidades públicas", media: "publicas" },
  { titulo: "Instituciones educativas", media: "educativas" },
  { titulo: "Municipalidades", media: "municipalidades" },
  { titulo: "Centros de salud", media: "salud" },
  { titulo: "Industria", media: "industria" },
  { titulo: "Construcción", media: "construccion" },
  { titulo: "Oficinas", media: "oficinas" },
] as const;

export const TIPOS_CLIENTE = [
  "Empresa privada",
  "Entidad pública",
  "Municipalidad",
  "Institución educativa",
  "Centro de salud",
  "Otro",
] as const;

export const PROCESO = [
  {
    paso: "01",
    titulo: "Envíenos su requerimiento",
    texto: "Recibimos la especificación de los bienes o servicios que necesita.",
    media: "paso-1",
  },
  {
    paso: "02",
    titulo: "Evaluamos su necesidad",
    texto: "Revisamos cantidades, características y condiciones de entrega.",
    media: "paso-2",
  },
  {
    paso: "03",
    titulo: "Preparamos la propuesta",
    texto: "Elaboramos la cotización con la documentación que el proceso exige.",
    media: "paso-3",
  },
  {
    paso: "04",
    titulo: "Coordinamos la atención",
    texto: "Acordamos plazos y lugar de entrega, y ejecutamos la atención.",
    media: "paso-4",
  },
] as const;

export const LICITACIONES = {
  eyebrow: "Sector público",
  titulo: "Soluciones para el sector público",
  texto:
    "Participamos como oferentes en procesos de contratación pública y privada relacionados con los bienes y servicios comprendidos dentro de nuestras actividades.",
  items: [
    "Licitaciones",
    "Concursos",
    "Cotizaciones",
    "Suministro de bienes",
    "Servicios",
    "Atención institucional",
  ],
  cta: { label: "Consultar para contrataciones", href: "#cotizacion" },
} as const;

export const CTA_FINAL = {
  titulo: "¿Tiene un requerimiento de abastecimiento?",
  texto:
    "Envíenos la descripción de los bienes o servicios que necesita y preparamos una propuesta para su organización.",
  cta: { label: "Solicitar cotización", href: "#cotizacion" },
} as const;

export const FOOTER = {
  columnas: [
    {
      titulo: "Empresa",
      items: [
        { label: "Inicio", href: "/" },
        { label: "Nosotros", href: "#nosotros" },
        { label: "Productos", href: "#productos" },
        { label: "Servicios", href: "#servicios" },
      ],
    },
    {
      titulo: "Servicios",
      items: [
        { label: "Limpieza integral", href: "#servicios" },
        { label: "Abastecimiento", href: "#servicios" },
        { label: "Suministros", href: "#productos" },
        { label: "Licitaciones", href: "#licitaciones" },
      ],
    },
  ],
} as const;
