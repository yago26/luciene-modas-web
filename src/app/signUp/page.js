"use client";
/* O padrão é estar do lado do servidor ('use server') */

import SignUpForm from "@/components/formularios/SignUpForm";
import Sucesso from "@/components/toasts/Sucesso";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
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
      <SignUpForm onAddConsumidor={addConsumidor} />
      {showSuccessAlert && <Sucesso mensagem="Cadastro bem-sucedido." />}
    </>
  );
}
