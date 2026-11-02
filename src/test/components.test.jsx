import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import DishCard from '../components/menu/DishCard';
import UserSwitchBar from '../components/common/UserSwitchBar';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { ToastProvider } from '../context/ToastContext';

describe('Pruebas de Componentes UI', () => {

  const platoMock = {
    id: 99,
    nombre: 'Pizza Test Quattro Formaggi',
    descripcion: 'Deliciosa pizza con 4 quesos italianos.',
    precio: 35000,
    categoria: 'PIZZA',
    disponible: true,
    imagenUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
    tiempoPreparacionMinutos: 15,
    etiquetas: ['Favorito']
  };

  it('debe renderizar el DishCard con el nombre, precio formateado y botón Agregar', () => {
    render(
      <ToastProvider>
        <CartProvider>
          <DishCard plato={platoMock} onSelectDetail={() => {}} />
        </CartProvider>
      </ToastProvider>
    );

    expect(screen.getByText('Pizza Test Quattro Formaggi')).toBeInTheDocument();
    expect(screen.getByText('$35.000')).toBeInTheDocument();
    expect(screen.getByText('Agregar')).toBeInTheDocument();
  });

  it('debe renderizar la barra de roles con los 4 usuarios semilla del backend', () => {
    render(
      <AuthProvider>
        <UserSwitchBar />
      </AuthProvider>
    );

    expect(screen.getByText(/Perfiles de Acceso/i)).toBeInTheDocument();
    expect(screen.getByText(/Cliente/i)).toBeInTheDocument();
    expect(screen.getByText(/Mesero/i)).toBeInTheDocument();
    expect(screen.getByText(/Chef/i)).toBeInTheDocument();
    expect(screen.getByText(/Admin/i)).toBeInTheDocument();
  });

});

