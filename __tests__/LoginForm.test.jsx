import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import LoginForm from "@/components/formularios/LoginForm";

describe("LoginForm", () => {
  it("renderiza sem erros", () => {
    render(<LoginForm />);
  });
});

// npm run test
