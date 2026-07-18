# Modelo de contenido para migración a WordPress

La versión GitHub mantiene el contenido en `catalog-data.js`. En WordPress debe migrarse sin cambiar la estructura comercial ni depender del constructor visual.

## Tipos de contenido

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
6. Validar URLs, metadatos, datos estructurados y redirecciones antes de cambiar el dominio.

## Reglas editoriales

- No publicar capacidades comerciales sin fuente o confirmación.
- Mantener separado “equipo que vendemos” de “trabajo que ejecutamos”, aunque una máquina pueda aparecer en ambos.
- Marcar claramente las imágenes referenciales.
- Todo equipo vendido debe indicar instalación, capacitación y soporte disponibles.
