import React, { useState, useEffect } from 'react';
import { cuentaService } from '../../services/mockApiService';
import { X, Receipt, CheckCircle2, CreditCard, DollarSign, Smartphone, ArrowRight } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import confetti from 'canvas-confetti';

export default function BillingModal({ idMesa, onClose, onPagoCompletado }) {
  const [cuenta, setCuenta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [metodoPago, setMetodoPago] = useState('EFECTIVO');
  const [includeTip, setIncludeTip] = useState(true);
  const [montoRecibido, setMontoRecibido] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();

  useEffect(() => {
    async function fetchCuenta() {
      if (!idMesa) return;
      try {
        setLoading(true);
        const data = await cuentaService.getActivaByMesa(idMesa);
        setCuenta(data);
      } catch (err) {
        toast.error("Error al cargar la cuenta.");
      } finally {
        setLoading(false);
      }
    }
    fetchCuenta();
  }, [idMesa]);

  if (!idMesa) return null;

  const subtotal = cuenta ? cuenta.total : 0;
  const propina = includeTip ? Math.round(subtotal * 0.10) : 0;
  const totalPagar = subtotal + propina;
  const cambio = montoRecibido ? Math.max(0, Number(montoRecibido) - totalPagar) : 0;

  const handleProcesarPago = async () => {
    try {
      setSubmitting(true);
      await cuentaService.registrarPago(idMesa, {
        metodoPago,
        propinaIncluida: includeTip,
        montoRecibido: Number(montoRecibido) || totalPagar
      });

      try {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } catch (e) {}

      toast.success(`¡Cuenta de Mesa ${idMesa} liquidada con éxito por $${totalPagar.toLocaleString('es-CO')}!`);
      onPagoCompletado();
      onClose();
    } catch (err) {
      toast.error(err.message || "Error al procesar el pago");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-800 flex items-center justify-center text-amber-300">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold">Liquidación de Cuenta</h2>
              <p className="text-xs text-stone-400">Mesa #{idMesa} • Restaurante Bella Ciao</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-stone-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <div className="p-10 text-center text-stone-400">Cargando datos de facturación...</div>
        ) : !cuenta ? (
          <div className="p-8 text-center text-stone-500">
            <p className="mb-4">No se encontró una cuenta activa en esta mesa.</p>
            <button onClick={onClose} className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold">
              Cerrar
            </button>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            
            {/* Items Breakdown */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2.5">
                Desglose de Consumo
              </h4>
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80 max-h-44 overflow-y-auto space-y-2 text-xs">
                {cuenta.items && cuenta.items.length > 0 ? (
                  cuenta.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between items-center text-stone-700">
                      <span>{it.descripcion}</span>
                      <span className="font-mono font-bold text-stone-900">
                        ${it.subtotal.toLocaleString('es-CO')}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-stone-400 italic text-center py-2">
                    Cuenta abierta sin consumo acumulado aún ($0).
                  </p>
                )}
              </div>
            </div>

            {/* Calculations & Tip */}
            <div className="space-y-2 pt-2 border-t border-stone-100 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal alimentos y bebidas:</span>
                <span className="font-mono font-medium text-stone-900">
                  ${subtotal.toLocaleString('es-CO')}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={includeTip}
                    onChange={(e) => setIncludeTip(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                  />
                  <span>Propina sugerida voluntaria (10%):</span>
                </label>
                <span className="font-mono font-medium text-stone-900">
                  ${propina.toLocaleString('es-CO')}
                </span>
              </div>

              <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline font-bold text-base text-stone-900">
                <span>Total a Liquidar:</span>
                <span className="font-mono text-2xl text-red-900 font-black">
                  ${totalPagar.toLocaleString('es-CO')}
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-2">
                Método de Pago
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'EFECTIVO', label: 'Efectivo', icon: DollarSign },
                  { key: 'TARJETA_CREDITO', label: 'Tarjeta', icon: CreditCard },
                  { key: 'TRANSFERENCIA', label: 'Transferencia', icon: Smartphone },
                ].map(m => {
                  const Icon = m.icon;
                  const isSel = metodoPago === m.key;
                  return (
                    <button
                      key={m.key}
                      onClick={() => setMetodoPago(m.key)}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition ${
                        isSel
                          ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-xs ring-2 ring-amber-500/20'
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-amber-700" />
                      <span>{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Cash Calculator if Efectivo */}
            {metodoPago === 'EFECTIVO' && (
              <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-600 font-semibold">Monto recibido del cliente:</span>
                  <input
                    type="number"
                    placeholder="Ej: 150000"
                    value={montoRecibido}
                    onChange={(e) => setMontoRecibido(e.target.value)}
                    className="w-32 px-2.5 py-1 text-right font-mono font-bold text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                {Number(montoRecibido) >= totalPagar && (
                  <div className="flex justify-between items-center text-xs font-bold text-emerald-800 pt-1 border-t border-amber-200">
                    <span>Cambio / Vueltas:</span>
                    <span className="font-mono text-sm">${cambio.toLocaleString('es-CO')}</span>
                  </div>
                )}
              </div>
            )}

            {/* Submit Action */}
            <button
              onClick={handleProcesarPago}
              disabled={submitting}
              className="w-full py-3.5 px-6 rounded-xl bg-red-800 hover:bg-red-900 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5 text-amber-300" />
              <span>{submitting ? 'Procesando pago...' : 'Registrar Pago y Cerrar Mesa'}</span>
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

