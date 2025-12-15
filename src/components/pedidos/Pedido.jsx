"use client";
import { useState } from "react";
import style from "./pedido.module.css";
import { DollarSign, Trash, Van } from "lucide-react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export default function Pedido({ pedido, onRemoverPedidoLista }) {
  const [loading, setLoading] = useState(false);
  const [showSuccessAlertRemove, setShowSuccessAlertRemove] = useState(false);

  const excluir = async (id_pedido) => {
    setLoading(true);
    const response = await fetch(
      `${process.env.NEXTAUTH_URL || ""}/api/pedidos/${id_pedido}`,
      {
        method: "DELETE",
      }
    );
    setLoading(false);

    if (response.ok) {
      setShowSuccessAlertRemove(true);
      onRemoverPedidoLista(id_pedido);
      return;
    }
  };

  return (
    <div key={pedido.id} className={style.pedido}>
      <div className={style.infosPedido}>
        <div>
          {pedido.itens.map((i) => (
            <div key={i.id}>{i.nome}</div>
          ))}
        </div>

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
        <button
          onClick={() => excluir(pedido.id)}
          className={style.btnCancelar}
          disabled={loading}
        >
          {loading ? (
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 25 }} spin />}
            />
          ) : (
            <Trash size={25} />
          )}
        </button>
      </div>
    </div>
  );
}
