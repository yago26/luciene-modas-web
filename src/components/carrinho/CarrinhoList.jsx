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

  const selecionadosArray = itemsCarrinho.filter((p) => selecionados.has(p.id));

  const subtotal = selecionadosArray.reduce(
    (acc, p) => acc + p.quantidade * Number(p.valor),
    0
  );

  if (loading) return <Loading />;

  if (itemsCarrinho.length == 0) {
    return (
      <NotFound
        titulo="Carrinho vazio!"
        mensagem="Seu carrinho está vazio no momento, adicione produtos para continuar."
        caminho="/"
      />
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
                  onSelecionarItem={() => selecionarItem(produto.id)}
                  onRemoverSelecionado={() => removerSelecionado(produto.id)}
                />
              </div>
            ))}
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

                  const quantidades = ids.map((id) => {
                    const item = itemsCarrinho.find((p) => p.id === id);
                    return item?.quantidade || 0;
                  });

                  router.push(
                    `/checkout?ids=${ids}&quantidades=${quantidades}`
                  );
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
