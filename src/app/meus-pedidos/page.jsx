import getUsuarioServerSide from "@/lib/getUsuarioServerSide";
import PedidosList from "./PedidosList";

import { Divider } from "antd";

export default async function MeusPedidos() {
  const usuario = await getUsuarioServerSide();

  if (!usuario) return;

  return (
    <div>
      <h1>Meus pedidos</h1>
      <Divider style={{ borderColor: "black" }} />
      <PedidosList usuario={usuario} />
    </div>
  );
}
