import style from "./pedidosList.module.css";
import Pedido from "./Pedido";
import NotFound from "../layout/NotFound";

export default async function PedidosList({ usuario }) {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/pedidos/${usuario.id}`
  );
  const pedidos = await response.json();

  return (
    <div className={style.containerPedido}>
      {pedidos.length === 0 ? (
        <NotFound
          titulo="Sem pedidos cadastrados!"
          mensagem="Finalize algum pedido no seu carrinho de compras."
          direcionar="/carrinho"
          mensagemDirecionar="Ir para o carrinho"
        />
      ) : (
        pedidos?.map((pedido) => <Pedido key={pedido.id} pedido={pedido} />)
      )}
    </div>
  );
}
