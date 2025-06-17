import Link from "next/link";
import style from "./consumidorSignIn.module.css";

export default function ConsumidoresSignIn() {
  return (
    <>
      <form className={style.formSignIn}>
        <h1>Sign In</h1>
        <div className={style.dadosAutenticacao}>
          <label htmlFor="usuarioEmail">Email</label>
          <input
            className="campoEntradaEmailLogin"
            type="email"
            name="usuario-email"
            id="usuarioEmail"
            placeholder="Email"
          />
          <label htmlFor="senhaLogin">Senha</label>
          <input
            className="campoEntradaSenhaLogin"
            type="password"
            name="senha-login"
            id="senhaLogin"
            placeholder="Senha"
          />
        </div>
        <div className={style.finalizarAutenticacao}>
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
