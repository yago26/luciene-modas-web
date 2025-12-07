"use client";

import { create } from "zustand";

export const useCarrinhoStore = create((set, get) => ({
  items: [],

  fetchItensCarrinho: async () => {
    const res = await fetch(`/api/itens-carrinho`);
    const data = await res.json();
    set({ items: data.items });
  },

  adicionarProduto: async (id_produto, quantidade = 1) => {
    const res = await fetch(`/api/itens-carrinho`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idProduto: id_produto, quantidade: quantidade }),
    });
    if (res.ok) {
      await get().fetchItensCarrinho();
    }
    return res.ok;
  },

  removerProduto: async (id_produto) => {
    const res = await fetch(`/api/itens-carrinho`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idProduto: id_produto }),
    });
    if (res.ok) {
      await get().fetchItensCarrinho();
    }
    return res.ok;
  },

  atualizarProduto: async (id_produto, quantidade) => {
    const res = await fetch(`/api/itens-carrinho`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idProduto: id_produto, quantidade: quantidade }),
    });
    if (res.ok) {
      await get().fetchItensCarrinho();
    }
    return res.ok;
  },
}));
