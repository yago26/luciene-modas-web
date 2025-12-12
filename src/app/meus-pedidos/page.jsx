import getUsuarioServerSide from "@/lib/getUsuarioServerSide";
import style from "./page.module.css";
import { Divider } from "antd";

export default async function MeusPedidos() {
  let pedidos = [];
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
        {pedidos.map((pedido) => (
          <div key={pedido.id}>
            <div>Entrega: {pedido.pagamento}</div>
            <div>Pagamento: {pedido.pagamento}</div>
            <div>Data: {pedido.data_criacao}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
