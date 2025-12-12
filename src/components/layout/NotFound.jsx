"use client";

import { QuestionOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

export default ({
  titulo,
  mensagem,
  caminho,
  mensagemCaminho = "Ir às compras",
}) => {
  const router = useRouter();
  return (
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
        <h2>{titulo}</h2>
        <p>{mensagem}</p>
      </div>
      {caminho && (
        <button
          style={{
            padding: "15px",
            border: "none",
            borderRadius: "30px",
            backgroundColor: "var(--cor-principal)",
            color: "var(--cor-secundaria)",
          }}
          onClick={() => router.push(caminho)}
        >
          {mensagemCaminho}
        </button>
      )}
    </div>
  );
};
