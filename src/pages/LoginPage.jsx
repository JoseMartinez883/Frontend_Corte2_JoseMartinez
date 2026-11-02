import React, { useState } from 'react';
import { Lock, Mail, User, ArrowRight, UserPlus, LogIn, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { INITIAL_USERS } from '../data/initialSeedData';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(false);

  const { currentUser, login, register, logout, switchUserRole } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (isRegister) {
        if (!nombre || !email || !password) {
          toast.error("Por favor completa todos los campos requeridos.");
          return;
        }
        await register(nombre, email, password);
        toast.success("¡Registro completado! Bienvenido a Bella Ciao.");
      } else {
        await login(email, password);
        toast.success("¡Sesión iniciada con éxito!");
      }
      navigate('/menu');
    } catch (err) {
      toast.error(err.message || "Error al autenticar credenciales");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickPreset = async (u) => {
    await login(u.email, 'admin123');
    toast.success(`Iniciaste sesión como ${u.nombre} (${u.rol})`);
    navigate('/menu');
  };

  if (currentUser) {
    return (
      <div className="max-w-md mx-auto my-16 px-4">
        <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full overflow-hidden mx-auto border-2 border-amber-400 shadow-md">
            <img
              src={currentUser.avatar}
              alt={currentUser.nombre}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';
              }}
            />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              {currentUser.nombre}
            </h2>
            <p className="text-xs text-amber-800 font-bold uppercase tracking-wider mt-1">
              Rol Activo: {currentUser.rol}
            </p>
            <p className="text-xs text-stone-500 mt-1">{currentUser.email}</p>
          </div>

          <div className="pt-4 border-t border-stone-100 flex flex-col gap-2.5">
            <Link
              to="/menu"
              className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition"
            >
              Ir al Menú Digital
            </Link>
            <button
              onClick={logout}
              className="w-full py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs transition"
            >
              Cerrar Sesión Actual
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto my-12 px-4">
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-8 bg-stone-900 text-white text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-3">
            <Lock className="w-7 h-7 text-amber-400" />
          </div>
          <h2 className="font-serif text-2xl font-bold">
            {isRegister ? 'Crear Cuenta de Cliente' : 'Iniciar Sesión'}
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Plataforma Gastronómica Bella Ciao
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-stone-200 bg-stone-50">
          <button
            onClick={() => setIsRegister(false)}
            className={`flex-1 py-3 text-xs font-bold border-b-2 transition flex items-center justify-center gap-1.5 ${
              !isRegister ? 'border-amber-600 text-amber-900 bg-white' : 'border-transparent text-stone-500'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Acceso</span>
          </button>
          <button
            onClick={() => setIsRegister(true)}
            className={`flex-1 py-3 text-xs font-bold border-b-2 transition flex items-center justify-center gap-1.5 ${
              isRegister ? 'border-amber-600 text-amber-900 bg-white' : 'border-transparent text-stone-500'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Registro</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Nombre Completo</label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre y apellido"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Correo Electrónico</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="ej: cliente@restaurante.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Contraseña</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Validando...' : isRegister ? 'Crear Cuenta de Cliente' : 'Iniciar Sesión'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick preset credentials */}
          {!isRegister && (
            <div className="pt-5 border-t border-stone-100">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-2.5 text-center">
                Cuentas de Acceso Rápido
              </span>
              <div className="grid grid-cols-2 gap-2">
                {INITIAL_USERS.map(u => (
                  <button
                    key={u.id}
                    onClick={() => handleQuickPreset(u)}
                    className="p-2.5 rounded-xl bg-stone-50 hover:bg-amber-50/80 border border-stone-200 text-left transition"
                  >
                    <p className="font-bold text-xs text-stone-800 leading-tight truncate">{u.nombre}</p>
                    <span className="text-[10px] text-amber-800 font-semibold uppercase">{u.rol}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

