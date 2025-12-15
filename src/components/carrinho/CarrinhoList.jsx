"use client";

import { useCarrinhoStore } from "@/app/store/carrinho";
import style from "./carrinhoList.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ItemCarrinho from "./ItemCarrinho";
import Erro from "../toasts/Erro";
import NotFound from "../layout/NotFound";
import { Divider } from "antd";
import Loading from "../layout/Loading";

export default function CarrinhoList() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const [selecionados, setSelecionados] = useState(new Set());

  const { itens, fetchItensCarrinho } = useCarrinhoStore();

  useEffect(() => {
    async function carregar() {
      setLoading(true);
      await fetchItensCarrinho();
      setLoading(false);
    }
    carregar();
  }, []);

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
      <div className={style.containerCarrinho}>
        {/* LISTA DE PRODUTOS */}
        <div className={style.containerProdutos}>
          <h2>Produtos</h2>
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
