"use client";

import { useCarrinhoStore } from "@/app/store/carrinho";
import Loading from "../../components/layout/Loading";
import NotFound from "../../components/layout/NotFound";
import ItemCarrinho from "./ItemCarrinho";
import Erro from "../../components/toasts/Erro";

import { Divider, Spin } from "antd";
import { Minus, Plus, Trash2 } from "lucide-react";
import { LoadingOutlined } from "@ant-design/icons";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import style from "./carrinhoList.module.css";

export default function CarrinhoList() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [loadingRemoveSelectionAll, setLoadingRemoveSelectionAll] =
    useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const [selecionados, setSelecionados] = useState(new Set());

  const { itens, fetchItensCarrinho, removerTodosItens } = useCarrinhoStore();

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

  function selecionarItem(idProduto) {
    setSelecionados((prev) => {
      const novo = new Set(prev);
      if (novo.has(idProduto)) novo.delete(idProduto);
      else novo.add(idProduto);
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
    <>
      <div className={style.itensCarrinho}>
        {/* LISTA DE PRODUTOS */}
        <div className={style.containerProdutos}>
          <div className={style.containerSuperior}>
            <h2>Produtos</h2>
            <div className={style.funcionalidades}>
              <button
                disabled={loadingRemoveSelectionAll}
                className={style.removerTodos}
                onClick={handleRemoveAll}
              >
                {loadingRemoveSelectionAll ? (
                  <Spin
                    indicator={
                      <LoadingOutlined
                        style={{ color: "red", height: "100%" }}
                        spin
                      />
                    }
                  />
                ) : (
                  <Trash2 />
                )}
                Remover todos os produtos
              </button>
              {itens.length === selecionados.size ? (
                <button
                  className={style.removerSelecaoTodos}
                  onClick={handleRemoveSelectionAll}
                >
                  <Minus />
                  Remover seleção de todos os produtos
                </button>
              ) : (
                <button
                  className={style.selecionarTodos}
                  onClick={handleSelectAll}
                >
                  <Plus />
                  Selecionar todos os produtos
                </button>
              )}
            </div>
          </div>
          <Divider style={{ borderColor: "black" }} />

          <div className={style.produtos}>
            {loading ? (
              <Loading />
            ) : itens.length == 0 ? (
              <NotFound
                titulo="Carrinho vazio!"
                mensagem="Seu carrinho está vazio no momento, adicione produtos para continuar."
              />
            ) : (
              itens.map((item) => (
                <div
                  key={item.id}
                  className={
                    selecionados.has(item.id)
                      ? style.selecionado
                      : style.naoSelecionado
                  }
                >
                  <ItemCarrinho
                    selecionados={selecionados}
                    item={item}
                    onSelecionarItem={() => selecionarItem(item.id)}
                    onRemoverSelecionado={() => removerSelecionado(item.id)}
                  />
                </div>
              ))
            )}
          </div>
        </div>

        {/* RESUMO DA COMPRA */}
        <div className={style.resumoCompra}>
          <h2>Resumo da Compra</h2>
          <Divider style={{ borderColor: "black" }} />

          {!(selecionadosArray.length > 0) ? (
            <p style={{ color: "gray" }}>
              Selecione produtos para realizar a compra.
            </p>
          ) : (
            <div style={{ marginBottom: "20px" }}>
              {selecionadosArray.map((p) => (
                <div key={p.id} className={style.itemResumoCompra}>
                  <span>
                    {p.nome} <br /> ({p.quantidade} × R${" "}
                    {Number(p.valor).toFixed(2).replace(".", ",")})
                  </span>

                  <strong>
                    R${" "}
                    {(p.quantidade * Number(p.valor))
                      .toFixed(2)
                      .replace(".", ",")}
                  </strong>
                </div>
              ))}
            </div>
          )}

          <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            Subtotal:{" "}
            <span style={{ color: "green" }}>
              R$ {subtotal.toFixed(2).replace(".", ",")}
            </span>
          </p>

          {selecionados.size > 0 && (
            <div className={style.containerRealizarCompra}>
              <button
                onClick={() => {
                  if (selecionados.size === 0) {
                    setShowErrorAlert(true);
                    setTimeout(() => setShowErrorAlert(false), 3000);
                    return;
                  }

                  const ids = Array.from(selecionados);

                  router.push(`/checkout?ids=${ids}`);
                }}
              >
                Realizar compra
              </button>
            </div>
          )}
        </div>
      </div>

      {showErrorAlert && (
        <Erro mensagem="Selecione algum produto para iniciar a compra." />
      )}
    </>
  );
}
