import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, UserCheck, Utensils, Award, LogOut, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UserSwitchBar() {
  const { currentUser, switchUserRole, logout, setIsAuthModalOpen } = useAuth();

  const roles = [
    { key: 'CLIENTE', label: 'Cliente (Camila)', icon: UserCheck, color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    { key: 'MESERO', label: 'Mesero (Giuseppe)', icon: Utensils, color: 'bg-blue-100 text-blue-800 border-blue-300' },
    { key: 'CHEF', label: 'Chef (Marco)', icon: Award, color: 'bg-amber-100 text-amber-800 border-amber-300' },
    { key: 'ADMIN', label: 'Admin (Alessandro)', icon: ShieldCheck, color: 'bg-rose-100 text-rose-800 border-rose-300' },
  ];

  return (
    <div className="bg-stone-900 text-stone-200 text-xs py-2 px-4 border-b border-stone-800 flex flex-wrap items-center justify-between gap-2.5">
      <div className="flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span className="font-semibold text-stone-200">Perfiles de Acceso:</span>
        <span className="text-stone-400 hidden sm:inline">Selecciona un usuario para probar vistas y permisos:</span>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
        {roles.map(r => {
          const Icon = r.icon;
          const isActive = currentUser?.rol === r.key;
          return (
            <button
              key={r.key}
              onClick={() => switchUserRole(r.key)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all border ${
                isActive
                  ? `${r.color} shadow-sm scale-105 font-bold`
                  : 'bg-stone-800/90 text-stone-400 border-stone-700 hover:bg-stone-700 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{r.label}</span>
            </button>
          );
        })}

        {currentUser ? (
          <button
            onClick={logout}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-stone-800 text-stone-400 border border-stone-700 hover:bg-rose-950/80 hover:text-rose-300 hover:border-rose-800 transition ml-1"
            title="Cerrar sesión actual para probar modo invitado"
          >
            <LogOut className="w-3 h-3" />
            <span>Cerrar Sesión</span>
          </button>
        ) : (
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-xs transition ml-1"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Iniciar Sesión</span>
          </button>
        )}
      </div>
    </div>
  );
}
