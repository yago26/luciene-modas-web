"use client";

import { useCarrinhoStore } from "@/app/store/carrinho";
import style from "./carrinhoList.module.css";
import { useEffect, useState } from "react";

import { QuestionOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import ItemCarrinho from "./ItemCarrinho";
import { Alert } from "antd";

export default function CarrinhoList() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const [selecionados, setSelecionados] = useState([]);
  const { items, fetchItensCarrinho } = useCarrinhoStore();
  const [itemsCarrinho, setItemsCarrinho] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchItensCarrinho();
  }, []);

  useEffect(() => {
    loadCarrinho();
  }, [items]);

  async function loadCarrinho() {
    const produtos = await Promise.all(
      items.map(async (item) => {
        const res = await fetch(`/api/produtos/${item.id_produto}`);
        const data = await res.json();
        return { ...data, quantidade: item.quantidade };
      })
    );
    setItemsCarrinho(produtos);
    setLoading(false);
  }

  function selecionarItem(produto) {
    if (selecionados.find((p) => p.id === produto.id)) {
      setSelecionados(selecionados.filter((p) => p.id !== produto.id));
      return;
    }
    setSelecionados([...selecionados, produto]);
  }

  function removerSelecionado(id) {
    setSelecionados(selecionados.filter((p) => p.id !== id));
  }

  if (loading) {
    return <Loading />;
  }

  if (itemsCarrinho.length === 0 && !loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "gray",
          height: "50vh",
          gap: "2%",
        }}
      >
        <QuestionOutlined
          style={{
            fontSize: 50,
            border: "5px solid",
            borderRadius: "100%",
            padding: "15px",
          }}
        />
        <div style={{ textAlign: "center" }}>
          <h2>Carrinho vazio</h2>
          <p>
            Seu carrinho está vazio no momento, adicione produtos para
            <br />
            poder realizar uma compra.
          </p>
        </div>
        <button
          style={{
            padding: "15px",
            border: "none",
            borderRadius: "30px",
            backgroundColor: "var(--cor-principal)",
            color: "var(--cor-secundaria)",
          }}
          onClick={() => router.push("/")}
        >
          Ir as compras
        </button>
      </div>
    );
  }

  return (
    <>
      <div>
        {itemsCarrinho.map((produto) => (
          <ItemCarrinho
            key={produto.id}
            produto={produto}
            onSelecionarItem={selecionarItem}
            onRemoverSelecionado={removerSelecionado}
            className={style.containerProduto}
          />
        ))}
      </div>

      <div className={style.containerFinalizarCompra}>
        <button
          onClick={() => {
            if (selecionados.length <= 0) {
              setShowErrorAlert(true);
              setTimeout(() => setShowErrorAlert(false), 3000);
              return;
            }
            router.push(`/shopCar/checkout/${selecionados}`);
            router.refresh();
          }}
        >
          Finalizar compra
        </button>
      </div>
      <div>
        <h3>Selecionados</h3>
        {selecionados.map((p) => (
          <div key={p.id}>
            <p>{p.nome}</p>
          </div>
        ))}
      </div>

      {showErrorAlert && (
        <Alert
          style={{ position: "fixed", bottom: 10, right: 10, zIndex: 10 }}
          message="Erro!"
          description="Selecione algum produto para iniciar a compra."
          type="error"
          showIcon
          closable
        />
      )}
    </>
  );
}
