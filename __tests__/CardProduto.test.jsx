import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";
import CardProduto from "@/components/produtos/CardProduto";

describe("CardProduto", () => {
  it("renderiza sem erros", () => {
    act(() => {
      const produto = {
        id: 1,
        nome: "Exemplo de produto",
        sobre: "Breve descrição do produto",
        valor: "99.99",
        imagem:
          "https://png.pngtree.com/png-clipart/20240323/original/pngtree-orange-cat-cute-little-kitty-png-image_14664392.png",
        estoque: 1,
        categoria: "outros",
        subcategoria: "outros",
      };
      const usuario = {
        id: 1,
        nome: "Consumidor",
        genero: "Outro",
        role: "consumidor",
        email: "teste@gmail.com",
      };
      render(<CardProduto produto={produto} usuario={usuario} />);
    });
  });
});
