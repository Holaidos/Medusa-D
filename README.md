# 🪼 MEDUSA — Enciclopedia de Medusas

Sitio web informativo y educativo sobre medusas (jellyfish). Construido con HTML, CSS y JavaScript vanilla — sin frameworks, sin build step.

## Páginas

| Página | Descripción |
|---|---|
| `index.html` | Portada con hero animado, estadísticas y navegación a las secciones |
| `species.html` | Catálogo de 15 especies con filtro de letalidad (slider) y filtro de hábitat |
| `biology.html` | Anatomía, cnidocitos, ciclo de vida, Turritopsis dohrnii (la inmortal) |
| `culture.html` | Gastronomía, medicina, espacio, arte/moda, gaming, industria |
| `quiz.html` | Quiz interactivo con 3 niveles (Principiante/Intermedio/Experto), 25 preguntas |

## Características

- **Tema oscuro/claro** — Toggle con persistencia en localStorage
- **Slider de letalidad funcional** — Filtra species cards en tiempo real (LVL 0 a 5)
- **Quiz con feedback visual** — Marca verde/rojo + explicación
- **Anchor nav** — En biology y culture, navegación a secciones específicas
- **Totalmente responsive** — Mobile, tablet y desktop
- **Sin dependencias externas** (excepto Tailwind via CDN)

## Datos de las medusas

- 500+ millones de años de evolución
- 95% agua
- 0 cerebros, 0 corazones, 0 sangre
- 1 especie inmortal (Turritopsis dohrnii)
- Cnidocitos disparan en 700 nanosegundos a 5.4 millones de g
- Algunos pueden tener tentáculos de hasta 36 metros

## Cómo ejecutar localmente

Los archivos son estáticos. Opciones:

```bash
# Python
cd /path/to/MEDUSA
python3 -m http.server 8080

# Ruby
ruby server.rb 8080

# O simplemente abre index.html en el navegador
```

Luego visita `http://localhost:8080/`

## Despliegue

El sitio es 100% estático. Súbelo a cualquiera de estos servicios:

- **Netlify**: drag-and-drop de la carpeta
- **Vercel**: `vercel deploy`
- **GitHub Pages**: activa Pages en Settings del repo
- **Cloudflare Pages**: conecta el repo

## Stack técnico

- HTML5 semántico
- CSS3 con custom properties (variables CSS)
- JavaScript vanilla (ES5+, compatible con todos los navegadores)
- Tailwind CSS via CDN (única dependencia externa)
- Sin build step, sin npm, sin webpack

## Licencia

MIT
