"use client";

import { create } from "zustand";

export const useCarrinhoStore = create((set, get) => ({
  items: [],

  // 🔹 Busca carrinho do DB do usuário logado
  fetchItensCarrinho: async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/itensCarrinho`
    );
    const data = await res.json();
    set({ items: data.items });
  },

  // 🔹 Adicionar produto
  adicionarProduto: async (productId, quantity = 1) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/itensCarrinho`,
      {
        method: "POST",
        body: JSON.stringify({ idProduto: productId, quantidade: quantity }),
      }
    );
    const data = await res.json();
    set({ items: data.items });
    if (res.ok) alert("Item adicionado ao carrinho com sucesso!");
  },

  // 🔹 Remover produto
  removerProduto: async (productId) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/itensCarrinho`,
      {
        method: "DELETE",
        body: JSON.stringify({ idProduto: productId }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await res.json();
    set({ items: data.items });
    if (res.ok) alert("Item removido do carrinho com sucesso!");
  },

  atualizarProduto: async (productId, quantity) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/itensCarrinho`,
      {
        method: "PUT",
        body: JSON.stringify({ idProduto: productId, quantidade: quantity }),
      }
    );
    const data = await res.json();
    set({ items: data.items });
    if (res.ok) alert("Item do carrinho atualizado com sucesso!");
  },
}));
