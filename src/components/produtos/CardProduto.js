"use client";

import Link from "next/link";
import style from "@/components/produtos/cardProduto.module.css";
import { useCarrinhoStore } from "@/app/store/carrinho";
import { Alert, Spin } from "antd";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";

export default function CardProduto({ produto, consumidor }) {
  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const { adicionarProduto } = useCarrinhoStore();

  let { id, nome, sobre, valor, imagem } = produto;
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
      setTimeout(() => setShowSuccessAlert(false), 4000); // fecha após 3s
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
        {consumidor && (
          <button className={style.btnAdicionar} onClick={handleAdd}>
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
        <Alert
          style={{ position: "fixed", bottom: 10, right: 10, zIndex: 10 }}
          message="Item adicionado!"
          description={`${nome} adicionado(a) ao carrinho com sucesso!`}
          type="success"
          showIcon
          closable
          onClose={() => setShowSuccessAlert(false)}
        />
      )}
    </>
  );
}
