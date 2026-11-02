import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, Sparkles, ChefHat, Clock } from 'lucide-react';

export default function Hero({ onOpenReservation }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/70 via-stone-50 to-white pt-10 pb-20 border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/80 border border-red-200 text-red-900 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-red-700" />
              <span>Auténtica Tradición Napolitana & Romana</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.15]">
              El sabor italiano que <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-800 via-amber-700 to-amber-900 underline decoration-amber-300 decoration-wavy decoration-2">
                te hace volver
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed">
              Masa madre fermentada durante 48 horas, pasta artesanal hecha al momento y salsa pomodoro San Marzano. Disfruta de la mejor experiencia gastronómica en sala o pide a tu mesa.
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/menu"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-800 to-red-900 hover:from-red-900 hover:to-stone-900 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 group"
              >
                <span>Explorar Menú</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={onOpenReservation}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-stone-100 text-stone-800 font-semibold text-sm border border-stone-300 shadow-xs transition-all duration-150 flex items-center gap-2"
              >
                <span>Reservar Mesa</span>
              </button>
            </div>

            {/* Key Value Badges (Slide image14.png) */}
            <div className="pt-8 grid grid-cols-3 gap-4 border-t border-stone-200 max-w-lg">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Horno de Leña</h4>
                  <p className="text-[11px] text-stone-500">Piedra volcánica</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
                  <ChefHat className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Pasta Fresca</h4>
                  <p className="text-[11px] text-stone-500">Hecha a mano</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-800 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Al Momento</h4>
                  <p className="text-[11px] text-stone-500">15 min comanda</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Hero Image Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Back glow decoration */}
              <div className="absolute -top-6 -left-6 w-72 h-72 bg-amber-300/30 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-red-400/20 rounded-full blur-3xl pointer-events-none"></div>

              {/* Main Dish Image Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <img
                  src="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&auto=format&fit=crop&q=80"
                  alt="Pizza Margherita Bella Ciao"
                  className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80';
                  }}
                />
                
                {/* Floating Dish Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-stone-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">
                      Recomendado del Chef
                    </span>
                    <h3 className="font-serif font-bold text-stone-900 text-base">Pizza Margherita di Bufala</h3>
                    <p className="text-xs text-stone-500">Pomodoro San Marzano & Mozzarella DOP</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-red-800 font-mono block">$36.000</span>
                    <Link
                      to="/menu"
                      className="text-[11px] font-semibold text-amber-800 hover:text-amber-900 underline inline-block"
                    >
                      Ver en menú
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

