import React from 'react';
import { Plus, Clock, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

export default function DishCard({ plato, onSelectDetail }) {
  const { addToCart } = useCart();
  const toast = useToast();

  const handleAddQuick = (e) => {
    e.stopPropagation();
    if (!plato.disponible) {
      toast.warning("Este plato se encuentra temporalmente agotado.");
      return;
    }
    addToCart(plato, 1);
    toast.success(`¡${plato.nombre} agregado al pedido!`);
  };

  return (
    <div
      onClick={() => onSelectDetail(plato)}
      className="group bg-white rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer relative"
    >
      {/* Dish Image with Zoom Effect */}
      <div className="relative h-48 sm:h-52 overflow-hidden bg-stone-100">
        <img
          src={plato.imagenUrl}
          alt={plato.nombre}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>

        {/* Category & Status Badge */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase">
            {plato.categoria}
          </span>
          {plato.etiquetas?.[0] && (
            <span className="px-2.5 py-1 rounded-full bg-amber-500/90 backdrop-blur-md text-white text-[10px] font-bold tracking-wide flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              {plato.etiquetas[0]}
            </span>
          )}
        </div>

        {/* Availability Badge */}
        {!plato.disponible && (
          <div className="absolute inset-0 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center">
            <span className="px-3 py-1 rounded-lg bg-red-600 text-white text-xs font-bold uppercase tracking-wider shadow-md">
              Agotado
            </span>
          </div>
        )}

        {/* Preparation time badge */}
        <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-md text-stone-800 text-[11px] font-semibold flex items-center gap-1 shadow-xs">
          <Clock className="w-3 h-3 text-amber-700" />
          <span>{plato.tiempoPreparacionMinutos} min</span>
        </div>
      </div>

      {/* Content details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 group-hover:text-red-800 transition-colors line-clamp-1">
            {plato.nombre}
          </h3>
          <p className="text-xs text-stone-500 mt-1.5 line-clamp-2 leading-relaxed">
            {plato.descripcion}
          </p>
        </div>

        {/* Price & Action Button (Orange accent as in S011 mockups) */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-semibold leading-none">
              Precio COP
            </span>
            <span className="text-lg font-extrabold text-stone-900 font-mono">
              ${plato.precio.toLocaleString('es-CO')}
            </span>
          </div>

          <button
            onClick={handleAddQuick}
            disabled={!plato.disponible}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all duration-150 ${
              plato.disponible
                ? 'bg-amber-600 hover:bg-amber-700 text-white hover:shadow-md hover:scale-105 active:scale-95'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            }`}
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Agregar</span>
          </button>
        </div>
      </div>
    </div>
  );
}

