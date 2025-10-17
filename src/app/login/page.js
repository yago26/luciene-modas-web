"use client";

import LoginForm from "@/components/formularios/LoginForm";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const authConsumidor = async (form) => {
    const response = await signIn("credentials", {
      redirect: false,
      email: form.email,
      senha: form.senha,
    });

    if (response?.ok) {
      alert("Operação realizada com sucesso! Autenticação bem-sucedida.");
      router.push("/");
      router.refresh();
      return <p>{response.message}</p>;
    } else {
      return response.error || <p>Erro</p>;
    }
  };

  return (
    <>
      <LoginForm onAuthConsumidor={authConsumidor} />
      <div>
        <button onClick={() => signIn("google")}>Login com google</button>
      </div>
    </>
  );
}
