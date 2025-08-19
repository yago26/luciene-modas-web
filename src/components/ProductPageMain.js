"use client";
import style from "./productPageMain.module.css";
import { useCarrinhoStore } from "@/app/store/carrinho";

export default function ProductPageMain({ produto }) {
  console.log(produto);
  const { adicionarProduto } = useCarrinhoStore();
  return (
    <>
      <div className={style.containerInfosProduto}>
        <div className={style.imagensProduto}>
          <div>Imagens laterais</div>
          <img
            src={produto.url}
            alt={produto.sobre}
            width={320}
            height={320}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={style.infosProduto}>
          <h1>{produto.nome}</h1>
          <hr />
          <p>{produto.sobre}</p>
          <p>{produto.valor}</p>
          <p>Tamanho: {produto.tamanho}</p>
          <p>Estoque: {produto.estoque}</p>
          <button
            onClick={() => {
              adicionarProduto(produto);
            }}
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </>
  );
}
