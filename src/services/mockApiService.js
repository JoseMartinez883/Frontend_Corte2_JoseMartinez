import {
  INITIAL_USERS,
  INITIAL_PLATOS,
  INITIAL_MESAS,
  INITIAL_PEDIDOS,
  INITIAL_CUENTAS,
  INITIAL_RESERVAS,
  INITIAL_VEHICULOS,
  INITIAL_RESENAS
} from '../data/initialSeedData';

const DB_KEY = 'bellaciao_mock_database_v1';

// Helper to simulate realistic network delay
const delay = (ms = 180) => new Promise(resolve => setTimeout(resolve, ms));

// Load or initialize DB from localStorage
function getDatabase() {
  const stored = localStorage.getItem(DB_KEY);
  if (!stored) {
    const initialDb = {
      users: INITIAL_USERS,
      platos: INITIAL_PLATOS,
      mesas: INITIAL_MESAS,
      pedidos: INITIAL_PEDIDOS,
      cuentas: INITIAL_CUENTAS,
      reservas: INITIAL_RESERVAS,
      vehiculos: INITIAL_VEHICULOS,
      resenas: INITIAL_RESENAS
    };
    localStorage.setItem(DB_KEY, JSON.stringify(initialDb));
    return initialDb;
  }
  return JSON.parse(stored);
}

function saveDatabase(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

// -------------------------------------------------------------
// 1. AUTH SERVICE (Login, Register, RBAC)
// -------------------------------------------------------------
export const authService = {
  async login(email, password) {
    await delay(200);
    const db = getDatabase();
    const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      throw new Error("Credenciales inválidas: usuario no encontrado.");
    }
    // Simulation: all default users accept their standard passwords or any non-empty
    const token = `mock-jwt-token-${user.rol.toLowerCase()}-${Date.now()}`;
    const session = {
      user: {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        rol: user.rol,
        avatar: user.avatar
      },
      token
    };
    localStorage.setItem('bellaciao_session', JSON.stringify(session));
    return session;
  },

  async register(nombre, email, password) {
    await delay(250);
    const db = getDatabase();
    if (db.users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("El correo electrónico ya se encuentra registrado.");
    }
    const newUser = {
      id: Date.now(),
      email,
      nombre,
      rol: "CLIENTE", // Regla de negocio: Registro público siempre es CLIENTE
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
    };
    db.users.push(newUser);
    saveDatabase(db);
    return newUser;
  },

  getCurrentSession() {
    const stored = localStorage.getItem('bellaciao_session');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return null;
      }
    }
    // Default to CLIENTE for instant great user experience if not logged in
    return {
      user: INITIAL_USERS[3],
      token: "mock-jwt-client-default"
    };
  },

  logout() {
    localStorage.removeItem('bellaciao_session');
  }
};

// -------------------------------------------------------------
// 2. PLATOS SERVICE (CRUD & Menú)
// -------------------------------------------------------------
export const platoService = {
  async getAll() {
    await delay(150);
    const db = getDatabase();
    return db.platos;
  },

  async getByCategoria(categoria) {
    await delay(120);
    const db = getDatabase();
    if (!categoria || categoria === "TODOS") return db.platos;
    return db.platos.filter(p => p.categoria.toUpperCase() === categoria.toUpperCase());
  },

  async toggleDisponible(id) {
    await delay(150);
    const db = getDatabase();
    const plato = db.platos.find(p => p.id === id);
    if (!plato) throw new Error("Plato no encontrado");
    plato.disponible = !plato.disponible;
    saveDatabase(db);
    return plato;
  },

  async create(platoDto) {
    await delay(200);
    const db = getDatabase();
    const newPlato = {
      id: Date.now(),
      ...platoDto,
      disponible: true,
      etiquetas: platoDto.etiquetas || ["Nuevo"]
    };
    db.platos.push(newPlato);
    saveDatabase(db);
    return newPlato;
  }
};

// -------------------------------------------------------------
// 3. MESAS SERVICE (Salón y Cuentas)
// -------------------------------------------------------------
export const mesaService = {
  async getAll() {
    await delay(150);
    const db = getDatabase();
    return db.mesas;
  },

  async abrirCuenta(idMesa) {
    await delay(250);
    const db = getDatabase();
    const mesa = db.mesas.find(m => m.id === idMesa);
    if (!mesa) throw new Error(`Mesa ${idMesa} no encontrada`);
    if (mesa.estado === "OCUPADA") throw new Error(`La mesa ${mesa.numero} ya tiene una cuenta abierta.`);

    // Al abrir mesa se crea la Cuenta en estado ABIERTA
    const maxId = db.cuentas.reduce((max, c) => typeof c.id === 'number' && c.id < 10000 ? Math.max(max, c.id) : max, 100);
    const nuevaCuentaId = maxId + 1;
    const nuevaCuenta = {
      id: nuevaCuentaId,
      idMesa: mesa.id,
      numeroMesa: mesa.numero,
      estado: "ABIERTA",
      fechaApertura: new Date().toISOString(),
      fechaCierre: null,
      total: 0,
      metodoPago: null,
      items: []
    };

    mesa.estado = "OCUPADA";
    mesa.idCuenta = nuevaCuentaId;

    db.cuentas.push(nuevaCuenta);
    saveDatabase(db);
    return { mesa, cuenta: nuevaCuenta };
  }
};

// -------------------------------------------------------------
// 4. PEDIDOS SERVICE (Comandas y Estados)
// -------------------------------------------------------------
export const pedidoService = {
  async getAll() {
    await delay(150);
    const db = getDatabase();
    return db.pedidos;
  },

  async getById(idPedido) {
    await delay(100);
    const db = getDatabase();
    const pedido = db.pedidos.find(p => p.id === idPedido);
    if (!pedido) throw new Error("Pedido no encontrado.");
    return pedido;
  },

  async create(pedidoDto) {
    await delay(300);
    const db = getDatabase();
    
    // Calculate total
    const total = pedidoDto.items.reduce((acc, item) => acc + (item.precioUnitario * item.cantidad), 0);
    
    const nuevoPedido = {
      id: crypto.randomUUID ? crypto.randomUUID() : `ped-${Date.now()}`,
      idMesa: pedidoDto.idMesa,
      numeroMesa: pedidoDto.numeroMesa,
      estado: "PENDIENTE",
      fechaCreacion: new Date().toISOString(),
      clienteEmail: pedidoDto.clienteEmail || "invitado@bellaciao.com",
      clienteNombre: pedidoDto.clienteNombre || "Comensal",
      items: pedidoDto.items,
      total
    };

    db.pedidos.unshift(nuevoPedido);

    // Si la mesa tiene cuenta abierta, acumular el consumo
    const cuentaActiva = db.cuentas.find(c => c.idMesa === pedidoDto.idMesa && c.estado === "ABIERTA");
    if (cuentaActiva) {
      cuentaActiva.total += total;
      pedidoDto.items.forEach(i => {
        cuentaActiva.items.push({
          descripcion: `${i.nombre} (x${i.cantidad})`,
          cantidad: i.cantidad,
          subtotal: i.subtotal
        });
      });
    }

    saveDatabase(db);
    return nuevoPedido;
  },

  async updateEstado(idPedido, nuevoEstado) {
    await delay(200);
    const db = getDatabase();
    const pedido = db.pedidos.find(p => p.id === idPedido);
    if (!pedido) throw new Error("Pedido no encontrado.");
    pedido.estado = nuevoEstado;
    saveDatabase(db);
    return pedido;
  }
};

// -------------------------------------------------------------
// 5. CUENTAS SERVICE (Liquidación y Facturación)
// -------------------------------------------------------------
export const cuentaService = {
  async getActivaByMesa(idMesa) {
    await delay(150);
    const db = getDatabase();
    const cuenta = db.cuentas.find(c => c.idMesa === idMesa && c.estado === "ABIERTA");
    return cuenta || null;
  },

  async registrarPago(idMesa, { metodoPago, propinaIncluida = true, montoRecibido = 0 }) {
    await delay(300);
    const db = getDatabase();
    const cuenta = db.cuentas.find(c => c.idMesa === idMesa && c.estado === "ABIERTA");
    if (!cuenta) throw new Error(`No hay cuenta activa para la mesa ${idMesa}.`);

    const propinaSugerida = propinaIncluida ? Math.round(cuenta.total * 0.10) : 0;
    const totalFinal = cuenta.total + propinaSugerida;

    // Actualizar cuenta a CERRADA preservando el total
    cuenta.estado = "CERRADA";
    cuenta.fechaCierre = new Date().toISOString();
    cuenta.metodoPago = metodoPago;
    cuenta.propina = propinaSugerida;
    cuenta.totalFinal = totalFinal;

    // Liberar mesa
    const mesa = db.mesas.find(m => m.id === idMesa);
    if (mesa) {
      mesa.estado = "DISPONIBLE";
      mesa.idCuenta = null;
    }

    saveDatabase(db);
    return { cuenta, mesa };
  }
};

// -------------------------------------------------------------
// 6. RESERVAS SERVICE (Validación de Ventana de 2 Horas)
// -------------------------------------------------------------
export const reservaService = {
  async getAll() {
    await delay(150);
    const db = getDatabase();
    return db.reservas;
  },

  async create(reservaDto) {
    await delay(250);
    const db = getDatabase();

    const nuevaFecha = new Date(reservaDto.fechaHora);
    const idMesa = Number(reservaDto.idMesa);

    // Regla de Negocio del Backend: ventana de 2 horas (conflicto si existe reserva activa en +- 2h)
    const conflicto = db.reservas.some(r => {
      if (!r.activa || r.idMesa !== idMesa) return false;
      const rFecha = new Date(r.fechaHora);
      const diffMs = Math.abs(nuevaFecha.getTime() - rFecha.getTime());
      const diffHoras = diffMs / (1000 * 60 * 60);
      return diffHoras < 2; // Dentro del margen de 2 horas
    });

    if (conflicto) {
      throw new Error(`Conflicto de horario: La mesa ${idMesa} ya tiene una reserva activa dentro del bloque de 2 horas.`);
    }

    const nuevaReserva = {
      id: crypto.randomUUID ? crypto.randomUUID() : `res-${Date.now()}`,
      idMesa,
      numeroMesa: idMesa,
      nombreCliente: reservaDto.nombreCliente,
      telefono: reservaDto.telefono,
      email: reservaDto.email,
      fechaHora: reservaDto.fechaHora,
      numeroPersonas: Number(reservaDto.numeroPersonas),
      activa: true,
      notas: reservaDto.notas || ""
    };

    db.reservas.unshift(nuevaReserva);
    saveDatabase(db);
    return nuevaReserva;
  },

  async cancel(idReserva) {
    await delay(150);
    const db = getDatabase();
    const reserva = db.reservas.find(r => r.id === idReserva);
    if (!reserva) throw new Error("Reserva no encontrada.");
    reserva.activa = false;
    saveDatabase(db);
    return reserva;
  }
};

// -------------------------------------------------------------
// 7. VEHÍCULOS / PARQUEADERO SERVICE (Tarifas y Cupo 10)
// -------------------------------------------------------------
export const vehiculoService = {
  async getAll() {
    await delay(120);
    const db = getDatabase();
    return db.vehiculos;
  },

  async registrarEntrada(placa, tipoVehiculo) {
    await delay(200);
    const db = getDatabase();
    const placaClean = placa.trim().toUpperCase();

    // Validar cupo máximo de 10
    const activos = db.vehiculos.filter(v => v.estado === "EN_PARQUEADERO").length;
    if (activos >= 10) {
      throw new Error("Parqueadero lleno: capacidad máxima de 10 vehículos alcanzada.");
    }

    // Validar no duplicado
    const existeActivo = db.vehiculos.some(v => v.placa === placaClean && v.estado === "EN_PARQUEADERO");
    if (existeActivo) {
      throw new Error(`El vehículo con placa '${placaClean}' ya tiene una estancia activa.`);
    }

    const nuevoVehiculo = {
      id: Date.now(),
      placa: placaClean,
      tipoVehiculo: tipoVehiculo.toUpperCase(),
      horaEntrada: new Date().toISOString(),
      horaSalida: null,
      estado: "EN_PARQUEADERO",
      tarifaTotal: 0
    };

    db.vehiculos.unshift(nuevoVehiculo);
    saveDatabase(db);
    return nuevoVehiculo;
  },

  async registrarSalida(placa) {
    await delay(250);
    const db = getDatabase();
    const placaClean = placa.trim().toUpperCase();
    const vehiculo = db.vehiculos.find(v => v.placa === placaClean && v.estado === "EN_PARQUEADERO");
    if (!vehiculo) {
      throw new Error(`No se encontró vehículo activo con placa '${placaClean}'.`);
    }

    const entrada = new Date(vehiculo.horaEntrada);
    const salida = new Date();
    const minutos = Math.max(1, Math.round((salida.getTime() - entrada.getTime()) / 60000));

    // Regla de tarifas: Moto = $50/min, Carro = $100/min, mínimo $2.000
    const tarifaMinuto = vehiculo.tipoVehiculo === "MOTO" ? 50 : 100;
    const calculo = minutos * tarifaMinuto;
    const tarifaTotal = Math.max(2000, calculo);

    vehiculo.horaSalida = salida.toISOString();
    vehiculo.estado = "FINALIZADO";
    vehiculo.minutosEstancia = minutos;
    vehiculo.tarifaTotal = tarifaTotal;

    saveDatabase(db);
    return vehiculo;
  }
};

// -------------------------------------------------------------
// 8. RESEÑAS SERVICE (NoSQL Documental)
// -------------------------------------------------------------
export const resenaService = {
  async getAll() {
    await delay(120);
    const db = getDatabase();
    return db.resenas;
  },

  async create(resenaDto) {
    await delay(200);
    const db = getDatabase();
    const nuevaResena = {
      id: `res-${Date.now()}`,
      idPedido: resenaDto.idPedido || `ped-${Date.now()}`,
      clienteEmail: resenaDto.clienteEmail,
      clienteNombre: resenaDto.clienteNombre || "Comensal Anónimo",
      calificacion: Number(resenaDto.calificacion),
      comentario: resenaDto.comentario,
      fecha: new Date().toISOString()
    };
    db.resenas.unshift(nuevaResena);
    saveDatabase(db);
    return nuevaResena;
  }
};

// -------------------------------------------------------------
// 9. REPORTES SERVICE (Dashboard Métricas y Reportes Gerenciales)
// -------------------------------------------------------------
export const reporteService = {
  // RF /reportes/resumen: Resumen operativo del restaurante
  async getResumen() {
    await delay(150);
    const db = getDatabase();
    const mesasOcupadas = db.mesas.filter(m => m.estado === "OCUPADA").length;
    const vehiculosEnParqueadero = db.vehiculos.filter(v => v.estado === "EN_PARQUEADERO").length;
    const pedidosActivos = db.pedidos.filter(p => p.estado !== "ENTREGADO").length;
    const calificaciones = db.resenas.map(r => r.calificacion);
    const promedioCalificacion = calificaciones.length 
      ? (calificaciones.reduce((a, b) => a + b, 0) / calificaciones.length).toFixed(1)
      : "5.0";

    return {
      mesasOcupadas,
      totalMesas: db.mesas.length,
      vehiculosEnParqueadero,
      cuposDisponibles: 10 - vehiculosEnParqueadero,
      pedidosActivos,
      promedioCalificacion
    };
  },

  // RF /reportes/platos-populares: Top platos con mayor demanda
  async getPlatosPopulares() {
    await delay(150);
    const db = getDatabase();
    // Tally items from orders
    const counts = {};
    db.pedidos.forEach(ped => {
      (ped.items || []).forEach(item => {
        counts[item.nombre] = (counts[item.nombre] || 0) + (item.cantidad || 1);
      });
    });

    const populares = Object.entries(counts)
      .map(([nombre, cantidad]) => ({ nombre, cantidad }))
      .sort((a, b) => b.cantidad - a.cantidad);

    if (populares.length === 0) {
      return [
        { nombre: "Pizza Margherita di Bufala", cantidad: 42, porcentaje: 28 },
        { nombre: "Fettuccine alla Carbonara Autentica", cantidad: 35, porcentaje: 24 },
        { nombre: "Lasagna Bolognese Tradizionale", cantidad: 29, porcentaje: 19 },
        { nombre: "Pizza Tartufo e Funghi", cantidad: 24, porcentaje: 16 },
        { nombre: "Tiramisù Tradizionale", cantidad: 20, porcentaje: 13 }
      ];
    }
    return populares;
  },

  // RF /reportes/ingresos: Total recaudado y desglose financiero
  async getIngresos() {
    await delay(150);
    const db = getDatabase();
    const cuentasCerradas = db.cuentas.filter(c => c.estado === "CERRADA");
    const subtotalBruto = cuentasCerradas.reduce((acc, c) => acc + (c.total || 0), 0);
    const totalPropina = cuentasCerradas.reduce((acc, c) => acc + (c.propina || 0), 0);
    const totalFinal = cuentasCerradas.reduce((acc, c) => acc + (c.totalFinal || c.total || 0), 0);

    return {
      subtotalBruto: subtotalBruto || 2850000,
      totalPropina: totalPropina || 285000,
      totalFinal: totalFinal || 3135000,
      cuentasLiquidadas: cuentasCerradas.length || 18
    };
  },

  async getMetricas() {
    await delay(150);
    const db = getDatabase();
    const totalVentas = db.cuentas
      .filter(c => c.estado === "CERRADA")
      .reduce((acc, c) => acc + (c.totalFinal || c.total || 0), 0);

    const mesasOcupadas = db.mesas.filter(m => m.estado === "OCUPADA").length;
    const vehiculosEnParqueadero = db.vehiculos.filter(v => v.estado === "EN_PARQUEADERO").length;
    const pedidosEnCocina = db.pedidos.filter(p => p.estado === "PENDIENTE" || p.estado === "EN_PREPARACION").length;

    const calificaciones = db.resenas.map(r => r.calificacion);
    const promedioCalificacion = calificaciones.length 
      ? (calificaciones.reduce((a, b) => a + b, 0) / calificaciones.length).toFixed(1)
      : 5.0;

    return {
      totalVentas: totalVentas || 3135000,
      mesasOcupadas,
      totalMesas: db.mesas.length,
      vehiculosEnParqueadero,
      cuposParqueaderoDisponibles: 10 - vehiculosEnParqueadero,
      pedidosEnCocina,
      totalPedidos: db.pedidos.length,
      promedioCalificacion
    };
  }
};

