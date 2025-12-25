import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";
import InfoProduto from "@/app/produtos/FuncionalidadesProduto";

describe("InfoProduto", () => {
  it("renderiza sem erros", () => {
    act(() => {
      render(<InfoProduto />);
    });
  });
});
