import CardProduto from "@/components/produtos/CardProduto";
import Loading from "../layout/Loading";

import { Suspense } from "react";
import getUsuarioServerSide from "@/utils/getUsuarioServerSide";

import style from "@/components/produtos/produtosList.module.css";

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
            const propsCardProduto = {
              id: produto.id,
              nome: produto.nome,
              valor: produto.valor,
              imagem: produto.imagem,
              estoque: produto.estoque,
            };
            return (
              <Suspense key={produto.id} fallback={<Loading />}>
                <CardProduto
                  produto={propsCardProduto}
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
