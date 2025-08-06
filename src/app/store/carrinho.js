// Zustand é uma biblioteca utliizada para melhor controle de estados globais na aplicação, um
// useContext do React JS só que melhorado

import { create } from "zustand";

export const useCarrinhoStore = create((set) => ({
  produtos: [], // definindo o estado inicial
  // Futuramente colocar para iniciar com os valores do carrinho do usuário

  // os seguintes são métodos para modificar o estado inicial
  adicionarProduto: (produto) =>
    set((state) => {
      alert("Produto adicionado com sucesso!");
      if (state.produtos.find((p) => p.id === produto.id)) {
        return {
          produtos: state.produtos.map((p) =>
            p.id === produto.id ? { ...p, quantidade: p.quantidade + 1 } : p
          ),
        };
      }
      return {
        produtos: [...state.produtos, { ...produto, quantidade: 1 }],
      };
    }),
  removerProduto: (produto) =>
    set((state) => {
      alert("Produto removido com sucesso!");
      if (
        state.produtos.find((p) => {
          if (p.id === produto.id) return p.quantidade > 1;
        })
      ) {
        return {
          produtos: state.produtos.map((p) =>
            p.id === produto.id ? { ...p, quantidade: p.quantidade - 1 } : p
          ),
        };
      } else {
        return {
          produtos: state.produtos.filter((p) => p.id !== produto.id),
        };
      }
    }),
  limparCarrinho: () => set({ produtos: [] }),
}));
