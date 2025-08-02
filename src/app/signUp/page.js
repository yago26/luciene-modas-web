"use client";
/* O padrão é estar do lado do servidor ('use server') */

import Link from "next/link";
import { useState, useEffect } from "react";
import SignUpForm from "@/components/formularios/SignUpForm";

export default function SignUp() {
  const addConsumidor = async (consumidor) => {
    // fetch => Uma busca na API
    await fetch("/api/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(consumidor),
    });
  };

  return (
    <>
      <SignUpForm onAddConsumidor={addConsumidor} />
    </>
  );
}
