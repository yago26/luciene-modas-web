"use client";
/* O padrão é estar do lado do servidor ('use server') */

import Link from "next/link";
import { useState, useEffect } from "react";
import ConsumidoresForm from "@/components/ConsumidoresSignUp";

export default function SignUp() {
  const [consumidores, setConsumidores] = useState([]);

  useEffect(() => {
    fetchConsumidores();
  }, []);

  const fetchConsumidores = async () => {
    const response = await fetch("/api/consumidores");
    const data = await response.json();
    setConsumidores(data);
  };

  const addConsumidor = async (consumidor) => {
    const response = await fetch("/api/consumidores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(consumidor),
    });
    if (response.ok) {
      fetchConsumidores();
    }
  };

  return (
    <>
      <Link href="../">Voltar</Link>
      <ConsumidoresForm onAddConsumidor={addConsumidor} />
    </>
  );
}
