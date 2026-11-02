# 🍕 Bella Ciao — Plataforma Frontend (Corte 2)
### Desarrollo y Operaciones de Software (DOSW) • Universidad
**Estudiante:** José Alejandro Martínez Arias  
**Código:** 1000104385  
**Semestre:** Sexto Semestre  

---

## 📹 Video Demostrativo de Funcionalidades

> [!IMPORTANT]
> ### 🎬 Enlace al Video de Demostración de la Plataforma
> **Enlace del Video:** `[AGREGA AQUÍ EL LINK DE TU VIDEO DE YOUTUBE / LOOM / DRIVE]`  
> *(Graba entre 2 y 3 minutos navegando por las pantallas: Inicio, Menú con filtros, Carrito y Confirmación de Comanda, Seguimiento en vivo, Salón de Mesas y Cobro de Cuenta, y Control de Parqueadero).*

---

## 📚 Documentación Técnica y Arquitectura

Para consultar la documentación técnica profunda del proyecto, puedes acceder directamente a los siguientes documentos ubicados en la carpeta [`/docs`](./docs/):

* 📐 [**Arquitectura Frontend (ARCHITECTURE.md)**](./docs/ARCHITECTURE.md): Diseño modular por capas (L1..L4), flujo de datos unidireccional, separación de responsabilidades y estrategias de rendimiento.
* 🔗 [**Matriz de Trazabilidad con el Backend (BACKEND_FRONTEND_TRACEABILITY.md)**](./docs/BACKEND_FRONTEND_TRACEABILITY.md): Correspondencia exhaustiva 1:1 de entidades, DTOs, validaciones de negocio y matriz de control de acceso RBAC.
* 🎨 [**Sistema de Diseño (DESIGN_SYSTEM.md)**](./docs/DESIGN_SYSTEM.md): Guía de estilos toscanos, tokens cromáticos, tipografía formal y especificación de componentes de interfaz.

---

## 📖 Descripción General del Proyecto

Aplicación web frontend moderna para la digitalización integral del restaurante de cocina italiana **Bella Ciao**. La plataforma permite a los comensales explorar la carta de pastas frescas y pizzas a la piedra, personalizar sus pedidos, solicitar comensales a la mesa, realizar reservas y calificar su experiencia gastronómica.

El frontend fue desarrollado de forma **completamente desacoplada e independiente (Standalone)**, simulando con absoluta precisión los contratos, modelos DTO y reglas de negocio del Backend en Spring Boot 3.4 mediante un motor de servicios asíncrono con persistencia en `localStorage`.

---

## 🛠️ Stack Tecnológico

* **Framework:** React 18 (Arquitectura basada en componentes funcionales y Hooks).
* **Herramienta de Compilación:** Vite 6 (Fast Refresh, Bundling ESM ultra optimizado).
* **Estilos & UI:** Tailwind CSS 3.4 (Paleta toscana, diseño responsivo y tokens de diseño personalizados).
* **Iconografía:** Lucide React (Icons modernos SVG).
* **Enrutamiento:** React Router DOM v6.
* **Efectos Visuales:** Canvas Confetti (Celebración visual en checkout y cobro de cuentas).
* **Testing:** Vitest + React Testing Library + JSDOM.
* **Preparado para Despliegue:** Vercel / Netlify (`vercel.json` incluido).

---

## 🚀 Requisitos y Ejecución Local

### Prerrequisitos
* **Node.js:** Versión 18+ (Probado exitosamente en Node `v24.19.0`).
* **npm:** Versión 9+ (Probado en npm `11.17.0`).

### 1. Clonar el Repositorio
```bash
git clone https://github.com/JoseMartinez883/Frontend_Corte2_JoseMartinez.git
cd Frontend_Corte2_JoseMartinez
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Iniciar el Servidor de Desarrollo
```bash
npm run dev
```
La aplicación abrirá localmente en: **`http://localhost:3000`** (o en el puerto asignado por Vite).

### 4. Ejecutar Pruebas Automatizadas
```bash
npm test
```

### 5. Compilar para Producción
```bash
npm run build
```
Genera la carpeta optimizada `/dist` lista para ser desplegada en Vercel, Netlify o cualquier servidor web estático.

---

## 📂 Estructura del Proyecto (Nivel 2 Modular)

```text
Frontend_Corte2_JoseMartinez/
├── docs/                   # Documentación técnica detallada
│   ├── ARCHITECTURE.md     # Documento detallado de la arquitectura frontend
│   ├── BACKEND_FRONTEND_TRACEABILITY.md # Matriz de correspondencia con el Backend
│   └── DESIGN_SYSTEM.md    # Tokens de diseño, tipografía y paleta de colores
├── public/                 # Iconos y assets estáticos
├── src/
│   ├── components/         # Componentes visuales desacoplados
│   │   ├── admin/          # Panel de métricas y disponibilidad de platos
│   │   ├── auth/           # Login, registro y selector de usuarios semilla
│   │   ├── billing/        # Facturación, liquidación y cálculo de vueltas
│   │   ├── cart/           # Drawer lateral de pedido y totales con propina
│   │   ├── common/         # Navbar, Footer y UserSwitchBar (simulador de roles)
│   │   ├── landing/        # Hero banner y llamada a la acción
│   │   ├── menu/           # Grilla de platos, filtros de categoría y detalle
│   │   ├── orders/         # Stepper de tracking y KDS de cocina
│   │   ├── parking/        # Registro de entrada y salida con tarifas
│   │   ├── reservations/   # Formulario con validación de bloque de 2 horas
│   │   ├── reviews/        # Muro de calificaciones y formulario de estrellas
│   │   └── tables/         # Salón interactivo con mesas y apertura de cuentas
│   ├── context/            # Proveedores de estado global (Auth, Cart, Toast)
│   ├── data/               # initialSeedData.js (Platos, mesas, usuarios semilla)
│   ├── pages/              # Vistas del enrutador (Home, Menu, Mesas, Cocina, Tracking, Admin)
│   ├── services/           # mockApiService.js (Motor asíncrono con localStorage)
│   ├── test/               # Pruebas unitarias de servicios y componentes UI
│   ├── App.jsx             # Enrutador principal y layout general
│   ├── index.css           # Configuración de Tailwind CSS
│   └── main.jsx            # Bootstrap de la aplicación React
├── package.json            # Configuración de scripts y dependencias
├── tailwind.config.js      # Configuración de colores y temas
├── vercel.json             # Reglas de reescritura para despliegue en Vercel
└── vite.config.js          # Configuración de Vite y Vitest
```

---

## 🎭 Simulador de Roles y Datos del Backend

Para facilitar la evaluación de la rúbrica y la grabación del video, la aplicación incluye una **barra superior de cambio rápido de roles (`UserSwitchBar`)** que permite probar la plataforma como:

1. **Cliente (`cliente@restaurante.com`):** Navega por el menú, agrega productos al carrito, confirma pedidos, solicita reservas y califica con reseñas.
2. **Mesero (`mesero@restaurante.com`):** Accede a la pestaña *Salón & Mesas*, abre cuentas en mesas libres y cobra precuentas liberando las mesas.
3. **Chef (`chef@restaurante.com`):** Accede a la pestaña *Comandas Cocina* (KDS) para avanzar el estado de los platos de `PENDIENTE` a `EN_PREPARACION` y `LISTO`.
4. **Administrador (`admin@restaurante.com`):** Accede a la pestaña *Métricas* con auditoría de ventas, ocupación y control de inventario de platos.

---

## 🔌 Preparación para la Futura Integración con el Backend

El frontend implementa el patrón **Service Layer (Inversión de Dependencias)**. Para conectarlo a la API de Spring Boot en el futuro:
1. No se requiere modificar ningún componente visual de `components/` o `pages/`.
2. Se reemplaza `mockApiService.js` por llamadas HTTP con Axios o Fetch apuntando a `http://localhost:8080/api/v1/...`.
3. Todos los nombres de atributos, campos de formularios y estados son 100% idénticos a los DTOs de Java del Backend.
