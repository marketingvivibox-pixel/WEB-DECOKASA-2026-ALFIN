# Avances y validación

## 07/10/2026 — Barra fija y acceso a WhatsApp

- La franja superior de servicios permanece visible al desplazarse. La portada incorpora un botón flotante accesible y adaptable que abre WhatsApp al `+51 941 599 516` con un texto prellenado; el cliente lo revisa y envía manualmente.
- Se añadió una vista local de teléfono (390 × 844 px) en `preview/DECOKASA-movil.html`; muestra la portada de la demostración dentro de un marco y no sustituye la vista previa del tema en Shopify.
- Número y mensaje se pueden editar en los ajustes de la sección Inicio. Se actualizaron las siete vistas locales y el ZIP del tema.
- Validación local: siete pruebas Node aprobadas; siete páginas/rutas/JSON/enlaces verificados; ZIP de 36 archivos. Pendiente confirmar visualmente la sincronización en Shopify después del push.

## 06/10/2026 — DECOKASA con revestimientos y hogar

- Nueva imagen independiente con pisos PVC y SPC, paneles PVC, wall panel, alfombras y artículos para el hogar; logo integrado y composición acorde a las otras marcas. Generada con image_gen, 1860 × 846 px, WebP calidad 94. Original preservado; prompt y dimensiones registrados.
- Sustituido el fondo de logo por la nueva imagen; conservados el enlace por marca, el selector del editor y el orden DECOKASA, Xion, Biflex, Mundo Baby. Otras imágenes sin cambios.
- Siete vistas regeneradas; ZIP actualizado a 36 archivos. Siete pruebas aprobadas, HTML/enlaces/IDs/rutas/JSON válidos y Shopify Theme Check sin hallazgos.
- Commit 5be5172 enviado a GitHub/main y verificado en Shopify: las cuatro imágenes cargan en el orden solicitado; escritorio de 1905 px sin desbordamiento horizontal. Captura: outputs/DECOKASA-marca-hogar-shopify.png del chat de trabajo. Memoria canónica e índice actualizados.

## 06/10/2026 — DECOKASA encabeza Nuestras marcas

- Orden solicitado: DECOKASA, Xion, Biflex y Mundo Baby. Nueva tarjeta DECOKASA con el logo WebP aprobado sobre fondo amarillo suave y enlace al catálogo por marca; imagen sustituible desde el editor del tema.
- Se conservan sin cambios los seis WebP existentes y el único bloque mayorista inferior. Cuatro columnas en escritorio, dos en tabletas y una en celular.
- Siete vistas regeneradas y ZIP de 35 archivos actualizado. Siete pruebas aprobadas, enlaces/IDs/rutas/JSON válidos y Shopify Theme Check sin hallazgos.
- Commit 0a47458 enviado a GitHub/main y verificado en Shopify: cuatro imágenes cargadas en el orden solicitado; escritorio 1905 px, tableta 753 px y celular 375 px útiles sin desbordamiento horizontal. Captura: outputs/DECOKASA-cuatro-marcas-escritorio.png del chat de trabajo. Memoria canónica e índice actualizados.

## 06/10/2026 — WebP de alta resolución y mayorista sin duplicación

- Retirada la cuarta tarjeta mayorista de Nuestras marcas. Se mantienen Xion, Mundo Baby y Biflex, y el bloque inferior #mayorista. Tres columnas en escritorio; una en celular para mostrar mejor cada imagen.
- Seis imágenes regeneradas individualmente con image_gen siguiendo el mockup aprobado: logo, hero, Xion, Mundo Baby, Biflex y franja. WebP a resolución nativa, calidad 94 y logo sin pérdida; originales preservados en generated_images local. Prompts y manifiesto incorporados a docs. La referencia original permanece en docs/references.
- Reemplazados los recortes CSS ampliados por imágenes independientes; actualizados selectores del editor, siete vistas y paquete de 35 archivos.
- Verificación: siete pruebas Node aprobadas; siete HTML, enlaces, IDs, rutas, JSON y ZIP válidos; Shopify Theme Check sin hallazgos.
- Publicado en la rama conectada main mediante da2caab y verificado en Shopify: tres marcas, un bloque #mayorista y seis WebP cargados a sus dimensiones nativas. Escritorio 1905 px y móvil 375 px útiles, sin desbordamiento horizontal; tamaño del navegador restablecido. Capturas guardadas en outputs del chat.
- Sin cambios de operación: formulario simulado y conexiones CRM/Odoo/GA4 pendientes. Catálogo y fotografías comerciales reales pendientes.

Las secciones siguientes describen estados anteriores.

## Estado actual — 06/10/2026, diseño según mockup original

- Tema activo en Shopify, conectado a GitHub/main, tienda privada con contraseña. Estado observado en el administrador; no se cambió publicación ni contraseña durante este ajuste.
- Cabecera, buscador, categorías, banner negro/amarillo, cuatro marcas y franja promocional adaptados al mockup del usuario. Fotos provisionales tomadas de la referencia original sin alterar el archivo; logo, banner y tarjetas reemplazables desde el editor. Titular y botones reales, con texto adaptado al flujo de compra con asesor.
- Cambios de diseño registrados en `aec5ac8` y `a665821`, push confirmado. Portada comprobada directamente en Shopify después de la sincronización: escritorio de 1905 px y móvil de 375 px de ancho útil, sin desbordamiento horizontal. Imágenes cargadas y tarjetas en dos columnas en móvil; tamaño temporal del navegador restablecido.
- Modificados cabecera, portada, estilos y ubicación del aviso demo; añadidos iconos SVG, snippet de referencia y recurso original. Siete vistas locales regeneradas mediante `scripts/sync_preview.cjs`; ZIP actualizado a 30 archivos de tema.
- Validaciones: siete pruebas Node aprobadas; siete HTML, enlaces/anclas/IDs/JSON/esquemas y ZIP válidos; Theme Check `[]`; auditoría de dependencias sin vulnerabilidades. Capturas de escritorio y móvil entregadas en outputs del chat.
- Pendientes: artes separados y catálogo real; revisión funcional con esos productos; receptor/CRM/Odoo, consentimiento y GA4. Formulario sigue simulado, sin envíos ni afectación de stock.

Las entradas siguientes son históricas y describen el estado anterior a esta revisión.

## 06/10/2026 — primera base 0.1.0

Tema Shopify con 27 archivos, siete vistas HTML navegables, calculadora PVC interna y formulario simulado. Documentación histórica y referencia visual preservadas; decisiones actuales en `project-context.md`. Contrato de solicitudes/CRM propuesto, sin conexión real.

Validación previa: Shopify Theme Check sin errores ni advertencias; seis pruebas de lógica aprobadas; siete páginas con enlaces, anclas, IDs y esquemas válidos; prueba DOM simulada aprobada para filtros, variantes, cálculo, referencias y consentimiento, sin envíos de red.

Las pruebas DOM sustituyen la validación nativa de campos por un doble de prueba. No confirman aspecto visual, comportamiento móvil ni integración Shopify/Odoo. Revisión visual pendiente; el navegador de herramientas bloqueó archivos locales y se respetó esa limitación.

## 06/10/2026 — registro en GitHub

Autorizado por el usuario: guardar todo el trabajo del proyecto. Se incluyen código del tema, demostración, datos ficticios, pruebas portátiles, paquete instalable, propuesta, plan de trabajo, contexto, esquemas de fase 1 y mockup inicial. Los documentos de planificación anteriores se conservan como antecedentes y no sustituyen las decisiones vigentes.

No se ha instalado ni publicado el tema, ni conectado Odoo o GA4. Próxima fase: revisión de la presentación y catálogo real, seguida de pruebas de integración cuando se habilite Odoo.
