import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/mockApiService';
import { INITIAL_USERS } from '../data/initialSeedData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const session = authService.getCurrentSession();
    return session ? session.user : null;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const login = async (email, password) => {
    const session = await authService.login(email, password);
    setCurrentUser(session.user);
    setIsAuthModalOpen(false);
    return session.user;
  };

  const register = async (nombre, email, password) => {
    const user = await authService.register(nombre, email, password);
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    return user;
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  const switchUserRole = (rol) => {
    const found = INITIAL_USERS.find(u => u.rol === rol);
    if (found) {
      setCurrentUser(found);
      localStorage.setItem('bellaciao_session', JSON.stringify({ user: found, token: `jwt-${rol}` }));
    }
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthModalOpen,
      setIsAuthModalOpen,
      login,
      register,
      logout,
      switchUserRole,
      isAdmin: currentUser?.rol === 'ADMIN',
      isChef: currentUser?.rol === 'CHEF',
      isMesero: currentUser?.rol === 'MESERO',
      isCliente: currentUser?.rol === 'CLIENTE'
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
