import React, { useState, useEffect } from 'react';
import { Star, MessageSquareQuote, Plus, Sparkles } from 'lucide-react';
import { resenaService } from '../../services/mockApiService';

export default function ReviewsSection({ onOpenCreateReview }) {
  const [resenas, setResenas] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await resenaService.getAll();
      setResenas(data);
    }
    load();
  }, []);

  const promedio = resenas.length
    ? (resenas.reduce((acc, r) => acc + r.calificacion, 0) / resenas.length).toFixed(1)
    : "5.0";

  return (
    <section className="py-16 bg-gradient-to-b from-stone-50 to-amber-50/40 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Social Proof & Testimonios</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Lo que Dicen Nuestros Comensales
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-sm font-bold text-stone-800">
                {promedio} de 5.0
              </span>
              <span className="text-xs text-stone-500">
                • ({resenas.length} opiniones verificadas)
              </span>
            </div>
          </div>

          <button
            onClick={onOpenCreateReview}
            className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Escribir una Reseña</span>
          </button>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resenas.map(r => (
            <div
              key={r.id}
              className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(r.calificacion)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-stone-400 font-medium">
                    {new Date(r.fecha).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <p className="text-sm text-stone-700 leading-relaxed italic mb-4">
                  "{r.comentario}"
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-red-100 text-red-900 font-bold text-xs flex items-center justify-center shrink-0">
                  {r.clienteNombre.charAt(0)}
                </div>
                <div className="truncate">
                  <h4 className="text-xs font-bold text-stone-900 truncate">{r.clienteNombre}</h4>
                  <span className="text-[10px] text-stone-400">Cliente Verificado</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

