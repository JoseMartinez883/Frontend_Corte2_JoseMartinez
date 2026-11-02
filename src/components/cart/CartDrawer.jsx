import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Utensils, CheckCircle2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { pedidoService } from '../../services/mockApiService';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    selectedMesa,
    setSelectedMesa,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    propinaSugerida,
    includeTip,
    setIncludeTip,
    total,
    triggerConfetti
  } = useCart();

  const { currentUser } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCartOpen) return null;

  const handleConfirmOrder = async () => {
    if (cartItems.length === 0) return;

    try {
      setIsSubmitting(true);

      const nuevoPedido = await pedidoService.create({
        idMesa: Number(selectedMesa),
        numeroMesa: Number(selectedMesa),
        clienteEmail: currentUser?.email || "cliente@restaurante.com",
        clienteNombre: currentUser?.nombre || "Comensal",
        items: cartItems.map(i => ({
          idPlato: i.idPlato,
          nombre: i.nombre,
          precioUnitario: i.precioUnitario,
          cantidad: i.cantidad,
          subtotal: i.subtotal,
          notas: i.notas || ""
        }))
      });

      triggerConfetti();
      toast.success(`¡Comanda enviada a cocina para la Mesa ${selectedMesa}!`);
      clearCart();
      setIsCartOpen(false);

      // Navigate to tracking
      navigate(`/tracking?pedido=${nuevoPedido.id}`);
    } catch (err) {
      toast.error(err.message || "Error al registrar pedido");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-stone-200 animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-lg text-stone-900 leading-tight">
                  Tu Pedido
                </h2>
                <p className="text-xs text-stone-500">
                  {cartItems.length} {cartItems.length === 1 ? 'plato seleccionado' : 'platos seleccionados'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {cartItems.length > 0 && (
                <button
                  onClick={clearCart}
                  title="Vaciar carrito"
                  className="p-2 text-stone-400 hover:text-red-700 transition rounded-lg hover:bg-stone-200/60"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-stone-400 hover:text-stone-700 transition rounded-lg hover:bg-stone-200/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Table Selector Box */}
          <div className="px-5 py-3 bg-amber-50/70 border-b border-amber-200/60 flex items-center justify-between">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wide flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5 text-amber-700" />
              Mesa Asignada:
            </span>
            <select
              value={selectedMesa}
              onChange={(e) => setSelectedMesa(Number(e.target.value))}
              className="bg-white border border-amber-300 text-stone-800 text-xs font-bold rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                <option key={n} value={n}>
                  Mesa {n} {n === 2 ? '(Activa)' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-stone-300" />
                </div>
                <h3 className="font-serif font-bold text-lg text-stone-700 mb-1">
                  Tu pedido está vacío
                </h3>
                <p className="text-xs text-stone-500 max-w-xs mb-6">
                  Explora nuestro menú artesanal y añade tus pastas, pizzas y postres favoritos.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold shadow-xs hover:bg-black transition"
                >
                  Ver Menú Digital
                </button>
              </div>
            ) : (
              cartItems.map(item => (
                <div
                  key={item.idPlato}
                  className="flex items-center gap-3.5 p-3 rounded-2xl border border-stone-200 bg-white shadow-xs hover:border-amber-200 transition"
                >
                  <img
                    src={item.imagenUrl}
                    alt={item.nombre}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-stone-900 truncate">
                      {item.nombre}
                    </h4>
                    <p className="text-xs text-stone-500 font-mono">
                      ${item.precioUnitario.toLocaleString('es-CO')}
                    </p>
                    {item.notas && (
                      <p className="text-[11px] text-amber-800 italic truncate mt-0.5">
                        "{item.notas}"
                      </p>
                    )}
                  </div>

                  {/* Quantity controls */}
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-lg border border-stone-200">
                      <button
                        onClick={() => updateQuantity(item.idPlato, item.cantidad - 1)}
                        className="p-1 rounded text-stone-600 hover:bg-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-stone-900 w-4 text-center">
                        {item.cantidad}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.idPlato, item.cantidad + 1)}
                        className="p-1 rounded text-stone-600 hover:bg-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="text-xs font-extrabold text-stone-900 font-mono">
                      ${item.subtotal.toLocaleString('es-CO')}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary (Slide image11.png & image14.png) */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-3">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal consumo:</span>
                  <span className="font-mono font-medium text-stone-900">
                    ${subtotal.toLocaleString('es-CO')}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={includeTip}
                      onChange={(e) => setIncludeTip(e.target.checked)}
                      className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4 border-stone-300"
                    />
                    <span>Propina sugerida voluntaria (10%):</span>
                  </label>
                  <span className="font-mono font-medium text-stone-900">
                    ${propinaSugerida.toLocaleString('es-CO')}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-200 flex items-baseline justify-between">
                <span className="font-bold text-sm text-stone-900 uppercase tracking-wide">
                  Total a Pagar
                </span>
                <span className="font-mono text-2xl font-black text-red-900">
                  ${total.toLocaleString('es-CO')}
                </span>
              </div>

              {/* Confirm Order Button */}
              <button
                onClick={handleConfirmOrder}
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-98 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-150 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Enviando comanda a cocina...</span>
                ) : (
                  <>
                    <span>Confirmar Pedido</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              
              <p className="text-[11px] text-stone-400 text-center">
                Se cargará automáticamente a la cuenta activa de la Mesa {selectedMesa}.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

