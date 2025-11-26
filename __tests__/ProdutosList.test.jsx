import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import ProdutosList from "@/components/produtos/ProdutosList";

describe("ProdutosList", () => {
  it("Renderiza sem erros", () => {
    act(() => {
      render(<ProdutosList />);
    });
  });
});

// npm run test
