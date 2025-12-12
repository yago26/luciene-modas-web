import getUsuarioServerSide from "@/lib/getUsuarioServerSide";
import style from "./page.module.css";
import { Divider } from "antd";
import { DollarSign, Van, X } from "lucide-react";
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

      try {
        const formData_itens_pedidos = new FormData();
        formData_itens_pedidos.append("");

        const res = await fetch(
          `${process.env.NEXTAUTH_URL}/api/itens-pedido`,
          {
            method: "POST",
            body: JSON.stringify({ pedidos: pedidos.map((p) => p.id) }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const i = await res.json();
        itens_pedido = i.data;
      } catch (err) {}
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
          <NotFound
            titulo="Sem pedidos cadastrados!"
            mensagem="Finalize algum pedido no seu carrinho de compras."
            caminho="/carrinho"
            mensagemCaminho="Ir para o carrinho"
          />
        ) : (
          pedidos.map((pedido) => (
            <div key={pedido.id} className={style.pedido}>
              <div className={style.infosPedido}>
                <div className={style.status}>
                  <div>
                    <Van className={style.icone} />
                    {pedido.entrega}
                  </div>
                  <div>
                    <DollarSign className={style.icone} />
                    {pedido.pagamento}
                  </div>
                </div>
                <div>
                  Data de criação:{" "}
                  {new Date(pedido.data_criacao).toLocaleString("pt-BR", {
                    timeZone: "America/Sao_Paulo",
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
              <div className={style.funcionalidades}>
                <button className={style.btnCancelar}>
                  <X size={25} /> Cancelar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
