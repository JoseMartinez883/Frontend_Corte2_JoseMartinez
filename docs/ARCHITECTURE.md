# 🏛️ Documento de Arquitectura Frontend — Restaurante Bella Ciao

## 1. Patrón Arquitectónico Seleccionado
Se implementó una **Arquitectura Modular por Capas (Nivel 2)** en React, alineada de forma rigurosa con la diapositiva de arquitectura de la **Semana 11** de DOSW (`React JS: Router -> Components -> Services`).

```text
src/
├── assets/                # Iconos, imágenes y recursos estáticos
├── components/            # Componentes visuales desacoplados
│   ├── admin/             # Métricas y control de inventario
│   ├── auth/              # Modales de autenticación y switcher de roles
│   ├── billing/           # Facturación, precuenta y cálculo de cambio
│   ├── cart/              # Drawer lateral de compras y totales
│   ├── common/            # Navbar, Footer, UserSwitchBar
│   ├── landing/           # Hero, llamada a la acción y beneficios
│   ├── menu/              # Catálogo, tarjetas de platos y detalle de ingredientes
│   ├── orders/            # Stepper de tracking y pantalla KDS de cocina
│   ├── parking/           # Control vehicular y liquidación por minuto
│   ├── reservations/      # Formulario y listado con ventana de 2 horas
│   ├── reviews/           # Muro de opiniones y formulario de calificación
│   └── tables/            # Salón visual con mesas y apertura de cuentas
├── context/               # Estado global de la aplicación (Context API)
│   ├── AuthContext.jsx    # Manejo de sesión y roles RBAC (ADMIN, CHEF, MESERO, CLIENTE)
│   ├── CartContext.jsx    # Estado del pedido, items, subtotal y propina sugerida
│   └── ToastContext.jsx   # Notificaciones emergentes con autodescarte
├── data/
│   └── initialSeedData.js # Datos semilla realistas con la firma exacta del Backend
├── pages/                 # Vistas mapeadas por el enrutador
│   ├── AdminPage.jsx      # Panel de métricas ejecutivas
│   ├── HomePage.jsx       # Landing page y especiales de la casa
│   ├── KitchenPage.jsx    # Tablero de preparación de comandas para Chef
│   ├── MenuPage.jsx       # Carta gastronómica con buscador y filtros
│   ├── TablesPage.jsx     # Gestión de mesas y facturación para meseros
│   └── TrackingPage.jsx   # Seguimiento del estado del pedido en tiempo real
├── services/
│   └── mockApiService.js  # Capa de adaptadores y simulación asíncrona (localStorage)
├── test/                  # Pruebas unitarias con Vitest y Testing Library
├── App.jsx                # Orquestador y definición de rutas (react-router-dom)
├── index.css              # Directivas Tailwind CSS
└── main.jsx               # Punto de entrada React 18
```

---

## 2. Principios de Diseño de Software Aplicados

* **Separation of Concerns (SoC):** La interfaz visual (`components/` y `pages/`) desconoce por completo la implementación del almacenamiento. Todo acceso a datos se delega a `services/mockApiService.js`.
* **Inversión de Dependencias (DIP):** Los componentes consumen servicios y contextos abstractos. Para conectar el Backend de Spring Boot en el futuro, **únicamente se sustituye `mockApiService.js` por un cliente `axios` o `fetch` apuntando a `http://localhost:8080/api/v1`**, sin modificar los componentes.
* **Single Responsibility Principle (SRP):** Cada componente resuelve un caso de uso específico (`DishCard` pinta el plato, `CartDrawer` liquida la orden, `BillingModal` cobra la mesa).
* **KISS & DRY:** Código legible, sin abstracciones sobrecargadas, utilizando Hooks estándar de React (`useState`, `useEffect`, `useMemo`, `useContext`).

---

## 3. Estrategia de Manejo de Estado (React Hooks)

1. **Estado Global (`useContext`):**
   * `AuthContext`: Conserva la identidad del usuario y permite alternar en tiempo real entre los 4 roles del negocio (`CLIENTE`, `MESERO`, `CHEF`, `ADMIN`).
   * `CartContext`: Mantiene el carrito activo, mesa asignada y cálculos reactivos (subtotal + propina del 10%).
   * `ToastContext`: Orquesta mensajes visuales de retroalimentación inmediata.
2. **Estado Local (`useState` / `useMemo`):**
   * Filtrado en tiempo real del menú por categoría y buscador (`useMemo`).
   * Formularios de reservas y parqueadero con validación sintáctica en el cliente.
   * Modales con apertura y cierre controlado.

---

## 4. Persistencia y Motor de Simulación (`mockApiService.js`)

* Opera mediante `localStorage` bajo la llave `bellaciao_mock_database_v1`.
* Aplica un retardo asíncrono artificial de `150ms – 300ms` simulando latencia de red real.
* Hace cumplir las **mismas reglas de negocio programadas en el Backend**:
  * Apertura de mesa crea y vincula una `Cuenta` en estado `ABIERTA`.
  * Pago de cuenta preserva el total consumido y libera la mesa a `DISPONIBLE`.
  * Regla de reserva con conflicto si existe otra reserva en la misma mesa en $\pm 2$ horas.
  * Cupo máximo de 10 vehículos en parqueadero y rechazo de placas duplicadas activas.
  * Registro público forzado a rol `CLIENTE`.

---

## 5. Preparación para la Integración Futura con Spring Boot

La integración futura requerirá únicamente:
1. Instalar `axios`.
2. Crear `src/services/apiClient.js` con `axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL })`.
3. Inyectar el token JWT en el interceptor `Authorization: Bearer <token>`.
4. Reemplazar los métodos de `mockApiService.js` por llamadas HTTP directas (`apiClient.get('/platos')`, `apiClient.post('/pedidos')`, etc.).

