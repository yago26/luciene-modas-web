import style from "@/components/produtos/produtosList.module.css";

import CardProduto from "@/components/produtos/CardProduto";

import { Suspense } from "react";
import Loading from "@/app/loading";
import getConsumidorServerSide from "@/lib/getUsuarioServerSide";

export default async function ProdutosList() {
  const response_produtos_disponiveis = await fetch(
    `${process.env.NEXTAUTH_URL}/api/produtos_disponiveis`
  );
  const produtos_disponiveis = await response_produtos_disponiveis.json();

  const response_produtos_indisponiveis = await fetch(
    `${process.env.NEXTAUTH_URL}/api/produtos_indisponiveis`
  );
  const produtos_indisponiveis = await response_produtos_indisponiveis.json();

  const response_produtos = await fetch(
    `${process.env.NEXTAUTH_URL}/api/produtos`
  );
  const produtos_totais = await response_produtos.json();

  const consumidor = await getConsumidorServerSide();

  return (
    <>
      <article>
        <h2>Produtos Disponíveis</h2>
        <div className={style.produtosPaginaInicial}>
          {produtos_disponiveis.map((produto) => {
            return (
              <Suspense key={produto.id} fallback={<Loading />}>
                <CardProduto
                  produto={produto}
                  consumidor={
                    consumidor ? JSON.parse(JSON.stringify(consumidor)) : null
                  }
                />
              </Suspense>
            );
          })}
        </div>
      </article>

      <article>
        <h2>Produtos Indisponíveis</h2>
        <div className={style.produtosPaginaInicial}>
          {produtos_indisponiveis.map((produto) => {
            return (
              <Suspense key={produto.id} fallback={<Loading />}>
                <CardProduto
                  produto={produto}
                  consumidor={
                    consumidor ? JSON.parse(JSON.stringify(consumidor)) : null
                  }
                />
              </Suspense>
            );
          })}
        </div>
      </article>

      <article>
        <h2>Todos os Produtos</h2>
        <div className={style.produtosPaginaInicial}>
          {produtos_totais.map((produto) => {
            return (
              <Suspense key={produto.id} fallback={<Loading />}>
                <CardProduto
                  produto={produto}
                  consumidor={
                    consumidor ? JSON.parse(JSON.stringify(consumidor)) : null
                  }
                />
              </Suspense>
            );
          })}
        </div>
      </article>
    </>
  );
}
