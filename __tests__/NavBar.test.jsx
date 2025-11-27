import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";
import NavBar from "@/components/layout/NavBar";

describe("NavBar", () => {
  it("renderiza sem erros", () => {
    act(() => {
      render(<NavBar />);
    });
  });
});
