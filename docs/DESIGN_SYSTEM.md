# 🎨 Sistema de Diseño Visual — Restaurante Bella Ciao

## 1. Identidad Visual y Filosofía de Diseño
El sistema de diseño de **Bella Ciao** evoca la calidez, elegancia y tradición de la gastronomía italiana artesanal, combinando tonos terracota, carmesí italiano, verde albahaca y crema toscano sobre una experiencia digital moderna, limpia y accesible.

---

## 2. Paleta de Colores (Design Tokens)

| Token Semántico | Valor HEX | Uso en la Interfaz | Muestra Visual |
|---|---|---|---|
| `bella.primary` | `#991b1b` (Crimson 800) | Identidad de marca, encabezados principales, botones de acción crítica. | 🟥 Carmesí Italiano |
| `bella.secondary` | `#ea580c` (Orange 600) | Botones de llamada a la acción ("Agregar", "Confirmar Pedido"), badges activos. | 🟧 Terracota Cálido |
| `bella.dark` | `#1c1917` (Stone 900) | Barra superior de roles, títulos oscuros, footer, contrastes de alta legibilidad. | ⬛ Carbón Volcánico |
| `bella.cream` | `#faf8f5` (Warm Cream) | Fondo general de la aplicación, descansando la vista frente a fondos blancos puros. | 🟨 Crema Toscana |
| `bella.green` | `#15803d` (Emerald 700) | Estados "Disponible" en mesas, confirmaciones de éxito y etiquetas orgánicas. | 🟩 Verde Albahaca |
| `bella.gold` | `#d97706` (Amber 600) | Estrellas de reseñas, recomendaciones del chef, acentos gourmet. | 🟨 Dorado / Trufa |
| `bella.border` | `#e7e5e4` (Stone 200) | Líneas divisorias, bordes sutiles de tarjetas y contenedores. | ⬜ Gris Rústico |

---

## 3. Tipografía

| Rol Tipográfico | Fuente | Pesos Utilizados | Aplicación |
|---|---|---|---|
| **Display / Títulos** | *Playfair Display* (Google Fonts) | `600 (SemiBold)`, `700 (Bold)` | Títulos de secciones, nombre del restaurante, nombres de platos principales, modal headers. |
| **Cuerpo y UI** | *Inter* (Google Fonts) | `400 (Regular)`, `500 (Medium)`, `600 (SemiBold)` | Párrafos, descripciones de ingredientes, botones, etiquetas de formularios, navegación. |
| **Monospace / Precios** | *JetBrains Mono / monospace* | `600`, `700`, `900` | Precios en COP, temporizadores de cocina, códigos UUID de comanda, placas de vehículos. |

---

## 4. Jerarquía de Espaciados y Radios de Borde

* **Radios de Borde (Border Radius):**
  * `rounded-full`: Chips de filtros de categorías, botones circulares, avatars de usuarios.
  * `rounded-3xl` (`24px`): Tarjetas contenedoras principales, modales, drawers y hero cards.
  * `rounded-2xl` (`16px`): Tarjetas de platos, tarjetas de mesas, items del carrito.
  * `rounded-xl` (`12px`): Botones de acción, inputs de texto y selectores.
* **Elevaciones y Sombras:**
  * `shadow-xs`: Elevación sutil en reposo.
  * `shadow-md`: Estado enfocado o tarjeta de mesa activa.
  * `shadow-xl` / `shadow-2xl`: Modales flotantes y drawer deslizante del carrito.

---

## 5. Componentes Base y Estados Interactivos

* **Botones Principales (Primary Buttons):**
  * Fondo `bg-amber-600` con hover `bg-amber-700`, escala activa `active:scale-95`, sombra cálida y texto blanco en negrita.
* **Micro-interacciones y Animaciones:**
  * Zoom suave (`group-hover:scale-108`) en fotografías de platos de alta definición.
  * Transición de entrada (`animate-in fade-in slide-in-from-bottom`) en notificaciones Toast y modales.
  * Partículas de celebración con `canvas-confetti` al completar comandas y liquidar cuentas.
* **Diseño Responsivo:**
  * Breakpoints: Móvil (`< 640px`), Tablet (`640px – 1024px`), Desktop (`> 1024px`).
  * En móvil: Menú hamburguesa desplegable, carrito flotante inferior y grilla de platos a 1 columna.
  * En desktop: Barra de navegación completa con acceso a todos los roles y grilla de platos a 4 columnas.

