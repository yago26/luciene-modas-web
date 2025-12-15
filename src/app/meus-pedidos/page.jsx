import { Divider } from "antd";
import PedidosList from "@/components/pedidos/PedidosList";
import getUsuarioServerSide from "@/lib/getUsuarioServerSide";

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
