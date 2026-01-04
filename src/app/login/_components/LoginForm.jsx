"use client";

import style from "./loginForm.module.css";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Button from "@/components/ui/Button";

export default function LoginForm({ onAuthUsuario, loading }) {
  const [form, setForm] = useState({ email: "", senha: "" });
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onAuthUsuario(form);

    setForm({
      email: "",
      senha: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className={style.formulario}>
      <div className={style.containerEmail}>
        <Mail className={style.icone} />
        <input
          type="email"
          aria-label="E-mail"
          placeholder="E-mail"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
      </div>

      <div>
        <div className={style.containerSenha}>
          <Lock className={style.icone} />
          <input
            autoComplete="off"
            aria-label="Senha"
            type={isShowPassword ? "text" : "password"}
            placeholder="Senha"
            value={form.senha}
            onChange={(e) => {
              const value = e.target.value;
              setForm({ ...form, senha: value.trim() });
            }}
            required
          />

          <div
            className={style.verSenha}
            onClick={() => setIsShowPassword(!isShowPassword)}
            aria-label={isShowPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {isShowPassword ? (
              <Eye className={style.iconeAtivo} />
            ) : (
              <EyeOff className={style.icone} />
            )}
          </div>
        </div>
      </div>

      <Button
        key="b-login"
        variante="terciaria grande w-100"
        type={loading ? "" : "submit"}
        loading={loading}
      >
        Entrar
      </Button>
    </form>
  );
}
