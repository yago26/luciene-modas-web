"use client";

import Link from "next/link";
import style from "./loginForm.module.css";
import { useState } from "react";

export default function LoginForm({ onAuthUsuario }) {
  const [form, setForm] = useState({ email: "", senha: "" });
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setMensagem(onAuthUsuario(form));

    setForm({
      email: "",
      senha: "",
    });
  };

  return (
    <>
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
          <input
            className="campoEntradaSenhaLogin"
            type="password"
            name="senha-login"
            id="senhaLogin"
            placeholder="Senha"
            value={form.senha}
            onChange={(e) => {
              setForm({ ...form, senha: e.target.value });
            }}
          />
        </div>
        <div className={style.finalizarAutenticacao}>
          <button type="submit">Entrar</button>
          <hr />
          <p>
            Não possui uma conta? <Link href="./signUp">Cadastre-se</Link>
          </p>
        </div>
      </form>
      <p>{mensagem}</p>
    </>
  );
}
