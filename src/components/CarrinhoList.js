"use client";

import Link from "next/link";
import { useCarrinhoStore } from "@/app/store/carrinho";
import style from "./carrinhoList.module.css";
import { useEffect, useState } from "react";

export default function CarrinhoList() {
  const [selecionados, setSelecionados] = useState([]);
  const { items, atualizarProduto, removerProduto, fetchItensCarrinho } =
    useCarrinhoStore();
  const [itemsCarrinho, setItemsCarrinho] = useState([]);

  useEffect(() => {
    async function loadCarrinho() {
      await fetchItensCarrinho();
      const produtos = [];
      for (let item of items) {
        const response = await fetch(`/api/produtos/${item.id_produto}`);
        const data = await response.json();
        data.quantidade = item.quantidade;
        produtos.push(data);
      }
      setItemsCarrinho(produtos); // prev serve para pegar o estado mais atual possível
    }
    loadCarrinho();
  }, []);

  return (
    <>
      <div>
        {itemsCarrinho?.map((produto) => (
          <div key={produto.id} className={style.containerProduto}>
            <Link
              href={`/productPage/${produto.id}`}
              className={style.containerLinkProduto}
            >
              <img
                src={produto.imagem}
                alt={produto.sobre}
                width={100}
                height={100}
              />
              <div>
                <h3>{produto.nome}</h3>
                <p>{produto.sobre}</p>
                <p>{produto.valor}</p>
              </div>
            </Link>
            <div className={style.containerQuantidadeProduto}>
              <button
                className={style.btn}
                onClick={() => {
                  if (produto.quantidade <= 1) {
                    setSelecionados(
                      selecionados.filter((p) => p.id != produto.id)
                    );
                    removerProduto(produto.id);
                  } else {
                    atualizarProduto(produto.id, produto.quantidade - 1);
                  }
                }}
              >
                -
              </button>
              <span>{produto.quantidade}</span>
              <button
                className={style.btn}
                onClick={() => {
                  atualizarProduto(produto.id, produto.quantidade + 1);
                }}
              >
                +
              </button>
            </div>
            <div className={style.containerSelecaoProduto}>
              <input
                id={produto.id}
                name={produto.id}
                className={style.checkbox}
                type="checkbox"
                onChange={(e) => {
                  if (selecionados.find((p) => p.id === produto.id)) {
                    setSelecionados(
                      selecionados.filter((p) => p.id !== produto.id)
                    );
                    return;
                  }
                  setSelecionados([...selecionados, produto]);
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className={style.containerFinalizarCompra}>
        <button
          onClick={() => {
            console.log(selecionados);
            if (selecionados.length <= 0) {
              alert("Erro! Nenhum produto selecionado.");
              return;
            }
            router.push(`/shopCar/checkout/${selecionados}`);
            router.refresh();
          }}
        >
          Finalizar compra
        </button>
      </div>
      <div>
        <h3>Selecionados</h3>
        {selecionados.map((p) => (
          <div key={p.id}>
            <p>{p.nome}</p>
          </div>
        ))}
      </div>
    </>
  );
}
