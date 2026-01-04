"use client";

import { create } from "zustand";

export const useCarrinhoStore = create((set, get) => ({
  itens: [],

  fetchItensCarrinho: async () => {
    const res = await fetch(`/api/itens-carrinho`);
    const itens_carrinho = await res.json();
    set({ itens: itens_carrinho });
  },

  adicionarItemCarrinho: async (id_produto, quantidade = 1) => {
    const res = await fetch(`/api/itens-carrinho`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idProduto: id_produto, quantidade: quantidade }),
    });
    if (!res.ok) {
      const error = await res.json();
      return new Error(error.error);
    }

    const itens_carrinho = await res.json();
    set({ itens: itens_carrinho });

    return true;
  },

  removerItemCarrinho: async (id_item_carrinho) => {
    const res = await fetch(`/api/itens-carrinho`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idItemCarrinho: id_item_carrinho }),
    });
    if (res.ok) {
      const itens_carrinho = get().itens.filter(
        (i) => i.id !== id_item_carrinho
      );
      set({ itens: itens_carrinho });
    }
    return res.ok;
  },

  removerTodosItens: async (ids) => {
    await Promise.all(ids.map((id) => get().removerItemCarrinho(id)));
    set({ itens: [] });
  },

  atualizarItemCarrinho: async (id_item_carrinho, quantidade) => {
    const res = await fetch(`/api/itens-carrinho`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idItemCarrinho: id_item_carrinho,
        quantidade: quantidade,
      }),
    });
    return res.ok;
  },

  getSize: () => {
    return get().itens.length;
  },
}));
