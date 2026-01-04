"use client";

import LoginForm from "@/app/login/_components/LoginForm";
import Sucesso from "@/components/ui/toasts/Sucesso";
import Erro from "@/components/ui/toasts/Erro";
import Divider from "@/components/ui/Divider";
import ProvedoresNextAuth from "@/app/login/_components/ProvedoresNextAuth";

import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import style from "./page.module.css";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState({
    visivel: false,
    mensagem: "",
  });
  const [errorKey, setErrorKey] = useState(0);

  const searchParams = useSearchParams();

  let error = searchParams.get("error");

  const errors = {
    OAuthSignin:
      "Ocorreu um erro ao tentar construir a URL de autorização para um provedor OAuth.",
    OAuthCallback:
      "Ocorreu um erro ao processar a resposta (callback) do provedor OAuth.",
    OAuthCreateAccount:
      "Não foi possível criar o usuário do provedor OAuth no banco de dados.",
    // EmailCreateAccount: "Não foi possível criar o usuário do provedor de e-mail no banco de dados.",
    // EmailSignin: "O envio do e-mail com o token de verificação falhou.",
    Callback: "Um erro ocorreu na rota do manipulador de callback.",
    OAuthAccountNotLinked:
      "O e-mail da conta já está vinculado, mas não com a conta OAuth específica que está sendo usada. Vincule as contas primeiro.",
    CredentialsSignin: "Credenciais inválidas.",
  };

  useEffect(() => {
    error = searchParams.get("error");

    const errorMessage = errors[error] || "";
    if (errorMessage) {
      setShowError({ visivel: true, mensagem: errorMessage });
    }
  }, []);

  const authUsuario = async (form) => {
    try {
      setLoading(true);

      await signIn("credentials", {
        email: form.email,
        senha: form.senha,
        redirect: true,
        callbackUrl: "/",
      });
    } catch (error) {
      console.error(error);
      setShowError({ visivel: true, mensagem: error });
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

      {showError.visivel && (
        <Erro key={errorKey} mensagem={showError.mensagem} />
      )}
    </>
  );
}
