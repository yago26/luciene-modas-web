"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Modal, Button, Card } from "antd";

export default function Checkout() {
  const searchParams = useSearchParams();

  const [produtos, setProdutos] = useState([]);
  const [produtosCompra, setProdutosCompra] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const idsParam = searchParams.get("ids");
    const quantidadesParam = searchParams.get("quantidades");

    if (!idsParam || !quantidadesParam) return;

    const ids = idsParam.split(",");
    const quantidades = quantidadesParam.split(",").map(Number);

    async function buscarProdutos() {
      const resultados = await Promise.all(
        ids.map(async (id) => {
          const res = await fetch(
            `${process.env.NEXTAUTH_URL || ""}/api/produtos/${id}`
          );
          return res.ok ? await res.json() : null;
        })
      );

      const produtosValidos = resultados.filter((p) => p !== null);
      setProdutos(produtosValidos);

      // Agora que produtos foram obtidos, montar produtosCompra:
      const listaCompra = produtosValidos.map((produto, index) => ({
        ...produto,
        quantidade: quantidades[index],
        subtotal: (produto.valor * quantidades[index]).toFixed(2),
      }));

      setProdutosCompra(listaCompra);
    }

    buscarProdutos();
  }, [searchParams]);

  const subtotalGeral = produtosCompra.reduce(
    (acc, item) => acc + Number(item.subtotal),
    0
  );

  const frete = 19.9;
  const total = subtotalGeral + frete;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Checkout</h1>

      <Card style={{ marginTop: "1rem", marginBottom: "1.5rem" }}>
        <h2>Produtos</h2>
        {produtosCompra.map((item) => (
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
              <strong>{item.nome}</strong>
              <p>Quantidade: {item.quantidade}</p>
            </div>

            <div style={{ textAlign: "right" }}>
              <p>Preço: R$ {Number(item.valor).toFixed(2)}</p>
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
          <h3>
            Total: <strong>R$ {total.toFixed(2)}</strong>
          </h3>
        </div>
      </Card>

      <Button
        type="primary"
        size="large"
        style={{ width: "100%", fontSize: "18px" }}
        onClick={() => setIsModalOpen(true)}
      >
        Finalizar pedido
      </Button>

      <Modal
        title="Pagamento"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Cancelar
          </Button>,
          <Button type="primary" key="pay">
            Pagar Agora
          </Button>,
        ]}
      >
        <p>Escolha uma forma de pagamento:</p>
        <ul>
          <li>Pix</li>
          <li>Boleto</li>
          <li>Cartão de Crédito</li>
        </ul>
      </Modal>
    </div>
  );
}
