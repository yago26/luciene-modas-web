import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";
import LoginForm from "@/app/login/LoginForm";

describe("LoginForm", () => {
  it("renderiza sem erros", () => {
    act(() => {
      render(<LoginForm />);
    });
  });
});
