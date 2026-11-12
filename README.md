# EberNar · Portafolio

Sitio estático, sin build ni frameworks. Abre `index.html` desde cualquier servidor de archivos.

## Publicar en GitHub Pages

**Opción A, sitio personal** (queda en `https://ebernar.github.io`):

1. Crea un repositorio público llamado `ebernar.github.io` (usa tu usuario de GitHub).
2. Sube todo el contenido de esta carpeta a la rama `main`.
3. Espera uno o dos minutos y abre la dirección.

**Opción B, dentro de otro repositorio** (queda en `https://usuario.github.io/repositorio/`):

1. Sube la carpeta a la rama `main` del repositorio.
2. En GitHub: *Settings → Pages → Build and deployment → Deploy from a branch*, rama `main`, carpeta `/ (root)`.

Todas las rutas son relativas y la navegación va por hash (`#/proyecto/sms-files`), así que no hace falta configurar nada más. `404.html` regresa al inicio.

## Probar en tu computadora

```bash
python -m http.server 8000
```

Y abre `http://localhost:8000`.

## Agregar un proyecto

1. Abre `assets/proyectos.js`.
2. Copia un bloque de `PROYECTOS`, pégalo donde quieras que aparezca y cambia los textos. El `id` va en la dirección: `#/proyecto/<id>`.
3. `areas` solo acepta valores de la lista `AREAS` del mismo archivo. `cifras` es para resultados reales; si no hay, borra esa línea.
4. La demo es opcional. Sin `demo`, el proyecto se muestra sin ella. Para darle una, agrega una entrada con el mismo nombre en `DEMOS` (`assets/demos.js`). Para un flujo por pasos basta con `flujo([...], "mensaje final")`.
5. Recarga. Si algo quedó mal definido, la consola del navegador lo avisa.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | Estructura de la página |
| `assets/proyectos.js` | **Datos**: perfil, áreas, secciones y proyectos |
| `assets/demos.js` | Demos interactivas y gráficas en SVG |
| `assets/app.js` | Navegación, búsqueda, filtros y tema |
| `assets/styles.css`, `assets/sitio.css` | Diseño base y estilos del portafolio |
| `manter/index.html` | Propuesta de rediseño web. No está enlazada desde el portafolio; se abre con su dirección directa (`/manter/`) |
| `404.html`, `favicon.svg` | Página de error e ícono |
