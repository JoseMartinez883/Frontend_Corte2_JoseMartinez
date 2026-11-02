import React, { useState, useEffect } from 'react';
import { pedidoService } from '../../services/mockApiService';
import { ChefHat, Clock, CheckCircle2, Utensils, AlertCircle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function KitchenOrdersBoard() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const loadPedidos = async () => {
    try {
      setLoading(true);
      const data = await pedidoService.getAll();
      setPedidos(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPedidos();
  }, []);

  const handleChangeEstado = async (id, nuevoEstado) => {
    await pedidoService.updateEstado(id, nuevoEstado);
    toast.success(`Comanda actualizada a ${nuevoEstado}`);
    loadPedidos();
  };

  const getCol = (estado) => pedidos.filter(p => p.estado === estado);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800 flex items-center gap-1.5">
            <ChefHat className="w-4 h-4 text-amber-700" />
            Pantalla de Cocina / KDS
          </span>
          <h1 className="font-serif text-3xl font-bold text-stone-900">
            Tablero de Comandas en Vivo
          </h1>
        </div>
        <button
          onClick={loadPedidos}
          className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold"
        >
          Refrescar Comandas
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Col 1: Pendientes */}
        <div className="bg-stone-100/70 rounded-3xl p-4 border border-stone-200 flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-200">
            <h3 className="font-bold text-sm text-stone-800 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              Pendientes ({getCol('PENDIENTE').length})
            </h3>
          </div>
          <div className="space-y-3 flex-1 overflow-y-auto">
            {getCol('PENDIENTE').map(p => (
              <div key={p.id} className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-stone-900 text-sm">Mesa #{p.numeroMesa || p.idMesa}</span>
                  <span className="text-[10px] text-stone-400 font-mono">#{p.id.slice(0, 6)}</span>
                </div>
                <div className="text-xs space-y-1 text-stone-600">
                  {p.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>{it.cantidad}x {it.nombre}</span>
                      {it.notas && <span className="text-amber-800 italic text-[10px]">"{it.notas}"</span>}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => handleChangeEstado(p.id, 'EN_PREPARACION')}
                  className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition"
                >
                  Cocinar Comanda
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Col 2: En Preparación */}
        <div className="bg-amber-50/50 rounded-3xl p-4 border border-amber-200 flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-amber-200">
            <h3 className="font-bold text-sm text-amber-950 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></span>
              En Preparación ({getCol('EN_PREPARACION').length})
            </h3>
          </div>
          <div className="space-y-3 flex-1 overflow-y-auto">
            {getCol('EN_PREPARACION').map(p => (
              <div key={p.id} className="bg-white p-4 rounded-2xl border border-amber-200 shadow-xs space-y-3">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-stone-900 text-sm">Mesa #{p.numeroMesa || p.idMesa}</span>
                  <span className="text-[10px] text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded">
                    En Horno
                  </span>
                </div>
                <div className="text-xs space-y-1 text-stone-600">
                  {p.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span className="font-medium text-stone-800">{it.cantidad}x {it.nombre}</span>
                      {it.notas && <span className="text-amber-800 italic text-[10px]">"{it.notas}"</span>}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => handleChangeEstado(p.id, 'LISTO')}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Emplatar y Marcar Listo</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Col 3: Listo en Sala */}
        <div className="bg-emerald-50/50 rounded-3xl p-4 border border-emerald-200 flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-200">
            <h3 className="font-bold text-sm text-emerald-950 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              Listo para Servir ({getCol('LISTO').length})
            </h3>
          </div>
          <div className="space-y-3 flex-1 overflow-y-auto">
            {getCol('LISTO').map(p => (
              <div key={p.id} className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-xs space-y-3">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-stone-900 text-sm">Mesa #{p.numeroMesa || p.idMesa}</span>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    Esperando Mesero
                  </span>
                </div>
                <div className="text-xs space-y-1 text-stone-600">
                  {p.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>{it.cantidad}x {it.nombre}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => handleChangeEstado(p.id, 'ENTREGADO')}
                  className="w-full py-2 bg-stone-900 hover:bg-black text-white rounded-xl text-xs font-bold transition"
                >
                  Entregado a Mesa
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

