"use client";

import Link from "next/link";
import { useCarrinhoStore } from "@/app/store/carrinho";
import style from "./carrinhoList.module.css";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Alert } from "antd";
import { QuestionOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

export default function CarrinhoList() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showSucessAlertRemove, setShowSucessAlertRemove] = useState(false);

  const [selecionados, setSelecionados] = useState([]);
  const { items, atualizarProduto, removerProduto, fetchItensCarrinho } =
    useCarrinhoStore();
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
    setItemsCarrinho(produtos); // prev serve para pegar o estado mais atual possível
    setLoading(false);
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
          <p>Seu carrinho está vazio no momento</p>
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
        <table style={{ width: "100%" }}>
          <thead style={{ borderBottom: "1px solid gray" }}>
            <tr>
              <th>Produto</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Selecionar</th>
              <th>Remover</th>
            </tr>
          </thead>

          <tbody>
            {itemsCarrinho?.map((produto) => (
              <tr key={produto.id} className={style.containerProduto}>
                <td>
                  <Link
                    href={`/productPage/${produto.id}`}
                    className={style.containerLinkProduto}
                  >
                    <img
                      src={produto.imagem}
                      alt={produto.sobre}
                      width={100}
                      height={100}
                    />
                    <span>
                      <h3>{produto.nome}</h3>
                      <p>{produto.sobre}</p>
                    </span>
                  </Link>
                </td>

                <td>
                  <p>R$ {produto.valor}</p>
                </td>

                <td className={style.containerQuantidadeProduto}>
                  <button
                    className={style.btn}
                    onClick={async () => {
                      if (produto.quantidade <= 1) {
                        setSelecionados(
                          selecionados.filter((p) => p.id != produto.id)
                        );
                        await removerProduto(produto.id);

                        setShowSucessAlertRemove(true);
                        setTimeout(() => setShowSucessAlertRemove(false), 3000);
                      } else {
                        atualizarProduto(produto.id, produto.quantidade - 1);
                      }
                    }}
                  >
                    -
                  </button>
                  <span>{produto.quantidade}</span>
                  <button
                    className={style.btn}
                    onClick={async () => {
                      await atualizarProduto(
                        produto.id,
                        produto.quantidade + 1
                      );
                    }}
                  >
                    +
                  </button>
                </td>

                <td className={style.containerSelecaoProduto}>
                  <input
                    id={produto.id}
                    name={produto.id}
                    className={style.checkbox}
                    type="checkbox"
                    onChange={(e) => {
                      if (selecionados.find((p) => p.id === produto.id)) {
                        setSelecionados(
                          selecionados.filter((p) => p.id !== produto.id)
                        );
                        return;
                      }
                      setSelecionados([...selecionados, produto]);
                    }}
                  />
                </td>

                <td>
                  <button
                    className={style.btnRemover}
                    onClick={async () => {
                      setLoading(true);
                      await removerProduto(produto.id);
                      setLoading(false);

                      setShowSucessAlertRemove(true);
                      setTimeout(() => setShowSucessAlertRemove(false), 3000);

                      setSelecionados(
                        selecionados.filter((p) => p.id !== produto.id)
                      );
                    }}
                  >
                    <X width={20} height={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

      {showSucessAlertRemove && (
        <Alert
          style={{ position: "fixed", bottom: 10, right: 10, zIndex: 10 }}
          message="Item removido!"
          description="O item foi removido do carrinho com sucesso."
          type="success"
          showIcon
          closable
        />
      )}
    </>
  );
}
