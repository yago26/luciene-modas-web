import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";
import Checkout from "@/components/carrinho/Checkout";

describe("Checkout", () => {
  it("renderiza sem erros", () => {
    act(() => {
      render(<Checkout />);
    });
  });
});
