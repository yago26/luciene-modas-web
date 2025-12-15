"use client";
import { useState } from "react";
import style from "./pedido.module.css";
import { DollarSign, Van, X } from "lucide-react";

export default function Pedido({ pedido }) {
  const [showSuccessAlertRemove, setShowSuccessAlertRemove] = useState(false);

  const handleExcluir = async () => {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL || ""}/api/pedidos/${pedido.id}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      setShowSuccessAlertRemove(true);
      return;
    }
  };

  return (
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
        <button onClick={handleExcluir} className={style.btnCancelar}>
          <X size={25} /> Excluir
        </button>
      </div>
    </div>
  );
}
