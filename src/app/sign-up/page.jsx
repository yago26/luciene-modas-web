"use client";
/* O padrão é estar do lado do servidor ('use server') */

import SignUpForm from "@/components/formularios/SignUpForm";
import Sucesso from "@/components/toasts/Sucesso";
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
      <SignUpForm onAddUsuario={addUsuario} />
      {showSuccessAlert && <Sucesso mensagem="Cadastro bem-sucedido." />}
    </>
  );
}
