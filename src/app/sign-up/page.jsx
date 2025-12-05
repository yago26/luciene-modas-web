"use client";
/* O padrão é estar do lado do servidor ('use server') */

import style from "./page.module.css";
import SignUpForm from "@/components/formularios/SignUpForm";
import Sucesso from "@/components/toasts/Sucesso";
import { Divider } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const router = useRouter();

  const addUsuario = async (usuario) => {
    // fetch => Uma busca na API
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });

    const data = await res.json();

    if (res.ok) {
      setShowSuccessAlert(true);
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } else {
      return data.error;
    }
  };

  return (
    <>
      <div className={style.containerSignUp}>
        <div className={style.containerLateralEsquerda}>
          <SignUpForm onAddUsuario={addUsuario} />
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
