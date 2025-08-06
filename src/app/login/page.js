"use client";

import LoginForm from "@/components/formularios/LoginForm";

export default function Login() {
  const authUsuario = async (form) => {
    const res = await fetch("api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      return alert("Operação realizada com sucesso! Login bem-sucedido.");
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
