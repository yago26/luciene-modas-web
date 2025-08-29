"use client";
import style from "@/components/produtos/productPageMain.module.css";
import { useCarrinhoStore } from "@/app/store/carrinho";

export default ({ produto, consumidor }) => {
  const { adicionarProduto } = useCarrinhoStore();
  return (
    <>
      <div className={style.infosProduto}>
        <h1>{produto.nome}</h1>
        <hr />
        <p>{!produto.sobre ? produto.nome : produto.sobre}</p>
        <p>{produto.valor}</p>
        <p>Estoque: {produto.estoque}</p>
        {consumidor && (
          <button
            onClick={() => {
              adicionarProduto(produto.id, 1);
            }}
          >
            Adicionar ao carrinho
          </button>
        )}
      </div>
    </>
  );
};
