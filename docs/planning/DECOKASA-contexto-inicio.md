# DECOKASA — contexto para iniciar la construcción

Actualizado: **06/10/2026**. Proyecto Hidra: `web_decokasa_2026` — DECOKASA, tienda Shopify 2026.

## Objetivo de la siguiente conversación

Retomar este proyecto y comenzar por la fase 1 del plan: confirmar alcance, tienda, accesos, reglas comerciales y catálogo piloto. Preparar entregables revisables y avanzar con la información disponible, agrupando las preguntas indispensables. No repetir toda la investigación.

Este archivo transmite contexto; no registra una aprobación de implementación. La instrucción original fue investigar y planificar antes de escribir en los repositorios. Si el usuario autoriza la construcción en la siguiente conversación, registrar ese nuevo alcance y proceder sin pedir de nuevo la misma autorización. Publicación, contratación y gasto requieren el alcance correspondiente.

## Hechos confirmados

- Tienda desde cero para DECOKASA, alojada en **Shopify**.
- Inventario y stock gestionados desde **Odoo.sh**. No hay conector Shopify instalado. Versión exacta de Odoo pendiente.
- **GitHub** para desarrollar la interfaz; edición sencilla de catálogo, textos e imágenes desde Shopify.
- Integración con **Meta, TikTok y Google** para medición y publicidad.
- Home central multimarcas siguiendo el mockup inicial; cada producto tendrá su propia página y algunas familias tendrán funciones especiales.
- **Piso PVC:** calculador de metros cuadrados y cotización directa desde la web.
- Mockup inicialmente aprobado, sujeto a evolución: amarillo, negro y blanco; búsqueda, categorías, hero, beneficios y marcas Xion, Mundo Baby, Biflex y división mayorista.

## Estado comprobado

- Investigación y propuesta HTML terminadas el 05/10/2026; fuentes oficiales en `INVESTIGACION.md` y en los HTML.
- Plan HTML entregado: **10 etapas**, **8 intervenciones del usuario** y criterios de aceptación.
- Escenario orientativo: **8 semanas de construcción + 2 de estabilización**, condicionado al piloto Odoo, alcance, capacidad técnica y disponibilidad de materiales. No es una fecha comprometida.
- Clon local limpio y sin archivos de proyecto rastreados, revisado el 06/10/2026. No se ha desarrollado el tema ni probado una integración real. No consta tienda conectada, conector contratado, publicación, commits o pushes realizados en esta tarea.
- Mockup preservado fuera del repositorio. Propuesta y plan portátiles guardados también en Descargas.
- Los HTML tienen imagen integrada; integridad y lógica del plan comprobadas. La revisión visual automatizada quedó pendiente porque el navegador bloqueó archivos locales. No intentar eludir esa política.

## Arquitectura propuesta, pendiente de validar

1. Tema nativo **Online Store 2.0**, secciones editables, plantillas compartidas por familia y metacampos. Una URL por producto no implica desarrollar una plantilla distinta para cada SKU.
2. Odoo como autoridad del stock vendible, SKU, unidad y almacenes; Shopify como autoridad editorial. Definir autoridad por campo y preservar fotos/textos al sincronizar. **Precios, promociones, impuestos y reservas aún requieren decisión.**
3. Probar **5–10 SKU** antes de elegir conector compatible o módulo propio en Odoo.sh. Preparar muestra editorial de **10–20 SKU** antes de escalar la carga.
4. Pedidos web y referencias de pago hacia Odoo; disponibilidad y estados acordados hacia Shopify. Validar duplicados, eventos desordenados, reintentos, cancelaciones, devoluciones y conciliación. No asumir sincronización instantánea ni dejar que eventos antiguos repongan stock vendido.
5. PVC: `cajas = ceil(área_m² × (1 + merma) / cobertura_m²_por_caja)`. Cobertura y merma deben confirmarse por producto. Validar precio y disponibilidad en servidor al generar cotización Odoo; definir vigencia, instalación, transporte y reserva. Si luego se cobra por Shopify, vincular el expediente para evitar doble pedido/reserva.
6. GitHub y editor Shopify pueden modificar archivos del tema: coordinar cambios y verificar sincronización. La calculadora se plantea antes del carrito. Restricciones de checkout, pagos y canales dependen del plan, país y cuenta: verificar documentación vigente al implementarlos.
7. Medir compra y solicitud de cotización como eventos distintos; gestionar consentimiento y evitar compras duplicadas entre navegador y servidor.

## Secuencia y participación del usuario

| Etapa | Entregable / trabajo | Participación necesaria |
|---|---|---|
| 1. Arranque | Alcance, accesos y muestra | URL/plan Shopify, versión Odoo, responsables, país/moneda/dominio y autorización de alcance |
| 2. Diseño y reglas | Vistas móvil/escritorio y contrato de datos | Aprobar dirección visual, precio, stock vendible, reservas, envío y políticas |
| 3. Piloto | Evidencia de integración y comparación técnica/coste | Elegir alternativa después de ver resultados |
| 4. Tema | Home, navegación, colecciones, carrito y GitHub | Revisar vista previa y aportar/delegar materiales finales |
| 5. Catálogo | Metacampos, fichas y lote inicial | Validar datos y comprobar edición autónoma |
| 6. Integración | Stock, pedidos, fallos y conciliación | Inventario/ventas validan casos y respuesta ante caída |
| 7. PVC | Calculador y cotización trazable | Confirmar cobertura, merma, condiciones y tres ejemplos |
| 8. Operación/medición | Pagos, envíos, dominio y canales | Titular/admin completa verificaciones; aprobar costes y políticas |
| 9. Aceptación | Pruebas integrales y formación | Compra, cotización, cancelación/devolución y validación en Odoo |
| 10. Salida | Publicación y estabilización | Autorizar ventana y gastos; equipo atiende primeros pedidos |

Los frentes tienda e integración pueden avanzar en paralelo. La ruta crítica es accesos/reglas → piloto viable → integración → pruebas de stock/pedidos → aceptación → publicación. Mayorista avanzado, otras calculadoras, contenido masivo y campañas pagadas requieren definición adicional. No habilitar venta productiva con inventario sin validar.

## Información que falta para empezar

- URL `myshopify.com`, plan o presupuesto, país/moneda y dominio.
- Versión Odoo, administrador y entorno de desarrollo/staging disponible.
- Muestra de 10–20 SKU: variantes, unidad de venta, precio, stock, fotos y fichas; incluir PVC con cobertura por caja.
- Almacenes vendibles, otros canales de venta, política de reserva/cancelación/devolución y responsable de precios/promociones.
- Pagos, zonas/tarifas de envío, instalación, alcance mayorista y responsables de catálogo/ventas/inventario.

Solicitar invitaciones/permisos por los mecanismos de cada plataforma. No pedir contraseñas en el chat ni guardar secretos en documentos, tema, navegador o repositorio. Mientras se resuelven accesos, avanzar con estructura de catálogo, reglas y propuesta visual dentro del alcance autorizado.

## Fuentes y rutas para retomar

**Repositorio:** https://github.com/marketingvivibox-pixel/WEB-DECOKASA-2026-ALFIN

**Clon local:** `C:\Users\D. Cordova\Documents\Codex\projects\WEB-DECOKASA-2026-ALFIN`

**Memoria canónica:** `C:\Users\D. Cordova\Desktop\VIVIBOX - CENTRO DE CONTEXTO IA\vivibox\web-decokasa-2026`

Leer primero `AGENTS.md`, `BRIEF.md`, `AVANCE.md` y `BITACORA.md` de esa carpeta. Consultar `INVESTIGACION.md` solo para dudas concretas. Hidra registra el proyecto en `C:\Users\D. Cordova\Desktop\VIVIBOX - CENTRO DE CONTEXTO IA\vivibox\catalog.json`. Skills pertinentes: **hidra** y, para diseño/interfaz, **ui-ux-pro-max**.

**Entregables portátiles:**

- Propuesta: `C:\Users\D. Cordova\Downloads\DECOKASA-propuesta-Shopify-Odoo.html`
- Plan completo: `C:\Users\D. Cordova\Downloads\DECOKASA-plan-de-trabajo.html`
- Este contexto: `C:\Users\D. Cordova\Downloads\DECOKASA-contexto-inicio.md`

**Carpeta de entregables originales:** `C:\Users\D. Cordova\Documents\Codex\2026-10-05\https-github-com-marketingvivibox-pixel-web\outputs`

**Mockup:** `C:\Users\D. Cordova\Documents\Codex\2026-10-05\https-github-com-marketingvivibox-pixel-web\outputs\referencias\mockup-inicial-decokasa-2026-10-02.jpeg`

Estas rutas son locales a este equipo. Si la siguiente conversación no tiene acceso al disco, adjuntar este Markdown y, para trabajar el diseño, el mockup y el plan; no afirmar haber leído archivos inaccesibles.

## Reglas de continuidad

- Distinguir hechos confirmados, propuestas y decisiones pendientes. Verificar estado real antes de actuar.
- Para consultas de bases publicitarias Meta/TikTok, revisar primero https://drive.google.com/drive/folders/18fQUpb1ZMC7jKO-nenhJFXmbQo1Oyr1W. No iniciar sesión en esas redes para buscar métricas. **Backends publicitarios existentes: solo lectura.**
- Mantener consultas parciales y contexto compacto; no cargar bases ni historiales completos.
- Al cerrar cada fase, actualizar `BITACORA.md` y `AVANCE.md`; ajustar `BRIEF.md` si cambia una decisión/ruta/restricción. Registrar avances confirmados, validación y siguiente paso.
- No usar el checklist del HTML como autorización: sus marcas son seguimiento local del navegador.

## Mensaje sugerido para abrir la siguiente conversación

> Retomemos DECOKASA usando este archivo. Lee la memoria canónica y verifica el estado del repositorio. Quiero empezar la fase 1 del plan: prepara una lista breve de datos pendientes y los primeros entregables revisables de diseño y reglas de integración. Pregunta únicamente lo que impida avanzar y deja claro qué alcance hace falta autorizar antes de escribir código o conectar servicios.
