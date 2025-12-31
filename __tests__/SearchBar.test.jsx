import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";
import SearchBar from "@/components/navbar/SearchBar";

describe("SearchBar", () => {
  it("renderiza sem erros", () => {
    act(() => {
      render(<SearchBar />);
    });
  });
});
