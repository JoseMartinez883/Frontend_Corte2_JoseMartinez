import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { pedidoService } from '../../services/mockApiService';
import { CheckCircle2, Clock, ChefHat, Utensils, Star, ArrowLeft, RefreshCw } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';

export default function OrderTracker({ onOpenReview }) {
  const [searchParams] = useSearchParams();
  const pedidoIdParam = searchParams.get('pedido');
  const [pedidos, setPedidos] = useState([]);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const { currentUser, isChef, isMesero, isAdmin } = useAuth();
  const isStaff = isChef || isMesero || isAdmin;

  const loadPedidos = async () => {
    try {
      setLoading(true);
      const data = await pedidoService.getAll();
      setPedidos(data);
      if (pedidoIdParam) {
        const found = data.find(p => p.id === pedidoIdParam);
        setSelectedPedido(found || data[0] || null);
      } else {
        setSelectedPedido(data[0] || null);
      }
    } catch (err) {
      toast.error("Error al cargar pedidos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPedidos();
  }, [pedidoIdParam]);

  // Status mapping
  const steps = [
    { key: 'PENDIENTE', label: 'Confirmado', icon: CheckCircle2, desc: 'Comanda registrada en el sistema' },
    { key: 'EN_PREPARACION', label: 'En Preparación', icon: ChefHat, desc: 'Chef horneando en horno de piedra' },
    { key: 'LISTO', label: 'Listo para Sala', icon: Clock, desc: 'Platos emplatados para servir' },
    { key: 'ENTREGADO', label: 'Entregado a Mesa', icon: Utensils, desc: '¡Buen provecho!' },
  ];

  const getStepIndex = (estado) => {
    switch (estado) {
      case 'PENDIENTE': return 0;
      case 'EN_PREPARACION': return 1;
      case 'LISTO': return 2;
      case 'ENTREGADO': return 3;
      default: return 0;
    }
  };

  const currentStep = selectedPedido ? getStepIndex(selectedPedido.estado) : 0;

  // Simulator to advance state for demo video!
  const handleAdvanceStep = async () => {
    if (!selectedPedido) return;
    const nextStates = ['PENDIENTE', 'EN_PREPARACION', 'LISTO', 'ENTREGADO'];
    const nextIdx = Math.min(3, currentStep + 1);
    const updated = await pedidoService.updateEstado(selectedPedido.id, nextStates[nextIdx]);
    setSelectedPedido(updated);
    toast.success(`Estado actualizado a: ${nextStates[nextIdx]}`);
    loadPedidos();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <Link
            to="/menu"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-red-800 mb-2 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Volver al Menú
          </Link>
          <h1 className="font-serif text-3xl font-bold text-stone-900">
            Seguimiento de Pedido en Vivo
          </h1>
          <p className="text-sm text-stone-500">
            Monitorea el progreso de tu comanda en cocina y sala en tiempo real.
          </p>
        </div>

        <button
          onClick={loadPedidos}
          className="p-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 transition flex items-center gap-2 text-xs font-semibold"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Actualizar</span>
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-stone-400">Cargando estado del pedido...</div>
      ) : !selectedPedido ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-stone-200 shadow-xs">
          <Utensils className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h3 className="font-serif text-lg font-bold text-stone-800">No hay pedidos activos</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto mb-5">
            Realiza tu primer pedido desde el menú digital para ver el estado de preparación.
          </p>
          <Link
            to="/menu"
            className="px-5 py-2.5 rounded-xl bg-red-800 text-white text-xs font-bold"
          >
            Ir al Menú
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* Main Stepper Card (Exact to S011 slides image11.png & image14.png) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-md">
            
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-stone-100">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 block">
                  Comanda en Curso
                </span>
                <h2 className="text-xl font-bold text-stone-900">
                  Mesa {selectedPedido.numeroMesa || selectedPedido.idMesa}
                </h2>
                <p className="text-xs text-stone-500">
                  Comensal: {selectedPedido.clienteNombre}
                </p>
              </div>

              {/* Status pill badge */}
              <div className="text-right">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 inline-block">
                  {selectedPedido.estado}
                </span>
                <p className="text-[11px] text-stone-400 mt-1">
                  Hora: {new Date(selectedPedido.fechaCreacion).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>

            {/* Stepper Visual Bar */}
            <div className="py-8">
              <div className="relative">
                {/* Connecting Line */}
                <div className="absolute top-5 left-6 right-6 h-1 bg-stone-200 -z-0">
                  <div
                    className="h-full bg-amber-600 transition-all duration-500"
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                  ></div>
                </div>

                {/* Steps Nodes */}
                <div className="relative z-10 flex justify-between">
                  {steps.map((st, index) => {
                    const isCompleted = index <= currentStep;
                    const isCurrent = index === currentStep;
                    const Icon = st.icon;

                    return (
                      <div key={st.key} className="flex flex-col items-center text-center max-w-[90px] sm:max-w-[120px]">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                            isCompleted
                              ? 'bg-amber-600 border-amber-600 text-white shadow-md scale-110'
                              : 'bg-white border-stone-300 text-stone-400'
                          } ${isCurrent ? 'ring-4 ring-amber-100' : ''}`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className={`text-xs font-bold mt-2.5 ${isCompleted ? 'text-stone-900' : 'text-stone-400'}`}>
                          {st.label}
                        </span>
                        <span className="text-[10px] text-stone-400 hidden sm:block mt-0.5 leading-tight">
                          {st.desc}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 bg-stone-50/80 -mx-6 -mb-6 p-4 rounded-b-3xl">
              {isStaff ? (
                <>
                  <span className="text-xs text-stone-600 font-semibold flex items-center gap-1.5">
                    <ChefHat className="w-4 h-4 text-amber-700" />
                    Control Operativo ({currentUser?.rol}):
                  </span>
                  <div className="flex gap-2">
                    {currentStep < 3 ? (
                      <button
                        onClick={handleAdvanceStep}
                        className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs transition"
                      >
                        Avanzar a: {steps[currentStep + 1].label}
                      </button>
                    ) : (
                      <button
                        onClick={() => onOpenReview(selectedPedido)}
                        className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5"
                      >
                        <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                        <span>Calificar Experiencia</span>
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <span className="text-xs text-stone-500">
                    {currentStep < 3 
                      ? "Tu comanda está siendo atendida en cocina. Te notificaremos cuando llegue a tu mesa." 
                      : "¡Tu comanda ha sido entregada en la mesa! Esperamos que disfrutes de tu comida."}
                  </span>
                  {currentStep === 3 && (
                    <button
                      onClick={() => onOpenReview(selectedPedido)}
                      className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5"
                    >
                      <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                      <span>Calificar Experiencia</span>
                    </button>
                  )}
                </>
              )}
            </div>

          </div>

          {/* Details of items in this order */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs">
            <h3 className="font-serif font-bold text-base text-stone-900 mb-4">
              Ítems Solicitados en esta Comanda
            </h3>
            <div className="divide-y divide-stone-100">
              {selectedPedido.items.map((it, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between text-sm">
                  <div>
                    <span className="font-semibold text-stone-800">{it.nombre}</span>
                    <span className="text-xs text-stone-400 ml-2">x{it.cantidad}</span>
                  </div>
                  <span className="font-mono font-bold text-stone-900">
                    ${it.subtotal.toLocaleString('es-CO')}
                  </span>
                </div>
              ))}
              <div className="pt-3 flex justify-between font-bold text-base text-stone-900">
                <span>Total Comanda:</span>
                <span className="text-red-900 font-mono">
                  ${selectedPedido.total.toLocaleString('es-CO')}
                </span>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

