import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import CardProduto from "@/components/produtos/CardProduto";

describe("CardProduto", () => {
  it("renderiza sem erros", () => {
    act(() => {
      render(<CardProduto />);
    });
  });
});
