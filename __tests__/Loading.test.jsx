import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";
import Loading from "@/app/loading";

describe("Loading", () => {
  it("renderiza sem erros", () => {
    act(() => {
      render(<Loading />);
    });
  });
});
