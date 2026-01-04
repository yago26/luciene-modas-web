import getUsuarioServerSide from "@/utils/getUsuarioServerSide";
import PedidosList from "./_components/PedidosList";
import Divider from "@/components/ui/Divider";

export default async function MeusPedidos() {
  const usuario = await getUsuarioServerSide();

  if (!usuario) return;

  return (
    <div>
      <h1>Meus pedidos</h1>
      <Divider />
      <PedidosList usuario={usuario} />
    </div>
  );
}
