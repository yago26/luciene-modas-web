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

    console.log(data);

    if (res.ok) {
      const nome = data.usuario.nome;
      const genero =
        data.usuario.genero === "Masculino"
          ? "o"
          : data.usuario.genero === "Feminino"
          ? "a"
          : "(a)o";
      return `Bem vind${genero}, ${nome}`;
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
