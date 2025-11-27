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
  const [errorKey, setErrorKey] = useState(0);

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
      setErrorKey((k) => k + 1);
    }
  };

  return (
    <>
      <div
        className="containerSignIn"
        style={{ display: "flex", justifyContent: "center", padding: "5%" }}
      >
        <div
          className="containerLateral"
          style={{
            width: "35%",
            padding: "2.5%",
            backgroundColor: "var(--cor-principal)",
            color: "white",
          }}
        >
          <h2>Bem vindo(a) de volta, Consumidor!</h2>
          <hr />
          <p>Aproveite sua experiência</p>
        </div>

        <SessionProvider>
          <LoginForm onAuthConsumidor={authConsumidor} />
        </SessionProvider>

        {showSuccessAlert && <Sucesso mensagem="Autenticação bem-sucedida." />}
        {showErrorAlert && (
          <Erro key={errorKey} mensagem="Credenciais inválidas." />
        )}
      </div>
    </>
  );
}
