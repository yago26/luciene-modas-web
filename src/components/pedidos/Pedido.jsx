"use client";
import { useState } from "react";
import style from "./pedido.module.css";
import { DollarSign, Trash, Van } from "lucide-react";
import { LoadingOutlined } from "@ant-design/icons";
import { Divider, Spin } from "antd";
import Sucesso from "../toasts/Sucesso";

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
        <div style={{ color: "gray" }}>ID: {pedido.id}</div>

        <div
          style={{
            height: "200px",
            overflowY: "auto",
          }}
        >
          {pedido.itens.map((i) => (
            <div
              key={i.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                padding: "10px",
              }}
            >
              <img src={i.imagem} alt={i.nome} width={100} height={100} />
              <div>
                <h4>{i.nome}</h4>
                <div style={{ display: "flex", gap: "10px" }}>
                  <span>Valor: {i.valor.toFixed(2).replace(".", ",")}</span>
                  <span>Quantidade: {i.quantidade}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Divider style={{ borderColor: "gray" }} />

        <div>
          <span style={{ fontWeight: "bold" }}>
            Total:{" "}
            <span style={{ color: "green" }}>
              {pedido.total.replace(".", ",")}
            </span>
          </span>
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
          className={style.btnExcluir}
          disabled={loading}
        >
          {loading ? (
            <Spin
              indicator={
                <LoadingOutlined
                  style={{ fontSize: 25, color: "white" }}
                  spin
                />
              }
            />
          ) : (
            <Trash size={25} />
          )}
        </button>
      </div>
      {showSuccessAlertRemove && <Sucesso mensagem={"Pedido excluído."} />}
    </div>
  );
}
