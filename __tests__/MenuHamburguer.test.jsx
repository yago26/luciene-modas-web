import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";
import MenuHamburguer from "@/components/layout/MenuHamburguer";

describe("MenuHamburguer", () => {
  it("renderiza sem erros", () => {
    act(() => {
      render(<MenuHamburguer />);
    });
  });
});
