"use client";

import { useCarrinhoStore } from "@/app/store/carrinho";
import Sucesso from "../../../components/ui/toasts/Sucesso";
import Aviso from "../../../components/ui/toasts/Aviso";

import { Spin } from "antd";
import { Trash2 } from "lucide-react";
import { LoadingOutlined } from "@ant-design/icons";

import Link from "next/link";
import { useState } from "react";

import style from "./item.module.css";

export default function ItemCarrinho({
  item,
  selecionados,
  onSelecionarItem,
  onRemoverItemSelecionado,
}) {
  if (item.estoque <= 0) {
    return;
  }

  const valor = String(item.valor).replace(".", ",");

  const [loading, setLoading] = useState(false);
  const [quantidade, setQuantidade] = useState(item.quantidade);
  const [quantidadeAnterior, setQuantidadeAnterior] = useState(item.quantidade);

  const [showWarningAlert, setShowWarningAlert] = useState(false);
  const [keyWarning, setKeyWarning] = useState(0);

  const [showSucessAlertRemove, setShowSucessAlertRemove] = useState(false);

  const { atualizarItemCarrinho, removerItemCarrinho } = useCarrinhoStore();

  const handleEvent = async (e) => {
    const valor = e.target.value.replace(/[^0-9]/g, "");
    if (valor === "") {
      setQuantidade(item.quantidade);
      return;
    }
    if (valor > item.estoque) {
      setQuantidade(item.estoque);
      setShowWarningAlert(true);
      setKeyWarning((prev) => prev + 1);
      await atualizarItemCarrinho(item.id, item.estoque);
      setShowWarningAlert(false);
      return;
    }
    setQuantidade(valor);
    await atualizarItemCarrinho(item.id, valor);
  };

  const handleRemove = async () => {
    if (loading) return;

    setLoading(true);
    try {
      await removerItemCarrinho(item.id);
      onRemoverItemSelecionado(item.id);
      setShowSucessAlertRemove(true);
      setTimeout(() => setShowSucessAlertRemove(false), 3000);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={style.containerItemCarrinho}>
        <div className={style.containerSelecaoItem}>
          <input
            id={item.id}
            name={item.id}
            className={style.checkbox}
            checked={selecionados.has(item.id)}
            type="checkbox"
            onChange={(e) => {
              onSelecionarItem({ id: item.id });
            }}
          />
        </div>

        <div className={style.containerItem}>
          <Link href={`/produtos/${item.id_produto}`}>
            <img
              src={item.imagem}
              alt={item.sobre || item.nome}
              width={130}
              height={130}
            />
          </Link>
          <div>
            <Link href={`/produtos/${item.id_produto}`}>
              <h3>{item.nome}</h3>
            </Link>
          </div>
        </div>

        <div className={style.containerQuantidadeItem}>
          <button
            className={style.btn}
            onClick={async () => {
              if (quantidade == 1) {
                return;
              }
              const novaQuantidade = quantidade - 1;
              setQuantidade(novaQuantidade);
              atualizarItemCarrinho(item.id, novaQuantidade);
            }}
          >
            -
          </button>
          <input
            className={style.quantidade}
            type="text"
            value={quantidade}
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) return;
              if (e.target.value <= item.estoque)
                setQuantidade(e.target.value.trim());
              else {
                setShowWarningAlert(true);
                setKeyWarning((prev) => prev + 1);
              }
            }}
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
              if (quantidade >= item.estoque) {
                setShowWarningAlert(true);
                setKeyWarning((prev) => prev + 1);
                return;
              }
              const novaQuantidade = Number(quantidade + 1);
              setQuantidade(novaQuantidade);
              await atualizarItemCarrinho(item.id, novaQuantidade);
            }}
          >
            +
          </button>
        </div>

        <div className={style.containerValor}>
          <p className={style.valor}>R$ {valor}</p>
        </div>

        <div className={style.containerExcluir}>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className={style.btnRemover}
            onClick={handleRemove}
            disabled={loading}
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
      </div>

      {showSucessAlertRemove && (
        <Sucesso mensagem="O item foi removido do carrinho com sucesso." />
      )}
      {showWarningAlert && (
        <Aviso
          key={keyWarning}
          mensagem={`O máximo disponível de "${item.nome}" com esses atributos são ${item.estoque} unidade(s)`}
        />
      )}
    </>
  );
}
