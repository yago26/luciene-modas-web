"use client";

import style from "./page.module.css";
import LoginForm from "@/components/formularios/LoginForm";
import Erro from "@/components/toasts/Erro";
import Sucesso from "@/components/toasts/Sucesso";
import { SessionProvider, signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Divider } from "antd";

export default function Login() {
  const router = useRouter();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorKey, setErrorKey] = useState(0);

  const authUsuario = async (form) => {
    const response = await signIn("credentials", {
      redirect: false,
      email: form.email,
      senha: form.senha,
    });

    if (response?.ok) {
      setShowSuccessAlert(true);
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1000);
    } else {
      setShowErrorAlert(true);
      setErrorKey((k) => k + 1);
    }
  };

  return (
    <>
      <div className={style.containerSignIn}>
        <div className={style.containerLateral}>
          <h2>Bem vindo(a) de volta, Usuário!</h2>
          <Divider style={{ borderColor: "white" }} />
          <p>Aproveite sua experiência</p>
        </div>

        <SessionProvider>
          <LoginForm onAuthUsuario={authUsuario} />
        </SessionProvider>
      </div>

      {showSuccessAlert && <Sucesso mensagem="Autenticação bem-sucedida." />}
      {showErrorAlert && (
        <Erro key={errorKey} mensagem="Credenciais inválidas." />
      )}
    </>
  );
}
