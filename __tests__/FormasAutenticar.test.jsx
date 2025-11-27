import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import FormasAutenticar from "@/components/formularios/FormasAutenticar";

describe("FormasAutenticar", () => {
  it("renderiza sem erros", () => {
    render(<FormasAutenticar />);
  });
});
