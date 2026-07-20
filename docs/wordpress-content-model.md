# Modelo de contenido para migración a WordPress

La versión GitHub mantiene el contenido en `catalog-data.js`. En WordPress debe migrarse sin cambiar la estructura comercial ni depender del constructor visual.

## Tipos de contenido

### Inicio y bloques globales

- Cada sección debe tener título, texto, llamada a la acción, orden y estado visible/oculto.
- El bloque principal debe permitir elegir imagen o video MP4 desde la biblioteca de WordPress.
- Para video: archivo, imagen de portada, reproducción automática, silencio, loop y alternativa estática para móvil.
- Para imagen: texto alternativo, posición focal y recorte independiente para escritorio y móvil.
- Las tres promociones principales, respuestas frecuentes, cobertura y guías deben administrarse como bloques repetibles, sin editar código.
- Teléfono, correo, WhatsApp, Instagram, ciudad base, área de cobertura y horarios deben vivir en una configuración global.

### Maquinaria

- Nombre, slug, categoría y modalidad de entrega.
- Resumen comercial, descripción y aplicaciones.
- Imagen principal, galería y textos alternativos.
- Datos clave y tabla de especificaciones.
- Servicios incluidos, manual, proyecto relacionado y fuente técnica.
- Campo `nota_configuracion` obligatorio para indicar que la capacidad final se confirma en cotización.

### Servicios

- Nombre, categoría, resumen e imagen documentada.
- Posición de recorte de imagen.
- Procesos relacionados y llamada a cotización.

### Proyectos

- Título, tipo, imagen principal y galería.
- Necesidad, equipos utilizados, proceso y resultado.
- Relación con maquinaria y servicios.

### Manuales

- Equipo relacionado, versión, idioma, archivo y estado: preliminar o definitivo.

### Guías técnicas

- Título, resumen, autor o revisor, fecha de revisión y cuerpo por secciones.
- Preguntas relacionadas, máquinas, servicios y proyectos enlazados.
- Imagen social, título SEO y descripción SEO editables con valores automáticos seguros por defecto.

## Control editorial de imágenes y video

1. Una imagen o video se selecciona desde la biblioteca de medios, no cambiando una ruta en el tema.
2. El administrador muestra una miniatura previa, texto alternativo y ubicación donde se utiliza.
3. Cada bloque admite reemplazar el medio sin perder el texto, enlace o diseño.
4. Los videos de fondo deben usar `muted`, `playsinline`, `loop` y una portada; los videos informativos deben conservar controles.
5. WordPress genera tamaños responsivos y WebP/AVIF cuando el servidor lo permita. El archivo original no se borra.
6. Ningún cambio de medio se publica sin una vista previa en escritorio y móvil.

## SEO y descubrimiento

- Una URL permanente y canónica por máquina, servicio, proyecto y guía.
- Títulos y descripciones únicos; un solo `h1` por página y jerarquía de subtítulos coherente.
- Datos estructurados de `Organization`, `Product`, `Service`, `Article`, `BreadcrumbList` y, cuando corresponda, video con fechas verificadas.
- Sitemap XML generado por WordPress o un único complemento SEO; nunca dos sitemaps competidores.
- `robots.txt` debe permitir Googlebot, Bingbot y OAI-SearchBot y declarar la dirección del sitemap.
- Páginas de resultados, demostraciones, pruebas y áreas privadas deben permanecer en `noindex`.
- Mantener visibles autoría o revisión, fecha de actualización, experiencia real, fotografías propias y fuentes técnicas.
- La indexación se verifica después del lanzamiento en Google Search Console y Bing Webmaster Tools. Bing Places y Google Business Profile se configuran con datos comerciales consistentes.

## Cotización segura por correo

La versión final de WordPress no debe depender de JavaScript del navegador para enviar una cotización ni exponer claves de correo.

1. Enviar el formulario a un endpoint de WordPress por `POST` y HTTPS.
2. Validar un `nonce`, un campo trampa invisible y un tiempo mínimo de llenado.
3. Aplicar límite de solicitudes por IP o sesión y activar CAPTCHA sólo ante comportamiento sospechoso.
4. Validar y sanear cada campo en el servidor; no confiar en valores ocultos del formulario.
5. Restringir adjuntos por extensión, MIME y tamaño; renombrarlos y almacenarlos fuera de rutas ejecutables.
6. Entregar cotizaciones al correo comercial mediante SMTP autenticado. Configurar SPF, DKIM y DMARC del dominio.
7. Mostrar al visitante un número de solicitud y registrar sólo la información operativa necesaria.
8. WhatsApp queda como canal de contacto humano. El formulario no envía mensajes automáticos a WhatsApp.
9. No incluir precios, capacidades ni promesas automáticas sin revisión comercial o técnica.

El enlace actual de WhatsApp sólo prepara un texto en el dispositivo del visitante: no puede enviar el mensaje por sí solo. El control antispam crítico corresponde al futuro formulario de WordPress y al buzón receptor.

## Taxonomías

- Proceso: corte, punzonado, mecanizado, soldadura, terminación, instalación.
- Industria o aplicación.
- Estado del contenido: publicado, en preparación, por confirmar.
- Tipo de medio: trabajo real, equipo real, imagen referencial.

## Migración

1. Crear los tipos de contenido y campos con ACF o bloques nativos.
2. Importar maquinaria, servicios y proyectos conservando los `id` actuales como clave externa.
3. Subir imágenes con nombre descriptivo y texto alternativo; generar WebP/AVIF y tamaños responsivos.
4. Configurar relaciones entre máquina, proyecto, servicio y manual.
5. Reproducir las fichas mediante plantillas, no pegando HTML individual.
6. Configurar el formulario seguro y probar entrega, errores, límites y adjuntos en un ambiente de pruebas.
7. Validar URLs, metadatos, datos estructurados, sitemap y redirecciones antes de cambiar el dominio.
8. Conservar el tema actual y una exportación de base de datos como respaldo previo a la activación.

## Reglas editoriales

- No publicar capacidades comerciales sin fuente o confirmación.
- Mantener separado “equipo que vendemos” de “trabajo que ejecutamos”, aunque una máquina pueda aparecer en ambos.
- Marcar claramente las imágenes referenciales.
- Todo equipo vendido debe indicar instalación, capacitación y soporte disponibles.
