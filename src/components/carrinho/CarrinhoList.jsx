"use client";

import { useCarrinhoStore } from "@/app/store/carrinho";
import style from "./carrinhoList.module.css";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import ItemCarrinho from "./ItemCarrinho";
import Erro from "../toasts/Erro";
import NotFound from "../layout/NotFound";

export default function CarrinhoList() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const [selecionados, setSelecionados] = useState([]);
  const { items, fetchItensCarrinho } = useCarrinhoStore();
  const [itemsCarrinho, setItemsCarrinho] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchItensCarrinho();
  }, []);

  useEffect(() => {
    loadCarrinho();
  }, [items]);

  async function loadCarrinho() {
    const produtos = await Promise.all(
      items.map(async (item) => {
        const res = await fetch(
          `${process.env.NEXTAUTH_URL || ""}/api/produtos/${item.id_produto}`
        );
        const data = await res.json();
        return { ...data, quantidade: item.quantidade };
      })
    );
    setItemsCarrinho(produtos);
    setLoading(false);
  }

  function selecionarItem(produto) {
    if (selecionados.find((p) => p.id === produto.id)) {
      setSelecionados(selecionados.filter((p) => p.id !== produto.id));
      return;
    }
    setSelecionados([...selecionados, produto]);
  }

  function removerSelecionado(id) {
    setSelecionados(selecionados.filter((p) => p.id !== id));
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
      <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
        {itemsCarrinho.map((produto) => (
          <div
            key={produto.id}
            className={
              selecionados.find((s) => s.id == produto.id)
                ? style.selecionado
                : style.naoSelecionado
            }
          >
            <ItemCarrinho
              className={style.containerProduto}
              produto={produto}
              onSelecionarItem={selecionarItem}
              onRemoverSelecionado={removerSelecionado}
            />
          </div>
        ))}
      </div>

      {selecionados.length > 0 && (
        <div className={style.containerFinalizarCompra}>
          <button
            onClick={() => {
              if (selecionados.length <= 0) {
                setShowErrorAlert(true);
                setTimeout(() => setShowErrorAlert(false), 3000);
                return;
              }
              const quantidades = selecionados.map((s) => {
                const produto = items.find((i) => i.id_produto === s.id);
                return produto ? produto.quantidade : 0; // Se o produto não for encontrado, retorna 0
              });
              const ids = selecionados.map((s) => (s = s.id));
              router.push(`/checkout?ids=${ids}&quantidades=${quantidades}`);
              router.refresh();
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
