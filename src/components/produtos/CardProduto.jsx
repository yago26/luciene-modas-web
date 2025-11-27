"use client";

import Link from "next/link";
import style from "@/components/produtos/cardProduto.module.css";
import { useCarrinhoStore } from "@/app/store/carrinho";
import { Spin } from "antd";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import Sucesso from "../toasts/Sucesso";
  
export default function CardProduto({ produto, consumidor }) {
  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const { adicionarProduto } = useCarrinhoStore();

  let { id, nome, sobre, valor, imagem, estoque } = produto;
  const [reais, cents] = valor.split(".");

  if (nome.length > 42) {
    nome = nome.split("");
    nome.length = 39;
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
        <Link className={style.ancora} href={`/productPage/${id}`}>
          <img
            src={imagem}
            alt={sobre}
            width={150}
            height={150}
            style={{ objectFit: "cover" }}
          />
          <h4
            style={{
              minHeight: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "5px",
            }}
          >
            {nome}
          </h4>
          <p style={{ color: "gray" }}>{produto.id}</p>

          <p style={{ textAlign: "right" }}>
            <span style={{ fontSize: "1.3rem" }}>R$ {reais}</span>,
            <span>{cents}</span>
          </p>
        </Link>
        {consumidor && estoque > 0 && (
          <button
            className={style.btnAdicionar}
            onClick={() => (loading ? "" : handleAdd())}
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
