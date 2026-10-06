# DECOKASA · tema Shopify 0.1.0

Tema Shopify 0.1.0 en construcción, conectado a GitHub/main y activo en Shopify. Tienda protegida por contraseña, verificada el 06/10/2026. Sin receptor de formularios ni sincronización de stock: el formulario está deliberadamente en modo simulación.

## Recorrido
Inicio → catálogo por marca o tipo → landing con ficha completa → formulario → asesor (integración pendiente). Sin pasarelas ni checkout. No emitir `purchase` desde el navegador.

## Archivos
- `templates/index.json`: portada multimarcas editable; imagen principal y colección destacada.
- `templates/collection.json`: catálogo; enlaces nativos por vendor/type y paginación.
- `templates/product.json`: cada URL `/products/<handle>` es una landing que incluye ficha y formulario.
- `templates/page.pvc.json` + `sections/pvc-landing.liquid`: página interna PVC con selector de producto. Crear la página `pisos-pvc` y asignar plantilla cuando se trabaje en Shopify.
- `assets/decokasa.css` / `.js`: estilos compartidos, calculadora y simulación; no bibliotecas ni servicios externos.
- `docs/request-contract.json`: propuesta de contrato para Odoo/CRM y medición; aún sin implementación de transporte.

## Configuración pendiente
Moneda de tienda PEN/Perú. Cargar catálogo real y fotos; precios y promociones por definir. Nunca inferir stock de Odoo a partir de disponibilidad Shopify.
Metacampos propuestos: `decokasa.coverage_m2` (decimal, producto o variante, m² por caja); `decokasa.landing_url` (URL relativa de landing, si usa página interna en lugar del producto). El catálogo debe apuntar a la landing única de cada producto. La página PVC debe enlazar al mismo producto que su metacampo de ruta.
Asignar SKU único por variante, unidad/almacén y mapeo Odoo tras validación. El calculador requiere rendimiento válido; no usa un rendimiento ficticio en el tema. La cobertura PVC debe corresponder a la presentación seleccionada.
El formulario solo simula y no persiste datos personales. Consentimiento de seguimiento de prueba en sessionStorage; rechazar elimina atribución e identificador de visitante. Referencia de solicitud necesaria separada de analítica. UTMs deben contener nombres de campaña sin datos personales. Primer/último origen se conserva en navegación directa durante la sesión si se autoriza; no hay atribución entre sesiones todavía. GA4 y Meta/TikTok pendientes. No hay enlace al CRM activo.

## Verificación
`npm test` aprueba seis pruebas de lógica y una suite DOM simulada (filtros, variantes, formulario, consentimiento). Shopify Theme Check sin errores ni advertencias; siete HTML y ZIP verificados. Portada renderizada y revisada directamente en Shopify, en escritorio y celular, sin desbordamiento horizontal de página. Reintentos conservan referencia solo en la página actual. Pendiente: catálogo/variantes reales, validación nativa de formularios y recepción idempotente en Odoo antes del lanzamiento comercial.

## Diseño según el mockup original

Cabecera con buscador, menú de categorías, banner negro/amarillo, tres marcas y franja promocional adaptados a la imagen del 02/10/2026. Seis artes independientes regenerados con image_gen sustituyen los recortes del mockup y se entregan en WebP de alta resolución (1860–2172 px de ancho). Textos y botones siguen siendo HTML. Solo se mantiene el bloque mayorista inferior. La cabecera admite logo propio; la sección Inicio admite banner y tres tarjetas. Se adaptó el texto comercial al flujo con asesor y sin pagos en línea. Prompts en `docs/image-prompts.json`; dimensiones, peso y codificación en `docs/image-assets.json`.

Fuentes de arquitectura: https://shopify.dev/docs/storefronts/themes/architecture y https://shopify.dev/docs/api/liquid/filters/link_to_vendor .

## Registro del proyecto

- [Decisiones actuales y arquitectura](docs/project-context.md).
- [Avances, pruebas y pendientes](docs/progress.md).
- [Documentos de planificación y esquemas](docs/planning/README.md).
- [Referencia visual inicial](docs/references/mockup-inicial-decokasa-2026-10-02.jpeg).
- [Demostración navegable](preview/DECOKASA-inicio.html): descargar el repositorio y abrir este HTML en el navegador; GitHub muestra su código.
- [Paquete del tema](releases/DECOKASA-tema-0.1.0.zip): contiene solo los 35 archivos Shopify. GitHub/main ya sincroniza el tema activo.

## Reproducir las verificaciones

Con Node.js 20 o superior: `npm ci` y `npm test`. Incluye seis pruebas de lógica y la prueba DOM simulada; esta última no comprueba presentación visual ni validación nativa de formularios.

Con Python 3: `python scripts/verify_store.py` revisa las siete páginas, enlaces, anclas, IDs, JSON y esquemas de secciones y regenera el ZIP del tema a partir del código actual.

Después de cambiar portada/cabecera/estilos: `node scripts/sync_preview.cjs` regenera las vistas locales desde las secciones Liquid y copia los recursos; luego ejecutar el verificador y las pruebas. La demostración conserva su catálogo ficticio.

Shopify Theme Check: `npx @shopify/cli theme check --path . --output json`. La herramienta no requiere conexión a la tienda para esta revisión estática. `.shopifyignore` excluye documentos, pruebas, vistas y herramientas del tema.
