import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";
import InfoUsuario from "@/app/perfil/InfoUsuario";

describe("InfoUsuario", () => {
  it("renderiza sem erros", () => {
    act(() => {
      render(<InfoUsuario />);
    });
  });
});
