import getUsuarioServerSide from "@/lib/getUsuarioServerSide";
import style from "./page.module.css";
import { Divider } from "antd";
import { DollarSign, Van } from "lucide-react";
import NotFound from "../not-found";

export default async function MeusPedidos() {
  let pedidos = [];
  let itens_pedido = [];
  try {
    const usuario = await getUsuarioServerSide();
    const formData = new FormData();
    formData.append("id", usuario.id);
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/pedidos/get`,
      { method: "POST", body: formData }
    );
    if (response.ok) {
      const p = await response.json();
      pedidos = p.data;
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/itens-pedido`, {
        method: "POST", body: JSON.stringify({ pedidos: pedidos }),
      });
      itens_pedido = await res.json();
    } else {
      throw new Error(response.error);
    }
  } catch (err) {
  } finally {
  }

  return (
    <div>
      <h1>Meus pedidos</h1>
      <Divider style={{ borderColor: "black" }} />
      <div className={style.containerPedido}>
        {pedidos.length === 0 ? (
          <NotFound titulo="Sem pedidos cadastrados!" mensagem="Finalize algum pedido no seu carrinho de compras." caminho="/carrinho" mensagemCaminho="Ir para o carrinho" />
        ) : pedidos.map((pedido) => (
          <div key={pedido.id} className={style.pedido}>
            <div className={style.status}>
              <div><Van className={style.icone} />{pedido.pagamento}</div>
              <div><DollarSign className={style.icone} />{pedido.pagamento}</div>
            </div>
            <div>Data de criação: {pedido.data_criacao}</div>
            <Divider style={{ borderColor: "gray" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
