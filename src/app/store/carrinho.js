"use client";

import { create } from "zustand";

export const useCarrinhoStore = create((set, get) => ({
  items: [],

  // 🔹 Busca carrinho do DB do usuário logado
  fetchItensCarrinho: async () => {
    const res = await fetch(`/api/itensCarrinho`);
    const data = await res.json();
    set({ items: data.items });
  },

  // 🔹 Adicionar produto
  adicionarProduto: async (productId, quantity = 1) => {
    const res = await fetch(`/api/itensCarrinho`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idProduto: productId, quantidade: quantity }),
    });
    if (res.ok) {
      await get().fetchItensCarrinho();
      alert("Item adicionado ao carrinho com sucesso!");
    }
  },

  // 🔹 Remover produto
  removerProduto: async (productId) => {
    const res = await fetch(`/api/itensCarrinho`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idProduto: productId }),
    });
    if (res.ok) {
      await get().fetchItensCarrinho();
      alert("Item removido do carrinho com sucesso!");
    }
  },

  atualizarProduto: async (productId, quantity) => {
    const res = await fetch(`/api/itensCarrinho`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idProduto: productId, quantidade: quantity }),
    });
    if (res.ok) {
      await get().fetchItensCarrinho();
      alert("Item do carrinho atualizado com sucesso!");
    }
  },
}));
