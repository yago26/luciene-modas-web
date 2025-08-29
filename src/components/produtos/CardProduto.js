"use client";

import Link from "next/link";
import style from "@/components/produtos/cardProduto.module.css";
import { useCarrinhoStore } from "@/app/store/carrinho";

export default function CardProduto({ produto, consumidor }) {
  const { adicionarProduto } = useCarrinhoStore();

  let { id, nome, sobre, valor, imagem } = produto;
  const [reais, cents] = valor.split(".");

  if (nome.length > 42) {
    nome = nome.split("");
    nome.length = 39;
    nome.push("...");
    nome = nome.join().replaceAll(",", "");
  }

  const handleAdd = async () => {
    await adicionarProduto(produto.id, 1);
  };

  return (
    <>
      <div className={style.produto}>
        <Link className={style.ancora} href={`/productPage/${id}`}>
          <img
            src={imagem}
            alt={sobre}
            width={150}
            height={150}
            style={{ objectFit: "cover" }}
          />
          <h4
            style={{
              minHeight: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "5px",
            }}
          >
            {nome}
          </h4>
          <p style={{ textAlign: "right" }}>
            <span style={{ fontSize: "1.3rem" }}>R${reais}</span>,
            <span>{cents}</span>
          </p>
        </Link>
        {consumidor && (
          <button className={style.btnAdicionar} onClick={handleAdd}>
            Adicionar
          </button>
        )}
      </div>
    </>
  );
}
