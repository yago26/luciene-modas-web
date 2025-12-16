"use client";
/* O padrão é estar do lado do servidor ('use server') */

import style from "./page.module.css";
import SignUpForm from "@/app/sign-up/SignUpForm";
import Sucesso from "@/components/toasts/Sucesso";
import { Divider } from "antd";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function SignUp() {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const addUsuario = async (usuario) => {
    setLoading(true);
    // fetch => Uma busca na API
    const res = await fetch(`${process.env.NEXTAUTH_URL || ""}/api/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });

    const data = await res.json();

    setLoading(false);

    if (res.ok) {
      setShowSuccessAlert(true);
      await signIn("credentials", {
        email: usuario.email,
        senha: usuario.senha,
        redirect: true,
        callbackUrl: "/perfil",
      });
    } else {
      return data.error;
    }
  };

  return (
    <>
      <div className={style.containerSignUp}>
        <div className={style.containerLateralEsquerda}>
          <SignUpForm onAddUsuario={addUsuario} loading={loading} />
          <Divider style={{ borderColor: "black" }}>ou</Divider>
          <p className={style.linkLogin}>
            Já possui uma conta? <Link href="./login">Login</Link>
          </p>
        </div>
        <div className={style.containerLateralDireita}>
          <h2>Bem vindo(a), Novo Usuário!</h2>
          <Divider style={{ borderColor: "white" }} />
          <p>Inicie sua maravilhosa experiência na plataforma Luciene Modas</p>
        </div>
      </div>

      {showSuccessAlert && <Sucesso mensagem="Cadastro bem-sucedido." />}
    </>
  );
}
