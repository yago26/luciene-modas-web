"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import Loading from "@/components/layout/Loading";
import Divider from "@/components/ui/Divider";

export default function Checkout() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const ids_itens_carrinho = searchParams.get("ids");

    if (!ids_itens_carrinho) return;

    async function buscarItens() {
      try {
        const response = await fetch(
          `${
            process.env.NEXTAUTH_URL || ""
          }/api/itens-carrinho?ids=${ids_itens_carrinho}`
        );
        const itens_carrinho = await response.json();
        setItens(itens_carrinho);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    buscarItens();
  }, [searchParams]);

  const finalizarPedido = async () => {
    total = subtotalGeral + frete;
    try {
      const itens_pedido = itens.map(
        (i) =>
          (i = { id: i.id, id_produto: i.id_produto, quantidade: i.quantidade })
      );
      console.log(itens_pedido);
      const res = await fetch(`${process.env.NEXTAUTH_URL || ""}/api/pedidos`, {
        method: "POST",
        body: JSON.stringify({
          itens: itens_pedido,
          total: total,
        }),
      });
      if (res.ok) {
        alert("Sucesso! Pedido finalizado.");
        setIsModalOpen(false);
        router.push("/meus-pedidos");
      } else {
        const erro = await res.json();
        alert(erro.error || "Erro ao finalizar pedido.");
        setIsModalOpen(false);
        router.push("/perfil");
      }
    } catch (e) {
      alert("Ocorreu um erro inesperado");
    }
  };

  const subtotalGeral = itens.reduce(
    (acc, item) => acc + item.valor * item.quantidade,
    0
  );

  const frete = subtotalGeral >= 150 ? 0 : subtotalGeral >= 50 ? 9.9 : 14.9;

  let total = subtotalGeral + frete;

  if (loading) {
    return <Loading />;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Checkout</h1>

      <div
        style={{
          padding: "30px",
          backgroundColor: "whitesmoke",
          boxShadow: "1px 1px 10px gray",
          borderRadius: "10px",
          marginTop: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <h2 style={{ color: "var(--cor-principal)" }}>Produtos</h2>
        <Divider />
        {itens.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <div>
              <img
                style={{ marginRight: "15px" }}
                src={item.imagem}
                alt={item.nome}
                width={100}
                height={100}
              />
              <strong>{item.nome}</strong>
              <p>Quantidade: {item.quantidade}</p>
            </div>

            <div style={{ textAlign: "right" }}>
              <p>Preço unitário: R$ {Number(item.valor).toFixed(2)}</p>
              <p>
                Subtotal:{" "}
                <strong>R$ {(item.valor * item.quantidade).toFixed(2)}</strong>
              </p>
            </div>
          </div>
        ))}

        <div style={{ marginTop: "1.5rem" }}>
          <p>
            Subtotal dos produtos:{" "}
            <strong>R$ {subtotalGeral.toFixed(2)}</strong>
          </p>
          <p>
            Frete: <strong>R$ {frete.toFixed(2)}</strong>
          </p>
          <Divider />
          <h3 style={{ color: "black" }}>
            Total:{" "}
            <strong style={{ color: "green" }}>R$ {total.toFixed(2)}</strong>
          </h3>
        </div>
      </div>

      <Button
        type="primary"
        size="large"
        style={{
          width: "100%",
          fontSize: "18px",
          background: "var(--cor-principal)",
        }}
        onClick={() => setIsModalOpen(true)}
      >
        Finalizar pedido
      </Button>

      <Modal
        title="Finalização de pedido"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Cancelar
          </Button>,
          <Button
            key="finalizar pedido"
            onClick={finalizarPedido}
            style={{ backgroundColor: "green" }}
            type="primary"
          >
            Finalizar pedido
          </Button>,
        ]}
      >
        <p>Tem certeza que deseja finalizar o pedido?</p>
      </Modal>
    </div>
  );
}
