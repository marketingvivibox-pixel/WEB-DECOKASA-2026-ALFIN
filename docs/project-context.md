# DECOKASA — decisiones vigentes

Actualizado: 07/10/2026. Este documento prevalece sobre las propuestas históricas de `planning/`.

## Confirmado por el usuario

- Shopify alojará la tienda; Odoo.sh Enterprise 18.0+e será el sistema de inventario y ventas. No existe conector activo.
- Operación en Perú, moneda PEN (soles). El usuario indica promoción Shopify US$1 por tres meses y después US$25; nombre del plan y condiciones de facturación pendientes de verificar en la cuenta.
- Portada multimarcas, en este orden: DECOKASA, Xion, Biflex y Mundo Baby; información para mayoristas.
- Catálogo accesible por categoría o marca. Cada enlace abre una landing con su ficha completa y formulario. Cada landing tiene su propia ruta.
- Calculadora PVC únicamente en landing interna. La portada ofrece acceso a ella.
- Versión inicial sin pasarelas de pago. El recorrido termina en formulario de solicitud y atención por un asesor.
- Enviar el formulario no reserva ni descuenta inventario. El asesor confirma y cierra la venta en Odoo; deben comprobarse las acciones operativas de reserva y entrega en pruebas.
- Se puede construir mientras se aprueba el entorno Odoo de pruebas. URL y accesos todavía pendientes.
- El usuario autorizó registrar todo el trabajo del proyecto en este repositorio el 06/10/2026 y conectó GitHub/main a Shopify. En la revisión visual posterior se verificó DECOKASA como tema activo y tienda privada con contraseña. Los cambios de main se sincronizan con ese tema.
- Diseño de portada ajustado al mockup original aportado por el usuario: cabecera, buscador, categorías, banner y cuatro tarjetas en este orden: DECOKASA, Xion, Biflex y Mundo Baby. DECOKASA muestra pisos PVC y SPC, paneles PVC, wall panel, alfombras y artículos para el hogar en una imagen propia con el logo integrado; las otras imágenes se conservan. Cuatro columnas en escritorio, dos en tabletas y una en celular. Se retiró la tarjeta mayorista superior; se conserva el bloque inferior #mayorista y su enlace de navegación. Siete artes independientes regenerados con image_gen y codificados en WebP sustituyen los recortes CSS del mockup; logo, banner y tarjetas admiten imágenes propias desde el editor. Los textos evitan prometer pagos o promociones todavía no configurados.

- El teléfono de atención WhatsApp compartido por el usuario es `+51 941 599 516`. La portada ofrece un acceso flotante con mensaje prellenado para consultas/cotizaciones. El enlace abre WhatsApp, pero no envía el mensaje hasta que el cliente lo revise y pulse enviar. La franja negra de servicios queda fija al desplazarse. Hay una vista local adaptada a teléfono en `preview/DECOKASA-movil.html`; es una ayuda de revisión, no un emulador del editor Shopify.

## Funcionalidades y uso

Inicio → catálogo por marca/categoría → landing con ficha → formulario de solicitud → atención del asesor → venta confirmada/cerrada en Odoo.

El tema contiene portada, catálogo, búsqueda, landing de producto, landing PVC, página informativa y 404. En Shopify las landings estándar usan `/products/<handle>`; PVC propone `/pages/pisos-pvc`. La carga de productos y asignación de páginas sigue pendiente. El catálogo debe apuntar a una sola landing por producto; `decokasa.landing_url` permite enlazar una página interna. Las vistas HTML en `preview/` representan el recorrido y usan datos ficticios.

## Trazabilidad y CRM propuestos

Objetivo: anuncio → solicitud → cliente → oportunidad → pedido → venta real. Recomendación pendiente de implementación: registro protegido de solicitudes vinculado a Odoo, y GA4 para análisis. GA4 no sustituye el registro operativo.

- `request_id` UUID por solicitud, persistido en el futuro receptor, para reintentos idempotentes.
- IDs disponibles de plataforma, cuenta, campaña, grupo/anuncio/creativo; UTMs y click IDs según disponibilidad y consentimiento. Conservar primer y último origen y una copia del origen al recibir cada solicitud.
- Visitante/sesión pseudónimos y referencias GA4 cuando corresponda. Nunca enviar nombres, teléfonos, correos ni direcciones a GA4.
- Reutilizar los IDs nativos de Odoo: contacto (`partner`), lead/oportunidad, cotización/pedido, asesor, equipo y etapa. Una persona puede tener varias solicitudes; las fusiones deben preservar vínculos y atribución.
- `generate_lead` después de recibir y guardar una solicitud real. `purchase` solo después de una venta real validada, con identificador de transacción y PEN. Marcar una oportunidad como Ganada, por sí solo, no implica compra ni cambio de stock.
- Validar precios y productos en servidor, evitar duplicados y conservar correspondencia SKU/variante/unidad/almacén. El contrato propuesto está en `request-contract.json`.

## Estado real de la base 0.1.0

El formulario solo simula una referencia, sin transmitir ni persistir contactos; no crea clientes, leads ni pedidos. La referencia se reutiliza para reintentos idénticos dentro de la misma página; persistencia duradera pendiente. La atribución de prueba usa `sessionStorage` solo con consentimiento. No hay conexiones Odoo, GA4 ni redes publicitarias. El catálogo, los precios y rendimientos de la demostración son ficticios. La portada usa artes regenerados a partir del mockup original; las ilustraciones de productos demo no son fotografías de catálogo verificadas.

## Pendientes

Catálogo y fotos reales; configuración PEN y rutas; autoridad de precios y promociones; URL/permisos Odoo; SKU, variantes, unidades, almacenes y operación de cierre; receptor seguro de solicitudes, CRM, consentimiento y medición; pruebas de duplicados, fallos y conciliación antes del lanzamiento comercial. Portada revisada visualmente en Shopify en escritorio y celular el 06/10/2026.

Los backends existentes de Meta/TikTok son de solo lectura. Consultas sobre sus bases publicitarias parten de la carpeta de Drive `18fQUpb1ZMC7jKO-nenhJFXmbQo1Oyr1W`; no iniciar sesión en redes para buscar esos datos ni modificar sus scripts.
