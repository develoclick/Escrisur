# ESCRISUR Distribuidora — sitio web

Sitio corporativo de **ESCRITORIO Y SUMINISTROS DEL SUR E.I.R.L.**
Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · shadcn/ui · Motion · Lucide.

## Rutas

| Ruta | Contenido |
| --- | --- |
| `/` | Resumen de todo: hero en carrusel, líneas, servicios, proceso, galería, cotización |
| `/nosotros` | Historia, misión y visión, valores, compromisos, datos registrales, galería |
| `/escritorio` | Materiales de escritorio: carrusel de destacados y catálogo por categoría |
| `/ferreteria` | Herramientas, fijaciones, EPP y materiales |
| `/servicios` | Modalidades, servicios con alcance y proceso interactivo |
| `/licitaciones` | Procesos, respaldo registral, anexos y marco normativo |
| `/contacto` | Formulario de cotización en dos pasos y preguntas frecuentes |
| `/api/cotizacion` | Recibe el formulario y lo envía por correo |

## Desarrollo

```bash
npm install
npm run dev
```

Antes de publicar: `npm run lint` y `npm run build` deben terminar sin errores.

## Antes de publicar — lista de pendientes

1. **Datos de contacto** en `src/lib/content.ts` (`EMPRESA`):
   - `telefono` y `correo`: mientras digan `[PENDIENTE DE COMPLETAR]` no se muestran en la web.
   - `whatsapp`: número internacional sin signos (ej. `51987654321`). Al completarlo
     aparece solo el botón flotante y la opción de enviar la cotización por WhatsApp.
   - `sitio`: dominio definitivo (se usa en canonical, sitemap, robots y Open Graph).
2. **Envío del formulario por correo**: copie `.env.example` como `.env.local` (o configure
   las variables en su hosting) con la clave de [Resend](https://resend.com) y el correo de destino.
   Sin configurarlo, el formulario sigue funcionando: el cliente puede copiar la solicitud.
3. **Carpeta original de imágenes**: `public/img/escrisur imagenes/` se publicaría tal cual
   (≈ 9 MB, incluido el collage). Muévala fuera de `public/` antes de desplegar; el sitio
   usa las copias optimizadas de `public/img/fotos/`.

## Imágenes y marca

- **Fotos**: `public/img/fotos/`. Para cambiar una, reemplace el archivo **con el mismo nombre**.
  El mapa de uso está en `FOTOS` dentro de `src/lib/content.ts`. `next/image` las sirve en
  AVIF/WebP y al tamaño de cada pantalla.
- **Logo**: `public/brand/logo.png` (fondo transparente, para fondos claros) y
  `public/brand/logo-icono.png` (icono). Favicon e icono de Apple: `src/app/icon.png` y
  `src/app/apple-icon.png`.
- **Colores** (del logo, en `src/app/globals.css`): verde `#038F82`, naranja `#FD6B2F`.
  Los tonos de texto y botón están ajustados para cumplir contraste WCAG AA.
- **Tipografía**: Montserrat (títulos, como el wordmark) y DM Sans (texto).

## Contenido

Todos los textos están en `src/lib/content.ts` y `src/lib/paginas.ts`. Los datos registrales
provienen de la Partida Electrónica N.º 11635257; no hay cifras, clientes ni testimonios inventados.

## Accesibilidad y rendimiento

- Todo el contenido llega visible en el HTML del servidor; las animaciones solo se activan
  cuando JavaScript está disponible y respetan `prefers-reduced-motion`.
- Carruseles con botones, teclado y deslizamiento táctil; visor de imágenes con Esc y flechas.
- Las 7 páginas son estáticas (prerenderizadas); solo `/api/cotizacion` se ejecuta en el servidor.
