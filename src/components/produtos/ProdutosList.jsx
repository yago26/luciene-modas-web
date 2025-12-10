import style from "@/components/produtos/produtosList.module.css";

import CardProduto from "@/components/produtos/CardProduto";

import { Suspense } from "react";
import Loading from "@/app/loading";
import getUsuarioServerSide from "@/lib/getUsuarioServerSide";

export default async function ProdutosList() {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/produtos?estoque=disponivel`
  );
  const produtos = await response.json();

  const usuario = await getUsuarioServerSide();

  return (
    <>
      <article>
        <h2>Produtos Disponíveis</h2>
        <div className={style.produtosPaginaInicial}>
          {produtos.map((produto) => {
            return (
              <Suspense key={`1-${produto.id}`} fallback={<Loading />}>
                <CardProduto
                  produto={produto}
                  usuario={usuario ? JSON.parse(JSON.stringify(usuario)) : null}
                />
              </Suspense>
            );
          })}
          {produtos.map((produto) => {
            return (
              <Suspense key={`2-${produto.id}`} fallback={<Loading />}>
                <CardProduto
                  produto={produto}
                  usuario={usuario ? JSON.parse(JSON.stringify(usuario)) : null}
                />
              </Suspense>
            );
          })}
          {produtos.map((produto) => {
            return (
              <Suspense key={`3-${produto.id}`} fallback={<Loading />}>
                <CardProduto
                  produto={produto}
                  usuario={usuario ? JSON.parse(JSON.stringify(usuario)) : null}
                />
              </Suspense>
            );
          })}
        </div>
      </article>
    </>
  );
}
