"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Modal, Button, Divider } from "antd";
import Loading from "../loading";

export default function Checkout() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    const idsParam = searchParams.get("ids");
    const quantidadesParam = searchParams.get("quantidades");

    if (!idsParam || !quantidadesParam) return;

    const ids = idsParam.split(",");
    const quantidades = quantidadesParam.split(",").map(Number);

    async function buscarProdutos() {
      try {
        const resultados = await Promise.all(
          ids.map(async (id) => {
            const res = await fetch(
              `${process.env.NEXTAUTH_URL || ""}/api/produtos/${id}`
            );
            return res.ok ? await res.json() : null;
          })
        );

        const produtosValidos = resultados.filter((p) => p !== null);

        // Agora que produtos foram obtidos, montar produtosCompra:
        const listaCompra = produtosValidos.map((produto, index) => ({
          ...produto,
          quantidade: quantidades[index],
          subtotal: (produto.valor * quantidades[index]).toFixed(2),
        }));

        setProdutos(listaCompra);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    buscarProdutos();
  }, [searchParams]);

  const finalizarPedido = async () => {
    total = subtotalGeral + frete;
    try {
      const res = await fetch(`${process.env.NEXTAUTH_URL || ""}/api/pedidos`, {
        method: "POST",
        body: JSON.stringify({
          itens: produtos,
          total: total,
        }),
      });
      if (res.ok) {
        alert("Sucesso! Pedido finalizado.");
        setIsModalOpen(false);
        setTimeout(() => {
          router.push("/meus-pedidos");
        }, 3000);
      } else {
        const erro = await res.json();
        alert(erro.error || "Erro ao finalizar pedido.");
        setIsModalOpen(false);
      }
    } catch (e) {
      alert("Ocorreu um erro inesperado");
    }
  };

  const subtotalGeral = produtos.reduce(
    (acc, item) => acc + Number(item.subtotal),
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
        <Divider style={{ borderColor: "black" }} />
        {produtos.map((item) => (
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
                alt={item.sobre || item.nome}
                width={100}
                height={100}
              />
              <strong>{item.nome}</strong>
              <p>Quantidade: {item.quantidade}</p>
            </div>

            <div style={{ textAlign: "right" }}>
              <p>Preço unitário: R$ {Number(item.valor).toFixed(2)}</p>
              <p>
                Subtotal: <strong>R$ {item.subtotal}</strong>
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
          <Divider style={{ borderColor: "black" }} />
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
