"use client";

import { useCarrinhoStore } from "@/app/_store/carrinho";
import ItemsList from "./ItemsList";
import ResumoCompra from "./ResumoCompra";
import Funcionalidades from "./Funcionalidades";

import { useEffect, useState } from "react";

import style from "./clientComponent.module.css";

export default function ClientComponent() {
  useEffect(() => {
    async function carregar() {
      try {
        await fetchItensCarrinho();
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, []);

  const [loadingRemoveSelectionAll, setLoadingRemoveSelectionAll] =
    useState(false);

  const [loading, setLoading] = useState(true);

  const [selecionados, setSelecionados] = useState(new Set());

  const handleRemoveAll = async () => {
    setLoadingRemoveSelectionAll(true);
    try {
      const ids = itens.map((i) => (i = i.id));
      await removerTodosItens(ids);
    } catch (err) {
      console.log(err);
      setLoadingRemoveSelectionAll(false);
    } finally {
      setLoadingRemoveSelectionAll(false);
    }
  };

  const handleSelectAll = async () => {
    const lista = new Set();
    for (let item of itens) {
      lista.add(item.id);
    }
    setSelecionados(lista);
  };

  const handleRemoveSelectionAll = async () => {
    setSelecionados(new Set());
  };

  const selecionarItem = (id) => {
    setSelecionados((prev) => {
      const novo = new Set(prev);
      if (novo.has(id)) novo.delete(id);
      else novo.add(id);
      return novo;
    });
  };

  const removerItemSelecionado = (id) => {
    setSelecionados((prev) => {
      const novo = new Set(prev);
      novo.delete(id);
      return novo;
    });
  };

  const { itens, fetchItensCarrinho, removerTodosItens } = useCarrinhoStore();

  let selecionadosArray = [];
  let subtotal = 0;

  if (itens) {
    selecionadosArray = itens.filter((p) => selecionados.has(p.id));
    subtotal = selecionadosArray.reduce(
      (acc, p) => acc + p.quantidade * Number(p.valor),
      0
    );
  }

  return (
    <div className={style.container}>
      <div className={style.carrinho}>
        <Funcionalidades
          itens={itens}
          selecionados={selecionados}
          loadingRemoveSelectionAll={loadingRemoveSelectionAll}
          handleRemoveSelectionAll={handleRemoveSelectionAll}
          handleSelectAll={handleSelectAll}
          handleRemoveAll={handleRemoveAll}
        />
        <ItemsList
          loading={loading}
          selecionados={selecionados}
          itens={itens}
          selecionarItem={selecionarItem}
          removerItemSelecionado={removerItemSelecionado}
        />
      </div>
      <div className={style.resumoCompra}>
        <ResumoCompra
          selecionados={selecionados}
          selecionadosArray={selecionadosArray}
          subtotal={subtotal}
        />
      </div>
    </div>
  );
}
