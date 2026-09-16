/**
 * Contenido de cada página.
 *
 * Todo lo registral sale de la Partida Electrónica N.º 11635257. Las políticas
 * de atención (entrega en destino, reemplazo de bienes observados, atención
 * directa) son compromisos de la empresa. No hay cifras de ventas, clientes,
 * testimonios ni años de experiencia inventados.
 */
import { FOTOS, type Foto } from "@/lib/content";

export type Categoria = {
  id: string;
  titulo: string;
  resumen: string;
  items: string[];
  foto: Foto;
};

export type Paso = { titulo: string; texto: string; foto: Foto };

/* ==========================================================================
   INICIO
   ========================================================================== */
export const INICIO = {
  slides: [
    {
      eyebrow: "Distribuidora en Arequipa",
      titulo: "Abastecemos a empresas e instituciones",
      destacado: "de principio a fin",
      texto:
        "Materiales de escritorio, ferretería y servicios en un solo proveedor formal. Usted envía el requerimiento; nosotros lo entregamos completo.",
      foto: FOTOS.distribucion,
    },
    {
      eyebrow: "Materiales de escritorio",
      titulo: "Todo lo que su oficina consume,",
      destacado: "en una sola orden",
      texto:
        "Papel, archivadores, útiles, tintas y tóner para oficinas, colegios y entidades públicas.",
      foto: FOTOS.papeleria,
    },
    {
      eyebrow: "Ferretería",
      titulo: "Herramientas y materiales",
      destacado: "para obra y mantenimiento",
      texto:
        "Herramientas eléctricas y manuales, tornillería, fijaciones y equipos de protección personal.",
      foto: FOTOS.exhibicionHerramientas,
    },
  ],
  marquesina: [
    "Papel bond",
    "Archivadores",
    "Tintas y tóner",
    "Útiles de oficina",
    "Herramientas eléctricas",
    "Tornillería",
    "Equipos de protección",
    "Productos de limpieza",
    "Entrega en destino",
    "Sector público",
  ],
  confianza: [
    { valor: "44", etiqueta: "actividades en el objeto social" },
    { valor: "2", etiqueta: "líneas: escritorio y ferretería" },
    { valor: "2025", etiqueta: "año de constitución" },
    { valor: "1", etiqueta: "proveedor para todo el requerimiento" },
  ],
  porque: [
    {
      titulo: "Pedido completo",
      texto: "Consolidamos todos los ítems en un solo despacho, sin fraccionar la compra.",
    },
    {
      titulo: "Entrega en destino",
      texto: "Llevamos el pedido hasta el almacén que su organización designe.",
    },
    {
      titulo: "Reemplazo sin costo",
      texto: "Todo bien observado se sustituye, asumiendo nosotros la entrega adicional.",
    },
    {
      titulo: "Atención directa",
      texto: "Su requerimiento lo revisa quien firma la oferta y responde por la entrega.",
    },
  ],
};

export const PROCESO: Paso[] = [
  {
    titulo: "Envíe su requerimiento",
    texto: "Nos indica los productos o servicios, cantidades y lugar de entrega.",
    foto: FOTOS.asesoria,
  },
  {
    titulo: "Preparamos la propuesta",
    texto: "Verificamos disponibilidad y le enviamos una cotización formal.",
    foto: FOTOS.inventario,
  },
  {
    titulo: "Consolidamos el pedido",
    texto: "Reunimos y revisamos cada ítem contra lo solicitado antes de despachar.",
    foto: FOTOS.stock,
  },
  {
    titulo: "Entregamos en destino",
    texto: "Llevamos el pedido completo con su documentación de entrega.",
    foto: FOTOS.entrega,
  },
];

export const GALERIA: { foto: Foto; alt: string }[] = [
  { foto: FOTOS.almacen, alt: "Almacén con estanterías y montacargas" },
  { foto: FOTOS.papeleria, alt: "Estantería de papelería y archivadores" },
  { foto: FOTOS.exhibicionHerramientas, alt: "Exhibición de herramientas" },
  { foto: FOTOS.entrega, alt: "Entrega de pedido desde furgoneta" },
  { foto: FOTOS.papelToner, alt: "Resmas de papel A4 y cajas de tóner" },
  { foto: FOTOS.epp, alt: "Casco, guantes y gafas de seguridad" },
  { foto: FOTOS.inventario, alt: "Control de inventario en almacén" },
  { foto: FOTOS.limpieza, alt: "Productos de limpieza" },
];

/* ==========================================================================
   NOSOTROS
   ========================================================================== */
export const NOSOTROS = {
  meta: {
    titulo: "Nosotros",
    descripcion:
      "ESCRISUR Distribuidora: empresa peruana de materiales de escritorio, ferretería y servicios para empresas e instituciones. Partida N.º 11635257, Arequipa.",
  },
  hero: {
    eyebrow: "Quiénes somos",
    titulo: "Su aliado en oficina y ferretería",
    texto:
      "Una empresa arequipeña constituida para abastecer a organizaciones públicas y privadas con un solo proveedor formal.",
    foto: FOTOS.aliado,
  },
  historia: {
    titulo: "Una distribuidora pensada para el cliente institucional",
    parrafos: [
      "ESCRITORIO Y SUMINISTROS DEL SUR E.I.R.L. —ESCRISUR— se constituyó en 2025 y está inscrita en la Partida Electrónica N.º 11635257 del Registro de Personas Jurídicas de la Zona Registral N.º XII, Sede Arequipa.",
      "Reunimos dos líneas que normalmente obligan a buscar proveedores distintos: materiales de escritorio y ferretería. A ellas sumamos servicios de limpieza y abastecimiento programado, para que una organización resuelva con una sola orden lo que antes exigía varias.",
    ],
  },
  mision:
    "Abastecer de forma oportuna y formal a las organizaciones públicas y privadas del sur del país, entregando exactamente lo solicitado en el plazo comprometido.",
  vision:
    "Ser un proveedor de referencia en materiales de escritorio y ferretería en la región Arequipa, reconocido por la puntualidad de sus entregas y la transparencia de su gestión.",
  valores: [
    { titulo: "Cumplimiento", texto: "Entregamos lo solicitado, en el plazo acordado." },
    { titulo: "Formalidad", texto: "Operamos dentro del marco legal, con documentación completa." },
    { titulo: "Calidad", texto: "Productos nuevos, de marcas reconocidas y verificables." },
    { titulo: "Integridad", texto: "Sin prácticas que afecten la libre competencia." },
  ],
  registro: [
    { etiqueta: "Razón social", valor: "ESCRITORIO Y SUMINISTROS DEL SUR E.I.R.L." },
    { etiqueta: "Nombre comercial", valor: "ESCRISUR Distribuidora" },
    { etiqueta: "Tipo de empresa", valor: "Empresa Individual de Responsabilidad Limitada" },
    { etiqueta: "Partida electrónica", valor: "N.º 11635257" },
    { etiqueta: "Zona registral", valor: "N.º XII — Sede Arequipa" },
    { etiqueta: "Constitución", valor: "2025" },
    { etiqueta: "Domicilio", valor: "Arequipa" },
    { etiqueta: "Titular-Gerente", valor: "Guadalupe Fiorela Cayani de la Cruz" },
  ],
  compromisos: [
    { titulo: "Verificación antes del despacho", foto: FOTOS.inventario },
    { titulo: "Stock organizado y trazable", foto: FOTOS.stock },
    { titulo: "Entrega hasta su almacén", foto: FOTOS.entrega },
    { titulo: "Acuerdos claros y por escrito", foto: FOTOS.acuerdo },
  ],
};

/* ==========================================================================
   ESCRITORIO
   ========================================================================== */
export const ESCRITORIO = {
  meta: {
    titulo: "Materiales de escritorio",
    descripcion:
      "Papel bond, archivadores, útiles de oficina, tintas y tóner para empresas, colegios y entidades públicas en Arequipa. Solicite su cotización.",
  },
  hero: {
    eyebrow: "Línea de escritorio",
    titulo: "Materiales de escritorio para toda la organización",
    texto:
      "El consumible de mayor rotación en oficinas, colegios y entidades públicas, abastecido en una sola orden y entregado en su almacén.",
    foto: FOTOS.suministrosEscritorio,
  },
  categorias: [
    {
      id: "papel",
      titulo: "Papel, tintas y tóner",
      resumen: "El insumo que ninguna oficina puede dejar de tener.",
      items: [
        "Papel bond A4 y A5 de 75 y 80 g",
        "Tintas para impresoras de tanque",
        "Tóner para impresoras láser",
        "Papel de colores, cartulinas y papelógrafos",
      ],
      foto: FOTOS.papelToner,
    },
    {
      id: "archivo",
      titulo: "Archivo y organización",
      resumen: "Orden documentario para áreas administrativas.",
      items: [
        "Archivadores de palanca lomo ancho y angosto",
        "Files, folders y micas",
        "Separadores y cajas de archivo",
        "Organizadores de escritorio",
      ],
      foto: FOTOS.archivadores,
    },
    {
      id: "utiles",
      titulo: "Útiles de oficina",
      resumen: "Lo que se usa todos los días en cada escritorio.",
      items: [
        "Lapiceros, lápices, plumones y resaltadores",
        "Engrapadores, perforadores, clips y grapas",
        "Cintas adhesivas, goma y correctores",
        "Tijeras, reglas y calculadoras",
      ],
      foto: FOTOS.utiles,
    },
    {
      id: "papeleria",
      titulo: "Papelería institucional",
      resumen: "Volumen para campañas escolares y administrativas.",
      items: [
        "Cuadernos y blocks",
        "Sobres manila y blancos",
        "Foliadores, sellos y tampones",
        "Papel lustre y platino",
      ],
      foto: FOTOS.papeleria,
    },
  ] satisfies Categoria[],
  clientes: [
    { titulo: "Oficinas y empresas", texto: "Reposición periódica del consumo administrativo." },
    { titulo: "Instituciones educativas", texto: "Campañas de útiles y material de aula." },
    { titulo: "Entidades públicas", texto: "Atención de requerimientos y contrataciones menores." },
  ],
};

/* ==========================================================================
   FERRETERÍA
   ========================================================================== */
export const FERRETERIA = {
  meta: {
    titulo: "Ferretería",
    descripcion:
      "Herramientas eléctricas y manuales, tornillería, fijaciones, equipos de protección personal y materiales para obra y mantenimiento en Arequipa.",
  },
  hero: {
    eyebrow: "Línea de ferretería",
    titulo: "Ferretería para obra, mantenimiento y seguridad",
    texto:
      "Herramientas, fijaciones, materiales y protección personal para empresas, municipalidades y contratistas.",
    foto: FOTOS.herramientas,
  },
  categorias: [
    {
      id: "herramientas",
      titulo: "Herramientas eléctricas y manuales",
      resumen: "Equipamiento para cuadrillas de mantenimiento y obra.",
      items: [
        "Taladros, amoladoras y atornilladores",
        "Martillos, llaves y alicates",
        "Cintas métricas y niveles",
        "Cajas y organizadores de herramientas",
      ],
      foto: FOTOS.exhibicionHerramientas,
    },
    {
      id: "fijaciones",
      titulo: "Tornillería y fijaciones",
      resumen: "Los componentes que sostienen cada instalación.",
      items: [
        "Tornillos, pernos y tuercas",
        "Tarugos y anclajes",
        "Clavos y grapas",
        "Arandelas y accesorios",
      ],
      foto: FOTOS.tornilleria,
    },
    {
      id: "epp",
      titulo: "Equipos de protección personal",
      resumen: "Seguridad para el personal de campo y obra.",
      items: [
        "Cascos y gafas de seguridad",
        "Guantes según el tipo de riesgo",
        "Chalecos reflectivos y calzado",
        "Protección auditiva y respiratoria",
      ],
      foto: FOTOS.epp,
    },
    {
      id: "materiales",
      titulo: "Materiales y mantenimiento",
      resumen: "Insumos para obra menor e infraestructura.",
      items: [
        "Cemento, fierro y agregados",
        "Pinturas, barnices y solventes",
        "Accesorios de gasfitería",
        "Material eléctrico",
      ],
      foto: FOTOS.almacen,
    },
  ] satisfies Categoria[],
  clientes: [
    { titulo: "Municipalidades", texto: "Obras menores, mantenimiento y seguridad del personal." },
    { titulo: "Empresas y contratistas", texto: "Abastecimiento de cuadrillas y proyectos." },
    { titulo: "Industria y construcción", texto: "Herramientas, fijaciones y protección personal." },
  ],
};

/* ==========================================================================
   SERVICIOS
   ========================================================================== */
export const SERVICIOS = {
  meta: {
    titulo: "Servicios",
    descripcion:
      "Limpieza integral, suministro de insumos, abastecimiento programado, distribución y asesoría comercial para empresas e instituciones.",
  },
  hero: {
    eyebrow: "Servicios",
    titulo: "Servicios que sostienen su operación",
    texto:
      "Además de distribuir productos, prestamos los servicios que mantienen en funcionamiento sus oficinas e instalaciones.",
    foto: FOTOS.oficina,
  },
  lista: [
    {
      id: "limpieza",
      titulo: "Limpieza integral",
      resumen:
        "Limpieza de oficinas, sedes institucionales, establecimientos comerciales e instalaciones industriales.",
      items: [
        "Limpieza de ambientes y áreas comunes",
        "Desinfección y sanitización de superficies",
        "Servicios higiénicos y reposición de insumos",
      ],
      foto: FOTOS.limpieza,
    },
    {
      id: "abastecimiento",
      titulo: "Abastecimiento programado",
      resumen:
        "Entregas periódicas de materiales de escritorio y ferretería según el consumo real de su organización.",
      items: [
        "Catálogo base acordado por organización",
        "Calendario de entregas",
        "Varias líneas en un solo despacho",
      ],
      foto: FOTOS.stock,
    },
    {
      id: "distribucion",
      titulo: "Distribución y entrega",
      resumen: "Traslado del pedido completo hasta el almacén o sede que usted designe.",
      items: [
        "Embalaje y verificación del pedido",
        "Coordinación de fecha y lugar",
        "Documentación de entrega",
      ],
      foto: FOTOS.entrega,
    },
    {
      id: "asesoria",
      titulo: "Asesoría comercial",
      resumen:
        "Le ayudamos a definir el requerimiento: especificaciones, cantidades y alternativas disponibles.",
      items: [
        "Revisión de especificaciones técnicas",
        "Alternativas de marca y presentación",
        "Propuesta formal por escrito",
      ],
      foto: FOTOS.asesoria,
    },
  ] satisfies Categoria[],
  modalidades: [
    { titulo: "Por requerimiento", texto: "Atención puntual a una orden de compra o de servicio." },
    { titulo: "Programado", texto: "Entregas recurrentes según un calendario acordado." },
    { titulo: "Por contratación pública", texto: "Participación en procesos de selección." },
  ],
};

/* ==========================================================================
   LICITACIONES
   ========================================================================== */
export const LICITACIONES = {
  meta: {
    titulo: "Licitaciones",
    descripcion:
      "ESCRISUR participa como oferente en contrataciones menores, licitaciones, concursos y cotizaciones del sector público en materiales de escritorio y ferretería.",
  },
  hero: {
    eyebrow: "Sector público",
    titulo: "Preparados para contratar con el Estado",
    texto:
      "Participamos como oferentes en procesos de contratación pública y privada relacionados con los bienes y servicios de nuestro objeto social.",
    foto: FOTOS.acuerdo,
  },
  procesos: [
    { titulo: "Contrataciones menores", texto: "Órdenes de compra y de servicio de menor cuantía." },
    { titulo: "Licitaciones públicas", texto: "Procedimientos de selección para la adquisición de bienes." },
    { titulo: "Concursos públicos", texto: "Procedimientos orientados a la contratación de servicios." },
    { titulo: "Indagación de mercado", texto: "Cotizaciones formales para los estudios de mercado." },
  ],
  garantias: [
    {
      titulo: "Objeto social que acredita el rubro",
      texto: "La partida inscribe 44 actividades, entre ellas la venta de útiles, artículos de oficina, ferretería y EPP.",
    },
    {
      titulo: "Representante con poder inscrito",
      texto: "La Titular-Gerente tiene facultades inscritas para participar en licitaciones y suscribir la documentación.",
    },
    {
      titulo: "Participación independiente",
      texto: "Ofertamos sin acuerdos con otros proveedores, conforme a la normativa de libre competencia.",
    },
  ],
  anexos: [
    "Cotización firmada y sellada",
    "Declaración jurada de no tener impedimento para contratar",
    "Pacto de integridad",
    "Declaración jurada de confidencialidad",
    "Declaración jurada de desafectación por parentesco",
    "Carta de autorización de depósito en cuenta",
  ],
  marco: [
    { norma: "Ley N.º 32069", detalle: "Ley General de Contrataciones Públicas." },
    { norma: "D.S. N.º 009-2025-EF", detalle: "Reglamento de la Ley General de Contrataciones Públicas." },
    { norma: "Ley N.º 27444", detalle: "Ley del Procedimiento Administrativo General." },
    { norma: "D. Leg. N.º 1034", detalle: "Ley de Represión de Conductas Anticompetitivas." },
  ],
};

/* ==========================================================================
   CONTACTO
   ========================================================================== */
export const CONTACTO = {
  meta: {
    titulo: "Contacto y cotizaciones",
    descripcion:
      "Solicite una cotización de materiales de escritorio, ferretería o servicios a ESCRISUR Distribuidora. Atención directa con la gerencia en Arequipa.",
  },
  hero: {
    eyebrow: "Contacto",
    titulo: "Cuéntenos qué necesita abastecer",
    texto:
      "Complete el formulario en menos de un minuto. Su solicitud la revisa directamente la gerencia.",
    foto: FOTOS.atencion,
  },
  faq: [
    {
      pregunta: "¿Atienden a entidades públicas?",
      respuesta:
        "Sí. Participamos en contrataciones menores, licitaciones, concursos y cotizaciones para indagación de mercado, y suscribimos los anexos que cada proceso exige.",
    },
    {
      pregunta: "¿Puedo pedir escritorio y ferretería en una misma orden?",
      respuesta:
        "Sí. Es precisamente nuestra propuesta: consolidamos las dos líneas, y los servicios si los necesita, en una sola propuesta y un solo despacho.",
    },
    {
      pregunta: "¿Cuál es el plazo de entrega?",
      respuesta:
        "Depende del alcance del pedido y del lugar de entrega. El plazo se acuerda en la cotización y queda fijado en la orden de compra.",
    },
    {
      pregunta: "¿Qué pasa si un producto llega observado?",
      respuesta:
        "Lo reemplazamos por otro nuevo sin costo para su organización, asumiendo nosotros los gastos de la entrega adicional.",
    },
    {
      pregunta: "¿Hasta dónde entregan?",
      respuesta:
        "Entregamos en el almacén o sede que su organización designe dentro de la región Arequipa. Para otros destinos, consúltenos.",
    },
  ],
};
