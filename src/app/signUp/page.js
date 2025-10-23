"use client";
/* O padrão é estar do lado do servidor ('use server') */

import SignUpForm from "@/components/formularios/SignUpForm";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();

  const addConsumidor = async (consumidor) => {
    // fetch => Uma busca na API
    const res = await fetch("/api/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(consumidor),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Operação realizada com sucesso! Cadastro bem-sucedido.");
      router.push("/login");
      return;
    } else {
      return data.error;
    }
  };

  return (
    <>
      <SignUpForm onAddConsumidor={addConsumidor} />
    </>
  );
}
