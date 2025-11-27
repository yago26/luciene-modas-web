import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";
import PainelGerenciamento from "@/components/gerenciamento/PainelGerenciamento";

describe("PainelGerenciamento", () => {
  it("renderiza sem erros", () => {
    act(() => {
      render(<PainelGerenciamento />);
    });
  });
});
