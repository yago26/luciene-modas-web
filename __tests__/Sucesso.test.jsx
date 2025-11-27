import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";
import Sucesso from "@/components/toasts/Sucesso";

describe("Sucesso", () => {
  it("renderiza sem erros", () => {
    act(() => {
      render(<Sucesso />);
    });
  });
});
