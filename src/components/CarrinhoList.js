"use client";

import Link from "next/link";
import { useCarrinhoStore } from "@/app/store/carrinho";
import style from "./carrinhoList.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CarrinhoList({ usuario }) {
  const [selecionados, setSelecionados] = useState({});
  const { produtos, adicionarProduto, removerProduto } = useCarrinhoStore();
  const router = useRouter();

  const genero = usuario.genero;
  return (
    <>
      <div>
        <h1>
          Bem vind
          {genero === "Masculino" ? "o" : genero === "Feminino" ? "a" : "(o)a"}!
        </h1>
        <h2>Esse é o seu Carrinho de Compras</h2>
        <hr />
        {produtos.map((p) => (
          <div key={p.id} className={style.containerProduto}>
            <Link
              href={`/productPage/${p.id}`}
              className={style.containerLinkProduto}
            >
              <img src={p.url} alt={p.sobre} width={100} height={100} />
              <div>
                <h3>{p.nome}</h3>
                <p>{p.sobre}</p>
                <p>{p.valor}</p>
              </div>
            </Link>
            <div className={style.containerQuantidadeProduto}>
              <button
                className={style.btn}
                onClick={() => {
                  adicionarProduto(p);
                }}
              >
                +
              </button>
              <span>{p.quantidade}</span>
              <button
                className={style.btn}
                onClick={() => {
                  removerProduto(p);
                }}
              >
                -
              </button>
            </div>
            <div className={style.containerSelecaoProduto}>
              <input
                id={p.id}
                name={p.id}
                className={style.checkbox}
                type="checkbox"
                onChange={() => {
                  setSelecionados({});
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className={style.containerFinalizarCompra}>
        <button
          onClick={() => {
            router.push(`./checkout/${selecionados}`);
            router.refresh();
          }}
        >
          Finalizar compra
        </button>
      </div>
    </>
  );
}
