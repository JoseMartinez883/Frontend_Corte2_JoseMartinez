import React from 'react';
import { MapPin, Phone, Clock, Mail, Flame, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-10 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand with Official Logo */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.png"
                alt="Bella Ciao Logo"
                className="h-12 w-auto object-contain rounded-xl shadow-md p-1 bg-white/5 border border-stone-700/60"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white block">Bella Ciao</span>
                <span className="text-[10px] uppercase tracking-widest text-amber-500 font-semibold block">Cucina Tradizionale</span>
              </div>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed mb-4">
              Auténtica cocina italiana en el corazón de la ciudad. Masa madre fermentada 48 horas, pasta fresca hecha a mano y los mejores ingredientes importados de Italia.
            </p>
            <div className="flex gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-800/90 text-amber-400 text-xs font-semibold rounded-lg border border-stone-700">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Horno de Piedra</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-800/90 text-emerald-400 text-xs font-semibold rounded-lg border border-stone-700">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Artesanal</span>
              </span>
            </div>
          </div>

          {/* Col 2: Horarios */}
          <div>
            <h4 className="font-serif text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              Horario de Atención
            </h4>
            <ul className="text-sm space-y-2 text-stone-400">
              <li className="flex justify-between border-b border-stone-800 pb-1.5">
                <span>Martes – Jueves:</span>
                <span className="text-white font-medium">12:00 – 22:30</span>
              </li>
              <li className="flex justify-between border-b border-stone-800 pb-1.5">
                <span>Viernes – Sábado:</span>
                <span className="text-white font-medium">12:00 – 23:30</span>
              </li>
              <li className="flex justify-between border-b border-stone-800 pb-1.5">
                <span>Domingos & Festivos:</span>
                <span className="text-white font-medium">12:00 – 21:30</span>
              </li>
              <li className="flex justify-between text-rose-400 pt-1">
                <span>Lunes:</span>
                <span className="font-semibold">Cerrado por descanso</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Ubicación y Contacto */}
          <div>
            <h4 className="font-serif text-lg font-bold text-white mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-500" />
              Dónde Encontrarnos
            </h4>
            <ul className="text-sm space-y-3 text-stone-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Zona Gastronómica Gourmet, Cra 13 # 85-24, Bogotá D.C.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>+57 (601) 745-9200 / +57 315 888 1234</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>prenotazioni@bellaciao.com.co</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Proyecto DOSW */}
          <div>
            <h4 className="font-serif text-lg font-bold text-white mb-4">Proyecto Académico</h4>
            <div className="bg-stone-800/80 p-4 rounded-xl border border-stone-700/80 text-xs text-stone-400 space-y-2">
              <p className="font-semibold text-stone-200">Desarrollo y Operaciones de Software (DOSW)</p>
              <p>Segundo Corte — Restaurante Bella Ciao</p>
              <p className="text-amber-400 font-mono">José Alejandro Martínez Arias</p>
              <p className="text-[11px] text-stone-500">Cód: 1000104385 • Semestre 6</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Bella Ciao Ristorante Italiano. Todos los derechos reservados.</p>
          <p className="text-stone-400">
            Plataforma Gastronómica DOSW — Corte 2
          </p>
        </div>
      </div>
    </footer>
  );
}
