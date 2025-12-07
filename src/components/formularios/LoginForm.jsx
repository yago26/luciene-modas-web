"use client";

import style from "./loginForm.module.css";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useCarrinhoStore } from "@/app/store/carrinho";

export default function LoginForm({ onAuthUsuario }) {
  const [form, setForm] = useState({ email: "", senha: "" });
  const [isShowPassword, setIsShowPassword] = useState(false);

  const { fetchItensCarrinho } = useCarrinhoStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onAuthUsuario(form);

    setForm({
      email: "",
      senha: "",
    });

    await fetchItensCarrinho();
  };

  return (
    <form onSubmit={handleSubmit} className={style.formulario}>
      <h1>Login</h1>

      <div>
        <div className={style.containerEmail}>
          <Mail className={style.icone} />
          <input
            autoComplete="off"
            aria-label="E-mail"
            className="campoEntradaEmailLogin"
            type="email"
            name="usuario-email"
            id="usuarioEmail"
            placeholder="E-mail"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <div className={style.containerSenha}>
          <Lock className={style.icone} />
          <input
            autoComplete="off"
            aria-label="Senha"
            className="campoEntradaSenhaLogin"
            type={isShowPassword ? "text" : "password"}
            name="senha-login"
            id="senhaLogin"
            placeholder="Senha"
            value={form.senha}
            onChange={(e) => setForm({ ...form, senha: e.target.value })}
            required
          />

          <button
            type="button"
            onClick={() => setIsShowPassword(!isShowPassword)}
            aria-label={isShowPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {isShowPassword ? (
              <Eye className={style.iconeAtivo} />
            ) : (
              <EyeOff className={style.icone} />
            )}
          </button>
        </div>
      </div>

      <button className={style.btnEntrar} type="submit">
        Entrar
      </button>
    </form>
  );
}
