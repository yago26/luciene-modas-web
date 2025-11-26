import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import LoginForm from "@/components/formularios/LoginForm";

describe("LoginForm", () => {
  it("renderiza sem erros", () => {
    act(() => {
      render(<LoginForm />);
    });
  });
});
