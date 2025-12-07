"use client";

import { Divider } from "antd";
import NotFound from "@/components/layout/NotFound";

export default function MeusPedidos() {
  return (
    <>
      <h1>Meus pedidos</h1>
      <Divider style={{ borderColor: "black" }} />
      <NotFound
        titulo="Nenhum pedido cadastrado!"
        mensagem="Realize a compra de algum produto para verificar o status do seu respectivo pedido."
        caminho="/"
      />
    </>
  );
}
