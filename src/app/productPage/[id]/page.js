"use client";

import { use } from "react";
import { useCarrinhoStore } from "@/app/store/carrinho";
// import db from "@/lib/db";
import { fakeProducts } from "@/lib/fakeDataBase";
import Link from "next/link";
import style from "./page.module.css";

export default function ProductPage({ params }) {
  const { adicionarProduto } = useCarrinhoStore();
  // let produto = db.query(`select * from tb_produto where ${indice} = id`);
  let produto;
  let { id } = use(params);
  console.log(id);
  for (let p of fakeProducts) {
    if (p.id == id) {
      produto = p;
      break;
    }
  }

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
      <h2>Produtos relacionados</h2>
    </>
  );
}
