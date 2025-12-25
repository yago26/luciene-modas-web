"use client";

import style from "./page.module.css";
import LoginForm from "@/app/login/LoginForm";
import Erro from "@/components/toasts/Erro";
import Sucesso from "@/components/toasts/Sucesso";
import { SessionProvider, signIn } from "next-auth/react";
import { useState } from "react";
import { Divider } from "antd";
import ProvedoresNextAuth from "@/app/login/ProvedoresNextAuth";
import Link from "next/link";

export default function Login() {
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorKey, setErrorKey] = useState(0);

  const authUsuario = async (form) => {
    const response = await signIn("credentials", {
      email: form.email,
      senha: form.senha,
      redirect: true,
      callbackUrl: "/",
    });

    if (!response) {
      setShowErrorAlert(true);
      setErrorKey((k) => k + 1);
    }
  };

  return (
    <>
      <div className={style.containerLogin}>
        <div className={style.containerLateralEsquerda}>
          <h2>Bem vindo(a) de volta, Usuário!</h2>
          <Divider style={{ borderColor: "white" }} />
          <p>Aproveite sua experiência</p>
        </div>

        <div className={style.containerLateralDireita}>
          <SessionProvider>
            <LoginForm onAuthUsuario={authUsuario} />
            <Divider style={{ borderColor: "black" }}>ou</Divider>
            <ProvedoresNextAuth />
            <div>
              <p style={{ textAlign: "center" }}>
                Não possui uma conta? <Link href="./sign-up">Cadastre-se</Link>
              </p>
            </div>
          </SessionProvider>
        </div>
      </div>

      {showErrorAlert && (
        <Erro key={errorKey} mensagem="Credenciais inválidas." />
      )}
    </>
  );
}
