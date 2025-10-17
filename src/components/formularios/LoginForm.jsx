"use client";

import Link from "next/link";
import style from "./loginForm.module.css";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useCarrinhoStore } from "@/app/store/carrinho";

export default function LoginForm({ onAuthConsumidor }) {
  const [form, setForm] = useState({ email: "", senha: "" });
  const [isShowPassword, setIsShowPassword] = useState(false);

  const { fetchItensCarrinho } = useCarrinhoStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onAuthConsumidor(form);

    setForm({
      email: "",
      senha: "",
    });

    await fetchItensCarrinho();
  };

  return (
    <>
      <div className={style.containerSignIn}>
        <div className={style.containerLateral}>
          <h2>Bem vindo(a) de volta, Usuário!</h2>
          <hr />
          <p>Aproveite sua experiência</p>
        </div>
        <form onSubmit={handleSubmit} className={style.formSignIn}>
          <h1>Login</h1>
          <div className={style.dadosAutenticacao}>
            <label htmlFor="usuarioEmail">Email</label>
            <input
              className="campoEntradaEmailLogin"
              type="email"
              name="usuario-email"
              id="usuarioEmail"
              placeholder="Email"
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
              }}
            />
            <label htmlFor="senhaLogin">Senha</label>
            <div className={style.containerSenhaLogin}>
              <input
                className="campoEntradaSenhaLogin"
                type={isShowPassword ? "text" : "password"}
                name="senha-login"
                id="senhaLogin"
                placeholder="Senha"
                value={form.senha}
                onChange={(e) => {
                  setForm({ ...form, senha: e.target.value });
                }}
              />
              <button
                type="button"
                onClick={() => 
                  setIsShowPassword(!isShowPassword)
                }
                aria-label={isShowPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {isShowPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>
          </div>
          <div className={style.finalizarAutenticacao}>
            <button type="submit">Entrar</button>
            <hr />
            <p>
              Não possui uma conta? <Link href="./signUp">Cadastre-se</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
