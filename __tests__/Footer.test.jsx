import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";
import Footer from "@/components/layout/Footer";

describe("Footer", () => {
  it("renderiza sem erros", () => {
    act(() => {
      render(<Footer />);
    });
  });
});
