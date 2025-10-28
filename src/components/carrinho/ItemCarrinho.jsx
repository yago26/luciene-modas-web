"use client";

import Link from "next/link";
import { useState } from "react";
import { X } from "lucide-react";
import { Alert, Spin } from "antd";
import style from "./itemCarrinho.module.css";
import { useCarrinhoStore } from "@/app/store/carrinho";
import { LoadingOutlined } from "@ant-design/icons";
import Sucesso from "../toasts/Sucesso";

export default function ItemCarrinho({
  produto,
  onSelecionarItem,
  onRemoverSelecionado,
}) {
  const [loading, setLoading] = useState(false);
  const [quantidade, setQuantidade] = useState(produto.quantidade);

  const [showSucessAlertRemove, setShowSucessAlertRemove] = useState(false);

  const { atualizarProduto, removerProduto } = useCarrinhoStore();

  return (
    <>
      <div className={style.containerProduto}>
        <div>
          <Link
            href={`/productPage/${produto.id}`}
            className={style.containerLinkProduto}
          >
            <img
              src={produto.imagem}
              alt={produto.sobre || produto.nome}
              width={100}
              height={100}
            />
            <span>
              <h3>{produto.nome}</h3>
              <p>{produto.sobre}</p>
            </span>
          </Link>
        </div>

        <div>
          <p>R$ {produto.valor}</p>
        </div>
        <div className={style.containerQuantidadeProduto}>
          <button
            className={style.btn}
            onClick={async () => {
              if (quantidade <= 1) {
                onRemoverSelecionado(produto.id);
                await removerProduto(produto.id);
                setShowSucessAlertRemove(true);
                setTimeout(() => setShowSucessAlertRemove(false), 3000);
              } else {
                const novaQuantidade = quantidade - 1;
                setQuantidade(novaQuantidade);
                atualizarProduto(produto.id, novaQuantidade);
              }
            }}
          >
            -
          </button>
          <span>{quantidade}</span>
          <button
            className={style.btn}
            onClick={async () => {
              const novaQuantidade = quantidade + 1;
              setQuantidade(novaQuantidade);
              await atualizarProduto(produto.id, novaQuantidade);
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
              onSelecionarItem(produto);
            }}
          />
        </div>
        <div>
          <button
            className={style.btnRemover}
            onClick={async () => {
              setLoading(true);
              await removerProduto(produto.id);
              setLoading(false);
              setShowSucessAlertRemove(true);
              setTimeout(() => setShowSucessAlertRemove(false), 3000);
              onRemoverSelecionado(produto.id);
            }}
          >
            {loading ? (
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{ color: "white", height: "100%" }}
                    spin
                  />
                }
              />
            ) : (
              <X width={20} height={20} />
            )}
          </button>
        </div>
      </div>

      {showSucessAlertRemove && (
        <Sucesso mensagem="O item foi removido do carrinho com sucesso." />
      )}
    </>
  );
}
