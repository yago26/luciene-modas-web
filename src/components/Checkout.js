"use client";
import { useCarrinhoStore } from "@/app/store/carrinho";

export default () => {
  const { produtos, limparCarrinho } = useCarrinhoStore();

  const finalizarCompra = async () => {
    const res = await fetch("/api/pedido", {
      method: "POST",
      body: JSON.stringify({ usuario, produtos }),
    });
    if (res.ok) {
      alert("Pedido feito com sucesso!");
      limparCarrinho();
    }
  };

  return (
    <div>
      <h2>Resumo da compra</h2>
      {produtos.map((p) => (
        <div key={p.id}>
          <span>{p.nome}</span>
          <span>
            {p.quantidade} x R$ {p.valor.toFixed(2)}
          </span>
        </div>
      ))}
      <button onClick={finalizarCompra}>Finalizar pedido</button>
    </div>
  );
};
