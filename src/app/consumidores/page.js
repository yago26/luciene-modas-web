"use client";

import { useState, useEffect } from "react";
import ConsumidoresList from "@/components/ConsumidoresList";

export default function Consumidores() {
  const [consumidores, setConsumidores] = useState([]);

  useEffect(() => {
    fetchConsumidor();
  }, []);

  const fetchConsumidor = async () => {
    const response = await fetch("/api/consumidores");
    const data = await response.json();
    setConsumidores(data);
  };

  const deleteConsumidor = async (id) => {
    const response = await fetch(`/api/consumidores/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      fetchConsumidor();
    }
  };
  return (
    <>
      <h1>Gerenciamento de Usuários Consumidores</h1>
      <ConsumidoresList
        consumidores={consumidores}
        onDeleteConsumidor={deleteConsumidor}
      />
    </>
  );
}
