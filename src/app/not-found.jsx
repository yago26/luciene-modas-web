"use client";

import { Frown } from "lucide-react";
import { useRouter } from "next/navigation";

export default () => {
  const router = useRouter();

  return (
    <div style={style.container}>
      <Frown style={{ color: "gray" }} size={150} />
      <h1 style={{ margin: 0 }}>404</h1>
      <h2>Ops, página não encontrada</h2>
      <p style={{ color: "gray" }}>
        Essa página não existe, ou não foi possível encontrá-la.
      </p>
      <button style={style.btn} onClick={() => router.push("/")}>
        Voltar à página inicial
      </button>
    </div>
  );
};

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "70vh",
  },
  btn: {
    padding: "15px",
    borderRadius: "30px",
    backgroundColor: "var(--cor-principal)",
    color: "var(--cor-secundaria)",
    border: "none",
  },
};
