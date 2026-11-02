import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import confetti from 'canvas-confetti';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('bellaciao_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedMesa, setSelectedMesa] = useState(2); // default table 2
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [includeTip, setIncludeTip] = useState(true);

  useEffect(() => {
    localStorage.setItem('bellaciao_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (plato, cantidad = 1, notas = "") => {
    setCartItems(prev => {
      const existing = prev.find(item => item.idPlato === plato.id);
      if (existing) {
        return prev.map(item =>
          item.idPlato === plato.id
            ? { ...item, cantidad: item.cantidad + cantidad, subtotal: (item.cantidad + cantidad) * item.precioUnitario }
            : item
        );
      }
      return [...prev, {
        idPlato: plato.id,
        nombre: plato.nombre,
        imagenUrl: plato.imagenUrl,
        precioUnitario: plato.precio,
        cantidad,
        subtotal: plato.precio * cantidad,
        notas
      }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (idPlato, newQty) => {
    if (newQty <= 0) {
      removeFromCart(idPlato);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.idPlato === idPlato
          ? { ...item, cantidad: newQty, subtotal: newQty * item.precioUnitario }
          : item
      )
    );
  };

  const removeFromCart = (idPlato) => {
    setCartItems(prev => prev.filter(item => item.idPlato !== idPlato));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {
      // safe fallback
    }
  };

  const totalItemsCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.cantidad, 0);
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.subtotal, 0);
  }, [cartItems]);

  const propinaSugerida = useMemo(() => {
    return includeTip ? Math.round(subtotal * 0.10) : 0;
  }, [subtotal, includeTip]);

  const total = useMemo(() => {
    return subtotal + propinaSugerida;
  }, [subtotal, propinaSugerida]);

  return (
    <CartContext.Provider value={{
      cartItems,
      selectedMesa,
      setSelectedMesa,
      isCartOpen,
      setIsCartOpen,
      includeTip,
      setIncludeTip,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      totalItemsCount,
      subtotal,
      propinaSugerida,
      total,
      triggerConfetti
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

