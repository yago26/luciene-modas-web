"use client";

import { createContext } from "react";

export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const fetchItensCarrinho = async () => {
    // await fetch();
  };
  return <CartContext.Provider>{children}</CartContext.Provider>;
};
