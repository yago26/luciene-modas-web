import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";
import Aviso from "@/components/toasts/Aviso";

describe("Aviso", () => {
  it("renderiza sem erros", () => {
    act(() => {
      render(<Aviso />);
    });
  });
});
