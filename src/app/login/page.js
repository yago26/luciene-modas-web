"use client";

import LoginForm from "@/components/formularios/LoginForm";
import { redirect, useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const authUsuario = async (form) => {
    const res = await fetch("api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Operação realizada com sucesso! Autenticação bem-sucedida.");
      redirect("/");
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
