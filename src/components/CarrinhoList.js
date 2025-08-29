"use client";

import Link from "next/link";
import { useCarrinhoStore } from "@/app/store/carrinho";
import style from "./carrinhoList.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CarrinhoList() {
  const [selecionados, setSelecionados] = useState([]);
  const { items, adicionarProduto, removerProduto, fetchItensCarrinho } =
    useCarrinhoStore();

  useEffect(() => {
    async function loadCarrinho() {
      await fetchItensCarrinho();
    }
    loadCarrinho();
  }, []);

  const router = useRouter();

  const handleAdd = async () => {
    await adicionarProduto(produto.id, 1);
  };

  const fetchProdutoById = async (id) => {
    const response = await fetch(`/api/produtos/${id}`);
    const data = await response.json();
    return data;
  };

  return (
    <>
      <div>
        {items?.map((item) => {
          const produto = fetchProdutoById(item.id_produto);

          return (
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
                <button className={style.btn} onClick={handleAdd}>
                  +
                </button>
                <span>{item.quantidade}</span>
                <button
                  className={style.btn}
                  onClick={() => {
                    if (item.quantidade <= 1) {
                      setSelecionados(
                        selecionados.filter((p) => p.id != produto.id)
                      );
                    }
                    removerProduto(produto.id);
                  }}
                >
                  -
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
          );
        })}
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
