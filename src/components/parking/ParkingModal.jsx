import React, { useState, useEffect } from 'react';
import { vehiculoService } from '../../services/mockApiService';
import { X, Car, Bike, Clock, ArrowRight, ShieldCheck, CheckCircle2, Lock, RotateCcw } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';

export default function ParkingModal({ isOpen, onClose }) {
  const [vehiculos, setVehiculos] = useState([]);
  const [placa, setPlaca] = useState('');
  const [tipo, setTipo] = useState('CARRO');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { currentUser, isAdmin, switchUserRole } = useAuth();

  const loadVehiculos = async () => {
    const list = await vehiculoService.getAll();
    setVehiculos(list);
  };

  useEffect(() => {
    if (isOpen) loadVehiculos();
  }, [isOpen]);

  if (!isOpen) return null;

  const activos = vehiculos.filter(v => v.estado === 'EN_PARQUEADERO');
  const cuposDisponibles = 10 - activos.length;

  const handleEntrada = async (e) => {
    e.preventDefault();
    if (!placa) return;

    try {
      setLoading(true);
      await vehiculoService.registrarEntrada(placa, tipo);
      toast.success(`Entrada registrada para vehículo con placa ${placa.toUpperCase()}!`);
      setPlaca('');
      loadVehiculos();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSalida = async (placaSalida) => {
    try {
      setLoading(true);
      const res = await vehiculoService.registrarSalida(placaSalida);
      toast.success(`Salida de ${res.placa}: ${res.minutosEstancia} minutos. Total liquidado: $${res.tarifaTotal.toLocaleString('es-CO')}`);
      loadVehiculos();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 bg-stone-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold">Control de Parqueadero</h2>
              <p className="text-xs text-stone-400">Cupo Máximo: 10 Vehículos • Tarifas por minuto</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-stone-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Capacity Indicator Banner */}
        <div className="p-4 bg-blue-50 border-b border-blue-200/80 flex items-center justify-between shrink-0 text-xs">
          <div>
            <span className="font-bold text-blue-900">Ocupación Actual:</span>
            <span className="ml-2 font-mono font-bold text-blue-950 text-sm">
              {activos.length} / 10
            </span>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
            cuposDisponibles > 2 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
          }`}>
            {cuposDisponibles} cupos libres
          </span>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Customer information notice */}
          {!isAdmin ? (
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-amber-900 text-xs space-y-1.5">
              <span className="font-bold flex items-center gap-1.5 text-stone-800">
                <Car className="w-4 h-4 text-amber-700" />
                Información de Estacionamiento para Comensales
              </span>
              <p className="text-stone-600 leading-relaxed">
                Puedes consultar la disponibilidad de cupos en tiempo real y las tarifas vigentes. El registro de ingresos y liquidación de salidas vehiculares es operado por el personal en la recepción del restaurante.
              </p>
            </div>
          ) : (
            /* Registration Form for ADMIN */
            <form onSubmit={handleEntrada} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Registrar Entrada de Vehículo (Administración)
                </h4>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Placa (ej: ABC-123)"
                  required
                  maxLength="7"
                  value={placa}
                  onChange={(e) => setPlaca(e.target.value.toUpperCase())}
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-stone-300 font-mono font-bold text-sm tracking-wider uppercase focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  className="px-3 py-2.5 rounded-xl border border-stone-300 text-xs font-bold bg-white"
                >
                  <option value="CARRO">Automóvil ($100/min)</option>
                  <option value="MOTO">Motocicleta ($50/min)</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={loading || cuposDisponibles <= 0}
                className="w-full py-2.5 bg-stone-900 hover:bg-black text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Ingresar al Parqueadero</span>
              </button>
            </form>
          )}

          {/* Active Vehicles List */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">
              Vehículos en Estancia Activa
            </h4>
            {activos.length === 0 ? (
              <p className="text-center text-xs text-stone-400 py-6">No hay vehículos en el parqueadero actualmente.</p>
            ) : (
              <div className="space-y-2.5">
                {activos.map(v => (
                  <div key={v.id} className="p-3.5 rounded-2xl border border-stone-200 bg-white shadow-xs flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700">
                        {v.tipoVehiculo === 'CARRO' ? <Car className="w-4 h-4" /> : <Bike className="w-4 h-4" />}
                      </div>
                      <div>
                        <span className="font-mono font-extrabold text-sm text-stone-900 block leading-tight">
                          {v.placa}
                        </span>
                        <span className="text-[11px] text-stone-500">
                          Entrada: {new Date(v.horaEntrada).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                    {isAdmin ? (
                      <button
                        onClick={() => handleSalida(v.placa)}
                        className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-xs"
                      >
                        Registrar Salida
                      </button>
                    ) : (
                      <span className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-600 text-[11px] font-bold border border-stone-200">
                        Estacionado
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

