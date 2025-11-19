import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ProdutosList from "@/components/produtos/ProdutosList";

describe("ProdutosList", () => {
  it("Renderiza sem erros", () => {
    render(<ProdutosList />);
  });
});

// npm run test
