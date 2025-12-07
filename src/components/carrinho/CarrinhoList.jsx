"use client";

import { useCarrinhoStore } from "@/app/store/carrinho";
import style from "./carrinhoList.module.css";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import ItemCarrinho from "./ItemCarrinho";
import Erro from "../toasts/Erro";
import NotFound from "../layout/NotFound";
import { Divider } from "antd";

export default function CarrinhoList() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const [selecionados, setSelecionados] = useState(new Set());
  const { items, fetchItensCarrinho } = useCarrinhoStore();
  const [itemsCarrinho, setItemsCarrinho] = useState([]);

  useEffect(() => {
    async function carregar() {
      setLoading(true);
      await fetchItensCarrinho();
    }
    carregar();
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      loadCarrinho();
      setSelecionados(new Set());
    }
  }, [items]);

  async function loadCarrinho() {
    try {
      setLoading(true);

      const produtos = await Promise.all(
        items.map(async (item) => {
          const res = await fetch(
            `${process.env.NEXTAUTH_URL || ""}/api/produtos/${item.id_produto}`
          );
          const data = await res.json();
          return {
            ...data,
            quantidade:
              item.quantidade > data.estoque ? data.estoque : item.quantidade,
          };
        })
      );

      produtos.sort((a, b) => a.nome.localeCompare(b.nome));

      setItemsCarrinho(produtos);
    } finally {
      setLoading(false);
    }
  }

  function selecionarItem(produto) {
    setSelecionados((prev) => {
      const novo = new Set(prev);
      if (novo.has(produto.id)) novo.delete(produto.id);
      else novo.add(produto.id);
      return novo;
    });
  }

  function removerSelecionado(id) {
    setSelecionados((prev) => {
      const novo = new Set(prev);
      novo.delete(id);
      return novo;
    });
  }

  if (loading) {
    return <Loading />;
  }

  if (itemsCarrinho.length === 0 && !loading) {
    return (
      <NotFound
        titulo="Carrinho vazio!"
        mensagem="Seu carrinho está vazio no momento, adicione produtos para poder
          realizar uma compra."
      />
    );
  }

  return (
    <>
      <div className={style.containerCarrinho}>
        <div className={style.itens}>
          <h2>Itens</h2>
          <Divider style={{ borderColor: "black" }} />
          {itemsCarrinho.map((produto) => (
            <div
              key={produto.id}
              className={
                selecionados.has(produto.id)
                  ? style.selecionado
                  : style.naoSelecionado
              }
            >
              <ItemCarrinho
                produto={produto}
                onSelecionarItem={selecionarItem}
                onRemoverSelecionado={removerSelecionado}
              />
            </div>
          ))}
        </div>

        <div className={style.resumoCompra}>
          <h2>Resumo da Compra</h2>
          <Divider style={{ borderColor: "black" }} />
          {/* Colocar valores dos produtos selecionados */}
        </div>
      </div>

      {selecionados.size > 0 && (
        <div className={style.containerFinalizarCompra}>
          <button
            onClick={() => {
              if (selecionados.size <= 0) {
                setShowErrorAlert(true);
                setTimeout(() => setShowErrorAlert(false), 3000);
                return;
              }
              const quantidades = selecionados.forEach((s) => {
                const produto = items.find((i) => i.id_produto === s);
                return produto ? produto.quantidade : 0;
              });
              router.push(
                `/checkout?ids=${selecionados}&quantidades=${quantidades}`
              );
            }}
          >
            Finalizar compra
          </button>
        </div>
      )}

      {showErrorAlert && (
        <Erro mensagem="Selecione algum produto para iniciar a compra." />
      )}
    </>
  );
}
