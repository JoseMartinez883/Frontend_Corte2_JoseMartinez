import React, { useState, useEffect } from 'react';
import { reporteService, platoService } from '../../services/mockApiService';
import { X, TrendingUp, Users, Car, ChefHat, Star, ToggleLeft, ToggleRight, DollarSign } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function AdminDashboardModal({ isOpen, onClose }) {
  const [metricas, setMetricas] = useState(null);
  const [platos, setPlatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const loadData = async () => {
    try {
      setLoading(true);
      const [met, pl] = await Promise.all([
        reporteService.getMetricas(),
        platoService.getAll()
      ]);
      setMetricas(met);
      setPlatos(pl);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) loadData();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTogglePlato = async (id, nombre) => {
    try {
      const updated = await platoService.toggleDisponible(id);
      toast.info(`Plato '${nombre}' marcado como ${updated.disponible ? 'Disponible' : 'Agotado'}.`);
      loadData();
    } catch (err) {
      toast.error("Error al actualizar plato.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 bg-stone-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-800 flex items-center justify-center text-amber-300">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold">Panel Administrativo & Métricas</h2>
              <p className="text-xs text-stone-400">ReporteService • Auditoría Operativa y Ventas</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-stone-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {loading || !metricas ? (
          <div className="p-12 text-center text-stone-400">Calculando métricas del sistema...</div>
        ) : (
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200/80">
                <span className="text-[10px] uppercase font-bold text-amber-900 tracking-wider block">
                  Ventas Liquidadas
                </span>
                <span className="text-xl sm:text-2xl font-black text-amber-950 font-mono mt-1 block">
                  ${metricas.totalVentas.toLocaleString('es-CO')}
                </span>
              </div>

              <div className="p-4 bg-blue-50/80 rounded-2xl border border-blue-200/80">
                <span className="text-[10px] uppercase font-bold text-blue-900 tracking-wider block">
                  Mesas Ocupadas
                </span>
                <span className="text-xl sm:text-2xl font-black text-blue-950 font-mono mt-1 block">
                  {metricas.mesasOcupadas} / {metricas.totalMesas}
                </span>
              </div>

              <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200/80">
                <span className="text-[10px] uppercase font-bold text-emerald-900 tracking-wider block">
                  Parqueadero
                </span>
                <span className="text-xl sm:text-2xl font-black text-emerald-950 font-mono mt-1 block">
                  {metricas.vehiculosEnParqueadero} / 10
                </span>
              </div>

              <div className="p-4 bg-rose-50/80 rounded-2xl border border-rose-200/80">
                <span className="text-[10px] uppercase font-bold text-rose-900 tracking-wider block">
                  Satisfacción
                </span>
                <span className="text-xl sm:text-2xl font-black text-rose-950 font-mono mt-1 flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  {metricas.promedioCalificacion}
                </span>
              </div>
            </div>

            {/* Inventory Management: Toggle Availability */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-serif font-bold text-base text-stone-900">
                  Control de Disponibilidad de Platos
                </h3>
                <span className="text-xs text-stone-500">
                  Total: {platos.length} platos en carta
                </span>
              </div>

              <div className="border border-stone-200 rounded-2xl divide-y divide-stone-100 max-h-60 overflow-y-auto">
                {platos.map(p => (
                  <div key={p.id} className="p-3.5 flex items-center justify-between hover:bg-stone-50 transition">
                    <div className="flex items-center gap-3">
                      <img src={p.imagenUrl} alt={p.nombre} className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <span className="font-bold text-xs text-stone-900 block leading-tight">{p.nombre}</span>
                        <span className="text-[10px] text-stone-400 font-mono">${p.precio.toLocaleString('es-CO')} • {p.categoria}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleTogglePlato(p.id, p.nombre)}
                      className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition ${
                        p.disponible
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                      }`}
                    >
                      {p.disponible ? 'Disponible' : 'Agotado'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

