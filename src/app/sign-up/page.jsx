"use client";
/* O padrão é estar do lado do servidor ('use server') */

import style from "./page.module.css";
import SignUpForm from "@/app/sign-up/components/SignUpForm";
import Sucesso from "@/components/ui/toasts/Sucesso";
import Divider from "@/components/ui/Divider";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function SignUp() {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const addUsuario = async (usuario) => {
    setLoading(true);
    let res, data;
    try {
      res = await fetch(`${process.env.NEXTAUTH_URL || ""}/api/usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });
      data = await res.json();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }

    if (res?.ok) {
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
      <div className={style.container}>
        <div className={style.content}>
          <h1>Sign Up</h1>
          <SignUpForm onAddUsuario={addUsuario} loading={loading} />
          <Divider>ou</Divider>
          <p className={style.direcionar}>
            Já possui uma conta? <Link href="/login">Entrar</Link>
          </p>
        </div>
      </div>

      {showSuccessAlert && <Sucesso mensagem="Cadastro bem-sucedido." />}
    </>
  );
}
