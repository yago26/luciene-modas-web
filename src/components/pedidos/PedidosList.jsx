"use client";

import style from "./pedidosList.module.css";
import Pedido from "./Pedido";
import NotFound from "../layout/NotFound";
import { useEffect, useState } from "react";
import Loading from "../layout/Loading";

export default function PedidosList({ usuario }) {
  const [pedidos, setPedidos] = useState([]);
  const [listaPedidos, setListaPedidos] = useState(new Set());
  const [loading, setLoading] = useState(true);

  async function carregar() {
    try {
      const response = await fetch(
        `${process.env.NEXTAUTH_URL || ""}/api/pedidos/${usuario.id}`
      );
      const data = await response.json();
      setPedidos(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    setLoading(true);
    carregar();
    pedidos.map((p) =>
      setListaPedidos((prev) => {
        const novo = new Set(prev);
        novo.add(p.id);
        return novo;
      })
    );
    setLoading(false);
  }, []);

  useEffect(() => {
    if (loading) return;
    carregar();
  }, [listaPedidos]);

  const removerPedidoLista = (id_pedido) => {
    setListaPedidos((prev) => {
      const novo = new Set(prev);
      novo.delete(id_pedido);
      return novo;
    });
  };

  return (
    <div className={style.containerPedidos}>
      {loading ? (
        <Loading />
      ) : pedidos.length == 0 ? (
        <NotFound
          titulo="Sem pedidos cadastrados!"
          mensagem="Finalize algum pedido no seu carrinho de compras."
          direcionar="/carrinho"
          mensagemDirecionar="Ir para o carrinho"
        />
      ) : (
        pedidos?.map((pedido) => (
          <Pedido
            key={pedido.id}
            pedido={pedido}
            onRemoverPedidoLista={removerPedidoLista}
          />
        ))
      )}
    </div>
  );
}
