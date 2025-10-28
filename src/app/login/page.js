"use client";

import LoginForm from "@/components/formularios/LoginForm";
import Erro from "@/components/toasts/Erro";
import Sucesso from "@/components/toasts/Sucesso";
import { SessionProvider, signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const authConsumidor = async (form) => {
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
    }
  };

  return (
    <>
    <SessionProvider>
      <LoginForm onAuthConsumidor={authConsumidor} />
      <div>
        <button onClick={() => signIn("google")}>Login com google</button>
      </div>
    </SessionProvider>
    {showSuccessAlert && <Sucesso mensagem="Autenticação bem-sucedida." />}
    {showErrorAlert && <Erro mensagem="Credenciais inválidas." />}
    </>
  );
}
