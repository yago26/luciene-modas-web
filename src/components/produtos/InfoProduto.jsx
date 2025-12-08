"use client";

import style from "@/components/produtos/infoProduto.module.css";
import { useCarrinhoStore } from "@/app/store/carrinho";
import { useState } from "react";
import { Divider, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Sucesso from "../toasts/Sucesso";

export default ({ produto, usuario }) => {
  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const valor = String(produto.valor).replace(".", ",");

  const [cep, setCep] = useState("");
  const { adicionarProduto } = useCarrinhoStore();

  const handleAdd = async () => {
    setLoading(true);
    const result = await adicionarProduto(produto.id, 1);
    setLoading(false);
    if (result) {
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 4000);
    }
  };

  return (
    <>
      <div className={style.infosProduto}>
        <h1>{produto.nome}</h1>

        <Divider style={{ borderColor: "black" }} />

        <h3>Descrição</h3>
        <p>{!produto.sobre ? produto.nome : produto.sobre}</p>

        {/* <h4 style={{ color: "gray" }}>Lembrete: Atributos</h4>
        Manipular mais decentemente os atributos no banco de dados

        <p>
          Selecione a opção de <strong>tamanho (PP, P, M, G, GG)</strong>
        </p>
        <input type="radio" />
        <p style={{ color: "gray", marginLeft: "20px" }}>Para roupas</p>

        <p>
          Selecione a opção de <strong>volume</strong>
        </p>
        <input type="radio" />
        <p style={{ color: "gray", marginLeft: "20px" }}>Para cosméticos</p> */}

        <p className={style.valor}>R$ {valor}</p>

        <Divider style={{ borderColor: "black" }} />

        {usuario && produto.estoque > 0 && (
          <button
            className={style.btnAdicionar}
            onClick={() => (loading ? "" : handleAdd())}
          >
            {loading ? (
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{ color: "white", height: "100%", fontSize: 15 }}
                    spin
                  />
                }
              />
            ) : (
              "Adicionar"
            )}
          </button>
        )}

        <div className={style.containerFrete}>
          <h2>Estimar o frete</h2>
          <div>
            {usuario ? (
              <input
                className={style.cep}
                value={usuario.cep.replace(/(\d{5})(\d{1,3})/, "$1-$2") || ""}
                placeholder="Altere seu CEP no perfil."
                disabled
              />
            ) : (
              <input
                value={cep || ""}
                className={style.cep}
                placeholder="Digite seu CEP"
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, ""); // remove tudo que não é número
                  if (value.length > 8) value = value.slice(0, 8); // limita a 8 dígitos
                  // Aplica a formatação do CEP automaticamente
                  if (value.length > 5) {
                    value = value.replace(/(\d{5})(\d{1,3})/, "$1-$2");
                  }
                  setCep(value);
                }}
                maxLength={9}
              />
            )}
            <button onClick={() => alert("Função indisponível.")}>
              Consultar
            </button>
          </div>
        </div>
      </div>

      {showSuccessAlert && (
        <Sucesso
          mensagem={`${produto.nome} adicionado(a) ao carrinho com sucesso!`}
        />
      )}
    </>
  );
};
