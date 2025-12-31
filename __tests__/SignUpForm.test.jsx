import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";
import SignUpForm from "@/app/sign-up/components/SignUpForm";

describe("SignUpForm", () => {
  it("renderiza sem erros", () => {
    act(() => {
      render(<SignUpForm />);
    });
  });
});
