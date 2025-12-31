"use client";

import LoginForm from "@/app/login/components/LoginForm";
import Sucesso from "@/components/ui/toasts/Sucesso";
import Erro from "@/components/ui/toasts/Erro";
import Divider from "@/components/ui/Divider";
import ProvedoresNextAuth from "@/app/login/components/ProvedoresNextAuth";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import style from "./page.module.css";

export default function Login() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorKey, setErrorKey] = useState(0);

  const authUsuario = async (form) => {
    try {
      setLoading(true);

      const response = await signIn("credentials", {
        email: form.email,
        senha: form.senha,
        redirect: false,
      });

      if (!response?.error) {
        setShowSuccess(true);
        setTimeout(() => router.push("/"), 1200);
      } else {
        setShowError(true);
        setErrorKey((k) => k + 1);
      }
    } catch (error) {
      console.error(error);
      setShowError(true);
      setErrorKey((k) => k + 1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.content}>
          <h1>Login</h1>

          <LoginForm onAuthUsuario={authUsuario} loading={loading} />

          <Divider>ou</Divider>

          <ProvedoresNextAuth />

          <p className={style.direcionar}>
            Não possui uma conta? <Link href="/sign-up">Cadastre-se</Link>
          </p>
        </div>
      </div>

      {showSuccess && <Sucesso mensagem="Autenticação bem-sucedida." />}
      {showError && <Erro key={errorKey} mensagem="Credenciais inválidas." />}
    </>
  );
}
