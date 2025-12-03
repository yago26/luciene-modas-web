import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";
import InfoProduto from "@/components/produtos/InfoProduto";

describe("InfoProduto", () => {
  it("renderiza sem erros", () => {
    act(() => {
      render(<InfoProduto />);
    });
  });
});
