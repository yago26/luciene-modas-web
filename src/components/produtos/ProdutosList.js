import style from "@/components/produtos/produtosList.module.css";

import CardProduto from "@/components/produtos/CardProduto";

import { Suspense } from "react";
import Loading from "@/app/loading";
import getConsumidor from "@/lib/getConsumidor";

export default async function ProdutosList() {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/produtos`);
  const produtos = await response.json();

  const consumidor = await getConsumidor();

  return (
    <>
      <article>
        <h2>Produtos Disponíveis</h2>
        <div className={style.produtosPaginaInicial}>
          {produtos.map((produto) => {
            return (
              <Suspense key={produto.id} fallback={<Loading />}>
                <CardProduto
                  produto={produto}
                  consumidor={consumidor}
                />
              </Suspense>
            );
          })}
        </div>
      </article>
    </>
  );
}
