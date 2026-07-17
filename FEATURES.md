# Sistema de funciones MAQELEC

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
│   ├── Servicios
│   ├── Maquinaria y capacidades
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
