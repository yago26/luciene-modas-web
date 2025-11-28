"use client";

import { Divider } from "antd";
import { useRouter } from "next/navigation";
import { QuestionOutlined } from "@ant-design/icons";

export default function MeusPedidos() {
  const router = useRouter();
  return (
    <>
      <h1>Meus pedidos</h1>
      <Divider style={{ borderColor: "black" }} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "gray",
          height: "50vh",
          gap: "2%",
        }}
      >
        <QuestionOutlined
          style={{
            fontSize: 50,
            border: "5px solid",
            borderRadius: "100%",
            padding: "15px",
          }}
        />
        <div style={{ textAlign: "center" }}>
          <h2>Nenhum pedido cadastrado!</h2>
          <p>
            Realize a compra de algum produto para verificar o status do seu
            respectivo pedido.
          </p>
        </div>
        <button
          style={{
            padding: "15px",
            border: "none",
            borderRadius: "30px",
            backgroundColor: "var(--cor-principal)",
            color: "var(--cor-secundaria)",
          }}
          onClick={() => router.push("/")}
        >
          Ir as compras
        </button>
      </div>
    </>
  );
}
