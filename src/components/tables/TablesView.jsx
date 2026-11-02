import React, { useState, useEffect } from 'react';
import { mesaService, cuentaService } from '../../services/mockApiService';
import { Utensils, Users, MapPin, Receipt, PlusCircle, CheckCircle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function TablesView({ onSelectCobrar }) {
  const [mesas, setMesas] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const loadMesas = async () => {
    try {
      setLoading(true);
      const data = await mesaService.getAll();
      setMesas(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMesas();
  }, []);

  const handleAbrirMesa = async (idMesa) => {
    try {
      const res = await mesaService.abrirCuenta(idMesa);
      toast.success(`¡Mesa ${res.mesa.numero} abierta y lista para tomar pedidos!`);
      loadMesas();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getStatusBadge = (estado) => {
    switch (estado) {
      case 'DISPONIBLE':
        return <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-300">Disponible</span>;
      case 'OCUPADA':
        return <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold border border-rose-300 animate-pulse">Ocupada</span>;
      case 'RESERVADA':
        return <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold border border-amber-300">Reservada</span>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
            Gestión de Sala (Mesero / Admin)
          </span>
          <h1 className="font-serif text-3xl font-bold text-stone-900">
            Salón y Mesas de Comensales
          </h1>
          <p className="text-sm text-stone-500">
            Control de mesas activas, apertura de comandas y facturación.
          </p>
        </div>

        <button
          onClick={loadMesas}
          className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold"
        >
          Refrescar Salón
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-stone-400">Cargando mesas...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mesas.map(m => {
            const isOcupada = m.estado === 'OCUPADA';
            const isDisponible = m.estado === 'DISPONIBLE';

            return (
              <div
                key={m.id}
                className={`bg-white rounded-3xl p-5 border transition-all duration-200 flex flex-col justify-between ${
                  isOcupada
                    ? 'border-rose-300 shadow-md ring-2 ring-rose-50'
                    : 'border-stone-200 shadow-xs hover:border-amber-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-serif text-2xl font-bold text-stone-900">
                      Mesa {m.numero}
                    </span>
                    {getStatusBadge(m.estado)}
                  </div>

                  <div className="space-y-1.5 text-xs text-stone-500 mb-5">
                    <p className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-stone-400" />
                      <span>Capacidad: <strong>{m.capacidad} personas</strong></span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      <span className="uppercase text-[10px] font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
                        {m.ubicacion.replace('_', ' ')}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-stone-100">
                  {isDisponible && (
                    <button
                      onClick={() => handleAbrirMesa(m.id)}
                      className="w-full py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <PlusCircle className="w-4 h-4 text-emerald-400" />
                      <span>Abrir Cuenta en Mesa</span>
                    </button>
                  )}

                  {isOcupada && (
                    <button
                      onClick={() => onSelectCobrar(m.id)}
                      className="w-full py-2.5 px-3 rounded-xl bg-red-800 hover:bg-red-900 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <Receipt className="w-4 h-4 text-amber-300" />
                      <span>Ver Precuenta & Cobrar</span>
                    </button>
                  )}

                  {m.estado === 'RESERVADA' && (
                    <button
                      onClick={() => handleAbrirMesa(m.id)}
                      className="w-full py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5"
                    >
                      <span>Sentar Reserva y Abrir</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

