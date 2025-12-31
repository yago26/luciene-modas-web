import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";
import ItemCarrinho from "@/app/carrinho/components/Item";

describe("ItemCarrinho", () => {
  it("renderiza sem erros", () => {
    act(() => {
      render(<ItemCarrinho />);
    });
  });
});
