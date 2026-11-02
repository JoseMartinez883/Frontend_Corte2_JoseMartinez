import React, { useState } from 'react';
import { X, Plus, Minus, Clock, Check, Sparkles, ChefHat, Layers, Utensils } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

export default function DishDetailModal({ plato, onClose }) {
  const [cantidad, setCantidad] = useState(1);
  const [notas, setNotas] = useState('');
  
  // Customization options for Pizzas and Pastas (Valor central del negocio en Backend)
  const isPizza = plato?.categoria === 'PIZZA';
  const isPasta = plato?.categoria === 'PASTA';

  const [tipoMasa, setTipoMasa] = useState(isPizza ? 'Masa Fermentada 48h (Tradicional)' : '');
  const [tipoPasta, setTipoPasta] = useState(isPasta ? 'Fettuccine al Huevo Artesanal' : '');
  const [coccion, setCoccion] = useState(isPasta ? 'Al Dente Italiano' : '');
  const [extraQueso, setExtraQueso] = useState(false);
  const [extraTopping, setExtraTopping] = useState(false);

  const { addToCart } = useCart();
  const toast = useToast();

  if (!plato) return null;

  const extraCost = (extraQueso ? 4000 : 0) + (extraTopping ? 3000 : 0);
  const unitPrice = plato.precio + extraCost;
  const totalPrice = unitPrice * cantidad;

  const handleAdd = () => {
    // Build comprehensive customization summary
    const customizations = [];
    if (isPizza && tipoMasa) customizations.push(`Masa: ${tipoMasa}`);
    if (isPasta && tipoPasta) customizations.push(`Pasta: ${tipoPasta}`);
    if (isPasta && coccion) customizations.push(`Cocción: ${coccion}`);
    if (extraQueso) customizations.push('+ Extra Mozzarella/Parmesano');
    if (extraTopping) customizations.push(isPizza ? '+ Champiñones Portobello' : '+ Trufa / Salvia');
    if (notas.trim()) customizations.push(`Nota: "${notas.trim()}"`);

    const summaryNotes = customizations.join(' • ');

    const customizedPlato = {
      ...plato,
      precio: unitPrice
    };

    addToCart(customizedPlato, cantidad, summaryNotes);
    toast.success(`Se agregaron ${cantidad}x ${plato.nombre} al pedido.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 relative animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image */}
        <div className="relative h-56 sm:h-64 overflow-hidden bg-stone-100 shrink-0">
          <img
            src={plato.imagenUrl}
            alt={plato.nombre}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
          
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <span className="px-2.5 py-1 rounded-full bg-amber-500 text-white text-[11px] font-bold uppercase tracking-wider inline-block mb-1.5 shadow-sm">
                {plato.categoria}
              </span>
              <h2 className="font-serif text-2xl font-bold text-white leading-tight">
                {plato.nombre}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-xl font-extrabold text-amber-300 font-mono">
                ${unitPrice.toLocaleString('es-CO')}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          <p className="text-sm text-stone-600 leading-relaxed">
            {plato.descripcion}
          </p>

          {/* Ingredientes destacados */}
          {plato.ingredientes && plato.ingredientes.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2 flex items-center gap-1.5">
                <ChefHat className="w-3.5 h-3.5 text-amber-700" />
                Ingredientes Principales
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {plato.ingredientes.map((ing, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 text-xs font-medium border border-stone-200/80"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Personalización de Pizza (Masa y Toppings) */}
          {isPizza && (
            <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200/70 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-800" />
                Personalización Artesanal de Pizza
              </h4>

              <div>
                <label className="text-[11px] font-bold uppercase text-stone-600 block mb-1">
                  Tipo de Masa:
                </label>
                <select
                  value={tipoMasa}
                  onChange={(e) => setTipoMasa(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-amber-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Masa Fermentada 48h (Tradicional)">Masa Fermentada 48h (Tradicional Napolitana)</option>
                  <option value="Masa Delgada Crujiente (Romana)">Masa Delgada y Crujiente (Romana)</option>
                  <option value="Masa Rústica de Trigo Integral">Masa Rústica de Trigo Integral</option>
                </select>
              </div>

              <div className="pt-2 border-t border-amber-200/50 space-y-2">
                <label className="text-[11px] font-bold uppercase text-stone-600 block">
                  Adicionales / Toppings:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center gap-2 p-2 rounded-xl bg-white border border-stone-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={extraQueso}
                      onChange={(e) => setExtraQueso(e.target.checked)}
                      className="rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span>Extra Mozzarella (+ $4.000)</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-xl bg-white border border-stone-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={extraTopping}
                      onChange={(e) => setExtraTopping(e.target.checked)}
                      className="rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span>Champiñones Portobello (+ $3.000)</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Personalización de Pasta (Formato y Cocción) */}
          {isPasta && (
            <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200/70 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-amber-800" />
                Personalización de Pasta Fresca
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold uppercase text-stone-600 block mb-1">
                    Tipo de Pasta:
                  </label>
                  <select
                    value={tipoPasta}
                    onChange={(e) => setTipoPasta(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-amber-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Fettuccine al Huevo Artesanal">Fettuccine al Huevo Artesanal</option>
                    <option value="Spaghetti alla Chitarra">Spaghetti alla Chitarra</option>
                    <option value="Penne Rigate">Penne Rigate</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-stone-600 block mb-1">
                    Punto de Cocción:
                  </label>
                  <select
                    value={coccion}
                    onChange={(e) => setCoccion(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-amber-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Al Dente Italiano">Al Dente Italiano (Recomendado)</option>
                    <option value="Bien Cocida">Bien Cocida</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 border-t border-amber-200/50 space-y-2">
                <label className="text-[11px] font-bold uppercase text-stone-600 block">
                  Toppings Gourmet:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center gap-2 p-2 rounded-xl bg-white border border-stone-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={extraQueso}
                      onChange={(e) => setExtraQueso(e.target.checked)}
                      className="rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span>Parmesano 24m Extra (+ $4.000)</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-xl bg-white border border-stone-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={extraTopping}
                      onChange={(e) => setExtraTopping(e.target.checked)}
                      className="rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span>Aceite de Trufa Negra (+ $3.000)</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Notas personalizadas */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
              Instrucciones especiales para cocina (Opcional)
            </label>
            <input
              type="text"
              placeholder="Ej: Sin cebolla, salsa aparte, alérgico a nueces..."
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition"
            />
          </div>

          {/* Cantidad y botón Agregar */}
          <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-4">
            {/* Quantity Selector */}
            <div className="flex items-center gap-3 bg-stone-100 px-3 py-1.5 rounded-xl border border-stone-200">
              <button
                onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                className="p-1.5 rounded-lg hover:bg-white text-stone-700 transition"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-bold text-stone-900 w-6 text-center text-sm">
                {cantidad}
              </span>
              <button
                onClick={() => setCantidad(cantidad + 1)}
                className="p-1.5 rounded-lg hover:bg-white text-stone-700 transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Submit button */}
            <button
              onClick={handleAdd}
              className="flex-1 py-3 px-5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
            >
              <span>Agregar al pedido</span>
              <span className="font-mono font-medium">
                • ${totalPrice.toLocaleString('es-CO')}
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
