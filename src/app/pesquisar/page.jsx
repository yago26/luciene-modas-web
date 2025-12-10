"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, Row, Col, Divider } from "antd";
import Loading from "../loading";
import style from "./page.module.css";
import NotFound from "@/components/layout/NotFound";

export default function Pesquisar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const nome = searchParams.get("nome") || "";

  const [filtros, setFiltros] = useState({
    categoria: "",
    subcategoria: "",
    valorMinimo: "",
    valorMaximo: "",
  });

  const [produtos, setProdutos] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    setLoading(true);
    try {
      const res = await fetch("/api/produtos?estoque=disponivel");
      let data = await res.json();
      setProdutos(data);
    } catch (err) {
      console.error("Erro ao carregar produtos:", err);
    } finally {
      setLoading(false);
    }
  }

  // Filtrar produtos quando o termo mudar
  useEffect(() => {
    if (!nome.trim()) {
      setFiltrados(produtos);
      return;
    }

    const resultado = produtos.filter((produto) =>
      produto.nome.toLowerCase().includes(nome.toLowerCase())
    );

    setFiltrados(resultado);

    if (filtros.categoria) {
      setFiltrados((prev) =>
        prev.filter((d) => d.categoria === filtros.categoria)
      );
    }
    if (filtros.subcategoria) {
      setFiltrados((prev) =>
        prev.filter((d) => d.subcategoria === filtros.subcategoria)
      );
    }
    if (filtros.valorMinimo) {
      setFiltrados((prev) =>
        prev.filter((d) => d.valor > Number(filtros.valorMinimo))
      );
    }
    if (filtros.valorMaximo) {
      setFiltrados((prev) =>
        prev.filter((d) => d.valor < Number(filtros.valorMaximo))
      );
    }
  }, [nome, filtros, produtos]);

  const limparFiltros = () => {
    setFiltros({
      categoria: "",
      subcategoria: "",
      valorMinimo: "",
      valorMaximo: "",
    });
  };

  return (
    <div className={style.containerPesquisa}>
      <div className={style.containerFiltros}>
        <h2>Filtros</h2>
        <Divider style={{ borderColor: "black" }} />
        <h3>Categoria</h3>
        <ul className={style.listaCategoria}>
          <li>
            <input
              id="roupas"
              name="categoria"
              type="radio"
              value="roupas"
              onChange={(e) => {
                setFiltros({ ...filtros, categoria: e.target.value });
              }}
              checked={filtros.categoria == "roupas"}
            />
            <label htmlFor="roupas">Roupas</label>
          </li>
          <li>
            <input
              id="cosmeticos"
              name="categoria"
              type="radio"
              value="cosmeticos"
              onChange={(e) => {
                setFiltros({ ...filtros, categoria: e.target.value });
              }}
              checked={filtros.categoria == "cosmeticos"}
            />
            <label htmlFor="cosmeticos">Cosméticos</label>
          </li>
          <li>
            <input
              id="outros"
              name="categoria"
              type="radio"
              value="outros"
              onChange={(e) => {
                setFiltros({ ...filtros, categoria: e.target.value });
              }}
              checked={filtros.categoria == "outros"}
            />
            <label htmlFor="outros">Outros</label>
          </li>
        </ul>

        <h3>Subcategoria</h3>
        <ul className={style.listaSubcategoria}>
          <li>
            <input
              id="masculino"
              name="subcategoria"
              type="radio"
              value="masculino"
              onChange={(e) => {
                setFiltros({ ...filtros, subcategoria: e.target.value });
              }}
              checked={filtros.subcategoria == "masculino"}
            />
            <label htmlFor="masculino">Masculino</label>
          </li>
          <li>
            <input
              id="feminino"
              name="subcategoria"
              type="radio"
              value="feminino"
              onChange={(e) => {
                setFiltros({ ...filtros, subcategoria: e.target.value });
              }}
              checked={filtros.subcategoria == "feminino"}
            />
            <label htmlFor="feminino">Feminino</label>
          </li>
          <li>
            <input
              id="infantil"
              name="subcategoria"
              type="radio"
              value="infantil"
              onChange={(e) => {
                setFiltros({ ...filtros, subcategoria: e.target.value });
              }}
              checked={filtros.subcategoria == "infantil"}
            />
            <label htmlFor="infantil">Infantil</label>
          </li>
          <li>
            <input
              id="sub-outros"
              name="subcategoria"
              type="radio"
              value="outros"
              onChange={(e) => {
                setFiltros({ ...filtros, subcategoria: e.target.value });
              }}
              checked={filtros.subcategoria == "outros"}
            />
            <label htmlFor="sub-outros">Outros</label>
          </li>
        </ul>

        <h3>Intervalos de Preços</h3>
        <ul>
          <li className={style.valores}>
            <label htmlFor="inicial">Inicial: </label>
            <input
              id="inicial"
              type="number"
              placeholder="19,99"
              value={filtros.valorMinimo || ""}
              onChange={(e) =>
                setFiltros({
                  ...filtros,
                  valorMinimo: e.target.value,
                })
              }
            />
          </li>

          <li className={style.valores}>
            <label htmlFor="final">Final: </label>
            <input
              id="final"
              type="number"
              placeholder="49,99"
              value={filtros.valorMaximo || ""}
              onChange={(e) =>
                setFiltros({ ...filtros, valorMaximo: e.target.value })
              }
            />
          </li>
        </ul>

        <button className={style.btnLimparFiltros} onClick={limparFiltros}>
          Limpar filtros
        </button>
      </div>

      <div className={style.containerResultados}>
        <h2>Resultados para: "{nome}"</h2>
        {loading ? (
          <Loading />
        ) : (
          filtrados.length === 0 && (
            <NotFound
              titulo="Nenhum produto encontrado!"
              mensagem="Não há nenhum produto cadastrado e disponível com esses filtros e/ou nome."
            />
          )
        )}

        <Row gutter={[16, 16]} style={{ marginTop: 10 }}>
          {!loading &&
            filtrados.map((produto) => (
              <Col xs={24} sm={12} md={8} lg={6} key={produto.id}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={produto.nome}
                      src={produto.imagem}
                      style={{
                        height: 200,
                        objectFit: "cover",
                      }}
                    />
                  }
                  onClick={() => router.push(`/produtos/${produto.id}`)}
                >
                  <Card.Meta
                    title={produto.nome}
                    description={`R$ ${Number(produto.valor).toFixed(2)}`}
                  />
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}
