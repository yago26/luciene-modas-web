import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";
import ProductPageInfoProduto from "@/components/produtos/ProductPageInfoProduto";

describe("ProductPageInfoProduto", () => {
  it("renderiza sem erros", () => {
    act(() => {
      render(<ProductPageInfoProduto />);
    });
  });
});
