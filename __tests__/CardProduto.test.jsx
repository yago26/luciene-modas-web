import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";
import CardProduto from "@/components/produtos/CardProduto";

describe("CardProduto", () => {
  it("renderiza sem erros", () => {
    act(() => {
      render(<CardProduto />);
    });
  });
});
