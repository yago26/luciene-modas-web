import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";
import CategoriasList from "@/components/CategoriasList";

describe("CategoriasList", () => {
  it("renderiza sem erros", () => {
    act(() => {
      render(<CategoriasList />);
    });
  });
});
