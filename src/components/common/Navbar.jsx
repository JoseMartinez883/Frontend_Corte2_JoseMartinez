import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { ShoppingBag, UtensilsCrossed, Calendar, Car, LayoutDashboard, User, LogOut, Menu, X, ChefHat, LogIn } from 'lucide-react';

export default function Navbar({ onOpenAuth, onOpenReservation, onOpenParking }) {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { currentUser, logout, isAdmin, isChef, isMesero } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
      {/* Top flag stripe */}
      <div className="h-1 w-full flex">
        <div className="w-1/3 bg-[#009246]"></div>
        <div className="w-1/3 bg-[#f1f2f1]"></div>
        <div className="w-1/3 bg-[#ce2b37]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="Bella Ciao Logo"
              className="h-11 w-auto object-contain rounded-xl shadow-xs group-hover:scale-105 transition-transform"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-stone-900 block leading-tight">
                Bella Ciao
              </span>
              <span className="text-[10px] uppercase tracking-widest text-amber-800 font-semibold block">
                Cucina Italiana Artigianale
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive('/') ? 'text-red-800 bg-red-50 font-semibold' : 'text-stone-700 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              Inicio
            </Link>
            <Link
              to="/menu"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive('/menu') ? 'text-red-800 bg-red-50 font-semibold' : 'text-stone-700 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              Menú Digital
            </Link>

            {/* Role specific: Mesas (Mesero, Admin) */}
            {(isMesero || isAdmin) && (
              <Link
                to="/mesas"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                  isActive('/mesas') ? 'text-blue-800 bg-blue-50 font-semibold' : 'text-stone-700 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                Salón & Mesas
              </Link>
            )}

            {/* Role specific: Cocina (Chef, Admin) */}
            {(isChef || isAdmin) && (
              <Link
                to="/cocina"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                  isActive('/cocina') ? 'text-amber-800 bg-amber-50 font-semibold' : 'text-stone-700 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                <ChefHat className="w-4 h-4 text-amber-700" />
                Comandas Cocina
              </Link>
            )}

            <Link
              to="/tracking"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive('/tracking') ? 'text-red-800 bg-red-50 font-semibold' : 'text-stone-700 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              Rastrear Pedido
            </Link>

            <button
              onClick={onOpenReservation}
              className="px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-50 flex items-center gap-1.5 transition"
            >
              <Calendar className="w-4 h-4 text-stone-500" />
              Reservar
            </button>

            <button
              onClick={onOpenParking}
              className="px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-50 flex items-center gap-1.5 transition"
            >
              <Car className="w-4 h-4 text-stone-500" />
              Parqueadero
            </button>

            {isAdmin && (
              <Link
                to="/admin"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                  isActive('/admin') ? 'text-rose-800 bg-rose-50 font-semibold' : 'text-rose-700 hover:bg-rose-50'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Métricas
              </Link>
            )}
          </nav>

          {/* Right Action Icons: Cart & Profile */}
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-stone-800 border border-amber-200/80 transition-all duration-150 shadow-xs flex items-center justify-center group"
              aria-label="Abrir carrito de compras"
            >
              <ShoppingBag className="w-5 h-5 text-amber-900 group-hover:scale-110 transition-transform" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-700 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-bounce">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* User Profile / Login */}
            {currentUser ? (
              <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.nombre}
                  className="w-9 h-9 rounded-full object-cover border-2 border-amber-300 shadow-xs"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';
                  }}
                />
                <div className="hidden xl:block text-left">
                  <p className="text-xs font-semibold text-stone-800 leading-none">{currentUser.nombre}</p>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                    {currentUser.rol}
                  </span>
                </div>
                <button
                  onClick={logout}
                  title="Cerrar sesión"
                  className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs transition"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Iniciar Sesión</span>
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:text-stone-900 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:bg-stone-50"
          >
            Inicio
          </Link>
          <Link
            to="/menu"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:bg-stone-50"
          >
            Menú Digital
          </Link>
          {(isMesero || isAdmin) && (
            <Link
              to="/mesas"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-blue-700 hover:bg-blue-50"
            >
              Salón & Mesas
            </Link>
          )}
          {(isChef || isAdmin) && (
            <Link
              to="/cocina"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-amber-700 hover:bg-amber-50"
            >
              Comandas Cocina
            </Link>
          )}
          <Link
            to="/tracking"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:bg-stone-50"
          >
            Rastrear Pedido
          </Link>
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenReservation(); }}
            className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:bg-stone-50"
          >
            Reservas
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenParking(); }}
            className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:bg-stone-50"
          >
            Parqueadero
          </button>
        </div>
      )}
    </header>
  );
}

