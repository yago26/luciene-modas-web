import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";
import Erro from "@/components/toasts/Erro";

describe("Erro", () => {
  it("renderiza sem erros", () => {
    act(() => {
      render(<Erro />);
    });
  });
});
