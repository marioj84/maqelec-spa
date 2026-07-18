# Sistema de funciones y catálogo MAQELEC

La web utiliza un registro central para activar, mantener en demostración o retirar módulos sin editar cada página por separado.

## Estados

| Estado    | Comportamiento                                                                                  |
| --------- | ----------------------------------------------------------------------------------------------- |
| `off`     | Oculta accesos, secciones y navegación. Una URL directa muestra un aviso de módulo desactivado. |
| `preview` | Mantiene visible la maqueta y agrega una advertencia clara de contenido en desarrollo.          |
| `live`    | Publica la función únicamente cuando todas sus dependencias están listas.                       |

Si una función se configura como `live` pero alguna dependencia tiene `ready: false`, el sistema la baja automáticamente a `preview`.

## Árbol de dependencias

```text
Núcleo MAQELEC
├── Identidad y navegación
│   ├── Inicio
│   ├── Header y menú
│   └── Footer
├── Contenido comercial
│   ├── Maquinaria ──> fichas, fotos y modelos validados
│   ├── Repuestos ──> códigos, compatibilidad y disponibilidad
│   ├── Servicios
│   ├── Trabajos y proyectos ──> fotos y casos reales
│   └── Videos ──> videos reales optimizados
├── Funciones para clientes
│   ├── Manuales ──> documentos vigentes
│   ├── Seguimiento ──> fuente real de estados
│   └── Centro Técnico
│       ├── autenticación segura
│       └── contenido por cliente o equipo
└── Contacto
    └── WhatsApp comercial
```

## Archivos

- `site-config.js`: estados, dependencias, selectores y mensajes de cada función.
- `feature-manager.js`: aplica las reglas a navegación, secciones y páginas.
- `feature-manager.css`: indicadores de vista previa y módulos desactivados.
- `validate-features.js`: comprueba estados, dependencias y páginas configuradas.
- `site-shell.js`: genera el encabezado, navegación, footer y acceso a WhatsApp compartidos.
- `site-shell.css`: centraliza tipografías, colores, estructura responsive y estilo de páginas internas.
- `catalog-data.js`: fuente de datos estática para maquinaria, repuestos, servicios y proyectos.
- `catalog.js`: renderiza fichas, filtros, buscador y solicitudes por WhatsApp.
- `catalog.css`: sistema visual de Inicio y páginas comerciales.

## Modelo de datos y futura migración a WordPress

La versión de GitHub Pages no necesita base de datos. Lee registros estructurados desde `catalog-data.js`, lo que permite validar navegación y experiencia sin servidor. El archivo nunca debe contener información privada.

| GitHub                           | WordPress                        | Uso                                         |
| -------------------------------- | -------------------------------- | ------------------------------------------- |
| `machinery`                      | Tipo de contenido `maquinaria`   | Equipos para venta o importación            |
| `parts`                          | Tipo de contenido `repuesto`     | Repuestos con código y compatibilidad       |
| `services`                       | Tipo de contenido `servicio`     | Trabajos que MAQELEC ejecuta                |
| `projects`                       | Tipo de contenido `proyecto`     | Casos y evidencia de trabajos reales        |
| `category`, `modality`, `status` | Taxonomías/campos personalizados | Filtros, disponibilidad y control editorial |

Cada registro utiliza un `id` estable, un `slug` cuando corresponde y campos de presentación. Durante la migración, estos datos se importarán a WordPress; la interfaz podrá reconstruirse sin cambiar la estructura comercial aprobada.

## Regla editorial

- `live`: información confirmada que puede presentarse como oferta vigente.
- `preview`: estructura o familia comercial pendiente de fotos, modelo o ficha definitiva.
- Nunca publicar precios, stock, compatibilidades o códigos sin validación.
- Las imágenes reales se identifican como `mediaType: "real"`; las imágenes de maqueta que aún permanezcan se marcan visiblemente como referenciales.
- La maquinaria puede combinar fichas `live` de equipos reales con familias `preview` pendientes de validación técnica; MAQELEC puede vender o importar los equipos, utilizarlos para prestar servicios y ofrecer instalación, puesta en marcha y soporte.
- La sección de proyectos está activa con casos reales de punzonado y corte hidráulico, torneado y cilindrado, esmerilado, mecanizado, fabricación soldada y piezas metálicas.

## Estructura visual compartida

Las páginas conservan únicamente su contenido principal. Al cargar, `site-shell.js` reemplaza los encabezados y footers antiguos por una única estructura común. Para cambiar el menú, buscador, datos de contacto o footer se debe editar ese archivo una sola vez; no se deben volver a copiar esos componentes dentro de cada página.

## Activar una función

1. Incorporar y validar el contenido o integración real.
2. Cambiar a `ready: true` todas sus dependencias en `site-config.js`.
3. Cambiar el estado de la función a `live`.
4. Probar navegación, acceso directo y vista móvil antes de publicar.

Ejemplo:

```js
"content.manualFiles": {
  ready: true,
  label: "Manuales descargables vigentes",
},

manuals: {
  state: "live",
  // ...
},
```

## Consulta técnica

En la consola del navegador se puede revisar el estado completo:

```js
MAQELEC_FEATURES.getReport();
```

También se puede probar temporalmente un estado sin modificar archivos:

```js
MAQELEC_FEATURES.setState("manuals", "off");
```

Este cambio de consola dura solamente hasta recargar la página. La fuente oficial siempre es `site-config.js`.

Antes de publicar cambios en la configuración, ejecutar:

```bash
node validate-features.js
```

## Límite de seguridad

El sistema controla visibilidad y publicación, pero no sustituye autenticación. Contenido privado, datos de clientes o estados reales nunca deben incluirse en el HTML público ni protegerse únicamente con JavaScript.
