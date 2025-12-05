"use client";

import Link from "next/link";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Spin } from "antd";
import style from "./itemCarrinho.module.css";
import { useCarrinhoStore } from "@/app/store/carrinho";
import { LoadingOutlined } from "@ant-design/icons";
import Sucesso from "../toasts/Sucesso";
import Aviso from "../toasts/Aviso";

export default function ItemCarrinho({
  produto,
  onSelecionarItem,
  onRemoverSelecionado,
}) {
  if (produto.estoque <= 0) {
    return;
  }

  const [loading, setLoading] = useState(false);
  const [quantidade, setQuantidade] = useState(produto.quantidade);
  const [quantidadeAnterior, setQuantidadeAnterior] = useState(
    produto.quantidade
  );

  const [showWarningAlert, setShowWarningAlert] = useState(false);
  const [keyWarning, setKeyWarning] = useState(0);

  const [showSucessAlertRemove, setShowSucessAlertRemove] = useState(false);

  const { atualizarProduto, removerProduto } = useCarrinhoStore();

  const handleEvent = async (e) => {
    const valor = e.target.value.replace(/[^0-9]/g, "");
    if (valor === "") {
      setQuantidade(produto.quantidade);
      return;
    }
    if (valor >= produto.estoque) {
      setQuantidade(produto.estoque);
      setShowWarningAlert(true);
      setKeyWarning((prev) => prev + 1);
      await atualizarProduto(produto.id, produto.estoque);
      setShowWarningAlert(false);
      return;
    }
    setQuantidade(valor);
    await atualizarProduto(produto.id, valor);
  };

  const handleDelete = async () => {
    setLoading(true);
    await removerProduto(produto.id);
    onRemoverSelecionado(produto.id);
    setLoading(false);
    setShowSucessAlertRemove(true);
    setTimeout(() => setShowSucessAlertRemove(false), 3000);
  };

  return (
    <>
      <div className={style.containerItemCarrinho}>
        <div className={style.containerProduto}>
          <Link
            href={`/produtos/${produto.id}`}
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

        <div className={style.containerQuantidadeProduto}>
          <button
            className={style.btn}
            onClick={async () => {
              if (quantidade <= 1) {
                onRemoverSelecionado(produto.id);
                await removerProduto(produto.id);
                setShowSucessAlertRemove(true);
                setTimeout(() => setShowSucessAlertRemove(false), 3000);
                return;
              }
              const novaQuantidade = quantidade - 1;
              setQuantidade(novaQuantidade);
              atualizarProduto(produto.id, novaQuantidade);
            }}
          >
            -
          </button>
          <input
            className={style.quantidade}
            type="text"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            onFocus={() => setQuantidadeAnterior(quantidade)}
            onBlur={async (e) => {
              const novoValor = e.target.value;
              if (novoValor == quantidadeAnterior) return;
              await handleEvent(e);
            }}
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                await handleEvent(e);
              }
            }}
          />
          <button
            className={style.btn}
            onClick={async () => {
              if (quantidade >= produto.estoque) {
                setQuantidade(produto.estoque);
                setShowWarningAlert(true);
                setKeyWarning((prev) => prev + 1);
                await atualizarProduto(produto.id, produto.estoque);
                setShowWarningAlert(false);
                return;
              }
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
              onSelecionarItem({ id: produto.id });
            }}
          />
        </div>
        <div>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className={style.btnRemover}
            onClick={async () => (loading ? "" : handleDelete())}
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
              <Trash2
                width={20}
                height={20}
                style={{ position: "relative", top: 1.5 }}
              />
            )}
          </button>
        </div>

        <div>
          <p className={style.valor}>R$ {produto.valor}</p>
        </div>
      </div>

      {showSucessAlertRemove && (
        <Sucesso mensagem="O item foi removido do carrinho com sucesso." />
      )}
      {showWarningAlert && (
        <Aviso
          key={keyWarning}
          mensagem={`O máximo disponível de "${produto.nome}" com esses atributos são ${produto.estoque} unidade(s)`}
        />
      )}
    </>
  );
}
