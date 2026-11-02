export const INITIAL_USERS = [
  {
    id: 1,
    email: "admin@restaurante.com",
    nombre: "Don Alessandro Rossi",
    rol: "ADMIN",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    email: "chef@restaurante.com",
    nombre: "Chef Marco Bellini",
    rol: "CHEF",
    avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    email: "mesero@restaurante.com",
    nombre: "Giuseppe Conti",
    rol: "MESERO",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    email: "cliente@restaurante.com",
    nombre: "Camila Rodríguez",
    rol: "CLIENTE",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
  }
];

export const INITIAL_PLATOS = [
  {
    id: 1,
    nombre: "Pizza Margherita di Bufala",
    descripcion: "Masa fermentada 48h, salsa pomodoro San Marzano, mozzarella di bufala campana DOP, albahaca fresca y aceite de oliva virgen extra.",
    precio: 36000,
    categoria: "PIZZA",
    disponible: true,
    imagenUrl: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&auto=format&fit=crop&q=80",
    tiempoPreparacionMinutos: 15,
    ingredientes: ["Harina Caputo", "Pomodoro San Marzano", "Mozzarella di Bufala", "Albahaca fresca"],
    etiquetas: ["Más Vendida", "Artesanal", "DOP"]
  },
  {
    id: 2,
    nombre: "Pizza Diavola Piccante",
    descripcion: "Pomodoro, mozzarella fior di latte, salame spianata calabra picante y pepperoncino ahumado.",
    precio: 42000,
    categoria: "PIZZA",
    disponible: true,
    imagenUrl: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=800&auto=format&fit=crop&q=80",
    tiempoPreparacionMinutos: 18,
    ingredientes: ["Pomodoro", "Mozzarella", "Salame Picante", "Orégano"],
    etiquetas: ["Picante", "Favorito"]
  },
  {
    id: 3,
    nombre: "Pizza Tartufo e Funghi",
    descripcion: "Base blanca con crema de trufa negra de Umbría, portobellos asados, fior di latte y lascas de parmigiano reggiano 24 meses.",
    precio: 52000,
    categoria: "PIZZA",
    disponible: true,
    imagenUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80",
    tiempoPreparacionMinutos: 20,
    ingredientes: ["Crema de Trufa", "Hongos Silvestres", "Fior di Latte", "Parmesano 24m"],
    etiquetas: ["Gourmet", "Chef Selection"]
  },
  {
    id: 4,
    nombre: "Fettuccine alla Carbonara Autentica",
    descripcion: "Pasta fresca al huevo hecha en casa, guanciale crujiente di Norcia, yemas de huevo de campo, pecorino romano DOP y pimienta negra molida.",
    precio: 38000,
    categoria: "PASTA",
    disponible: true,
    imagenUrl: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&auto=format&fit=crop&q=80",
    tiempoPreparacionMinutos: 16,
    ingredientes: ["Pasta fresca", "Guanciale", "Pecorino Romano", "Yemas de huevo"],
    etiquetas: ["Sin Crema", "100% Romana", "Top Ventas"]
  },
  {
    id: 5,
    nombre: "Lasagna Bolognese Tradizionale",
    descripcion: "Capas de pasta artesanal con ragù clásico cocinado a fuego lento durante 6 horas, bechamel cremosa y gratén de parmigiano.",
    precio: 39000,
    categoria: "PASTA",
    disponible: true,
    imagenUrl: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&auto=format&fit=crop&q=80",
    tiempoPreparacionMinutos: 22,
    ingredientes: ["Ragù de res y cerdo", "Bechamel", "Pasta artesanal", "Parmesano"],
    etiquetas: ["Cocción Lenta", "Clásico"]
  },
  {
    id: 6,
    nombre: "Ravioli di Ricotta e Spinaci",
    descripcion: "Raviolis rellenos de espinaca baby salteada y ricotta fresca, bañados en salsa mantecata de mantequilla de salvia y nueces tostadas.",
    precio: 44000,
    categoria: "PASTA",
    disponible: true,
    imagenUrl: "https://images.unsplash.com/photo-1587740908075-9e245070dfaa?w=800&auto=format&fit=crop&q=80",
    tiempoPreparacionMinutos: 18,
    ingredientes: ["Ricotta fresca", "Espinacas", "Mantequilla de salvia", "Nueces"],
    etiquetas: ["Vegetariano", "Pasta Rellena"]
  },
  {
    id: 7,
    nombre: "Bruschetta al Pomodoro e Basilico",
    descripcion: "Pan ciabatta rústico a la parrilla con ajo frotado, tomates cherry confitados, albahaca fresca y reducción balsámica de Módena.",
    precio: 22000,
    categoria: "ENTRADA",
    disponible: true,
    imagenUrl: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=800&auto=format&fit=crop&q=80",
    tiempoPreparacionMinutos: 10,
    ingredientes: ["Pan ciabatta", "Tomate cherry", "Albahaca", "Balsámico"],
    etiquetas: ["Para Compartir", "Entrada"]
  },
  {
    id: 8,
    nombre: "Carpaccio di Manzo con Parmigiano",
    descripcion: "Finas láminas de lomo de res sellado, rúgula salvaje, champiñones laminados, vinagreta de limón y alcaparras fritas.",
    precio: 34000,
    categoria: "ENTRADA",
    disponible: true,
    imagenUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
    tiempoPreparacionMinutos: 12,
    ingredientes: ["Lomo de res", "Rúgula", "Parmesano", "Limón y alcaparras"],
    etiquetas: ["Gourmet", "Entrada Fría"]
  },
  {
    id: 9,
    nombre: "Tiramisù Tradizionale al Mascarpone",
    descripcion: "Receta veneciana con soletillas savoiardi empapadas en espresso italiano, crema ligera de mascarpone y cacao amargo espolvoreado.",
    precio: 24000,
    categoria: "POSTRE",
    disponible: true,
    imagenUrl: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&auto=format&fit=crop&q=80",
    tiempoPreparacionMinutos: 8,
    ingredientes: ["Queso Mascarpone", "Café Espresso", "Savoiardi", "Cacao puro"],
    etiquetas: ["Insignia de la Casa", "Dulce"]
  },
  {
    id: 10,
    nombre: "Panna Cotta ai Frutti di Bosco",
    descripcion: "Flan cremoso de nata aromatizada con vainilla de Madagascar sobre coulis natural de moras y frambuesas silvestres.",
    precio: 20000,
    categoria: "POSTRE",
    disponible: true,
    imagenUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80",
    tiempoPreparacionMinutos: 8,
    ingredientes: ["Nata fresca", "Vainilla Bourbon", "Frutos rojos"],
    etiquetas: ["Suave", "Refrescante"]
  },
  {
    id: 11,
    nombre: "Limonada Italiana de Albahaca",
    descripcion: "Limones frescos exprimidos, infusión de hojas de albahaca de huerto, jarabe artesanal de jengibre y agua con gas San Pellegrino.",
    precio: 14000,
    categoria: "BEBIDA",
    disponible: true,
    imagenUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80",
    tiempoPreparacionMinutos: 5,
    ingredientes: ["Limón Tahití", "Albahaca", "San Pellegrino", "Jengibre"],
    etiquetas: ["Bebida Fría", "Sin Alcohol"]
  },
  {
    id: 12,
    nombre: "Chianti Classico DOCG (Copa)",
    descripcion: "Vino tinto toscano con cuerpo medio, notas a cereza madura, cedro y especias italianas. Crianza de 12 meses en barrica de roble.",
    precio: 28000,
    categoria: "BEBIDA",
    disponible: true,
    imagenUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop&q=80",
    tiempoPreparacionMinutos: 3,
    ingredientes: ["Uva Sangiovese 100%"],
    etiquetas: ["Vino Tinto", "Toscana", "DOCG"]
  }
];

export const INITIAL_MESAS = [
  { id: 1, numero: 1, capacidad: 2, ubicacion: "TERRAZA", estado: "DISPONIBLE" },
  { id: 2, numero: 2, capacidad: 4, ubicacion: "SALON_PRINCIPAL", estado: "OCUPADA", idCuenta: 101 },
  { id: 3, numero: 3, capacidad: 4, ubicacion: "SALON_PRINCIPAL", estado: "DISPONIBLE" },
  { id: 4, numero: 4, capacidad: 6, ubicacion: "SALON_PRINCIPAL", estado: "DISPONIBLE" },
  { id: 5, numero: 5, capacidad: 2, ubicacion: "TERRAZA", estado: "DISPONIBLE" },
  { id: 6, numero: 6, capacidad: 8, ubicacion: "ZONA_VIP", estado: "RESERVADA" },
  { id: 7, numero: 7, capacidad: 4, ubicacion: "SALON_PRINCIPAL", estado: "DISPONIBLE" },
  { id: 8, numero: 8, capacidad: 2, ubicacion: "TERRAZA", estado: "DISPONIBLE" },
  { id: 9, numero: 9, capacidad: 6, ubicacion: "SALON_PRINCIPAL", estado: "DISPONIBLE" },
  { id: 10, numero: 10, capacidad: 10, ubicacion: "ZONA_VIP", estado: "DISPONIBLE" }
];

export const INITIAL_PEDIDOS = [
  {
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    idMesa: 2,
    numeroMesa: 2,
    estado: "EN_PREPARACION",
    fechaCreacion: new Date(Date.now() - 25 * 60000).toISOString(),
    clienteEmail: "cliente@restaurante.com",
    clienteNombre: "Camila Rodríguez",
    items: [
      { idPlato: 1, nombre: "Pizza Margherita di Bufala", cantidad: 1, precioUnitario: 36000, subtotal: 36000 },
      { idPlato: 4, nombre: "Fettuccine alla Carbonara Autentica", cantidad: 1, precioUnitario: 38000, subtotal: 38000 },
      { idPlato: 11, nombre: "Limonada Italiana de Albahaca", cantidad: 2, precioUnitario: 14000, subtotal: 28000 }
    ],
    total: 102000
  }
];

export const INITIAL_CUENTAS = [
  {
    id: 101,
    idMesa: 2,
    numeroMesa: 2,
    estado: "ABIERTA",
    fechaApertura: new Date(Date.now() - 35 * 60000).toISOString(),
    total: 102000,
    items: [
      { descripcion: "Pizza Margherita di Bufala", cantidad: 1, subtotal: 36000 },
      { descripcion: "Fettuccine alla Carbonara Autentica", cantidad: 1, subtotal: 38000 },
      { descripcion: "Limonada Italiana de Albahaca (x2)", cantidad: 2, subtotal: 28000 }
    ]
  }
];

export const INITIAL_RESERVAS = [
  {
    id: "7bdeabfa-6b1e-4d1e-b841-498420890f9c",
    idMesa: 6,
    numeroMesa: 6,
    nombreCliente: "Carlos Mendoza",
    telefono: "+57 310 987 6543",
    email: "carlos.mendoza@email.com",
    fechaHora: new Date(Date.now() + 4 * 3600000).toISOString(),
    numeroPersonas: 6,
    activa: true,
    notas: "Celebración de aniversario, mesa decorada"
  }
];

export const INITIAL_VEHICULOS = [
  {
    id: 1,
    placa: "KTM-89C",
    tipoVehiculo: "MOTO",
    horaEntrada: new Date(Date.now() - 75 * 60000).toISOString(),
    horaSalida: null,
    estado: "EN_PARQUEADERO",
    tarifaTotal: 0
  },
  {
    id: 2,
    placa: "HXZ-452",
    tipoVehiculo: "CARRO",
    horaEntrada: new Date(Date.now() - 40 * 60000).toISOString(),
    horaSalida: null,
    estado: "EN_PARQUEADERO",
    tarifaTotal: 0
  }
];

export const INITIAL_RESENAS = [
  {
    id: "res-001",
    idPedido: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    clienteEmail: "camila@restaurante.com",
    clienteNombre: "Camila Rodríguez",
    calificacion: 5,
    comentario: "¡La mejor pasta carbonara auténtica de la ciudad! El servicio del mesero fue impecable y el ambiente te transporta a Roma.",
    fecha: new Date(Date.now() - 24 * 3600000).toISOString()
  },
  {
    id: "res-002",
    idPedido: "a12bc34d-58cc-4372-a567-0e02b2c3d999",
    clienteEmail: "david.perez@email.com",
    clienteNombre: "David Pérez",
    calificacion: 5,
    comentario: "La pizza con trufa negra y hongos es espectacular. La masa tiene un fermentado perfecto, súper ligera.",
    fecha: new Date(Date.now() - 48 * 3600000).toISOString()
  },
  {
    id: "res-003",
    idPedido: "c34de56f-58cc-4372-a567-0e02b2c3d888",
    clienteEmail: "laura.vargas@email.com",
    clienteNombre: "Laura Vargas",
    calificacion: 4,
    comentario: "Excelente comida y los postres son deliciosos. El tiramisú es imperdible. Muy buena atención.",
    fecha: new Date(Date.now() - 72 * 3600000).toISOString()
  }
];

