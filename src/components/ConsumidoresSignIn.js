import Link from "next/link";

export default function ConsumidoresSignIn() {
  return (
    <>
      <form>
        <h1>Sign In</h1>
        <div className="dadosAutenticacao">
          <label>
            Email
            <input
              className="campoEntradaEmailLogin"
              type="email"
              name="usuario-email"
              id="usuarioEmail"
            />
          </label>
          <label>
            Senha
            <input
              className="campoEntradaSenhaLogin"
              type="password"
              name="senha-login"
              id="senhaLogin"
            />
          </label>
        </div>
        <div className="finalizarAutenticacao">
          <button type="submit">Login</button>
          <hr />
          <p>
            Não possui uma conta? <Link href="./signUp">Cadastre-se</Link>
          </p>
        </div>
      </form>
    </>
  );
}
