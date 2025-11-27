import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";
import ConsumidoresList from "@/components/gerenciamento/ConsumidoresList";

describe("ConsumidoresList", () => {
  it("renderiza sem erros", () => {
    act(() => {
      render(<ConsumidoresList />);
    });
  });
});
