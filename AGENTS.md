# Memoria del proyecto: La Villa de Sevirol

Este archivo es el contrato persistente de trabajo para este proyecto. Debe consultarse y respetarse durante toda la sesión y en futuras intervenciones sobre esta base de código.

## Objetivo

Construir y mantener una landing de una sola página para Restaurante La Villa de Sevirol, en Sevilla. La prioridad de conversión es:

1. Consultar la carta.
2. Llamar para reservar o consultar.
3. Llegar al restaurante.

## Dirección creativa

- Identidad oscura, elegante, cálida y gastronómica.
- Paleta bloqueada: carbón, marfil cálido y un único acento ámbar apagado.
- Tema único oscuro. No invertir secciones a tema claro.
- Composición editorial asimétrica, con aire, contraste tipográfico y marcos finos.
- Sistema de formas con esquinas rectas.
- Serif display justificada por el brief editorial gastronómico. Sans limpia para interfaz y lectura.
- Evitar flamenco literal, azulejos decorativos, barroco, neón, glassmorphism, gradientes genéricos y estética de plantilla.
- Diales de diseño: DESIGN_VARIANCE 8, MOTION_INTENSITY 5, VISUAL_DENSITY 3.

## Arquitectura técnica

- Mantener la solución estática en `index.html`, `styles.css` y `main.js` salvo petición expresa.
- HTML semántico, CSS nativo mantenible y JavaScript vanilla.
- La configuración pública y todas las rutas de imagen viven en `restaurantData`, al principio de `main.js`.
- No incorporar dependencias sin verificar primero si son necesarias y están disponibles.
- No usar listeners continuos de scroll. Usar IntersectionObserver.
- Respetar `prefers-reduced-motion` y `prefers-reduced-transparency`.
- El menú móvil debe conservar `aria-expanded`, bloqueo de scroll, cierre con Escape, cierre al navegar y control de foco.
- La galería debe conservar lightbox con Escape, flechas, botones anterior y siguiente, restauración de foco y estado vacío para imágenes pendientes.

## Contenido y honestidad

- Todo el copy visible debe estar en español.
- No inventar precios, platos, premios, historia, reseñas, servicios ni procedencia de producto.
- No publicar testimonios, ratings o cifras sin fuente verificable y decisión explícita de incorporarlos.
- Mantener la carta como enlace externo, no recrearla en HTML.
- Usar redacción prudente y editable cuando falte material definitivo.
- No usar guion largo ni guion medio en textos visibles. Reescribir con puntos, comas o guion normal.
- Mantener una única etiqueta por intención de CTA: `Ver carta`, `Llamar`, `Cómo llegar`, `Instagram`.

## Datos públicos de trabajo

Datos contrastados el 04/09/2026 con la web oficial `https://www.lavilladesevirol.com/`:

- Nombre: La Villa de Sevirol.
- Dirección de proyecto: Calle Enramadilla 1, Local 9, 41018 Sevilla, España.
- Teléfono de reservas publicado en la web oficial: 635 95 75 53.
- Horario web oficial: lunes a jueves 8:00-00:00, viernes 8:00-01:00, sábado 9:00-01:00 y domingo 9:00-00:00.
- Instagram: `https://www.instagram.com/restaurantelavilladesevirol/`.
- Carta enlazada desde la web oficial: `https://www.numier.com/carta-digital/carta/abaceriaelaprisco`.
- Maps: `https://www.google.com/maps/search/?api=1&query=Calle+Enramadilla+1+Local+9+Sevilla`.
- Servicio indicado en el perfil aportado: cocina ininterrumpida.

Existe un conflicto con los datos iniciales aportados desde Instagram, que indicaban `954 045 245` y `8:30-23:30`. No volver a cambiar silenciosamente al dato anterior. Confirmar con el negocio antes de publicar si desea usar otro teléfono u horario.

## Primera fase de imágenes

- No descargar, generar ni incorporar imágenes reales.
- No crear ahora una carpeta de imágenes descargadas.
- Mantener placeholders de calidad con estados de carga y ausencia.
- Cada slot debe seguir siendo un `<img>` accesible y ocultar el recurso fallido sin mostrar iconos rotos.
- Mantener las proporciones, recortes y orden al sustituir assets, salvo necesidad editorial de una imagen concreta.

Rutas centralizadas actuales:

- `/img/hero-la-villa-sevirol.jpg`
- `/img/interior-salon-01.jpg`
- `/img/desayuno-01.jpg`
- `/img/almuerzo-01.jpg`
- `/img/cena-01.jpg`
- `/img/plato-01.jpg`
- `/img/plato-02.jpg`
- `/img/plato-03.jpg`
- `/img/instagram-01.jpg`
- `/img/instagram-02.jpg`
- `/img/instagram-03.jpg`

## Calidad y comprobación

- Revisar 320 px, móvil, tablet y escritorio.
- Verificar hero y CTAs dentro del viewport inicial.
- Verificar ausencia de desbordamiento horizontal.
- Verificar navegación por teclado, contraste, tamaños táctiles y foco visible.
- Verificar que no hay errores de JavaScript ni recursos remotos de imagen.
- Ejecutar una revisión visual en navegador y corregir el ritmo vertical antes de cerrar.
- Mantener SEO básico, canonical, Open Graph y schema Restaurant sin datos inventados.

## Referencias internas

Conservar patrones técnicos útiles de `zumaya-restaurante`, `losquintos-cordoba`, `botavara-cordoba`, `cafeteria-laclasica` y `vibrasloungebar`, pero no copiar su identidad, paleta, copy o assets.
