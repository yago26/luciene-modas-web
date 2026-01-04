import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";
import ItemCarrinho from "@/app/carrinho/_components/Item";

describe("ItemCarrinho", () => {
  it("renderiza sem erros", () => {
    act(() => {
      render(<ItemCarrinho />);
    });
  });
});
