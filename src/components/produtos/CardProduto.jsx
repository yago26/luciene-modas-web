"use client";

import Link from "next/link";
import style from "@/components/produtos/cardProduto.module.css";
import { useCarrinhoStore } from "@/app/store/carrinho";
import { Spin } from "antd";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import Sucesso from "../toasts/Sucesso";

export default function CardProduto({ produto, usuario }) {
  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const { items, adicionarProduto, atualizarProduto } = useCarrinhoStore();

  let { id, nome, sobre, valor, imagem, estoque } = produto;
  const [reais, cents] = valor.split(".");

  if (nome.length > 63) {
    nome = nome.split("");
    nome.length = 60;
    nome.push("...");
    nome = nome.join().replaceAll(",", "");
  }

  const handleAdd = async () => {
    setLoading(true);
    const result = await adicionarProduto(produto.id, 1);
    setLoading(false);
    if (result) {
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000);
    }
  };

  return (
    <>
      <div className={style.produto}>
        <Link href={`/produtos/${id}`}>
          <img
            src={imagem}
            alt={sobre}
            width={150}
            height={150}
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
            onClick={() => (loading ? "" : handleAdd())}
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
        <Sucesso mensagem={`${nome} adicionado(a) ao carrinho com sucesso!`} />
      )}
    </>
  );
}
