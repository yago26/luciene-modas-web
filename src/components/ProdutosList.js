import { cookies } from "next/headers";
import { verificarToken } from "@/lib/auth";

import style from "./produtosList.module.css";

import CardProduto from "@/components/CardProduto";

export default async function ProdutosList() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/produtos`
  );
  const produtos = await response.json();

  const cookie = (await cookies()).toString();
  const usuario = verificarToken(cookie);
  let genero = usuario ? usuario.genero : null;

  return (
    <>
      <article className={style.produtosEmPromocao}>
        <h2>Em Promoção</h2>
        <div className={style.produtosPaginaInicial}>
          {produtos
            .filter((produto) => {
              try {
                if (
                  (produto.genero === genero || produto.genero === null) &&
                  produto.desconto != "0%"
                )
                  return produto;
              } catch {
                if (produto.desconto != "0%") {
                  return produto;
                }
              }
            })
            .sort(
              (a, b) =>
                Number(a.desconto.replace("%", "")) -
                Number(b.desconto.replace("%", ""))
            )
            .map((produto) => {
              return (
                <CardProduto
                  key={produto.id}
                  produto={produto}
                  usuario={usuario}
                />
              );
            })}
        </div>
      </article>
      <article className={style.produtosMaisVendidos}>
        <h2>Mais Vendidos</h2>
        <div className={style.produtosPaginaInicial}>
          {produtos.map((produto) => {
            return (
              <CardProduto
                key={produto.id}
                produto={produto}
                usuario={usuario}
              />
            );
          })}
        </div>
      </article>
      {/*{produtos.rows.map((produto) => {
          return (
            <CardProduto
              key={produto.id}
              id={produto.id}
              nome={produto.nome}
              sobre={produto.sobre}
              valor={produto.valor}
              url={produto.url}
            />
            );
        })}*/}
    </>
  );
}
