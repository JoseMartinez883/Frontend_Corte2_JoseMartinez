import { describe, it, expect, beforeEach } from 'vitest';
import {
  platoService,
  mesaService,
  cuentaService,
  reservaService,
  vehiculoService,
  authService
} from '../services/mockApiService';

describe('Servicios Simulados del Backend (mockApiService)', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  it('debe listar los platos del menú y filtrar por categoría', async () => {
    const todos = await platoService.getAll();
    expect(todos.length).toBeGreaterThanOrEqual(10);

    const pizzas = await platoService.getByCategoria('PIZZA');
    expect(pizzas.length).toBeGreaterThan(0);
    pizzas.forEach(p => expect(p.categoria).toBe('PIZZA'));
  });

  it('debe abrir mesa y crear automáticamente una Cuenta en estado ABIERTA', async () => {
    const res = await mesaService.abrirCuenta(3);
    expect(res.mesa.estado).toBe('OCUPADA');
    expect(res.cuenta.estado).toBe('ABIERTA');
    expect(res.cuenta.idMesa).toBe(3);
  });

  it('debe registrar el pago de una cuenta activa y liberar la mesa a DISPONIBLE', async () => {
    // Mesa 2 viene ocupada con Cuenta 101 por defecto
    const res = await cuentaService.registrarPago(2, {
      metodoPago: 'EFECTIVO',
      propinaIncluida: true
    });

    expect(res.cuenta.estado).toBe('CERRADA');
    expect(res.cuenta.metodoPago).toBe('EFECTIVO');
    expect(res.mesa.estado).toBe('DISPONIBLE');
  });

  it('debe validar y rechazar reservas con conflicto de horario menor a 2 horas (Regla Backend)', async () => {
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() + 2);
    baseDate.setHours(19, 0, 0, 0);

    // Crear primera reserva a las 19:00 en Mesa 4
    await reservaService.create({
      idMesa: 4,
      nombreCliente: 'Andrés López',
      telefono: '3001234567',
      email: 'andres@test.com',
      fechaHora: baseDate.toISOString(),
      numeroPersonas: 4
    });

    // Intentar reservar la misma mesa a las 19:30 (conflicto de 30 min)
    const conflictoDate = new Date(baseDate.getTime() + 30 * 60000);
    await expect(
      reservaService.create({
        idMesa: 4,
        nombreCliente: 'Pedro Gómez',
        telefono: '3009876543',
        email: 'pedro@test.com',
        fechaHora: conflictoDate.toISOString(),
        numeroPersonas: 2
      })
    ).rejects.toThrow(/Conflicto de horario/);
  });

  it('debe registrar entrada y liquidar salida de vehículo con tarifa por minuto', async () => {
    const entrada = await vehiculoService.registrarEntrada('XYZ-987', 'CARRO');
    expect(entrada.placa).toBe('XYZ-987');
    expect(entrada.estado).toBe('EN_PARQUEADERO');

    const salida = await vehiculoService.registrarSalida('XYZ-987');
    expect(salida.estado).toBe('FINALIZADO');
    expect(salida.tarifaTotal).toBeGreaterThanOrEqual(2000); // Tarifa mínima
  });

  it('debe autenticar los usuarios semilla del backend con sus roles', async () => {
    const adminSession = await authService.login('admin@restaurante.com', 'admin123');
    expect(adminSession.user.rol).toBe('ADMIN');

    const chefSession = await authService.login('chef@restaurante.com', 'chef123');
    expect(chefSession.user.rol).toBe('CHEF');
  });

});

