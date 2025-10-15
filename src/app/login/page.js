"use client";

import LoginForm from "@/components/formularios/LoginForm";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const authUsuario = async (form) => {
    const response = await fetch("api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Operação realizada com sucesso! Autenticação bem-sucedida.");
      router.push("/");
      router.refresh();
      return data.message;
    } else {
      return data.error;
    }
  };

  return (
    <>
      <LoginForm onAuthUsuario={authUsuario} />
    </>
  );
}
