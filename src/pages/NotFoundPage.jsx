import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Utensils, ArrowRight, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="max-w-2xl mx-auto my-20 px-4 text-center">
      <div className="bg-white rounded-3xl p-8 sm:p-14 border border-stone-200 shadow-xl space-y-6 animate-in zoom-in-95 duration-200">
        
        {/* Icon Badge */}
        <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center mx-auto shadow-xs">
          <Compass className="w-8 h-8 text-amber-700" />
        </div>

        <div>
          <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-600 font-mono text-xs font-bold uppercase tracking-wider inline-block mb-3">
            Error 404 • No Encontrado
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
            Página No Encontrada
          </h1>
          <p className="text-sm text-stone-600 max-w-md mx-auto mt-2 leading-relaxed">
            Parece que la sección que estás buscando no existe en nuestra carta o fue movida de lugar.
          </p>
        </div>

        {/* Helpful Shortcuts */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/menu"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition"
          >
            <Utensils className="w-4 h-4" />
            <span>Explorar Menú</span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition"
          >
            <Home className="w-4 h-4" />
            <span>Volver al Inicio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

