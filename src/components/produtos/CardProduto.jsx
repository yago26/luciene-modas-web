"use client";

import Link from "next/link";
import style from "@/components/produtos/cardProduto.module.css";
import { Spin } from "antd";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import Sucesso from "../ui/toasts/Sucesso";
import Aviso from "../ui/toasts/Aviso";
import { useCarrinhoStore } from "@/app/_store/carrinho";

export default function CardProduto({ produto, usuario }) {
  const { adicionarItemCarrinho } = useCarrinhoStore();

  const [loading, setLoading] = useState(false);

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [keySuccess, setKeySuccess] = useState(0);

  const [showWarningAlert, setShowWarningAlert] = useState(false);
  const [keyWarning, setKeyWarning] = useState(0);

  let { id, nome, valor, imagem, estoque } = produto;

  const [reais, cents] = valor.split(".");

  if (nome.length > 63) {
    nome = nome.split("");
    nome.length = 60;
    nome.push("...");
    nome = nome.join().replaceAll(",", "");
  }

  const handleAdd = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const result = await adicionarItemCarrinho(id, 1);

      if (result === true) {
        setShowSuccessAlert(true);
        setKeySuccess((k) => k + 1);
      } else {
        setShowWarningAlert(true);
        setKeyWarning((k) => k + 1);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={style.produto}>
        <Link href={`/produtos/${id}`}>
          <img
            src={imagem}
            alt={nome}
            width="100%"
            height={200}
            style={{ objectFit: "cover" }}
          />
          <h4 className={style.nome}>{nome}</h4>

          <p className={style.valor}>
            <span>R$ {reais}</span>,<span>{cents}</span>
          </p>
        </Link>
        {usuario && estoque > 0 && (
          <button
            className={style.btnAdicionar}
            onClick={handleAdd}
            disabled={loading}
          >
            {loading ? (
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{ color: "white", height: "100%", fontSize: 16 }}
                    spin
                  />
                }
              />
            ) : (
              "Adicionar"
            )}
          </button>
        )}
      </div>

      {showSuccessAlert && (
        <Sucesso
          key={`${id}-s-${keySuccess}`}
          mensagem={`${nome} adicionado(a) ao carrinho com sucesso!`}
        />
      )}
      {showWarningAlert && (
        <Aviso
          key={`${id}-w-${keyWarning}`}
          mensagem={`O máximo disponível de "${nome}" com esses atributos são ${estoque} unidade(s)`}
        />
      )}
    </>
  );
}
