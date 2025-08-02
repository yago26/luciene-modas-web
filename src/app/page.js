import db from "@/lib/db";
import { cookies } from "next/headers";
import { verificarToken } from "@/lib/auth";

import { fakeProducts } from "@/lib/fakeDataBase";

import NavBar from "@/components/geral/NavBar";
import Gerenciamento from "@/components/Gerenciamento";
import ListaCategorias from "@/components/ListaCategorias";
import CardProduto from "@/components/CardProduto";

import style from "./page.module.css";
import "./globals.css";

export default async function Home() {
  // const produtos = db.query("select * from tb_produto");
  const cookie = cookies().toString();
  const usuario = verificarToken(cookie);
  let genero = usuario ? usuario.genero : null;

  console.log(usuario);

  return (
    <>
      <NavBar />
      <div style={{ paddingInline: "10%" }}>
        <Gerenciamento />
        <ListaCategorias />
        <article className={style.produtosEmPromocao}>
          <h2>Em Promoção</h2>
          <div className={style.produtosPaginaInicial}>
            {fakeProducts
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
            {fakeProducts.map((produto) => {
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
      </div>
    </>
  );
}
