"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from "sonner";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('ridma_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ridma_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    const isExisting = cart.some(item => item.id === product.id);
    
    if (isExisting) {
      toast.info(`${product.title} is already in your cart`, {
        description: "Each service can only be added once."
      });
      return;
    }

    setCart(prevCart => [...prevCart, { ...product, quantity: 1 }]);
    toast.success(`${product.title} added to cart`, {
      description: "View your selections in the cart page."
    });
  };

  const removeFromCart = (id: string) => {
    const itemToRemove = cart.find(item => item.id === id);
    
    if (itemToRemove) {
      setCart(prevCart => prevCart.filter(item => item.id !== id));
      toast.error(`${itemToRemove.title} removed from cart`);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalItems, totalPrice }}>
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
