import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import FormasAutenticar from "@/components/formularios/FormasAutenticar";

describe("CardProduto", () => {
  it("renderiza sem erros", () => {
    render(<FormasAutenticar />);
  });
});
