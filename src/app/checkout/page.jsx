"use client";

import ItemCheckout from "@/components/carrinho/ItemCheckout";
import { Divider } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCarrinhoStore } from "@/app/store/carrinho";

export default function CheckoutPage() {
  const { removerProduto } = useCarrinhoStore();

  const [produtos, setProdutos] = useState([]);
  const searchParams = useSearchParams();

  const ids = searchParams.get("ids")?.split(",") ?? [];
  const quantidades = searchParams.get("quantidades")?.split(",") ?? [];

  useEffect(() => {
    async function fetchProdutos() {
      const produtosCarregados = await Promise.all(
        ids.map(async (id, index) => {
          const res = await fetch(
            `${process.env.NEXTAUTH_URL || ""}/api/produtos/${id}`
          );
          const produto = await res.json();
          return {
            ...produto,
            quantidade: Number(quantidades[index] ?? 1),
          };
        })
      );
      setProdutos(produtosCarregados);
    }
    fetchProdutos();
  }, []);

  const finalizarCompra = async () => {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/pedido`, {
      method: "POST",
      body: JSON.stringify({ usuario, produtos }),
    });
    if (res.ok) {
      alert("Pedido feito com sucesso!");
    }
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h1>Checkout</h1>
      </div>

      <Divider style={{ borderColor: "black" }} />
      {produtos?.map((produto) => (
        <ItemCheckout key={produto.id} produto={produto} />
      ))}
      <Divider style={{ borderColor: "black" }} />

      <button onClick={finalizarCompra}>Finalizar pedido</button>
    </div>
  );
}
