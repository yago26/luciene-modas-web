"use client";

import { useCarrinhoStore } from "@/app/store/carrinho";
import Sucesso from "../../components/toasts/Sucesso";
import Aviso from "../../components/toasts/Aviso";

import { Divider, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { useState } from "react";

import style from "./funcionalidadesProduto.module.css";

export default ({ produto, usuario }) => {
  const { id, nome, estoque } = produto;

  const valor = produto.valor.replace(".", ",");

  const [loading, setLoading] = useState(false);

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [keySuccess, setKeySuccess] = useState(0);

  const [showWarningAlert, setShowWarningAlert] = useState(false);
  const [keyWarning, setKeyWarning] = useState(0);

  const [cep, setCep] = useState("");
  const [quantidade, setQuantidade] = useState(1);

  const { itens, adicionarItemCarrinho } = useCarrinhoStore();

  const item = itens.find((i) => i.id_produto === id);

  const handleAdd = async () => {
    setLoading(true);
    if (quantidade > estoque) {
      setShowWarningAlert(true);
      setKeyWarning((prev) => prev + 1);
      setLoading(false);
      return;
    }

    if (item) {
      const somaComNovaQuantidade =
        Number(item.quantidade) + Number(quantidade);
      if (estoque <= item.quantidade || estoque < somaComNovaQuantidade) {
        setShowWarningAlert(true);
        setKeyWarning((prev) => prev + 1);
        setLoading(false);
        return;
      }
    }

    try {
      const result = await adicionarItemCarrinho(id, quantidade);
      if (result) {
        setShowSuccessAlert(true);
        setKeySuccess((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={style.container}>
        <h4 style={{ color: "gray" }}>Lembrete: Atributos</h4>
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
        <p style={{ color: "gray", marginLeft: "20px" }}>Para cosméticos</p>
        <p className={style.valor}>R$ {valor}</p>
        <Divider style={{ borderColor: "black" }} />
        {usuario && estoque > 0 && (
          <>
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

            <div className={style.containerQuantidade}>
              <button
                onClick={() => {
                  if (quantidade - 1 > 0)
                    setQuantidade((prev) => Number(prev - 1));
                }}
              >
                -
              </button>
              <input
                type="text"
                value={quantidade}
                onChange={(e) => {
                  const valor = e.target.value.replace(/[^0-9]/g, "");
                  setQuantidade(valor);
                }}
                onBlur={(e) => {
                  if (e.target.value == "") setQuantidade(1);
                }}
              />
              <button onClick={() => setQuantidade((prev) => Number(prev + 1))}>
                +
              </button>
            </div>
          </>
        )}
        <div className={style.containerFrete}>
          <h2>Estimar o frete</h2>
          <div>
            {usuario ? (
              <input
                className={style.cep}
                value={usuario.cep?.replace(/(\d{5})(\d{1,3})/, "$1-$2") || ""}
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
          key={`s-${keySuccess}`}
          mensagem={`${nome} adicionado(a) ao carrinho com sucesso!`}
        />
      )}
      {showWarningAlert && (
        <Aviso
          key={`w-${keyWarning}`}
          mensagem={`O máximo disponível de "${nome}" com esses atributos são ${estoque} unidade(s)`}
        />
      )}
    </>
  );
};
