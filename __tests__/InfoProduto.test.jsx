import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";
import InfoProduto from "@/app/produtos/_components/Funcionalidades";

describe("InfoProduto", () => {
  it("renderiza sem erros", () => {
    act(() => {
      render(<InfoProduto />);
    });
  });
});
