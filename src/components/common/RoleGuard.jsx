import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert, ArrowRight, Lock, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Componente de Seguridad RBAC (Role-Based Access Control)
 * Emula la respuesta 403 Forbidden interceptada por Spring Security (@PreAuthorize).
 */
export default function RoleGuard({ allowedRoles = [], children }) {
  const { currentUser, switchUserRole } = useAuth();
  const currentRole = currentUser?.rol || 'ANONIMO';

  const isAllowed = allowedRoles.includes(currentRole);

  if (isAllowed) {
    return children;
  }

  // Si no está autorizado, mostrar pantalla 403 Forbidden profesional
  return (
    <div className="max-w-2xl mx-auto my-16 px-4">
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden text-center p-8 sm:p-12 animate-in zoom-in-95 duration-200">
        
        {/* Security Badge */}
        <div className="w-16 h-16 rounded-2xl bg-rose-100 border border-rose-200 text-rose-700 flex items-center justify-center mx-auto mb-6 shadow-xs">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <span className="px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono font-bold tracking-wider uppercase inline-block mb-3">
          Acceso Restringido • 403
        </span>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
          Permisos Insuficientes
        </h2>

        <p className="text-sm text-stone-600 mb-6 leading-relaxed max-w-lg mx-auto">
          Esta vista está reservada exclusivamente para el personal autorizado del restaurante con rol:
        </p>

        {/* Allowed Roles Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {allowedRoles.map((role) => (
            <button
              key={role}
              onClick={() => switchUserRole(role)}
              className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold transition flex items-center gap-1.5 group shadow-xs"
              title={`Hacer clic para cambiar a rol ${role}`}
            >
              <RotateCcw className="w-3 h-3 text-amber-700 group-hover:rotate-180 transition-transform duration-300" />
              <span>Cambiar a {role}</span>
            </button>
          ))}
        </div>

        <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 mb-8 max-w-md mx-auto text-xs text-stone-600">
          <p>
            <strong className="text-stone-800">Tu rol actual en sesión:</strong>{' '}
            <span className="font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              {currentRole}
            </span>
          </p>
          <p className="mt-1 text-stone-500">
            Puedes utilizar los botones de arriba o la barra superior para alternar de perfil instantáneamente.
          </p>
        </div>

        {/* Action Link */}
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-900 hover:bg-black text-white text-sm font-semibold shadow-md transition"
        >
          <span>Ir al Menú Digital</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

