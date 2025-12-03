import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import ProvedoresNextAuth from "@/components/formularios/ProvedoresNextAuth";

describe("ProvedoresNextAuth", () => {
  it("renderiza sem erros", () => {
    render(<ProvedoresNextAuth />);
  });
});
