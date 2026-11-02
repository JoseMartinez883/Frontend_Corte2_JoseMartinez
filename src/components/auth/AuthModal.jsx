import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, ArrowRight, UserPlus, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { INITIAL_USERS } from '../../data/initialSeedData';

export default function AuthModal({ isOpen, onClose }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const toast = useToast();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (isRegister) {
        if (!nombre || !email || !password) {
          toast.error("Por favor completa todos los campos.");
          return;
        }
        await register(nombre, email, password);
        toast.success(`¡Cuenta creada con éxito! Bienvenido con rol CLIENTE.`);
      } else {
        await login(email, password);
        toast.success(`¡Bienvenido de nuevo!`);
      }
      onClose();
    } catch (err) {
      toast.error(err.message || "Error de autenticación");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (user) => {
    setEmail(user.email);
    setPassword('admin123');
    await login(user.email, 'password123');
    toast.success(`Iniciaste sesión como ${user.nombre} (${user.rol})`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-800 flex items-center justify-center text-amber-300">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold">
                {isRegister ? 'Registro de Cliente' : 'Acceso a la Plataforma'}
              </h2>
              <p className="text-xs text-stone-400">Acceso seguro a la plataforma gastronómica</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-stone-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-6">
          <button
            onClick={() => setIsRegister(false)}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition flex items-center gap-1.5 ${
              !isRegister ? 'border-amber-600 text-amber-900 bg-white' : 'border-transparent text-stone-500'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            Iniciar Sesión
          </button>
          <button
            onClick={() => setIsRegister(true)}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition flex items-center gap-1.5 ${
              isRegister ? 'border-amber-600 text-amber-900 bg-white' : 'border-transparent text-stone-500'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            Crear Cuenta
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-3.5">
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
                  placeholder="usuario@restaurante.com"
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
              <span>{loading ? 'Validando...' : isRegister ? 'Registrarse como Cliente' : 'Ingresar'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick presets for evaluation demo */}
          {!isRegister && (
            <div className="pt-4 border-t border-stone-100">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-2 text-center">
                Cuentas de Acceso Rápido para Demostración
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {INITIAL_USERS.map(u => (
                  <button
                    key={u.id}
                    onClick={() => handleQuickLogin(u)}
                    className="p-2 rounded-lg bg-stone-50 hover:bg-amber-50 border border-stone-200 text-left transition text-xs"
                  >
                    <p className="font-bold text-stone-800 leading-tight truncate">{u.nombre}</p>
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

