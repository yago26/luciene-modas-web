"use client";
import style from "@/components/produtos/productPageMain.module.css";
import { useCarrinhoStore } from "@/app/store/carrinho";
import { useState } from "react";

export default ({ produto, consumidor }) => {
  const [cep, setCep] = useState("");
  const { adicionarProduto } = useCarrinhoStore();
  return (
    <>
      <div className={style.infosProduto}>
        <h1>{produto.nome}</h1>
        <p style={{ color: "gray" }}>ID: {produto.id}</p>

        <hr />

        <h4>Descrição</h4>
        <p>{!produto.sobre ? produto.nome : produto.sobre}</p>

        <h4 style={{ color: "gray" }}>Lembrete: Atributos</h4>
        {/* Manipular mais decentemente os atributos no banco de dados */}

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

        <p>Estoque: {produto.estoque}</p>

        <h3>R$ {produto.valor}</h3>

        {consumidor && (
          <button
            onClick={() => {
              adicionarProduto(produto.id, 1);
            }}
          >
            Adicionar ao carrinho
          </button>
        )}

        <hr />

        <h4>Calcular frete</h4>
        {consumidor ? (
          <input placeholder="Digite seu CEP" value={consumidor.cep} disabled />
        ) : (
          <input
            placeholder="Digite seu CEP"
            value={cep}
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
        <button>Consultar</button>
      </div>
    </>
  );
};
