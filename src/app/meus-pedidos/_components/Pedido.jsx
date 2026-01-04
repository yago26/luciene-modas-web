"use client";
import Sucesso from "@/components/ui/toasts/Sucesso";

import { DollarSign, Trash, Van } from "lucide-react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import { useState } from "react";

import style from "./pedido.module.css";
import Divider from "@/components/ui/Divider";
import { formatDate, formatPrice } from "@/utils/dataFormatation";

export default function Pedido({ pedido, onRemoverPedidoLista }) {
  const [loading, setLoading] = useState(false);
  const [showSuccessAlertRemove, setShowSuccessAlertRemove] = useState(false);

  const excluir = async (id_pedido) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXTAUTH_URL || ""}/api/pedidos/${id_pedido}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setShowSuccessAlertRemove(true);
        onRemoverPedidoLista(id_pedido);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
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
                  <span>Valor: {formatPrice(i.valor)}</span>
                  <span>Quantidade: {i.quantidade}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Divider />

        <div>
          <span style={{ fontWeight: "bold" }}>
            Total:{" "}
            <span style={{ color: "green" }}>{formatPrice(pedido.total)}</span>
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

        <div>{formatDate(pedido.data_criacao)}</div>
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
