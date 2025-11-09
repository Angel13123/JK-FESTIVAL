"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { CartItem } from '@/lib/types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (ticketTypeId: string, quantity: number) => void;
  updateQuantity: (ticketTypeId: string, quantity: number) => void;
  removeFromCart: (ticketTypeId: string) => void;
  clearCart: () => void;
  getCartTotal: (ticketTypes: any[]) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (ticketTypeId: string, quantity: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.ticketTypeId === ticketTypeId);
      if (existingItem) {
        return prevItems.map(item =>
          item.ticketTypeId === ticketTypeId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ticketTypeId, quantity }];
    });
  };
  
  const updateQuantity = (ticketTypeId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(ticketTypeId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.ticketTypeId === ticketTypeId ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (ticketTypeId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.ticketTypeId !== ticketTypeId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = (ticketTypes: any[]): number => {
    return cartItems.reduce((total, cartItem) => {
      const ticketType = ticketTypes.find(t => t.id === cartItem.ticketTypeId);
      return total + (ticketType?.price || 0) * cartItem.quantity;
    }, 0);
  };


  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
